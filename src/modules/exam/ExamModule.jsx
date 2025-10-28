import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import dataService from "../../services/DataService";
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BookOpen,
  RotateCcw,
} from "lucide-react";

const ExamModule = () => {
  const { t, i18n } = useTranslation();
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { courses, userProgress, updateProgress, addNotification } = useApp();

  const [currentCourse, setCurrentCourse] = useState(null);
  const [exams, setExams] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentExamIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [examStarted, setExamStarted] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [language, setLanguage] = useState("en"); // 默认英文

  // 加载考试配置数据
  const loadExamConfig = async (courseId) => {
    try {
      const examConfigData = await dataService.getExamConfig(courseId);
      return examConfigData.exams || [];
    } catch (error) {
      console.warn(`No exam config found for course ${courseId}:`, error);
      return [];
    }
  };

  useEffect(() => {
    const initializeExam = async () => {
      // 如果没有courseId，不执行初始化
      if (!courseId) {
        return;
      }

      const course = courses.find((c) => c.id === courseId);
      if (course) {
        setCurrentCourse(course);
      } else {
        setCurrentCourse({
          id: courseId,
          title: t("title"),
          description: "",
        });
      }

      // 加载考试配置数据
      const courseExams = await loadExamConfig(courseId);
      setExams(courseExams);
    };

    initializeExam();
  }, [courseId, courses]);

  const currentQuestion = questions[currentQuestionIndex];
  const currentExam = exams[currentExamIndex];

  const handleSubmitExam = useCallback(() => {
    setExamSubmitted(true);
    setExamStarted(false);

    // 计算得分
    let totalScore = 0;
    let correctAnswers = 0;

    questions.forEach((question) => {
      const userAnswer = userAnswers[question.id];
      let isCorrect = false;

      if (question.type === "text") {
        // 对于文本题，简单检查是否包含关键词
        if (
          userAnswer &&
          userAnswer.toLowerCase().includes("组件") &&
          userAnswer.toLowerCase().includes("元素")
        ) {
          isCorrect = true;
        }
      } else {
        isCorrect = userAnswer === question.correctAnswer;
      }

      if (isCorrect) {
        totalScore += question.points;
        correctAnswers++;
      }
    });

    const percentage = Math.round((totalScore / 100) * 100);
    const passed = percentage >= currentExam.passScore;

    // 保存考试结果
    updateProgress(courseId, {
      [`exam_${currentExam.id}`]: {
        score: percentage,
        totalScore: 100,
        correctAnswers,
        totalQuestions: questions.length,
        passed,
        timeSpent: currentExam.duration * 60 - timeRemaining,
        completedAt: new Date().toISOString(),
      },
    });

    addNotification({
      type: passed ? "success" : "warning",
      message: t("results.completed", {
        score: percentage,
        status: passed ? t("status.completed") : t("status.timeUp"),
      }),
    });

    setShowResults(true);
  }, [
    currentExam,
    questions,
    userAnswers,
    timeRemaining,
    courseId,
    updateProgress,
    addNotification,
  ]);

  // 考试计时器
  useEffect(() => {
    if (examStarted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [examStarted, timeRemaining, handleSubmitExam]);

  const startExam = async () => {
    try {
      // 获取考试题目
      const examQuestions = await dataService.getExamQuestions(
        courseId,
        currentExam.id,
        language
      );
      setQuestions(examQuestions);

      setExamStarted(true);
      setTimeRemaining(currentExam.duration * 60); // 转换为秒
      setCurrentQuestionIndex(0);
      setUserAnswers({});
    } catch (error) {
      console.error("Failed to load exam questions:", error);
      addNotification(t("errors.loadFailed"), "error");
    }
  };

  const handleAnswerChange = (answer) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
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

    if (!question) return "incorrect";

    if (question.type === "text") {
      return userAnswer &&
        userAnswer.toLowerCase().includes("组件") &&
        userAnswer.toLowerCase().includes("元素")
        ? "correct"
        : "incorrect";
    } else {
      return userAnswer === question.correctAnswer ? "correct" : "incorrect";
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
            const courseTitle =
              i18n.language === "en" ? course.nameEn : course.name;
            const courseDesc =
              i18n.language === "en"
                ? course.descriptionEn
                : course.description;
            return (
              <div
                key={course.id}
                className="card p-6 hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-full"
                onClick={() => navigate(`/exam/${course.id}`)}
              >
                <div className="flex items-start mb-4">
                  <FileText className="w-8 h-8 text-blue-600 mr-3 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 break-words">
                    {courseTitle}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                  {courseDesc}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm text-gray-500">
                    {t("selectCourse.courseExam")}
                  </span>
                  <button className="btn-primary text-sm px-4 py-2">
                    {t("selectCourse.startExam")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (!currentCourse || exams.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">{t("loading.examContent")}</p>
        </div>
      </div>
    );
  }

  // 考试结果页面
  if (showResults) {
    const examResult = userProgress[courseId]?.[`exam_${currentExam.id}`];
    const passed = examResult?.passed || false;

    return (
      <div className="max-w-7xl xl:max-w-none xl:mx-8 mx-auto">
        <div className="card p-8 text-center">
          <div className="mb-6">
            <div
              className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
                passed ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {passed ? (
                <CheckCircle className="w-10 h-10 text-green-600" />
              ) : (
                <XCircle className="w-10 h-10 text-red-600" />
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {passed ? t("results.title.passed") : t("results.title.failed")}
            </h1>
            <p className="text-gray-600">
              {currentExam.title} {t("results.examResult")}
            </p>
          </div>

          {/* 成绩统计 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {examResult?.score || 0}%
              </div>
              <div className="text-blue-800">{t("results.score")}</div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {examResult?.correctAnswers || 0}/
                {examResult?.totalQuestions || 0}
              </div>
              <div className="text-green-800">
                {t("results.correctAnswers")}
              </div>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {currentExam.passScore}%
              </div>
              <div className="text-purple-800">{t("results.passScore")}</div>
            </div>
          </div>

          {/* 题目回顾 */}
          <div className="text-left mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {t("results.questionReview")}
            </h2>
            <div className="space-y-4">
              {questions.map((question, index) => {
                const result = getQuestionResult(question.id);
                const userAnswer = userAnswers[question.id];

                return (
                  <div
                    key={question.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900">
                        {t("results.question")} {index + 1} ({question.points}
                        {t("results.points")})
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
                        {result === "correct"
                          ? t("results.correct")
                          : t("results.wrong")}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{question.question}</p>
                    {question.type !== "text" && (
                      <div className="mb-2">
                        <p className="text-sm text-gray-600">
                          {t("results.yourAnswer")}：
                          {question.options[userAnswer]}
                        </p>
                        <p className="text-sm text-gray-600">
                          {t("results.correctAnswer")}：
                          {question.options[question.correctAnswer]}
                        </p>
                      </div>
                    )}
                    {question.type === "text" && (
                      <div className="mb-2">
                        <p className="text-sm text-gray-600">
                          {t("results.yourAnswer")}：{userAnswer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                setShowResults(false);
                setExamStarted(false);
                setExamSubmitted(false);
                setUserAnswers({});
                setCurrentQuestionIndex(0);
              }}
              className="btn-outline flex items-center"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              {t("results.reTakeExam")}
            </button>
            <button
              onClick={() => navigate("/exam")}
              className="btn-primary flex items-center"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              {t("results.backToCourse")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 考试开始前
  if (!examStarted && !examSubmitted) {
    return (
      <div className="max-w-7xl xl:max-w-none xl:mx-8 mx-auto">
        <div className="card p-8 text-center">
          <div className="mb-6">
            <FileText className="w-16 h-16 text-algonquin-red mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {currentExam.title}
            </h1>
            <p className="text-gray-600">{currentExam.description}</p>
          </div>

          {/* 考试信息 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {currentExam.totalQuestions}
              </div>
              <div className="text-blue-800">{t("preExam.totalQuestions")}</div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {currentExam.duration} {t("preExam.minutes")}
              </div>
              <div className="text-green-800">{t("preExam.duration")}</div>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                {currentExam.passScore}%
              </div>
              <div className="text-purple-800">{t("preExam.passScore")}</div>
            </div>
          </div>

          {/* 语言选择 */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="font-semibold text-gray-900 mb-3">
              {t("preExam.selectLanguage")}
            </h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setLanguage("zh")}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  language === "zh"
                    ? "bg-algonquin-red text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {t("preExam.chinese")}
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  language === "en"
                    ? "bg-algonquin-red text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {t("preExam.english")}
              </button>
            </div>
          </div>

          {/* 考试说明 */}
          <div className="bg-yellow-50 p-6 rounded-lg mb-8 text-left">
            <h3 className="font-semibold text-yellow-900 mb-3 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              {t("preExam.instructions")}
            </h3>
            <ul className="text-yellow-800 space-y-2">
              <li>
                • {t("preExam.note.time", { duration: currentExam.duration })}
              </li>
              <li>• {t("preExam.note.browser")}</li>
              <li>• {t("preExam.note.answers")}</li>
              <li>
                • {t("preExam.note.pass", { passScore: currentExam.passScore })}
              </li>
            </ul>
          </div>

          {/* 开始考试按钮 */}
          <button onClick={startExam} className="btn-primary text-lg px-8 py-3">
            {t("preExam.startExam")}
          </button>
        </div>
      </div>
    );
  }

  // 考试进行中
  return (
    <div className="flex flex-col bg-white shadow-sm rounded-lg overflow-hidden">
      {/* 考试头部 */}
      <div className="bg-white px-6 py-3">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {currentExam.title}
            </h1>
            <p className="text-gray-600">{t("inExam.title")}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center text-lg font-bold ${
                timeRemaining < 300 ? "text-red-600" : "text-gray-600"
              }`}
            >
              <Clock className="w-5 h-5 mr-2" />
              {formatTime(timeRemaining)}
            </div>
          </div>
        </div>

        {/* 进度条 */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-algonquin-red h-2 rounded-full transition-all duration-300"
            style={{
              width: `${
                ((currentQuestionIndex + 1) / questions.length) * 100
              }%`,
            }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {t("inExam.progress", {
            current: currentQuestionIndex + 1,
            total: questions.length,
          })}
        </p>
      </div>

      {/* 题目内容 */}
      <div className="bg-white">
        <div className="px-6 py-6 space-y-8">
          <div className="card p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {currentQuestion.question}
                <span className="text-sm font-normal text-gray-500 ml-2">
                  ({currentQuestion.points}
                  {t("inExam.question")})
                </span>
              </h2>

              {/* 选择题 */}
              {currentQuestion.type === "multiple-choice" && (
                <div className="space-y-3">
                  {currentQuestion.options &&
                    currentQuestion.options.map((option, index) => (
                      <label
                        key={index}
                        className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          value={index}
                          checked={userAnswers[currentQuestion.id] === index}
                          onChange={() => handleAnswerChange(index)}
                          className="mr-3"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                </div>
              )}

              {/* 判断题 */}
              {currentQuestion.type === "true-false" && (
                <div className="space-y-3">
                  {currentQuestion.options &&
                    currentQuestion.options.map((option, index) => (
                      <label
                        key={index}
                        className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          value={index}
                          checked={userAnswers[currentQuestion.id] === index}
                          onChange={() => handleAnswerChange(index)}
                          className="mr-3"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                </div>
              )}

              {/* 文本题 */}
              {currentQuestion.type === "text" && (
                <textarea
                  value={userAnswers[currentQuestion.id] || ""}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  placeholder={t("inExam.placeholder")}
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-algonquin-red"
                />
              )}
            </div>

            {/* 导航按钮 */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t("inExam.previous")}
              </button>

              <div className="flex space-x-3">
                {currentQuestionIndex === questions.length - 1 ? (
                  <button onClick={handleSubmitExam} className="btn-primary">
                    {t("inExam.submit")}
                  </button>
                ) : (
                  <button onClick={handleNextQuestion} className="btn-primary">
                    {t("inExam.next")}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamModule;
