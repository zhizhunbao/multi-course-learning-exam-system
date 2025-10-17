import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  FileText,
} from "lucide-react";
import PropTypes from "prop-types";
import { MarkdownRenderer, TableOfContents } from "@/common/modules";

const LessonContent = ({
  chapterData,
  progress,
  canGoPrevious,
  canGoNext,
  onPrevious,
  onNext,
  onMarkComplete,
}) => {
  return (
    <div className="flex-1 overflow-y-auto bg-white scrollbar-hide">
      {/* 紧凑的标题栏 - 固定在顶部 */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-semibold text-gray-900 truncate max-w-md">
              {chapterData?.title}
            </h1>
            <div className="flex items-center text-xs text-gray-400">
              <Clock className="w-3 h-3 mr-1" />
              <span>{chapterData?.duration || "30分钟"}</span>
            </div>
          </div>

          {/* 右上角操作按钮 */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onPrevious}
              disabled={!canGoPrevious}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="上一章"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={onNext}
              disabled={!canGoNext}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="下一章"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={onMarkComplete}
              className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <CheckCircle className="w-3 h-3 mr-1" />
              完成
            </button>
          </div>
        </div>

        {/* 进度条 */}
        <div className="mt-2">
          <div className="bg-gray-200 rounded-full h-1 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-1 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="px-6 py-6 space-y-8">
        {/* 目录树 */}
        {chapterData?.content && (
          <TableOfContents content={chapterData.content} />
        )}

        {/* 学习目标 - 紧凑显示 */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">学习目标</h2>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {(
                chapterData?.objectives || [
                  "理解核心概念和原理",
                  "掌握基本操作技能",
                  "能够应用所学知识解决实际问题",
                  "培养批判性思维能力",
                ]
              ).map((objective, index) => (
                <div key={index} className="flex items-start text-sm">
                  <span className="text-blue-500 mr-2 mt-0.5 font-bold">•</span>
                  <p className="text-gray-700 leading-relaxed">{objective}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 内容讲解 - 主要学习内容 */}
        <div className="space-y-4">
          {chapterData?.content ? (
            <MarkdownRenderer content={chapterData.content} />
          ) : (
            <div className="text-gray-500 text-center py-8">
              章节内容正在加载中...
            </div>
          )}
        </div>

        {/* 知识总结 - 紧凑显示 */}
        {chapterData?.keyPoints && chapterData.keyPoints.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">知识总结</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(chapterData.keyPoints || []).map((point, index) => (
                  <div key={index} className="flex items-start text-sm">
                    <span className="text-gray-500 mr-2 mt-0.5 font-bold">
                      {index + 1}.
                    </span>
                    <p className="text-gray-700 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 资源扩展 - 紧凑显示 */}
        {chapterData?.resources && chapterData.resources.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">相关资源</h2>
            <div className="space-y-2">
              {chapterData.resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center min-w-0 flex-1">
                    <FileText className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm truncate group-hover:text-gray-900">
                      {resource.name}
                    </span>
                  </div>
                  <Download className="w-3 h-3 text-gray-400 group-hover:text-gray-900 ml-2" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

LessonContent.propTypes = {
  chapterData: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    duration: PropTypes.string,
    objectives: PropTypes.arrayOf(PropTypes.string),
    content: PropTypes.string,
    contentPath: PropTypes.string,
    keyPoints: PropTypes.arrayOf(PropTypes.string),
    resources: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
      })
    ),
  }),
  progress: PropTypes.number.isRequired,
  canGoPrevious: PropTypes.bool.isRequired,
  canGoNext: PropTypes.bool.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onMarkComplete: PropTypes.func.isRequired,
};

export default LessonContent;
