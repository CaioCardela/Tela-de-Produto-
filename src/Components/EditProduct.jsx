import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import InputField from '../formFields/InputField'; // Importar o componente de campo de entrada
import styles from '../Css/ListProducts.module.css'; // Estilos para o formulário

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState({
    nome: '',
    empresa: '',
    nivel: '',
    urlImagem: '',
    ingredientes: '',
    razaoPrejudicial: ''
  });

  useEffect(() => {
    // Função para buscar os dados do produto por ID
    const fetchProduto = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/produtos/${id}`);
        setProduto(response.data); // Atualiza os dados do produto no estado
      } catch (error) {
        console.error('Erro ao buscar o produto:', error);
      }
    };

    fetchProduto();
  }, [id]);

  // Função para lidar com a alteração nos campos do formulário
  const handleChange = (e) => {
    setProduto({
      ...produto,
      [e.target.name]: e.target.value
    });
  };

  // Função para salvar as alterações
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/produtos/${id}`, produto);
      navigate('/listar-produtos'); // Redireciona para a lista após salvar
    } catch (error) {
      console.error('Erro ao salvar o produto:', error);
    }
  };

  return (
    <form onSubmit={handleSave} className={styles.form}>
      <h2>Editar Produto</h2>
      <InputField
        label="Nome do Produto"
        name="nome"
        value={produto.nome}
        onChange={handleChange}
        placeholder="Nome do produto"
      />
      <InputField
        label="Empresa"
        name="empresa"
        value={produto.empresa}
        onChange={handleChange}
        placeholder="Nome da empresa"
      />
      <InputField
        label="Nível"
        name="nivel"
        value={produto.nivel}
        onChange={handleChange}
        placeholder="Nível do produto"
      />
      <InputField
        label="URL da Imagem"
        name="urlImagem"
        value={produto.urlImagem}
        onChange={handleChange}
        placeholder="URL da imagem"
      />
      <InputField
        label="Ingredientes"
        name="ingredientes"
        value={produto.ingredientes}
        onChange={handleChange}
        placeholder="Lista de ingredientes"
      />
      <InputField
        label="Razão de Ser Prejudicial"
        name="razaoPrejudicial"
        value={produto.razaoPrejudicial}
        onChange={handleChange}
        placeholder="Motivo prejudicial"
      />
      <button type="submit" className={styles.saveButton}>Salvar Alterações</button>
    </form>
  );
};

export default EditProduct;
