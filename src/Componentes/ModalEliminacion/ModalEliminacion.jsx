import React, { useState} from 'react';
import { Button, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';



function ModalEliminacion(
    {
        openmodaleliminar,
        setOpenmodaleliminar,
        eliminacion_registros_storage,
        setCurrentmenu
    }
){
    
    
    const [open, setOpen] = useState(openmodaleliminar);

    const showModal = () => {
        setOpen(true);
        setOpenmodaleliminar(false)
        };
    const handleOk = () => {
        setOpen(false);
        setOpenmodaleliminar(false)
        };
    const handleCancel = () => {
        setOpen(false);
        setOpenmodaleliminar(false)
        setCurrentmenu('0')
        
        };
        
    const closemodal=()=>{
        setOpenmodaleliminar(false)
        setCurrentmenu('0')
        
            
        }

    const eliminar= ()=>{
        eliminacion_registros_storage()
        setOpenmodaleliminar(false)
        }

    

    return(

        <Modal
        icon={<DeleteOutlined />}
        open={open}
        title={'ELIMINAR REGISTROS'}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null} // Anulamos el footer por defecto para personalizarlo
      >
        <p>¿Desea eliminar el historial de Registros?</p>
  
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px',marginTop:'40px' }}>
          <Button onClick={closemodal}>Cancelar</Button>
          <Button type="primary" onClick={eliminar}>Eliminar</Button>
        </div>
      </Modal>
        
    )


}

export default ModalEliminacion