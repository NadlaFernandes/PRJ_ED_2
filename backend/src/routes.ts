import { Router, Request, Response } from 'express';
import * as AtendimentoController from './controllers/AtendimentoController';

const router = Router();

// Rota para o Totem: Gerar uma nova senha
router.post('/senhas', (req: Request, res: Response) => {
    const { tipo, servico } = req.body;
    
    if (!tipo || !servico) {
        return res.status(400).json({ error: "Tipo e serviço são obrigatórios" });
    }

    const novaSenha = AtendimentoController.gerarSenha(tipo, servico);
    return res.status(201).json(novaSenha);
});

// Rota para o Atendente: Chamar a próxima senha
router.get('/senhas/proximo', (req: Request, res: Response) => {
    const proxima = AtendimentoController.chamarProximo();
    
    if (!proxima) {
        return res.status(404).json({ message: "Não há senhas na fila" });
    }

    return res.json(proxima);
});

export default router;