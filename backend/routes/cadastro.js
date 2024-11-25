const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Configuração do banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'S13245768@',
  database: 'db_cadastro'
});

// Verifica se a conexão foi bem-sucedida
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
    return;
  }
  console.log('Conectado ao banco de dados MySQL!');
});

// Rota POST para o cadastro
router.post('/', (req, res) => {
  const { nome, email, cpf, telefone, endereco, data_nascimento, sexo, plano, senha } = req.body;

  const query = `INSERT INTO pessoa (nome, email, cpf, telefone, endereco, data_nascimento, sexo, plano, senha) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(query, [nome, email, cpf, telefone, endereco, data_nascimento, sexo, plano, senha], (err, result) => {
    if (err) {
      console.error("Erro ao executar a consulta:", err);
      return res.status(500).json({ message: 'Erro ao cadastrar usuário', error: err });
    }
    console.log("Usuário cadastrado com sucesso:", result);
    res.status(201).json({ message: 'Usuário cadastrado com sucesso', data: result });
  });
});

module.exports = router;
