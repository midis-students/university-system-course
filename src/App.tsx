import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import CathedraPage from "./pages/Cathedra";
import GroupPage from "./pages/Group";
import MainPage from "./pages/Main";
import TeachersPage from "./pages/Teachers";
import StudentPage from "./pages/Students";
import DisciplinePage from "./pages/Discipline";

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
        <Route path="discipline" element={<DisciplinePage />} />
      </Route>
    </Routes>
  );
}

export default App;
