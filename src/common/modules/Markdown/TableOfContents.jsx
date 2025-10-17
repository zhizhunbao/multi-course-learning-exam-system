import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { List, ChevronRight, ChevronDown } from "lucide-react";

const TableOfContents = ({ content, className = "" }) => {
  const [activeId, setActiveId] = useState("");
  const [expandedSections, setExpandedSections] = useState(new Set());

  // 解析markdown内容，提取标题
  const headings = useMemo(() => {
    if (!content) return [];

    const lines = content.split("\n");
    const extractedHeadings = [];
    let inCodeBlock = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // 检查是否在代码块中
      if (line.trim().startsWith("```")) {
        inCodeBlock = !inCodeBlock;
        continue;
      }

      // 跳过代码块中的内容
      if (inCodeBlock) continue;

      // 匹配标题 (# 到 ######)
      const match = line.match(/^(#{1,6})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2].trim();
        // 生成ID（移除特殊字符，转为小写，空格转为连字符）
        const id = text
          .toLowerCase()
          .replace(/[^\u4e00-\u9fa5a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-");

        extractedHeadings.push({
          level,
          text,
          id,
          lineNumber: i,
        });
      }
    }

    return extractedHeadings;
  }, [content]);

  // 构建层级结构
  const hierarchy = useMemo(() => {
    const result = [];
    const stack = [];

    headings.forEach((heading) => {
      const item = { ...heading, children: [] };

      // 找到合适的父节点
      while (
        stack.length > 0 &&
        stack[stack.length - 1].level >= heading.level
      ) {
        stack.pop();
      }

      if (stack.length === 0) {
        result.push(item);
      } else {
        stack[stack.length - 1].children.push(item);
      }

      stack.push(item);
    });

    return result;
  }, [headings]);

  // 监听滚动，更新活动标题
  useEffect(() => {
    // 找到滚动容器
    let scrollContainer = null;
    if (headings.length > 0) {
      const firstElement = document.getElementById(headings[0].id);
      if (firstElement) {
        let parent = firstElement.parentElement;
        while (parent) {
          const style = window.getComputedStyle(parent);
          if (
            style.overflow === "auto" ||
            style.overflow === "scroll" ||
            style.overflowY === "auto" ||
            style.overflowY === "scroll"
          ) {
            scrollContainer = parent;
            break;
          }
          parent = parent.parentElement;
        }
      }
    }

    const handleScroll = () => {
      const scrollPosition = scrollContainer
        ? scrollContainer.scrollTop + 150
        : window.scrollY + 100;

      // 找到当前滚动位置对应的标题
      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        const element = document.getElementById(heading.id);
        if (element) {
          const elementTop = scrollContainer
            ? element.offsetTop
            : element.getBoundingClientRect().top + window.scrollY;

          if (elementTop <= scrollPosition) {
            setActiveId(heading.id);
            break;
          }
        }
      }
    };

    const target = scrollContainer || window;
    target.addEventListener("scroll", handleScroll);
    handleScroll(); // 初始化

    return () => target.removeEventListener("scroll", handleScroll);
  }, [headings]);

  // 默认展开所有有子项的标题
  useEffect(() => {
    const sectionsWithChildren = new Set();

    const findSectionsWithChildren = (items) => {
      items.forEach((item) => {
        if (item.children && item.children.length > 0) {
          sectionsWithChildren.add(item.id);
          findSectionsWithChildren(item.children);
        }
      });
    };

    findSectionsWithChildren(hierarchy);
    setExpandedSections(sectionsWithChildren);
  }, [hierarchy]);

  // 切换展开/收起
  const toggleSection = (id) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // 点击标题，平滑滚动到对应位置
  const scrollToHeading = (id) => {
    console.log("Attempting to scroll to:", id);
    const element = document.getElementById(id);
    console.log("Found element:", element);
    if (element) {
      // 找到滚动容器（可能是overflow-auto的父元素）
      let scrollContainer = element.parentElement;
      while (scrollContainer) {
        const style = window.getComputedStyle(scrollContainer);
        if (
          style.overflow === "auto" ||
          style.overflow === "scroll" ||
          style.overflowY === "auto" ||
          style.overflowY === "scroll"
        ) {
          break;
        }
        scrollContainer = scrollContainer.parentElement;
      }

      // 如果找到了滚动容器，使用它；否则使用window
      if (
        scrollContainer &&
        scrollContainer !== document.documentElement &&
        scrollContainer !== document.body
      ) {
        const yOffset = -100; // 顶部偏移量（考虑固定头部）
        const elementTop = element.offsetTop;
        console.log("Scrolling container to position:", elementTop + yOffset);
        scrollContainer.scrollTo({
          top: elementTop + yOffset,
          behavior: "smooth",
        });
      } else {
        const yOffset = -80;
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        console.log("Scrolling window to position:", y);
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      setActiveId(id);
    } else {
      console.error("Element not found with id:", id);
    }
  };

  // 渲染标题项
  const renderHeading = (heading, depth = 0) => {
    const hasChildren = heading.children && heading.children.length > 0;
    const isExpanded = expandedSections.has(heading.id);
    const isActive = activeId === heading.id;
    const indent = depth * 12;

    // 二级标题(level=2)用于展开/收起，三级标题(level=3)用于跳转
    const isLevel2 = heading.level === 2;
    const isLevel3 = heading.level === 3;

    const handleClick = (e) => {
      if (isLevel2) {
        // 二级标题：只能展开/收起，不能跳转
        e.preventDefault();
        e.stopPropagation();
        toggleSection(heading.id);
        return false;
      } else if (isLevel3) {
        // 三级标题：只能跳转，不能展开/收起
        scrollToHeading(heading.id);
      }
    };

    return (
      <div key={heading.id}>
        <div
          className={`
            flex items-center py-1.5 px-2 rounded
            transition-colors duration-200
            cursor-pointer
            ${
              isActive && isLevel3
                ? "bg-blue-50 text-blue-600 font-medium"
                : isLevel2
                ? "text-gray-800 font-semibold hover:bg-gray-100"
                : "text-gray-600 hover:bg-gray-50"
            }
          `}
          style={{ paddingLeft: `${indent + 8}px` }}
          onClick={handleClick}
        >
          {isLevel2 && (
            <span className="mr-1 p-0.5">
              {isExpanded ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </span>
          )}
          {isLevel3 && <span className="w-4" />}
          <span className="text-sm line-clamp-2 flex-1">{heading.text}</span>
        </div>

        {isLevel2 && isExpanded && hasChildren && (
          <div>
            {heading.children.map((child) => renderHeading(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      <div className="flex items-center px-4 py-3 border-b border-gray-200">
        <List className="w-4 h-4 text-gray-500 mr-2" />
        <h3 className="text-sm font-semibold text-gray-900">目录</h3>
      </div>
      <div className="p-2 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {hierarchy.map((heading) => renderHeading(heading))}
      </div>
    </div>
  );
};

TableOfContents.propTypes = {
  content: PropTypes.string,
  className: PropTypes.string,
};

export default TableOfContents;
