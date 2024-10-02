import styles from "../Css/Produtos.module.css";

const InputField = ({ label, placeholder, value, onChange, name, type = "text" }) => (
  <div className={styles.tarefa}>
    <h3>{label}</h3>
    <input
      type={type}
      name={name} // Adiciona o nome ao input
      value={value} // Define o valor do input como o valor recebido
      onChange={onChange} // Define o manipulador de mudança
      placeholder={placeholder}
      className={styles.inputField}
    />
  </div>
);

export default InputField;
