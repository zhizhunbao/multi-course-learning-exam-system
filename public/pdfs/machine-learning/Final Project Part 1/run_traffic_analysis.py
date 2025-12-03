#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
执行 TrafficViolationAnalysis.py 并生成 Markdown 文档的脚本
支持捕获和保存 plt.show() 生成的图片

用法:
    python run_traffic_analysis.py [--output-dir OUTPUT_DIR] [--save-images]

参数:
    --output-dir: 输出目录（默认：脚本所在目录）
    --save-images: 保存 plt.show() 生成的图片（默认：False）
"""

import sys
import subprocess
import argparse
import os
from pathlib import Path


def get_script_dir() -> Path:
    """获取脚本所在目录"""
    return Path(__file__).parent.absolute()


def get_project_root() -> Path:
    """获取项目根目录"""
    script_dir = get_script_dir()
    # 如果脚本在 Final Project Part 1 目录下，向上查找项目根目录
    # 否则假设 scripts 目录的父目录就是项目根目录
    if "Final Project Part 1" in str(script_dir):
        # 从 Final Project Part 1 向上找到项目根目录
        current = script_dir
        while current.name != "multi-course-learning-exam-system" and current.parent != current:
            current = current.parent
        return current if current.name == "multi-course-learning-exam-system" else script_dir.parent.parent.parent
    return script_dir.parent


def create_wrapper_script(analysis_script: Path, output_dir: Path, save_images: bool) -> Path:
    """
    创建一个包装脚本，用于拦截 plt.show() 并保存图片

    Args:
        analysis_script: 原始分析脚本路径
        output_dir: 输出目录
        save_images: 是否保存图片

    Returns:
        包装脚本路径
    """
    # 图片保存到分析脚本所在目录的 images 子目录
    image_dir = analysis_script.parent / 'images'

    # 转义路径中的反斜杠
    image_dir_str = str(image_dir).replace('\\', '\\\\')
    script_dir = str(analysis_script.parent).replace('\\', '\\\\')
    script_path = str(analysis_script).replace('\\', '\\\\')

    wrapper_content = '''#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
自动生成的包装脚本，用于拦截 plt.show() 并保存图片
"""
import sys
import os
import matplotlib
matplotlib.use('Agg')  # 使用非交互式后端
import matplotlib.pyplot as plt

# 设置图片保存目录（与分析脚本同一目录下的 images 子目录）
_IMAGE_COUNTER = 0
_IMAGE_DIR = r"{image_dir_str}"
os.makedirs(_IMAGE_DIR, exist_ok=True)

# 保存原始的 show 函数
_original_show = plt.show

def _save_and_show(*args, **kwargs):
    """拦截 plt.show() 并保存图片"""
    global _IMAGE_COUNTER
    fig = plt.gcf()
    if fig.get_axes():  # 如果图形有坐标轴，说明有内容
        _IMAGE_COUNTER += 1
        image_filename = "figure_%03d.png" % _IMAGE_COUNTER
        image_path = os.path.join(_IMAGE_DIR, image_filename)
        fig.savefig(image_path, dpi=150, bbox_inches='tight', facecolor='white')
        # 使用相对路径引用图片（相对于分析脚本所在目录）
        print()
        print("![Figure %d](images/figure_%03d.png)" % (_IMAGE_COUNTER, _IMAGE_COUNTER))
        print()
    plt.close('all')  # 关闭所有图形以释放内存

# 替换 plt.show
plt.show = _save_and_show

