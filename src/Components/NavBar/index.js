import React, { useState } from 'react'; 
import styles from './Header.module.css'; // Certifique-se de que o caminho esteja correto
import { Link } from 'react-router-dom'; // Importando Link para navegação

const Header = () => {
  const [menuActive, setMenuActive] = useState(false); // State para controlar o menu

  const toggleMenu = () => {
    setMenuActive(!menuActive); // Alterna o estado do menu
  };

  return (
    <header className={styles.header}>
      <Link to="/"> 
        <img 
          src="/Logo Fitness Preto e Amarelo Simples.png" 
          alt="Logo da Academia" 
          className={styles.logo} 
        />
      </Link>
      <nav className={`${styles.nav} ${menuActive ? styles.active : ''}`}>
        <ul>
          <li>
            <Link to="/">Início</Link> 
          </li>
          <li>
            <Link to="/horarios">Horários</Link>
          </li>
          <li>
            <Link to="/planos">Planos</Link>
          </li>
        </ul>
      </nav>
      <Link to="/login" className={styles.matriculaButton}>Matrícula Online</Link> 
      <div className={styles.menuToggle} onClick={toggleMenu}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
    </header>
  );
}

export default Header;

