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
  const [showSetSelection, setShowSetSelection] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(
    i18n.language === "zh-CN" ? "zh" : "en"
  );

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

    // 保存当前选中的题库 ID（用于语言切换时保持选择）
    const previousSelectedSetId = selectedSet?.id;

    // 加载题库
    const loadData = async () => {
      try {
        const sets = await dataService.getAvailableQuestionSets(
          courseId,
          currentLanguage
        );
        setAvailableSets(sets);

        // 如果之前有选中的题库，尝试在新语言中找到对应的题库
        if (previousSelectedSetId) {
          const matchingSet = sets.find(
            (set) => set.id === previousSelectedSetId
          );
          if (matchingSet) {
            setSelectedSet(matchingSet);
            setMarkdownContent(matchingSet.content);
            setViewMode("markdown");
            setShowSetSelection(false);
            return;
          }
        }

        // 如果只有一套题库，直接加载
        if (sets.length === 1) {
          setSelectedSet(sets[0]);
          setMarkdownContent(sets[0].content);
          setViewMode("markdown");
          setShowSetSelection(false);
        } else if (sets.length > 1) {
          // 如果有多套题库，显示选择界面
          setShowSetSelection(true);
          // 清空之前的选择
          if (!previousSelectedSetId) {
            setSelectedSet(null);
            setMarkdownContent(null);
          }
        }
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
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {t("selectCourse")}
          </h1>
          <p className="text-gray-600">{t("selectCourseDesc")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            return (
              <div
                key={course.id}
                className="card p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/practice/${course.id}`)}
              >
                <div className="flex items-center mb-4">
                  <Target className="w-8 h-8 text-algonquin-red mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {course.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {t("practiceQuestions")}
                  </span>
                  <span className="text-algonquin-red font-medium">
                    {t("actions.startPractice")} →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 如果显示题库选择界面
  if (showSetSelection && availableSets.length > 0) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate("/practice")}
            className="btn-outline flex items-center mb-4"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            {t("backToCourse")}
          </button>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {t("selectQuestionSet")}
          </h1>
          <p className="text-gray-600">{t("selectQuestionSetDesc")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availableSets.map((set) => {
            return (
              <div
                key={set.id}
                className="card p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => selectSet(set)}
              >
                <div className="flex items-center mb-4">
                  <BookOpen className="w-8 h-8 text-algonquin-red mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {set.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">{set.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {t("questionBank")}
                  </span>
                  <span className="text-algonquin-red font-medium">
                    {t("actions.startPractice")} →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 如果是 Markdown 模式，显示 Markdown 内容
  if (viewMode === "markdown" && markdownContent) {
    return (
      <div className="w-full px-4 md:px-6 lg:px-8">
        {/* 头部信息 */}
        <div className="mb-6 flex items-center justify-between max-w-7xl mx-auto">
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
        <div className="card p-6 md:p-8 lg:p-12 max-w-7xl mx-auto">
          <MarkdownRenderer content={markdownContent} showToc={false} />
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
