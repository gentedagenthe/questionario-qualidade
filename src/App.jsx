import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuestionarioSeletivo from "./QuestionarioSeletivo";
import AdminPanel from "./AdminPanel";

export default function App() {
  if (process.env.REACT_APP_INSCRICOES_ENCERRADAS === 'true') {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      padding: '40px'
    }}>
      <img src="/logo.png" alt="Genthe" style={{ width: 160, marginBottom: 32 }} />
      <h2 style={{ color: '#1B6FAB' }}>Inscrições encerradas</h2>
      <p style={{ color: '#555', maxWidth: 400 }}>
        O prazo para participação neste processo seletivo foi encerrado.<br/>
        Agradecemos o seu interesse.
      </p>
    </div>
  );
}
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QuestionarioSeletivo />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}
