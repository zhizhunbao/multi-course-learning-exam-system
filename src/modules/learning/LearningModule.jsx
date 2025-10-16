import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import dataService from "../shared/services/DataService";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  FileText,
  Video,
  Download,
  Plus,
} from "lucide-react";

const LearningModule = () => {
  const { t } = useTranslation();
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { courses, userProgress, updateProgress, addNotification } = useApp();

  const [currentCourse, setCurrentCourse] = useState(null);
  const [courseContent, setCourseContent] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [notes, setNotes] = useState("");
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCourseData = async () => {
      if (!courseId) return;

      setLoading(true);
      try {
        const course = courses.find((c) => c.id === courseId);
        if (course) {
          setCurrentCourse(course);
        } else {
          // 如果没有找到课程，使用模拟数据
          setCurrentCourse({
            id: courseId,
            title: "React 基础开发",
            description: "学习React框架的基础知识和核心概念",
          });
        }

        // 加载课程内容
        const content = await dataService.getCourseContent(courseId);
        setCourseContent(content);
      } catch (error) {
        console.error("Failed to load course content:", error);
        addNotification("加载课程内容失败", "error");
      } finally {
        setLoading(false);
      }
    };

    loadCourseData();
  }, [courseId, courses, addNotification]);

  // 如果没有courseId，显示课程选择界面
  if (!courseId) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            选择课程开始学习
          </h1>
          <p className="text-gray-600">请选择一个课程开始学习</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="card p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/learning/${course.id}`)}
            >
              <div className="flex items-center mb-4">
                <BookOpen className="w-8 h-8 text-algonquin-red mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">
                  {course.title}
                </h3>
              </div>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">点击开始学习</span>
                <span className="text-algonquin-red font-medium">
                  开始学习 →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const currentChapterData = courseContent?.chapters?.[currentChapter];
  const currentLessonData = currentChapterData?.lessons?.[currentLesson];

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

  const handlePreviousLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    } else if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
      setCurrentLesson(
        courseContent.chapters[currentChapter - 1].lessons.length - 1
      );
    }
  };

  const handleNextLesson = () => {
    if (currentLesson < currentChapterData.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    } else if (currentChapter < courseContent.chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
      setCurrentLesson(0);
    }
  };

  const handleMarkComplete = () => {
    if (currentCourse && currentLessonData) {
      const progressKey = `${currentChapter}-${currentLesson}`;
      updateProgress(courseId, {
        [`learning_${progressKey}`]: {
          completed: true,
          completedAt: new Date().toISOString(),
        },
      });

      addNotification({
        type: "success",
        message: "课程标记为已完成",
      });
    }
  };

  const handleSaveNote = () => {
    if (currentCourse && currentLessonData) {
      const progressKey = `${currentChapter}-${currentLesson}`;
      updateProgress(courseId, {
        [`learning_${progressKey}_note`]: {
          content: notes,
          savedAt: new Date().toISOString(),
        },
      });

      addNotification({
        type: "success",
        message: "笔记已保存",
      });

      setIsNoteOpen(false);
    }
  };

  if (!currentCourse || !courseContent) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">课程内容加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* 课程标题和导航 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {currentCourse.title}
            </h1>
            <p className="text-gray-600">{currentCourse.description}</p>
          </div>
          <button onClick={() => navigate("/")} className="btn-outline">
            返回课程列表
          </button>
        </div>

        {/* 章节导航 */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {courseContent.chapters.map((chapter, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentChapter(index);
                setCurrentLesson(0);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                index === currentChapter
                  ? "bg-algonquin-red text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {chapter.title}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 主内容区域 */}
        <div className="lg:col-span-3">
          <div className="card p-6">
            {/* 课程内容头部 */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {currentLessonData?.title}
                </h2>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {currentLessonData?.duration}
                  </div>
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-1" />
                    {currentLessonData?.type === "text"
                      ? "文本内容"
                      : "视频内容"}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsNoteOpen(true)}
                className="btn-outline flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                添加笔记
              </button>
            </div>

            {/* 课程内容 */}
            <div className="prose max-w-none mb-6">
              <p className="text-gray-700 leading-relaxed">
                {currentLessonData?.content}
              </p>
            </div>

            {/* 学习资源 */}
            {currentLessonData?.resources &&
              currentLessonData.resources.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    学习资源
                  </h3>
                  <div className="space-y-2">
                    {currentLessonData.resources.map((resource, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center">
                          {resource.type === "video" ? (
                            <Video className="w-5 h-5 text-red-500 mr-3" />
                          ) : (
                            <FileText className="w-5 h-5 text-blue-500 mr-3" />
                          )}
                          <span className="text-gray-700">{resource.name}</span>
                        </div>
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-algonquin-red hover:text-algonquin-dark-red"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* 导航按钮 */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <button
                onClick={handlePreviousLesson}
                disabled={currentChapter === 0 && currentLesson === 0}
                className="btn-outline flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                上一课
              </button>

              <div className="flex space-x-3">
                <button
                  onClick={handleMarkComplete}
                  className="btn-primary flex items-center"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  标记完成
                </button>
              </div>

              <button
                onClick={handleNextLesson}
                disabled={
                  currentChapter === courseContent.chapters.length - 1 &&
                  currentLesson === currentChapterData.lessons.length - 1
                }
                className="btn-outline flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                下一课
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>

        {/* 侧边栏 */}
        <div className="lg:col-span-1">
          {/* 课程进度 */}
          <div className="card p-4 mb-4">
            <h3 className="font-semibold text-gray-900 mb-3">课程进度</h3>
            <div className="space-y-2">
              {courseContent.chapters.map((chapter, chapterIndex) => (
                <div key={chapterIndex} className="text-sm">
                  <div className="font-medium text-gray-700 mb-1">
                    {chapter.title}
                  </div>
                  <div className="space-y-1">
                    {chapter.lessons.map((lesson, lessonIndex) => (
                      <div
                        key={lessonIndex}
                        className={`flex items-center text-xs ${
                          chapterIndex === currentChapter &&
                          lessonIndex === currentLesson
                            ? "text-algonquin-red font-medium"
                            : "text-gray-500"
                        }`}
                      >
                        <div className="w-2 h-2 rounded-full bg-gray-300 mr-2"></div>
                        {lesson.title}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 我的笔记 */}
          <div className="card p-4">
            <h3 className="font-semibold text-gray-900 mb-3">我的笔记</h3>
            <p className="text-sm text-gray-500">
              点击"添加笔记"按钮来记录学习心得
            </p>
          </div>
        </div>
      </div>

      {/* 笔记模态框 */}
      {isNoteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              添加笔记
            </h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="记录您的学习心得和重要知识点..."
              className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-algonquin-red"
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setIsNoteOpen(false)}
                className="btn-outline"
              >
                取消
              </button>
              <button onClick={handleSaveNote} className="btn-primary">
                保存笔记
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningModule;
