import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

// Permite que o Frontend acesse o Backend
app.use(cors());

// Permite que o servidor entenda JSON no corpo das requisições (req.body)
app.use(express.json());

// Usa as rotas que definimos
app.use(routes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});