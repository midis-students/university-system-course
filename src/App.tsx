import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CathedraPage from './pages/Cathedra';
import MainPage from './pages/Main';
import TeachersPage from './pages/Teachers';

function App() {
  return (
    <Routes>
      <Route path="*" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="cathedra" element={<CathedraPage />} />
        <Route path="teachers" element={<TeachersPage />} />
      </Route>
    </Routes>
  );
}

export default App;
