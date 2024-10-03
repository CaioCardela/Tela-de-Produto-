import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../Css/Login.module.css'; // Usando o mesmo CSS para consistência

const Cadastro = () => {
  const [user_name, setUserName] = useState('');
  const [senha, setSenha] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        user_name,
        senha,
        isAdmin,
      });

      if (response.status === 201) {
        setSuccess('Usuário cadastrado com sucesso!');
        navigate('/login');
      }
    } catch (err) {
      setError('Erro ao cadastrar usuário. Tente novamente.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2>Cadastro Admin</h2>
        <div className={styles.icon}></div> {/* Adicionar ícone aqui */}
        <form onSubmit={handleRegister}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Insira seu user"
              value={user_name}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              type="password"
              placeholder="Insira sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <div className={styles.checkboxContainer}>
            <label>
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              Administrador
            </label>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}
          <button type="submit" className={styles.button}>Cadastrar</button>
        </form>
        <p className={styles.link}>
          Já possui conta? <a href="/login">Entre</a>
        </p>
      </div>
    </div>
  );
};

export default Cadastro;
