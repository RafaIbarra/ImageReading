import React, { useState,useEffect } from 'react';
import {Form,Input} from 'antd';
import './ResultadoFrontal.css'
  const { TextArea } = Input;

const ResultadoFrontal = ({datafrontal}) => {
    const [componentSize, setComponentSize] = useState("small");
    // const [componentSize, setComponentSize] = useState("default");
    const onFormLayoutChange = ({ size }) => {setComponentSize(size);};
    const [texto,setTexto]=useState('')
    const [nombres,setNombres]=useState('')
    const [apellidos,setApellidos]=useState('')
    const [nacimiento,setNacimiento]=useState('')
    const [vencimiento,setVencimiento]=useState('')
    const [datosvalidos,setDatosvalidos]=useState(false)
    const [sexo,setSexo]=useState('')
  
    useEffect(() => {
        
        const cargardatos =   () => {
            
            if(datafrontal && Object.keys(datafrontal).length>0) {

                
                setTexto(datafrontal['Texto Original'])
                setNombres(datafrontal['valores'].Nombres)
                setApellidos(datafrontal['valores'].Apellidos)
                setNacimiento(datafrontal['valores']['Fecha Nacimiento'])
                setVencimiento(datafrontal['valores']['Fecha Vencimiento'])
                setSexo(datafrontal['valores'].Sexo)
                setDatosvalidos(true)
                
            }
          
          
        };
    
        cargardatos();
      }, [datafrontal]);

return (
    <div 
    style={{height:'100%' ,overflowY:'auto',paddingLeft:'10px',paddingRight:'10px'}}

    >
        <Form
            
           layout="horizontal"
        // layout="vertical"
           initialValues={{
            size: "small",
            //  size: "default",
           }}
           size={"small"}
           variant="filled"
           
           
              
        >

            <Form.Item label="Texto extraido" style={{marginTop:'10px',marginBottom:20}} >
                <TextArea  value={texto}  readOnly size="small"/>
            </Form.Item>
            <Form.Item label="Nombres" style={{marginBottom:20}}>
                <Input value={nombres}  readOnly size="small"/>
            </Form.Item>
            <Form.Item label="Apellidos" style={{marginBottom:20}}>
                <Input value={apellidos}  readOnly size="small"/>
            </Form.Item>
            <Form.Item label="Fecha Nacimiento" style={{marginBottom:20}} >
                <Input value={nacimiento}  readOnly size="small"/>
            </Form.Item>
            <Form.Item label="Fecha Vencimiento Documento" style={{marginBottom:20}}>
                <Input value={vencimiento}  readOnly size="small"/>
            </Form.Item>
            <Form.Item label="Sexo" style={{marginBottom:0}}>
                <Input value={sexo}  readOnly size="small"/>
            </Form.Item>
        </Form>







    </div>

   
  );
}


export default ResultadoFrontal;
