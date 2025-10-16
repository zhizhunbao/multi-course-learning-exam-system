import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Target,
  FlaskConical,
  FileText,
  Clock,
  User,
  TrendingUp,
  CheckCircle,
} from "lucide-react";

const CourseCard = ({ course }) => {
  const { t } = useTranslation();

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "inProgress":
        return "bg-blue-100 text-blue-800";
      case "notStarted":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "初级":
        return "bg-green-100 text-green-800";
      case "中级":
        return "bg-yellow-100 text-yellow-800";
      case "高级":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="card p-6 hover:shadow-lg transition-shadow duration-200">
      {/* 课程图片和状态 */}
      <div className="relative mb-4">
        <div className="w-full h-32 bg-gradient-to-r from-algonquin-blue to-algonquin-red rounded-lg flex items-center justify-center">
          <BookOpen className="w-12 h-12 text-white" />
        </div>
        <div className="absolute top-2 right-2">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
              course.status
            )}`}
          >
            {t(`course.${course.status}`)}
          </span>
        </div>
      </div>

      {/* 课程信息 */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {course.description}
        </p>

        {/* 课程元信息 */}
        <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
          <div className="flex items-center">
            <User className="w-3 h-3 mr-1" />
            {course.instructor}
          </div>
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {course.duration}
          </div>
        </div>

        {/* 难度标签 */}
        <div className="mb-3">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(
              course.difficulty
            )}`}
          >
            {course.difficulty}
          </span>
        </div>
      </div>

      {/* 进度条 */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-gray-600">{t("course.progress")}</span>
          <span className="font-medium text-gray-900">{course.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-algonquin-red h-2 rounded-full transition-all duration-300"
            style={{ width: `${course.progress}%` }}
          ></div>
        </div>
      </div>

      {/* 模块统计 */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg mx-auto mb-1">
            <BookOpen className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-xs text-gray-600">{course.modules.learning}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg mx-auto mb-1">
            <Target className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-xs text-gray-600">{course.modules.practice}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg mx-auto mb-1">
            <FlaskConical className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-xs text-gray-600">{course.modules.experiment}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-lg mx-auto mb-1">
            <FileText className="w-4 h-4 text-red-600" />
          </div>
          <p className="text-xs text-gray-600">{course.modules.exam}</p>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex space-x-2">
        <Link
          to={`/learning/${course.id}`}
          className="flex-1 btn-primary text-center py-2 text-sm"
        >
          {course.status === "notStarted"
            ? t("course.startLearning")
            : t("course.continueLearning")}
        </Link>
        {course.status === "completed" && (
          <div className="flex items-center justify-center px-3 py-2 bg-green-100 text-green-800 rounded-lg">
            <CheckCircle className="w-4 h-4" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
