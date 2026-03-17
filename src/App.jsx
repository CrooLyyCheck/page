import { Navigate, Route, Routes } from "react-router-dom";
import PageView from "./pages/PageView";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PageView slug="home" />} />
      <Route path="/:slug" element={<PageView />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
