import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import QuestionCard from "./QuestionCard";
import dataService from "../shared/services/DataService";
import {
  Target,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Clock,
  RotateCcw,
  BookOpen,
} from "lucide-react";

const PracticeModule = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("practice");
  const { courses, updateProgress, addNotification } = useApp();

  const [currentCourse, setCurrentCourse] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  // 从统一数据服务获取练习题数据
  const loadQuestions = async (courseId, language) => {
    try {
      const questionsData = await dataService.getQuestions(courseId, language);
      return questionsData.questions || [];
    } catch (error) {
      console.warn(`No questions found for course ${courseId}:`, error);
      return [];
    }
  };

  useEffect(() => {
    // 如果没有 courseId，不执行任何操作
    if (!courseId) {
      return;
    }

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

    // 获取当前语言设置
    const currentLanguage = i18n.language === "zh-CN" ? "zh" : "en";

    // 加载练习题
    loadQuestions(courseId, currentLanguage).then((courseQuestions) => {
      setQuestions(courseQuestions);
      setStartTime(Date.now());
    });
  }, [courseId, courses, i18n.language, t]);

  // 计时器
  useEffect(() => {
    if (startTime && !showResults) {
      const timer = setInterval(() => {
        setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [startTime, showResults]);

  // 获取所有可用的类别（从tags字段中提取）
  const availableCategories = Array.from(
    new Set(questions.flatMap((q) => q.tags || []).filter(Boolean))
  ).sort();

  // 根据选择的类别筛选题目
  const filteredQuestions = selectedCategory
    ? questions.filter((q) => q.tags && q.tags.includes(selectedCategory))
    : questions;

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  const handleAnswerChange = (answer) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentQuestionIndex(0); // 重置到第一题
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitPractice = () => {
    setShowResults(true);

    // 计算得分
    let correctCount = 0;
    filteredQuestions.forEach((question) => {
      const userAnswer = userAnswers[question.id];
      if (question.type === "text") {
        // 对于文本题，检查是否包含正确答案中的关键词
        if (userAnswer && question.correctAnswer) {
          const userAnswerLower = userAnswer.toLowerCase();
          const correctAnswerLower = question.correctAnswer.toLowerCase();
          // 检查用户答案是否包含正确答案中的主要关键词
          const keywords = correctAnswerLower
            .split(/[，。\s]+/)
            .filter((word) => word.length > 2);
          const hasKeywords = keywords.some((keyword) =>
            userAnswerLower.includes(keyword)
          );
          if (hasKeywords) {
            correctCount++;
          }
        }
      } else {
        if (userAnswer === question.correctAnswer) {
          correctCount++;
        }
      }
    });

    const score = Math.round((correctCount / filteredQuestions.length) * 100);

    // 保存练习结果
    updateProgress(courseId, {
      [`practice_${Date.now()}`]: {
        score,
        correctCount,
        totalQuestions: filteredQuestions.length,
        timeSpent,
        completedAt: new Date().toISOString(),
      },
    });

    addNotification({
      type: "success",
      message: `${t("practiceComplete")} ${t("score")}: ${score}`,
    });
  };

  const handleRestartPractice = () => {
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setTimeSpent(0);
    setStartTime(Date.now());
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getQuestionResult = (questionId) => {
    const userAnswer = userAnswers[questionId];
    const question = questions.find((q) => q.id === questionId);

    if (question.type === "text") {
      if (userAnswer && question.correctAnswer) {
        const userAnswerLower = userAnswer.toLowerCase();
        const correctAnswerLower = question.correctAnswer.toLowerCase();
        const keywords = correctAnswerLower
          .split(/[，。\s]+/)
          .filter((word) => word.length > 2);
        const hasKeywords = keywords.some((keyword) =>
          userAnswerLower.includes(keyword)
        );
        return hasKeywords ? "correct" : "incorrect";
      }
      return "incorrect";
    } else {
      return userAnswer === question.correctAnswer ? "correct" : "incorrect";
    }
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
                    {t("startPractice")} →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (!currentCourse || questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">{t("loading")}</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card p-8 text-center">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t("practiceComplete")}
            </h1>
            <p className="text-gray-600">
              {t("practiceCompleteDesc", { courseTitle: currentCourse.title })}
            </p>
          </div>

          {/* 成绩统计 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {filteredQuestions.length}
              </div>
              <div className="text-blue-800">{t("totalQuestions")}</div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {
                  Object.values(userAnswers).filter((answer, index) => {
                    const question = filteredQuestions[index];
                    if (question.type === "text") {
                      if (answer && question.correctAnswer) {
                        const userAnswerLower = answer.toLowerCase();
                        const correctAnswerLower =
                          question.correctAnswer.toLowerCase();
                        const keywords = correctAnswerLower
                          .split(/[，。\s]+/)
                          .filter((word) => word.length > 2);
                        return keywords.some((keyword) =>
                          userAnswerLower.includes(keyword)
                        );
                      }
                      return false;
                    }
                    return answer === question.correctAnswer;
                  }).length
                }
              </div>
              <div className="text-green-800">{t("correctAnswers")}</div>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {formatTime(timeSpent)}
              </div>
              <div className="text-purple-800">{t("timeSpent")}</div>
            </div>
          </div>

          {/* 题目回顾 */}
          <div className="text-left mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {t("questionReview")}
            </h2>
            <div className="space-y-4">
              {filteredQuestions.map((question, index) => {
                const result = getQuestionResult(question.id);
                const userAnswer = userAnswers[question.id];

                return (
                  <div
                    key={question.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900">
                        {t("questionNumber", { number: index + 1 })}
                      </h3>
                      <div
                        className={`flex items-center ${
                          result === "correct"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {result === "correct" ? (
                          <CheckCircle className="w-5 h-5 mr-1" />
                        ) : (
                          <XCircle className="w-5 h-5 mr-1" />
                        )}
                        {result === "correct" ? t("correct") : t("incorrect")}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{question.question}</p>
                    {question.type !== "text" && (
                      <div className="mb-2">
                        <p className="text-sm text-gray-600">
                          {t("yourAnswer")}
                          {question.options[userAnswer]}
                        </p>
                        <p className="text-sm text-gray-600">
                          {t("correctAnswer")}
                          {question.options[question.correctAnswer]}
                        </p>
                      </div>
                    )}
                    {question.explanation && (
                      <p className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
                        {question.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleRestartPractice}
              className="btn-outline flex items-center"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              {t("restartPractice")}
            </button>
            <button
              onClick={() => navigate("/")}
              className="btn-primary flex items-center"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              {t("backToCourse")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* 头部信息 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {currentCourse.title}
            </h1>
            <p className="text-gray-600">{t("practiceQuestions")}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              {formatTime(timeSpent)}
            </div>
            <button onClick={() => navigate("/")} className="btn-outline">
              {t("backToCourse")}
            </button>
          </div>
        </div>

        {/* 类别筛选器 */}
        {availableCategories.length > 0 && (
          <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">
                  {t("filter.category")}
                </label>
                <span className="text-sm text-gray-600">
                  {filteredQuestions.length} / {questions.length}{" "}
                  {t("totalQuestions")}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors min-w-[280px]"
                  >
                    <option value="">{t("filter.allCategories")}</option>
                    {availableCategories.map((category) => (
                      <option key={category} value={category}>
                        {t(`chapters.${category}`, category)}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                {selectedCategory && (
                  <button
                    onClick={() => handleCategoryChange("")}
                    className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border border-gray-300"
                    title={t("filter.allCategories")}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            {selectedCategory && (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <span className="font-medium">
                    {t(`chapters.${selectedCategory}`, selectedCategory)}
                  </span>
                  <span className="ml-2">
                    - {filteredQuestions.length} {t("questions")}
                  </span>
                </p>
              </div>
            )}
          </div>
        )}

        {/* 进度条 */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-algonquin-red h-2 rounded-full transition-all duration-300"
            style={{
              width: `${
                filteredQuestions.length > 0
                  ? ((currentQuestionIndex + 1) / filteredQuestions.length) *
                    100
                  : 0
              }%`,
            }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {t("questionProgress", {
            current: currentQuestionIndex + 1,
            total: filteredQuestions.length,
          })}
        </p>
      </div>

      {/* 题目内容 */}
      <QuestionCard
        question={currentQuestion}
        onAnswer={handleAnswerChange}
        onNext={handleNextQuestion}
        onPrevious={handlePreviousQuestion}
        isFirst={currentQuestionIndex === 0}
        isLast={currentQuestionIndex === filteredQuestions.length - 1}
        userAnswer={userAnswers[currentQuestion.id]}
        showSubmitButton={false}
        showNavigationButtons={false}
        practiceMode={true}
      />

      {/* 导航按钮 */}
      <div className="flex items-center justify-between pt-6">
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className="btn-outline flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          {t("previousQuestion")}
        </button>

        <div className="flex space-x-3">
          {currentQuestionIndex === filteredQuestions.length - 1 ? (
            <button
              onClick={handleSubmitPractice}
              className="btn-primary flex items-center"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              {t("submitPractice")}
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="btn-primary flex items-center"
            >
              {t("nextQuestion")}
              <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PracticeModule;
