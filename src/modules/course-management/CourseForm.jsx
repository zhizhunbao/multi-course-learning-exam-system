import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Alert,
  Card,
} from "../../../common/modules/Elements";
import "./CourseForm.css";

const CourseForm = ({ courseId, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
    difficulty: "beginner",
    prerequisites: "",
    objectives: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (courseId) {
      loadCourse(courseId);
    }
  }, [courseId]);

  const loadCourse = async (id) => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      const response = await fetch(`/api/courses/${id}`);
      const course = await response.json();
      setFormData(course);
    } catch (err) {
      setError("Failed to load course data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      setError("");

      const url = courseId ? `/api/courses/${courseId}` : "/api/courses";
      const method = courseId ? "PUT" : "POST";

      // TODO: Replace with actual API call
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        onSave?.(values);
      } else {
        setError("Failed to save course");
      }
    } catch (err) {
      setError("Failed to save course");
    } finally {
      setLoading(false);
    }
  };

  const validation = {
    title: (value) => (!value ? "Title is required" : ""),
    description: (value) => (!value ? "Description is required" : ""),
    category: (value) => (!value ? "Category is required" : ""),
    duration: (value) => (!value ? "Duration is required" : ""),
  };

  return (
    <Card
      title={courseId ? "Edit Course" : "Create New Course"}
      className="course-form"
    >
      {error && <Alert type="error" message={error} dismissible />}

      <Form
        initialValues={formData}
        validation={validation}
        onSubmit={handleSubmit}
      >
        <div className="form-row">
          <Input
            label="Course Title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
            placeholder="Enter course title"
          />

          <Input
            label="Category"
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
            required
            placeholder="Enter course category"
          />
        </div>

        <Input
          label="Description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          required
          placeholder="Enter course description"
          multiline
          rows={3}
        />

        <div className="form-row">
          <Input
            label="Duration"
            value={formData.duration}
            onChange={(e) => handleChange("duration", e.target.value)}
            required
            placeholder="e.g., 4 weeks, 40 hours"
          />

          <div className="form-group">
            <label>Difficulty Level</label>
            <select
              value={formData.difficulty}
              onChange={(e) => handleChange("difficulty", e.target.value)}
              className="form-select"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        <Input
          label="Prerequisites"
          value={formData.prerequisites}
          onChange={(e) => handleChange("prerequisites", e.target.value)}
          placeholder="Enter prerequisites (optional)"
        />

        <Input
          label="Learning Objectives"
          value={formData.objectives}
          onChange={(e) => handleChange("objectives", e.target.value)}
          placeholder="Enter learning objectives (optional)"
          multiline
          rows={4}
        />

        <div className="form-actions">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={loading}>
            {courseId ? "Update Course" : "Create Course"}
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default CourseForm;
