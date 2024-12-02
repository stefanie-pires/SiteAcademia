import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpa qualquer erro anterior

    try {
      const response = await axios.post('http://localhost:3001/login', {
        email,
        senha: password, // Confirme que 'senha' é o nome correto no backend
      });

      // Exibe os dados retornados pelo servidor no console (opcional para debug)
      console.log(response.data);

      // Armazena o token no sessionStorage
      sessionStorage.setItem('token', response.data.token);

      // Redireciona para a página de detalhes
      navigate('/pessoa');
    } catch (err) {
      console.error('Erro no login:', err);

      // Verifica se o erro é de autenticação ou outro problema
      if (err.response && err.response.status === 401) {
        setError('Email ou senha inválidos.');
      } else {
        setError('Erro ao conectar ao servidor. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <div className="hero">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="button">Entrar</button>
          <p className="link">
            Primeiro acesso? <Link to="/cadastro">Clique aqui</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
