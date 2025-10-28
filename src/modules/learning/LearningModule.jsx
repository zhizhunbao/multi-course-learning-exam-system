import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle,
  FileText,
  Download,
} from "lucide-react";
import { MarkdownRenderer, TableOfContents } from "@/common/modules";
import dataService from "../../services/DataService";

const LearningModule = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("learning");
  const { courses, userProgress, updateProgress, addNotification } = useApp();

  const [language, setLanguage] = useState(
    i18n.language === "zh-CN" ? "zh" : "en"
  );
  const [courseContent, setCourseContent] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [completedChapters, setCompletedChapters] = useState([]);
  const [courseChapterCounts, setCourseChapterCounts] = useState({});

  // 加载课程选择界面的章节数量
  useEffect(() => {
    if (courseId) return; // 如果已经选择了课程，跳过

    const loadCourseChapterCounts = async () => {
      try {
        const counts = {};
        for (const course of courses) {
          try {
            const content = await dataService.getCourseContent(
              course.id,
              language
            );
            counts[course.id] = content?.chapters?.length || 0;
          } catch (error) {
            console.error(`Failed to load chapters for ${course.id}:`, error);
            counts[course.id] = 0;
          }
        }
        setCourseChapterCounts(counts);
      } catch (error) {
        console.error("Failed to load course chapter counts:", error);
      }
    };

    loadCourseChapterCounts();
  }, [courses, courseId, language]);

  // 加载课程数据
  useEffect(() => {
    if (!courseId) return;

    const loadCourseData = async () => {
      setLoading(true);
      try {
        const content = await dataService.getCourseContent(courseId, language);
        setCourseContent(content);

        // 初始化已完成的章节
        const progress = userProgress[courseId] || {};
        const completed = [];
        if (content && content.chapters) {
          content.chapters.forEach((chapter, chapterIndex) => {
            const chapterKey = `chapter-${chapterIndex}`;
            if (progress[chapterKey]?.completed) {
              completed.push(chapterKey);
            }
          });
        }
        setCompletedChapters(completed);
      } catch (error) {
        console.error("Failed to load course content:", error);
        addNotification({
          type: "error",
          message: t("loading.error"),
        });
      } finally {
        setLoading(false);
      }
    };

    loadCourseData();
  }, [courseId, userProgress, addNotification, t, language]);

  // 监听语言变化
  useEffect(() => {
    const newLanguage = i18n.language === "zh-CN" ? "zh" : "en";
    if (newLanguage !== language) {
      setLanguage(newLanguage);
    }
  }, [i18n.language, language]);

  // 处理函数
  const handlePreviousChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  const handleNextChapter = () => {
    if (currentChapter < courseContent?.chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
    }
  };

  const handleMarkComplete = () => {
    if (courseContent?.chapters[currentChapter]) {
      const progressKey = `chapter-${currentChapter}`;
      updateProgress(courseId, {
        [progressKey]: {
          completed: true,
          completedAt: new Date().toISOString(),
        },
      });

      setCompletedChapters((prev) => {
        if (!prev.includes(progressKey)) {
          return [...prev, progressKey];
        }
        return prev;
      });

      addNotification({
        type: "success",
        message: t("notifications.completed"),
      });
    }
  };

  // 如果没有courseId，显示课程选择界面
  if (!courseId) {
    return (
      <div className="max-w-7xl xl:max-w-none xl:mx-8 mx-auto">
        <div className="text-left mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t("selectCourse.title")}
          </h1>
          <p className="text-gray-600">{t("selectCourse.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const courseTitle = language === "en" ? course.nameEn : course.name;
            const courseDesc =
              language === "en" ? course.descriptionEn : course.description;

            return (
              <div
                key={course.id}
                className="card p-6 hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-full"
                onClick={() => navigate(`/learning/${course.id}`)}
              >
                <div className="flex items-start mb-4">
                  <BookOpen className="w-8 h-8 text-blue-600 mr-3 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 break-words">
                    {courseTitle}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                  {courseDesc}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm text-gray-500">
                    {courseChapterCounts[course.id] || 0}{" "}
                    {t("courseSelection.chapters")}
                  </span>
                  <button className="btn-primary text-sm px-4 py-2">
                    {t("courseSelection.start")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {t("noCourses.title")}
            </h3>
            <p className="text-gray-600">{t("noCourses.description")}</p>
          </div>
        )}
      </div>
    );
  }

  // 显示加载状态
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">{t("loading.title")}</p>
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
          <p className="text-gray-500">{t("loading.error")}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary mt-4"
          >
            {t("loading.reload")}
          </button>
        </div>
      </div>
    );
  }

  const currentChapterData = courseContent.chapters?.[currentChapter];
  const totalChapters = courseContent.chapters.length;
  const progress = Math.round((completedChapters.length / totalChapters) * 100);
  const canGoPrevious = currentChapter > 0;
  const canGoNext = currentChapter < courseContent.chapters.length - 1;

  return (
    <div className="flex flex-col bg-white shadow-sm rounded-lg overflow-hidden">
      {/* 顶部导航栏 */}
      <div className="bg-white px-6 py-3">
        <button
          onClick={() => navigate("/learning")}
          className="text-sm text-gray-600 hover:text-gray-900 flex items-center transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-0.5" />
          {t("header.back")}
        </button>
      </div>

      {/* 学习内容区域 */}
      <div className="bg-white">
        {/* 紧凑的标题栏 - 固定在顶部 */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-lg font-semibold text-gray-900 truncate max-w-md">
                {currentChapterData?.title}
              </h1>
              <div className="flex items-center text-xs text-gray-400">
                <Clock className="w-3 h-3 mr-1" />
                <span>
                  {currentChapterData?.duration || `30${t("lesson.duration")}`}
                </span>
              </div>
            </div>

            {/* 右上角操作按钮 */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePreviousChapter}
                disabled={!canGoPrevious}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                title={t("header.previous")}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextChapter}
                disabled={!canGoNext}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                title={t("header.next")}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleMarkComplete}
                className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <CheckCircle className="w-3 h-3 mr-1" />
                {t("header.complete")}
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
          {currentChapterData?.content && (
            <TableOfContents content={currentChapterData.content} />
          )}

          {/* 学习目标 */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {t("lesson.objectives")}
            </h2>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {(
                  currentChapterData?.objectives || [
                    "理解核心概念和原理",
                    "掌握基本操作技能",
                    "能够应用所学知识解决实际问题",
                    "培养批判性思维能力",
                  ]
                ).map((objective, index) => (
                  <div key={index} className="flex items-start text-sm">
                    <span className="text-blue-500 mr-2 mt-0.5 font-bold">
                      •
                    </span>
                    <p className="text-gray-700 leading-relaxed">{objective}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 内容讲解 */}
          <div className="space-y-4">
            {currentChapterData?.content ? (
              <MarkdownRenderer content={currentChapterData.content} />
            ) : (
              <div className="text-gray-500 text-center py-8">
                {t("loading.content")}
              </div>
            )}
          </div>

          {/* 知识总结 */}
          {currentChapterData?.keyPoints &&
            currentChapterData.keyPoints.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">
                  {t("lesson.summary")}
                </h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentChapterData.keyPoints.map((point, index) => (
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

          {/* 资源扩展 */}
          {currentChapterData?.resources &&
            currentChapterData.resources.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">
                  {t("lesson.resources")}
                </h2>
                <div className="space-y-2">
                  {currentChapterData.resources.map((resource, index) => (
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
    </div>
  );
};

export default LearningModule;
