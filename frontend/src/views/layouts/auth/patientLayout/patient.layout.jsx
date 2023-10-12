import React, { useState } from "react";
import "./patient.layout.style.css";
import { Typography } from "antd";
import {
  HomeOutlined,
  FolderOpenOutlined,
  ReadOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Layout, Menu, Button, theme } from "antd";
import { Routes, Route, Link, useNavigate } from "react-router-dom"; // Importa useNavigate

import {
  PatientMainPage,
  PatientCitasPage,
  PatientHistorialPage,
  PatientPerfilPage,
} from "../../../pages";
import { MainPage } from "../../../pages";
import { LocalStorageServices } from "../../../../services";

export default function PatientLayout() {
  // Utiliza useNavigate para obtener la función de navegación
  const navigate = useNavigate();

  //const [currentTabIndex, setCurrentTabIndex] = useState(0);

  // Mantén un estado para la URL de la página actual
  const [currentPageUrl, setCurrentPageUrl] = useState("/auth/patient/inicio");

  const handleLogOutInClick = () => {
    // Al hacer clic en "Logout", almacena la URL de la página actual
    setCurrentPageUrl(window.location.pathname);
    LocalStorageServices.SetData("isLoggedIn", "false");
    LocalStorageServices.SetData("accessToken", "");
    // Luego redirige a la página de inicio de sesión o cualquier otra página de inicio que desees
    window.location.href = "/";
  };

  // Función para manejar el clic en el botón "Perfil"
  const handlePerfilClick = () => {
    navigate("/auth/patient/perfil"); // Ruta a la página de perfil
  };

  const tabsData = [
    {
      index: 0,
      icon: <HomeOutlined />,
      component: <PatientMainPage />,
      label: "Inicio",
      url: "inicio",
    },
    {
      index: 1,
      icon: <FolderOpenOutlined />,
      component: <PatientCitasPage />,
      label: "Citas",
      url: "citas",
    },
    {
      index: 2,
      icon: <ReadOutlined />,
      component: <PatientHistorialPage />,
      label: "Historial clinico",
      url: "historialClinico",
    },
  ];

  const logoutItems = [
    {
      index: 3,
      icon: <LogoutOutlined />,
      component: <MainPage />,
      onClick: handleLogOutInClick,
      label: "Salir",
    },
  ];

  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="barra-container">
      <Sider
        collapsed={!collapsed}
        className="barra-lateral"
        style={{ background: "white" }}
      >
        <div className="menu">
          <Typography.Title
            level={1}
            style={{ color: "darkblue", fontSize: "30px", textAlign: "center" }}
          >
            M
          </Typography.Title>

          {/* menú para opciones principales */}
          <Menu
            mode="inline"
            defaultSelectedKeys={["0"]}
            className="menu-container"
          >
            {tabsData.map((tab) => (
              <Menu.Item key={tab.index}>
                <Link to={`/auth/patient/${tab.url}`}></Link>
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
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Button className="botonPerfil" onClick={handlePerfilClick}>
            <UserOutlined className="menu-container" />
          </Button>
          <span>Bienvenido, Paciente 1! </span>
        </Header>

        <Content className="contenido">
          <Routes>
            {tabsData.map((tab) => (
              <Route
                key={tab.index}
                path={`/${tab.url}`}
                element={tab.component}
              />
            ))}
            <Route path="/perfil" element={<PatientPerfilPage />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}
