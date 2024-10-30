import React, { useState } from 'react';
import './cadastro.css';

function Cadastro() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    rgOuCpf: '',
    telefone: '',
    endereco: '',
    naturalidade: '',
    sexo: '',
    senha: '',
    confirmarSenha: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do Cadastro:', formData);
    // Adicione a lógica para enviar os dados aqui
  };

  return (
    <div className="hero">
      <div className="container">
        <h2>Cadastro</h2>
        <p>Este é o formulário de cadastro.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="input-group">
            <label htmlFor="rgOuCpf">RG ou CPF:</label>
            <input
              type="text"
              id="rgOuCpf"
              name="rgOuCpf"
              value={formData.rgOuCpf}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="input-group">
            <label htmlFor="telefone">Telefone:</label>
            <input
              type="text"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              className="input"
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
            />
          </div>
          <div className="input-group">
            <label htmlFor="naturalidade">Naturalidade:</label>
            <input
              type="text"
              id="naturalidade"
              name="naturalidade"
              value={formData.naturalidade}
              onChange={handleChange}
              className="input"
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
            >
              <option value="">Selecione</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
              <option value="outro">Outro</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="planos">Planos:</label>
            <select
              id="planos"
              name="planos"
              value={formData.plano}
              onChange={handleChange}
              className="input"
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
            />
          </div>
          <button type="submit" className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
