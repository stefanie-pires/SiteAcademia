import React from 'react';
import styles from './Horarios.module.css';

function Horarios() {
  return (
    <section className={styles.hero}>
      <div className={styles.horariosContainer}>
        <div className={styles.horariosElement}>
          <h2 className={styles.horariosTitle}>Segunda-Feira</h2>
          <div className={styles.dayInfo}>Aula de dança fit das 9 às 11</div>
          <p className={styles.horariosTime}>06:00 - 22:00</p>
        </div>
        <div className={styles.horariosElement}>
          <h2 className={styles.horariosTitle}>Terça-Feira</h2>
          <div className={styles.dayInfo}>Treino funcional das 10 às 12</div>
          <p className={styles.horariosTime}>06:00 - 22:00</p>
        </div>
        <div className={styles.horariosElement}>
          <h2 className={styles.horariosTitle}>Quarta-Feira</h2>
          <div className={styles.dayInfo}>Pilates das 8 às 10</div>
          <p className={styles.horariosTime}>06:00 - 22:00</p>
        </div>
        <div className={styles.horariosElement}>
          <h2 className={styles.horariosTitle}>Quinta-Feira</h2>
          <div className={styles.dayInfo}>Zumba das 18 às 20</div>
          <p className={styles.horariosTime}>06:00 - 22:00</p>
        </div>
        <div className={styles.horariosElement}>
          <h2 className={styles.horariosTitle}>Sexta-Feira</h2>
          <div className={styles.dayInfo}>Aula de yoga das 7 às 9</div>
          <p className={styles.horariosTime}>06:00 - 22:00</p>
        </div>
        <div className={`${styles.horariosElement} ${styles.highlight}`}>
          <h2 className={styles.horariosTitle}>Sábado</h2>
          <div className={styles.dayInfo}>Musculação</div>
          <p className={styles.horariosTime}>09:00 - 18:00</p>
        </div>
        <div className={styles.horariosElement}>
          <h2 className={styles.horariosTitle}>Domingo</h2>
          <div className={styles.dayInfo}>Fechado</div>
          <p className={styles.horariosTime}>Fechado</p>
        </div>
      </div>
    </section>
  );
}

export default Horarios;
