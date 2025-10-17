import { useState, useEffect } from "react";
import dataService from "../../../services/DataService";

/**
 * 自定义 Hook：管理课程数据和学习进度
 */
const useCourseData = (courseId, userProgress, addNotification) => {
  const [currentCourse, setCurrentCourse] = useState(null);
  const [courseContent, setCourseContent] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [completedChapters, setCompletedChapters] = useState([]);

  useEffect(() => {
    if (!courseId) return;

    const loadCourseData = async () => {
      setLoading(true);
      try {
        // 加载课程内容
        const content = await dataService.getCourseContent(courseId);
        setCourseContent(content);

        // 设置当前课程信息
        if (content && content.title) {
          setCurrentCourse({
            id: courseId,
            title: content.title,
            description: content.description || "课程内容",
          });
        } else {
          setCurrentCourse({
            id: courseId,
            title: "React 基础开发",
            description: "学习React框架的基础知识和核心概念",
          });
        }

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
        addNotification("加载课程内容失败", "error");
      } finally {
        setLoading(false);
      }
    };

    loadCourseData();
  }, [courseId, userProgress, addNotification]);

  return {
    currentCourse,
    courseContent,
    currentChapter,
    setCurrentChapter,
    loading,
    completedChapters,
    setCompletedChapters,
  };
};

export default useCourseData;
