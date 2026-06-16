import { Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";

function Home() {

  const { estaAutenticado } = useAuth();

  return (
    <section className="home-panel" style={{ animation: "fadeIn 0.6s ease-out" }}>

      {/* 1. STATUS OPERACIONAL DA CENTRAL */}
      <div
        className="system-status-bar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(0, 240, 255, 0.05)",
          border: "1px solid var(--neon-cyan-dim)",
          padding: "0.75rem 1.5rem",
          borderRadius: "4px",
          marginBottom: "2.5rem",
          fontSize: "0.85rem"
        }}
      >
        <span style={{ color: "var(--neon-green)" }}>● CORE DO SISTEMA: OPERACIONAL</span>
        <span style={{ color: "var(--neon-cyan)" }}>FREQUÊNCIA: 433.92 MHz</span>
        <span style={{ color: "var(--terminal-gray)" }}>AUTENTICAÇÃO: {estaAutenticado ? "AUTENTICADO NÍVEL ALTO" : "RESTRITA"}</span>
      </div>

      {/* 2. BOAS-VINDAS E INTRODUÇÃO */}
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <h2 className="terminal-title" style={{ fontSize: "2.2rem", marginBottom: "1rem", color: "#ffffff" }}>
          // GESTÃO INTERGALÁCTICA SERRATEC
        </h2>
        <p style={{ color: "var(--terminal-gray)", maxWidth: "750px", margin: "0 auto", fontSize: "1.05rem", lineHeight: "1.7" }}>
          Bem-vindo ao terminal central de monitoramento. Esta plataforma de inteligência quântica foi projetada para catalogar ameaças espaciais, registrar avistamentos atmosféricos e mapear a geologia de planetas habitáveis na órbita externa.
        </p>
      </div>

      {/* 3. GRID DE MÓDULOS (CARDS INTERATIVOS) */}
      <div
        className="modules-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          marginBottom: "4rem"
        }}
      >
        {/* CARD 1: ALIENS */}
        <div className="table-wrapper" style={{ padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "between" }}>
          <h3 style={{ color: "var(--neon-cyan)", marginBottom: "0.5rem" }}>01. RADAR BIOLÓGICO</h3>
          <p style={{ color: "var(--terminal-gray)", fontSize: "0.9rem", marginBottom: "1.5rem", flexGrow: 1 }}>
            Identifique assinaturas de espécimes alienígenas interceptados, gerencie níveis de periculosidade de organismos e faça novos registros de catalogação de ameaças.
          </p>
          <Link to="/aliens" className="cyber-button" style={{ textDecoration: "none", textAlign: "center", display: "block" }}>
            {estaAutenticado ? "[ ABRIR RADAR ]" : "[ RESTRITO ]"}
          </Link>
        </div>

        {/* CARD 2: PLANETAS */}
        <div className="table-wrapper" style={{ padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "between" }}>
          <h3 style={{ color: "var(--neon-cyan)", marginBottom: "0.5rem" }}>02. CARTOGRAFIA ESTELAR</h3>
          <p style={{ color: "var(--terminal-gray)", fontSize: "0.9rem", marginBottom: "1.5rem", flexGrow: 1 }}>
            Mapeie coordenadas de planetas, verifique o clima de novos ecossistemas e gerencie o índice de habitabilidade de novos corpos celestes para futuras expedições.
          </p>
          <Link to="/planetas" className="cyber-button" style={{ textDecoration: "none", textAlign: "center", display: "block" }}>
            {estaAutenticado ? "[ VER PLANETAS ]" : "[ RESTRITO ]"}
          </Link>
        </div>

        {/* CARD 3: AVISTAMENTOS */}
        <div className="table-wrapper" style={{ padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "between" }}>
          <h3 style={{ color: "var(--neon-cyan)", marginBottom: "0.5rem" }}>03. ANOMALIAS ATMOSFÉRICAS</h3>
          <p style={{ color: "var(--terminal-gray)", fontSize: "0.9rem", marginBottom: "1.5rem", flexGrow: 1 }}>
            Consulte os feeds de relatórios técnicos de avistamentos ufológicos civis e militares ocorridos em solo com escala analítica de choque e pânico.
          </p>
          <Link to="/avistamentos" className="cyber-button" style={{ textDecoration: "none", textAlign: "center", display: "block" }}>
            {estaAutenticado ? "[ FEEDS ATIVOS ]" : "[ RESTRITO ]"}
          </Link>
        </div>
      </div>

      {/* 4. DIRETRIZES TÉCNICAS E SEGURANÇA */}
      {!estaAutenticado && (
        <div
          className="feedback-error"
          style={{
            textAlign: "left",
            background: "rgba(255, 0, 85, 0.05)",
            border: "1px dashed var(--alert-red)",
            padding: "2rem",
            borderRadius: "8px"
          }}
        >
          <h4 style={{ color: "var(--alert-red)", marginBottom: "0.5rem", fontWeight: "bold" }}>
            ⚠️ PROTOCOLO DE SEGURANÇA DETECTADO
          </h4>
          <p style={{ fontSize: "0.9rem", color: "var(--text-light)" }}>
            A maior parte dos dados do radar exige criptografia de segurança nível alto. Use o menu superior ou clique abaixo para inserir seu e-mail operacional e liberar o banco de dados.
          </p>
          <Link
            to="/login"
            style={{
              display: "inline-block",
              marginTop: "1rem",
              color: "var(--neon-cyan)",
              fontWeight: "bold",
              textDecoration: "none"
            }}
          >
            &gt;&gt;&gt; IR PARA A TELA DE AUTENTICAÇÃO / LOGIN
          </Link>
        </div>
      )}
    </section>
  );
}

export default Home;