# 执行原始脚本
sys.path.insert(0, r"{script_dir}")
exec(open(r"{script_path}", encoding='utf-8').read())
'''.format(
        image_dir_str=image_dir_str,
        script_dir=script_dir,
        script_path=script_path
    )

    wrapper_script = output_dir / "traffic_analysis_wrapper.py"
    wrapper_script.write_text(wrapper_content, encoding='utf-8')
    return wrapper_script


def run_traffic_analysis(output_file: Path, save_images: bool = True) -> bool:
    """
    执行 TrafficViolationAnalysis.py 并将输出保存到文件

    Args:
        output_file: 输出文件路径
        save_images: 是否保存图片（默认：True）

    Returns:
        bool: 是否成功执行
    """
    script_dir = get_script_dir()
    # 分析脚本与当前脚本在同一目录
    analysis_script = script_dir / "TrafficViolationAnalysis.py"

    if not analysis_script.exists():
        print(f"错误: 找不到分析脚本: {analysis_script}", file=sys.stderr)
        return False

    print(f"正在执行: {analysis_script}")
    print(f"输出文件: {output_file}")
    # 默认启用图片保存
    image_dir = analysis_script.parent / 'images'
    print(f"图片保存目录: {image_dir}")

    # 确保输出目录存在
    output_file.parent.mkdir(parents=True, exist_ok=True)

    try:
        # 默认启用图片保存，创建包装脚本
        wrapper_script = create_wrapper_script(analysis_script, output_file.parent, save_images)
        script_to_run = wrapper_script
        # 工作目录设置为分析脚本所在目录，以便找到 CSV 文件
        script_cwd = str(analysis_script.parent)

        # 执行脚本并将输出重定向到文件
        with open(output_file, 'w', encoding='utf-8') as f:
            env = os.environ.copy()
            env['MPLBACKEND'] = 'Agg'  # 设置 matplotlib 后端
            result = subprocess.run(
                [sys.executable, str(script_to_run)],
                stdout=f,
                stderr=subprocess.PIPE,
                cwd=script_cwd,
                env=env,
                check=False
            )

        if result.returncode != 0:
            print(f"警告: 脚本执行返回非零退出码: {result.returncode}", file=sys.stderr)
            if result.stderr:
                print(f"错误信息: {result.stderr.decode('utf-8', errors='ignore')}", file=sys.stderr)
            return False

        # 清理包装脚本
        if wrapper_script.exists():
            wrapper_script.unlink()

        print(f"✓ 成功生成 Markdown 文档: {output_file}")
        image_dir = analysis_script.parent / 'images'
        if image_dir.exists():
            image_count = len(list(image_dir.glob('*.png')))
            print(f"✓ 保存了 {image_count} 张图片到: {image_dir}")
        return True

    except Exception as e:
        print(f"错误: 执行脚本时出错: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc()
        return False


def main():
    """主函数"""
    parser = argparse.ArgumentParser(
        description="执行 TrafficViolationAnalysis.py 并生成 Markdown 文档",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
示例用法:
  # 生成 Markdown 文档并保存图片（默认行为）
  python run_traffic_analysis.py

  # 不保存图片
  python run_traffic_analysis.py --no-images

  # 指定输出目录
  python run_traffic_analysis.py --output-dir ./output
        """
    )

    parser.add_argument(
        "--output-dir",
        type=str,
        default=None,
        help="输出目录（默认：脚本所在目录）"
    )

    parser.add_argument(
        "--save-images",
        action="store_true",
        default=True,
        help="保存 plt.show() 生成的图片到 images/ 目录（默认：启用）"
    )

    parser.add_argument(
        "--no-images",
        action="store_false",
        dest="save_images",
        help="不保存图片"
    )

    args = parser.parse_args()

    # 确定输出目录
    if args.output_dir:
        output_dir = Path(args.output_dir).absolute()
    else:
        output_dir = get_script_dir()

    output_dir.mkdir(parents=True, exist_ok=True)

    # 生成 Markdown 文件路径
    md_file = output_dir / "TrafficViolationAnalysis_Report.md"

    # 执行分析脚本生成 Markdown
    if not run_traffic_analysis(md_file, save_images=args.save_images):
        print("错误: 无法生成 Markdown 文档", file=sys.stderr)
        sys.exit(1)

    print("\n完成！")


if __name__ == "__main__":
    main()

