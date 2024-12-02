import React from 'react'; 
import styles from './Informacoes.module.css';

function Informacoes() {
  return (
    <section className={styles.informacoes}>
      <div className={styles.informacoesContainer}>
        <p className={styles.noBreak}>
          © 2024 Academia Casten - Todos os direitos reservados
        </p>
        <div className={styles.socialMedia}>
          <a href="https://instagram.com/sualoja" target="_blank" rel="noopener noreferrer">
            <img src='/instagram.png' alt="Instagram" className={styles.icon} />
          </a>
          <a href="https://wa.me/seunumerodetelefone" target="_blank" rel="noopener noreferrer">
            <img src='whatsapp.png' alt="WhatsApp" className={styles.icon} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Informacoes;
