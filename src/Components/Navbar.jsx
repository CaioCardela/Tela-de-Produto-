import { useState } from "react";
import styles from "../Css/Navbar.module.css"; // Importando o CSS Module

// Componente NavBar
export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.barraNavegacao}>
      <div className={styles.logo}>
        <h1>EcoFinder</h1>
      </div>

      <div className={styles.barraPesquisa}>
        <input type="text" placeholder="Procure seu produto" />
      </div>

      <button className={styles.hamburguer} onClick={toggleMenu}>
        <span className={styles.hamburguerLinha}></span>
        <span className={styles.hamburguerLinha}></span>
        <span className={styles.hamburguerLinha}></span>
      </button>

      <ul
        className={`${styles.linksNavegacao} ${
          isMenuOpen ? styles.linksAtivo : ""
        }`}
      >
        <li>
          <a href="#">Início</a>
        </li>
        <li>
          <a href="#">Sobre</a>
        </li>
        <li>
          <a href="#">Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
