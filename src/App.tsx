import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import CathedraPage from "./pages/Cathedra";
import GroupPage from "./pages/Group";
import MainPage from "./pages/Main";
import TeachersPage from "./pages/Teachers";
import StudentPage from "./pages/Students";
import DisciplinePage from "./pages/Discipline";
import SemesterPage from "./pages/Semester";
import LessonPage from "./pages/Lesson";
import FormOfControlPage from "./pages/FormOfControl";
import SessionPage from "./pages/Session";
import SessionResultPage from "./pages/SessionResult";
import LessonPassedPage from "./pages/LessonPassed";

function App() {
  return (
    <Routes>
      <Route path="*" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="cathedra" element={<CathedraPage />} />
        <Route path="teachers" element={<TeachersPage />} />
        <Route path="students">
          <Route index element={<StudentPage />} />
          <Route path="groups" element={<GroupPage />} />
        </Route>
        <Route path="schedule">
          <Route index element={<LessonPage />} />
          <Route path="lesson-passed" element={<LessonPassedPage />} />
          <Route path="discipline" element={<DisciplinePage />} />
          <Route path="semester" element={<SemesterPage />} />
          <Route path="form-of-control" element={<FormOfControlPage />} />
          <Route path="session" element={<SessionPage />} />
          <Route path="session-result" element={<SessionResultPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
