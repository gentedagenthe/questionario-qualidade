import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://wlfxwtzjlbuzyigzspms.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsZnh3dHpqbGJ1enlpZ3pzcG1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwMTM0NzQsImV4cCI6MjA4NjU4OTQ3NH0.Y21OmV6rVzeiLDS6lQ95EQbncVLJTqfxoWJDIDDxdwo";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const SENHA = "Qualidade2026";

const cor = {
  blue: "#1B6FAB",
  blueDark: "#155a8a",
  blueLight: "#e8f2fa",
  green: "#6BBF4E",
  greenLight: "#edf7e9",
  bg: "#f4f8fc",
  white: "#ffffff",
  text: "#1a2e3d",
  muted: "#5a7a8a",
  border: "#d4e6f1",
  success: "#2d6a4f",
};

function formatarParaWhatsApp(c) {
  return `*CANDIDATO — ANALISTA DA QUALIDADE*

👤 *Nome:* ${c.nome || "—"}
🪪 *CPF:* ${c.cpf || "—"}
📧 *E-mail:* ${c.email || "—"}
📱 *Telefone:* ${c.telefone || "—"}
🎂 *Idade:* ${c.idade || "—"}
💍 *Estado civil:* ${c.estado_civil || "—"}
👶 *Filhos:* ${c.filhos || "—"}
📍 *Cidade/Bairro:* ${c.cidade || "—"} — ${c.bairro || "—"}

📚 *FORMAÇÃO E EXPERIÊNCIA*
Escolaridade: ${c.escolaridade || "—"}
Curso superior: ${c.curso_superior || "Não informado"}
Pós-graduação: ${c.pos_graduacao || "—"} ${c.descricao_pos ? `(${c.descricao_pos})` : ""}
Experiência em qualidade: ${c.experiencia_qualidade || "—"}
Descrição: ${c.descricao_experiencia || "Não informado"}
Exp. clínica de imagem: ${c.experiencia_clinica_imagem || "—"}

🔧 *COMPETÊNCIAS TÉCNICAS*
Excel: ${c.nivel_excel || "—"}
Ferramentas da qualidade: ${c.ferramentas_qualidade || "—"}
Indicadores (KPIs): ${c.indicadores || "—"}
Acreditação: ${c.acreditacao || "—"} ${c.qual_acreditacao ? `(${c.qual_acreditacao})` : ""}
Auditoria: ${c.auditoria || "—"}
Legislação sanitária: ${c.legislacao_saude || "—"}
Controle de documentos/POPs: ${c.controle_documentos || "—"}

🧠 *PERFIL E COMPORTAMENTO*
Não conformidade: ${c.nao_conformidade || "—"}
Organização: ${c.organizacao || "—"}
Trabalho em equipe: ${c.trabalho_equipe || "—"}
Melhoria de processo: ${c.melhoria || "Não informado"}

🗓️ *DISPONIBILIDADE*
Trabalhando atualmente: ${c.trabalhando_atualmente || "—"}
Disponibilidade para início: ${c.disponibilidade_inicio || "—"}
Horário disponível: ${c.disponibilidade_horario || "—"}
${c.ressalva_horario ? `Ressalvas: ${c.ressalva_horario}` : ""}
CNH: ${c.cnh || "—"}
Pretensão salarial: ${c.pretensao || "—"}

📅 Enviado em: ${c.criado_em ? new Date(c.criado_em).toLocaleString("pt-BR") : "—"}`;
}

function Logo({ white }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", lineHeight: 1 }}>
      <span style={{
        fontFamily: "'Nunito', sans-serif",
        fontSize: 22,
        fontWeight: 800,
        color: white ? "#ffffff" : cor.blue,
        letterSpacing: "-0.5px",
      }}>
        gen<span style={{ color: cor.green }}>th</span>e
      </span>
      <span style={{
        fontFamily: "'Nunito', sans-serif",
        fontSize: 7,
        fontWeight: 700,
        color: white ? "rgba(255,255,255,0.6)" : cor.blue,
        letterSpacing: "2px",
        textTransform: "uppercase",
        marginTop: 1,
      }}>
        que entende de gente
      </span>
    </div>
  );
}

