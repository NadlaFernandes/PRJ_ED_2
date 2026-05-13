import { useState } from 'react';
import { api } from '../services/api';

export function Totem() {
  const [servico, setServico] = useState('consulta');
  const [loading, setLoading] = useState(false);

  const gerarSenha = async (tipo: 'normal' | 'preferencial') => {
    setLoading(true);
    try {
      const res = await api.post('/senhas', { tipo, servico });
      
      // Feedback visual para o usuário
      alert(`
        SENHA GERADA COM SUCESSO!
        -------------------------
        NÚMERO: ${res.data.id}
        TIPO: ${tipo.toUpperCase()}
        SERVIÇO: ${servico.toUpperCase()}
      `);
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar com o totem. Verifique o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '40px', 
      fontFamily: 'sans-serif',
      backgroundColor: '#f4f4f4',
      minHeight: '100vh' 
    }}>
      <h1 style={{ fontSize: '2.5rem', color: '#333' }}>Totem de Atendimento</h1>
      <p style={{ fontSize: '1.2rem', color: '#666' }}>Selecione o serviço e retire sua senha</p>

      <div style={{ margin: '30px 0' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>TIPO DE SERVIÇO:</label>
        <select 
          value={servico} 
          onChange={(e) => setServico(e.target.value)} 
          style={{ padding: '12px', fontSize: '1.1rem', borderRadius: '5px', width: '250px' }}
        >
          <option value="consulta">Consulta</option>
          <option value="exame">Exame</option>
          <option value="agendamento">Agendamento</option>
          <option value="financeiro">Financeiro</option>
        </select>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <button 
          onClick={() => gerarSenha('normal')} 
          disabled={loading}
          style={{ 
            padding: '20px 40px', 
            fontSize: '1.2rem', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Gerando...' : 'SENHA NORMAL'}
        </button>

        <button 
          onClick={() => gerarSenha('preferencial')} 
          disabled={loading}
          style={{ 
            padding: '20px 40px', 
            fontSize: '1.2rem', 
            backgroundColor: '#ffc107', 
            color: '#000', 
            border: 'none', 
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold'
          }}
        >
          {loading ? 'Gerando...' : 'SENHA PREFERENCIAL'}
        </button>
      </div>

      <div style={{ marginTop: '50px', color: '#888' }}>
        <p>Atendimento Prioritário: Idosos, Gestantes e Pessoas com Deficiência.</p>
      </div>
    </div>
  );
}