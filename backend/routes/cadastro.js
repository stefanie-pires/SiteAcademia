const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();  // Adiciona o suporte a variáveis de ambiente

// Configuração do JWT
const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_aqui';  // Usando variável de ambiente

app.use(cors());
app.use(express.json());

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

// Middleware para autenticação do token JWT
function autenticarToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  jwt.verify(token, JWT_SECRET, (err, usuario) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.usuario = usuario;
    next();
  });
}

// Rota POST para o login
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  const query = `SELECT * FROM pessoa WHERE email = ?`;

  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      return res.status(500).json({ message: 'Erro no servidor', error: err.message });
    }

    if (results.length === 0) {
      console.log('Email não encontrado');
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    const usuario = results[0];

    // Validar a senha com bcrypt
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      console.log('Senha inválida');
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    // Gerar o token JWT
    const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, { expiresIn: '1h' });

    console.log('Login bem-sucedido:', usuario);
    return res.status(200).json({
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        cpf: usuario.cpf,
        telefone: usuario.telefone,
        endereco: usuario.endereco,
        data_nascimento: usuario.data_nascimento,
        sexo: usuario.sexo,
        plano: usuario.plano,
      },
    });
  });
});

// Rota PUT para atualizar os dados do cliente
app.put('/pessoa/:id', autenticarToken, async (req, res) => {
  const { id } = req.params;
  const { nome, email, cpf, telefone, endereco, data_nascimento, sexo, plano, senha } = req.body;

  try {
    let queryParams = [nome, email, cpf, telefone, endereco, data_nascimento, sexo, plano, id];

    let query = `UPDATE pessoa 
                 SET nome = ?, email = ?, cpf = ?, telefone = ?, endereco = ?, data_nascimento = ?, sexo = ?, plano = ? 
                 WHERE id = ?`;

    if (senha) {
      // Criptografando a senha se fornecida
      const hashedPassword = await bcrypt.hash(senha, 10);
      queryParams[8] = hashedPassword;  // Atualizando o índice da senha
      query = `UPDATE pessoa 
               SET nome = ?, email = ?, cpf = ?, telefone = ?, endereco = ?, data_nascimento = ?, sexo = ?, plano = ?, senha = ? 
               WHERE id = ?`;
    }

    db.query(query, queryParams, (err, result) => {
      if (err) {
        console.error('Erro ao executar a consulta de atualização:', err);
        return res.status(500).json({ message: 'Erro ao atualizar dados do cliente', error: err.message });
      }

      if (result.affectedRows === 0) {
        console.log('Cliente não encontrado');
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }

      console.log('Dados do cliente atualizados com sucesso:', result);
      return res.status(200).json({ message: 'Dados do cliente atualizados com sucesso', data: result });
    });
  } catch (err) {
    console.error('Erro ao processar a atualização:', err);
    return res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
});

// Configurando o servidor para rodar na porta 3001
app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
