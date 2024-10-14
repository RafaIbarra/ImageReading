import React, { Children, useState } from 'react';
import { PieChartOutlined,AppstoreOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
// import './MenuLateral.css'
const items = [
  {
    key: '1',
    icon: <PieChartOutlined />,
    label: 'Nuevo',
  },
  {
    key: 'historial-title', // Esto es el título sin dropdown
    label: 'Historial', // El título de la sección
    type: 'group', 
    children:[
      {
        key: '5',
        label: 'Option 1',
      },
      {
        key: '2',
        label: 'Option 2',
      },
      {
        key: '3',
        label: 'Option 3',
      },
      {
        key: '4',
        label: 'Option 4',
      },
    ]
  },
  
    {
      key: '6',
      icon: <AppstoreOutlined />,
      label: 'prueba',
      children:[
        {
          key: '7',
          label: 'Option 7',
          icon: <AppstoreOutlined />,
        },
        {
          key: '8',
          label: 'Option 8',
        },
       
      ]
    },
  
 
];

function MenuLateral() {
  const [theme, setTheme] = useState('dark');
  const [current, setCurrent] = useState('1');
  const [openKeys, setOpenKeys] = useState(['6']);
  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };

  const onClick = (e) => {
    
    setCurrent(e.key);
  };

  return (
    <Menu
      theme={theme}
      onClick={onClick}
      style={{
        width: 256,
      }}
      selectedKeys={[current]}
      mode="inline"
      items={items}
      openKeys={openKeys}
    />
  );
}

export default MenuLateral;
