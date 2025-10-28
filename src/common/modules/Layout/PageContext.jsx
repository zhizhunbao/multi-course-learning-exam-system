import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

// 创建 Context
const PageContext = createContext(null);

// Provider 组件
export const PageProvider = ({ children }) => {
  const [pageMeta, setPageMeta] = useState({
    title: "",
    subtitle: "",
    breadcrumbs: [],
    isLoading: false,
    hasError: false,
    errorMessage: "",
  });

  const updatePageMeta = (meta) => {
    setPageMeta((prev) => ({ ...prev, ...meta }));
  };

  const resetPageMeta = () => {
    setPageMeta({
      title: "",
      subtitle: "",
      breadcrumbs: [],
      isLoading: false,
      hasError: false,
      errorMessage: "",
    });
  };

  return (
    <PageContext.Provider value={{ pageMeta, updatePageMeta, resetPageMeta }}>
      {children}
    </PageContext.Provider>
  );
};

PageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook 用于访问 Context
export const usePage = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePage must be used within PageProvider");
  }
  return context;
};
