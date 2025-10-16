import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  BookOpen, 
  Target, 
  FlaskConical, 
  FileText,
  Settings 
} from "lucide-react";

const Navigator = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  // 定义导航路径和对应的面包屑
  const getBreadcrumbs = () => {
    const path = location.pathname;
    const segments = path.split('/').filter(Boolean);
    
    const breadcrumbs = [
      { name: t("nav.dashboard"), path: "/", icon: Home }
    ];

    if (segments.length === 0) {
      return breadcrumbs;
    }

    // 根据路径构建面包屑
    let currentPath = "";
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      let name = "";
      let icon = null;
      
      switch (segment) {
        case "learning":
          name = t("nav.learning");
          icon = BookOpen;
          break;
        case "practice":
          name = t("nav.practice");
          icon = Target;
          break;
        case "experiment":
          name = t("nav.experiment");
          icon = FlaskConical;
          break;
        case "exam":
          name = t("nav.exam");
          icon = FileText;
          break;
        case "course-management":
          name = t("admin.courseManagement");
          icon = Settings;
          break;
        default:
          // 如果是子路径，使用更具体的名称
          if (index > 0) {
            const parentSegment = segments[index - 1];
            switch (parentSegment) {
              case "course-management":
                if (segment === "instructors") {
                  name = t("admin.userManagement");
                } else if (segment === "settings") {
                  name = t("admin.courseSettings");
                } else {
                  name = segment.charAt(0).toUpperCase() + segment.slice(1);
                }
                break;
              default:
                name = segment.charAt(0).toUpperCase() + segment.slice(1);
            }
          } else {
            name = segment.charAt(0).toUpperCase() + segment.slice(1);
          }
      }
      
      if (name) {
        breadcrumbs.push({
          name,
          path: currentPath,
          icon
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  const handleBreadcrumbClick = (path) => {
    navigate(path);
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center space-x-2 text-sm">
        {breadcrumbs.map((breadcrumb, index) => {
          const Icon = breadcrumb.icon;
          const isLast = index === breadcrumbs.length - 1;
          
          return (
            <React.Fragment key={breadcrumb.path}>
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
              
              <button
                onClick={() => handleBreadcrumbClick(breadcrumb.path)}
                className={`flex items-center space-x-1 px-2 py-1 rounded-md transition-colors duration-200 ${
                  isLast
                    ? "text-algonquin-blue font-medium cursor-default"
                    : "text-gray-600 hover:text-algonquin-blue hover:bg-gray-100"
                }`}
                disabled={isLast}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{breadcrumb.name}</span>
              </button>
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigator;
