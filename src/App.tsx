import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import CathedraPage from "./pages/Cathedra";
import MainPage from "./pages/Main";

function App() {
  return (
    <Routes>
      <Route path="*" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="cathedra" element={<CathedraPage />} />
      </Route>
    </Routes>
  );
}

export default App;
