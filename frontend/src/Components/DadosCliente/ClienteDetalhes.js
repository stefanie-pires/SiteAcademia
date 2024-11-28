import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Importar useLocation para acessar os dados passados pela navegação
import './ClienteDetalhes.css';

function ClienteDetalhes() {
  const { state } = useLocation(); // Obtendo os dados passados via navigate
  const [cliente, setCliente] = useState(state?.cliente || null); // Definindo os dados do cliente
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    if (state?.cliente) {
      setCliente(state.cliente); // Atualiza os dados do cliente caso estejam disponíveis
    }
  }, [state]);

  const handleEdit = () => {
    if (!cliente.nome || !cliente.email || !cliente.cpf || !cliente.senha) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }
    // Lógica para editar os dados
    alert('Dados atualizados!');
    setEditando(false);
  };

  const handleDelete = () => {
    if (window.confirm('Você tem certeza que deseja excluir este cliente?')) {
      // Lógica para excluir o cliente
      alert('Cliente excluído!');
      setCliente(null); // Limpa os dados do cliente
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!cliente) {
    return (
      <div className="hero">
        <div className="container">
          <h2>Cliente Excluído</h2>
          <p>Os dados do cliente foram removidos.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hero">
      <div className="container">
        <h2>Detalhes do Cliente</h2>
        {editando ? (
          <form>
            <div className="input-group">
              <label>Nome:</label>
              <input
                type="text"
                className="input"
                name="nome"
                value={cliente.nome}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Email:</label>
              <input
                type="email"
                className="input"
                name="email"
                value={cliente.email}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>CPF:</label>
              <input
                type="text"
                className="input"
                name="cpf"
                value={cliente.cpf}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Telefone:</label>
              <input
                type="text"
                className="input"
                name="telefone"
                value={cliente.telefone}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Endereço:</label>
              <input
                type="text"
                className="input"
                name="endereco"
                value={cliente.endereco}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Data de Nascimento:</label>
              <input
                type="date"
                className="input"
                name="data_nascimento"
                value={cliente.data_nascimento}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Sexo:</label>
              <select
                className="input"
                name="sexo"
                value={cliente.sexo}
                onChange={handleChange}
              >
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Outro</option>
              </select>
            </div>
            <div className="input-group">
              <label>Plano:</label>
              <input
                type="text"
                className="input"
                name="plano"
                value={cliente.plano}
                onChange={handleChange}
              />
            </div>
            <button type="button" className="button" onClick={handleEdit}>
              Salvar
            </button>
          </form>
        ) : (
          <div>
            <p><strong>Nome:</strong> {cliente.nome}</p>
            <p><strong>Email:</strong> {cliente.email}</p>
            <p><strong>CPF:</strong> {cliente.cpf}</p>
            <p><strong>Telefone:</strong> {cliente.telefone}</p>
            <p><strong>Endereço:</strong> {cliente.endereco}</p>
            <p><strong>Data de Nascimento:</strong> {cliente.data_nascimento}</p>
            <p><strong>Sexo:</strong> {cliente.sexo}</p>
            <p><strong>Plano:</strong> {cliente.plano}</p>
            <button type="button" className="button" onClick={() => setEditando(true)}>
              Editar
            </button>
            <button
              type="button"
              className="button"
              onClick={handleDelete}
              style={{ marginTop: '10px', backgroundColor: '#e74c3c' }}
            >
              Excluir
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClienteDetalhes;
