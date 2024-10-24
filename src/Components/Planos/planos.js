import React from 'react';
import './Planos.css'; // Para os estilos do componente

function Planos() {
  const planos = [
    {
      nome: 'Plano Flex',
      tipo: 'Mensal',
      valor: 'R$ 99,90',
      acesso: 'Acesso 1 vez por dia a qualquer horário',
    },
    {
      nome: 'Plano Fit',
      tipo: 'Semestral',
      valor: 'R$ 500,00',
      acesso: 'Acesso 1 vez por dia a qualquer horário',
    },
    {
      nome: 'Plano Master',
      tipo: 'Semestral',
      valor: 'R$ 600,00',
      acesso: 'Acesso ilimitado a qualquer horário, parcelado em até 3x',
    },
    {
      nome: 'Plano Gold',
      tipo: 'Anual',
      valor: 'R$ 1.000,00',
      acesso: 'Acesso ilimitado, parcelado em até 3x',
    },
  ];

  return (
    <div className="planos-container">
      <h2>Nossos Planos</h2>
      <div className="planos-list">
        {planos.map((plano, index) => (
          <div className="plano-card" key={index}>
            <h3>{plano.nome}</h3>
            <p><strong>Tipo:</strong> {plano.tipo}</p>
            <p><strong>Valor:</strong> {plano.valor}</p>
            <p><strong>Acesso:</strong> {plano.acesso}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Planos;
