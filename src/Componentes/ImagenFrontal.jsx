import React, { useState, useRef,useEffect } from 'react';
import './costum.css'
import { Typography,notification } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
const { Title } = Typography;

function ImagenFrontal ({agrega_img_frontal
    ,seleccionitem
    ,clickmenu
    ,datomenuseleccionado
    ,limpiar_resultado_frontal
  })  {

  const [selectedImage, setSelectedImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef(null);

  const mostrarmensajeerror = (placement,mensaje) => {
    api.open({
        message: 'ERROR',
        description: ` ${mensaje}`,
        placement,
        icon: (<WarningOutlined style={{color: 'red',}}/>
        ),
        });
    };
  const [api, contextHolder] = notification.useNotification();


  const handleImageChange = (event) => {
   
    const file = event.target.files[0];
    
  
    if (file) {
      // Validar el tipo de archivo
      if (!file.type.startsWith('image/')) {
        mostrarmensajeerror('top', 'Solo se permiten archivos de imagen');
        
        // Restablecer el valor del input para permitir seleccionar el mismo archivo otra vez
        event.target.value = null; 
        return;
      }
  
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        agrega_img_frontal(file, file.name);
      };
      reader.readAsDataURL(file);
  
      // Restablecer el valor del input para permitir seleccionar el mismo archivo otra vez
      event.target.value = null; 
    }
  }

  const handleRemoveImage = (event) => {
    event.stopPropagation();
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // Limpia el input
      limpiar_resultado_frontal()
      agrega_img_frontal(null)
      
        
  };
}

  const handlePreview = (event) => {
    event.stopPropagation();
    if (selectedImage) {
      const imageWindow = window.open();
      imageWindow.document.write(`<img src="${selectedImage}" style="max-width:100%; height:auto;" alt="Vista previa de la imagen">`);
    }
  };

  // Maneja el clic en el contenedor de la imagen
  const handleContainerClick = (event) => {
    // Solo abrir el cuadro de selección si no se hace clic en los iconos
    if (!event.target.closest('.image-hover')) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    
    if(!seleccionitem){
      setSelectedImage(null);
      fileInputRef.current.value = null
    }else{
      
      const imagenFrontalBase64 = datomenuseleccionado.frontal.datosarchivo.base64;
      setSelectedImage( imagenFrontalBase64);
      
    }
   
  }, [seleccionitem,clickmenu]);

  return (
    <div className="image-upload-wrapper">
        {contextHolder}

        <div className="image-upload-container">
            <div 
                className="image-upload-label" 
                onClick={handleContainerClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                >
                {selectedImage ? (
                    <div className="image-wrapper">
                    <img src={selectedImage} alt="Imagen seleccionada" className="uploaded-image" />
                    {isHovered && (
                        <div className="image-hover">
                        <button onClick={handleRemoveImage} className="icon-button ">🗑️</button>
                        <button onClick={handlePreview} className="icon-button ">🔍</button>

                        
                        </div>
                    )}
                    </div>
                ) : (
                    // <div className="placeholder-text">Seleccionar imagen</div>
                    <Title level={5} style={{color:'#aaa',paddingBottom:'20px'}}>Click para seleccionar imagen</Title>
                )}
            </div>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }} // Oculta el input para usar un cuadro personalizado
            />
        </div>
    </div>

  );
  };
  
  export default ImagenFrontal;