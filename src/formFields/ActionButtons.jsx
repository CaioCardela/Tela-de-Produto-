import styles from "../Css/Produtos.module.css"; // Importando o CSS Modules

const ActionButtons = ({ onAddClick, onEditClick }) => (
  <div className={styles.botoesAcao}>
    <button className={styles.botaoAcao} onClick={onAddClick}>
      Adicionar
    </button>
    <button className={styles.botaoAcao} onClick={onEditClick}>
      Editar
    </button>
  </div>
);

export default ActionButtons;
