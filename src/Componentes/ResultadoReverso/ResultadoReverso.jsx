import React, { useState,useEffect } from 'react';
import {Form,Input} from 'antd';
import './ResultadoReverso.css'
  const { TextArea } = Input;

const ResultadoReverso = ({datareverso}) => {
    const [texto,setTexto]=useState('')
    const [textoanalizado,setTextoanalizado]=useState('')
    const [nombres,setNombres]=useState('')
    const [apellidos,setApellidos]=useState('')
    const [nacimiento,setNacimiento]=useState('')
    const [vencimiento,setVencimiento]=useState('')
    const [sexo,setSexo]=useState('')
    const [cedula,setCedula]=useState('')
    const [opcion,setOpcion]=useState('')
    const [datosvalidos,setDatosvalidos]=useState(false)

  
    useEffect(() => {
        
        const cargardatos =   () => {
            
            if(datareverso && Object.keys(datareverso).length>0) {

                
                setTexto(datareverso['Texto Original'])
                setTextoanalizado(datareverso['datos'])
                setNombres(datareverso['valores'].Nombres)
                setApellidos(datareverso['valores'].Apellidos)
                setNacimiento(datareverso['valores']['Fecha Nacimiento'])
                setVencimiento(datareverso['valores']['Fecha Vencimiento'])
                setSexo(datareverso['valores'].Sexo)
                setCedula(datareverso['valores']['Numero Cedula'])
                setOpcion(datareverso['valores']['tipo_opcion'])
                // setDatosvalidos(true)
                
            }
          
          
        };
    
        cargardatos();
      }, [datareverso]);

return (
    <div className="resultado-contenido">
        <div className="columna-izquierda">
            <Form.Item label="Texto extraido" style={{marginTop:'10px'}}>
            <TextArea value={texto} readOnly size="small"/>
            </Form.Item>
            <Form.Item label="Texto Analizado">
            <TextArea value={textoanalizado} readOnly size="small"/>
            </Form.Item>
        </div>
        <div className="columna-derecha">
            <Form
            layout="horizontal"
            initialValues={{
             size: "small",
             //  size: "default",
            }}
            size={"small"}
            variant="filled"
            >

                <Form.Item label="Nombres" style={{marginTop:'10px',marginBottom:20}}>
                    <Input value={nombres} readOnly size="small"/>
                </Form.Item>
                <Form.Item label="Apellidos" style={{marginBottom:20}}>
                    <Input value={apellidos} readOnly size="small"/>
                </Form.Item>
                <Form.Item label="N° Cedula" style={{marginBottom:20}}>
                    <Input value={cedula} readOnly size="small"/>
                </Form.Item>
                <Form.Item label="Fecha Nacimiento" style={{marginBottom:20}}>
                    <Input value={nacimiento} readOnly size="small"/>
                </Form.Item>
                <Form.Item label="Fecha Vencimiento Documento" style={{marginBottom:20}}>
                <Input value={vencimiento} readOnly size="small"/>
                </Form.Item>
                <Form.Item label="Sexo"style={{marginBottom:10}}>
                    <Input value={sexo} readOnly size="small"/>
                </Form.Item>
                <Form.Item label="Opcion Extraccion"style={{marginBottom:5}}>
                    <Input value={opcion} readOnly size="small"/>
                </Form.Item>
            </Form>
        </div>
    </div>


   
  );
}


export default ResultadoReverso;
