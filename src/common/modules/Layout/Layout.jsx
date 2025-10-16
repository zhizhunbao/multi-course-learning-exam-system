import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useApp } from "../../../context/AppContext";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import NotificationContainer from "../Elements/NotificationContainer";

const Layout = () => {
  const { isAuthenticated, isInitialized } = useApp();
  const navigate = useNavigate();

  // 如果用户未登录，重定向到登录页面
  React.useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isInitialized, navigate]);

  // 等待状态初始化完成
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  // 如果用户未登录，不渲染布局
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <div className="flex">
        {/* 侧边栏 */}
        <Sidebar />

        {/* 主内容区域 */}
        <div className="flex-1 flex flex-col ml-64">
          {/* 顶部导航栏 */}
          <Header />

          {/* 页面内容 */}
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>

      {/* 通知容器 */}
      <NotificationContainer />
    </div>
  );
};

export default Layout;
