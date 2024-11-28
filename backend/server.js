const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // Adicionando JWT
const bcrypt = require('bcrypt'); // Adicionando bcrypt para criptografar as senhas

// Middleware para permitir requisições CORS
app.use(cors());

// Middleware para parse de JSON
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

// Chave secreta para JWT
const SECRET_KEY = 'sua_chave_secreta_segura'; // Substitua por algo mais seguro no ambiente real

// Rota POST para o cadastro
app.post('/cadastro', async (req, res) => {
  const { nome, email, cpf, telefone, endereco, data_nascimento, sexo, plano, senha } = req.body;

  console.log('Dados recebidos para cadastro:', req.body);

  // Verifica se a senha foi fornecida
  if (!senha) {
    return res.status(400).json({ message: 'Senha é obrigatória' });
  }

  // Criptografando a senha com bcrypt
  const hashedPassword = await bcrypt.hash(senha, 10);

  // Definindo a query de inserção no banco
  const query = `INSERT INTO pessoa (nome, email, cpf, telefone, endereco, data_nascimento, sexo, plano, senha) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  // Executando a query para inserir os dados no banco
  db.query(query, [nome, email, cpf, telefone, endereco, data_nascimento, sexo, plano, hashedPassword], (err, result) => {
    if (err) {
      console.error('Erro ao executar a consulta de cadastro:', err);
      return res.status(500).json({ message: 'Erro ao cadastrar usuário', error: err.message });
    }
    console.log('Usuário cadastrado com sucesso:', result);
    return res.status(201).json({ message: 'Usuário cadastrado com sucesso', data: result });
  });
});

// Rota POST para o login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  console.log('Tentativa de login com:', req.body);

  // Definindo a query para buscar o usuário pelo email
  const query = `SELECT * FROM pessoa WHERE email = ?`;

  // Executando a query para buscar o usuário
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta de login:', err);
      return res.status(500).json({ message: 'Erro no servidor', error: err.message });
    }

    if (results.length === 0) {
      console.log('Email ou senha inválidos');
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    const usuario = results[0];

    // Verificando a senha utilizando bcrypt
    const isPasswordValid = await bcrypt.compare(senha, usuario.senha);
    if (!isPasswordValid) {
      console.log('Senha inválida');
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    // Gerando o token JWT
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email }, // Payload
      SECRET_KEY, // Chave secreta
      { expiresIn: '1h' } // Expiração de 1 hora
    );

    console.log('Login bem-sucedido, token gerado:', token);

    // Retornando os dados do usuário e o token
    return res.status(200).json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      cpf: usuario.cpf,
      telefone: usuario.telefone,
      endereco: usuario.endereco,
      data_nascimento: usuario.data_nascimento,
      sexo: usuario.sexo,
      plano: usuario.plano,
      token, // Enviando o token JWT
    });
  });
});

// Middleware para autenticação com JWT (protege rotas)
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"

  if (!token) return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido ou expirado.' });

    req.user = user; // Adiciona o usuário ao request
    next();
  });
}

// Rota PUT para atualizar os dados do cliente (protegida com JWT)
app.put('/pessoa/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { nome, email, cpf, telefone, endereco, data_nascimento, sexo, plano, senha } = req.body;

  console.log('Atualizando dados do cliente:', req.body);

  // Verifica se foi enviada uma nova senha
  let hashedPassword = undefined;
  if (senha) {
    // Se a senha foi enviada, criptografa a nova senha
    hashedPassword = await bcrypt.hash(senha, 10);
  }

  // Definindo a query de atualização no banco
  const query = `UPDATE pessoa 
                 SET nome = ?, email = ?, cpf = ?, telefone = ?, endereco = ?, data_nascimento = ?, sexo = ?, plano = ?, senha = ? 
                 WHERE id = ?`;

  // Se não houver uma nova senha, não incluímos o campo 'senha' na atualização
  const params = [nome, email, cpf, telefone, endereco, data_nascimento, sexo, plano, hashedPassword || undefined, id];

  // Executando a query para atualizar os dados no banco
  db.query(query, params, (err, result) => {
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
});

// Rota DELETE para excluir um cliente (protegida com JWT)
app.delete('/pessoa/:id', authenticateToken, (req, res) => {
  const { id } = req.params;

  console.log('Excluindo cliente com ID:', id);

  // Definindo a query de exclusão no banco
  const query = `DELETE FROM pessoa WHERE id = ?`;

  // Executando a query para excluir o cliente
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Erro ao executar a consulta de exclusão:', err);
      return res.status(500).json({ message: 'Erro ao excluir cliente', error: err.message });
    }

    if (result.affectedRows === 0) {
      console.log('Cliente não encontrado');
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }

    console.log('Cliente excluído com sucesso:', result);
    return res.status(200).json({ message: 'Cliente excluído com sucesso', data: result });
  });
});

// Configurando o servidor para rodar na porta 3001
app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
