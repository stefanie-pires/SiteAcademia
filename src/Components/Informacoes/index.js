import React from 'react'; 
import styles from './Informacoes.module.css';

function Informacoes() {
  return (
    <section className={styles.informacoes}>
      <div className={styles.informacoesContainer}>
        <p className={styles.noBreak}>
          © 2024 Academia Casten - Todos os direitos reservados
        </p>
      </div>
    </section>
  );
}

export default Informacoes;
