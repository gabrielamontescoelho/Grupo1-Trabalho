import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [formLogin, setFormLogin] = useState({
        email: "",
        senha: "",
    });

    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");

    // Função única que gerencia qualquer alteração nos inputs
    function atualizarCampo(event) {
        const { name, value } = event.target;
        setFormLogin((formAtual) => ({
            ...formAtual,
            [name]: value,
        }));
    }

    // Função que envia os dados para o contexto processar
    async function enviarLogin(event) {
        event.preventDefault();
        setErro(""); // Limpa o erro antes de tentar novamente

        try {
            setLoading(true);
            // O Contexto agora faz o trabalho pesado de bater na API e salvar o Token
            await login(formLogin);

            // Se passar, redireciona o usuário para o Radar
            navigate("/aliens");
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            // Mantendo o estilo tático/alerta para o erro
            setErro("ACESSO NEGADO: Credenciais inválidas ou operador não registrado.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="cyber-form-container" style={{ maxWidth: '450px', marginTop: '2rem' }}>
            <h2 className="terminal-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        // CREDENCIAIS DE ACESSO
            </h2>

            <form onSubmit={enviarLogin}>
                <label>
                    E-mail Operacional
                    <input
                        autoComplete="email"
                        name="email"
                        type="email"
                        placeholder="operador@central.com"
                        value={formLogin.email}
                        onChange={atualizarCampo}
                        required
                    />
                </label>

                <label>
                    Senha de Segurança
                    <input
                        autoComplete="current-password"
                        name="senha"
                        type="password"
                        placeholder="••••••••"
                        value={formLogin.senha}
                        onChange={atualizarCampo}
                        required
                    />
                </label>

                {erro && (
                    <div className="feedback-error" style={{ padding: '1rem', marginTop: '1rem', marginBottom: '1rem' }}>
                        {erro}
                    </div>
                )}

                <button type="submit" disabled={loading} style={{ marginTop: '1.5rem' }}>
                    {loading ? "AUTENTICANDO..." : "INICIAR SESSÃO"}
                </button>

                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <span style={{ color: 'var(--terminal-gray)', fontSize: '0.9rem' }}>Ainda não tem autorização? </span>
                    <Link
                        to="/cadastro"
                        style={{
                            color: 'var(--neon-cyan)',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            letterSpacing: '1px',
                            marginLeft: '0.5rem'
                        }}
                    >
                        [ SOLICITAR REGISTRO ]
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;