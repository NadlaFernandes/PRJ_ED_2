import { Queue, MyNode } from "../structures/queue";
import { Senha, CategoriaSenha, TipoServico } from "../models/Senha";

// Instanciando as duas filas
const filaNormal = new Queue<Senha>();
const filaPreferencial = new Queue<Senha>();

export const gerarSenha = (tipo: CategoriaSenha, servico: TipoServico) => {
    // Gerar ID não sequencial (exemplo simples)
    const idAleatorio = Math.random().toString(36).substring(2, 6).toUpperCase();
    
    const novaSenha: Senha = {
        id: idAleatorio,
        tipo,
        servico,
        horaGeracao: new Date()
    };

    const node = new MyNode<Senha>(novaSenha);

    if (tipo === 'preferencial') {
        filaPreferencial.add(node);
    } else {
        filaNormal.add(node);
    }

    return novaSenha;
};

export const chamarProximo = () => {
    // REGRA DO PROJETO: Preferencial sempre antes do normal
    if (!filaPreferencial.isEmpty()) {
        return filaPreferencial.remove().value;
    }
    if (!filaNormal.isEmpty()) {
        return filaNormal.remove().value;
    }
    return null; // Ninguém na fila
};