import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importando useNavigate
import axios from "axios"; // Certifique-se de que o axios está importado para enviar a requisição
import InputField from "../formFields/InputField";
import SelectField from "../formFields/SelectField";
import ActionButtons from "../formFields/ActionButtons";
import Popup from "./Popup";
import PopupCategoria from "./PopupCategoria";
import ImageUploadByUrl from "./ImageUploadByUrl"; // Importa o componente de upload de imagem
import styles from "../Css/Produtos.module.css";
import "../Css/Popup.module.css";

export const ProductForm = () => {
  const [empresas, setEmpresas] = useState([
    { id: 1, nome: "Empresa X" },
    { id: 2, nome: "Empresa Y" },
  ]);

  const [categorias, setCategorias] = useState([
    { id: 1, nome: "Categoria 1" },
    { id: 2, nome: "Categoria 2" },
  ]);

  const [selectedEmpresaId, setSelectedEmpresaId] = useState("");
  const [selectedCategoriaId, setSelectedCategoriaId] = useState("");

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isCategoriaPopupOpen, setCategoriaPopupOpen] = useState(false);

  const [empresaSelecionada, setEmpresaSelecionada] = useState(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [nome, setNome] = useState(""); // Adicionando o estado do nome do produto
  const [ingredientes, setIngredientes] = useState("");
  const [razaoPrejudicial, setRazaoPrejudicial] = useState("");
  const [urlImagem, setUrlImagem] = useState("");

  const navigate = useNavigate(); // Inicializando o hook useNavigate

  const togglePopup = (popupType, isOpen, item = null) => {
    if (popupType === "empresa") {
      setEmpresaSelecionada(item);
      setPopupOpen(isOpen);
    } else if (popupType === "categoria") {
      setCategoriaSelecionada(item);
      setCategoriaPopupOpen(isOpen);
    }
  };

  const handleSaveEmpresa = (novaEmpresa) => {
    if (empresaSelecionada) {
      setEmpresas((prevEmpresas) =>
        prevEmpresas.map((empresa) =>
          empresa.id === empresaSelecionada.id ? novaEmpresa : empresa
        )
      );
    } else {
      const newEmpresaWithId = { id: empresas.length + 1, ...novaEmpresa };
      setEmpresas([...empresas, newEmpresaWithId]);
    }
    setPopupOpen(false);
  };

  const handleSaveCategoria = (novaCategoria) => {
    if (categoriaSelecionada) {
      setCategorias((prevCategorias) =>
        prevCategorias.map((categoria) =>
          categoria.id === categoriaSelecionada.id ? novaCategoria : categoria
        )
      );
    } else {
      const newCategoriaWithId = { id: categorias.length + 1, ...novaCategoria };
      setCategorias([...categorias, newCategoriaWithId]);
    }
    setCategoriaPopupOpen(false);
  };

  const handleEmpresaChange = (e) => {
    setSelectedEmpresaId(e.target.value);
  };

  const handleCategoriaChange = (e) => {
    setSelectedCategoriaId(e.target.value);
  };

  const handleSubmit = async () => {
    // Dados do produto a serem enviados
    const produto = {
      nome,
      empresaResponsavel: selectedEmpresaId,
      categoriaProduto: selectedCategoriaId,
      nivelProduto: "Ausente", // ou o valor selecionado no seu componente
      urlImagem,
      ingredientes,
      razaoPrejudicial,
    };

    try {
      // Enviar requisição para a API
      const response = await axios.post("http://localhost:5000/api/produtos", produto);
      console.log("Produto adicionado com sucesso:", response.data);
      
      // Redirecionar para a lista de produtos
      navigate("/listar-produtos");
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  };

  return (
    <>
      <div className={styles.formContainer}>
        <div className={styles.ladoEsquerdo}>
          {/* Adicionando o componente de Upload de Imagem */}
          <ImageUploadByUrl setUrlImagem={setUrlImagem} />
        </div>

        <div className={styles.ladoDireito}>
          <InputField
            label="Nome do produto"
            placeholder="Adicione o nome do produto"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <SelectField
            label="Empresa responsável"
            options={empresas.map((empresa) => ({
              label: empresa.nome,
              value: empresa.id,
            }))}
            defaultText="Selecione a empresa"
            value={selectedEmpresaId}
            onChange={handleEmpresaChange}
          />
          <ActionButtons
            onAddClick={() => togglePopup("empresa", true)}
            onEditClick={() => {
              const empresa = empresas.find((e) => e.id === parseInt(selectedEmpresaId));
              if (empresa) togglePopup("empresa", true, empresa);
            }}
          />

          <SelectField
            label="Categoria do produto"
            options={categorias.map((categoria) => ({
              label: categoria.nome,
              value: categoria.id,
            }))}
            defaultText="Selecione a categoria"
            value={selectedCategoriaId}
            onChange={handleCategoriaChange}
          />
          <ActionButtons
            onAddClick={() => togglePopup("categoria", true)}
            onEditClick={() => {
              const categoria = categorias.find((c) => c.id === parseInt(selectedCategoriaId));
              if (categoria) togglePopup("categoria", true, categoria);
            }}
          />

          <SelectField
            label="Nível do produto"
            options={["Ausente", "Leve", "Moderado", "Crítico"].map((nivel) => ({
              label: nivel,
              value: nivel,
            }))}
            defaultText="Selecione o nível do produto"
          />
        </div>
      </div>

      <section className={styles.areaTextos}>
        <div className={styles.campoTexto}>
          <h3>Ingredientes do Produto</h3>
          <textarea
            className={styles.textareaProduto}
            placeholder="Adicione aqui, os ingredientes do produto"
            value={ingredientes}
            onChange={(e) => setIngredientes(e.target.value)}
          ></textarea>
        </div>

        <div className={styles.campoTexto}>
          <h3>Razão de Ser Prejudicial</h3>
          <textarea
            className={styles.textareaRazao}
            placeholder="Adicione aqui, o motivo do produto ser prejudicial para o meio ambiente"
            value={razaoPrejudicial}
            onChange={(e) => setRazaoPrejudicial(e.target.value)}
          ></textarea>
        </div>

        <div className={styles.botaoContainer}>
          <button className={styles.botaoPublicar} onClick={handleSubmit}>
            Publicar
          </button>
        </div>
      </section>

      <Popup
        isOpen={isPopupOpen}
        onClose={() => togglePopup("empresa", false)}
        onSave={handleSaveEmpresa}
        empresaData={empresaSelecionada}
      />

      <PopupCategoria
        isOpen={isCategoriaPopupOpen}
        onClose={() => togglePopup("categoria", false)}
        onSave={handleSaveCategoria}
        categoriaData={categoriaSelecionada}
      />
    </>
  );
};

export default ProductForm;
