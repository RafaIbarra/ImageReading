import React, {useEffect, useState} from 'react';
import {  Spin } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import './aguardandorespuesta.css'

const { Title } = Typography;
function AguardandoRespuesta(){
    return(
        <div className='oscurecer-contenido-respuesta'> 
               <Spin
                   
                   indicator={
                     <SyncOutlined
                       style={{
                         fontSize: 50,
        
                        color:'Highlight',
                         fontWeight:'bold'
                         ,
                       }}
                       spin
                     />
                   }
                 />
                {/* <p style={{fontWeight:'bold'}} > Procesando </p> */}
                <Title level={5} style={{color:'white',paddingBottom:'20px'}}>Procesando</Title>
             </div>
    )
} 

export default AguardandoRespuesta