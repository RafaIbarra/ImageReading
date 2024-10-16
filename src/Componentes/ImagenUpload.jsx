import { useState, useRef, useEffect } from "react";
import { Typography, notification } from "antd";
import "./costum.css";
import { showErrorMessage } from "../utils/alert";

const { Title } = Typography;

function ImagenUpload({
  agregarImagen, // Puede ser agrega_img_frontal o agrega_img_reverso al pasarle en las props
  seleccionItem,
  clickMenu,
  datoMenuSeleccionado,
  limpiarResultado, // Puede ser limpiar_resultado_frontal o limpiar_resultado_reverso al pasarle en las props
  tipoImagen, // "frontal" o "reverso"
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef(null);
  const [api, contextHolder] = notification.useNotification();
  const [isDragging, setIsDragging] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        showErrorMessage("Solo se permiten archivos de tipo imagen");
        event.target.value = null;
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        agregarImagen(file, file.name);
      };
      reader.readAsDataURL(file);

      event.target.value = null;
    }
  };

  const handleRemoveImage = (event) => {
    event.stopPropagation();
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
      limpiarResultado();
      agregarImagen(null);
    }
  };

  const handlePreview = (event) => {
    event.stopPropagation();
    if (selectedImage) {
      const imageWindow = window.open();
      imageWindow.document.write(
        `<img src="${selectedImage}" style="max-width:100%; height:auto;" alt="Vista previa de la imagen">`
      );
    }
  };

  const handleContainerClick = (event) => {
    if (!event.target.closest(".image-hover")) {
      fileInputRef.current.click();
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        showErrorMessage("Solo se permiten archivos de tipo imagen");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        agregarImagen(file, file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  useEffect(() => {
    if (!seleccionItem) {
      setSelectedImage(null);
      fileInputRef.current.value = null;
    } else {
      const imagenBase64 =
        datoMenuSeleccionado[tipoImagen]?.datosarchivo?.base64;
      setSelectedImage(imagenBase64);
    }
  }, [seleccionItem, clickMenu, datoMenuSeleccionado, tipoImagen]);

  return (
    <div className="image-upload-wrapper">
      {contextHolder}
      <div className="image-upload-container">
        <div
          className="image-upload-label"
          onClick={handleContainerClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {selectedImage ? (
            <div className="image-wrapper">
              <img
                src={selectedImage}
                alt="Imagen seleccionada"
                className="uploaded-image"
              />
              {isHovered && (
                <div className="image-hover">
                  <button onClick={handleRemoveImage} className="icon-button">
                    🗑️
                  </button>
                  <button onClick={handlePreview} className="icon-button">
                    🔍
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Title level={5} style={{ color: "#aaa", paddingBottom: "20px" }}>
              {isDragging
                ? "Suelta la imagen aquí"
                : "Click para seleccionar imagen o arrastra una imagen"}
            </Title>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
}

export default ImagenUpload;
