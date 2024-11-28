import React, { useState } from 'react';
import './cadastro.css';

function Cadastro() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    endereco: '',
    data_nascimento: '',
    sexo: '',
    plano: '',
    senha: '',
    confirmarSenha: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação de senhas
    if (formData.senha !== formData.confirmarSenha) {
      setMessage("As senhas não coincidem.");
      return;
    }

    // Validação do CPF
    const cpfRegex = /^[0-9]{11}$/;
    if (!cpfRegex.test(formData.cpf)) {
      setMessage("CPF inválido. O CPF deve conter 11 números.");
      return;
    }

    // Verificação de campos obrigatórios
    for (const field in formData) {
      if (formData[field] === '') {
        setMessage(`O campo ${field} é obrigatório.`);
        return;
      }
    }

    try {
      console.log(formData);
      const response = await fetch('http://localhost:3001/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(result.message || 'Cadastro realizado com sucesso!');
        
        // Redirecionar após sucesso
        setTimeout(() => {
          window.location.href = '/login'; // Redireciona para a página de login
        }, 2000);

        // Limpar o formulário após o sucesso
        setFormData({
          nome: '',
          email: '',
          cpf: '',
          telefone: '',
          endereco: '',
          data_nascimento: '',
          sexo: '',
          plano: '',
          senha: '',
          confirmarSenha: ''
        });
      } else {
        const errorResult = await response.json();
        setMessage(`Erro: ${errorResult.message || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      setMessage('Erro ao cadastrar usuário');
    }
  };

  return (
    <div className="hero">
      <div className="container">
        <h2>Cadastro</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="nome">Nome completo:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="cpf">CPF:</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="telefone">Número de telefone:</label>
            <input
              type="text"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="endereco">Endereço:</label>
            <input
              type="text"
              id="endereco"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="data_nascimento">Data de nascimento:</label>
            <input
              type="date"
              id="data_nascimento"
              name="data_nascimento"
              value={formData.data_nascimento}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="sexo">Sexo:</label>
            <select
              id="sexo"
              name="sexo"
              value={formData.sexo}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Selecione</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
              <option value="outro">Outro</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="plano">Escolha do plano:</label>
            <select
              id="plano"
              name="plano"
              value={formData.plano}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Selecione</option>
              <option value="flex">Plano Flex</option>
              <option value="fit">Plano Fit</option>
              <option value="master">Plano Master</option>
              <option value="gold">Plano Gold</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmarSenha">Confirmar Senha:</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          {message && <p className="error">{message}</p>}
          <button type="submit" className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
