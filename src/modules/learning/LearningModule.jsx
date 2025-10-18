import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { BookOpen } from "lucide-react";

// 导入子组件
import LearningHeader from "./components/LearningHeader";
import LessonContent from "./components/LessonContent";
import CourseSelection from "./components/CourseSelection";

// 导入自定义 Hook
import useCourseData from "./hooks/useCourseData";

const LearningModule = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { courses, userProgress, updateProgress, addNotification } = useApp();

  // 使用自定义 Hook 管理课程数据
  const {
    currentCourse,
    courseContent,
    currentChapter,
    setCurrentChapter,
    loading,
    completedChapters,
    setCompletedChapters,
  } = useCourseData(courseId, userProgress, addNotification);

  // 如果没有courseId，显示课程选择界面
  if (!courseId) {
    return (
      <CourseSelection
        courses={courses}
        onSelectCourse={(id) => navigate(`/learning/${id}`)}
      />
    );
  }

  // 显示加载状态
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">课程内容加载中...</p>
        </div>
      </div>
    );
  }

  // 如果没有课程内容，显示错误状态
  if (!courseContent) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">课程内容加载失败</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary mt-4"
          >
            重新加载
          </button>
        </div>
      </div>
    );
  }

  const currentChapterData = courseContent.chapters?.[currentChapter];

  // 计算进度百分比
  const totalChapters = courseContent.chapters.length;
  const progress = Math.round((completedChapters.length / totalChapters) * 100);

  // 导航处理函数
  const handlePreviousChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  const handleNextChapter = () => {
    if (currentChapter < courseContent.chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
    }
  };

  const handleMarkComplete = () => {
    if (currentCourse && currentChapterData) {
      const progressKey = `chapter-${currentChapter}`;
      updateProgress(courseId, {
        [progressKey]: {
          completed: true,
          completedAt: new Date().toISOString(),
        },
      });

      // 更新本地状态
      setCompletedChapters((prev) => {
        if (!prev.includes(progressKey)) {
          return [...prev, progressKey];
        }
        return prev;
      });

      addNotification({
        type: "success",
        message: "章节标记为已完成",
      });
    }
  };

  const canGoPrevious = currentChapter > 0;
  const canGoNext = currentChapter < courseContent.chapters.length - 1;

  return (
    <div className="absolute inset-0 flex flex-col bg-gray-50">
      {/* 顶部导航栏 */}
      <LearningHeader onBack={() => navigate("/learning")} />

      {/* 学习内容区域 */}
      <LessonContent
        chapterData={currentChapterData}
        chapterIndex={currentChapter}
        progress={progress}
        canGoPrevious={canGoPrevious}
        canGoNext={canGoNext}
        onPrevious={handlePreviousChapter}
        onNext={handleNextChapter}
        onMarkComplete={handleMarkComplete}
      />
    </div>
  );
};

export default LearningModule;
