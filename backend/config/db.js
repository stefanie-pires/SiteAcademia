const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',        // O servidor do banco de dados
  user: 'root',             // Usuário do banco
  password: 'S13245768@',    // A senha configurada para o root
  database: 'db_cadastro',  // Nome do banco de dados
  port: 3306,               // Porta padrão do MySQL
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
    return;
  }
  console.log('Conectado ao banco de dados MySQL.');
});

module.exports = db;
