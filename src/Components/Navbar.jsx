import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../Css/Navbar.module.css';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      try {
        const response = await axios.get(`http://localhost:5000/api/produtos/buscar`, {
          params: { nome: searchTerm }
        });
        // Navegar para a página de listar produtos, passando os produtos filtrados
        navigate('/listar-produtos', { state: { produtosFiltrados: response.data } });
      } catch (error) {
        console.error('Erro ao buscar produtos:', error.response ? error.response.data : error.message);
      }
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>EcoFinder</div>
      <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Procure seu produto"
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>Buscar</button>
      </form>
      <ul className={styles.navLinks}>
        <li><a href="/">Início</a></li>
        <li><a href="/sobre">Sobre</a></li>
        <li><a href="/login">Login</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
