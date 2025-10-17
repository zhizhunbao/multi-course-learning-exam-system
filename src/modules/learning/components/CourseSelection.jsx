import { BookOpen } from "lucide-react";
import PropTypes from "prop-types";

const CourseSelection = ({ courses, onSelectCourse }) => {
  return (
    <div className="max-w-7xl xl:max-w-none xl:mx-8 mx-auto px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">选择课程</h1>
        <p className="text-gray-600">请选择一个课程开始学习</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
            onClick={() => onSelectCourse(course.id)}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">
                  {course.name}
                </h3>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {course.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {course.chapters?.length || 0} 个章节
                </span>
                <button className="btn-primary text-sm px-4 py-2">
                  开始学习
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            暂无可用课程
          </h3>
          <p className="text-gray-600">请联系管理员添加课程内容</p>
        </div>
      )}
    </div>
  );
};

CourseSelection.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      chapters: PropTypes.array,
    })
  ).isRequired,
  onSelectCourse: PropTypes.func.isRequired,
};

export default CourseSelection;
