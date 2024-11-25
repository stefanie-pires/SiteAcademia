const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

// Criando o aplicativo Express
const app = express();

// Middleware para habilitar CORS e permitir requisições do frontend
app.use(cors());

// Middleware para fazer o parse do body em formato JSON
app.use(bodyParser.json());

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // Use o usuário que você configurou no MySQL
  password: 'S13245768@',         // Coloque a senha que você configurou para o usuário root
  database: 'db_cadastro' // Aqui estamos usando o schema db_cadastro
});

// Verificando a conexão com o MySQL
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
    return;
  }
  console.log('Conectado ao banco de dados MySQL!');
});

// Rota POST para cadastrar dados no banco
app.post('/cadastro', (req, res) => {
    console.log(req.body); // Log dos dados recebidos

  const { nome, email, cpf, telefone, endereco, data_nascimento, sexo, plano, senha } = req.body;

  // Query para inserção no banco de dados
  const query = `INSERT INTO db_cadastro.pessoa (nome, email, cpf, telefone, endereco, data_nascimento, sexo, plano, senha) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(query, [nome, email, cpf, telefone, endereco, data_nascimento, sexo, plano, senha], (err, result) => {
    if (err) {
      console.error("Erro ao executar a consulta:", err); // Log de erro no banco
      return res.status(500).json({ message: 'Erro ao cadastrar usuário', error: err });
    }
    console.log("Usuário cadastrado com sucesso:", result); // Log de sucesso
    res.status(201).json({ message: 'Usuário cadastrado com sucesso', data: result });
  });
});

// Iniciando o servidor na porta 3001
app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
