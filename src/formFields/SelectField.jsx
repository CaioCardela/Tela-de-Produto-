import styles from "../Css/Produtos.module.css";

const SelectField = ({ label, options, value, onChange }) => {
  return (
    <div className={styles.tarefa}>
      <h3>{label}</h3>
      <select value={value} onChange={onChange} className={styles.inputField}>
        <option value="">Selecione uma opção</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
