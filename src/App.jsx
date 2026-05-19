import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuestionarioSeletivo from "./QuestionarioSeletivo";
import AdminPanel from "./AdminPanel";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QuestionarioSeletivo />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}
