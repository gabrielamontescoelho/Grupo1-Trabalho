import { useState, useEffect } from 'react';
import api from '../services/api';

export default function PainelAliens() {
  const [aliens, setAliens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function carregarAliens() {
      try {
        const response = await api.get('/aliens');
        setAliens(response.data);
      } catch (err) {
        setError('FALHA NO SINAL DO RADAR. CONEXÃO INTERROMPIDA.');
      } finally {
        setLoading(false);
      }
    }
    carregarAliens();
  }, []);

  const formatarDado = (dado, fallback) => {
    return dado === 'string' || !dado ? fallback : dado;
  };

  if (loading) return <div className="feedback"> ESCANEANDO ÓRBITAS...</div>;
  if (error) return <div className="feedback-error">AMEAÇA: {error}</div>;

  return (
    <div className="radar-container">
      <h2 className="terminal-title">// ORGANISMOS CAPTURADOS: {aliens.length}</h2>
      
      {/* Mudamos para uma estrutura de tabela robusta */}
      <div className="table-wrapper">
        <table className="cyber-table">
          <thead>
            <tr>
              <th>ID COD.</th>
              <th>IDENTIFICAÇÃO</th>
              <th>ESPÉCIE BASE</th>
              <th>STATUS DE AMEAÇA</th>
            </tr>
          </thead>
          <tbody>
            {aliens.map((alien) => (
              <tr key={alien.id}>
                <td className="tech-id">#{alien.id}</td>
                <td className="tech-name">{formatarDado(alien?.nome, 'NÃO IDENTIFICADO')}</td>
                <td>{formatarDado(alien?.especie, 'NÃO CLASSIFICADO')}</td>
                <td>
                  {/* Se a periculosidade for alta, ganha uma classe de alerta */}
                  <span className={`badge-perigo ${alien.periculosidade > 7 ? 'alerta-maximo' : ''}`}>
                    NÍVEL {alien.periculosidade || '0'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}