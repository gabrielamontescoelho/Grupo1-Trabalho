import { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";
import FormAlien from "../components/FormAlien";

const url = "/aliens";

function Aliens() {

  const { nomeUsuario } = useAuth();
  const [aliens, setAliens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState("");

  const [modalAberto, setModalAberto] = useState(false);
  const [modeEdit, setModeEdit] = useState(false);
  const [formAlien, setFormAlien] = useState({
    nome: "",
    especie: "",
    planeta: "",
    periculosidade: 1,
    descricao: ""
  });

  useEffect(() => {
    buscarAliensComAxios();
  }, []);

  async function buscarAliensComAxios() {
    try {
      setLoading(true);
      const resposta = await api.get(url);
      setAliens(resposta.data);
    } catch (error) {
      console.error("Erro ao buscar aliens:", error);
      setMensagem(">>> FALHA DE COMUNICAÇÃO COM A BASE DE DADOS.");
    } finally {
      setLoading(false);
    }
  }

  async function salvarAlien(event) {
    event.preventDefault();
    setMensagem("");

    try {
      if (modeEdit) {
        const resposta = await api.put(`${url}/${formAlien.id}`, formAlien);
        setAliens((listaAtual) =>
          listaAtual.map((alien) => alien.id === formAlien.id ? resposta.data : alien)
        );
        setMensagem(">>> ASSINATURA BIOLÓGICA ATUALIZADA COM SUCESSO.");
      } else {
        const resposta = await api.post(url, formAlien);
        setAliens((listaAtual) => [...listaAtual, resposta.data]);
        setMensagem(">>> NOVA AMEAÇA REGISTRADA NO RADAR.");
      }
      fecharModal();
    } catch (error) {
      console.error("Erro ao salvar alien:", error);
      setMensagem(">>> ERRO CRÍTICO: DADOS RECUSADOS PELO SERVIDOR.");
    }
  }

  async function deletarAlien(id) {
    const confirmar = window.confirm("ATENÇÃO: Deseja realmente expurgar este registro do banco de dados?");
    if (!confirmar) return;

    try {
      setMensagem("");
      await api.delete(`${url}/${id}`);
      setAliens((listaAtual) => listaAtual.filter((alien) => alien.id !== id));
      setMensagem(">>> REGISTRO EXPURGADO COM SUCESSO.");
    } catch (error) {
      console.error("Erro ao excluir alien:", error);
      setMensagem(">>> ERRO: FALHA AO TENTAR EXPURGAR O REGISTRO.");
    }
  }

  function abrirModalCadastro() {
    setModeEdit(false);
    limparFormulario();
    setModalAberto(true);
  }

  function abrirModalEdicao(alien) {
    setModeEdit(true);
    setFormAlien(alien); // Preenche o formulário com os dados do alien selecionado
    setModalAberto(true);
  }

  function limparFormulario() {
    setFormAlien({
      nome: "",
      especie: "",
      planeta: "",
      periculosidade: 1,
      descricao: ""
    });
  }

  function fecharModal() {
    setModalAberto(false);
    limparFormulario();
  }

  const formatarDado = (dado, fallback) => {
    return dado === 'string' || !dado ? fallback : dado;
  };

  return (
    <div className="radar-panel">

      {/* CABEÇALHO DO MÓDULO */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
        <div>
          <h2 className="terminal-title" style={{ marginBottom: '0.2rem' }}>// RADAR DE AMEAÇAS EXTRATERRESTRES</h2>
          {nomeUsuario && <p style={{ color: 'var(--neon-green)', fontSize: '0.9rem' }}>OPERADOR ATIVO: {nomeUsuario}</p>}
        </div>

        <button
          onClick={abrirModalCadastro}
          className="cyber-button"
          style={{ width: 'auto', padding: '0.6rem 1.5rem', marginTop: 0 }}
        >
          [ + REGISTRAR ANOMALIA ]
        </button>
      </header>

      {mensagem && (
        <p style={{
          marginBottom: '1.5rem',
          padding: '1rem',
          backgroundColor: mensagem.includes('ERRO') ? 'var(--alert-red-dim)' : 'rgba(57, 255, 20, 0.1)',
          border: `1px solid ${mensagem.includes('ERRO') ? 'var(--alert-red)' : 'var(--neon-green)'}`,
          color: mensagem.includes('ERRO') ? 'var(--alert-red)' : 'var(--neon-green)',
          borderRadius: '4px',
          fontWeight: 'bold'
        }}>
          {mensagem}
        </p>
      )}

      {loading ? (
        <div className="feedback">--==^^**** VARRENDO SETORES DA GALÁXIA...</div>
      ) : aliens.length === 0 ? (
        <div className="feedback-empty">SINAL ESTÁVEL: NENHUM ORGANISMO NO PERÍMETRO.</div>
      ) : (
        <div className="table-wrapper">
          <table className="cyber-table">
            <thead>
              <tr>
                <th>CÓDIGO ID</th>
                <th>ASSINATURA / NOME</th>
                <th>CLASSIFICAÇÃO BIOLÓGICA</th>
                <th>PERICULOSIDADE</th>
                <th style={{ textAlign: 'center' }}>AÇÕES TÁTICAS</th>
              </tr>
            </thead>
            <tbody>
              {aliens.map((alien) => (
                <tr key={alien.id}>
                  <td className="tech-id">#{alien.id}</td>
                  <td className="tech-name">
                    {formatarDado(alien?.nome, 'NOME DESCONHECIDO')}
                    <span style={{ display: "block", fontSize: "0.75rem", color: "var(--terminal-gray)" }}>
                      Planeta: {formatarDado(alien?.planeta, 'NÃO IDENTIFICADO')}
                    </span>
                  </td>
                  <td>{formatarDado(alien?.especie, 'ESPÉCIE NÃO CATALOGADA')}</td>
                  <td>
                    <span className={`badge-perigo ${alien.periculosidade >= 7 ? 'alerta-maximo' : ''}`}>
                      NÍVEL {alien?.periculosidade || '1'}
                    </span>
                  </td>
                  <td style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                    <button
                      onClick={() => abrirModalEdicao(alien)}
                      style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', width: 'auto', marginTop: 0, borderColor: 'var(--neon-cyan)', color: 'var(--neon-cyan)' }}
                    >
                      [ EDITAR ]
                    </button>
                    <button
                      onClick={() => deletarAlien(alien.id)}
                      style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', width: 'auto', marginTop: 0, borderColor: 'var(--alert-red)', color: 'var(--alert-red)' }}
                    >
                      [ EXCLUIR ]
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalAberto && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999
        }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '600px', padding: '1rem' }}>

            {/* Botão de Fechar o Modal */}
            <button
              onClick={fecharModal}
              style={{
                position: 'absolute', top: '2rem', right: '2rem', width: 'auto',
                padding: '0.5rem', background: 'transparent', border: 'none',
                color: 'var(--alert-red)', fontSize: '1.2rem', zIndex: 10
              }}
            >
              [ X ]
            </button>

            {/* Injeção do Formulário */}
            <FormAlien
              modeEdit={modeEdit}
              cadastrarAlien={salvarAlien} /* Agora o FormAlien usa a função unificada de salvar */
              formAlien={formAlien}
              setFormAlien={setFormAlien}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Aliens;