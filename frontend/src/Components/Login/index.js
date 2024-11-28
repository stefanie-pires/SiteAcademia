import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          senha: password, // Verifique se 'senha' é o nome correto no backend
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          setError('Email ou senha inválidos.');
        } else {
          setError(data.message || 'Erro desconhecido.');
        }
        return;
      }

      // Verifica se o token está presente e o armazena no localStorage
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        console.log('Token armazenado:', data.token);
        
        // Verifica se o objeto cliente está presente e redireciona
        if (data.usuario && data.usuario.id) {
          navigate(`/cliente/${data.usuario.id}`); // Redireciona para a página de detalhes do cliente
        } else {
          setError('Dados do cliente não encontrados.');
        }
      } else {
        setError('Token não recebido.');
      }
    } catch (err) {
      console.error('Erro no login:', err);
      setError('Erro ao conectar ao servidor. Tente novamente mais tarde.');
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
