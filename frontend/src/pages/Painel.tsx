import { useState, useEffect } from 'react';
import { api } from '../services/api';

interface Senha {
  id: number;
  tipo: string;
  servico: string;
}

export function Painel() {
  const [chamada, setChamada] = useState<Senha | null>(null);

  const check = async () => {
    try {
      const res = await api.get('/senhas/ultima-chamada');
      setChamada(res.data);
    } catch (error) { console.error(error); }
  };

  useEffect(() => {
    const i = setInterval(check, 3000);
    return () => clearInterval(i);
  }, []);

  return (
    <div style={{ textAlign: 'center', backgroundColor: '#000', color: '#fff', height: '100vh', padding: '50px' }}>
      <h1>ÚLTIMA SENHA CHAMADA</h1>
      {chamada ? (
        <>
          <div style={{ fontSize: '15rem', color: chamada.tipo === 'preferencial' ? 'gold' : '#00ff00' }}>
            {chamada.id}
          </div>
          <h2 style={{ fontSize: '3rem' }}>{chamada.tipo.toUpperCase()} - {chamada.servico.toUpperCase()}</h2>
        </>
      ) : <p>Aguardando chamadas...</p>}
    </div>
  );
}