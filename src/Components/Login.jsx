import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../Css/Login.module.css'; // Estilos personalizados

const Login = () => {
  const [user_name, setUserName] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        user_name,
        senha,
      });

      if (response.status === 200) {
        // Redirecionar para a página de administração após login
        navigate('/listar-produtos');
      }
    } catch (err) {
      setError('Usuário ou senha incorretos');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2>Login Admin</h2>
        <div className={styles.icon}></div> {/* Adicionar ícone aqui, estilo configurado no CSS */}
        <form onSubmit={handleLogin}>
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
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.button}>Entrar</button>
        </form>
        <p className={styles.link}>
          Não possui conta? <a href="/cadastro">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
