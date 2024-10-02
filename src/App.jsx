import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ListProducts from './Components/ListProducts';  // Importando o componente de listar produtos
import EditProduct from './Components/EditProduct';    // Importando o componente de editar produto
import ProductForm from './Components/ProductForm';    // Importando o componente de adicionar produto
import Navbar from './Components/Navbar';              // Importando o Navbar

function App() {
  return (
    <Router>
      {/* Navbar estará em todas as rotas */}
      <Navbar />
      
      <Routes>
        {/* Redireciona a rota padrão para a página de listar produtos */}
        <Route path="/" element={<Navigate to="/listar-produtos" replace />} />

        {/* Rota para listar produtos */}
        <Route path="/listar-produtos" element={<ListProducts />} />

        {/* Rota para adicionar novo produto */}
        <Route path='/adicionar-produto' element={<ProductForm />} />

        {/* Rota para editar produto */}
        <Route path='/editar-produto/:id' element={<EditProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
