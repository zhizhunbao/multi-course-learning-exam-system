import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { Plus, Eye, FileText, Edit, Trash2, Upload } from "lucide-react";

const CourseManagement = () => {
  const { t } = useTranslation();
  const { courses, setCourses, addNotification } = useApp();

  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    instructor: "",
    duration: "",
    difficulty: "初级",
    status: "draft",
  });

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
        message: "请填写课程标题和描述",
      });
      return;
    }

    const course = {
      id: `CST${Date.now().toString().slice(-6)}`,
      ...newCourse,
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
    setNewCourse({
      title: "",
      description: "",
      instructor: "",
      duration: "",
      difficulty: "初级",
      status: "draft",
    });
    setShowCreateModal(false);

    addNotification({
      type: "success",
      message: "课程创建成功",
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
        message: "请填写课程标题和描述",
      });
      return;
    }

    setCourses((prev) =>
      prev.map((course) =>
        course.id === selectedCourse.id
          ? { ...selectedCourse, updatedAt: new Date().toISOString() }
          : course
      )
    );

    setShowEditModal(false);
    setSelectedCourse(null);

    addNotification({
      type: "success",
      message: "课程更新成功",
    });
  };

  const handleDeleteCourse = (courseId) => {
    if (window.confirm("确定要删除这个课程吗？此操作不可撤销。")) {
      setCourses((prev) => prev.filter((course) => course.id !== courseId));
      addNotification({
        type: "success",
        message: "课程删除成功",
      });
    }
  };

  const handleViewCourse = (course) => {
    setSelectedCourse(course);
    setShowViewModal(true);
  };

  const handleEditCourseClick = (course) => {
    setSelectedCourse({ ...course });
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

  const getStatusText = (status) => {
    switch (status) {
      case "published":
        return "已发布";
      case "draft":
        return "草稿";
      case "archived":
        return "已归档";
      default:
        return "未知";
    }
  };

  return (
    <div className="space-y-6">
      {/* 头部 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索课程..."
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
            <option value="all">所有状态</option>
            <option value="published">已发布</option>
            <option value="draft">草稿</option>
            <option value="archived">已归档</option>
          </select>
        </div>
        <button
          onClick={() => {
            setNewCourse({
              title: "",
              description: "",
              instructor: "",
              duration: "",
              difficulty: "初级",
              status: "draft",
            });
            setShowCreateModal(true);
          }}
          className="btn-primary flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          创建课程
        </button>
      </div>

      {/* 课程列表 */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  课程编号
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  课程名称
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  讲师
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  课程资料
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
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
                    {course.instructor || "未指定"}
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
                          {course.materials
                            .slice(0, 2)
                            .map((material, index) => (
                              <div
                                key={index}
                                className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer flex items-center"
                              >
                                <FileText className="w-3 h-3 mr-1" />
                                {material.split("/").pop()}
                              </div>
                            ))}
                          {course.materials.length > 2 && (
                            <div className="text-xs text-gray-500">
                              +{course.materials.length - 2} 更多...
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400">暂无资料</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewCourse(course)}
                        className="text-blue-600 hover:text-blue-900"
                        title="查看详情"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditCourseClick(course)}
                        className="text-green-600 hover:text-green-900"
                        title="编辑课程"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="text-red-600 hover:text-red-900"
                        title="删除课程"
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
              创建新课程
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    课程标题 *
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
                    placeholder="请输入课程标题"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    讲师
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
                    placeholder="请输入讲师姓名"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  课程描述 *
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
                  placeholder="请输入课程描述"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    课程时长
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
                    placeholder="如：40小时"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    难度级别
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
                    <option value="初级">初级</option>
                    <option value="中级">中级</option>
                    <option value="高级">高级</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    状态
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
                    <option value="draft">草稿</option>
                    <option value="published">已发布</option>
                    <option value="archived">已归档</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="btn-outline"
              >
                取消
              </button>
              <button onClick={handleCreateCourse} className="btn-primary">
                创建课程
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
              编辑课程
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    课程标题 *
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
                    placeholder="请输入课程标题"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    讲师
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
                    placeholder="请输入讲师姓名"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  课程描述 *
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
                  placeholder="请输入课程描述"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    课程时长
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
                    placeholder="如：40小时"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    难度级别
                  </label>
                  <select
                    value={selectedCourse.difficulty || "初级"}
                    onChange={(e) =>
                      setSelectedCourse((prev) => ({
                        ...prev,
                        difficulty: e.target.value,
                      }))
                    }
                    className="input-field"
                  >
                    <option value="初级">初级</option>
                    <option value="中级">中级</option>
                    <option value="高级">高级</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    状态
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
                    <option value="draft">草稿</option>
                    <option value="published">已发布</option>
                    <option value="archived">已归档</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="btn-outline"
              >
                取消
              </button>
              <button onClick={handleEditCourse} className="btn-primary">
                保存更改
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
              课程详情
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    课程编号
                  </label>
                  <p className="text-sm text-gray-900">{selectedCourse.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    课程名称
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedCourse.title}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    讲师
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedCourse.instructor || "未指定"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    状态
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
                    课程时长
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedCourse.duration || "未设置"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    难度级别
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedCourse.difficulty || "初级"}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  课程描述
                </label>
                <p className="text-sm text-gray-900">
                  {selectedCourse.description}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  课程资料
                </label>
                {selectedCourse.materials &&
                selectedCourse.materials.length > 0 ? (
                  <div className="space-y-1">
                    {selectedCourse.materials.map((material, index) => (
                      <div
                        key={index}
                        className="flex items-center text-sm text-blue-600"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        {material.split("/").pop()}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">暂无资料</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    创建时间
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedCourse.createdAt
                      ? new Date(selectedCourse.createdAt).toLocaleString()
                      : "未知"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    更新时间
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedCourse.updatedAt
                      ? new Date(selectedCourse.updatedAt).toLocaleString()
                      : "未知"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowViewModal(false)}
                className="btn-outline"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;
