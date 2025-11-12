import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import MarkdownRenderer from "../../common/modules/Markdown/MarkdownRenderer";
import dataService from "../../services/DataService";
import { Target, ChevronLeft, Clock, BookOpen } from "lucide-react";

const PracticeModule = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("practice");
  const { courses } = useApp();

  const [currentCourse, setCurrentCourse] = useState(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [viewMode, setViewMode] = useState("markdown");
  const [markdownContent, setMarkdownContent] = useState(null);
  const [availableSets, setAvailableSets] = useState([]);
  const [selectedSet, setSelectedSet] = useState(null);
  const [showSetSelection, setShowSetSelection] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState(
    i18n.language === "zh-CN" ? "zh" : "en"
  );
  const [courseSetsCount, setCourseSetsCount] = useState({});

  // 用 ref 来跟踪已加载的课程和语言，避免重复加载
  const loadedRef = useRef({ courseId: null, language: null });

  // 选择题库
  const selectSet = (set) => {
    setSelectedSet(set);
    setMarkdownContent(set.content);
    setViewMode("markdown");
    setShowSetSelection(false);
    setStartTime(Date.now());
    setTimeSpent(0);
  };

  // 加载所有课程的题库数量
  useEffect(() => {
    const loadCourseSetsCount = async () => {
      const counts = {};
      for (const course of courses) {
        try {
          const sets = await dataService.getAvailableQuestionSets(
            course.id,
            currentLanguage
          );
          counts[course.id] = sets.length;
        } catch (error) {
          counts[course.id] = 0;
        }
      }
      setCourseSetsCount(counts);
    };

    if (!courseId && courses.length > 0) {
      loadCourseSetsCount();
    }
  }, [courses, currentLanguage, courseId]);

  // 监听语言变化
  useEffect(() => {
    const newLanguage = i18n.language === "zh-CN" ? "zh" : "en";
    if (newLanguage !== currentLanguage) {
      setCurrentLanguage(newLanguage);
    }
  }, [i18n.language, currentLanguage]);

  // 初始加载和语言切换效果
  useEffect(() => {
    // 如果没有 courseId，不执行任何操作
    if (!courseId) {
      return;
    }

    // 检查是否已经加载过相同的课程和语言
    if (
      loadedRef.current.courseId === courseId &&
      loadedRef.current.language === currentLanguage
    ) {
      return;
    }

    // 标记为已加载
    loadedRef.current = { courseId, language: currentLanguage };

    const course = courses.find((c) => c.id === courseId);
    if (course) {
      setCurrentCourse(course);
    } else {
      setCurrentCourse({
        id: courseId,
        title: t("defaultCourseTitle"),
        description: t("defaultCourseDescription"),
      });
    }

    // 加载题库
    const loadData = async () => {
      try {
        const sets = await dataService.getAvailableQuestionSets(
          courseId,
          currentLanguage
        );
        setAvailableSets(sets);

        // 始终显示题库选择界面，即使只有一套题库或之前有选中的题库
        setShowSetSelection(true);
        // 清空之前的选择，让用户重新选择
        setSelectedSet(null);
        setMarkdownContent(null);
        setViewMode("markdown");
      } catch (error) {
        console.warn(`No questions found for course ${courseId}:`, error);
      }
    };

    loadData();

    // 只在首次加载课程时设置开始时间
    if (!startTime) {
      setStartTime(Date.now());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, currentLanguage]);

  // 计时器
  useEffect(() => {
    if (startTime) {
      const timer = setInterval(() => {
        setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [startTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // 如果没有courseId，显示课程选择界面
  if (!courseId) {
    return (
      <div className="max-w-7xl xl:max-w-none xl:mx-8 mx-auto">
        <div className="text-left mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t("selectCourse")}
          </h1>
          <p className="text-gray-600">{t("selectCourseDesc")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const courseTitle =
              currentLanguage === "en" ? course.nameEn : course.name;
            const courseDesc =
              currentLanguage === "en"
                ? course.descriptionEn
                : course.description;
            const setsCount = courseSetsCount[course.id] || 0;
            return (
              <div
                key={course.id}
                className="card p-6 hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-full"
                onClick={() => navigate(`/practice/${course.id}`)}
              >
                <div className="flex items-start mb-4">
                  <Target className="w-8 h-8 text-blue-600 mr-3 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 break-words">
                    {courseTitle}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                  {courseDesc}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm text-gray-500 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    {setsCount} {t("chapterList.practice")}
                  </span>
                  <button className="btn-primary text-sm px-4 py-2">
                    {t("actions.startPractice")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 获取当前课程信息
  const course = courses.find((c) => c.id === courseId);
  const courseTitle = currentLanguage === "en" ? course?.nameEn : course?.name;

  // 如果显示题库选择界面
  if (showSetSelection && availableSets.length > 0) {
    return (
      <div className="max-w-7xl xl:max-w-none xl:mx-8 mx-auto">
        {/* 返回按钮和标题 */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/practice")}
            className="text-sm text-gray-600 hover:text-gray-900 flex items-center transition-colors mb-4"
          >
            <ChevronLeft className="w-4 h-4 mr-0.5" />
            {t("backToCourse")}
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {courseTitle}
          </h1>
          <p className="text-gray-600">{t("chapterList.subtitle")}</p>
        </div>

        {/* 题库列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableSets.map((set, index) => {
            return (
              <div
                key={set.id}
                className="card p-6 hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-full relative overflow-hidden"
                onClick={() => selectSet(set)}
              >
                {/* 题库标题 */}
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 break-words">
                      {set.title}
                    </h3>
                  </div>
                </div>

                {/* 题库描述 */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                  {set.description}
                </p>

                {/* 题库信息 */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                  <span className="text-xs text-gray-500">
                    {t("questionBank")}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                    {t("chapterList.practice")}
                  </span>
                </div>

                {/* 开始练习按钮 */}
                <button className="btn-primary text-sm px-4 py-2 mt-4 w-full">
                  {t("chapterList.startPractice")}
                </button>
              </div>
            );
          })}
        </div>

        {/* 没有题库 */}
        {availableSets.length === 0 && (
          <div className="text-center py-12">
            <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {t("chapterList.noQuestions")}
            </h3>
            <p className="text-gray-600">{t("chapterList.noQuestionsDesc")}</p>
          </div>
        )}
      </div>
    );
  }

  // 如果是 Markdown 模式，显示 Markdown 内容
  if (viewMode === "markdown" && markdownContent) {
    return (
      <div className="flex flex-col bg-white shadow-sm rounded-lg overflow-hidden">
        {/* 头部信息 */}
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center space-x-4">
            {availableSets.length > 1 ? (
              <button
                onClick={() => setShowSetSelection(true)}
                className="btn-outline flex items-center"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                {t("changeQuestionSet")}
              </button>
            ) : (
              <button
                onClick={() => navigate("/practice")}
                className="btn-outline flex items-center"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                {t("backToCourse")}
              </button>
            )}
            {selectedSet && (
              <div className="flex items-center space-x-2 text-sm">
                <BookOpen className="w-4 h-4 text-algonquin-red" />
                <span className="text-gray-700 font-medium">
                  {selectedSet.title}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            {formatTime(timeSpent)}
          </div>
        </div>

        {/* Markdown 内容 */}
        <div className="bg-white">
          <div className="px-6 py-6 space-y-8">
            <div className="card p-6 md:p-8 lg:p-12">
              <MarkdownRenderer content={markdownContent} showToc={false} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentCourse || !markdownContent) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">{t("loading")}</p>
        </div>
      </div>
    );
  }

  return null;
};

export default PracticeModule;
