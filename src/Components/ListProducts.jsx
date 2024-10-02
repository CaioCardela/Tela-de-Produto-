import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../Css/ListProducts.module.css';

const ListProducts = () => {
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Verificar se temos produtos filtrados via busca
  useEffect(() => {
    if (location.state && location.state.produtosFiltrados) {
      setProdutos(location.state.produtosFiltrados);
    } else {
      fetchProdutos(); // Carregar todos os produtos se não houver busca
    }
  }, [location.state]);

  // Função para buscar todos os produtos
  const fetchProdutos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/produtos');
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao buscar os produtos:', error);
    }
  };

  // Função para excluir um produto
  const deleteProduto = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/produtos/${id}`);
      fetchProdutos(); // Recarrega a lista após a exclusão
    } catch (error) {
      console.error('Erro ao excluir o produto:', error);
    }
  };

  // Função para editar um produto
  const editProduto = (id) => {
    navigate(`/editar-produto/${id}`); // Navegar para a página de edição
  };

  return (
    <div className={styles.container}>
      <h2>Produtos cadastrados</h2>
      {produtos.length === 0 ? (
        <p>Nenhum produto cadastrado ainda.</p>
      ) : (
        produtos.map((produto) => (
          <div key={produto._id} className={styles.produtoCard}>
            <img src={produto.urlImagem} alt={produto.nome} className={styles.produtoImagem} />
            <div className={styles.produtoInfo}>
              <h3>{produto.nome}</h3>
              <p>{produto.empresa}</p>
              <p>{produto.nivel}</p>
              <p>{produto.ingredientes}</p>
              <div className={styles.actions}>
                <button onClick={() => editProduto(produto._id)} className={styles.editButton}>
                  Editar
                </button>
                <button onClick={() => deleteProduto(produto._id)} className={styles.deleteButton}>
                  Excluir
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ListProducts;
