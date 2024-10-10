import React from 'react'; 
import styles from './Header.module.css';

// Adicione a fonte Russo One
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Russo+One&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

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
          <li>
            <a href="/home">Home</a>
          </li>
          <span className={styles.separator}>|</span>
          <li>
            <a href="/informacoes">Login</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
