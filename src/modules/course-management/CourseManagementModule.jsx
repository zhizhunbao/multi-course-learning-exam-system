import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { Plus, Eye, FileText, Edit, Trash2 } from "lucide-react";

const DIFFICULTY_KEYS = ["beginner", "intermediate", "advanced"];
const STATUS_KEYS = ["draft", "published", "archived"];

const difficultyKeyMap = {
  beginner: "beginner",
  intermediate: "intermediate",
  advanced: "advanced",
  初级: "beginner",
  中级: "intermediate",
  高级: "advanced",
};

const normalizeDifficulty = (value) =>
  difficultyKeyMap[value] || value || "beginner";

const createEmptyCourse = () => ({
  title: "",
  description: "",
  instructor: "",
  duration: "",
  difficulty: "beginner",
  status: "draft",
});

const withNormalizedDifficulty = (course) =>
  course
    ? {
        ...course,
        difficulty: normalizeDifficulty(course.difficulty),
      }
    : course;

const CourseManagement = () => {
  const { t } = useTranslation("course-management");
  const { courses, setCourses, addNotification } = useApp();

  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [newCourse, setNewCourse] = useState(createEmptyCourse);
  const [expandedMaterials, setExpandedMaterials] = useState({});

  const filteredCourses = (Array.isArray(courses) ? courses : []).filter(
    (course) => {
      const matchesFilter =
        filterStatus === "all" || course.status === filterStatus;

      const matchesSearch =
        !searchTerm ||
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.id.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesFilter && matchesSearch;
    }
  );

  const handleCreateCourse = () => {
    if (!newCourse.title || !newCourse.description) {
      addNotification({
        type: "error",
        message: t("messages.validation.titleAndDescriptionRequired"),
      });
      return;
    }

    const course = {
      id: `CST${Date.now().toString().slice(-6)}`,
      ...newCourse,
      difficulty: normalizeDifficulty(newCourse.difficulty),
      progress: 0,
      modules: {
        learning: 0,
        practice: 0,
        experiment: 0,
        exam: 0,
      },
      materials: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setCourses((prev) => [...(Array.isArray(prev) ? prev : []), course]);
    setNewCourse(createEmptyCourse());
    setShowCreateModal(false);

    addNotification({
      type: "success",
      message: t("messages.success.courseCreated"),
    });
  };

  const handleEditCourse = () => {
    if (
      !selectedCourse ||
      !selectedCourse.title ||
      !selectedCourse.description
    ) {
      addNotification({
        type: "error",
        message: t("messages.validation.titleAndDescriptionRequired"),
      });
      return;
    }

    setCourses((prev) =>
      prev.map((course) =>
        course.id === selectedCourse.id
          ? {
              ...selectedCourse,
              difficulty: normalizeDifficulty(selectedCourse.difficulty),
              updatedAt: new Date().toISOString(),
            }
          : course
      )
    );

    setShowEditModal(false);
    setSelectedCourse(null);

    addNotification({
      type: "success",
      message: t("messages.success.courseUpdated"),
    });
  };

  const handleDeleteCourse = (courseId) => {
    if (window.confirm(t("messages.confirm.deleteWithWarning"))) {
      setCourses((prev) => prev.filter((course) => course.id !== courseId));
      addNotification({
        type: "success",
        message: t("messages.success.courseDeleted"),
      });
    }
  };

  const handleViewCourse = (course) => {
    setSelectedCourse(withNormalizedDifficulty(course));
    setShowViewModal(true);
  };

  const handleEditCourseClick = (course) => {
    setSelectedCourse(withNormalizedDifficulty(course));
    setShowEditModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) =>
    t(`status.${status}`, { defaultValue: t("status.unknown") });

  const getDifficultyLabel = (difficulty) => {
    const key = normalizeDifficulty(difficulty);
    if (DIFFICULTY_KEYS.includes(key)) {
      return t(`difficultyLevels.${key}`);
    }
    return difficulty || t("placeholders.notSet");
  };

  const handleMaterialClick = (materialPath) => {
    // 构建完整的URL路径
    const fullPath = materialPath.startsWith("/")
      ? materialPath
      : `/${materialPath}`;

    // 在新标签页中打开PDF
    window.open(fullPath, "_blank");
  };

  const toggleMaterialsExpanded = (courseId) => {
    setExpandedMaterials((prev) => ({
      ...prev,
      [courseId]: !prev[courseId],
    }));
  };

  return (
    <div className="space-y-6">
      {/* 头部 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder={t("filters.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field w-64"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input-field"
          >
            <option value="all">{t("filters.status.all")}</option>
            {STATUS_KEYS.map((status) => (
              <option key={status} value={status}>
                {t(`status.${status}`)}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => {
            setNewCourse(createEmptyCourse());
            setShowCreateModal(true);
          }}
          className="btn-primary flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t("buttons.createCourse")}
        </button>
      </div>

      {/* 课程列表 */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("table.headers.courseId")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("table.headers.courseName")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("table.headers.instructor")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("table.headers.status")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("table.headers.materials")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("table.headers.actions")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {course.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {course.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {course.instructor || t("placeholders.notAssigned")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        course.status
                      )}`}
                    >
                      {getStatusText(course.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="max-w-xs">
                      {course.materials && course.materials.length > 0 ? (
                        <div className="space-y-1">
                          {(expandedMaterials[course.id]
                            ? course.materials
                            : course.materials.slice(0, 2)
                          ).map((material, index) => (
                            <div
                              key={index}
                              onClick={() => handleMaterialClick(material)}
                              className="text-xs text-blue-600 hover:text-blue-800 hover:underline cursor-pointer flex items-center"
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  handleMaterialClick(material);
                                }
                              }}
                            >
                              <FileText className="w-3 h-3 mr-1" />
                              {material.split("/").pop()}
                            </div>
                          ))}
                          {course.materials.length > 2 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleMaterialsExpanded(course.id);
                              }}
                              className="text-xs text-blue-600 hover:text-blue-800 hover:underline cursor-pointer font-medium"
                            >
                              {expandedMaterials[course.id]
                                ? t("materials.showLess")
                                : t("materials.more", {
                                    count: course.materials.length - 2,
                                  })}
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400">
                          {t("materials.empty")}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewCourse(course)}
                        className="text-blue-600 hover:text-blue-900"
                        title={t("tooltips.view")}
                        aria-label={t("tooltips.view")}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditCourseClick(course)}
                        className="text-green-600 hover:text-green-900"
                        title={t("tooltips.edit")}
                        aria-label={t("tooltips.edit")}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="text-red-600 hover:text-red-900"
                        title={t("tooltips.delete")}
                        aria-label={t("tooltips.delete")}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 创建课程模态框 */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t("modals.create.title")}
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span>{t("form.labels.courseTitle")}</span>
                    <span className="text-red-500"> *</span>
                  </label>
                  <input
                    type="text"
                    value={newCourse.title}
                    onChange={(e) =>
                      setNewCourse((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="input-field"
                    placeholder={t("form.placeholders.courseTitle")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("form.labels.instructor")}
                  </label>
                  <input
                    type="text"
                    value={newCourse.instructor}
                    onChange={(e) =>
                      setNewCourse((prev) => ({
                        ...prev,
                        instructor: e.target.value,
                      }))
                    }
                    className="input-field"
                    placeholder={t("form.placeholders.instructor")}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span>{t("form.labels.description")}</span>
                  <span className="text-red-500"> *</span>
                </label>
                <textarea
                  value={newCourse.description}
                  onChange={(e) =>
                    setNewCourse((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="input-field h-24"
                  placeholder={t("form.placeholders.description")}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("form.labels.duration")}
                  </label>
                  <input
                    type="text"
                    value={newCourse.duration}
                    onChange={(e) =>
                      setNewCourse((prev) => ({
                        ...prev,
                        duration: e.target.value,
                      }))
                    }
                    className="input-field"
                    placeholder={t("form.placeholders.duration")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("form.labels.difficulty")}
                  </label>
                  <select
                    value={newCourse.difficulty}
                    onChange={(e) =>
                      setNewCourse((prev) => ({
                        ...prev,
                        difficulty: e.target.value,
                      }))
                    }
                    className="input-field"
                  >
                    {DIFFICULTY_KEYS.map((difficulty) => (
                      <option key={difficulty} value={difficulty}>
                        {t(`difficultyLevels.${difficulty}`)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("form.labels.status")}
                  </label>
                  <select
                    value={newCourse.status}
                    onChange={(e) =>
                      setNewCourse((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                    className="input-field"
                  >
                    {STATUS_KEYS.map((status) => (
                      <option key={status} value={status}>
                        {t(`status.${status}`)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="btn-outline"
              >
                {t("buttons.cancel")}
              </button>
              <button onClick={handleCreateCourse} className="btn-primary">
                {t("buttons.createCourse")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 编辑课程模态框 */}
      {showEditModal && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t("modals.edit.title")}
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span>{t("form.labels.courseTitle")}</span>
                    <span className="text-red-500"> *</span>
                  </label>
                  <input
                    type="text"
                    value={selectedCourse.title}
                    onChange={(e) =>
                      setSelectedCourse((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="input-field"
                    placeholder={t("form.placeholders.courseTitle")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("form.labels.instructor")}
                  </label>
                  <input
                    type="text"
                    value={selectedCourse.instructor || ""}
                    onChange={(e) =>
                      setSelectedCourse((prev) => ({
                        ...prev,
                        instructor: e.target.value,
                      }))
                    }
                    className="input-field"
                    placeholder={t("form.placeholders.instructor")}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span>{t("form.labels.description")}</span>
                  <span className="text-red-500"> *</span>
                </label>
                <textarea
                  value={selectedCourse.description}
                  onChange={(e) =>
                    setSelectedCourse((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="input-field h-24"
                  placeholder={t("form.placeholders.description")}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("form.labels.duration")}
                  </label>
                  <input
                    type="text"
                    value={selectedCourse.duration || ""}
                    onChange={(e) =>
                      setSelectedCourse((prev) => ({
                        ...prev,
                        duration: e.target.value,
                      }))
                    }
                    className="input-field"
                    placeholder={t("form.placeholders.duration")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("form.labels.difficulty")}
                  </label>
                  <select
                    value={normalizeDifficulty(selectedCourse.difficulty)}
                    onChange={(e) =>
                      setSelectedCourse((prev) => ({
                        ...prev,
                        difficulty: e.target.value,
                      }))
                    }
                    className="input-field"
                  >
                    {DIFFICULTY_KEYS.map((difficulty) => (
                      <option key={difficulty} value={difficulty}>
                        {t(`difficultyLevels.${difficulty}`)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("form.labels.status")}
                  </label>
                  <select
                    value={selectedCourse.status || "draft"}
                    onChange={(e) =>
                      setSelectedCourse((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                    className="input-field"
                  >
                    {STATUS_KEYS.map((status) => (
                      <option key={status} value={status}>
                        {t(`status.${status}`)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="btn-outline"
              >
                {t("buttons.cancel")}
              </button>
              <button onClick={handleEditCourse} className="btn-primary">
                {t("buttons.saveChanges")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 查看课程详情模态框 */}
      {showViewModal && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t("modals.view.title")}
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("labels.courseId")}
                  </label>
                  <p className="text-sm text-gray-900">{selectedCourse.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("labels.courseTitle")}
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedCourse.title}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("labels.instructor")}
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedCourse.instructor || t("placeholders.notAssigned")}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("labels.status")}
                  </label>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      selectedCourse.status
                    )}`}
                  >
                    {getStatusText(selectedCourse.status)}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("labels.courseDuration")}
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedCourse.duration || t("placeholders.notSet")}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("labels.difficulty")}
                  </label>
                  <p className="text-sm text-gray-900">
                    {getDifficultyLabel(selectedCourse.difficulty)}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("labels.courseDescription")}
                </label>
                <p className="text-sm text-gray-900">
                  {selectedCourse.description}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("labels.materials")}
                </label>
                {selectedCourse.materials &&
                selectedCourse.materials.length > 0 ? (
                  <div className="space-y-1">
                    {selectedCourse.materials.map((material, index) => (
                      <div
                        key={index}
                        onClick={() => handleMaterialClick(material)}
                        className="flex items-center text-sm text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleMaterialClick(material);
                          }
                        }}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        {material.split("/").pop()}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">
                    {t("materials.empty")}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("labels.createdAt")}
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedCourse.createdAt
                      ? new Date(selectedCourse.createdAt).toLocaleString()
                      : t("placeholders.unknown")}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("labels.updatedAt")}
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedCourse.updatedAt
                      ? new Date(selectedCourse.updatedAt).toLocaleString()
                      : t("placeholders.unknown")}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowViewModal(false)}
                className="btn-outline"
              >
                {t("buttons.close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;
