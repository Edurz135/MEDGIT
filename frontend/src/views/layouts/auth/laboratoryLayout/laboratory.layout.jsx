import React, { useState } from 'react';
import "./laboratory.layout.style.css";
import { Typography } from 'antd';
import {
    HomeOutlined,
    FolderOpenOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons';


import { Layout, Menu, Button, theme } from 'antd';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

import { LaboratoryMainPage, LaboratoryExamenPage, LaboratoryPerfilPage } from '../../../pages';
import { MainPage } from '../../../pages';

export default function DoctorLayout() {
    const navigate = useNavigate();

    const [currentPageUrl, setCurrentPageUrl] = useState('/auth/laboratory/inicio');

    const handleLogOutInClick = () => {
         setCurrentPageUrl(window.location.pathname);
         window.location.href = '/';
    };

    const handlePerfilClick = () => {
        navigate('/auth/laboratory/perfil'); 
    };
    
    const tabsData = [
        {
            index: 0,
            icon: <HomeOutlined />,
            component: <LaboratoryMainPage />,
            label: 'Inicio',
            url: "inicio",
        },
        {
            index: 1,
            icon: <FolderOpenOutlined />,
            component: <LaboratoryExamenPage />,
            label: 'Examenes',
            url: "examenes",
        },
    ];

    const logoutItems = [
        {
            index: 3,
            icon: <LogoutOutlined />,
            component: <MainPage />,
            onClick: handleLogOutInClick,
        },
    ];


    const { Header, Sider, Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout className="barra-container">
            <Sider collapsed={!collapsed} className="barra-lateral" style={{ background: 'white' }}>
                <div className="menu">
                    <Typography.Title level={1} style={{ color: 'darkblue', fontSize: '30px', textAlign: 'center' }}>
                        M
                    </Typography.Title>

                    {/* menú para opciones principales */}
                    <Menu
                        mode="inline" defaultSelectedKeys={['0']} className="menu-container">
                        {tabsData.map((tab) => (
                            <Menu.Item key={tab.index}>
                                <Link to={`/auth/laboratory/${tab.url}`}></Link>
                                {tab.icon}
                                <span>{tab.label}</span>
                            </Menu.Item>
                        ))}
                    </Menu>

                    {/*LogOut*/}
                    <Menu mode="inline" className="menu-container2">
                        {logoutItems.map((logout) => (
                            <Menu.Item key={logout.index} onClick={logout.onClick}>
                                {logout.icon}
                                <span>{logout.label}</span>
                            </Menu.Item>
                        ))}
                    </Menu>


                </div>
            </Sider>

            <Layout>
                <Header className="encabezado">
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <Button className="botonPerfil" onClick={handlePerfilClick}>
                        <UserOutlined className="menu-container" />
                    </Button>
                    <span>Bienvenido, Laboratorio 1!  </span>
                </Header>

                <Content className="contenido">
                    <Routes>
                        {tabsData.map((tab) => (
                            <Route key={tab.index} path={`/${tab.url}`} element={tab.component} />
                        ))}
                        <Route path="/perfil" element={<LaboratoryPerfilPage />} />
                         
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
}
