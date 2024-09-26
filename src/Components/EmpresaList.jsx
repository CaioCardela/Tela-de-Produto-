import { useState } from "react";
import Popup from "./Popup"; // Reutilizando o Popup existente
import ActionButtons from "./ActionButtons"; // Reutilizando ActionButtons

const EmpresaList = () => {
  const [empresas, setEmpresas] = useState([
    { id: 1, nome: "Empresa X", nota: 8, descricao: "Empresa X descrição" },
    { id: 2, nome: "Empresa Y", nota: 7, descricao: "Empresa Y descrição" },
  ]);

  const [isPopupOpen, setIsPopupOpen] = useState(false); // Estado para abrir e fechar o popup
  const [empresaSelecionada, setEmpresaSelecionada] = useState(null); // Estado para empresa selecionada (edição ou adição)

  // Função para abrir o popup de adição de empresa
  const openAddPopup = () => {
    setEmpresaSelecionada(null); // Ao adicionar uma nova empresa, reseta os dados
    setIsPopupOpen(true); // Abre o popup
  };

  // Função para abrir o popup de edição de empresa
  const openEditPopup = (empresa) => {
    setEmpresaSelecionada(empresa); // Define a empresa a ser editada
    setIsPopupOpen(true); // Abre o popup para edição
  };

  // Função para adicionar ou editar uma empresa
  const handleSaveEmpresa = (novaEmpresa) => {
    if (empresaSelecionada) {
      // Editando uma empresa existente
      setEmpresas((prevEmpresas) =>
        prevEmpresas.map((empresa) =>
          empresa.id === empresaSelecionada.id ? novaEmpresa : empresa
        )
      );
    } else {
      // Adicionando uma nova empresa
      const newEmpresaWithId = { id: empresas.length + 1, ...novaEmpresa };
      setEmpresas((prevEmpresas) => [...prevEmpresas, newEmpresaWithId]);
    }
  };

  return (
    <div>
      <h1>Lista de Empresas</h1>
      <ul>
        {empresas.map((empresa) => (
          <li key={empresa.id}>
            {empresa.nome} - Nota: {empresa.nota}
            <p>{empresa.descricao}</p>
            <ActionButtons
              onAddClick={openAddPopup}
              onEditClick={() => openEditPopup(empresa)} // Passando a empresa para edição
            />
          </li>
        ))}
      </ul>

      {/* Popup para adicionar ou editar empresa */}
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSave={handleSaveEmpresa} // Callback para adicionar ou editar
        empresaData={empresaSelecionada} // Passando os dados da empresa selecionada (para edição)
      />
    </div>
  );
};

export default EmpresaList;
