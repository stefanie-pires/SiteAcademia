import React from 'react';
import styles from './Informações.module.css';

function Informações() {
  return (
    <section className={styles.informacoes}>
      <h3>Horário de Atendimento</h3>
      <p>Segunda a Sexta-feira: 05:00-22:00</p>
      {/* ... outras informações */}
    </section>
  );
}

export default Informações;