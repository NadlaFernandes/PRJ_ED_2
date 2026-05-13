import { Router, Request, Response } from 'express';
import * as AtendimentoController from './controllers/AtendimentoController';

const router = Router();

router.post('/senhas', (req: Request, res: Response) => {
  const { tipo, servico } = req.body;
  const nova = AtendimentoController.gerarSenha(tipo, servico);
  return res.status(201).json(nova);
});

router.get('/atender', (req: Request, res: Response) => {
  const proxima = AtendimentoController.chamarProximo();
  if (!proxima) return res.status(404).json({ msg: "Fila vazia" });
  return res.json(proxima);
});

router.get('/senhas/ultima-chamada', (req: Request, res: Response) => {
  return res.json(AtendimentoController.obterUltimaChamada());
});

router.get('/fila', (req: Request, res: Response) => {
  return res.json(AtendimentoController.listarFila());
});

export default router;