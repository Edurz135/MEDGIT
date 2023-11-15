import React, { useState } from "react";
import { Layout, Button } from "antd";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import { MainPage } from "../../pages";
import { LocalStorageServices } from "../../../services";
import { LogoutOutlined, UserOutlined,  MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
export default function LayoutBase({
  userType,
  tabsData,
  handlePerfilClick,
  perfilPageComponent,
  defaultPath,
}) {
  const navigate = useNavigate();
  const [currentPageUrl, setCurrentPageUrl] = useState(`/auth/${userType}${defaultPath}`);

  const handleLogOutInClick = () => {
    setCurrentPageUrl(window.location.pathname);
    LocalStorageServices.SetData("isLoggedIn", "false");
    LocalStorageServices.SetData("accessToken", "");
    window.location.href = "/";
  };

  const { Header, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);

  const routes = tabsData.map((tab) => (
    <Route key={tab.index} path={`/${tab.url}`} element={tab.component} />
  ));

  return (
    <Layout className="barra-container">
      <Sidebar
        tabsData={tabsData}
        logoutItems={[{ icon: <LogoutOutlined />, component: <MainPage />, onClick: handleLogOutInClick, label: "Salir" }]}
        handleLogOutInClick={handleLogOutInClick}
        handlePerfilClick={handlePerfilClick}
        collapsed={collapsed}
      />

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
          <span>{`Bienvenido, ${userType}`}</span>
        </Header>

        <Content className="contenido">
          <Routes>
            {routes}
            <Route path="/perfil" element={perfilPageComponent} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}