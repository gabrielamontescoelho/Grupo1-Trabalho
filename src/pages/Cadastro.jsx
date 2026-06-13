import { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../services/api";

function Cadastro() {
    const navigate = useNavigate();

    // Estado unificado para manter o formulário limpo
    const [formCadastro, setFormCadastro] = useState({
        nome: "",
        email: "",
        senha: "",
    });

    const [carregando, setCarregando] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState("");

    // Função centralizada para lidar com a digitação em qualquer input
    function atualizarCampo(event) {
        const { name, value } = event.target;
        setFormCadastro((formAtual) => ({
            ...formAtual,
            [name]: value,
        }));
    }

    // Função para envio dos dados de registro
    async function cadastrarUsuario(event) {
        event.preventDefault();
        setMensagem("");
        setErro("");

        try {
            setCarregando(true);

            // Envia os dados para a rota de usuários da API do Serratec
            await api.post("/usuarios", formCadastro);

            // Feedback de sucesso com a temática do painel
            setMensagem(">>> CREDENCIAIS REGISTRADAS. REDIRECIONANDO PARA AUTENTICAÇÃO...");

            // Redireciona para o login após 1.5 segundos para o usuário ler a mensagem
            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            setErro(">>> ERRO: FALHA AO ESTABELECER REGISTRO NO BANCO DE DADOS.");
        } finally {
            // Nota: não voltamos o carregando para 'false' imediatamente se houver sucesso, 
            // para evitar que o botão pisque e fique clicável de novo antes do redirecionamento.
            if (erro) {
                setCarregando(false);
            }
        }
    }

    return (
        /* O container reaproveita o efeito de vidro */
        <div className="cyber-form-container" style={{ maxWidth: '450px', marginTop: '2rem' }}>
            <h2 className="terminal-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        // NOVO REGISTRO OPERACIONAL
            </h2>

            <form onSubmit={cadastrarUsuario}>
                <label>
                    Identificação (Nome de Operador)
                    <input
                        autoComplete="name"
                        minLength={2}
                        name="nome"
                        onChange={atualizarCampo}
                        placeholder="Ex: Agente J. Smith"
                        required
                        type="text"
                        value={formCadastro.nome}
                    />
                </label>

                <label>
                    E-mail Operacional
                    <input
                        autoComplete="email"
                        name="email"
                        onChange={atualizarCampo}
                        placeholder="operador@central.com"
                        required
                        type="email"
                        value={formCadastro.email}
                    />
                </label>

                <label>
                    Senha de Segurança
                    <input
                        autoComplete="new-password"
                        minLength={6}
                        name="senha"
                        onChange={atualizarCampo}
                        placeholder="Mínimo de 6 caracteres"
                        required
                        type="password"
                        value={formCadastro.senha}
                    />
                </label>

                {/* Feedback visual de Sucesso (Verde Neon) */}
                {mensagem && (
                    <div style={{
                        padding: '1rem',
                        marginTop: '1rem',
                        marginBottom: '1rem',
                        backgroundColor: 'rgba(57, 255, 20, 0.1)',
                        border: '1px solid var(--neon-green)',
                        color: 'var(--neon-green)',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        fontSize: '0.85rem'
                    }}>
                        {mensagem}
                    </div>
                )}

                {/* Feedback visual de Erro (Vermelho Alerta) */}
                {erro && (
                    <div className="feedback-error" style={{ padding: '1rem', marginTop: '1rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
                        {erro}
                    </div>
                )}

                <button type="submit" disabled={carregando} style={{ marginTop: '1.5rem' }}>
                    {carregando ? "PROCESSANDO DADOS..." : "CADASTRAR CREDENCIAIS"}
                </button>

                {/* Link para retornar à tela de Login */}
                <div style={{
                    marginTop: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <span style={{ color: 'var(--terminal-gray)', fontSize: '0.9rem' }}>
                        Já possui autorização?
                    </span>
                    <Link
                        to="/login"
                        style={{
                            color: 'var(--neon-cyan)',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            letterSpacing: '1px',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        [ INICIAR SESSÃO ]
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Cadastro;