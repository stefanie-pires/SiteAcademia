import React from 'react';
import styles from './Informacoes.module.css';

function Informacoes() {
  return (
    <section className={styles.informacoes}>
      <h3>Informações:</h3>
      <div className={styles.informacoesContainer}> {/* Mudança aqui para 'informacoesContainer' */}
        <p className={styles.noBreak}> {/* Mudança aqui para 'noBreak' */}
          Estamos localizados no coração de Curitiba, no endereço: 
          <strong> Rua das Araucarias, n 14,</strong> um local acessível e 
          conveniente para todas as nossas alunas.
        </p>
        <p>
          Visite-nos para conhecer nossas instalações e experimentar nossos treinos. 
          Estamos ansiosas para receber você!
        </p>
      </div>
    </section>
  );
}

export default Informacoes;
