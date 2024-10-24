import React from 'react';
import styles from './Horarios.module.css';

function Horarios() {
  return (
    <section className={styles.hero}>
      <div className={styles.horariosContainer}>
        <div className={styles.horariosElement}>
          <h2 className={styles.horariosTitle}>Segunda-Feira</h2>
          <p className={styles.horariosTime}>06:00 - 22:00</p>
        </div>
        <div className={styles.horariosElement}>
          <h2 className={styles.horariosTitle}>Terça-Feira</h2>
          <p className={styles.horariosTime}>06:00 - 22:00</p>
        </div>
        <div className={styles.horariosElement}>
          <h2 className={styles.horariosTitle}>Quarta-Feira</h2>
          <p className={styles.horariosTime}>06:00 - 22:00</p>
        </div>
        <div className={styles.horariosElement}>
          <h2 className={styles.horariosTitle}>Quinta-Feira</h2>
          <p className={styles.horariosTime}>06:00 - 22:00</p>
        </div>
        <div className={styles.horariosElement}>
          <h2 className={styles.horariosTitle}>Sexta-Feira</h2>
          <p className={styles.horariosTime}>06:00 - 22:00</p>
        </div>
        <div className={`${styles.horariosElement} ${styles.highlight}`}>
          <h2 className={styles.horariosTitle}>Sábado</h2>
          <p className={styles.horariosTime}>09:00 - 18:00</p>
        </div>
        <div className={styles.horariosElement}>
          <h2 className={styles.horariosTitle}>Domingo</h2>
          <p className={styles.horariosTime}>Fechado</p>
        </div>
      </div>
    </section>
  );
}

export default Horarios;
