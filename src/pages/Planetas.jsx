import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";
import FormPlaneta from "../components/FormPlaneta";

const url = "/planetas";

function Planetas() {
    
<<<<<<< HEAD
    const { nomeUsuario } = useAuth();
    const [planetas, setPlanetas] = useState([]);
    const [loading, setLoading] = useState(true);
=======
    const [planeta, setPlanetas] = useState([]);
    const [loading, setLoading] = useState(false);
>>>>>>> e7df8004502fd2bc1470cc8da3936a4f7abe65e4
    const [mensagem, setMensagem] = useState("");
    const [modalAberto, setModalAberto] = useState(false);
    const [modeEdit, setModeEdit] = useState(false);
    const [formPlaneta, setFormPlaneta] = useState({
        nome: "",
        galaxia: "",
        clima: "",
        habitavel: true,
        descricao: ""
    });


    async function buscarPlanetasComAxios() {
        try {
            setLoading(true);
            const resposta = await axios.get(url);
            setPlanetas(resposta.data);
        } catch (error) {
            console.error("Erro ao buscar aliens com axios:", error);
        } finally {
            setLoading(false);
        }
    }

    async function cadastrarPlanetas(event) {
    event.preventDefault();
    setMensagem("");

    try {
        const resposta = await axios.post(url, formPlaneta);
        setPlanetas((listaAtual) => [...listaAtual, resposta.data]);
        setFormPlaneta({
            nome: "",
            galaxia: "",
            clima: "",
            habitavel: false,
            descricao:""
        });
        setMensagem("Planeta cadastrado com sucesso!");
    } catch (error) {
        console.error("Erro ao cadastrar planeta:", error);
        setMensagem("Erro ao cadastrar planeta.");
    }
    }

<<<<<<< HEAD
    async function salvarPlaneta(event) {
    event.preventDefault();
    setMensagem("");

    try {
      if (modeEdit) {
        const resposta = await api.put(`${url}/${formPlaneta.id}`, formPlaneta);
        setPlanetas((listaAtual) =>
          listaAtual.map((planeta) => planeta.id === formPlaneta.id ? resposta.data : planeta)
        );
        setMensagem(">>> PLANETA ATUALIZADO COM SUCESSO.");
      } else {
        const resposta = await api.post(url, formPlaneta);
        setPlanetas((listaAtual) => [...listaAtual, resposta.data]);
        setMensagem(">>> NOVA AMEAÇA REGISTRADA NO RADAR.");
      }
      fecharModal();
    } catch (error) {
      console.error("Erro ao salvar planeta:", error);
      setMensagem(">>> ERRO CRÍTICO: DADOS RECUSADOS PELO SERVIDOR.");
    }
  }
  
  async function deletarPlaneta(id) {
    const confirmar = window.confirm("ATENÇÃO: Deseja realmente expurgar este registro do banco de dados?");
    if (!confirmar) return;

    try {
      setMensagem("");
      await api.delete(`${url}/${id}`);
      setPlanetas((listaAtual) => listaAtual.filter((planeta) => planeta.id !== id));
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


=======
    async function deletarPlaneta(id) {
        const confirmar = window.confirm("ATENÇÃO: Deseja realmente expurgar este registro do banco de dados?");
        if(!confirmar) return;
        
        try {
        setMensagem("");
        await api.delete(`${url}/${id}`);
        setPlanetas((listaAtual) => listaAtual.filter((planeta) => planeta.id !== id));
        setMensagem(">>> REGISTRO EXPURGADO COM SUCESSO.");
        } catch (error) {
        console.error("Erro ao excluir planeta:", error);
        setMensagem(">>> ERRO: FALHA AO TENTAR EXPURGAR O REGISTRO.");
        }
  }

    function abrirModalCadastro() {
        setModeEdit(false);
        limparFormulario();
        setModalAberto(true);
    }

    function abrirModalEdicao(planeta) {
        setModeEdit(true);
        setFormAvistamento(planeta);
        setModalAberto(true);
    }

    function limparFormulario() {
        setFormPlaneta({
        titulo: "",
        local: "",
        descricao: "",
        data: "",
        nivelMedo: 1,
        });
    }

    function fecharModal() {
        setModalAberto(false);
        limparFormulario();
        setModeEdit(false);
    }

    const formatarDado = (dado, fallback) => {
        return dado === "string" || !dado ? fallback : dado;
    };
>>>>>>> e7df8004502fd2bc1470cc8da3936a4f7abe65e4

    useEffect(() => {
        buscarPlanetasComAxios();
    }, []);

    useEffect(() => {
        console.log("Estado Planetas atualizado:", planetas);
    }, [planetas]);


    return (
    <div className="radar-panel">

      {/* CABEÇALHO DO MÓDULO */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
        <div>
          <h2 className="terminal-title" style={{ marginBottom: '0.2rem' }}>// RADAR DE PLANETAS</h2>
          {nomeUsuario && <p style={{ color: 'var(--neon-green)', fontSize: '0.9rem' }}>OPERADOR ATIVO: {nomeUsuario}</p>}
        </div>

        <button
          onClick={abrirModalCadastro}
          className="cyber-button"
          style={{ width: 'auto', padding: '0.6rem 1.5rem', marginTop: 0 }}
        >
          [ + REGISTRAR PLANETA ]
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
      ) : planetas.length === 0 ? (
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
              {planetas.map((planeta) => (
                <tr key={planeta.id}>
                  <td className="tech-id">#{planeta.id}</td>
                  <td className="tech-name">
                    {formatarDado(planeta?.nome, 'NOME DESCONHECIDO')}
                    <span style={{ display: "block", fontSize: "0.75rem", color: "var(--terminal-gray)" }}>
                      Planeta: {formatarDado(planeta?.planeta, 'NÃO IDENTIFICADO')}
                    </span>
                  </td>
                  <td>{formatarDado(planeta?.especie, 'ESPÉCIE NÃO CATALOGADA')}</td>
                  <td>
                    <span className={`badge-perigo ${planeta.periculosidade >= 7 ? 'alerta-maximo' : ''}`}>
                      NÍVEL {planeta?.periculosidade || '1'}
                    </span>
                  </td>
                  <td style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                    <button
                      onClick={() => abrirModalEdicao(planeta)}
                      style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', width: 'auto', marginTop: 0, borderColor: 'var(--neon-cyan)', color: 'var(--neon-cyan)' }}
                    >
                      [ EDITAR ]
                    </button>
                    <button
                      onClick={() => deletarAlien(planeta.id)}
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
              cadastrarPlanetas={salvarPlaneta} /* Agora o FormAlien usa a função unificada de salvar */
              formPlaneta={formPlaneta}
              setFormPlaneta={setFormPlaneta}
            />
          </div>
        </div>
      )}
    </div>
    );
}
export default Planetas;