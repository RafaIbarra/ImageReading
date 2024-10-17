import { useState,useEffect } from 'react';
import { Typography,notification} from 'antd';
import ResultadoFrontal from './ResultadoFrontal/ResultadoFrontal';
import ResultadoReverso from './ResultadoReverso/ResultadoReverso';
import './Seleccionarimgv2.css'
import AguardandoRespuesta from './AguardandoRespuesta/AguardandoRespuesta';
import { WarningOutlined } from '@ant-design/icons';
import ModalEliminacion from './ModalEliminacion/ModalEliminacion';
import BotonStyle from './BotonStyle';
import ImagenUpload from './ImagenUpload';
import environment from '../environment.js'


const apiUrl = environment.apiUrl;
const { Title } = Typography;



function SeleccionarImg  ({realizarrecarga
  ,seleccionitem
  ,clickmenu
  ,datomenuseleccionado
  ,openmodaleliminar
  ,setOpenmodaleliminar
  ,eliminacion_registros_storage
  ,botonovisible
  ,setCurrentmenu

  ,imgfrontal
  ,agrega_img_frontal
  ,imgreverso
  ,agrega_img_reverso
  
}) {
  const [datafrontal,SetDatafrontal]=useState([])
  const [datareverso,SetDatareverso]=useState([])

  const [peticionresuelta,setPeticionresuelta]=useState(false)

 
  
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

  const handleSubmit = async () => {
    setPeticionresuelta(true)
    
    if (!imgfrontal || !imgreverso) {
      // console.error("Debe seleccionar ambas imágenes");
      // return;
      setPeticionresuelta(false)
      mostrarmensajeerror('top',"Debe seleccionar ambas imágenes")
    }else{

      const formData = new FormData();
      
      formData.append('imagen_anverso', imgfrontal); // Archivo seleccionado en ImagenFrontal
      formData.append('imagen_reverso', imgreverso); // Archivo seleccionado en ImagenReverso
  
      try {
        
        // const response = await fetch('http://127.0.0.1:8000/api/lectura-imagen/', {
        const endpoint='lectura-imagen/'
        // const endpoint='lectura-imagen-easy/'
        const response = await fetch(`${apiUrl}${endpoint}`, {
          method: 'POST',
          body: formData,
        });
        
        if (response.ok) {
          const data = await response.json();
          
          SetDatafrontal(data['anverso'])
          SetDatareverso(data['reverso'])
          saveToStorage(data, imgfrontal, imgreverso);
          setCurrentmenu('0')
          
          
        } else {
          
          const dataerror = await response.json();
          
          mostrarmensajeerror('top',dataerror['mensaje'])
        }
      } catch (error) {
        
        if (error.message === 'Failed to fetch') {
          
          mostrarmensajeerror('top','Error de conexión. Verifica que el servicio esté disponible.')
        } else {
          
          mostrarmensajeerror('top',error)
        }
      }
      setPeticionresuelta(false)
    }

  };
  


  const saveToStorage = async (data, imgfrontal, imgreverso) => {
    // Obtener los registros almacenados del localStorage
    let registros = JSON.parse(localStorage.getItem('registros')) || [];

    // Función para calcular el tamaño total en bytes de los registros
    const calculateTotalSize = (registros) => {
        let totalSize = 0;
        registros.forEach((registro) => {
            const frontalBase64 = registro.frontal.datosarchivo.base64;
            const reversoBase64 = registro.reverso.datosarchivo.base64;
            totalSize += frontalBase64.length + reversoBase64.length;
        });
        return totalSize; // Tamaño total en bytes
    };

    // Verificar si el tamaño total más el nuevo registro supera los 5 MB (5 * 1024 * 1024 bytes)
    const newSize = imgfrontal.size + imgreverso.size; // Tamaño de las nuevas imágenes
    const maxStorageSize = 5 * 1024 * 1024; // 5 MB en bytes

    let totalSize = calculateTotalSize(registros); // Tamaño inicial

    // Si el tamaño total + nuevo registro > 5 MB, eliminar registros más antiguos
    while (totalSize + newSize > maxStorageSize) {
        // console.log('Se detecta el tamaño excedido, eliminando el registro más antiguo...');
        registros.shift(); // Eliminar el primer registro (el más antiguo)
        totalSize = calculateTotalSize(registros); // Recalcular el tamaño total después de eliminar un registro
    }

    // Determinar el numeroregistro
    const numeroregistro = registros.length === 0
        ? 1 // Si no hay registros, empezamos en 1
        : registros[registros.length - 1].numeroregistro + 1; // Si hay registros, sumamos 1 al último

    // Función para convertir el archivo a Base64
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result); // Devuelve el resultado en Base64
            };
            reader.onerror = reject; // Manejo de errores
            reader.readAsDataURL(file); // Lee el archivo como Data URL
        });
    };

    // Convertir ambas imágenes a Base64
    const imgFrontalBase64 = await convertToBase64(imgfrontal);
    const imgReversoBase64 = await convertToBase64(imgreverso);

    // Crear el nuevo registro
    const nuevoRegistro = {
        numeroregistro,
        frontal: {
            datosservisor: data.anverso, // Datos del servidor del anverso
            datosarchivo: {
                base64: imgFrontalBase64, // Guardar la imagen en Base64
                name: imgfrontal.name,
                size: imgfrontal.size,
                type: imgfrontal.type,
                lastModified: imgfrontal.lastModified
            }
        },
        reverso: {
            datosservisor: data.reverso, // Datos del servidor del reverso
            datosarchivo: {
                base64: imgReversoBase64, // Guardar la imagen en Base64
                name: imgreverso.name,
                size: imgreverso.size,
                type: imgreverso.type,
                lastModified: imgreverso.lastModified
            }
        }
    };

    // Agregar el nuevo registro al array de registros
    registros.push(nuevoRegistro);

    // Guardar el nuevo array de registros en el localStorage
    localStorage.setItem('registros', JSON.stringify(registros));
    realizarrecarga();
};


  const limpiar_resultado_frontal=()=>{
      const frontal_clean={
        mensaje:'',
        'Texto Original':'',
        valores:{Sexo:'',Nombres:'','Fecha Vencimiento':'','Fecha Nacimiento':'','Apellidos':''}
      }
      SetDatafrontal(frontal_clean)
  }

  const limpiar_resultado_reverso=()=>{
      const reverso_clean={
        Respuesta:'',
        'Texto Original':'',
        Tipo: "",
        datos:'',
        mensaje:'',
        valores:{ Apellidos: "",Estado: "",'Fecha Nacimiento': "",'Fecha Vencimiento': "",Nombres: "",'Numero Cedula': "",Sexo: ""}
      }
      SetDatareverso(reverso_clean)

  }
