import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://wlfxwtzjlbuzyigzspms.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsZnh3dHpqbGJ1enlpZ3pzcG1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwMTM0NzQsImV4cCI6MjA4NjU4OTQ3NH0.Y21OmV6rVzeiLDS6lQ95EQbncVLJTqfxoWJDIDDxdwo";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const cor = {
  blue: "#1B6FAB",
  blueDark: "#155a8a",
  blueLight: "#e8f2fa",
  blueMid: "#d0e6f5",
  green: "#6BBF4E",
  greenDark: "#55a03b",
  greenLight: "#edf7e9",
  bg: "#f4f8fc",
  white: "#ffffff",
  text: "#1a2e3d",
  muted: "#5a7a8a",
  border: "#d4e6f1",
  error: "#c0392b",
};

function formatarCPF(valor) {
  const digitos = valor.replace(/\D/g, "").slice(0, 11);
  return digitos
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function validarCPF(valor) {
  const cpf = (valor || "").replace(/\D/g, "");
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf[i], 10) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[9], 10)) return false;
  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf[i], 10) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf[10], 10);
}

const ETAPAS = [
  {
    id: "dados_pessoais",
    titulo: "Dados Pessoais",
    descricao: "Vamos começar com suas informações básicas.",
    campos: [
      { id: "nome", label: "Nome completo", tipo: "text", obrigatorio: true, placeholder: "Seu nome completo" },
      { id: "cpf", label: "CPF", tipo: "cpf", obrigatorio: true, placeholder: "000.000.000-00" },
      { id: "email", label: "E-mail", tipo: "email", obrigatorio: true, placeholder: "seu@email.com" },
      { id: "telefone", label: "Telefone / WhatsApp", tipo: "tel", obrigatorio: true, placeholder: "(67) 99999-9999" },
      { id: "idade", label: "Idade", tipo: "number", obrigatorio: true, placeholder: "Ex: 28" },
      {
        id: "estado_civil",
        label: "Estado civil",
        tipo: "select",
        obrigatorio: true,
        opcoes: ["Solteiro(a)", "Casado(a)", "União estável", "Divorciado(a)", "Viúvo(a)"],
      },
      {
        id: "filhos",
        label: "Possui filhos?",
        tipo: "select",
        obrigatorio: true,
        opcoes: ["Não", "Sim, 1 filho", "Sim, 2 filhos", "Sim, 3 ou mais filhos"],
      },
      { id: "cidade", label: "Cidade", tipo: "text", obrigatorio: true, placeholder: "Ex: Campo Grande" },
      { id: "bairro", label: "Bairro", tipo: "text", obrigatorio: true, placeholder: "Ex: Centro" },
    ],
  },
  {
    id: "formacao",
    titulo: "Formação e Experiência",
    descricao: "Conte-nos sobre sua trajetória acadêmica e profissional.",
    campos: [
      {
        id: "escolaridade",
        label: "Escolaridade",
        tipo: "select",
        obrigatorio: true,
        opcoes: [
          "Ensino médio completo",
          "Superior incompleto",
          "Superior completo",
          "Pós-graduação incompleta",
          "Pós-graduação completa",
          "Mestrado ou mais",
        ],
      },
      {
        id: "curso_superior",
        label: "Qual é (ou foi) seu curso superior?",
        tipo: "text",
        obrigatorio: false,
        placeholder: "Ex: Enfermagem, Biomedicina, Administração...",
      },
      {
        id: "pos_graduacao",
        label: "Possui pós-graduação na área de qualidade ou saúde?",
        tipo: "select",
        obrigatorio: true,
        opcoes: ["Não", "Sim, concluída", "Sim, em andamento"],
      },
      {
        id: "descricao_pos",
        label: "Se sim, qual?",
        tipo: "text",
        obrigatorio: false,
        placeholder: "Ex: Gestão da Qualidade em Saúde",
      },
      {
        id: "experiencia_qualidade",
        label: "Possui experiência na área de qualidade em serviços de saúde?",
        tipo: "select",
        obrigatorio: true,
        opcoes: [
          "Não possuo",
          "Menos de 1 ano",
          "Entre 1 e 3 anos",
          "Entre 3 e 5 anos",
          "Mais de 5 anos",
        ],
      },
      {
        id: "descricao_experiencia",
        label: "Descreva brevemente sua experiência na área de qualidade",
        tipo: "textarea",
        obrigatorio: false,
        placeholder: "Onde atuou, quais processos, acreditações envolvidas...",
      },
      {
        id: "experiencia_clinica_imagem",
        label: "Possui experiência em clínica de imagem ou diagnóstico?",
        tipo: "select",
        obrigatorio: true,
        opcoes: ["Não", "Sim, como estagiário(a)", "Sim, como profissional"],
      },
    ],
  },
  {
    id: "competencias",
    titulo: "Competências Técnicas",
    descricao: "Avalie seu domínio nas ferramentas e conhecimentos necessários para a vaga.",
    campos: [
      {
        id: "nivel_excel",
        label: "Nível no Excel",
        tipo: "select",
        obrigatorio: true,
        opcoes: ["Não utilizo", "Básico", "Intermediário", "Avançado"],
      },
      {
        id: "ferramentas_qualidade",
        label: "Conhece ferramentas da qualidade? (PDCA, FMEA, Ishikawa etc.)",
        tipo: "select",
        obrigatorio: true,
        opcoes: [
          "Não conheço",
          "Conheço teoricamente",
          "Já apliquei em ambiente de trabalho",
          "Tenho domínio e aplico com frequência",
        ],
      },
      {
        id: "indicadores",
        label: "Já trabalhou com indicadores de desempenho (KPIs)?",
        tipo: "select",
        obrigatorio: true,
        opcoes: ["Nunca", "Raramente", "Com frequência", "É parte central do meu trabalho"],
      },
      {
        id: "acreditacao",
        label: "Já participou de processos de acreditação ou certificação (ONA, ACCB, ISO etc.)?",
        tipo: "select",
        obrigatorio: true,
        opcoes: [
          "Nunca",
          "Sim, acompanhei o processo",
          "Sim, atuei diretamente",
          "Sim, liderei etapas do processo",
        ],
      },
      {
        id: "qual_acreditacao",
        label: "Se sim, qual(is)?",
        tipo: "text",
        obrigatorio: false,
        placeholder: "Ex: ONA Nível 1, ISO 9001...",
      },
      {
        id: "auditoria",
        label: "Já realizou ou participou de auditorias internas?",
        tipo: "select",
        obrigatorio: true,
        opcoes: [
          "Nunca",
          "Participei como auditado(a)",
          "Participei como auditor(a)",
          "Conduzi auditorias",
        ],
      },
      {
        id: "legislacao_saude",
        label: "Como avalia seu conhecimento em legislação sanitária (ANVISA, RDC etc.)?",
        tipo: "select",
        obrigatorio: true,
        opcoes: ["Não tenho conhecimento", "Básico", "Intermediário", "Avançado"],
      },
      {
        id: "controle_documentos",
        label: "Já trabalhou com controle de documentos, POPs e protocolos?",
        tipo: "select",
        obrigatorio: true,
        opcoes: ["Não", "Sim, de forma pontual", "Sim, de forma sistemática"],
      },
    ],
  },
  {
    id: "perfil",
    titulo: "Perfil e Comportamento",
    descricao: "Queremos entender como você age no dia a dia profissional.",
    campos: [
      {
        id: "nao_conformidade",
        label: "Como você age ao identificar uma não conformidade em um processo?",
        tipo: "textarea",
        obrigatorio: true,
        placeholder: "Descreva sua abordagem prática...",
      },
      {
        id: "organizacao",
        label: "Como você organiza múltiplas demandas simultâneas com prazos diferentes?",
        tipo: "textarea",
        obrigatorio: true,
        placeholder: "Descreva sua forma de se organizar...",
      },
      {
        id: "trabalho_equipe",
        label: "Já precisou implementar uma mudança de processo com resistência da equipe? Como foi?",
        tipo: "textarea",
        obrigatorio: true,
        placeholder: "Relate a situação e o que você fez...",
      },
      {
        id: "melhoria",
        label: "Dê um exemplo de melhoria de processo que você identificou e propôs em algum trabalho",
        tipo: "textarea",
        obrigatorio: false,
        placeholder: "Descreva o problema, sua proposta e o resultado...",
      },
    ],
  },
  {
    id: "disponibilidade",
    titulo: "Disponibilidade",
    descricao: "Últimas informações antes de concluir.",
    campos: [
      {
        id: "trabalhando_atualmente",
        label: "Está trabalhando atualmente?",
        tipo: "select",
        obrigatorio: true,
        opcoes: ["Não", "Sim"],
      },
      {
        id: "disponibilidade_inicio",
        label: "Qual sua disponibilidade para início?",
        tipo: "select",
        obrigatorio: true,
        opcoes: ["Imediata", "Em até 15 dias", "Em até 30 dias", "Em até 60 dias"],
      },
      {
        id: "disponibilidade_horario",
        label: "Tem disponibilidade para o horário de segunda a sexta, das 07h às 17h?",
        tipo: "select",
        obrigatorio: true,
        opcoes: ["Sim, total", "Sim, com ressalvas", "Não tenho disponibilidade"],
      },
      {
        id: "ressalva_horario",
        label: "Se tiver ressalvas, descreva",
        tipo: "text",
        obrigatorio: false,
        placeholder: "Ex: tenho compromisso às quartas-feiras pela manhã",
      },
      {
        id: "cnh",
        label: "Possui CNH?",
        tipo: "select",
        obrigatorio: true,
        opcoes: ["Não", "Sim, categoria A", "Sim, categoria B", "Sim, AB ou superior"],
      },
      {
        id: "pretensao",
        label: "Qual sua pretensão salarial?",
        tipo: "text",
        obrigatorio: true,
        placeholder: "Ex: R$ 2.500,00",
      },
    ],
  },
];

