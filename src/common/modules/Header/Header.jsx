import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useApp } from "../../../context/AppContext";
import { LogOut, Globe, User, Menu } from "lucide-react";
import "./Header.css";

const Header = ({ onMenuClick }) => {
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
    <header className="header-container">
      <div className="header-content">
        {/* 左侧：移动端菜单按钮 + 页面标题 */}
        <div className="header-left">
          {/* 移动端菜单按钮 */}
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="header-menu-btn"
              aria-label="Toggle menu"
              title="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          {/* 页面标题 */}
          <div className="header-title-wrapper">
            <h1 className="header-title">{getPageTitle()}</h1>
          </div>
        </div>

        {/* 右侧：操作按钮 */}
        <div className="header-actions">
          {/* 语言切换 */}
          <button
            onClick={toggleLanguage}
            className="header-action-btn"
            aria-label="Toggle language"
            title={
              i18n.language === "zh-CN" ? "Switch to English" : "切换到中文"
            }
          >
            <Globe className="w-5 h-5" />
          </button>

          {/* 用户信息 */}
          <div className="header-user">
            <div className="header-user-avatar">
              <User className="w-4 h-4" />
            </div>
            <span className="header-user-name">{user?.name}</span>
          </div>

          {/* 退出登录 */}
          <button
            onClick={handleLogout}
            className="header-action-btn header-logout-btn"
            aria-label="Logout"
            title={t("header:logout")}
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
