import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Transformer } from "markmap-lib";
import { Markmap } from "markmap-view";
import {
  Brain,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Maximize,
} from "lucide-react";

const MindMap = ({ content, className = "" }) => {
  const svgRef = useRef(null);
  const markmapRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  // 将 markdown 内容转换为思维导图
  useEffect(() => {
    if (!content || !svgRef.current) return;

    try {
      // 创建 transformer
      const transformer = new Transformer();

      // 将 markdown 转换为思维导图数据
      const { root } = transformer.transform(content);

      // 如果已经存在 markmap 实例，先销毁
      if (markmapRef.current) {
        markmapRef.current.destroy();
      }

      // 创建 markmap 实例
      const mm = Markmap.create(svgRef.current, {
        duration: 500,
        maxWidth: 300,
        color: (node) => {
          // 根据层级设置不同颜色
          const colors = [
            "#3B82F6", // blue-500 - 一级标题
            "#10B981", // green-500 - 二级标题
            "#F59E0B", // amber-500 - 三级标题
            "#EF4444", // red-500 - 四级标题
            "#8B5CF6", // purple-500 - 五级标题
            "#EC4899", // pink-500 - 六级标题
          ];
          return colors[node.state.depth % colors.length];
        },
        nodeMinHeight: 20,
        spacingVertical: 8,
        spacingHorizontal: 100,
        paddingX: 10,
        paddingY: 5,
        autoFit: true,
        zoom: true,
        pan: true,
        // 初始展开层级
        initialExpandLevel: 2,
      });

      // 渲染思维导图
      mm.setData(root);
      mm.fit();

      markmapRef.current = mm;
    } catch (error) {
      console.error("思维导图渲染失败:", error);
    }

    return () => {
      if (markmapRef.current) {
        markmapRef.current.destroy();
      }
    };
  }, [content]);

  // 全屏切换
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // 放大
  const zoomIn = () => {
    if (markmapRef.current) {
      markmapRef.current.rescale(1.2);
    }
  };

  // 缩小
  const zoomOut = () => {
    if (markmapRef.current) {
      markmapRef.current.rescale(0.8);
    }
  };

  // 适应屏幕
  const fitScreen = () => {
    if (markmapRef.current) {
      markmapRef.current.fit();
    }
  };

  // 监听全屏变化，调整思维导图大小
  useEffect(() => {
    const timer = setTimeout(() => {
      if (markmapRef.current) {
        markmapRef.current.fit();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [isFullscreen]);

  if (!content) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`
        bg-white rounded-lg border border-gray-200 overflow-hidden
        ${isFullscreen ? "fixed inset-0 z-50" : ""}
        ${className}
      `}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center">
          <Brain className="w-4 h-4 text-blue-600 mr-2" />
          <h3 className="text-sm font-semibold text-gray-900">思维导图</h3>
          <span className="ml-2 text-xs text-gray-500">
            (可拖拽、缩放、点击节点展开/收起)
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={zoomOut}
            className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-white rounded transition-colors"
            title="缩小"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={zoomIn}
            className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-white rounded transition-colors"
            title="放大"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={fitScreen}
            className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-white rounded transition-colors"
            title="适应屏幕"
          >
            <Maximize className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-gray-300 mx-1" />
          <button
            onClick={toggleFullscreen}
            className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-white rounded transition-colors"
            title={isFullscreen ? "退出全屏" : "全屏查看"}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
      <div className={isFullscreen ? "h-[calc(100vh-48px)]" : "h-96"}>
        <svg
          ref={svgRef}
          className="w-full h-full"
          style={{ background: "linear-gradient(to bottom, #f9fafb, #ffffff)" }}
        />
      </div>
    </div>
  );
};

MindMap.propTypes = {
  content: PropTypes.string,
  className: PropTypes.string,
};

export default MindMap;
