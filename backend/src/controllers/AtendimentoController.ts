import { MyNode, Queue } from '../structures/queue';

interface Senha {
  id: number;
  tipo: 'normal' | 'preferencial';
  servico: string;
  status: 'aguardando' | 'atendido';
}

const filaNormal = new Queue<Senha>();
const filaPreferencial = new Queue<Senha>();
const senhasGeradas: Senha[] = [];
let ultimaSenhaChamada: Senha | null = null;

export const gerarSenha = (tipo: 'normal' | 'preferencial', servico: string) => {
  const novaSenha: Senha = {
    id: Math.floor(1000 + Math.random() * 9000), // ID aleatório
    tipo,
    servico,
    status: 'aguardando'
  };

  if (tipo === 'preferencial') {
    filaPreferencial.add(new MyNode(novaSenha));
  } else {
    filaNormal.add(new MyNode(novaSenha));
  }

  senhasGeradas.push(novaSenha);
  return novaSenha;
};

export const chamarProximo = () => {
  const fila = filaPreferencial.isEmpty() ? filaNormal : filaPreferencial;

  if (!fila.isEmpty()) {
    const node = fila.remove();
    node.value.status = 'atendido';
    ultimaSenhaChamada = node.value;
    return node.value;
  }

  return null;
};

export const obterUltimaChamada = () => ultimaSenhaChamada;

export const listarFila = () => {
  return senhasGeradas.filter(s => s.status === 'aguardando');
};
