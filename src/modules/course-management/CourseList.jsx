import React, { useState, useEffect } from "react";
import { Card, Button, Loading, Alert } from "../../../common/modules/Elements";
import "./CourseList.css";

const CourseList = ({ onEdit, onDelete, onView }) => {
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
      setError("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        // TODO: Replace with actual API call
        await fetch(`/api/courses/${courseId}`, { method: "DELETE" });
        setCourses(courses.filter((course) => course.id !== courseId));
      } catch (err) {
        setError("Failed to delete course");
      }
    }
  };

  if (loading) {
    return <Loading text="Loading courses..." />;
  }

  if (error) {
    return <Alert type="error" message={error} dismissible />;
  }

  return (
    <div className="course-list">
      <div className="course-list-header">
        <h2>Course Management</h2>
        <Button variant="primary" onClick={() => onEdit(null)}>
          Add New Course
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
                <strong>Category:</strong> {course.category}
              </p>
              <p>
                <strong>Duration:</strong> {course.duration}
              </p>
              <p>
                <strong>Students:</strong> {course.studentCount}
              </p>
            </div>

            <div className="course-actions">
              <Button
                variant="outline"
                size="small"
                onClick={() => onView(course.id)}
              >
                View
              </Button>
              <Button
                variant="primary"
                size="small"
                onClick={() => onEdit(course.id)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="small"
                onClick={() => handleDelete(course.id)}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="empty-state">
          <p>No courses found. Create your first course to get started.</p>
        </div>
      )}
    </div>
  );
};

export default CourseList;
