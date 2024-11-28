const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Configuração do JWT
const JWT_SECRET = 'sua_chave_secreta_aqui';

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

// Rota POST para o cadastro
app.post('/cadastro', async (req, res) => {
  const { nome, email, cpf, telefone, endereco, data_nascimento, sexo, plano, senha } = req.body;

  try {
    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    const query = `INSERT INTO pessoa (nome, email, cpf, telefone, endereco, data_nascimento, sexo, plano, senha) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [nome, email, cpf, telefone, endereco, data_nascimento, sexo, plano, hashedPassword], (err, result) => {
      if (err) {
        console.error('Erro ao executar a consulta:', err);
        return res.status(500).json({ message: 'Erro ao cadastrar usuário', error: err.message });
      }
      console.log('Usuário cadastrado com sucesso:', result);
      return res.status(201).json({ message: 'Usuário cadastrado com sucesso', data: result });
    });
  } catch (err) {
    console.error('Erro ao criptografar a senha:', err);
    res.status(500).json({ message: 'Erro no servidor ao processar o cadastro' });
  }
});

// Rota POST para o login
app.post('/login', (req, res) => {
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
app.put('/pessoa/:id', autenticarToken, (req, res) => {
  const { id } = req.params;
  const { nome, email, cpf, telefone, endereco, data_nascimento, sexo, plano, senha } = req.body;

  // Verifica se a senha foi fornecida para ser criptografada
  let queryParams = [nome, email, cpf, telefone, endereco, data_nascimento, sexo, plano, senha, id];
  
  if (senha) {
    bcrypt.hash(senha, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ message: 'Erro ao criptografar a senha', error: err.message });
      queryParams[8] = hashedPassword;

      // Atualizando a query com a senha criptografada
      const query = `UPDATE pessoa 
                     SET nome = ?, email = ?, cpf = ?, telefone = ?, endereco = ?, data_nascimento = ?, sexo = ?, plano = ?, senha = ? 
                     WHERE id = ?`;

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
    });
  } else {
    // Caso a senha não tenha sido fornecida, apenas atualiza os outros campos
    const query = `UPDATE pessoa 
                   SET nome = ?, email = ?, cpf = ?, telefone = ?, endereco = ?, data_nascimento = ?, sexo = ?, plano = ? 
                   WHERE id = ?`;

    db.query(query, [nome, email, cpf, telefone, endereco, data_nascimento, sexo, plano, id], (err, result) => {
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
  }
});

// Rota DELETE para excluir um cliente
app.delete('/pessoa/:id', autenticarToken, (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM pessoa WHERE id = ?`;

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
