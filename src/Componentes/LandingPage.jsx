import React,{useState,useEffect} from "react";
import { Navigate, useNavigate } from "react-router-dom"

import { Button  } from 'antd';
import './landingpage.css'
function LandigPage(){
    const navigate=useNavigate()
    
    const iniciosesion=()=>{
        navigate('/CargaImagen')
    }
    const registrarse=()=>{
        
        navigate('/Registro')
    }
    
    return(
        <div className="landing">
            <div className="landing-menu" >
                <div style={{paddingTop:'10px',paddingLeft:'80%'}}>
                    <div style={{display:'inline-block',paddingRight:'10px'}}>

                        <Button  type='primary'  className="landing-botones" onClick={iniciosesion}>Cargar imagen de cedulas</Button>
                    </div>
                    <div style={{display:'inline-block'}}>

                        <Button type='primary'className="landing-botones" onClick={registrarse}>Registrarse </Button>
                    </div>
                </div>
            </div>
            
            


        </div>
    )
}
export default LandigPage