import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import coursesData from "../modules/course-management/data/courses.json";

// 初始状态
const initialState = {
  user: null,
  isAuthenticated: false,
  currentLanguage: "zh",
  courses: coursesData.courses, // 使用课程数据
  currentCourse: null,
  userProgress: {},
  notifications: [],
  isInitialized: false, // 添加初始化状态
};

// Action types
export const ActionTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  SET_LANGUAGE: "SET_LANGUAGE",
  SET_COURSES: "SET_COURSES",
  SET_CURRENT_COURSE: "SET_CURRENT_COURSE",
  UPDATE_PROGRESS: "UPDATE_PROGRESS",
  ADD_NOTIFICATION: "ADD_NOTIFICATION",
  REMOVE_NOTIFICATION: "REMOVE_NOTIFICATION",
  CLEAR_NOTIFICATIONS_BY_TYPE: "CLEAR_NOTIFICATIONS_BY_TYPE",
  LOAD_USER_DATA: "LOAD_USER_DATA",
  INITIALIZE: "INITIALIZE",
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case ActionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        currentCourse: null,
        userProgress: {},
      };

    case ActionTypes.SET_LANGUAGE:
      return {
        ...state,
        currentLanguage: action.payload,
      };

    case ActionTypes.SET_COURSES:
      return {
        ...state,
        courses: action.payload,
      };

    case ActionTypes.SET_CURRENT_COURSE:
      return {
        ...state,
        currentCourse: action.payload,
      };

    case ActionTypes.UPDATE_PROGRESS:
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          [action.payload.courseId]: {
            ...state.userProgress[action.payload.courseId],
            ...action.payload.progress,
          },
        },
      };

    case ActionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };

    case ActionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (n) => n.id !== action.payload
        ),
      };

    case ActionTypes.CLEAR_NOTIFICATIONS_BY_TYPE:
      return {
        ...state,
        notifications: state.notifications.filter(
          (n) => n.type !== action.payload
        ),
      };

    case ActionTypes.LOAD_USER_DATA:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: action.payload.isAuthenticated,
        userProgress: action.payload.userProgress || {},
        currentLanguage: action.payload.currentLanguage || "zh",
        isInitialized: true,
      };

    case ActionTypes.INITIALIZE:
      return {
        ...state,
        isInitialized: true,
      };

    default:
      return state;
  }
};

// Context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // 从localStorage加载用户数据
  useEffect(() => {
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      try {
        const userData = JSON.parse(savedUserData);
        dispatch({
          type: ActionTypes.LOAD_USER_DATA,
          payload: userData,
        });
      } catch (error) {
        console.error("Error loading user data:", error);
        localStorage.removeItem("userData");
        dispatch({ type: ActionTypes.INITIALIZE });
      }
    } else {
      // 如果没有保存的数据，也要标记为已初始化
      dispatch({ type: ActionTypes.INITIALIZE });
    }
  }, []);

  // 保存用户数据到localStorage
  useEffect(() => {
    if (state.isAuthenticated && state.user) {
      const userData = {
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        userProgress: state.userProgress,
        currentLanguage: state.currentLanguage,
      };
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [
    state.user,
    state.isAuthenticated,
    state.userProgress,
    state.currentLanguage,
  ]);

  // Actions
  const login = (userData) => {
    dispatch({
      type: ActionTypes.LOGIN,
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem("userData");
    dispatch({ type: ActionTypes.LOGOUT });
  };

  const setLanguage = (language) => {
    dispatch({
      type: ActionTypes.SET_LANGUAGE,
      payload: language,
    });
  };

  const setCourses = useCallback((courses) => {
    dispatch({
      type: ActionTypes.SET_COURSES,
      payload: courses,
    });
  }, []);

  const setCurrentCourse = useCallback((course) => {
    dispatch({
      type: ActionTypes.SET_CURRENT_COURSE,
      payload: course,
    });
  }, []);

  const updateProgress = useCallback((courseId, progress) => {
    dispatch({
      type: ActionTypes.UPDATE_PROGRESS,
      payload: { courseId, progress },
    });
  }, []);

  const addNotification = (notification) => {
    const id = Date.now();

    // 检查是否有重复的通知内容
    const isDuplicate = state.notifications.some(
      (n) => n.message === notification.message && n.type === notification.type
    );

    // 如果是重复通知，不添加
    if (isDuplicate) {
      return;
    }

    // 如果是语言切换通知，先清除所有同类型的通知
    if (
      notification.message &&
      notification.message.includes("Language changed to")
    ) {
      dispatch({
        type: ActionTypes.CLEAR_NOTIFICATIONS_BY_TYPE,
        payload: "info",
      });
    }

    dispatch({
      type: ActionTypes.ADD_NOTIFICATION,
      payload: { id, ...notification },
    });

    // 语言切换通知显示时间较短（2秒），其他通知5秒
    const displayTime =
      notification.message &&
      notification.message.includes("Language changed to")
        ? 2000
        : 5000;

    setTimeout(() => {
      dispatch({
        type: ActionTypes.REMOVE_NOTIFICATION,
        payload: id,
      });
    }, displayTime);
  };

  const removeNotification = (id) => {
    dispatch({
      type: ActionTypes.REMOVE_NOTIFICATION,
      payload: id,
    });
  };

  const value = {
    ...state,
    login,
    logout,
    setLanguage,
    setCourses,
    setCurrentCourse,
    updateProgress,
    addNotification,
    removeNotification,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// PropTypes
AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook to use context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

export default AppContext;
