import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const [language, setLanguage] = useState("zh"); // 默认中文

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
          title: "知识表示与推理",
          description: "学习知识表示和推理的基础知识",
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
      message: `考试完成！得分：${percentage}分 ${
        passed ? "（通过）" : "（未通过）"
      }`,
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
      addNotification("加载考试题目失败", "error");
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
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            选择课程进行考试
          </h1>
          <p className="text-gray-600">请选择一个课程开始考试</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="card p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/exam/${course.id}`)}
            >
              <div className="flex items-center mb-4">
                <FileText className="w-8 h-8 text-algonquin-red mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">
                  {course.title}
                </h3>
              </div>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">点击开始考试</span>
                <span className="text-algonquin-red font-medium">
                  开始考试 →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!currentCourse || exams.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">考试内容加载中...</p>
        </div>
      </div>
    );
  }

  // 考试结果页面
  if (showResults) {
    const examResult = userProgress[courseId]?.[`exam_${currentExam.id}`];
    const passed = examResult?.passed || false;

    return (
      <div className="max-w-4xl mx-auto">
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
              {passed ? "恭喜通过！" : "考试未通过"}
            </h1>
            <p className="text-gray-600">{currentExam.title} 考试结果</p>
          </div>

          {/* 成绩统计 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {examResult?.score || 0}%
              </div>
              <div className="text-blue-800">最终得分</div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {examResult?.correctAnswers || 0}/
                {examResult?.totalQuestions || 0}
              </div>
              <div className="text-green-800">正确题数</div>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {currentExam.passScore}%
              </div>
              <div className="text-purple-800">及格分数</div>
            </div>
          </div>

          {/* 题目回顾 */}
          <div className="text-left mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">题目回顾</h2>
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
                        第 {index + 1} 题 ({question.points}分)
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
                        {result === "correct" ? "正确" : "错误"}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{question.question}</p>
                    {question.type !== "text" && (
                      <div className="mb-2">
                        <p className="text-sm text-gray-600">
                          您的答案：{question.options[userAnswer]}
                        </p>
                        <p className="text-sm text-gray-600">
                          正确答案：{question.options[question.correctAnswer]}
                        </p>
                      </div>
                    )}
                    {question.type === "text" && (
                      <div className="mb-2">
                        <p className="text-sm text-gray-600">
                          您的答案：{userAnswer}
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
              重新考试
            </button>
            <button
              onClick={() => navigate("/exam")}
              className="btn-primary flex items-center"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              返回课程
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 考试开始前
  if (!examStarted && !examSubmitted) {
    return (
      <div className="max-w-4xl mx-auto">
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
              <div className="text-blue-800">题目数量</div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {currentExam.duration} 分钟
              </div>
              <div className="text-green-800">考试时长</div>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                {currentExam.passScore}%
              </div>
              <div className="text-purple-800">及格分数</div>
            </div>
          </div>

          {/* 语言选择 */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="font-semibold text-gray-900 mb-3">选择考试语言</h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setLanguage("zh")}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  language === "zh"
                    ? "bg-algonquin-red text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                中文
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  language === "en"
                    ? "bg-algonquin-red text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* 考试说明 */}
          <div className="bg-yellow-50 p-6 rounded-lg mb-8 text-left">
            <h3 className="font-semibold text-yellow-900 mb-3 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              考试说明
            </h3>
            <ul className="text-yellow-800 space-y-2">
              <li>
                • 考试时间为 {currentExam.duration} 分钟，时间到将自动提交
              </li>
              <li>• 考试期间请勿关闭浏览器或刷新页面</li>
              <li>• 每题只能选择一次答案，请仔细思考后作答</li>
              <li>
                • 及格分数为 {currentExam.passScore}
                %，未达到及格分数需要重新考试
              </li>
            </ul>
          </div>

          {/* 开始考试按钮 */}
          <button onClick={startExam} className="btn-primary text-lg px-8 py-3">
            开始考试
          </button>
        </div>
      </div>
    );
  }

  // 考试进行中
  return (
    <div className="max-w-4xl mx-auto">
      {/* 考试头部 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {currentExam.title}
            </h1>
            <p className="text-gray-600">考试进行中</p>
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
          第 {currentQuestionIndex + 1} 题，共 {questions.length} 题
        </p>
      </div>

      {/* 题目内容 */}
      <div className="card p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {currentQuestion.question}
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({currentQuestion.points}分)
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
              placeholder="请输入您的答案..."
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
            上一题
          </button>

          <div className="flex space-x-3">
            {currentQuestionIndex === questions.length - 1 ? (
              <button onClick={handleSubmitExam} className="btn-primary">
                提交考试
              </button>
            ) : (
              <button onClick={handleNextQuestion} className="btn-primary">
                下一题
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamModule;
