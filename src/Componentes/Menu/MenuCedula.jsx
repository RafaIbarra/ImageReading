import React, { useState, useEffect } from 'react';
import { CheckOutlined,HistoryOutlined,DeleteFilled,FileAddFilled } from '@ant-design/icons';
import { Menu } from 'antd';
import './menu.css'
function MenuCedula({recargamenu
  ,sel_item
  ,new_item
  ,click_menu
  ,registro_seleccionado
  ,setOpenmodaleliminar
  ,setCurrentmenu
  ,currentmenu
}) {
  const [theme, setTheme] = useState('dark');
  // const [current, setCurrent] = useState('1');
  const [registros, setRegistros] = useState([]);
  const [openKeys, setOpenKeys] = useState(['historial-title']);
  
  // Leer los registros del localStorage al montar el componente
  useEffect(() => {
    const registrosAlmacenados = JSON.parse(localStorage.getItem('registros')) || [];
    setRegistros(registrosAlmacenados);
  }, [recargamenu]);


  // const eliminacion_registros_storage= ()=>{
  //   localStorage.removeItem('registros');
  //         const registrosAlmacenados = JSON.parse(localStorage.getItem('registros')) || [];
  //         setRegistros(registrosAlmacenados);
  //         new_item();
  // }




  const onClick = (e) => {
    
    setCurrentmenu(e.key);
    // click_menu()
    if (e.key.startsWith('registro-')) {
      click_menu()
      // Extraer el índice del registro
      const index = parseInt(e.key.split('-')[1]) - 2; // -2 porque los primeros dos keys son fijos

      // Obtener el registro correspondiente
      const registroSeleccionado = registros[index];

      // Mostrar el registro en la consola
      
      registro_seleccionado(registroSeleccionado)
      sel_item()
  }else{
    
        if (e.key === 'delete') {
          
          setOpenmodaleliminar(true)
        } else{
          click_menu()
          new_item();
        }

        



    
  }
  };


  const itemsmenu = [
    {
      key: '1',
      icon: <FileAddFilled />,
      label: 'Nuevo',
    },
    {
      key: 'historial-title',
      icon: <HistoryOutlined />,
      label: 'Historial',
      children: registros.map((registro, index) => ({
        key: `registro-${index + 2}`, // Clave única para cada registro
        label: `Registro ${registro.numeroregistro}`, // Muestra el número de registro
        icon: <CheckOutlined />,
      })),
    },
    {
      key: 'delete',
      icon: <DeleteFilled />,
      label: 'Eliminar Historial',
    },
  ];

  return (
    
      <Menu
        theme={theme}
        onClick={onClick}
        style={{
          width: 256,
        }}
        selectedKeys={[currentmenu]}
        mode="inline"
        items={itemsmenu}
        openKeys={openKeys}
      />
        
    
  );
}

export default MenuCedula;
