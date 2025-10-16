import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useApp } from "../../../context/AppContext";
import { LogOut, Globe, User } from "lucide-react";

const Header = () => {
  const { t, i18n } = useTranslation([
    "header",
    "sidebar",
    "admin",
    "elements",
  ]);
  const { user, logout, addNotification } = useApp();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    addNotification({
      type: "success",
      message: t("header:logout") + " " + t("elements:alert.success"),
    });
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "zh-CN" ? "en" : "zh-CN";
    i18n.changeLanguage(newLang);
    addNotification({
      type: "info",
      message: `Language changed to ${
        newLang === "zh-CN" ? "中文" : "English"
      }`,
    });
  };

  // 根据当前路由获取页面标题
  const getPageTitle = () => {
    const path = location.pathname;

    if (path === "/" || path === "/dashboard") {
      return t("sidebar:dashboard");
    } else if (path.startsWith("/course-management")) {
      if (path === "/course-management/instructors") {
        return t("admin:userManagement.title");
      } else if (path === "/course-management") {
        return t("sidebar:courses");
      } else if (path === "/course-management/settings") {
        return t("header:settings");
      }
      return t("sidebar:courses");
    } else if (path.startsWith("/learning")) {
      return t("sidebar:learning");
    } else if (path.startsWith("/practice")) {
      return t("sidebar:practice");
    } else if (path.startsWith("/experiment")) {
      return t("sidebar:experiments");
    } else if (path.startsWith("/exam")) {
      return t("sidebar:exams");
    }

    return t("sidebar:dashboard");
  };

  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-gray-100">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* 左侧：页面标题 */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {getPageTitle()}
            </h1>
            <p className="text-sm text-gray-500">
              {t("header:welcome")}, {user?.name}
            </p>
          </div>

          {/* 右侧：操作按钮 */}
          <div className="flex items-center space-x-4">
            {/* 语言切换 */}
            <button
              onClick={toggleLanguage}
              className="p-2 text-gray-500 hover:text-algonquin-blue hover:bg-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              title="语言切换"
            >
              <Globe className="w-5 h-5" />
            </button>

            {/* 用户菜单 */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-algonquin-blue rounded-xl flex items-center justify-center shadow-lg">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">{user?.name}</p>
                </div>
              </div>

              {/* 退出登录 */}
              <button
                onClick={handleLogout}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                title={t("header:logout")}
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
