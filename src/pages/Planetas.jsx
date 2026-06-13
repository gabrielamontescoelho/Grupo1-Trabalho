import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";
import FormPlaneta from "../components/FormPlaneta";

const url = "/planetas";

function Planetas() {
  const { nomeUsuario } = useAuth();
  const [planetas, setPlanetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [modeEdit, setModeEdit] = useState(false);

  const [formPlaneta, setFormPlaneta] = useState({
    nome: "",
    galaxia: "",
    clima: "",
    habitavel: true,
    descricao: "",
  });

  async function buscarPlanetas() {
    try {
      setLoading(true);
      const resposta = await api.get(url);
      setPlanetas(resposta.data);
    } catch (error) {
      console.error("Erro ao buscar planetas:", error);
      setMensagem(">>> FALHA DE COMUNICAÇÃO COM A BASE DE DADOS.");
    } finally {
      setLoading(false);
    }
  }

  async function salvarPlaneta(event) {
    event.preventDefault();
    setMensagem("");

    try {
      if (modeEdit) {
        const resposta = await api.put(`${url}/${formPlaneta.id}`, formPlaneta);
        setPlanetas((listaAtual) =>
          listaAtual.map((planeta) => planeta.id === formPlaneta.id ? resposta.data : planeta)
        );
        setMensagem(">>> REGISTRO DE PLANETA ATUALIZADO COM SUCESSO.");
      } else {
        const resposta = await api.post(url, formPlaneta);
        setPlanetas((listaAtual) => [...listaAtual, resposta.data]);
        setMensagem(">>> NOVO PLANETA REGISTRADO NO RADAR.");
      }
      fecharModal();
    } catch (error) {
      console.error("Erro ao salvar planeta:", error);
      setMensagem(">>> ERRO CRÍTICO: DADOS RECUSADOS PELO SERVIDOR.");
    }
  }

  async function deletarPlaneta(id) {
    const confirmar = window.confirm(
      "ATENÇÃO: Deseja realmente expurgar este registro do banco de dados?"
    );

    if (!confirmar) return;

    try {
      setMensagem("");

      await api.delete(`${url}/${id}`);

      setPlanetas((listaAtual) =>
        listaAtual.filter((planeta) => planeta.id !== id)
      );

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
    setFormPlaneta(planeta);
    setModalAberto(true);
  }

  function limparFormulario() {
    setFormPlaneta({
      nome: "",
      galaxia: "",
      clima: "",
      habitavel: true,
      descricao: "",
    });
  }

  function fecharModal() {
    setModalAberto(false);
    limparFormulario();
  }

  const formatarDado = (dado, fallback) => {
    return dado === "string" || !dado ? fallback : dado;
  };

  useEffect(() => {
    buscarPlanetas();
  }, []);

  useEffect(() => {
    console.log("Estado Planetas atualizado:", planetas);
  }, [planetas]);

  useEffect(() => {
  console.log(planetas);
  console.log(typeof planetas);
  console.log(Array.isArray(planetas));
}, [planetas]);

  return (
    <div className="radar-panel">
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "2rem",
        }}
      >
        <div>
          <h2
            className="terminal-title"
            style={{ marginBottom: "0.2rem" }}
          >
            // RADAR DE PLANETAS
          </h2>

          {nomeUsuario && (
            <p
              style={{
                color: "var(--neon-green)",
                fontSize: "0.9rem",
              }}
            >
              OPERADOR ATIVO: {nomeUsuario}
            </p>
          )}
        </div>

        <button
          onClick={abrirModalCadastro}
          className="cyber-button"
          style={{
            width: "auto",
            padding: "0.6rem 1.5rem",
            marginTop: 0,
          }}
        >
          [ + REGISTRAR PLANETA ]
        </button>
      </header>

      {mensagem && (
        <p
          style={{
            marginBottom: "1.5rem",
            padding: "1rem",
            backgroundColor: mensagem.includes("ERRO")
              ? "var(--alert-red-dim)"
              : "rgba(57, 255, 20, 0.1)",
            border: `1px solid ${
              mensagem.includes("ERRO")
                ? "var(--alert-red)"
                : "var(--neon-green)"
            }`,
            color: mensagem.includes("ERRO")
              ? "var(--alert-red)"
              : "var(--neon-green)",
            borderRadius: "4px",
            fontWeight: "bold",
          }}
        >
          {mensagem}
        </p>
      )}

      {loading ? (
        <div className="feedback">
          --==^^**** VARRENDO SETORES DA GALÁXIA...
        </div>
      ) : planetas.length === 0 ? (
        <div className="feedback-empty">
          SINAL ESTÁVEL: NENHUM PLANETA NO REGISTRO.
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="cyber-table">
            <thead>
              <tr>
                <th>CÓDIGO ID</th>
                <th>NOME</th>
                <th>GALÁXIA</th>
                <th>CLIMA</th>
                <th>HABITÁVEL</th>
                <th style={{ textAlign: "center" }}>AÇÕES</th>
              </tr>
            </thead>

            <tbody>
              {planetas.map((planeta) => (
                <tr key={planeta.id}>
                  <td className="tech-id">#{planeta.id}</td>

                  <td>
                    {formatarDado(
                      planeta?.nome,
                      "NOME DESCONHECIDO"
                    )}
                  </td>

                  <td>
                    {formatarDado(
                      planeta?.galaxia,
                      "GALÁXIA DESCONHECIDA"
                    )}
                  </td>

                  <td>
                    {formatarDado(
                      planeta?.clima,
                      "NÃO INFORMADO"
                    )}
                  </td>

                  <td>
                    {planeta?.habitavel ? "SIM" : "NÃO"}
                  </td>

                  <td
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      onClick={() =>
                        abrirModalEdicao(planeta)
                      }
                      style={{
                        padding: "0.3rem 0.6rem",
                        fontSize: "0.8rem",
                        width: "auto",
                        marginTop: 0,
                        borderColor: "var(--neon-cyan)",
                        color: "var(--neon-cyan)",
                      }}
                    >
                      [ EDITAR ]
                    </button>

                    <button
                      onClick={() =>
                        deletarPlaneta(planeta.id)
                      }
                      style={{
                        padding: "0.3rem 0.6rem",
                        fontSize: "0.8rem",
                        width: "auto",
                        marginTop: 0,
                        borderColor: "var(--alert-red)",
                        color: "var(--alert-red)",
                      }}
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
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(8px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "600px",
              padding: "1rem",
            }}
          >
            <button
              onClick={fecharModal}
              style={{
                position: "absolute",
                top: "2rem",
                right: "2rem",
                width: "auto",
                padding: "0.5rem",
                background: "transparent",
                border: "none",
                color: "var(--alert-red)",
                fontSize: "1.2rem",
                zIndex: 10,
              }}
            >
              [ X ]
            </button>

            <FormPlaneta
              modeEdit={modeEdit}
              cadastrarPlaneta={salvarPlaneta}
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