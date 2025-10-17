import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useApp } from "../../../context/AppContext";
import PropTypes from "prop-types";
import {
  BookOpen,
  Target,
  FlaskConical,
  FileText,
  Settings,
  GraduationCap,
  X,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import { useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ isMobileOpen = false, onMobileClose = () => {} }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
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
    <>
      {/* 移动端遮罩层 */}
      {isMobileOpen && (
        <div className="sidebar-mobile-overlay" onClick={onMobileClose} />
      )}

      <div
        className={`sidebar-container ${isMobileOpen ? "mobile-open" : ""} ${
          isCollapsed ? "collapsed" : ""
        }`}
      >
        {/* Logo区域 */}
        <div className="sidebar-logo-area">
          {/* 展开状态：显示Logo和折叠按钮 */}
          {!isCollapsed && (
            <>
              <div className="sidebar-logo-wrapper">
                <GraduationCap className="w-6 h-6" />
                <span className="sidebar-logo-text">Learning Platform</span>
              </div>

              {/* 移动端关闭按钮 */}
              <button
                onClick={onMobileClose}
                className="sidebar-close-btn md:hidden"
                aria-label="Close sidebar"
                title="Close sidebar"
              >
                <X className="w-4 h-4" />
              </button>

              {/* 桌面端折叠按钮 */}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="sidebar-toggle-btn hidden md:flex"
                aria-label="Collapse sidebar"
                title="Collapse sidebar"
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
            </>
          )}

          {/* 折叠状态：只显示合并的按钮 */}
          {isCollapsed && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="sidebar-toggle-btn collapsed"
              aria-label="Expand sidebar"
              title="Expand sidebar"
            >
              <GraduationCap className="w-5 h-5 sidebar-icon-default" />
              <PanelLeft className="w-5 h-5 sidebar-icon-hover" />
            </button>
          )}
        </div>

        {/* 导航菜单 */}
        <nav className="sidebar-nav">
          <div className="sidebar-nav-list">
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
                  title={isCollapsed ? item.name : ""}
                >
                  <Icon className="sidebar-link-icon" />
                  {!isCollapsed && (
                    <span className="sidebar-link-text">{item.name}</span>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* 用户信息 */}
        <div className="sidebar-user-area">
          <div
            className="sidebar-user-wrapper"
            title={isCollapsed ? user?.name : ""}
          >
            <div className="sidebar-user-avatar">
              <span className="sidebar-user-avatar-text">
                {user?.name?.charAt(0)?.toUpperCase()}
              </span>
            </div>
            {!isCollapsed && (
              <div className="sidebar-user-info">
                <p className="sidebar-user-name">{user?.name}</p>
                <p className="sidebar-user-role">{user?.role || "Student"}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

Sidebar.propTypes = {
  isMobileOpen: PropTypes.bool,
  onMobileClose: PropTypes.func,
};

export default Sidebar;
