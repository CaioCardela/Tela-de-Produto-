import styles from "../Css/Produtos.module.css"; // Importando o CSS Modules centralizado

const InputField = ({ label, placeholder, type = "text" }) => (
  <div className={styles.tarefa}>
    <h3>{label}</h3>
    <input
      type={type}
      placeholder={placeholder}
      className={styles.inputField}
    />
  </div>
);

export default InputField;
