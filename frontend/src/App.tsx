import { useState } from 'react';
import { api } from './services/api';
import { Atendimento } from './pages/Atendimento';
import { Painel } from './pages/Painel';

export default function App() {
  const [tela, setTela] = useState('totem');
  const [servico, setServico] = useState('consulta');

  const gerarSenha = async (tipo: 'normal' | 'preferencial') => {
    try {
      const res = await api.post('/senhas', { tipo, servico });
      alert(`Senha ${tipo.toUpperCase()} Gerada: ${res.data.id}`);
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar com o servidor.");
    }
  };

  if (tela === 'atendimento') return <><button onClick={() => setTela('totem')}>Voltar</button><Atendimento /></>;
  if (tela === 'painel') return <><button onClick={() => setTela('totem')}>Voltar</button><Painel /></>;

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <nav style={{ marginBottom: '30px' }}>
        <button onClick={() => setTela('atendimento')}>Atendimento</button>
        <button onClick={() => setTela('painel')}>Painel</button>
      </nav>

      <h1>Totem de Senhas</h1>
      <select value={servico} onChange={(e) => setServico(e.target.value)} style={{ padding: '5px', marginBottom: '20px' }}>
        <option value="consulta">Consulta</option>
        <option value="exame">Exame</option>
        <option value="agendamento">Agendamento</option>
      </select>
      <br />
      <button onClick={() => gerarSenha('normal')} style={{ padding: '15px', marginRight: '10px' }}>Senha Normal</button>
      <button onClick={() => gerarSenha('preferencial')} style={{ padding: '15px', backgroundColor: 'gold' }}>Senha Preferencial</button>
    </div>
  );
}