import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
// import Register from './pages/Register';
import AdicionarProdutos from './pages/adicionar-produto';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
        <Route path='/adicionar-produto' element={<AdicionarProdutos /> } />
      </Routes>
    </Router>
  );
}

export default App;
