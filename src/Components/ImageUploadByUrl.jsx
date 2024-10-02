import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "../Css/ImageUploadByUrl.module.css";

// Esquema de validação Yup
const validationSchema = Yup.object({
  urlImagem: Yup.string()
    .url("URL inválida, verifique se está correta.")
    .required("A URL da imagem é obrigatória"),
});

const ImageUploadByUrl = () => {
  const [imageUrl, setImageUrl] = useState("");

  // Formik para lidar com o formulário
  const formik = useFormik({
    initialValues: {
      urlImagem: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setImageUrl(values.urlImagem);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.imageUploadContainer}>
      <h2>Adicione a URL da Imagem</h2>
      <input
        type="text"
        placeholder="Cole a URL da imagem aqui"
        name="urlImagem"
        value={formik.values.urlImagem}
        onChange={formik.handleChange}
        className={`${styles.inputField} ${
          formik.errors.urlImagem ? styles.invalidInput : ""
        }`}
      />
      {/* Exibir mensagem de erro se a URL for inválida */}
      {formik.errors.urlImagem && (
        <p className={styles.errorMessage}>{formik.errors.urlImagem}</p>
      )}

      <button type="submit" className={styles.submitButton}>Verificar Imagem</button>

      {imageUrl && !formik.errors.urlImagem && (
        <div className={styles.previewContainer}>
          <h3>Pré-visualização da Imagem:</h3>
          <img
            src={imageUrl}
            alt="Pré-visualização da imagem"
            className={styles.imagePreview}
            onError={() => formik.setFieldError("urlImagem", "URL inválida.")}
          />
        </div>
      )}
    </form>
  );
};

export default ImageUploadByUrl;