useEffect(() => {
  
  if(!seleccionitem){
   
    limpiar_resultado_frontal()
    limpiar_resultado_reverso()
  }else{
    
    SetDatafrontal(datomenuseleccionado['frontal']['datosservisor'])
    SetDatareverso(datomenuseleccionado['reverso']['datosservisor'])
  }
 
}, [seleccionitem,clickmenu]);


  return (
    <div className="image-selector-wrapper">
         {contextHolder}
        {/* Fila 1: Título Frontal */}
        <div className="title-container">
          {/* <p className="Titulo-frontal">IMAGEN FRONTAL</p> */}
          <Title level={5} style={{color:'white',paddingBottom:'20px'}}>IMAGEN FRONTAL</Title>
        </div>

        {/* Fila 2: Imagen Frontal + Resultado */}
        <div className="section">
          <div className="image-grid">
            <div>
              {/* <ImagenFrontal agrega_img_frontal={agrega_img_frontal} 
                              seleccionItem={seleccionitem} 
                              clickmenu={clickmenu} 
                              datomenuseleccionado={datomenuseleccionado} 
                              limpiar_resultado_frontal={limpiar_resultado_frontal}
              /> */}
              <ImagenUpload   agregarImagen={agrega_img_frontal}
                              seleccionItem={seleccionitem}
                              clickMenu={clickmenu}
                              datoMenuSeleccionado={datomenuseleccionado}
                              limpiarResultado={limpiar_resultado_frontal}
                              tipoImagen="frontal"
              />

            </div>
            <div className="resultado">
              <ResultadoFrontal datafrontal={datafrontal} seleccionitem={seleccionitem}/>
            </div>
          </div>
        </div>
              
        {/* Fila 3: Divider */}
        <div className="divider-container">
          <hr className="divider" />
        </div>

        {/* Fila 4: Título Reverso */}
        <div className="title-container">
          {/* <p className="Titulo-reverso">IMAGEN REVERSO</p> */}
          <Title level={5} style={{color:'white',paddingBottom:'20px'}}>IMAGEN REVERSO</Title>
        </div>

        {/* Fila 5: Imagen Reverso + Resultado */}
        <div className="section">
          <div className="image-grid">
            <div className="seccion-imagen">
              {/* <ImagenReverso agrega_img_reverso={agrega_img_reverso} 
                              seleccionitem={seleccionitem} 
                              clickmenu={clickmenu} 
                              datomenuseleccionado={datomenuseleccionado}
                              limpiar_resultado_reverso={limpiar_resultado_reverso}
              /> */}
              <ImagenUpload   agregarImagen={agrega_img_reverso}
                              seleccionItem={seleccionitem}
                              clickMenu={clickmenu}
                              datoMenuSeleccionado={datomenuseleccionado}
                              limpiarResultado={limpiar_resultado_reverso}
                              tipoImagen="reverso"
              />
            </div>
            <div className="resultado">
              <ResultadoReverso datareverso={datareverso} />
              
            </div>
          </div>
        </div>

        {/* Fila 6: Botón de procesar */}
        <div className="button-container">
          
          {/* {botonovisible && (<button onClick={handleSubmit}>PROCESAR</button>)} */}
          {botonovisible && (<BotonStyle handleSubmit={handleSubmit}></BotonStyle>)}
          


        </div>
        {openmodaleliminar &&(<ModalEliminacion openmodaleliminar={openmodaleliminar} 
                                                setOpenmodaleliminar={setOpenmodaleliminar}  
                                                eliminacion_registros_storage={eliminacion_registros_storage}
                                                setCurrentmenu={setCurrentmenu}
                                                />)}
        {peticionresuelta &&(
                <AguardandoRespuesta ></AguardandoRespuesta>
            )

            }

    </div>
   

   
  );
};

export default SeleccionarImg;
