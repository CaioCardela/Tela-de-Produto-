import { useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import ActionButtons from "./ActionButtons";
import Popup from "./Popup";
import PopupCategoria from "./PopupCategoria";
import styles from "../Css/Produtos.module.css";
import "../Css/Popup.module.css";

export const ProductForm = () => {
  // Estado para empresas e categorias
  const [empresas, setEmpresas] = useState([
    { id: 1, nome: "Empresa X" },
    { id: 2, nome: "Empresa Y" },
  ]);

  const [categorias, setCategorias] = useState([
    { id: 1, nome: "Categoria 1" },
    { id: 2, nome: "Categoria 2" },
  ]);

  // Estado para controlar se os popups estão abertos
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isCategoriaPopupOpen, setCategoriaPopupOpen] = useState(false);

  // Estado para controlar se está editando ou adicionando uma empresa/categoria
  const [empresaSelecionada, setEmpresaSelecionada] = useState(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

  // Abrir popup para adicionar ou editar empresa
  const togglePopup = (popupType, isOpen, item = null) => {
    if (popupType === "general") {
      setEmpresaSelecionada(item); // Define a empresa selecionada ou reseta
      setPopupOpen(isOpen);
    } else if (popupType === "categoria") {
      setCategoriaSelecionada(item); // Define a categoria selecionada ou reseta
      setCategoriaPopupOpen(isOpen);
    }
  };

  // Função para salvar (adicionar ou editar) empresa
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
      setEmpresas([...empresas, newEmpresaWithId]);
    }
    setPopupOpen(false); // Fecha o popup após salvar
  };

  // Função para salvar (adicionar ou editar) categoria
  const handleSaveCategoria = (novaCategoria) => {
    if (categoriaSelecionada) {
      // Editando uma categoria existente
      setCategorias((prevCategorias) =>
        prevCategorias.map((categoria) =>
          categoria.id === categoriaSelecionada.id ? novaCategoria : categoria
        )
      );
    } else {
      // Adicionando uma nova categoria
      const newCategoriaWithId = {
        id: categorias.length + 1,
        ...novaCategoria,
      };
      setCategorias([...categorias, newCategoriaWithId]);
    }
    setCategoriaPopupOpen(false); // Fecha o popup após salvar
  };

  return (
    <>
      <div className={styles.formContainer}>
        <div className={styles.ladoEsquerdo}>
          <h2>Adicione a foto do produto</h2>
          <div className={styles.imagemUpload}>
            <div className={styles.imagemPlaceholder}>Upload de Imagem</div>
          </div>
        </div>

        <div className={styles.ladoDireito}>
          {/* Nome do Produto */}
          <InputField
            label="Nome do produto"
            placeholder="Adicione o nome do produto"
          />

          {/* Empresa Responsável */}
          <SelectField
            label="Empresa responsável"
            options={empresas.map((empresa) => empresa.nome)}
            defaultText="Selecione a empresa"
          />
          <ActionButtons
            onAddClick={() => togglePopup("general", true)} // Adiciona nova empresa
            onEditClick={() => togglePopup("general", true, empresaSelecionada)} // Edita empresa
          />

          {/* Categoria do Produto */}
          <SelectField
            label="Categoria do produto"
            options={categorias.map((categoria) => categoria.nome)}
            defaultText="Selecione a categoria"
          />
          <ActionButtons
            onAddClick={() => togglePopup("categoria", true)} // Adiciona nova categoria
            onEditClick={() =>
              togglePopup("categoria", true, categoriaSelecionada)
            } // Edita categoria
          />

          {/* Nível do Produto */}
          <SelectField
            label="Nível do produto"
            options={["Ausente", "Leve", "Moderado", "Crítico"]}
            defaultText="Selecione o nível do produto"
          />
        </div>
      </div>

      {/* Ingredientes e Razão de Ser Prejudicial */}
      <section className={styles.areaTextos}>
        <div className={styles.campoTexto}>
          <h3>Ingredientes do Produto</h3>
          <textarea
            className={styles.textareaProduto}
            placeholder="Adicione aqui, os ingredientes do produto"
          ></textarea>
        </div>

        <div className={styles.campoTexto}>
          <h3>Razão de Ser Prejudicial</h3>
          <textarea
            className={styles.textareaRazao}
            placeholder="Adicione aqui, o motivo do produto ser prejudicial para o meio ambiente"
          ></textarea>
        </div>

        <div className={styles.botaoContainer}>
          <button className={styles.botaoPublicar}>Publicar</button>
        </div>
      </section>

      {/* Popup para Adicionar/Editar Empresa */}
      <Popup
        isOpen={isPopupOpen}
        onClose={() => togglePopup("general", false)}
        onSave={handleSaveEmpresa}
        empresaData={empresaSelecionada} // Passa os dados da empresa para editar
      />

      {/* Popup para Adicionar/Editar Categoria */}
      <PopupCategoria
        isOpen={isCategoriaPopupOpen}
        onClose={() => togglePopup("categoria", false)}
        onSave={handleSaveCategoria}
        categoriaData={categoriaSelecionada} // Passa os dados da categoria para editar
      />
    </>
  );
};

export default ProductForm;
