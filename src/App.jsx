import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './pages/Login';
// import Register from './pages/Register';
import AdicionarProdutos from './pages/adicionar-produto';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redireciona a rota padrão para a página de adicionar produtos */}
        <Route path="/" element={<Navigate to="/adicionar-produto" replace />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
        <Route path='/adicionar-produto' element={<AdicionarProdutos />} />
      </Routes>
    </Router>
  );
}

export default App;
