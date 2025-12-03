#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Rate My Professors 评论抓取脚本
用于抓取指定教授的所有评论并保存为Markdown文件

使用方法:
    python scrape_ratemyprofessors.py <professor_url> [output_file]

示例:
    python scrape_ratemyprofessors.py https://www.ratemyprofessors.com/professor/2719075
    python scrape_ratemyprofessors.py https://www.ratemyprofessors.com/professor/2719075 anu_thomas_reviews.md
"""

import sys
import argparse
import re
import json
import time
from pathlib import Path
from typing import List, Dict, Optional
from datetime import datetime

try:
    from selenium import webdriver
    from selenium.webdriver.common.by import By
    from selenium.webdriver.support.ui import WebDriverWait
    from selenium.webdriver.support import expected_conditions as EC
    from selenium.common.exceptions import TimeoutException, NoSuchElementException
    SELENIUM_AVAILABLE = True
except ImportError:
    SELENIUM_AVAILABLE = False
    print("警告: Selenium未安装。需要安装: pip install selenium\n")

try:
    import requests
    from bs4 import BeautifulSoup
    REQUESTS_AVAILABLE = True
except ImportError:
    REQUESTS_AVAILABLE = False
    print("警告: requests/BeautifulSoup未安装。需要安装: pip install requests beautifulsoup4\n")


class RateMyProfessorsScraper:
    """Rate My Professors评论抓取器"""

    def __init__(self, use_selenium: bool = True, headless: bool = True):
        """
        初始化抓取器

        Args:
            use_selenium: 是否使用Selenium（需要点击Load More按钮时使用）
            headless: 是否使用无头模式
        """
        self.use_selenium = use_selenium and SELENIUM_AVAILABLE
        self.headless = headless
        self.driver = None

    def setup_driver(self):
        """设置Selenium WebDriver"""
        if not SELENIUM_AVAILABLE:
            raise ImportError("Selenium未安装。请运行: pip install selenium")

        try:
            from selenium.webdriver.chrome.options import Options
            from selenium.webdriver.chrome.service import Service

            chrome_options = Options()
            if self.headless:
                chrome_options.add_argument('--headless')  # 无头模式
            chrome_options.add_argument('--no-sandbox')
            chrome_options.add_argument('--disable-dev-shm-usage')
            chrome_options.add_argument('--disable-gpu')
            chrome_options.add_argument('--window-size=1920,1080')
            chrome_options.add_argument('user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
            # 添加反检测选项
            chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
            chrome_options.add_experimental_option('useAutomationExtension', False)

            self.driver = webdriver.Chrome(options=chrome_options)
            print("✓ Chrome WebDriver已启动")
        except Exception as e:
            print(f"警告: 无法启动Chrome WebDriver: {e}")
            print("尝试使用Firefox...")
            try:
                from selenium.webdriver.firefox.options import Options as FirefoxOptions
                firefox_options = FirefoxOptions()
                firefox_options.add_argument('--headless')
                self.driver = webdriver.Firefox(options=firefox_options)
                print("✓ Firefox WebDriver已启动")
            except Exception as e2:
                raise Exception(f"无法启动任何WebDriver: {e2}")

    def load_all_reviews(self, url: str, max_clicks: int = 50) -> str:
        """
        加载所有评论（点击Load More按钮直到没有更多内容）

        Args:
            url: 教授页面URL
            max_clicks: 最大点击次数

        Returns:
            str: 页面完整HTML内容
        """
        if not self.use_selenium:
            raise ValueError("需要使用Selenium来加载所有评论")

        if not self.driver:
            self.setup_driver()

        print(f"正在访问: {url}")
        self.driver.get(url)

        # 等待页面完全加载
        print("  等待页面加载...")
        try:
            WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.TAG_NAME, "body"))
            )
        except TimeoutException:
            print("  警告: 页面加载超时")

        time.sleep(2)  # 减少等待时间

        # 尝试关闭可能的广告或弹窗（快速模式）
        self._close_ads(fast=True)

        # 点击Load More按钮直到没有更多内容
        clicks = 0
        previous_review_count = 0

        while clicks < max_clicks:
            # 统计当前评论数量（更准确的方法）
            page_text = self.driver.find_element(By.TAG_NAME, "body").text
            # 查找所有课程代码，但排除重复的（同一评论可能在不同位置出现）
            course_codes = re.findall(r'CST\d{4}', page_text)
            # 统计唯一的评论块（通过课程代码+日期的组合）
            review_pattern = r'CST\d{4}\s+[A-Z][a-z]{2}\s+\d{1,2}'
            unique_reviews = len(set(re.findall(review_pattern, page_text)))
            current_review_count = unique_reviews if unique_reviews > 0 else len(set(course_codes))

            # 如果评论数量没有增加，说明已经加载完
            if current_review_count == previous_review_count and previous_review_count > 0:
                print(f"评论数量未增加 ({current_review_count})，可能已加载完所有评论")
                break

            previous_review_count = current_review_count

            # 查找并点击Load More按钮
            try:
                # 快速滚动到底部
                self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                time.sleep(0.5)  # 减少等待时间

                # 查找Load More按钮（使用多种方式，优先使用精确的class选择器）
                load_more_buttons = []

                # 优化：直接使用最可能的选择器
                try:
                    # 优先使用精确的class选择器
                    buttons = self.driver.find_elements(
                        By.CSS_SELECTOR,
                        "button.PaginationButton__StyledPaginationButton-txi1dr-1, button[class*='PaginationButton']"
                    )
                    # 快速过滤
                    for btn in buttons:
                        try:
                            text = btn.text
                            if 'Load More' in text:
                                load_more_buttons.append(btn)
                                break  # 找到第一个就停止
                        except:
                            continue

                    # 如果没找到，使用XPath
                    if not load_more_buttons:
                        buttons = self.driver.find_elements(
                            By.XPATH,
                            "//button[contains(text(), 'Load More Ratings') or contains(text(), 'Load More')]"
                        )
                        load_more_buttons.extend(buttons[:1])  # 只取第一个
                except:
                    pass

                # 去重（基于元素位置和文本）
                seen = set()
                unique_buttons = []
                for btn in load_more_buttons:
                    try:
                        # 使用位置和文本作为唯一标识
                        location = btn.location
                        size = btn.size
                        text = btn.text[:50]  # 前50个字符
                        btn_key = f"{location['x']},{location['y']},{size['width']},{size['height']},{text}"
                        if btn_key not in seen:
                            seen.add(btn_key)
                            unique_buttons.append(btn)
                    except:
                        continue

                if unique_buttons:
                    target_button = unique_buttons[0]
                    print(f"  找到Load More按钮")

                    # 快速滚动到按钮位置
                    self.driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", target_button)
                    time.sleep(0.5)  # 减少等待时间

                    # 直接使用JavaScript点击（最快）
                    try:
                        self.driver.execute_script("arguments[0].click();", target_button)
                        clicked = True
                    except:
                        try:
                            target_button.click()
                            clicked = True
                        except:
                            clicked = False

                    if clicked:
                        clicks += 1
                        print(f"  → 点击Load More ({clicks}/{max_clicks}), 当前评论数: {current_review_count}")

                        # 快速关闭广告（不等待）
                        self._close_ads(fast=True)

                        # 减少等待时间，使用智能等待
                        time.sleep(1)  # 基础等待

                        # 智能等待新内容（最多5秒）
                        try:
                            WebDriverWait(self.driver, 5).until(
                                lambda d: len(re.findall(r'CST\d{4}', d.find_element(By.TAG_NAME, "body").text)) > current_review_count
                            )
                        except TimeoutException:
                            # 即使超时也继续，可能内容已经加载
                            pass
                    else:
                        print("  ✗ 所有点击方法都失败")
                        break
                else:
                    print("  ✗ 未找到Load More按钮，可能已加载完所有评论")
                    # 再次检查页面，确认是否真的没有更多内容
                    final_text = self.driver.find_element(By.TAG_NAME, "body").text
                    if 'Load More' not in final_text and 'load more' not in final_text.lower():
                        print("  ✓ 确认：页面中确实没有Load More按钮")
                    break
            except Exception as e:
                print(f"点击Load More时出错: {e}")
                break

        # 获取最终页面内容
        page_html = self.driver.page_source
        page_text = self.driver.find_element(By.TAG_NAME, "body").text

        # 保存调试信息（可选）
        try:
            debug_file = Path("scripts/debug_page.html")
            with open(debug_file, 'w', encoding='utf-8') as f:
                f.write(page_html)
            print(f"  调试: 页面HTML已保存到 {debug_file}")
        except:
            pass

        print(f"\n✓ 完成加载，共点击 {clicks} 次，最终评论数: {previous_review_count}")
        print(f"  页面文本长度: {len(page_text)} 字符")
        return page_html, page_text

    def parse_reviews(self, page_text: str) -> List[Dict]:
        """
        解析评论数据

        Args:
            page_text: 页面文本内容

        Returns:
            List[Dict]: 评论列表
        """
        reviews = []
        ratings_data = {}

        # 优先从HTML的JSON数据中提取评分信息
        if self.driver:
            try:
                page_html = self.driver.page_source
                # 提取 __RELAY_STORE__ 中的评分数据
                relay_store_match = re.search(r'window\.__RELAY_STORE__\s*=\s*({.*?});', page_html, re.DOTALL)
                if relay_store_match:
                    try:
                        store_data = json.loads(relay_store_match.group(1))
                        # 查找所有 Rating 对象
                        for key, value in store_data.items():
                            if isinstance(value, dict) and value.get('__typename') == 'Rating':
                                rating_id = value.get('legacyId') or value.get('id', '')
                                if rating_id:
                                    ratings_data[str(rating_id)] = {
                                        'quality': value.get('helpfulRating') or value.get('clarityRating'),
                                        'difficulty': value.get('difficultyRating'),
                                        'course': value.get('class'),
                                        'date': value.get('date'),
                                        'grade': value.get('grade'),
                                        'textbook': value.get('textbookUse'),
                                        'for_credit': value.get('isForCredit'),
                                        'attendance': value.get('attendanceMandatory'),
                                        'would_take_again': value.get('wouldTakeAgain'),
                                        'comment': value.get('comment'),
                                        'tags': value.get('ratingTags', '').split('--') if value.get('ratingTags') else []
                                    }
                        if ratings_data:
                            print(f"  从JSON数据中提取到 {len(ratings_data)} 条评分信息")
                    except Exception as e:
                        print(f"  解析JSON数据失败: {e}")
            except Exception as e:
                pass

        # 优先从HTML中提取评论（更准确）
        if self.driver:
            try:
                # 查找所有评论元素
                review_elements = self.driver.find_elements(By.CSS_SELECTOR, "[class*='Rating__StyledRating'], [class*='Rating__RatingBody']")

                for element in review_elements:
                    try:
                        review = self._parse_review_from_element(element)
                        if review:
                            # 尝试从 ratings_data 中补充评分信息
                            if not review.get('quality') or not review.get('difficulty'):
                                # 通过课程代码和日期匹配
                                for rating in ratings_data.values():
                                    if rating.get('course') == review.get('course'):
                                        if not review.get('quality') and rating.get('quality'):
                                            review['quality'] = rating['quality']
                                        if not review.get('difficulty') and rating.get('difficulty'):
                                            review['difficulty'] = rating['difficulty']
                                        break
                            reviews.append(review)
                    except Exception as e:
                        continue

                if reviews:
                    print(f"  从HTML提取到 {len(reviews)} 条评论")
                    return reviews
            except Exception as e:
                print(f"  HTML提取失败，使用文本提取: {e}")

        # 备用：使用正则表达式提取评论块
        review_pattern = r'CST\d{4}.*?(?=CST\d{4}|Load More|ADVERTISEMENT|Help|Site Guidelines|$)'
        review_blocks = re.findall(review_pattern, page_text, re.DOTALL)

        print(f"  找到 {len(review_blocks)} 个评论块")

        for i, block in enumerate(review_blocks, 1):
            if len(block.strip()) < 50:  # 过滤太短的块
                continue

            review = self._parse_single_review(block)
            if review:
                # 尝试从 ratings_data 中补充评分信息
                if not review.get('quality') or not review.get('difficulty'):
                    for rating in ratings_data.values():
                        if rating.get('course') == review.get('course'):
                            if not review.get('quality') and rating.get('quality'):
                                review['quality'] = rating['quality']
                            if not review.get('difficulty') and rating.get('difficulty'):
                                review['difficulty'] = rating['difficulty']
                            break
                reviews.append(review)
                print(f"    解析评论 {i}: {review.get('course')} - {review.get('date')}")
            else:
                print(f"    跳过评论块 {i}: 无法解析")

        return reviews

    def _parse_review_from_element(self, element) -> Optional[Dict]:
        """从HTML元素中解析评论"""
        try:
            review = {
                'course': None,
                'date': None,
                'quality': None,
                'difficulty': None,
                'for_credit': None,
                'attendance': None,
                'would_take_again': None,
                'grade': None,
                'textbook': None,
                'comment': '',
                'tags': []
            }

            # 提取课程代码
            course_elements = element.find_elements(By.CSS_SELECTOR, "[class*='RatingHeader__StyledClass'], [class*='ClassInfo']")
            if course_elements:
                course_text = course_elements[0].text.strip()
                course_match = re.search(r'(CST\d{4})', course_text)
                if course_match:
                    review['course'] = course_match.group(1)

            # 提取日期
            date_elements = element.find_elements(By.CSS_SELECTOR, "[class*='TimeStamp'], [class*='RatingTimeStamp']")
            if date_elements:
                review['date'] = date_elements[0].text.strip()

            # 提取评分（多种方式）
            element_text = element.text

            # 从文本中提取 Quality
            quality_patterns = [
                r'Quality\s*:?\s*(\d+\.?\d*)',
                r'QUALITY\s*:?\s*(\d+\.?\d*)',
            ]
            for pattern in quality_patterns:
                quality_match = re.search(pattern, element_text, re.IGNORECASE)
                if quality_match:
                    try:
                        review['quality'] = float(quality_match.group(1))
                        break
                    except:
                        continue

            # 如果文本提取失败，尝试从元素中提取
            if not review['quality']:
                quality_elements = element.find_elements(By.XPATH,
                    ".//*[contains(text(), 'Quality')]/following-sibling::*[1] | "
                    ".//*[contains(@class, 'CardNumRatingNumber')][1] | "
                    ".//*[contains(@class, 'RatingValue')][1] | "
                    ".//*[@class*='Rating'][1]//*[contains(@class, 'Number')][1]"
                )
                for q_elem in quality_elements:
                    try:
                        q_text = q_elem.text.strip()
                        if q_text and re.match(r'^\d+\.?\d*$', q_text):
                            review['quality'] = float(q_text)
                            break
                    except:
                        continue

            # 从文本中提取 Difficulty
            difficulty_patterns = [
                r'Difficulty\s*:?\s*(\d+\.?\d*)',
                r'DIFFICULTY\s*:?\s*(\d+\.?\d*)',
            ]
            for pattern in difficulty_patterns:
                difficulty_match = re.search(pattern, element_text, re.IGNORECASE)
                if difficulty_match:
                    try:
                        review['difficulty'] = float(difficulty_match.group(1))
                        break
                    except:
                        continue

            # 如果文本提取失败，尝试从元素中提取
            if not review['difficulty']:
                difficulty_elements = element.find_elements(By.XPATH,
                    ".//*[contains(text(), 'Difficulty')]/following-sibling::*[1] | "
                    ".//*[contains(@class, 'CardNumRatingNumber')][2] | "
                    ".//*[contains(@class, 'RatingValue')][2] | "
                    ".//*[@class*='Rating'][1]//*[contains(@class, 'Number')][2]"
                )
                for d_elem in difficulty_elements:
                    try:
                        d_text = d_elem.text.strip()
                        if d_text and re.match(r'^\d+\.?\d*$', d_text):
                            review['difficulty'] = float(d_text)
                            break
                    except:
                        continue

            # 提取评论内容（从Comments__StyledComments类）
            comment_elements = element.find_elements(By.CSS_SELECTOR, "[class*='Comments__StyledComments'], [class*='Comments']")
            if comment_elements:
                review['comment'] = comment_elements[0].text.strip()

            # 提取其他信息
            element_text = element.text

            if 'For Credit: Yes' in element_text:
                review['for_credit'] = True
            elif 'For Credit: No' in element_text:
                review['for_credit'] = False

            if 'Attendance: Mandatory' in element_text:
                review['attendance'] = 'Mandatory'
            elif 'Attendance: Not Mandatory' in element_text:
                review['attendance'] = 'Not Mandatory'

            if 'Would Take Again: Yes' in element_text:
                review['would_take_again'] = True
            elif 'Would Take Again: No' in element_text:
                review['would_take_again'] = False

            grade_match = re.search(r'Grade:\s*([A-F][+-]?|Not sure yet)', element_text, re.IGNORECASE)
            if grade_match:
                review['grade'] = grade_match.group(1)

            textbook_match = re.search(r'Textbook:\s*(Yes|No|N/A)', element_text, re.IGNORECASE)
            if textbook_match:
                review['textbook'] = textbook_match.group(1)

            # 提取标签
            tag_elements = element.find_elements(By.CSS_SELECTOR, "[class*='Tag-'], span[class*='Tag']")
            review['tags'] = [tag.text.strip() for tag in tag_elements if tag.text.strip()]

            return review if review['course'] else None
        except Exception as e:
            return None

    def _parse_single_review(self, block: str) -> Optional[Dict]:
        """解析单条评论"""
        lines = [line.strip() for line in block.split('\n') if line.strip()]

        if not lines:
            return None

        review = {
            'course': None,
            'date': None,
            'quality': None,
            'difficulty': None,
            'for_credit': None,
            'attendance': None,
            'would_take_again': None,
            'grade': None,
            'textbook': None,
            'comment': '',
            'tags': []
        }

        # 提取课程代码
        course_match = re.search(r'(CST\d{4})', block)
        if course_match:
            review['course'] = course_match.group(1)

        # 提取日期
        date_match = re.search(r'([A-Z][a-z]{2}\s+\d{1,2}(?:st|nd|rd|th)?,\s+\d{4})', block)
        if date_match:
            review['date'] = date_match.group(1)

        # 提取评分（支持多种格式）
        # 格式1: Quality 1.0 或 Quality: 1.0
        quality_patterns = [
            r'Quality\s*:?\s*(\d+\.?\d*)',
            r'QUALITY\s*:?\s*(\d+\.?\d*)',
            r'Quality\s+(\d+\.?\d*)',
            r'QUALITY\s+(\d+\.?\d*)',
        ]
        for pattern in quality_patterns:
            quality_match = re.search(pattern, block, re.IGNORECASE)
            if quality_match:
                try:
                    review['quality'] = float(quality_match.group(1))
                    break
                except:
                    continue

        # 格式2: Difficulty 5.0 或 Difficulty: 5.0
        difficulty_patterns = [
            r'Difficulty\s*:?\s*(\d+\.?\d*)',
            r'DIFFICULTY\s*:?\s*(\d+\.?\d*)',
            r'Difficulty\s+(\d+\.?\d*)',
            r'DIFFICULTY\s+(\d+\.?\d*)',
        ]
        for pattern in difficulty_patterns:
            difficulty_match = re.search(pattern, block, re.IGNORECASE)
            if difficulty_match:
                try:
                    review['difficulty'] = float(difficulty_match.group(1))
                    break
                except:
                    continue

        # 提取其他信息
        if 'For Credit: Yes' in block:
            review['for_credit'] = True
        elif 'For Credit: No' in block:
            review['for_credit'] = False

        if 'Attendance: Mandatory' in block:
            review['attendance'] = 'Mandatory'
        elif 'Attendance: Not Mandatory' in block:
            review['attendance'] = 'Not Mandatory'

        if 'Would Take Again: Yes' in block:
            review['would_take_again'] = True
        elif 'Would Take Again: No' in block:
            review['would_take_again'] = False

        grade_match = re.search(r'Grade:\s*([A-F][+-]?|Not sure yet)', block, re.IGNORECASE)
        if grade_match:
            review['grade'] = grade_match.group(1)

        textbook_match = re.search(r'Textbook:\s*(Yes|No|N/A)', block, re.IGNORECASE)
        if textbook_match:
            review['textbook'] = textbook_match.group(1)

        # 提取评论内容（改进：在Grade/Textbook之后到Helpful/Tags之前）
        # 查找评论内容的开始位置
        comment_start_patterns = [
            (block.find('Textbook:'), 'Textbook:'),
            (block.find('Grade:'), 'Grade:'),
        ]
        comment_start = -1
        start_marker = ''
        for pos, marker in comment_start_patterns:
            if pos > 0 and (comment_start == -1 or pos < comment_start):
                comment_start = pos
                start_marker = marker

        # 查找评论内容的结束位置
        comment_end_patterns = [
            block.find('Helpful'),
            block.find('AMAZING LECTURES'),
            block.find('TOUGH GRADER'),
            block.find('GROUP PROJECTS'),
        ]
        comment_end = len(block)
        for pos in comment_end_patterns:
            if pos > 0 and pos < comment_end:
                comment_end = pos

        if comment_start > 0 and comment_end > comment_start:
            comment_text = block[comment_start:comment_end]
            # 移除开始标记行（如Textbook:或Grade:）
            comment_lines = []
            for line in comment_text.split('\n'):
                line = line.strip()
                if line and not line.startswith(start_marker) and not line.startswith('Textbook:') and not line.startswith('Grade:'):
                    comment_lines.append(line)
            review['comment'] = '\n'.join(comment_lines)

        # 提取标签（通常在评论内容之后）
        tag_pattern = r'(AMAZING LECTURES|CLEAR GRADING CRITERIA|PARTICIPATION MATTERS|GROUP PROJECTS|TOUGH GRADER|LOTS OF HOMEWORK|TEST HEAVY|EXTRA CREDIT|GIVES GOOD FEEDBACK|INSPIRATIONAL|RESPECTED|CARING|BEWARE OF POP QUIZZES|GET READY TO READ|GRADED BY FEW THINGS)'
        tags = re.findall(tag_pattern, block, re.IGNORECASE)
        review['tags'] = [tag.title() for tag in tags]

        return review if review['course'] else None

    def extract_professor_info(self, page_text: str) -> Dict:
        """提取教授基本信息"""
        info = {
            'name': None,
            'department': None,
            'institution': None,
            'overall_rating': None,
            'total_ratings': None,
            'would_take_again': None,
            'difficulty': None,
            'rating_distribution': {}
        }

        # 优先从HTML中提取（更准确）
        if self.driver:
            try:
                # 提取总体评分（从HTML结构）
                rating_elements = self.driver.find_elements(By.CSS_SELECTOR, ".RatingValue__Numerator-qw8sqy-2, [class*='RatingValue__Numerator']")
                if rating_elements:
                    try:
                        rating_text = rating_elements[0].text.strip()
                        info['overall_rating'] = float(rating_text)
                    except:
                        pass

                # 提取总评分数量
                ratings_elements = self.driver.find_elements(By.XPATH, "//*[contains(text(), 'Overall Quality Based on')]//a")
                if ratings_elements:
                    try:
                        ratings_text = ratings_elements[0].text.strip()
                        ratings_num = re.search(r'(\d+)', ratings_text)
                        if ratings_num:
                            info['total_ratings'] = int(ratings_num.group(1))
                    except:
                        pass

                # 提取Would Take Again百分比
                take_again_elements = self.driver.find_elements(By.XPATH, "//*[contains(text(), 'Would take again')]/preceding-sibling::*[1]")
                if take_again_elements:
                    try:
                        take_again_text = take_again_elements[0].text.strip().replace('%', '')
                        info['would_take_again'] = int(take_again_text)
                    except:
                        pass

                # 提取难度
                difficulty_elements = self.driver.find_elements(By.XPATH, "//*[contains(text(), 'Level of Difficulty')]/preceding-sibling::*[1]")
                if difficulty_elements:
                    try:
                        difficulty_text = difficulty_elements[0].text.strip()
                        info['difficulty'] = float(difficulty_text)
                    except:
                        pass
            except:
                pass

        # 如果HTML提取失败，使用文本提取作为备用
        if not info.get('overall_rating'):
            # 提取总体评分（更精确的匹配，支持小数）
            # 优先查找"Overall Quality"附近的评分
            overall_patterns = [
                r'(\d+\.\d+)\s*/\s*5.*?Overall Quality',  # 评分在Overall Quality之前（最常见）
                r'Overall Quality.*?(\d+\.\d+)\s*/\s*5',  # Overall Quality Based on X ratings 后面的评分
            ]

            for pattern in overall_patterns:
                rating_match = re.search(pattern, page_text, re.IGNORECASE | re.DOTALL)
                if rating_match:
                    try:
                        rating_value = float(rating_match.group(1))
                        if 0 <= rating_value <= 5:
                            info['overall_rating'] = rating_value
                            break
                    except:
                        continue

        # 提取姓名（更精确的匹配）
        name_patterns = [
            r'([A-Z][a-z]+\s+[A-Z][a-z]+)\s+Professor',
            r'([A-Z][a-z]+\s+[A-Z][a-z]+)\s+Computer Systems',
            r'^([A-Z][a-z]+\s+[A-Z][a-z]+)',
        ]
        for pattern in name_patterns:
            name_match = re.search(pattern, page_text)
            if name_match:
                info['name'] = name_match.group(1).strip()
                break

        # 提取总评分数量（文本备用）
        if not info.get('total_ratings'):
            ratings_match = re.search(r'(\d+)\s+ratings?', page_text, re.IGNORECASE)
            if ratings_match:
                info['total_ratings'] = int(ratings_match.group(1))

        # 提取Would Take Again百分比（文本备用）
        if not info.get('would_take_again'):
            take_again_match = re.search(r'(\d+)%\s*Would take again', page_text, re.IGNORECASE)
            if take_again_match:
                info['would_take_again'] = int(take_again_match.group(1))

        # 提取难度（文本备用）
        if not info.get('difficulty'):
            difficulty_match = re.search(r'Level of Difficulty\s*(\d+\.?\d*)', page_text, re.IGNORECASE)
            if difficulty_match:
                info['difficulty'] = float(difficulty_match.group(1))

        return info

    def save_to_markdown(self, professor_info: Dict, reviews: List[Dict], output_file: str):
        """保存评论到Markdown文件"""
        output_path = Path(output_file)
        output_path.parent.mkdir(parents=True, exist_ok=True)

        with open(output_path, 'w', encoding='utf-8') as f:
            # 写入标题和基本信息
            f.write(f"# {professor_info.get('name', 'Unknown')} - Rate My Professors Reviews\n\n")
            f.write(f"**Source:** [Rate My Professors]({self.driver.current_url if self.driver else 'N/A'})\n\n")

            # 写入统计信息
            f.write("## Overall Statistics\n\n")
            if professor_info.get('overall_rating'):
                f.write(f"- **Overall Rating:** {professor_info['overall_rating']}/5")
                if professor_info.get('total_ratings'):
                    f.write(f" (based on {professor_info['total_ratings']} ratings)")
                f.write("\n")

            if professor_info.get('would_take_again'):
                f.write(f"- **Would Take Again:** {professor_info['would_take_again']}%\n")

            if professor_info.get('difficulty'):
                f.write(f"- **Level of Difficulty:** {professor_info['difficulty']}/5\n")

            f.write("\n---\n\n")

            # 写入所有评论
            f.write(f"## All Student Reviews ({len(reviews)} Reviews)\n\n")

            for i, review in enumerate(reviews, 1):
                f.write(f"### Review {i} - {review.get('course', 'N/A')} ({review.get('date', 'N/A')})\n")

                if review.get('quality'):
                    f.write(f"- **Quality:** {review['quality']}/5\n")
                if review.get('difficulty'):
                    f.write(f"- **Difficulty:** {review['difficulty']}/5\n")
                if review.get('for_credit') is not None:
                    f.write(f"- **For Credit:** {'Yes' if review['for_credit'] else 'No'}\n")
                if review.get('attendance'):
                    f.write(f"- **Attendance:** {review['attendance']}\n")
                if review.get('would_take_again') is not None:
                    f.write(f"- **Would Take Again:** {'Yes' if review['would_take_again'] else 'No'}\n")
                if review.get('grade'):
                    f.write(f"- **Grade:** {review['grade']}\n")
                if review.get('textbook'):
                    f.write(f"- **Textbook:** {review['textbook']}\n")

                f.write("\n**Comment:**\n")
                if review.get('comment'):
                    f.write(f"{review['comment']}\n")
                else:
                    f.write("(No comment provided)\n")

                if review.get('tags'):
                    f.write(f"\n**Tags:** {', '.join(review['tags'])}\n")

                f.write("\n---\n\n")

            # 写入总结
            f.write("## Summary\n\n")
            f.write(f"Total reviews extracted: {len(reviews)}\n")
            f.write(f"Last updated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")

        print(f"\n✓ 评论已保存到: {output_path.absolute()}")

    def _close_ads(self, fast: bool = False):
        """关闭广告弹窗"""
        try:
            # 快速模式：只检查最常见的关闭按钮
            if fast:
                close_selectors = [
                    "a.bx-close, a[class*='bx-close']",  # 最常见的
                    "*[data-click='close']",
                    "#bx-close-inside-1177612"
                ]
            else:
                close_selectors = [
                    "a.bx-close, a[class*='bx-close']",
                    "a[class*='close'][id*='close']",
                    "button[class*='close']",
                    "a[class*='close-link']",
                    "*[aria-label*='close' i]",
                    "*[data-click='close']",
                    "svg[class*='close']",
                    ".bx-close-inside",
                    "#bx-close-inside-1177612"
                ]

            for selector in close_selectors:
                try:
                    close_buttons = self.driver.find_elements(By.CSS_SELECTOR, selector)
                    for btn in close_buttons:
                        try:
                            # 快速检查：只检查是否可见
                            if btn.is_displayed():
                                # 直接点击，不打印信息（快速模式）
                                self.driver.execute_script("arguments[0].click();", btn)
                                if not fast:
                                    print(f"  ✓ 广告已关闭")
                                time.sleep(0.3 if fast else 1)  # 快速模式减少等待
                                return True
                        except:
                            continue
                except:
                    continue

            # 快速模式跳过iframe检查（太慢）
            if not fast:
                # 方法2: 查找并关闭广告iframe
                iframes = self.driver.find_elements(By.TAG_NAME, "iframe")
                for iframe in iframes[:2]:  # 只检查前2个iframe
                    try:
                        self.driver.switch_to.frame(iframe)
                        close_buttons = self.driver.find_elements(
                            By.XPATH,
                            "//*[contains(@class, 'close') or contains(@class, 'bx-close')]"
                        )
                        if close_buttons:
                            for btn in close_buttons:
                                if btn.is_displayed():
                                    self.driver.execute_script("arguments[0].click();", btn)
                                    time.sleep(0.5)
                                    self.driver.switch_to.default_content()
                                    return True
                        self.driver.switch_to.default_content()
                    except:
                        self.driver.switch_to.default_content()
                        continue

        except Exception as e:
            pass  # 如果关闭广告失败，继续执行

    def _action_click(self, element):
        """使用ActionChains点击元素"""
        from selenium.webdriver.common.action_chains import ActionChains
        actions = ActionChains(self.driver)
        actions.move_to_element(element).click().perform()

    def _scroll_with_mouse_wheel(self, scroll_amount: int = 3):
        """
        使用鼠标滚轮向下滚动（优化版，减少滚动次数）

        Args:
            scroll_amount: 滚动次数（减少默认次数）
        """
        from selenium.webdriver.common.keys import Keys

        # 直接使用END键到页面底部（最快）
        self.driver.find_element(By.TAG_NAME, "body").send_keys(Keys.END)
        time.sleep(0.2)

    def _scroll_to_element_with_wheel(self, element):
        """
        快速滚动到指定元素（优化版）

        Args:
            element: 要滚动到的元素
        """
        # 直接使用JavaScript滚动（最快）
        self.driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", element)

    def close(self):
        """关闭浏览器"""
        if self.driver:
            self.driver.quit()
            print("✓ 浏览器已关闭")


def main():
    parser = argparse.ArgumentParser(
        description='抓取Rate My Professors上的教授评论',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
示例:
  python scrape_ratemyprofessors.py https://www.ratemyprofessors.com/professor/2719075
  python scrape_ratemyprofessors.py https://www.ratemyprofessors.com/professor/2719075 output.md
        """
    )

    parser.add_argument('url', help='教授页面URL')
    parser.add_argument('output', nargs='?', default=None,
                       help='输出Markdown文件路径（可选，默认为professor_name_reviews.md）')
    parser.add_argument('--no-selenium', action='store_true',
                       help='不使用Selenium（仅抓取第一页，不点击Load More）')
    parser.add_argument('--max-clicks', type=int, default=50,
                       help='最大Load More点击次数（默认50）')
    parser.add_argument('--headless', action='store_true', default=True,
                       help='使用无头模式（默认开启）')
    parser.add_argument('--no-headless', action='store_false', dest='headless',
                       help='不使用无头模式（显示浏览器窗口，便于调试）')

    args = parser.parse_args()

    if not SELENIUM_AVAILABLE and not args.no_selenium:
        print("错误: 需要使用Selenium来加载所有评论。")
        print("请安装: pip install selenium")
        print("或者使用 --no-selenium 选项（仅抓取第一页）")
        sys.exit(1)

    scraper = None
    try:
        scraper = RateMyProfessorsScraper(use_selenium=not args.no_selenium, headless=args.headless)

        # 加载所有评论
        if scraper.use_selenium:
            page_html, page_text = scraper.load_all_reviews(args.url, args.max_clicks)
        else:
            # 使用requests简单抓取（仅第一页）
            if not REQUESTS_AVAILABLE:
                print("错误: 需要安装requests和beautifulsoup4")
                sys.exit(1)
            response = requests.get(args.url)
            page_text = response.text
            page_html = page_text

        # 解析评论
        print("\n正在解析评论...")
        professor_info = scraper.extract_professor_info(page_text)
        reviews = scraper.parse_reviews(page_text)

        print(f"✓ 找到 {len(reviews)} 条评论")

        # 确定输出文件名
        default_output_dir = Path("public/data/professions")
        default_output_dir.mkdir(parents=True, exist_ok=True)

        if args.output:
            output_file = args.output
            # 如果用户提供的是相对路径，则放在默认目录下
            output_path = Path(output_file)
            if not output_path.is_absolute():
                output_file = str(default_output_dir / output_path.name)
        else:
            prof_name = professor_info.get('name', 'professor')
            # 清理文件名：移除换行符和特殊字符
            prof_name = re.sub(r'[\n\r\t]', '', prof_name)  # 移除换行符
            prof_name = re.sub(r'[<>:"/\\|?*]', '', prof_name)  # 移除Windows不允许的字符
            prof_name = prof_name.lower().replace(' ', '_').strip()
            output_file = str(default_output_dir / f"{prof_name}_reviews.md")

        # 保存到文件
        scraper.save_to_markdown(professor_info, reviews, output_file)

    except KeyboardInterrupt:
        print("\n\n用户中断")
        sys.exit(1)
    except Exception as e:
        print(f"\n错误: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
    finally:
        if scraper:
            scraper.close()


if __name__ == '__main__':
    main()

