import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { GroupList, GroupPage } from './pages/Groups';
import StudentsPage from './pages/Students';

function App() {
  return (
    <Routes>
      <Route path="*" element={<Layout />}>
        <Route index element={<StudentsPage />} />
        <Route path="students" />

        <Route path="groups">
          <Route index element={<GroupList />} />
          <Route path=":groupId" element={<GroupPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
