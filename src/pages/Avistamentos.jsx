import { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";
import FormAvistamento from "../components/FormAvistamento";

const url = "/avistamentos";

function Avistamentos() {

  const { nomeUsuario } = useAuth();
  const [avistamentos, setAvistamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState("");

  const [modalAberto, setModalAberto] = useState(false);
  const [modeEdit, setModeEdit] = useState(false);
  const [formAvistamento, setFormAvistamento] = useState({
    titulo: "",
    local: "",
    descricao: "",
    data: "",
    nivelMedo: 1
  });

  useEffect(() => {
    buscarAvistamentos();
  }, []);

  async function buscarAvistamentos() {
    try {
      setLoading(true);
      const resposta = await api.get(url);
      setAvistamentos(resposta.data);
    } catch (error) {
      console.error("Erro ao buscar avistamentos:", error);
      setMensagem(">>> FALHA DE COMUNICAÇÃO COM A BASE DE DADOS.");
    } finally {
      setLoading(false);
    }
  }

  async function salvarAvistamento(event) {
    event.preventDefault();
    setMensagem("");

    try {
      if (modeEdit) {
        const resposta = await api.put(`${url}/${formAvistamento.id}`, formAvistamento);
        setAvistamentos((listaAtual) =>
          listaAtual.map((item) => item.id === formAvistamento.id ? resposta.data : item)
        );
        setMensagem(">>> REGISTRO DE AVISTAMENTO ATUALIZADO COM SUCESSO.");
      } else {
        const resposta = await api.post(url, formAvistamento);
        setAvistamentos((listaAtual) => [...listaAtual, resposta.data]);
        setMensagem(">>> NOVO AVISTAMENTO REGISTRADO NO RADAR.");
      }
      fecharModal();
    } catch (error) {
      console.error("Erro ao salvar avistamento:", error);
      setMensagem(">>> ERRO CRÍTICO: DADOS RECUSADOS PELO SERVIDOR.");
    }
  }

  async function deletarAvistamento(id) {
    const confirmar = window.confirm("ATENÇÃO: Deseja realmente expurgar este registro do banco de dados?");
    if (!confirmar) return;

    try {
      setMensagem("");
      await api.delete(`${url}/${id}`);
      setAvistamentos((listaAtual) => listaAtual.filter((item) => item.id !== id));
      setMensagem(">>> REGISTRO EXPURGADO COM SUCESSO.");
    } catch (error) {
      console.error("Erro ao excluir avistamento:", error);
      setMensagem(">>> ERRO: FALHA AO TENTAR EXPURGAR O REGISTRO.");
    }
  }

  function abrirModalCadastro() {
    setModeEdit(false);
    limparFormulario();
    setModalAberto(true);
  }

  function abrirModalEdicao(avistamento) {
    setModeEdit(true);
    setFormAvistamento(avistamento); 
    setModalAberto(true);
  }

  function limparFormulario() {
    setFormAvistamento({
      titulo: "",
      local: "",
      descricao: "",
      data: "",
      nivelMedo: 1
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
          <h2 className="terminal-title" style={{ marginBottom: '0.2rem' }}>// RADAR DE AVISTAMENTOS</h2>
          {nomeUsuario && <p style={{ color: 'var(--neon-green)', fontSize: '0.9rem' }}>OPERADOR ATIVO: {nomeUsuario}</p>}
        </div>

        <button
          onClick={abrirModalCadastro}
          className="cyber-button"
          style={{ width: 'auto', padding: '0.6rem 1.5rem', marginTop: 0 }}
        >
          [ + REPORTAR AVISTAMENTO ]
        </button>
      </header>

      {mensagem && (
        <p style={{
          marginBottom: '1.5rem',
          padding: '1rem',
          backgroundColor: mensagem.includes('ERRO') || mensagem.includes('FALHA') ? 'var(--alert-red-dim)' : 'rgba(57, 255, 20, 0.1)',
          border: `1px solid ${mensagem.includes('ERRO') || mensagem.includes('FALHA') ? 'var(--alert-red)' : 'var(--neon-green)'}`,
          color: mensagem.includes('ERRO') || mensagem.includes('FALHA') ? 'var(--alert-red)' : 'var(--neon-green)',
          borderRadius: '4px',
          fontWeight: 'bold'
        }}>
          {mensagem}
        </p>
      )}

      {loading ? (
        <div className="feedback">--==^^**** VARRENDO SETORES TERRESTRES...</div>
      ) : avistamentos.length === 0 ? (
        <div className="feedback-empty">SINAL ESTÁVEL: NENHUM AVISTAMENTO NO PERÍMETRO.</div>
      ) : (
        <div className="table-wrapper">
          <table className="cyber-table">
            <thead>
              <tr>
                <th>CÓDIGO ID</th>
                <th>TÍTULO / LOCAL</th>
                <th>DESCRIÇÃO</th>
                <th>DATA / NÍVEL DE MEDO</th>
                <th style={{ textAlign: 'center' }}>AÇÕES TÁTICAS</th>
              </tr>
            </thead>
            <tbody>
              {avistamentos.map((avistamento) => (
                <tr key={avistamento.id}>
                  <td className="tech-id">#{avistamento.id}</td>
                  <td className="tech-name">
                    {formatarDado(avistamento?.titulo, 'TÍTULO DESCONHECIDO')}
                    <span style={{ display: "block", fontSize: "0.75rem", color: "var(--terminal-gray)" }}>
                      Local: {formatarDado(avistamento?.local, 'NÃO IDENTIFICADO')}
                    </span>
                  </td>
                  <td>{formatarDado(avistamento?.descricao, 'SEM DADOS ADICIONAIS')}</td>
                  <td>
                    {formatarDado(avistamento?.data, 'DATA DESCONHECIDA')}
                    <span className={`badge-perigo ${avistamento.nivelMedo >= 7 ? 'alerta-maximo' : ''}`} style={{ display: 'block', marginTop: '5px', width: 'fit-content' }}>
                      MEDO: {avistamento?.nivelMedo || '1'}
                    </span>
                  </td>
                  <td style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                    <button
                      onClick={() => abrirModalEdicao(avistamento)}
                      style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', width: 'auto', marginTop: 0, borderColor: 'var(--neon-cyan)', color: 'var(--neon-cyan)', background: 'transparent' }}
                    >
                      [ EDITAR ]
                    </button>
                    <button
                      onClick={() => deletarAvistamento(avistamento.id)}
                      style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', width: 'auto', marginTop: 0, borderColor: 'var(--alert-red)', color: 'var(--alert-red)', background: 'transparent' }}
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

            <button
              onClick={fecharModal}
              style={{
                position: 'absolute', top: '2rem', right: '2rem', width: 'auto',
                padding: '0.5rem', background: 'transparent', border: 'none',
                color: 'var(--alert-red)', fontSize: '1.2rem', zIndex: 10, cursor: 'pointer'
              }}
            >
              [ X ]
            </button>

            <FormAvistamento
              modeEdit={modeEdit}
              cadastrarAvistamento={salvarAvistamento} 
              formAvistamento={formAvistamento}
              setFormAvistamento={setFormAvistamento}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Avistamentos;