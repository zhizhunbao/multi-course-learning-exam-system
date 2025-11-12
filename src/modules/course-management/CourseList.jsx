import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card, Button, Loading, Alert } from "../../../common/modules/Elements";
import "./CourseList.css";

const CourseList = ({ onEdit, onDelete, onView }) => {
  const { t } = useTranslation("course-management");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      const response = await fetch("/api/courses");
      const data = await response.json();
      setCourses(data);
    } catch (err) {
      setError("errors.loadCourses");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (courseId) => {
    if (window.confirm(t("messages.confirm.delete"))) {
      try {
        // TODO: Replace with actual API call
        await fetch(`/api/courses/${courseId}`, { method: "DELETE" });
        setCourses(courses.filter((course) => course.id !== courseId));
      } catch (err) {
        setError("errors.deleteCourse");
      }
    }
  };

  if (loading) {
    return <Loading text={t("loading.courses")} />;
  }

  if (error) {
    return <Alert type="error" message={t(error)} dismissible />;
  }

  return (
    <div className="course-list">
      <div className="course-list-header">
        <h2>{t("title")}</h2>
        <Button variant="primary" onClick={() => onEdit(null)}>
          {t("buttons.addCourse")}
        </Button>
      </div>

      <div className="course-grid">
        {courses.map((course) => (
          <Card
            key={course.id}
            title={course.title}
            subtitle={course.description}
            className="course-card"
          >
            <div className="course-meta">
              <p>
                <strong>{t("labels.category")}:</strong> {course.category}
              </p>
              <p>
                <strong>{t("labels.courseDuration")}:</strong> {course.duration}
              </p>
              <p>
                <strong>{t("labels.students")}:</strong> {course.studentCount}
              </p>
            </div>

            <div className="course-actions">
              <Button
                variant="outline"
                size="small"
                onClick={() => onView(course.id)}
              >
                {t("buttons.view")}
              </Button>
              <Button
                variant="primary"
                size="small"
                onClick={() => onEdit(course.id)}
              >
                {t("buttons.edit")}
              </Button>
              <Button
                variant="danger"
                size="small"
                onClick={() => handleDelete(course.id)}
              >
                {t("buttons.delete")}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="empty-state">
          <p>{t("messages.empty.noCourses")}</p>
        </div>
      )}
    </div>
  );
};

export default CourseList;
