import { Link, useNavigate, useLocation } from "react-router";
import { useAuth } from "./contexts/AuthContext";
import AppRouter from "./router";
import './style.css';

function App() {

  const navigate = useNavigate();
  const location = useLocation();

  const { estaAutenticado, logout } = useAuth();

  const isActive = (path) => location.pathname === path ? 'active-link' : '';

  // Função para deslogar do sistema
  async function sair() {
    await logout();
    navigate("/login");
  }

  return (
    <div className="container">
      {/* CABEÇALHO GLOBAL:
        Fica fixo no topo. O usuário sempre vai ver o título e o menu.
      */}
      <header>
        <h1>SISTEMA DE MONITORAMENTO EXTRATERRESTRE</h1>
        <p className="text-secondary">Radar tático de contenção e análise biológica da órbita.</p>

        {/* Menu de Navegação Tático */}
        <nav className="cyber-nav" style={{ marginTop: '2rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>

          <Link to="/" className={`nav-link ${isActive('/')}`}>[ INÍCIO ]</Link>

          {/* ÁREA RESTRITA: Só renderiza os links se o usuário estiver logado */}
          {estaAutenticado && (
            <>
              <Link to="/planetas" className={`nav-link ${isActive('/planetas')}`}>[ CARTOGRAFIA ]</Link>
              <Link to="/aliens" className={`nav-link ${isActive('/aliens')}`}>[ ALIENS ]</Link>
              <Link to="/avistamentos" className={`nav-link ${isActive('/avistamentos')}`}>[ AVISTAMENTOS ]</Link>
            </>
          )}

          {/* CONTROLE DE SESSÃO: Alterna entre os botões de Login/Cadastro e o botão de Sair */}
          {estaAutenticado ? (
            <button
              type="button"
              onClick={sair}
              className="nav-link"
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--alert-red)',
                fontWeight: 'bold'
              }}
            >
              [ DESCONECTAR ]
            </button>
          ) : (
            <>
              <Link to="/login" className={`nav-link ${isActive('/login')}`}>[ LOGIN ]</Link>
              <Link to="/cadastro" className={`nav-link ${isActive('/cadastro')}`}>[ NOVO REGISTRO ]</Link>
            </>
          )}
        </nav>
      </header>

      {/* ÁREA DINÂMICA (O miolo da aplicação):
        O AppRouter renderiza a página correspondente à rota atual da URL.
      */}
      <main style={{ marginTop: '2.5rem' }}>
        <AppRouter />
      </main>
    </div>
  );
}

export default App;