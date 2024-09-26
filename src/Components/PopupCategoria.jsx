import { useState, useEffect } from "react";
import styles from "../Css/Popup.module.css"; // Ajuste o caminho de acordo

const PopupCategoria = ({ isOpen, onClose, onSave, categoriaData }) => {
  const [categoria, setCategoria] = useState({ nome: "" });

  useEffect(() => {
    if (categoriaData) {
      setCategoria(categoriaData); // Preenche os dados da categoria se estiver editando
    } else {
      setCategoria({ nome: "" }); // Limpa os campos ao adicionar
    }
  }, [categoriaData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoria((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!categoria.nome) {
      alert("Por favor, preencha o nome da categoria.");
      return;
    }
    onSave(categoria);
    onClose(); // Fecha o modal
  };

  if (!isOpen) return null;

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContainer}>
        <button className={styles.popupClose} onClick={onClose}>
          X
        </button>
        <h2>{categoriaData ? "Editar Categoria" : "Adicionar Categoria"}</h2>

        <input
          type="text"
          name="nome"
          value={categoria.nome}
          onChange={handleChange}
          placeholder="Nome da Categoria"
        />

        <button onClick={handleSave}>
          {categoriaData ? "Salvar Alterações" : "Adicionar Categoria"}
        </button>
      </div>
    </div>
  );
};

export default PopupCategoria;
