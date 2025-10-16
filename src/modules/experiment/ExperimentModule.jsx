import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import dataService from "../shared/services/DataService";
import {
  FlaskConical,
  Play,
  RotateCcw,
  CheckCircle,
  XCircle,
  Clock,
  Code,
  FileText,
  BookOpen,
} from "lucide-react";

const ExperimentModule = () => {
  const { t } = useTranslation();
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { courses, userProgress, updateProgress, addNotification } = useApp();

  const [currentCourse, setCurrentCourse] = useState(null);
  const [experimentsData, setExperimentsData] = useState(null);
  const [experiments, setExperiments] = useState([]);
  const [currentExperimentIndex, setCurrentExperimentIndex] = useState(0);
  const [userCode, setUserCode] = useState("");
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadExperimentData = async () => {
      if (!courseId) return;

      setLoading(true);
      try {
        const course = courses.find((c) => c.id === courseId);
        if (course) {
          setCurrentCourse(course);
        } else {
          setCurrentCourse({
            id: courseId,
            title: "React 基础开发",
            description: "学习React框架的基础知识和核心概念",
          });
        }

        // 加载实验数据
        const data = await dataService.getExperiments(courseId);
        setExperimentsData(data);
        setExperiments(data.experiments || []);

        if (data.experiments && data.experiments.length > 0) {
          setUserCode(data.experiments[0].template);
          setStartTime(Date.now());
        }
      } catch (error) {
        console.error("Failed to load experiments:", error);
        addNotification("加载实验数据失败", "error");
      } finally {
        setLoading(false);
      }
    };

    loadExperimentData();
  }, [courseId, courses, addNotification]);

  // 计时器
  useEffect(() => {
    if (startTime) {
      const timer = setInterval(() => {
        setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [startTime]);

  const currentExperiment = experiments[currentExperimentIndex];

  const handleCodeChange = (newCode) => {
    setUserCode(newCode);
  };

  const runCode = async () => {
    setIsRunning(true);

    // 模拟代码执行和测试
    setTimeout(() => {
      const results = currentExperiment.testCases.map((testCase, index) => {
        // 简单的模拟测试逻辑
        let passed = false;
        let output = "";

        if (currentExperiment.id === 1) {
          // 测试 Welcome 组件
          if (userCode.includes("props.name") && userCode.includes("Hello")) {
            passed = true;
            output = `Hello, ${testCase.input.name}!`;
          } else {
            output = "组件未正确实现";
          }
        } else if (currentExperiment.id === 2) {
          // 测试 Counter 组件
          if (userCode.includes("useState") && userCode.includes("setCount")) {
            passed = true;
            output = "count: 0";
          } else {
            output = "useState 未正确使用";
          }
        }

        return {
          id: index,
          description: testCase.description,
          expected: testCase.expected,
          actual: output,
          passed,
        };
      });

      setTestResults(results);
      setIsRunning(false);
    }, 2000);
  };

  const handleNextExperiment = () => {
    if (currentExperimentIndex < experiments.length - 1) {
      setCurrentExperimentIndex(currentExperimentIndex + 1);
      setUserCode(experiments[currentExperimentIndex + 1].template);
      setTestResults([]);
    }
  };

  const handlePreviousExperiment = () => {
    if (currentExperimentIndex > 0) {
      setCurrentExperimentIndex(currentExperimentIndex - 1);
      setUserCode(experiments[currentExperimentIndex - 1].template);
      setTestResults([]);
    }
  };

  const handleSubmitExperiment = () => {
    const passedTests = testResults.filter((result) => result.passed).length;
    const totalTests = testResults.length;
    const score =
      totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;

    updateProgress(courseId, {
      [`experiment_${currentExperiment.id}`]: {
        score,
        passedTests,
        totalTests,
        timeSpent,
        code: userCode,
        completedAt: new Date().toISOString(),
      },
    });

    addNotification({
      type: "success",
      message: `实验完成！通过 ${passedTests}/${totalTests} 个测试用例`,
    });
  };

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
            选择课程进行实验
          </h1>
          <p className="text-gray-600">请选择一个课程开始实验</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="card p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/experiment/${course.id}`)}
            >
              <div className="flex items-center mb-4">
                <FlaskConical className="w-8 h-8 text-algonquin-red mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">
                  {course.title}
                </h3>
              </div>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">点击开始实验</span>
                <span className="text-algonquin-red font-medium">
                  开始实验 →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 显示加载状态
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <FlaskConical className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">实验内容加载中...</p>
        </div>
      </div>
    );
  }

  // 如果没有实验数据，显示错误状态
  if (!currentCourse || !experimentsData || experiments.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <FlaskConical className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">
            {!experimentsData ? "实验数据加载失败" : "暂无实验内容"}
          </p>
          {!experimentsData && (
            <button
              onClick={() => window.location.reload()}
              className="btn-primary mt-4"
            >
              重新加载
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* 头部信息 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {currentCourse.title}
            </h1>
            <p className="text-gray-600">实验模块</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              {formatTime(timeSpent)}
            </div>
            <button onClick={() => navigate("/")} className="btn-outline">
              返回课程
            </button>
          </div>
        </div>

        {/* 实验导航 */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {experiments.map((experiment, index) => (
            <button
              key={experiment.id}
              onClick={() => {
                setCurrentExperimentIndex(index);
                setUserCode(experiment.template);
                setTestResults([]);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                index === currentExperimentIndex
                  ? "bg-algonquin-red text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              实验 {index + 1}: {experiment.title}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左侧：实验说明和代码编辑器 */}
        <div className="space-y-6">
          {/* 实验说明 */}
          <div className="card p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {currentExperiment.title}
            </h2>
            <p className="text-gray-700 mb-4">
              {currentExperiment.description}
            </p>

            {/* 实验步骤 */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                实验步骤
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                {currentExperiment.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>

            {/* 提示 */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">💡 提示</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                {currentExperiment.hints.map((hint, index) => (
                  <li key={index}>• {hint}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 代码编辑器 */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <Code className="w-5 h-5 mr-2" />
                代码编辑器
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setUserCode(currentExperiment.template)}
                  className="btn-outline text-sm flex items-center"
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  重置
                </button>
                <button
                  onClick={runCode}
                  disabled={isRunning}
                  className="btn-primary text-sm flex items-center"
                >
                  <Play className="w-4 h-4 mr-1" />
                  {isRunning ? "运行中..." : "运行代码"}
                </button>
              </div>
            </div>

            <textarea
              value={userCode}
              onChange={(e) => handleCodeChange(e.target.value)}
              className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-algonquin-red"
              placeholder="在这里编写您的代码..."
            />
          </div>
        </div>

        {/* 右侧：测试结果和导航 */}
        <div className="space-y-6">
          {/* 测试结果 */}
          <div className="card p-6">
            <h3 className="font-semibold text-gray-900 mb-4">测试结果</h3>

            {testResults.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FlaskConical className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>点击"运行代码"来查看测试结果</p>
              </div>
            ) : (
              <div className="space-y-3">
                {testResults.map((result) => (
                  <div
                    key={result.id}
                    className={`p-4 rounded-lg border ${
                      result.passed
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">
                        {result.description}
                      </h4>
                      <div
                        className={`flex items-center ${
                          result.passed ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {result.passed ? (
                          <CheckCircle className="w-5 h-5 mr-1" />
                        ) : (
                          <XCircle className="w-5 h-5 mr-1" />
                        )}
                        {result.passed ? "通过" : "失败"}
                      </div>
                    </div>
                    <div className="text-sm space-y-1">
                      <p>
                        <span className="font-medium">预期输出:</span>{" "}
                        {result.expected}
                      </p>
                      <p>
                        <span className="font-medium">实际输出:</span>{" "}
                        {result.actual}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 导航按钮 */}
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <button
                onClick={handlePreviousExperiment}
                disabled={currentExperimentIndex === 0}
                className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                上一个实验
              </button>

              <div className="flex space-x-3">
                {currentExperimentIndex === experiments.length - 1 ? (
                  <button
                    onClick={handleSubmitExperiment}
                    disabled={testResults.length === 0}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    提交实验
                  </button>
                ) : (
                  <button
                    onClick={handleNextExperiment}
                    className="btn-primary"
                  >
                    下一个实验
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

export default ExperimentModule;
