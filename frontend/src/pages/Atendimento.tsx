import { useState } from 'react';
import { api } from '../services/api';

interface Senha {
  id: number;
  tipo: string;
  servico: string;
}

export function Atendimento() {
  const [atual, setAtual] = useState<Senha | null>(null);

  const proximo = async () => {
    try {
      const res = await api.get('/atender');
      setAtual(res.data);
    } catch (err) {
      console.error(err);
      alert("Fila vazia!");
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Guichê de Atendimento</h1>
      <button onClick={proximo} style={{ padding: '20px', fontSize: '1.2rem' }}>CHAMAR PRÓXIMO</button>
      {atual && (
        <div style={{ marginTop: '20px', border: '2px solid #333', padding: '20px' }}>
          <h2>Senha: {atual.id}</h2>
          <p>Tipo: {atual.tipo.toUpperCase()}</p>
          <p>Serviço: {atual.servico.toUpperCase()}</p>
        </div>
      )}
    </div>
  );
}