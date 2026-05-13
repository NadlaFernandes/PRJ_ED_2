import axios from 'axios';

// Cria a instância do Axios para facilitar as chamadas em todo o projeto
export const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Exemplo: api.get('/fila') chama http://localhost:3000/fila
