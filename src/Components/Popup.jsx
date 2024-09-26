import { useState, useEffect } from "react";
import styles from "../Css/Popup.module.css"; // Certifique-se de que o caminho está correto

const Popup = ({ isOpen, onClose, onSave, empresaData }) => {
  const [empresa, setEmpresa] = useState({ nome: "", nota: "", descricao: "" });

  useEffect(() => {
    if (empresaData) {
      setEmpresa(empresaData); // Preenche os dados da empresa se estiver editando
    } else {
      setEmpresa({ nome: "", nota: "", descricao: "" }); // Limpa os campos ao adicionar
    }
  }, [empresaData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpresa((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!empresa.nome || !empresa.nota || !empresa.descricao) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    onSave(empresa);
    onClose(); // Fecha o modal
  };

  if (!isOpen) return null;

  return (
    <div className={styles.popupOverlay}> {/* Aplique o CSS corretamente */}
      <div className={styles.popupContainer}> {/* Aplique o CSS corretamente */}
        <button className={styles.popupClose} onClick={onClose}>
          X
        </button>
        <h2>{empresaData ? "Editar Empresa" : "Adicionar Empresa"}</h2>

        <input
          type="text"
          name="nome"
          value={empresa.nome}
          onChange={handleChange}
          placeholder="Nome da Empresa"
        />
        <input
          type="number"
          name="nota"
          value={empresa.nota}
          onChange={handleChange}
          placeholder="Nota da Empresa"
          min="0"
          max="10"
        />
        <textarea
          name="descricao"
          value={empresa.descricao}
          onChange={handleChange}
          placeholder="Descrição da Empresa"
        />

        <button className={styles.popupSave} onClick={handleSave}>
          {empresaData ? "Salvar Alterações" : "Adicionar Empresa"}
        </button>
      </div>
    </div>
  );
};

export default Popup;
