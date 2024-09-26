import styles from "../Css/Produtos.module.css"; // Importando o CSS Modules

const SelectField = ({ label, options, defaultText }) => (
  <div className={styles.tarefa}>
    <h3>{label}</h3>
    <select className={styles.selectField}>
      <option value="" disabled selected>
        {defaultText}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default SelectField;
