import React, { useState } from 'react';
import './styles.css'; // Importando o CSS diretamente, sem o uso de módulos

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="login-container"> {/* Usando a classe diretamente */}
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group"> {/* Usando a classe diretamente */}
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input" // Usando a classe diretamente
          />
        </div>
        <div className="input-group"> {/* Usando a classe diretamente */}
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input" // Usando a classe diretamente
          />
        </div>
        <button type="submit" className="button">Entrar</button> {/* Usando a classe diretamente */}
        <p className="link">Primeiro acesso? <a href="#">Clique aqui</a></p> {/* Usando a classe diretamente */}
      </form>
    </div>
  );
}

export default Login;
