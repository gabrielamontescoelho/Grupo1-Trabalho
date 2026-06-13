import { Navigate, Route, Routes } from "react-router";
import Aliens from "./pages/Aliens";
import Avistamentos from "./pages/Avistamentos"; 
import Home from "./pages/Home";
import Login from "./pages/Login";
import Planetas from "./pages/Planetas";
import { useAuth } from "./contexts/AuthContext";
import Cadastro from "./pages/Cadastro";

function RotaPrivada({ children }) {
  const { carregandoToken, estaAutenticado } = useAuth();

  if (carregandoToken) {
    return <p>Carregando...</p>;
  }

  if (!estaAutenticado) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      {/* removido /cadastro pois não está no TCC */}

      <Route
        path="/home"
        element={
          <RotaPrivada>
            <Home />
          </RotaPrivada>
        }
      />
      <Route
        path="/avistamentos"
        element={
          <RotaPrivada>
            <Avistamentos />
          </RotaPrivada>
        }
      />
      <Route
        path="/aliens"
        element={
          <RotaPrivada>
            <Aliens />
          </RotaPrivada>
        }
      />
      <Route
        path="/planetas"
        element={
          <RotaPrivada>
            <Planetas />
          </RotaPrivada>
        }
      />
      <Route path="*" element={<h1>404 - Página Não Encontrada</h1>} />
    </Routes>
  );
}

export default AppRouter;