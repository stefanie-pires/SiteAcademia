import React from 'react'; 
import styles from './Header.module.css'; // Certifique-se de que o caminho esteja correto
import { Link } from 'react-router-dom'; // Importando Link para navegação

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/"> {/* Adicionando o Link aqui */}
        <img 
          src="/Logo Fitness Preto e Amarelo Simples.png" 
          alt="Logo da Academia" 
          className={styles.logo} 
        />
      </Link>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to="/">Início</Link> 
          </li>
          <span className={styles.separator}>|</span>
          <li>
            <Link to="/horarios">Horários</Link>
          </li>
          <span className={styles.separator}>|</span>
          <li>
            <Link to="/planos">Planos</Link> {/* Link para a página de Planos */}
          </li>
        </ul>
        <Link to="/login" className={styles.matriculaButton}>Matrícula Online</Link> {/* Use o Link aqui */}
      </nav>
    </header>
  );
}

export default Header;
