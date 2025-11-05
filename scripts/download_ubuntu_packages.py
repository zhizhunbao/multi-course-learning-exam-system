#!/usr/bin/env python3
"""
Download Ubuntu 22.04 packages
"""
import requests
import re
import os

def get_package_download_url(package_page_url, package_name):
    """Get the direct download URL for a .deb package"""
    try:
        response = requests.get(package_page_url, timeout=30)
        response.raise_for_status()

        # Look for download links in the HTML
        # Pattern 1: Direct .deb file links
        deb_patterns = [
            r'href="(http://[^"]*{}[^"]*\.deb)"'.format(re.escape(package_name)),
            r'href="(http://[^"]*\.deb)"',
            r'"(http://archive\.ubuntu\.com[^"]*\.deb)"',
            r'"(http://[^"]*ubuntu\.com[^"]*\.deb)"',
            r'href="(https://[^"]*\.deb)"',
        ]

        for pattern in deb_patterns:
            matches = re.findall(pattern, response.text, re.IGNORECASE)
            if matches:
                # Prefer amd64 architecture
                for match in matches:
                    if 'amd64' in match.lower() or 'all' in match.lower():
                        return match
                return matches[0]

        # Pattern 2: Try to find pool link and construct URL
        # Look for links like /ubuntu/pool/main/b/bluez/libbluetooth3_...
        # First try to find full pool paths
        pool_patterns = [
            r'href="(/ubuntu/pool/[^"]*{}[^"]*\.deb)"'.format(re.escape(package_name)),
            r'href="(/ubuntu/pool/[^"]*\.deb)"',
        ]

        for pattern in pool_patterns:
            matches = re.findall(pattern, response.text, re.IGNORECASE)
            if matches:
                # Prefer amd64 architecture
                for match in matches:
                    if 'amd64' in match.lower() or 'all' in match.lower():
                        if not match.startswith('http'):
                            return f"http://archive.ubuntu.com{match}"
                        return match
                match = matches[0]
                if not match.startswith('http'):
                    return f"http://archive.ubuntu.com{match}"
                return match

        # Pattern 2b: Try to find partial pool paths and construct full URL
        # Look for patterns like "main/b/bluez/libbluetooth3_"
        partial_pool_match = re.search(r'/ubuntu/pool/(main|universe|multiverse|restricted)/([^/]+)/([^/]+)/{}[^"]*'.format(re.escape(package_name)), response.text, re.IGNORECASE)
        if partial_pool_match:
            component = partial_pool_match.group(1)
            first_char = partial_pool_match.group(2)
            package_dir = partial_pool_match.group(3)
            # Try to find the full .deb filename
            filename_match = re.search(r'{}_{}[^"]*\.deb'.format(re.escape(package_name), r'[^"]*'), response.text, re.IGNORECASE)
            if filename_match:
                filename = filename_match.group(0)
                return f"http://archive.ubuntu.com/ubuntu/pool/{component}/{first_char}/{package_dir}/{filename}"

        # Pattern 3: Look for download links in table rows
        # packages.ubuntu.com often has download links in table format
        download_section = re.search(r'Download.*?table.*?</table>', response.text, re.DOTALL | re.IGNORECASE)
        if download_section:
            section_text = download_section.group(0)
            matches = re.findall(r'href="(http[^"]*\.deb)"', section_text, re.IGNORECASE)
            if matches:
                for match in matches:
                    if 'amd64' in match.lower():
                        return match
                return matches[0]

    except Exception as e:
        print(f"Error fetching {package_page_url}: {e}")

    return None

def download_package(url, output_dir, package_name):
    """Download a .deb package"""
    try:
        print(f"Downloading {package_name}...")
        response = requests.get(url, stream=True, timeout=60)
        response.raise_for_status()

        # Get filename from URL or Content-Disposition header
        filename = os.path.basename(url.split('?')[0])
        if not filename.endswith('.deb'):
            filename = f"{package_name}.deb"

        output_path = os.path.join(output_dir, filename)

        with open(output_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)

        print(f"Downloaded: {output_path}")
        return output_path
    except Exception as e:
        print(f"Error downloading {package_name}: {e}")
        return None