function Logo({ white }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", lineHeight: 1 }}>
      <span style={{
        fontFamily: "'Nunito', sans-serif",
        fontSize: 24,
        fontWeight: 800,
        color: white ? "#ffffff" : cor.blue,
        letterSpacing: "-0.5px",
      }}>
        gen<span style={{ color: cor.green }}>th</span>e
      </span>
      <span style={{
        fontFamily: "'Nunito', sans-serif",
        fontSize: 7.5,
        fontWeight: 700,
        color: white ? "rgba(255,255,255,0.65)" : cor.blue,
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
      select, input, textarea { outline: none; }
      select:focus, input:focus, textarea:focus {
        border-color: ${cor.blue} !important;
        box-shadow: 0 0 0 3px rgba(27,111,171,0.12);
      }
      button { transition: all 0.15s ease; }
      button:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
    `}</style>
  );
}

export default function QuestionarioSeletivo() {
  const [iniciado, setIniciado] = useState(false);
  const [lgpdAceito, setLgpdAceito] = useState(false);
  const [errLgpd, setErrLgpd] = useState(false);
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [respostas, setRespostas] = useState({});
  const [erros, setErros] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erroEnvio, setErroEnvio] = useState("");

  const etapa = ETAPAS[etapaAtual];
  const totalEtapas = ETAPAS.length;
  const progresso = (etapaAtual / totalEtapas) * 100;

  const atualizar = (id, valor) => {
    setRespostas((prev) => ({ ...prev, [id]: valor }));
    if (erros[id]) setErros((prev) => ({ ...prev, [id]: "" }));
  };

  const validar = () => {
    const novosErros = {};
    etapa.campos.forEach((campo) => {
      if (campo.obrigatorio && !respostas[campo.id]?.toString().trim()) {
        novosErros[campo.id] = "Campo obrigatório.";
      } else if (campo.tipo === "cpf" && respostas[campo.id] && !validarCPF(respostas[campo.id])) {
        novosErros[campo.id] = "CPF inválido.";
      }
    });
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const avancar = () => {
    if (!validar()) return;
    if (etapaAtual < totalEtapas - 1) {
      setEtapaAtual((p) => p + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      enviar();
    }
  };

  const voltar = () => {
    setEtapaAtual((p) => p - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const enviar = async () => {
    setEnviando(true);
    setErroEnvio("");
    const { error } = await supabase
      .from("candidatos_qualidade")
      .insert([{ ...respostas, criado_em: new Date().toISOString() }]);
    setEnviando(false);
    if (error) {
      setErroEnvio("Erro ao enviar. Tente novamente em alguns segundos.");
    } else {
      setEnviado(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const iniciar = () => {
    if (!lgpdAceito) { setErrLgpd(true); return; }
    setIniciado(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!iniciado) {
    return (
      <div style={s.page}>
        <Estilos />
        <div style={s.header}>
          <div style={s.headerInner}>
            <Logo white />
            <div style={s.vagaTag}>Analista da Qualidade · Campo Grande/MS</div>
          </div>
          <div style={s.progressBar}><div style={{ ...s.progressFill, width: "0%" }} /></div>
        </div>
        <div style={s.container}>
          <div style={s.card}>

            {/* Cabeçalho da vaga */}
            <div style={si.vagaHeader}>
              <div style={si.vagaBadge}>Processo Seletivo Aberto</div>
              <h1 style={si.vagaTitulo}>Analista da Qualidade</h1>
              <p style={si.vagaEmpresa}>Clínica de Imagem · Campo Grande/MS</p>
            </div>

            {/* Informações da vaga */}
            <div style={si.infoGrid}>
              <InfoItem icone="📄" label="Contratação" valor="CLT" />
              <InfoItem icone="💰" label="Salário" valor="R$ 2.500,00 bruto" />
              <InfoItem icone="🕗" label="Horário" valor="Seg a Sex · 07h às 17h" />
              <InfoItem icone="📍" label="Local" valor="Campo Grande/MS" />
            </div>

            {/* Benefícios */}
            <div style={si.secao}>
              <div style={si.secaoTitulo}>🎁 Benefícios</div>
              <div style={si.beneficiosGrid}>
                {[
                  "Vale Transporte (se necessário)",
                  "Vale Refeição R$ 25,00/dia",
                  "Assiduidade 10%",
                  "Wellhub",
                  "Conexa",
                  "Plano de saúde coparticipativo 50%",
                  "Plano odontológico",
                  "Convênio com farmácia",
                  "Vale Alimentação R$ 114,00/mês (após 90 dias)",
                ].map((b) => (
                  <div key={b} style={si.beneficioItem}>
                    <span style={si.beneficioCheck}>✓</span> {b}
                  </div>
                ))}
              </div>
            </div>

            {/* Requisitos */}
            <div style={si.secao}>
              <div style={si.secaoTitulo}>📚 Requisitos</div>
              <ul style={si.lista}>
                <li>Ensino Superior completo em Enfermagem, Administração, Gestão da Qualidade ou áreas correlatas</li>
                <li>Experiência na área da qualidade em serviços de saúde, preferencialmente em clínica de imagem</li>
                <li>Conhecimento em ferramentas da qualidade e indicadores</li>
                <li>Vivência com auditorias e processos de acreditação</li>
                <li>Domínio do Pacote Office, especialmente Excel</li>
              </ul>
            </div>

            {/* Prazo */}
            <div style={si.prazoBanner}>
              <span style={si.prazoIcone}>📅</span>
              <div>
                <div style={si.prazoLabel}>Prazo para preenchimento</div>
                <div style={si.prazoData}>até 07 de agosto de 2026</div>
              </div>
            </div>

            {/* LGPD */}
            <div style={si.lgpdBox}>
              <div style={si.lgpdTitulo}>🔒 Proteção de Dados — LGPD</div>
              <p style={si.lgpdTexto}>
                As informações fornecidas neste questionário serão utilizadas exclusivamente para fins
                de seleção e recrutamento, em conformidade com a{" "}
                <strong>Lei Geral de Proteção de Dados (Lei nº 13.709/2018)</strong>.
                Seus dados serão armazenados com segurança, não serão compartilhados com terceiros
                sem sua autorização e poderão ser solicitados para exclusão a qualquer momento pelo
                e-mail <strong>contato@genthe.com.br</strong>.
              </p>
              <label style={si.lgpdLabel}>
                <input
                  type="checkbox"
                  checked={lgpdAceito}
                  onChange={(e) => { setLgpdAceito(e.target.checked); if (e.target.checked) setErrLgpd(false); }}
                  style={si.lgpdCheck}
                />
                <span>
                  Li e concordo com o tratamento dos meus dados pessoais para fins de participação
                  neste processo seletivo, conforme a LGPD.
                </span>
              </label>
              {errLgpd && (
                <p style={si.lgpdErro}>É necessário concordar com os termos para continuar.</p>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
              <button onClick={iniciar} style={s.btnAvancar}>
                Iniciar questionário →
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  if (enviado) {
    return (
      <div style={s.page}>
        <Estilos />
        <div style={s.successWrap}>
          <div style={s.successCard}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
              <Logo />
            </div>
            <div style={s.successIcon}>✓</div>
            <h2 style={s.successTitulo}>Questionário enviado!</h2>
            <p style={s.successTexto}>
              Obrigado pela participação. Nossa equipe analisará suas respostas e,
              se houver compatibilidade com a vaga de{" "}
              <strong>Analista da Qualidade</strong>, entraremos em contato em breve.
            </p>
            <p style={s.successSlogan}>Genthe que entende de gente.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <Estilos />

      <div style={s.header}>
        <div style={s.headerInner}>
          <Logo white />
          <div style={s.vagaTag}>Analista da Qualidade · Campo Grande/MS</div>
        </div>
        <div style={s.progressBar}>
          <div style={{ ...s.progressFill, width: `${progresso}%` }} />
        </div>
      </div>

      <div style={s.container}>
        <div style={s.etapaInfo}>
          <span style={s.etapaNum}>Etapa {etapaAtual + 1} de {totalEtapas}</span>
          <h1 style={s.etapaTitulo}>{etapa.titulo}</h1>
          <p style={s.etapaDesc}>{etapa.descricao}</p>
        </div>

        <div style={s.card}>
          {etapa.campos.map((campo) => (
            <div key={campo.id} style={s.campoWrapper}>
              <label style={s.label}>
                {campo.label}
                {campo.obrigatorio && <span style={s.obrig}> *</span>}
              </label>

              {campo.tipo === "select" ? (
                <select
                  value={respostas[campo.id] || ""}
                  onChange={(e) => atualizar(campo.id, e.target.value)}
                  style={{ ...s.input, ...(erros[campo.id] ? s.inputErro : {}) }}
                >
                  <option value="">Selecione...</option>
                  {campo.opcoes.map((op) => (
                    <option key={op} value={op}>{op}</option>
                  ))}
                </select>
              ) : campo.tipo === "textarea" ? (
                <textarea
                  value={respostas[campo.id] || ""}
                  onChange={(e) => atualizar(campo.id, e.target.value)}
                  placeholder={campo.placeholder}
                  rows={4}
                  style={{ ...s.input, ...s.textarea, ...(erros[campo.id] ? s.inputErro : {}) }}
                />
              ) : campo.tipo === "cpf" ? (
                <input
                  type="text"
                  inputMode="numeric"
                  value={respostas[campo.id] || ""}
                  onChange={(e) => atualizar(campo.id, formatarCPF(e.target.value))}
                  placeholder={campo.placeholder}
                  maxLength={14}
                  style={{ ...s.input, ...(erros[campo.id] ? s.inputErro : {}) }}
                />
              ) : (
                <input
                  type={campo.tipo}
                  value={respostas[campo.id] || ""}
                  onChange={(e) => atualizar(campo.id, e.target.value)}
                  placeholder={campo.placeholder}
                  style={{ ...s.input, ...(erros[campo.id] ? s.inputErro : {}) }}
                />
              )}

              {erros[campo.id] && (
                <span style={s.erroMsg}>{erros[campo.id]}</span>
              )}
            </div>
          ))}

          {erroEnvio && <p style={s.erroEnvio}>{erroEnvio}</p>}

          <div style={s.botoes}>
            {etapaAtual > 0 && (
              <button onClick={voltar} style={s.btnVoltar}>
                ← Voltar
              </button>
            )}
            <button
              onClick={avancar}
              disabled={enviando}
              style={{ ...s.btnAvancar, ...(enviando ? s.btnDisabled : {}) }}
            >
              {enviando
                ? "Enviando..."
                : etapaAtual < totalEtapas - 1
                ? "Continuar →"
                : "Enviar questionário"}
            </button>
          </div>
        </div>

        <div style={s.passos}>
          {ETAPAS.map((et, i) => (
            <div
              key={et.id}
              style={{
                ...s.passo,
                ...(i === etapaAtual ? s.passoAtivo : {}),
                ...(i < etapaAtual ? s.passoConcluido : {}),
              }}
            >
              <div
                style={{
                  ...s.passoCirculo,
                  ...(i === etapaAtual ? s.passoCirculoAtivo : {}),
                  ...(i < etapaAtual ? s.passoCirculoConcluido : {}),
                }}
              >
                {i < etapaAtual ? "✓" : i + 1}
              </div>
              <span style={s.passoLabel}>{et.titulo}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icone, label, valor }) {
  return (
    <div style={si.infoItem}>
      <span style={si.infoIcone}>{icone}</span>
      <div>
        <div style={si.infoLabel}>{label}</div>
        <div style={si.infoValor}>{valor}</div>
      </div>
    </div>
  );
}

const si = {
  vagaHeader: { marginBottom: 24, paddingBottom: 20, borderBottom: `1.5px solid ${cor.border}` },
  vagaBadge: { display: "inline-block", fontSize: 11, fontWeight: 700, color: cor.green, background: cor.greenLight, padding: "4px 12px", borderRadius: 20, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12, fontFamily: "'Nunito', sans-serif" },
  vagaTitulo: { fontFamily: "'Nunito', sans-serif", fontSize: 28, fontWeight: 800, color: cor.text, marginBottom: 4 },
  vagaEmpresa: { fontSize: 14, color: cor.muted },
  infoGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 24 },
  infoItem: { display: "flex", alignItems: "flex-start", gap: 10, background: cor.blueLight, borderRadius: 10, padding: "12px 14px" },
  infoIcone: { fontSize: 18, marginTop: 1 },
  infoLabel: { fontSize: 11, color: cor.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, fontFamily: "'Nunito', sans-serif" },
  infoValor: { fontSize: 13, color: cor.text, fontWeight: 700, fontFamily: "'Nunito', sans-serif", marginTop: 2 },
  secao: { marginBottom: 24 },
  secaoTitulo: { fontSize: 13, fontWeight: 800, color: cor.blue, fontFamily: "'Nunito', sans-serif", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.8 },
  beneficiosGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 8 },
  beneficioItem: { fontSize: 13, color: cor.text, display: "flex", alignItems: "flex-start", gap: 6 },
  beneficioCheck: { color: cor.green, fontWeight: 800, flexShrink: 0 },
  lista: { paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 },
  prazoBanner: { display: "flex", alignItems: "center", gap: 14, background: `linear-gradient(135deg, ${cor.blue} 0%, #1558a0 100%)`, borderRadius: 12, padding: "16px 20px", marginBottom: 24, color: "#fff" },
  prazoIcone: { fontSize: 24, flexShrink: 0 },
  prazoLabel: { fontSize: 11, color: "rgba(255,255,255,0.75)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, fontFamily: "'Nunito', sans-serif" },
  prazoData: { fontSize: 16, fontWeight: 800, color: "#fff", fontFamily: "'Nunito', sans-serif", marginTop: 2 },
  lgpdBox: { background: "#f8fbfd", border: `1.5px solid ${cor.border}`, borderRadius: 12, padding: "20px", marginBottom: 24 },
  lgpdTitulo: { fontSize: 13, fontWeight: 800, color: cor.blue, fontFamily: "'Nunito', sans-serif", marginBottom: 10 },
  lgpdTexto: { fontSize: 13, color: cor.muted, lineHeight: 1.7, marginBottom: 14 },
  lgpdLabel: { display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: cor.text, cursor: "pointer", lineHeight: 1.5 },
  lgpdCheck: { marginTop: 2, accentColor: cor.blue, width: 16, height: 16, flexShrink: 0, cursor: "pointer" },
  lgpdErro: { fontSize: 12, color: cor.error, marginTop: 10, fontWeight: 500 },
};

const s = {
  page: { minHeight: "100vh", background: cor.bg, fontFamily: "'DM Sans', sans-serif", color: cor.text },
  header: { background: cor.blue, color: "#fff", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 16px rgba(27,111,171,0.25)" },
  headerInner: { maxWidth: 680, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 },
  vagaTag: { fontSize: 12, color: "rgba(255,255,255,0.75)", fontWeight: 500 },
  progressBar: { height: 4, background: "rgba(255,255,255,0.15)" },
  progressFill: { height: "100%", background: cor.green, transition: "width 0.4s ease", borderRadius: "0 2px 2px 0" },
  container: { maxWidth: 680, margin: "0 auto", padding: "32px 24px 80px" },
  etapaInfo: { marginBottom: 24 },
  etapaNum: { fontSize: 12, fontWeight: 700, color: cor.blue, textTransform: "uppercase", letterSpacing: 1.5, fontFamily: "'Nunito', sans-serif" },
  etapaTitulo: { fontFamily: "'Nunito', sans-serif", fontSize: 26, fontWeight: 800, color: cor.text, marginTop: 6, marginBottom: 8 },
  etapaDesc: { fontSize: 14, color: cor.muted, lineHeight: 1.6 },
  card: { background: cor.white, borderRadius: 16, padding: "32px", boxShadow: "0 4px 24px rgba(27,111,171,0.08)", border: `1px solid ${cor.border}` },
  campoWrapper: { marginBottom: 22 },
  label: { display: "block", fontSize: 14, fontWeight: 600, color: cor.text, marginBottom: 8, fontFamily: "'Nunito', sans-serif" },
  obrig: { color: cor.blue },
  input: { width: "100%", padding: "11px 14px", fontSize: 14, border: `1.5px solid ${cor.border}`, borderRadius: 8, background: "#f8fbfd", color: cor.text, fontFamily: "'DM Sans', sans-serif", transition: "border-color 0.2s, box-shadow 0.2s" },
  textarea: { resize: "vertical", minHeight: 96, lineHeight: 1.6 },
  inputErro: { borderColor: cor.error },
  erroMsg: { fontSize: 12, color: cor.error, marginTop: 4, display: "block" },
  erroEnvio: { fontSize: 13, color: cor.error, marginBottom: 16, textAlign: "center" },
  botoes: { display: "flex", gap: 12, marginTop: 32, justifyContent: "flex-end" },
  btnVoltar: { padding: "11px 24px", background: cor.blueLight, border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, color: cor.blue, cursor: "pointer", fontFamily: "'Nunito', sans-serif" },
  btnAvancar: { padding: "11px 28px", background: cor.blue, border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "'Nunito', sans-serif" },
  btnDisabled: { opacity: 0.6, cursor: "not-allowed" },
  passos: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 28, justifyContent: "center" },
  passo: { display: "flex", alignItems: "center", gap: 6, opacity: 0.35 },
  passoAtivo: { opacity: 1 },
  passoConcluido: { opacity: 0.65 },
  passoCirculo: { width: 26, height: 26, borderRadius: "50%", background: cor.border, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: cor.muted, flexShrink: 0, fontFamily: "'Nunito', sans-serif" },
  passoCirculoAtivo: { background: cor.blue, color: "#fff" },
  passoCirculoConcluido: { background: cor.green, color: "#fff" },
  passoLabel: { fontSize: 12, color: cor.muted, whiteSpace: "nowrap" },
  successWrap: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: cor.bg },
  successCard: { background: cor.white, borderRadius: 20, padding: "52px 40px", maxWidth: 480, width: "100%", textAlign: "center", boxShadow: "0 8px 40px rgba(27,111,171,0.12)", border: `1px solid ${cor.border}` },
  successIcon: { width: 64, height: 64, borderRadius: "50%", background: cor.green, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 800, color: "#fff", margin: "24px auto 20px", fontFamily: "'Nunito', sans-serif" },
  successTitulo: { fontFamily: "'Nunito', sans-serif", fontSize: 24, fontWeight: 800, color: cor.text, marginBottom: 14 },
  successTexto: { fontSize: 14, color: cor.muted, lineHeight: 1.7, marginBottom: 20 },
  successSlogan: { fontSize: 11, color: cor.blue, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, fontFamily: "'Nunito', sans-serif" },
};
