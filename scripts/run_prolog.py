#!/usr/bin/env python3
"""
直接执行 Prolog 文件的简单脚本
用法: python run_prolog.py [prolog_file.pl]
"""

import subprocess
import os
import sys


def run_prolog_file(prolog_file):
    """执行 Prolog 文件"""
    if not os.path.exists(prolog_file):
        print(f"错误: 找不到文件 {prolog_file}")
        sys.exit(1)

    # 转换为绝对路径
    abs_path = os.path.abspath(prolog_file)

    print(f"正在执行: {prolog_file}\n")
    print("=" * 60)

    try:
        # 使用 SWI-Prolog 加载文件
        # -s 指定源文件，-g true 执行后退出，-t halt 确保退出
        cmd = ['swipl', '-s', abs_path, '-g', 'true', '-t', 'halt.']
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=30
        )

        # 显示输出
        if result.stdout:
            print(result.stdout)

        if result.stderr:
            print("错误输出:", file=sys.stderr)
            print(result.stderr, file=sys.stderr)

        print("=" * 60)
        print(f"执行完成 (退出码: {result.returncode})")

    except FileNotFoundError:
        print("错误: 未找到 SWI-Prolog")
        print("请确保已安装 SWI-Prolog 并在 PATH 中")
        print("下载地址: https://www.swi-prolog.org/Download.html")
        sys.exit(1)
    except subprocess.TimeoutExpired:
        print("错误: 执行超时")
        sys.exit(1)
    except Exception as e:
        print(f"错误: {e}")
        sys.exit(1)


def main():
    """主函数"""
    if len(sys.argv) < 2:
        # 默认执行 blocks_world_planning_zh.pl
        script_dir = os.path.dirname(os.path.abspath(__file__))
        project_root = os.path.dirname(script_dir)
        default_file = os.path.join(
            project_root,
            "public/pdfs/knowledge-reasoning/Course8 Planning/blocks_world_planning_zh.pl"
        )

        if os.path.exists(default_file):
            run_prolog_file(default_file)
        else:
            print("用法: python run_prolog.py <prolog_file.pl>")
            sys.exit(1)
    else:
        run_prolog_file(sys.argv[1])


if __name__ == "__main__":
    main()
