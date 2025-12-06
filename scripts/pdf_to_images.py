#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
PDF转图片脚本
用于将PDF文件的所有页面合并为一张大图（垂直拼接）

使用方法:
    python pdf_to_images.py <pdf_file_path> [output_dir] [--dpi DPI] [--format FORMAT]

示例:
    python pdf_to_images.py ../public/pdfs/knowledge-reasoning/121.pdf
    python pdf_to_images.py ../public/pdfs/knowledge-reasoning/121.pdf ./output
    python pdf_to_images.py ../public/pdfs/knowledge-reasoning/121.pdf --dpi 300
    python pdf_to_images.py ../public/pdfs/knowledge-reasoning/121.pdf --format jpg
"""

import sys
import argparse
from pathlib import Path
from typing import Optional

try:
    import fitz  # PyMuPDF
except ImportError:
    print("错误: 需要安装 PyMuPDF 库")
    print("请运行: pip install PyMuPDF")
    sys.exit(1)


class PDFToImageConverter:
    """PDF转图片转换器"""

    def __init__(self, dpi: int = 200):
        """
        初始化转换器

        Args:
            dpi: 图片分辨率（每英寸点数），默认200
        """
        self.dpi = dpi
        self.zoom = dpi / 72.0  # PyMuPDF使用72 DPI作为基准

    def merge_pages_to_single_image(
        self,
        pdf_path: str,
        output_dir: Optional[str] = None,
        image_format: str = "png"  # 保留参数以兼容，但实际总是使用png
    ) -> str:
        """
        将PDF的所有页面合并为一张大图（垂直拼接）

        Args:
            pdf_path: PDF文件路径
            output_dir: 输出目录（可选，默认为PDF文件所在目录）
            image_format: 图片格式（png, jpg等），默认png

        Returns:
            str: 生成的图片文件路径
        """
        pdf_path = Path(pdf_path)

        if not pdf_path.exists():
            raise FileNotFoundError(f"PDF文件不存在: {pdf_path}")

        if pdf_path.suffix.lower() != '.pdf':
            raise ValueError(f"不是PDF文件: {pdf_path}")

        # 确定输出目录（直接使用PDF文件所在目录）
        if output_dir:
            output_dir = Path(output_dir)
            output_dir.mkdir(parents=True, exist_ok=True)
        else:
            output_dir = pdf_path.parent

        print(f"正在处理PDF文件: {pdf_path}")
        print(f"输出目录: {output_dir}")
        print(f"分辨率: {self.dpi} DPI")
        print(f"图片格式: {image_format.upper()}\n")

        try:
            # 打开PDF文件
            pdf_document = fitz.open(str(pdf_path))
            total_pages = len(pdf_document)

            print(f"总共 {total_pages} 页，开始转换...\n")

            # 渲染所有页面
            page_pixmaps = []
            max_width = 0
            total_height = 0

            for page_num in range(total_pages):
                page = pdf_document[page_num]
                # 设置缩放矩阵（根据DPI）
                mat = fitz.Matrix(self.zoom, self.zoom)
                # 渲染页面为图片
                pix = page.get_pixmap(matrix=mat)
                page_pixmaps.append(pix)

                max_width = max(max_width, pix.width)
                total_height += pix.height

                print(f"  已渲染第 {page_num + 1}/{total_pages} 页 (尺寸: {pix.width}x{pix.height})")

            # 创建合并后的大图
            print(f"\n正在合并图片...")
            print(f"  总尺寸: {max_width}x{total_height}")

            if not page_pixmaps:
                raise ValueError("没有页面可以合并")

            # 使用PIL来合并图片（更可靠的方法）
            try:
                from PIL import Image
                import io

                # 创建白色背景图片
                merged_img = Image.new('RGB', (max_width, total_height), (255, 255, 255))

                current_y = 0
                for idx, pix in enumerate(page_pixmaps):
                    # 将Pixmap转换为PIL Image
                    # 使用tobytes("png")获取PNG格式的字节数据
                    img_bytes = io.BytesIO(pix.tobytes("png"))
                    page_img = Image.open(img_bytes)

                    # 确保是RGB模式
                    if page_img.mode != 'RGB':
                        if page_img.mode == 'RGBA':
                            # 如果有透明通道，合成到白色背景
                            rgb_img = Image.new('RGB', page_img.size, (255, 255, 255))
                            rgb_img.paste(page_img, mask=page_img.split()[3])
                            page_img = rgb_img
                        else:
                            page_img = page_img.convert('RGB')

                    # 如果页面宽度小于最大宽度，居中放置
                    x_offset = (max_width - pix.width) // 2
                    # 将页面图片粘贴到合并图片上
                    merged_img.paste(page_img, (x_offset, current_y))
                    current_y += pix.height
                    print(f"  已合并第 {idx + 1}/{total_pages} 页")

                # 直接使用PIL保存，不需要转换回Pixmap
                # 生成文件名（与PDF文件名一致，扩展名改为png）
                filename = f"{pdf_path.stem}.png"
                image_path = output_dir / filename

                # 保存图片（强制使用PNG格式）
                merged_img.save(str(image_path), format='PNG')

                # 清理内存
                for pix in page_pixmaps:
                    pix = None
                pdf_document.close()

                print(f"\n✓ 成功生成合并图片")
                print(f"图片保存在: {image_path}")
                print(f"最终尺寸: {max_width}x{total_height} 像素")

                return str(image_path)

            except (ImportError, Exception) as e:
                # 如果没有PIL或转换失败，使用PyMuPDF的方法
                print(f"  使用PyMuPDF方法合并图片...")
                merged_pix = fitz.Pixmap(fitz.csRGB, max_width, total_height)

                current_y = 0
                for idx, pix in enumerate(page_pixmaps):
                    # 如果页面宽度小于最大宽度，居中放置
                    x_offset = (max_width - pix.width) // 2
                    # 创建目标矩形
                    target_rect = fitz.Rect(x_offset, current_y, x_offset + pix.width, current_y + pix.height)
                    # 使用copy方法，指定源矩形和目标矩形
                    src_rect = fitz.Rect(0, 0, pix.width, pix.height)
                    # 复制像素数据
                    merged_pix.copy(pix, src_rect, target_rect)
                    current_y += pix.height
                    print(f"  已合并第 {idx + 1}/{total_pages} 页")

                # 生成文件名（与PDF文件名一致，扩展名改为png）
                filename = f"{pdf_path.stem}.png"
                image_path = output_dir / filename

                # 保存图片（强制使用PNG格式）
                merged_pix.save(str(image_path), output="png")

                # 清理内存
                for pix in page_pixmaps:
                    pix = None
                merged_pix = None
                pdf_document.close()

                print(f"\n✓ 成功生成合并图片")
                print(f"图片保存在: {image_path}")
                print(f"最终尺寸: {max_width}x{total_height} 像素")

                return str(image_path)

        except Exception as e:
            print(f"错误: 转换失败 - {e}")
            raise

    def convert_pdf_to_images(
        self,
        pdf_path: str,
        output_dir: Optional[str] = None,
        image_format: str = "png"
    ) -> str:
        """
        将PDF转换为单张大图（默认行为）

        Args:
            pdf_path: PDF文件路径
            output_dir: 输出目录（可选，默认为PDF文件所在目录）
            image_format: 图片格式（png, jpg等），默认png

        Returns:
            str: 生成的图片文件路径
        """
        image_path = self.merge_pages_to_single_image(pdf_path, output_dir, image_format)
        return image_path



def main():
    """主函数"""
    parser = argparse.ArgumentParser(
        description="将PDF文件转换为单张大图（默认行为）",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
示例用法:
  python pdf_to_images.py ../public/pdfs/knowledge-reasoning/121.pdf
  python pdf_to_images.py ../public/pdfs/knowledge-reasoning/121.pdf ./output
  python pdf_to_images.py file.pdf --dpi 300
  python pdf_to_images.py file.pdf --format jpg
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
        '--dpi',
        type=int,
        default=200,
        help='图片分辨率（每英寸点数），默认200'
    )

    parser.add_argument(
        '--format',
        type=str,
        default='png',
        choices=['png', 'jpg', 'jpeg'],
        help='图片格式，默认png'
    )

    args = parser.parse_args()

    converter = PDFToImageConverter(dpi=args.dpi)

    try:
        image_path = converter.convert_pdf_to_images(
            args.pdf_path,
            args.output_dir,
            args.format
        )
        print(f"\n转换完成！已生成合并图片: {image_path}")
    except Exception as e:
        print(f"错误: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()

