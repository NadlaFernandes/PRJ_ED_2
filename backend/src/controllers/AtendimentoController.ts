interface Senha {
  id: number;
  tipo: 'normal' | 'preferencial';
  servico: string;
  status: 'aguardando' | 'atendido';
}

const fila: Senha[] = [];
let ultimaSenhaChamada: Senha | null = null;

export const gerarSenha = (tipo: 'normal' | 'preferencial', servico: string) => {
  const novaSenha: Senha = {
    id: Math.floor(1000 + Math.random() * 9000), // ID aleatório
    tipo,
    servico,
    status: 'aguardando'
  };
  fila.push(novaSenha);
  return novaSenha;
};

export const chamarProximo = () => {
  // Busca preferencial primeiro
  let index = fila.findIndex(s => s.tipo === 'preferencial' && s.status === 'aguardando');
  
  // Se não achar, busca o normal
  if (index === -1) {
    index = fila.findIndex(s => s.status === 'aguardando');
  }

  if (index !== -1) {
    fila[index].status = 'atendido';
    ultimaSenhaChamada = fila[index];
    return fila[index];
  }
  return null;
};

export const obterUltimaChamada = () => ultimaSenhaChamada;

export const listarFila = () => {
  return fila.filter(s => s.status === 'aguardando');
};