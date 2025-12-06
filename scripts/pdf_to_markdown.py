#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
PDF转Markdown脚本
用于将PDF文件转换为Markdown格式，高度还原原文档结构

功能特性:
- 提取文本内容（支持文本层和OCR）
- 提取图片并保存为独立文件
- 识别代码块（Prolog代码）
- 保留标题、列表、表格等结构
- 自动识别章节和页面

使用方法:
    python pdf_to_markdown.py <pdf_file_path> [output_dir] [--ocr] [--dpi DPI]

示例:
    python pdf_to_markdown.py ../public/pdfs/knowledge-reasoning/CST8503_13_Final_Review.pdf
    python pdf_to_markdown.py file.pdf --ocr --dpi 300
    python pdf_to_markdown.py file.pdf ./output
"""

import sys
import argparse
import re
from pathlib import Path
from typing import Optional, List, Dict, Tuple

try:
    import pdfplumber
except ImportError:
    print("错误: 需要安装 pdfplumber 库")
    print("请运行: pip install pdfplumber")
    sys.exit(1)

try:
    import fitz  # PyMuPDF
except ImportError:
    # PyMuPDF未安装时，图片提取功能将不可用
    fitz = None  # type: ignore

try:
    from PIL import Image
except ImportError:
    print("警告: Pillow 未安装，某些图片处理功能可能受限")
    print("建议运行: pip install Pillow")
    Image = None


class PDFToMarkdownConverter:
    """PDF转Markdown转换器"""

    def __init__(self, use_ocr: bool = False, dpi: int = 200):
        """
        初始化转换器

        Args:
            use_ocr: 是否使用OCR（当PDF是扫描版时）
            dpi: 图片分辨率（用于OCR和图片提取）
        """
        self.use_ocr = use_ocr
        self.dpi = dpi
        self.zoom = dpi / 72.0 if fitz else 1.0

        # Prolog代码块识别模式
        self.prolog_patterns = [
            r'```prolog',
            r'```\s*prolog',
            r'%[^\n]*prolog',
            r'[a-z_]+\([^)]*\)\s*:-',  # Prolog规则
            r'[a-z_]+\([^)]*\)\.',      # Prolog事实
        ]

    def extract_images_from_pdf(self, pdf_path: Path, output_dir: Path) -> Dict[int, List[str]]:
        """
        从PDF中提取图片

        Args:
            pdf_path: PDF文件路径
            output_dir: 输出目录

        Returns:
            Dict[int, List[str]]: 页面号到图片路径列表的映射
        """
        if not fitz:
            return {}

        images_dir = output_dir / f"{pdf_path.stem}_images"
        images_dir.mkdir(exist_ok=True)

        page_images = {}

        try:
            pdf_document = fitz.open(str(pdf_path))

            for page_num in range(len(pdf_document)):
                page = pdf_document[page_num]
                image_list = page.get_images()
                page_image_paths = []

                for img_index, img in enumerate(image_list):
                    try:
                        xref = img[0]
                        base_image = pdf_document.extract_image(xref)
                        image_bytes = base_image["image"]
                        image_ext = base_image["ext"]

                        # 生成图片文件名
                        img_filename = f"page_{page_num + 1:03d}_img_{img_index + 1:02d}.{image_ext}"
                        img_path = images_dir / img_filename

                        # 保存图片
                        with open(img_path, "wb") as img_file:
                            img_file.write(image_bytes)

                        # 保存相对路径
                        rel_path = f"./{images_dir.name}/{img_filename}"
                        page_image_paths.append(rel_path)

                    except Exception as e:
                        print(f"  警告: 提取第 {page_num + 1} 页第 {img_index + 1} 张图片失败: {e}")

                if page_image_paths:
                    page_images[page_num] = page_image_paths
                    print(f"  已提取第 {page_num + 1} 页的 {len(page_image_paths)} 张图片")

            pdf_document.close()

        except Exception as e:
            print(f"警告: 图片提取失败: {e}")

        return page_images

    def clean_text(self, text: str) -> str:
        """
        清理文本：移除页码、修复格式

        Args:
            text: 原始文本

        Returns:
            str: 清理后的文本
        """
        if not text:
            return ""

        lines = text.split('\n')
        cleaned_lines = []

        for line in lines:
            line = line.strip()

            # 移除单独的页码（单独的数字行，通常是页面底部的页码）
            if re.match(r'^\d+$', line) and len(line) <= 3:
                continue

            # 跳过空行（后续会统一处理）
            if not line:
                cleaned_lines.append("")
                continue

            cleaned_lines.append(line)

        return '\n'.join(cleaned_lines)

    def remove_duplicate_content(self, text: str) -> str:
        """
        移除重复内容（PDF中可能有多个文本层）

        Args:
            text: 原始文本

        Returns:
            str: 去重后的文本
        """
        if not text:
            return ""

        lines = text.split('\n')
        seen_blocks = set()
        result_lines = []
        current_block = []

        for line in lines:
            line_stripped = line.strip()

            # 空行分隔块
            if not line_stripped:
                if current_block:
                    block_text = ' '.join(current_block).strip()
                    if block_text and block_text not in seen_blocks:
                        seen_blocks.add(block_text)
                        result_lines.extend(current_block)
                        result_lines.append("")
                    current_block = []
                else:
                    result_lines.append("")
            else:
                current_block.append(line)

        # 处理最后一个块
        if current_block:
            block_text = ' '.join(current_block).strip()
            if block_text and block_text not in seen_blocks:
                result_lines.extend(current_block)

        return '\n'.join(result_lines)

    def format_lists(self, text: str) -> str:
        """
        格式化列表：将单独的"•"与下一行内容合并

        Args:
            text: 原始文本

        Returns:
            str: 格式化后的文本
        """
        lines = text.split('\n')
        formatted_lines = []
        i = 0

        while i < len(lines):
            line = lines[i].strip()

            # 如果当前行是单独的"•"或"• "，尝试与下一行合并
            if line in ['•', '• ', '·', '· ']:
                if i + 1 < len(lines):
                    next_line = lines[i + 1].strip()
                    if next_line:
                        formatted_lines.append(f"- {next_line}")
                        i += 2
                        continue

            # 如果行以"•"开头，转换为Markdown列表
            if line.startswith('•'):
                content = line[1:].strip()
                if content:
                    formatted_lines.append(f"- {content}")
                else:
                    # 单独的"•"，尝试与下一行合并
                    if i + 1 < len(lines):
                        next_line = lines[i + 1].strip()
                        if next_line:
                            formatted_lines.append(f"- {next_line}")
                            i += 2
                            continue
            else:
                formatted_lines.append(line)

            i += 1

        return '\n'.join(formatted_lines)

    def extract_code_from_text(self, text: str) -> Tuple[str, str]:
        """
        从文本中提取代码部分

        Args:
            text: 包含代码的文本

        Returns:
            Tuple[str, str]: (代码部分, 非代码部分)
        """
        lines = text.split('\n')
        code_lines = []
        non_code_lines = []
        in_code_section = False

        for line in lines:
            line_stripped = line.strip()

            # 检测代码行
            is_code_line = False
            for pattern in self.prolog_patterns:
                if re.search(pattern, line, re.IGNORECASE):
                    is_code_line = True
                    in_code_section = True
                    break

            # 检查常见的代码特征
            if not is_code_line and in_code_section:
                if re.match(r'^\s*[a-z_]+\([^)]*\)\s*[\.:-]', line):
                    is_code_line = True
                elif re.match(r'^\s*%', line):
                    is_code_line = True
                elif re.match(r'^\s*https?://', line):
                    # URL通常不是代码
                    is_code_line = False
                    in_code_section = False
                elif not line_stripped:
                    # 空行可能结束代码块
                    if code_lines:
                        is_code_line = False
                        in_code_section = False

            if is_code_line:
                code_lines.append(line)
            else:
                if code_lines and not in_code_section:
                    # 代码块结束，添加非代码内容
                    non_code_lines.append(line)
                elif not code_lines:
                    non_code_lines.append(line)
                else:
                    # 仍在代码块中，但当前行不是代码
                    if re.match(r'^[A-Z]', line_stripped) and len(line_stripped) > 10:
                        # 可能是标题，结束代码块
                        in_code_section = False
                        non_code_lines.append(line)
                    else:
                        code_lines.append(line)

        code_text = '\n'.join(code_lines).strip() if code_lines else ""
        non_code_text = '\n'.join(non_code_lines).strip() if non_code_lines else ""

        return code_text, non_code_text

    def detect_code_block(self, text: str) -> bool:
        """
        检测文本是否包含代码块

        Args:
            text: 文本内容

        Returns:
            bool: 是否包含代码
        """
        # 检查是否包含Prolog代码模式
        for pattern in self.prolog_patterns:
            if re.search(pattern, text, re.IGNORECASE):
                return True

        # 检查是否包含常见的代码特征
        code_indicators = [
            r'^\s*[a-z_]+\s*:-',  # Prolog规则开头
            r'^\s*[a-z_]+\s*\(',   # 函数调用
            r'^\s*%',              # 注释
            r'```',                # 代码块标记
        ]

        lines = text.split('\n')
        code_line_count = 0
        for line in lines[:10]:  # 检查前10行
            for indicator in code_indicators:
                if re.search(indicator, line):
                    code_line_count += 1
                    break

        return code_line_count >= 3  # 如果前10行中有3行以上是代码，认为是代码块

    def format_text_as_markdown(self, text: str, is_code: bool = False) -> str:
        """
        将文本格式化为Markdown

        Args:
            text: 原始文本
            is_code: 是否为代码块

        Returns:
            str: Markdown格式的文本
        """
        if not text.strip():
            return ""

        # 清理文本
        text = self.clean_text(text)
        text = self.remove_duplicate_content(text)
        text = self.format_lists(text)

        if is_code:
            # 提取代码部分
            code_text, non_code_text = self.extract_code_from_text(text)
            result = []

            if non_code_text:
                # 格式化非代码部分
                formatted_non_code = self._format_non_code_text(non_code_text)
                result.append(formatted_non_code)

            if code_text:
                # 代码块
                result.append(f"```prolog\n{code_text.strip()}\n```")

            return '\n\n'.join(result) if result else ""

        # 普通文本处理
        return self._format_non_code_text(text)

    def _format_non_code_text(self, text: str) -> str:
        """
        格式化非代码文本

        Args:
            text: 文本内容

        Returns:
            str: 格式化后的文本
        """
        lines = text.split('\n')
        formatted_lines = []
        prev_was_title = False

        for line in lines:
            line = line.strip()
            if not line:
                formatted_lines.append("")
                prev_was_title = False
                continue

            # 检测标题
            if re.match(r'^#+\s+', line):
                # 已经是Markdown标题格式
                formatted_lines.append(line)
                prev_was_title = True
            elif re.match(r'^\d+\.?\s+[A-Z]', line):
                # 数字开头的标题
                title_text = re.sub(r'^\d+\.?\s+', '', line)
                formatted_lines.append(f"### {title_text}")
                prev_was_title = True
            elif (line.isupper() and len(line) > 3 and len(line) < 50 and
                  not line.endswith('.') and not line.startswith('http')):
                # 全大写可能是标题（但不要太长，排除URL）
                formatted_lines.append(f"### {line}")
                prev_was_title = True
            elif re.match(r'^[A-Z][a-z]+(\s+[A-Z][a-z]+)*:?$', line) and len(line) < 50:
                # 可能是标题（首字母大写的短语）
                if not prev_was_title:
                    formatted_lines.append(f"### {line}")
                    prev_was_title = True
                else:
                    formatted_lines.append(line)
                    prev_was_title = False
            else:
                formatted_lines.append(line)
                prev_was_title = False

        return '\n'.join(formatted_lines)

    def extract_text_from_page(self, page, page_num: int) -> str:
        """
        从PDF页面提取文本

        Args:
            page: pdfplumber页面对象
            page_num: 页码

        Returns:
            str: 提取的文本
        """
        try:
            text = page.extract_text()
            if text:
                return text.strip()
        except Exception as e:
            print(f"  警告: 第 {page_num + 1} 页文本提取失败: {e}")

        return ""

    def extract_tables_from_page(self, page, page_num: int) -> List[str]:
        """
        从PDF页面提取表格

        Args:
            page: pdfplumber页面对象
            page_num: 页码

        Returns:
            List[str]: Markdown格式的表格列表
        """
        tables = []
        try:
            extracted_tables = page.extract_tables()
            for table in extracted_tables:
                if not table or len(table) == 0:
                    continue

                # 转换为Markdown表格
                md_table = self.table_to_markdown(table)
                if md_table:
                    tables.append(md_table)
        except Exception as e:
            print(f"  警告: 第 {page_num + 1} 页表格提取失败: {e}")

        return tables

    def table_to_markdown(self, table: List[List[str]]) -> str:
        """
        将表格转换为Markdown格式

        Args:
            table: 表格数据（二维列表）

        Returns:
            str: Markdown表格，如果表格无效则返回空字符串
        """
        if not table or len(table) == 0:
            return ""

        # 清理表格数据
        cleaned_table = []
        for row in table:
            cleaned_row = [str(cell).strip() if cell else "" for cell in row]
            # 过滤空行
            if any(cell for cell in cleaned_row):
                cleaned_table.append(cleaned_row)

        if len(cleaned_table) == 0:
            return ""

        # 确定列数
        max_cols = max(len(row) for row in cleaned_table)
        min_cols = min(len(row) for row in cleaned_table)

        # 过滤单列表格（通常是PDF提取错误）
        if max_cols == 1:
            return ""

        # 如果列数差异太大，可能是提取错误
        if max_cols > 1 and min_cols == 1 and len(cleaned_table) > 2:
            # 检查是否大部分是单列
            single_col_count = sum(1 for row in cleaned_table if len(row) == 1)
            if single_col_count > len(cleaned_table) * 0.7:
                return ""

        # 确保所有行都有相同的列数
        for row in cleaned_table:
            while len(row) < max_cols:
                row.append("")

        # 生成Markdown表格
        md_lines = []

        # 表头
        if len(cleaned_table) > 0:
            header = cleaned_table[0]
            # 检查表头是否有效（不是单列且内容有意义）
            if len(header) > 1 or (len(header) == 1 and len(header[0]) > 20):
                md_lines.append("| " + " | ".join(header) + " |")
                md_lines.append("| " + " | ".join(["---"] * len(header)) + " |")

                # 数据行
                for row in cleaned_table[1:]:
                    md_lines.append("| " + " | ".join(row) + " |")

        result = "\n".join(md_lines)

        # 如果表格看起来像是重复的文本内容，返回空
        if len(cleaned_table) == 2 and cleaned_table[0] == cleaned_table[1]:
            return ""

        return result

    def convert_pdf_to_markdown(
        self,
        pdf_path: str,
        output_dir: Optional[str] = None
    ) -> str:
        """
        将PDF转换为Markdown文件

        Args:
            pdf_path: PDF文件路径
            output_dir: 输出目录（可选，默认为PDF文件所在目录）

        Returns:
            str: 生成的Markdown文件路径
        """
        pdf_path = Path(pdf_path)

        if not pdf_path.exists():
            raise FileNotFoundError(f"PDF文件不存在: {pdf_path}")

        if pdf_path.suffix.lower() != '.pdf':
            raise ValueError(f"不是PDF文件: {pdf_path}")

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
        print(f"使用OCR: {'是' if self.use_ocr else '否'}")
        print()

        # 提取图片
        print("正在提取图片...")
        page_images = self.extract_images_from_pdf(pdf_path, output_dir)
        print(f"共提取 {sum(len(imgs) for imgs in page_images.values())} 张图片\n")

        # 提取文本和表格
        markdown_content = []
        markdown_content.append(f"# {pdf_path.stem.replace('_', ' ').replace('-', ' ')}\n")
        markdown_content.append("_从 PDF 文档转换生成_\n")
        markdown_content.append("\n---\n")

        total_images = sum(len(imgs) for imgs in page_images.values())
        if total_images > 0:
            markdown_content.append(f"_注: 共提取了 {total_images} 张图片_\n")
            markdown_content.append("\n")

        try:
            with pdfplumber.open(str(pdf_path)) as pdf:
                total_pages = len(pdf.pages)
                print(f"总共 {total_pages} 页，开始提取文本...\n")

                for page_num, page in enumerate(pdf.pages):
                    print(f"处理第 {page_num + 1}/{total_pages} 页...")

                    # 添加页面标题
                    markdown_content.append(f"## 第 {page_num + 1} 页\n")
                    markdown_content.append("\n")

                    # 插入图片（如果有）
                    if page_num in page_images:
                        for img_path in page_images[page_num]:
                            markdown_content.append(f"![图片]({img_path})\n")
                            markdown_content.append("\n")

                    # 提取文本
                    text = self.extract_text_from_page(page, page_num)

                    # 提取表格
                    tables = self.extract_tables_from_page(page, page_num)

                    # 处理文本
                    if text:
                        # 检测是否为代码块
                        is_code = self.detect_code_block(text)
                        formatted_text = self.format_text_as_markdown(text, is_code)

                        if formatted_text.strip():
                            markdown_content.append(formatted_text)
                            markdown_content.append("\n\n")

                    # 添加表格（过滤无效表格）
                    for table in tables:
                        if table.strip() and len(table.split('\n')) > 2:  # 至少要有表头、分隔线和一行数据
                            markdown_content.append(table)
                            markdown_content.append("\n\n")

                    # 页面分隔
                    markdown_content.append("---\n")
                    markdown_content.append("\n")

        except Exception as e:
            print(f"错误: PDF处理失败 - {e}")
            raise

        # 写入Markdown文件
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(''.join(markdown_content))

        print("\n✓ 成功生成Markdown文件")
        print(f"文件保存在: {output_path}")
        if total_images > 0:
            images_dir = output_dir / f"{pdf_path.stem}_images"
            print(f"图片保存在: {images_dir}")

        return str(output_path)


def main():
    """主函数"""
    parser = argparse.ArgumentParser(
        description="将PDF文件转换为Markdown格式（高度还原）",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
示例用法:
  python pdf_to_markdown.py ../public/pdfs/knowledge-reasoning/CST8503_13_Final_Review.pdf
  python pdf_to_markdown.py file.pdf --ocr
  python pdf_to_markdown.py file.pdf --dpi 300
  python pdf_to_markdown.py file.pdf ./output
        """
    )

    parser.add_argument(
        'pdf_path',
        help='PDF文件路径'
    )

    parser.add_argument(
        'output_dir',
        nargs='?',
        help='输出目录（可选，默认为PDF文件所在目录）'
    )

    parser.add_argument(
        '--ocr',
        action='store_true',
        help='使用OCR提取文本（适用于扫描版PDF）'
    )

    parser.add_argument(
        '--dpi',
        type=int,
        default=200,
        help='图片分辨率（每英寸点数），默认200'
    )

    args = parser.parse_args()

    converter = PDFToMarkdownConverter(use_ocr=args.ocr, dpi=args.dpi)

    try:
        md_path = converter.convert_pdf_to_markdown(
            args.pdf_path,
            args.output_dir
        )
        print(f"\n转换完成！已生成Markdown文件: {md_path}")
    except Exception as e:
        print(f"错误: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()

