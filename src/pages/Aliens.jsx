import { useState, useEffect } from 'react';
import axios from 'axios';
import FormAlien from "../components/FormAlien";

const url = "https://api.serratec.mwmsoftware.com/aliens";

function Aliens() {

  const [aliens, setAliens] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [formAlien, setFormAlien] = useState({
    "nome": "string",
    "especie": "string",
    "planeta": "string",
    "periculosidade": 10,
    "descricao": "string"
  });

  // Carrega a lista automaticamente ao montar o componente
  useEffect(() => {
    buscarAliensComAxios();
  }, []);

  async function buscarAliensComAxios() {
    try {
      const resposta = await axios.get(url);
      setAliens(resposta.data);
    } catch (error) {
      console.error("Erro ao buscar aliens com axios:", error);
    }
  }

  async function cadastrarAlien(event) {
    event.preventDefault();
    setMensagem("");

    try {
      const resposta = await axios.post(url, formAlien);
      // Atualiza a lista local adicionando o novo registro retornado pela API
      setAliens((listaAtual) => [...listaAtual, resposta.data]);

      // Limpa ou reseta o formulário após o sucesso
      setFormAlien({
        nome: "",
        especie: "",
        planeta: "",
        periculosidade: 0,
        descricao: ""
      });

      setMensagem(">>> REGISTRO ADICIONADO AO BANCO DE DADOS COM SUCESSO.");
    } catch (error) {
      console.error("Erro ao cadastrar alien:", error);
      setMensagem(">>> ERRO CRÍTICO: FALHA AO TRANSMITIR DADOS DE CADASTRO.");
    }
  }

  const formatarDado = (dado, fallback) => {
    return dado === 'string' || !dado ? fallback : dado;
  };

  return (
    <div className="radar-panel">
      {/* Seção do Formulário de Cadastro */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 className="terminal-title">// INSERIR NOVA ASSINATURA BIOLÓGICA</h2>
        <FormAlien
          formAlien={formAlien}
          setFormAlien={setFormAlien}
          cadastrarAlien={cadastrarAlien}
        />
        {mensagem && (
          <p style={{
            marginTop: '1rem',
            color: mensagem.includes('ERRO') ? 'var(--alert-red)' : 'var(--neon-green)',
            fontSize: '0.85rem',
            fontWeight: 'bold'
          }}>
            {mensagem}
          </p>
        )}
      </section>

      {/* Seção da Tabela do Radar */}
      <section>
        <h2 className="terminal-title">// EXTRASOLARES REGISTRADOS: {aliens.length}</h2>

        {aliens.length === 0 ? (
          <div className="feedback-empty">SINAL ESTÁVEL: NENHUM ORGANISMO NO PERÍMETRO.</div>
        ) : (
          <div className="table-wrapper">
            <table className="cyber-table">
              <thead>
                <tr>
                  <th>CÓDIGO ID</th>
                  <th>ASSINATURA / NOME</th>
                  <th>CLASSIFICAÇÃO BIOLÓGICA</th>
                  <th>NÍVEL DE PERICULOSIDADE</th>
                </tr>
              </thead>
              <tbody>
                {aliens.map(alien => (
                  <tr key={alien.id}>
                    <td className="tech-id">#{alien.id}</td>
                    <td className="tech-name">
                      {formatarDado(alien?.nome, 'NOME DESCONHECIDO')}
                    </td>
                    <td>
                      {formatarDado(alien?.especie, 'ESPÉCIE NÃO CATALOGADA')}
                    </td>
                    <td>
                      <span className={`badge-perigo ${alien.periculosidade > 7 ? 'alerta-maximo' : ''}`}>
                        NÍVEL {alien?.periculosidade || '0'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default Aliens;