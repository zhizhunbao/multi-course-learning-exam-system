import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Layout from "./common/modules/Layout/Layout";
import Login from "./common/modules/Login/Login";
import LearningModule from "./modules/learning/LearningModule";
import PracticeModule from "./modules/practice/PracticeModule";
import ExperimentModule from "./modules/experiment/ExperimentModule";
import ExamModule from "./modules/exam/ExamModule";
import CourseManagement from "./modules/course-management/CourseManagementModule";
import "./common/i18n";

function App() {
  return (
    <AppProvider>
      <Router
        basename="/multi-course-learning-exam-system"
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<LearningModule />} />
              <Route path="learning" element={<LearningModule />} />
              <Route path="learning/:courseId" element={<LearningModule />} />
              <Route path="practice" element={<PracticeModule />} />
              <Route path="practice/:courseId" element={<PracticeModule />} />
              <Route path="experiment" element={<ExperimentModule />} />
              <Route
                path="experiment/:courseId"
                element={<ExperimentModule />}
              />
              <Route path="exam" element={<ExamModule />} />
              <Route path="exam/:courseId" element={<ExamModule />} />
              <Route path="course-management" element={<CourseManagement />} />
              <Route
                path="course-management/*"
                element={<CourseManagement />}
              />
            </Route>
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
