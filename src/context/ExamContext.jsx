import React, { createContext, useContext, useReducer } from "react";

// 考试状态初始值
const initialState = {
  currentExam: null,
  currentPaper: null,
  answers: {},
  timeRemaining: 0,
  isExamStarted: false,
  isExamSubmitted: false,
  examResults: null,
  examHistory: [],
};

// 考试状态操作类型
const EXAM_ACTIONS = {
  START_EXAM: "START_EXAM",
  SUBMIT_ANSWER: "SUBMIT_ANSWER",
  SUBMIT_EXAM: "SUBMIT_EXAM",
  UPDATE_TIME: "UPDATE_TIME",
  LOAD_EXAM_HISTORY: "LOAD_EXAM_HISTORY",
  RESET_EXAM: "RESET_EXAM",
};

// 考试状态reducer
function examReducer(state, action) {
  switch (action.type) {
    case EXAM_ACTIONS.START_EXAM:
      return {
        ...state,
        currentExam: action.payload.exam,
        currentPaper: action.payload.paper,
        answers: {},
        timeRemaining: action.payload.duration,
        isExamStarted: true,
        isExamSubmitted: false,
      };

    case EXAM_ACTIONS.SUBMIT_ANSWER:
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.questionId]: action.payload.answer,
        },
      };

    case EXAM_ACTIONS.SUBMIT_EXAM:
      return {
        ...state,
        isExamSubmitted: true,
        examResults: action.payload.results,
      };

    case EXAM_ACTIONS.UPDATE_TIME:
      return {
        ...state,
        timeRemaining: action.payload.timeRemaining,
      };

    case EXAM_ACTIONS.LOAD_EXAM_HISTORY:
      return {
        ...state,
        examHistory: action.payload.history,
      };

    case EXAM_ACTIONS.RESET_EXAM:
      return {
        ...initialState,
        examHistory: state.examHistory,
      };

    default:
      return state;
  }
}

// 创建考试Context
const ExamContext = createContext();

// 考试Context Provider组件
export function ExamProvider({ children }) {
  const [state, dispatch] = useReducer(examReducer, initialState);

  const actions = {
    startExam: (exam, paper) => {
      dispatch({
        type: EXAM_ACTIONS.START_EXAM,
        payload: { exam, paper, duration: paper.duration },
      });
    },

    submitAnswer: (questionId, answer) => {
      dispatch({
        type: EXAM_ACTIONS.SUBMIT_ANSWER,
        payload: { questionId, answer },
      });
    },

    submitExam: (results) => {
      dispatch({
        type: EXAM_ACTIONS.SUBMIT_EXAM,
        payload: { results },
      });
    },

    updateTime: (timeRemaining) => {
      dispatch({
        type: EXAM_ACTIONS.UPDATE_TIME,
        payload: { timeRemaining },
      });
    },

    loadExamHistory: (history) => {
      dispatch({
        type: EXAM_ACTIONS.LOAD_EXAM_HISTORY,
        payload: { history },
      });
    },

    resetExam: () => {
      dispatch({ type: EXAM_ACTIONS.RESET_EXAM });
    },
  };

  return (
    <ExamContext.Provider value={{ state, actions }}>
      {children}
    </ExamContext.Provider>
  );
}

// 使用考试Context的Hook
export function useExam() {
  const context = useContext(ExamContext);
  if (!context) {
    throw new Error("useExam must be used within an ExamProvider");
  }
  return context;
}

export default ExamContext;
