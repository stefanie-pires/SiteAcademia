import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';  // Adicionando useParams
import axios from 'axios';
import './ClienteDetalhes.css';

function ClienteDetalhes() {
  const { clienteId } = useParams();  // Capturando o clienteId da URL
  const [cliente, setCliente] = useState(null); // Dados do cliente
  const [editando, setEditando] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCliente = async () => {
      const token = sessionStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3001/pessoa/${clienteId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);  // Adicionando log para verificar os dados
        setCliente(response.data);
      } catch (error) {
        console.error('Erro ao buscar os dados do cliente:', error);
        setMensagem('Erro ao buscar os dados do cliente.');
        navigate('/login');
      }
    };

    if (clienteId) {
      fetchCliente();
    }
  }, [clienteId, navigate]);  // A dependência agora inclui clienteId

  const handleEdit = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      await axios.put(
        `http://localhost:3001/pessoa/${cliente.id}`, // Altere 'detalhes' para 'pessoa' e inclua o id
        cliente,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMensagem('Dados atualizados com sucesso!');
      setEditando(false);
    } catch (error) {
      console.error('Erro ao atualizar os dados do cliente:', error);
      setMensagem('Erro ao atualizar os dados. Tente novamente.');
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
          <h2>Carregando...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="hero">
      <div className="container">
        <h2>Detalhes do Cliente</h2>
        {mensagem && <p className="mensagem">{mensagem}</p>}
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
          </div>
        )}
      </div>
    </div>
  );
}

export default ClienteDetalhes;
