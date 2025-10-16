#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
PDF转Markdown脚本
用于将PDF文件转换为Markdown格式的文档

使用方法:
    python pdf_to_markdown.py <pdf_file_path> [output_dir]

示例:
    python pdf_to_markdown.py ../public/pdfs/ai-techniques/CST8504_02_Python_Primer.pdf
    python pdf_to_markdown.py ../public/pdfs/ai-techniques/CST8504_02_Python_Primer.pdf ./output
"""

import os
import sys
import argparse
from pathlib import Path
import pdfplumber
import re
from typing import List, Tuple, Optional


class PDFToMarkdownConverter:
    """PDF转Markdown转换器"""

    def __init__(self):
        self.supported_formats = ['.pdf']

    def extract_text_from_pdf(self, pdf_path: str) -> List[Tuple[int, str]]:
        """
        从PDF文件中提取文本

        Args:
            pdf_path: PDF文件路径

        Returns:
            List[Tuple[int, str]]: 包含页码和文本的元组列表
        """
        try:
            pages_text = []

            with pdfplumber.open(pdf_path) as pdf:
                for page_num, page in enumerate(pdf.pages, 1):
                    text = page.extract_text()
                    if text and text.strip():  # 只添加非空页面
                        pages_text.append((page_num, text))

            return pages_text

        except Exception as e:
            print(f"错误：无法读取PDF文件 {pdf_path}: {e}")
            return []

    def clean_text(self, text: str) -> str:
        """
        清理和格式化文本

        Args:
            text: 原始文本

        Returns:
            str: 清理后的文本
        """
        # 移除多余的空白字符
        text = re.sub(r'\s+', ' ', text)

        # 移除页眉页脚（通常包含页码等）
        lines = text.split('\n')
        cleaned_lines = []

        for line in lines:
            line = line.strip()
            # 跳过可能是页码的行（只包含数字）
            if re.match(r'^\d+$', line):
                continue
            # 跳过过短的行（可能是页眉页脚）
            if len(line) < 3:
                continue
            cleaned_lines.append(line)

        return '\n'.join(cleaned_lines)

    def format_as_markdown(self, pages_text: List[Tuple[int, str]], title: str) -> str:
        """
        将提取的文本格式化为Markdown

        Args:
            pages_text: 页面文本列表
            title: 文档标题

        Returns:
            str: Markdown格式的文本
        """
        markdown_content = []

        # 添加标题
        markdown_content.append(f"# {title}\n")
        markdown_content.append(f"*从PDF文档转换生成*\n")
        markdown_content.append("---\n")

        # 添加目录（基于标题）
        markdown_content.append("## 目录\n")
        toc_items = []

        for page_num, text in pages_text:
            # 查找可能的标题（以数字开头或全大写的行）
            lines = text.split('\n')
            for line in lines:
                line = line.strip()
                if self.is_likely_heading(line):
                    toc_items.append(f"- {line}")

        if toc_items:
            markdown_content.extend(toc_items[:10])  # 限制目录项数量
        else:
            markdown_content.append("- 文档内容")

        markdown_content.append("\n---\n")

        # 添加正文内容
        for page_num, text in pages_text:
            cleaned_text = self.clean_text(text)
            if cleaned_text.strip():
                markdown_content.append(f"## 第 {page_num} 页\n")
                markdown_content.append(cleaned_text)
                markdown_content.append("\n---\n")

        return '\n'.join(markdown_content)

    def is_likely_heading(self, line: str) -> bool:
        """
        判断一行是否可能是标题

        Args:
            line: 文本行

        Returns:
            bool: 是否可能是标题
        """
        if len(line) < 5 or len(line) > 100:
            return False

        # 以数字开头的行
        if re.match(r'^\d+\.?\s+', line):
            return True

        # 全大写的短行
        if line.isupper() and len(line) < 50:
            return True

        # 包含常见标题关键词
        heading_keywords = ['introduction', 'overview', 'chapter', 'section', 'conclusion',
                          'summary', 'example', 'exercise', 'note', 'warning', 'tip']
        if any(keyword in line.lower() for keyword in heading_keywords):
            return True

        return False

    def convert_pdf_to_markdown(self, pdf_path: str, output_dir: Optional[str] = None) -> str:
        """
        将PDF转换为Markdown文件

        Args:
            pdf_path: PDF文件路径
            output_dir: 输出目录（可选）

        Returns:
            str: 生成的Markdown文件路径
        """
        pdf_path = Path(pdf_path)

        if not pdf_path.exists():
            raise FileNotFoundError(f"PDF文件不存在: {pdf_path}")

        if pdf_path.suffix.lower() not in self.supported_formats:
            raise ValueError(f"不支持的文件格式: {pdf_path.suffix}")

        # 确定输出目录
        if output_dir:
            output_dir = Path(output_dir)
            output_dir.mkdir(parents=True, exist_ok=True)
        else:
            output_dir = pdf_path.parent

        # 生成输出文件名
        output_filename = f"{pdf_path.stem}.md"
        output_path = output_dir / output_filename

        print(f"正在处理PDF文件: {pdf_path}")
        print(f"输出文件: {output_path}")

        # 提取文本
        pages_text = self.extract_text_from_pdf(str(pdf_path))
        if not pages_text:
            raise ValueError("无法从PDF中提取文本内容")

        print(f"成功提取 {len(pages_text)} 页内容")

        # 生成Markdown
        title = pdf_path.stem.replace('_', ' ').replace('-', ' ')
        markdown_content = self.format_as_markdown(pages_text, title)

        # 写入文件
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(markdown_content)

        print(f"Markdown文件已生成: {output_path}")
        return str(output_path)


def main():
    """主函数"""
    parser = argparse.ArgumentParser(
        description="将PDF文件转换为Markdown格式",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
示例用法:
  python pdf_to_markdown.py ../public/pdfs/ai-techniques/CST8504_02_Python_Primer.pdf
  python pdf_to_markdown.py ../public/pdfs/ai-techniques/CST8504_02_Python_Primer.pdf ./output
  python pdf_to_markdown.py ../public/pdfs/ai-techniques/*.pdf ./output
        """
    )

    parser.add_argument(
        'pdf_path',
        help='PDF文件路径（支持通配符）'
    )

    parser.add_argument(
        'output_dir',
        nargs='?',
        help='输出目录（可选，默认为PDF文件所在目录）'
    )

    parser.add_argument(
        '--batch',
        action='store_true',
        help='批量处理模式（处理目录中的所有PDF文件）'
    )

    args = parser.parse_args()

    converter = PDFToMarkdownConverter()

    try:
        pdf_path = Path(args.pdf_path)

        if args.batch and pdf_path.is_dir():
            # 批量处理目录中的所有PDF文件
            pdf_files = list(pdf_path.glob('*.pdf'))
            if not pdf_files:
                print(f"在目录 {pdf_path} 中未找到PDF文件")
                return

            print(f"找到 {len(pdf_files)} 个PDF文件，开始批量转换...")

            for pdf_file in pdf_files:
                try:
                    converter.convert_pdf_to_markdown(str(pdf_file), args.output_dir)
                    print(f"✓ 已处理: {pdf_file.name}")
                except Exception as e:
                    print(f"✗ 处理失败 {pdf_file.name}: {e}")

            print("批量转换完成！")

        elif pdf_path.is_file():
            # 处理单个文件
            converter.convert_pdf_to_markdown(str(pdf_path), args.output_dir)

        else:
            # 处理通配符模式
            pdf_files = list(Path('.').glob(args.pdf_path))
            if not pdf_files:
                print(f"未找到匹配的PDF文件: {args.pdf_path}")
                return

            print(f"找到 {len(pdf_files)} 个匹配的PDF文件")

            for pdf_file in pdf_files:
                try:
                    converter.convert_pdf_to_markdown(str(pdf_file), args.output_dir)
                    print(f"✓ 已处理: {pdf_file.name}")
                except Exception as e:
                    print(f"✗ 处理失败 {pdf_file.name}: {e}")

    except Exception as e:
        print(f"错误: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
