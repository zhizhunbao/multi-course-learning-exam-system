#!/usr/bin/env python3
"""
Download VcXsrv Windows X Server
VcXsrv is a Windows X-server based on the xorg git sources.
Project has been moved to: https://github.com/marchaesen/vcxsrv
"""
import requests
import os
import sys
from pathlib import Path

def download_file(url, output_path, description="file"):
    """Download a file with progress indication"""
    try:
        print(f"Downloading {description}...")
        print(f"URL: {url}")

        response = requests.get(url, stream=True, timeout=60, allow_redirects=True)
        response.raise_for_status()

        # Get total file size
        total_size = int(response.headers.get('content-length', 0))

        # Create output directory if it doesn't exist
        os.makedirs(os.path.dirname(output_path), exist_ok=True)

        downloaded_size = 0
        with open(output_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
                    downloaded_size += len(chunk)

                    # Show progress
                    if total_size > 0:
                        percent = (downloaded_size / total_size) * 100
                        print(f"\rProgress: {percent:.1f}% ({downloaded_size}/{total_size} bytes)", end='', flush=True)

        print(f"\n✓ Successfully downloaded: {output_path}")

        # Show file size
        file_size = os.path.getsize(output_path)
        file_size_mb = file_size / (1024 * 1024)
        print(f"  File size: {file_size_mb:.2f} MB")

        return output_path
    except requests.exceptions.RequestException as e:
        print(f"\n✗ Error downloading {description}: {e}")
        return None
    except Exception as e:
        print(f"\n✗ Error: {e}")
        return None

def get_sourceforge_download_url(project_name, filename_pattern=None):
    """
    Get the latest download URL from SourceForge
    SourceForge provides a direct download link: /projects/{project}/files/latest/download
    """
    # Try the latest download link first
    latest_url = f"https://sourceforge.net/projects/{project_name}/files/latest/download"
    return latest_url

def get_github_release_url(owner, repo):
    """
    Get the latest release download URL from GitHub
    Since the project has moved to GitHub, this might be more reliable
    Prefers release version over debug version
    """
    try:
        api_url = f"https://api.github.com/repos/{owner}/{repo}/releases/latest"
        response = requests.get(api_url, timeout=30)
        response.raise_for_status()

        data = response.json()
        assets = data.get('assets', [])

        if not assets:
            return None, None

        # Prefer release version over debug version
        # Priority: installer.exe (release) > installer.exe (debug)
        preferred_asset = None
        fallback_asset = None

        for asset in assets:
            name = asset.get('name', '').lower()
            if '.exe' in name or '.msi' in name:
                if 'debug' not in name:
                    # Prefer non-debug versions
                    preferred_asset = asset
                    break
                elif not fallback_asset:
                    # Keep debug version as fallback
                    fallback_asset = asset

        # Use preferred asset if found, otherwise fallback
        selected_asset = preferred_asset or fallback_asset or assets[0]

        download_url = selected_asset.get('browser_download_url')
        filename = selected_asset.get('name')
        return download_url, filename

    except Exception as e:
        print(f"Warning: Could not fetch GitHub release info: {e}")

    return None, None

def main():
    print("=" * 60)
    print("VcXsrv Windows X Server Downloader")
    print("=" * 60)
    print()

    # Create downloads directory
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    download_dir = project_root / "downloads" / "vcxsrv"
    download_dir.mkdir(parents=True, exist_ok=True)

    print(f"Download directory: {download_dir}")
    print()

    # Try GitHub first (project has moved there)
    print("Attempting to download from GitHub (latest release)...")
    github_url, filename = get_github_release_url("marchaesen", "vcxsrv")

    output_path = None
    if github_url:
        if filename:
            output_path = download_dir / filename
        else:
            output_path = download_dir / "vcxsrv-installer.exe"

        result = download_file(github_url, str(output_path), "VcXsrv from GitHub")
        if result:
            print("\n✓ Download completed successfully!")
            print(f"\nInstallation file: {output_path}")
            print("\nTo install VcXsrv:")
            print("  1. Run the downloaded installer")
            print("  2. Follow the installation wizard")
            print("  3. After installation, run XLaunch from the Start menu")
            return 0

    # Fallback to SourceForge
    print("\nGitHub download failed, trying SourceForge...")
    sourceforge_url = get_sourceforge_download_url("vcxsrv")
    output_path = download_dir / "vcxsrv-installer.exe"

    result = download_file(sourceforge_url, str(output_path), "VcXsrv from SourceForge")
    if result:
        print("\n✓ Download completed successfully!")
        print(f"\nInstallation file: {output_path}")
        print("\nTo install VcXsrv:")
        print("  1. Run the downloaded installer")
        print("  2. Follow the installation wizard")
        print("  3. After installation, run XLaunch from the Start menu")
        return 0

    print("\n✗ Failed to download VcXsrv from both GitHub and SourceForge")
    print("\nPlease try manual download:")
    print("  - GitHub: https://github.com/marchaesen/vcxsrv/releases")
    print("  - SourceForge: https://sourceforge.net/projects/vcxsrv/")
    return 1

if __name__ == '__main__':
    sys.exit(main())

