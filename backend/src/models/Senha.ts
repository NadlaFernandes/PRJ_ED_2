export type CategoriaSenha = 'normal' | 'preferencial';
export type TipoServico = 'consulta' | 'exame' | 'agendamento';


// Interface para a Senha
export interface Senha {
    id: string;        // O código não sequencial (ex: "XJ92")
    tipo: CategoriaSenha;
    servico: TipoServico;
    horaGeracao: Date;
}