const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const cadastroRoutes = require('./routes/cadastro'); // Importando o arquivo de rotas

dotenv.config();

const app = express();

// Middlewares
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3002', 'http://localhost:3001'],}));
app.use(bodyParser.json());

// Rotas
app.use('/cadastro', cadastroRoutes);  // Certifique-se de que '/cadastro' é a rota que você está tentando acessar

// Porta do servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
