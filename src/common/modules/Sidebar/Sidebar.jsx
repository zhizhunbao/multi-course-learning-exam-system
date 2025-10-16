import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useApp } from "../../../context/AppContext";
import {
  BookOpen,
  Target,
  FlaskConical,
  FileText,
  Settings,
  GraduationCap,
} from "lucide-react";

const Sidebar = () => {
  const { t } = useTranslation(["sidebar", "login", "admin"]);
  const { user } = useApp();
  const location = useLocation();

  const navigationItems = [
    {
      name: t("sidebar:learning"),
      href: "/learning",
      icon: BookOpen,
      hasSubItems: false,
    },
    {
      name: t("sidebar:practice"),
      href: "/practice",
      icon: Target,
      hasSubItems: false,
    },
    {
      name: t("sidebar:experiments"),
      href: "/experiment",
      icon: FlaskConical,
      hasSubItems: false,
    },
    {
      name: t("sidebar:exams"),
      href: "/exam",
      icon: FileText,
      hasSubItems: false,
    },
  ];

  const courseManagementItems = [
    {
      name: t("sidebar:courses"),
      href: "/course-management",
      icon: Settings,
      hasSubItems: false,
    },
  ];

  const allItems = [...navigationItems, ...courseManagementItems];

  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 z-40 border-r border-gray-200">
      {/* Logo区域 */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-blue-600">
              {t("login:subtitle")}
            </h1>
            <p className="text-sm text-gray-500 font-medium">
              {t("login:title")}
            </p>
          </div>
        </div>
      </div>

      {/* 导航菜单 */}
      <nav className="mt-6 px-4">
        <div className="space-y-2">
          {allItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.href ||
              (item.href !== "/" && location.pathname.startsWith(item.href));

            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={`sidebar-link ${isActive ? "active" : ""}`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium flex-1">{item.name}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* 用户信息 */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">
              {user?.name?.charAt(0)?.toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 font-medium">{user?.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