function Estilos() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { background: ${cor.bg}; }
      input:focus { outline: none; border-color: ${cor.blue} !important; box-shadow: 0 0 0 3px rgba(27,111,171,0.12); }
      button { transition: all 0.15s ease; }
      button:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
    `}</style>
  );
}

function Secao({ titulo, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{
        fontSize: 11,
        fontWeight: 800,
        color: cor.blue,
        textTransform: "uppercase",
        letterSpacing: 1.5,
        marginBottom: 10,
        paddingBottom: 6,
        borderBottom: `1.5px solid ${cor.border}`,
        fontFamily: "'Nunito', sans-serif",
      }}>
        {titulo}
      </div>
      {children}
    </div>
  );
}

function Item({ label, valor }) {
  if (!valor) return null;
  return (
    <div style={{ marginBottom: 8 }}>
      <span style={{ fontSize: 12, color: cor.muted, fontWeight: 600, fontFamily: "'Nunito', sans-serif" }}>{label}: </span>
      <span style={{ fontSize: 13, color: cor.text }}>{valor}</span>
    </div>
  );
}

export default function AdminPanel() {
  const [autenticado, setAutenticado] = useState(false);
  const [senha, setSenha] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  const [candidatos, setCandidatos] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [selecionado, setSelecionado] = useState(null);
  const [copiado, setCopiado] = useState(false);
  const [busca, setBusca] = useState("");

  const login = () => {
    if (senha === SENHA) {
      setAutenticado(true);
      carregarCandidatos();
    } else {
      setErroSenha("Senha incorreta.");
    }
  };

  const carregarCandidatos = async () => {
    setCarregando(true);
    const { data, error } = await supabase
      .from("candidatos_qualidade")
      .select("*")
      .order("criado_em", { ascending: false });
    if (!error) setCandidatos(data || []);
    setCarregando(false);
  };

  const copiarTexto = (candidato) => {
    const texto = formatarParaWhatsApp(candidato);
    navigator.clipboard.writeText(texto);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  const filtrados = candidatos.filter(
    (c) =>
      (c.nome || "").toLowerCase().includes(busca.toLowerCase()) ||
      (c.email || "").toLowerCase().includes(busca.toLowerCase()) ||
      (c.cidade || "").toLowerCase().includes(busca.toLowerCase()) ||
      (c.cpf || "").replace(/\D/g, "").includes(busca.replace(/\D/g, ""))
  );

  if (!autenticado) {
    return (
      <div style={st.loginPage}>
        <Estilos />
        <div style={st.loginCard}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <Logo />
          </div>
          <h2 style={st.loginTitulo}>Painel Administrativo</h2>
          <p style={st.loginSubtitulo}>Processo Seletivo — Analista da Qualidade</p>
          <div style={st.loginCampo}>
            <label style={st.loginLabel}>Senha de acesso</label>
            <input
              type="password"
              placeholder="Digite a senha"
              value={senha}
              onChange={(e) => { setSenha(e.target.value); setErroSenha(""); }}
              onKeyDown={(e) => e.key === "Enter" && login()}
              style={st.loginInput}
            />
            {erroSenha && <span style={st.erro}>{erroSenha}</span>}
          </div>
          <button onClick={login} style={st.loginBtn}>Acessar</button>
        </div>
      </div>
    );
  }

  return (
    <div style={st.page}>
      <Estilos />

      <div style={st.header}>
        <div style={st.headerInner}>
          <Logo white />
          <div style={st.headerInfo}>
            <span style={st.headerTag}>Analista da Qualidade · Painel Admin</span>
            <span style={st.headerCount}>
              {candidatos.length} candidato{candidatos.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      <div style={st.container}>
        <div style={st.buscaWrapper}>
          <input
            type="text"
            placeholder="Buscar por nome, e-mail, cidade ou CPF..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={st.buscaInput}
          />
        </div>

        {carregando ? (
          <div style={st.loading}>Carregando candidatos...</div>
        ) : filtrados.length === 0 ? (
          <div style={st.loading}>Nenhum candidato encontrado.</div>
        ) : (
          <div style={st.lista}>
            {filtrados.map((c) => (
              <div key={c.id} style={st.card}>
                <div style={st.cardHeader}>
                  <div>
                    <div style={st.cardNome}>{c.nome || "Nome não informado"}</div>
                    <div style={st.cardInfo}>{c.email} · {c.telefone}</div>
                    <div style={st.cardInfo}>CPF: {c.cpf || "Não informado"}</div>
                    <div style={st.cardInfo}>
                      {c.cidade} — {c.bairro} · {c.idade} anos · {c.estado_civil}
                    </div>
                    <div style={st.cardTags}>
                      {c.experiencia_qualidade && c.experiencia_qualidade !== "Não possuo" && (
                        <span style={st.tag}>Qualidade: {c.experiencia_qualidade}</span>
                      )}
                      {c.acreditacao && c.acreditacao !== "Nunca" && (
                        <span style={{ ...st.tag, ...st.tagGreen }}>Acreditação</span>
                      )}
                      {c.auditoria && c.auditoria !== "Nunca" && (
                        <span style={{ ...st.tag, ...st.tagGreen }}>Auditoria</span>
                      )}
                      {c.experiencia_clinica_imagem && c.experiencia_clinica_imagem !== "Não" && (
                        <span style={{ ...st.tag, ...st.tagBlue }}>Imagem</span>
                      )}
                    </div>
                  </div>
                  <div style={st.cardAcoes}>
                    <button
                      onClick={() => setSelecionado(selecionado?.id === c.id ? null : c)}
                      style={st.btnVer}
                    >
                      {selecionado?.id === c.id ? "Fechar" : "Ver respostas"}
                    </button>
                    <button onClick={() => copiarTexto(c)} style={st.btnCopiar}>
                      📋 Copiar para WhatsApp
                    </button>
                  </div>
                </div>

                {selecionado?.id === c.id && (
                  <div style={st.respostas}>
                    <Secao titulo="Dados Pessoais">
                      <Item label="Nome" valor={c.nome} />
                      <Item label="CPF" valor={c.cpf} />
                      <Item label="E-mail" valor={c.email} />
                      <Item label="Telefone" valor={c.telefone} />
                      <Item label="Idade" valor={c.idade} />
                      <Item label="Estado civil" valor={c.estado_civil} />
                      <Item label="Filhos" valor={c.filhos} />
                      <Item label="Cidade" valor={c.cidade} />
                      <Item label="Bairro" valor={c.bairro} />
                    </Secao>
                    <Secao titulo="Formação e Experiência">
                      <Item label="Escolaridade" valor={c.escolaridade} />
                      <Item label="Curso superior" valor={c.curso_superior} />
                      <Item label="Pós-graduação" valor={c.pos_graduacao} />
                      <Item label="Qual pós-graduação" valor={c.descricao_pos} />
                      <Item label="Experiência em qualidade" valor={c.experiencia_qualidade} />
                      <Item label="Descrição da experiência" valor={c.descricao_experiencia} />
                      <Item label="Exp. clínica de imagem" valor={c.experiencia_clinica_imagem} />
                    </Secao>
                    <Secao titulo="Competências Técnicas">
                      <Item label="Excel" valor={c.nivel_excel} />
                      <Item label="Ferramentas da qualidade" valor={c.ferramentas_qualidade} />
                      <Item label="Indicadores (KPIs)" valor={c.indicadores} />
                      <Item label="Acreditação" valor={c.acreditacao} />
                      <Item label="Qual acreditação" valor={c.qual_acreditacao} />
                      <Item label="Auditoria" valor={c.auditoria} />
                      <Item label="Legislação sanitária" valor={c.legislacao_saude} />
                      <Item label="Controle de documentos/POPs" valor={c.controle_documentos} />
                    </Secao>
                    <Secao titulo="Perfil e Comportamento">
                      <Item label="Não conformidade" valor={c.nao_conformidade} />
                      <Item label="Organização" valor={c.organizacao} />
                      <Item label="Trabalho em equipe" valor={c.trabalho_equipe} />
                      <Item label="Melhoria de processo" valor={c.melhoria} />
                    </Secao>
                    <Secao titulo="Disponibilidade">
                      <Item label="Trabalhando atualmente" valor={c.trabalhando_atualmente} />
                      <Item label="Disponibilidade para início" valor={c.disponibilidade_inicio} />
                      <Item label="Horário" valor={c.disponibilidade_horario} />
                      <Item label="Ressalvas de horário" valor={c.ressalva_horario} />
                      <Item label="CNH" valor={c.cnh} />
                      <Item label="Pretensão salarial" valor={c.pretensao} />
                    </Secao>
                    <div style={st.dataEnvio}>
                      Enviado em:{" "}
                      {c.criado_em ? new Date(c.criado_em).toLocaleString("pt-BR") : "—"}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {copiado && (
        <div style={st.toast}>✅ Texto copiado! Cole no WhatsApp.</div>
      )}
    </div>
  );
}

const st = {
  loginPage: { minHeight: "100vh", background: cor.blue, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif" },
  loginCard: { background: cor.white, borderRadius: 16, padding: "44px 40px", width: "100%", maxWidth: 400, textAlign: "center", boxShadow: "0 12px 48px rgba(0,0,0,0.2)" },
  loginTitulo: { fontFamily: "'Nunito', sans-serif", fontSize: 20, fontWeight: 800, color: cor.text, marginBottom: 6 },
  loginSubtitulo: { fontSize: 13, color: cor.muted, marginBottom: 28 },
  loginCampo: { textAlign: "left", marginBottom: 20 },
  loginLabel: { display: "block", fontSize: 13, fontWeight: 600, color: cor.text, marginBottom: 8, fontFamily: "'Nunito', sans-serif" },
  loginInput: { width: "100%", padding: "12px 14px", fontSize: 14, border: `1.5px solid ${cor.border}`, borderRadius: 8, background: "#f8fbfd", color: cor.text, fontFamily: "'DM Sans', sans-serif" },
  loginBtn: { width: "100%", padding: "13px", background: cor.blue, border: "none", borderRadius: 8, fontSize: 15, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "'Nunito', sans-serif" },
  erro: { fontSize: 12, color: "#e53e3e", marginTop: 4, display: "block" },
  page: { minHeight: "100vh", background: cor.bg, fontFamily: "'DM Sans', sans-serif", color: cor.text },
  header: { background: cor.blue, boxShadow: "0 2px 16px rgba(27,111,171,0.25)" },
  headerInner: { maxWidth: 960, margin: "0 auto", padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 },
  headerInfo: { display: "flex", alignItems: "center", gap: 16 },
  headerTag: { fontSize: 12, color: "rgba(255,255,255,0.65)", fontWeight: 500 },
  headerCount: { fontSize: 13, color: cor.green, fontWeight: 700, fontFamily: "'Nunito', sans-serif" },
  container: { maxWidth: 960, margin: "0 auto", padding: "24px" },
  buscaWrapper: { marginBottom: 20 },
  buscaInput: { width: "100%", padding: "12px 16px", fontSize: 14, border: `1.5px solid ${cor.border}`, borderRadius: 10, background: cor.white, color: cor.text, fontFamily: "'DM Sans', sans-serif" },
  loading: { textAlign: "center", padding: 48, color: cor.muted, fontSize: 15 },
  lista: { display: "flex", flexDirection: "column", gap: 12 },
  card: { background: cor.white, borderRadius: 12, padding: "20px 24px", boxShadow: "0 2px 12px rgba(27,111,171,0.07)", border: `1px solid ${cor.border}` },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 },
  cardNome: { fontSize: 16, fontWeight: 800, color: cor.text, marginBottom: 4, fontFamily: "'Nunito', sans-serif" },
  cardInfo: { fontSize: 13, color: cor.muted, marginBottom: 2 },
  cardTags: { display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" },
  tag: { fontSize: 11, padding: "3px 10px", borderRadius: 20, background: cor.blueLight, color: cor.blue, fontWeight: 700, fontFamily: "'Nunito', sans-serif" },
  tagGreen: { background: cor.greenLight, color: cor.green },
  tagBlue: { background: cor.blueLight, color: cor.blueDark },
  cardAcoes: { display: "flex", gap: 8, flexWrap: "wrap" },
  btnVer: { padding: "8px 16px", background: cor.blueLight, border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, color: cor.blue, cursor: "pointer", fontFamily: "'Nunito', sans-serif" },
  btnCopiar: { padding: "8px 16px", background: cor.blue, border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "'Nunito', sans-serif" },
  respostas: { marginTop: 20, paddingTop: 20, borderTop: `1px solid ${cor.border}` },
  dataEnvio: { fontSize: 12, color: cor.muted, marginTop: 8, textAlign: "right" },
  toast: { position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: cor.success, color: "#fff", padding: "12px 24px", borderRadius: 10, fontSize: 14, fontWeight: 600, boxShadow: "0 4px 20px rgba(0,0,0,0.2)", zIndex: 999 },
};
