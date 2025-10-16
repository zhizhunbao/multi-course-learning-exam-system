import React, { createContext, useContext, useReducer } from "react";

// 学习状态初始值
const initialState = {
  currentCourse: null,
  currentLesson: null,
  learningProgress: {},
  bookmarks: [],
  notes: [],
  isLearning: false,
  lastPosition: 0,
  completedLessons: [],
};

// 学习状态操作类型
const LEARNING_ACTIONS = {
  START_LEARNING: "START_LEARNING",
  UPDATE_PROGRESS: "UPDATE_PROGRESS",
  ADD_BOOKMARK: "ADD_BOOKMARK",
  REMOVE_BOOKMARK: "REMOVE_BOOKMARK",
  ADD_NOTE: "ADD_NOTE",
  UPDATE_NOTE: "UPDATE_NOTE",
  DELETE_NOTE: "DELETE_NOTE",
  UPDATE_POSITION: "UPDATE_POSITION",
  COMPLETE_LESSON: "COMPLETE_LESSON",
  LOAD_LEARNING_DATA: "LOAD_LEARNING_DATA",
};

// 学习状态reducer
function learningReducer(state, action) {
  switch (action.type) {
    case LEARNING_ACTIONS.START_LEARNING:
      return {
        ...state,
        currentCourse: action.payload.course,
        currentLesson: action.payload.lesson,
        isLearning: true,
        lastPosition: 0,
      };

    case LEARNING_ACTIONS.UPDATE_PROGRESS:
      return {
        ...state,
        learningProgress: {
          ...state.learningProgress,
          [action.payload.lessonId]: action.payload.progress,
        },
      };

    case LEARNING_ACTIONS.ADD_BOOKMARK:
      return {
        ...state,
        bookmarks: [...state.bookmarks, action.payload.bookmark],
      };

    case LEARNING_ACTIONS.REMOVE_BOOKMARK:
      return {
        ...state,
        bookmarks: state.bookmarks.filter(
          (bookmark) => bookmark.id !== action.payload.bookmarkId
        ),
      };

    case LEARNING_ACTIONS.ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload.note],
      };

    case LEARNING_ACTIONS.UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.noteId
            ? { ...note, ...action.payload.updates }
            : note
        ),
      };

    case LEARNING_ACTIONS.DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload.noteId),
      };

    case LEARNING_ACTIONS.UPDATE_POSITION:
      return {
        ...state,
        lastPosition: action.payload.position,
      };

    case LEARNING_ACTIONS.COMPLETE_LESSON:
      return {
        ...state,
        completedLessons: [...state.completedLessons, action.payload.lessonId],
      };

    case LEARNING_ACTIONS.LOAD_LEARNING_DATA:
      return {
        ...state,
        learningProgress: action.payload.progress || state.learningProgress,
        bookmarks: action.payload.bookmarks || state.bookmarks,
        notes: action.payload.notes || state.notes,
        completedLessons:
          action.payload.completedLessons || state.completedLessons,
      };

    default:
      return state;
  }
}

// 创建学习Context
const LearningContext = createContext();

// 学习Context Provider组件
export function LearningProvider({ children }) {
  const [state, dispatch] = useReducer(learningReducer, initialState);

  const actions = {
    startLearning: (course, lesson) => {
      dispatch({
        type: LEARNING_ACTIONS.START_LEARNING,
        payload: { course, lesson },
      });
    },

    updateProgress: (lessonId, progress) => {
      dispatch({
        type: LEARNING_ACTIONS.UPDATE_PROGRESS,
        payload: { lessonId, progress },
      });
    },

    addBookmark: (bookmark) => {
      dispatch({
        type: LEARNING_ACTIONS.ADD_BOOKMARK,
        payload: { bookmark },
      });
    },

    removeBookmark: (bookmarkId) => {
      dispatch({
        type: LEARNING_ACTIONS.REMOVE_BOOKMARK,
        payload: { bookmarkId },
      });
    },

    addNote: (note) => {
      dispatch({
        type: LEARNING_ACTIONS.ADD_NOTE,
        payload: { note },
      });
    },

    updateNote: (noteId, updates) => {
      dispatch({
        type: LEARNING_ACTIONS.UPDATE_NOTE,
        payload: { noteId, updates },
      });
    },

    deleteNote: (noteId) => {
      dispatch({
        type: LEARNING_ACTIONS.DELETE_NOTE,
        payload: { noteId },
      });
    },

    updatePosition: (position) => {
      dispatch({
        type: LEARNING_ACTIONS.UPDATE_POSITION,
        payload: { position },
      });
    },

    completeLesson: (lessonId) => {
      dispatch({
        type: LEARNING_ACTIONS.COMPLETE_LESSON,
        payload: { lessonId },
      });
    },

    loadLearningData: (data) => {
      dispatch({
        type: LEARNING_ACTIONS.LOAD_LEARNING_DATA,
        payload: data,
      });
    },
  };

  return (
    <LearningContext.Provider value={{ state, actions }}>
      {children}
    </LearningContext.Provider>
  );
}

// 使用学习Context的Hook
export function useLearning() {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error("useLearning must be used within a LearningProvider");
  }
  return context;
}

export default LearningContext;
