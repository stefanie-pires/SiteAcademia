import React from 'react';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <img 
        src="/Logo Fitness Preto e Amarelo Simples.png" 
        alt="Logo da Academia" 
        className={styles.logo} 
      />
      <nav className={styles.nav}>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Informações</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