def main():
    # Direct download URLs found from package pages
    packages = [
        {
            'name': 'network-manager',
            'url': 'http://kr.archive.ubuntu.com/ubuntu/pool/main/n/network-manager/network-manager_1.36.4-2ubuntu1_amd64.deb'
        },
        {
            'name': 'libnm0',
            'url': 'http://archive.ubuntu.com/ubuntu/pool/main/n/network-manager/libnm0_1.36.4-2ubuntu1_amd64.deb'
        },
        {
            'name': 'libnss3',
            # Try to get the latest version from security updates or main repository
            # Ubuntu 22.04 libnss3 versions - check for >= 2:4.34
            # Note: Ubuntu 22.04 standard libnss3 is 3.x series
            # If >= 2:4.34 is required, may need Ubuntu 23.04+ or manual installation
            'page_url': 'https://packages.ubuntu.com/jammy-updates/libnss3',
            'fallback_urls': [
                'http://security.ubuntu.com/ubuntu/pool/main/n/nss/libnss3_3.98-0ubuntu0.22.04.2_amd64.deb',
                'http://archive.ubuntu.com/ubuntu/pool/main/n/nss/libnss3_3.98-0ubuntu0.22.04.2_amd64.deb',
            ]
        },
        {
            'name': 'libnspr4',
            # libnss3 requires libnspr4 >= 2:4.34
            # Ubuntu 22.04 libnspr4 version is 2:4.35-0ubuntu0.22.04.1, which satisfies the requirement
            'page_url': 'https://packages.ubuntu.com/jammy/libnspr4',
            'fallback_urls': [
                'http://security.ubuntu.com/ubuntu/pool/main/n/nspr/libnspr4_4.35-0ubuntu0.22.04.1_amd64.deb',
                'http://archive.ubuntu.com/ubuntu/pool/main/n/nspr/libnspr4_4.35-0ubuntu0.22.04.1_amd64.deb',
            ]
        },
        # Additional dependency packages - try direct URLs first, fallback to page parsing
        {
            'name': 'libbluetooth3',
            'url': 'http://archive.ubuntu.com/ubuntu/pool/main/b/bluez/libbluetooth3_5.64-0ubuntu1.4_amd64.deb',
            'page_url': 'https://packages.ubuntu.com/jammy/libbluetooth3'
        },
        {
            'name': 'libndp0',
            'url': 'http://archive.ubuntu.com/ubuntu/pool/main/libn/libndp/libndp0_1.8-0ubuntu3.1_amd64.deb',
            'page_url': 'https://packages.ubuntu.com/jammy/libndp0'
        },
        {
            'name': 'libteamdctl0',
            'url': 'http://archive.ubuntu.com/ubuntu/pool/main/libt/libteam/libteamdctl0_1.31-1build2_amd64.deb',
            'page_url': 'https://packages.ubuntu.com/jammy/libteamdctl0'
        }
    ]

    output_dir = os.path.join('public', 'pdfs', 'ai-techniques', 'ubuntu 22.04')
    os.makedirs(output_dir, exist_ok=True)

    for package in packages:
        print(f"\nDownloading {package['name']}...")
        result = None

        # For packages with page_url, try fetching from page first (for updates or latest versions)
        if 'page_url' in package and (package['name'] == 'libnss3' or package['name'] == 'libnspr4'):
            print(f"Fetching latest version from {package['page_url']}...")
            download_url = get_package_download_url(package['page_url'], package['name'])
            if download_url:
                result = download_package(download_url, output_dir, package['name'])
                if result:
                    print("Successfully downloaded latest version from updates repository")

        # If package has direct URL, try it first (for non-libnss3 packages or if page_url failed)
        if not result and 'url' in package:
            result = download_package(package['url'], output_dir, package['name'])

        # Try fallback URLs if main URL failed
        if not result and 'fallback_urls' in package:
            for fallback_url in package['fallback_urls']:
                print(f"Trying fallback URL for {package['name']}...")
                result = download_package(fallback_url, output_dir, package['name'])
                if result:
                    break

        # If direct URL failed or doesn't exist, try fetching from page_url
        if not result and 'page_url' in package and package['name'] not in ['libnss3', 'libnspr4']:
            print(f"Trying to fetch download URL from page for {package['name']}...")
            download_url = get_package_download_url(package['page_url'], package['name'])
            if download_url:
                result = download_package(download_url, output_dir, package['name'])
            else:
                print(f"Failed to get download URL for {package['name']}")

        if not result:
            print(f"Failed to download {package['name']}")

if __name__ == '__main__':
    main()

