import { X } from "lucide-react";
import PropTypes from "prop-types";

const LearningSidebar = ({
  isOpen,
  courseTitle,
  chapters,
  currentChapter,
  completedChapters,
  onToggle,
  onChapterClick,
}) => {
  const totalChapters = chapters.length;
  const progress = Math.round((completedChapters.length / totalChapters) * 100);

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-0"
      } transition-all duration-300 bg-white border-r border-gray-100 flex-shrink-0 overflow-hidden`}
    >
      <div className="h-full flex flex-col">
        {/* 侧边栏头部 */}
        <div className="px-4 py-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900 truncate">
              {courseTitle}
            </h2>
            <button
              onClick={onToggle}
              className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <div className="text-xs text-gray-400">进度 {progress}%</div>
        </div>

        {/* 目录列表 */}
        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-4 space-y-1">
            {chapters.map((chapter, chapterIndex) => (
              <button
                key={chapterIndex}
                onClick={() => onChapterClick(chapterIndex)}
                className={`w-full flex items-center py-2 px-3 text-left transition-colors rounded-lg ${
                  currentChapter === chapterIndex
                    ? "bg-blue-50 text-blue-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {/* 当前项指示器 */}
                <div className="mr-3 flex-shrink-0">
                  {currentChapter === chapterIndex ? (
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  ) : (
                    <div className="w-2 h-2 border-2 border-gray-300 rounded-full" />
                  )}
                </div>
                <span className="text-[13px] font-medium truncate leading-relaxed">
                  第{chapterIndex + 1}章: {chapter.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

LearningSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  courseTitle: PropTypes.string.isRequired,
  chapters: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  currentChapter: PropTypes.number.isRequired,
  completedChapters: PropTypes.arrayOf(PropTypes.string).isRequired,
  onToggle: PropTypes.func.isRequired,
  onChapterClick: PropTypes.func.isRequired,
};

export default LearningSidebar;
