import React,{useState,useEffect} from "react";
import { Routes, Route, Navigate,useNavigate,HashRouter  } from 'react-router-dom'; 
import SeleccionarImg from "../Componentes/SeleccionarImg";
import MenuLateral from "../Componentes/Menu/MenuLateral";
import LandigPage from "../Componentes/LandingPage";

import MenuCedula from "../Componentes/Menu/MenuCedula";
function App (){
    const [recargamenu,setRecargamenu]=useState(false)
    const [seleccionitem,setSeleccionitem]=useState(false)
    const [clickmenu,setClickmenu]=useState(false)
    const [datomenuseleccionado,setDatomenuseleccionado]=useState([])
    const [openmodaleliminar,setOpenmodaleliminar]=useState(false)
    const [currentmenu,setCurrentmenu]=useState('1')
    const [botonovisible,setBotonvisible]=useState(true)

    const [imgfrontal, setImgfrontal] = useState();
    const [imgreverso, setImgreverso] = useState();
    

    const agrega_img_frontal=(valor)=>{
      setImgfrontal(valor)
      
    }
    const agrega_img_reverso=(valor)=>{
      setImgreverso(valor)
      
    }

    const eliminacion_registros_storage= ()=>{
      localStorage.removeItem('registros');
            
            setOpenmodaleliminar(false)
            setRecargamenu(!recargamenu);
            click_menu()
            new_item();
            setCurrentmenu('1')
            setBotonvisible(true)
            
            
    }
    const realizarrecarga=()=>{
      setRecargamenu(!recargamenu)
    }

    const sel_item=()=>{
      setSeleccionitem(true)
      setBotonvisible(false)
    }

    const new_item=()=>{
      setSeleccionitem(false)
      setBotonvisible(true)
      agrega_img_frontal(null)
      agrega_img_reverso(null)
    }
    const click_menu=()=>{
      setClickmenu(!clickmenu)
    }

    const registro_seleccionado=(datocompleto)=>{
      // const frontal_sel=datocompleto['frontal']
      
      setDatomenuseleccionado(datocompleto)
    }

    return(
      <HashRouter>
      <div style={{ display: 'flex', height: '97.7vh', overflow: 'hidden' }}> 
        {/* Asegúrate de que todo ocupe el 100% de la altura y que no haya overflow en este contenedor */}
        
        {/* <MenuLateral style={{ width: '250px', minWidth: '250px', height: '100%' }} /> */}
        <MenuCedula style={{ width: '250px', minWidth: '250px', height: '100%' }} 
              recargamenu={recargamenu}
              sel_item={sel_item}
              new_item={new_item}
              click_menu={click_menu}
              registro_seleccionado={registro_seleccionado}
              setOpenmodaleliminar={setOpenmodaleliminar}
              setCurrentmenu={setCurrentmenu}
              currentmenu={currentmenu}
          ></MenuCedula>

        {/* Contenido principal con overflow auto para permitir scroll cuando sea necesario */}
        <div style={{ flex: 1, padding: '5px', gap: '1px', overflowY: 'auto' }}>
          <Routes>
            <Route path="/" element={<LandigPage/>} />
            <Route path="/CargaImagen" element={<SeleccionarImg realizarrecarga={realizarrecarga} seleccionitem={seleccionitem} clickmenu={clickmenu} 
                                                      datomenuseleccionado={datomenuseleccionado} 
                                                      openmodaleliminar={openmodaleliminar}
                                                      setOpenmodaleliminar={setOpenmodaleliminar}
                                                      eliminacion_registros_storage={eliminacion_registros_storage}
                                                      botonovisible={botonovisible}
                                                      setCurrentmenu={setCurrentmenu}
                                                      imgfrontal={imgfrontal}
                                                      agrega_img_frontal={agrega_img_frontal}
                                                      imgreverso={imgreverso}
                                                      agrega_img_reverso={agrega_img_reverso}
                                                      
             ></SeleccionarImg> } />
          </Routes>
        </div>
      </div>
    </HashRouter>
    )
}
export default App;