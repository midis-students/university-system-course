import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { CathedraListPage, CathedraPage } from "./pages/Cathedras";
import { GroupList, GroupPage } from "./pages/Groups";
import MainPage from "./pages/Main";
import { StudentAddPage, StudentListPage, StudentPage } from "./pages/Students";
import { TeacherAddPage, TeacherListPage, TeacherPage } from "./pages/Teachers";

function App() {
  return (
    <Routes>
      <Route path="*" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="cathedras">
          <Route index element={<CathedraListPage />} />
          <Route path=":cathedraId" element={<CathedraPage />} />
        </Route>
        <Route path="groups">
          <Route index element={<GroupList />} />
          <Route path=":groupId" element={<GroupPage />} />
        </Route>
        <Route path="teachers">
          <Route index element={<TeacherListPage />} />
          <Route path=":teacherId" element={<TeacherPage />} />
          <Route path="add" element={<TeacherAddPage />} />
        </Route>
        <Route path="students">
          <Route index element={<StudentListPage />} />
          <Route path=":studentId" element={<StudentPage />} />
          <Route path="add" element={<StudentAddPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
