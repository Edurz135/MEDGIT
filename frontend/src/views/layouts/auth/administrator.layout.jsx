import React from "react";
import { AdministratorMainPage, AdministratorDataIngestion } from "../../pages";
import { HomeOutlined, DatabaseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import LayoutBase from "./layoutBase";
import Sidebar from "./sidebar"; // Importa el componente Sidebar
import { LocalStorageServices } from "../../../services";
import "./estiloLayout.css";

export default function AdministratorLayout() {
  const navigate = useNavigate();

  // Declara la función handleLogOutInClick antes de usarla
  const handleLogOutInClick = () => {
    LocalStorageServices.SetData("isLoggedIn", "false");
    LocalStorageServices.SetData("accessToken", "");
    window.location.href = "/";
  };

  const tabsData = [
    {
      index: 0,
      icon: <HomeOutlined />,
      component: <AdministratorMainPage />,
      label: "Inicio",
      url: "inicio",
      hidden: false,
    },
    {
      index: 1,
      icon: <DatabaseOutlined />,
      component: <AdministratorDataIngestion />,
      label: "Carga Masiva",
      url: "dataIngestion",
      hidden: false,
    },
  ];

  const handlePerfilClick = () => {
    navigate("/auth/patient/perfil");
  };

  return (
    <LayoutBase
      userType="Administrator"
      tabsData={tabsData}
      handlePerfilClick={handlePerfilClick}
      perfilPageComponent={<></>}
      defaultPath="/inicio"
    >
      <Sidebar tabsData={tabsData} handleLogOutInClick={handleLogOutInClick} />
    </LayoutBase>
  );
}
