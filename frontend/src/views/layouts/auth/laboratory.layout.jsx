import React from "react";
import {LaboratoryMainPage, LaboratoryExamenPage, LaboratoryPerfilPage, } from "../../pages";
import {HomeOutlined,FolderOpenOutlined } from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import LayoutBase from "./layoutBase";
import Sidebar from "./sidebar"; // Importa el componente Sidebar
import { LocalStorageServices } from "../../../services";
import "./estiloLayout.css";

export default function PatientLayout() {
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
      component: <LaboratoryMainPage />,
      label: "Inicio",
      url: "inicio",
    },
    {
      index: 1,
      icon: <FolderOpenOutlined />,
      component: <LaboratoryExamenPage />,
      label: "Examenes",
      url: "examenes",
    },
    
  ];

  const handlePerfilClick = () => {
    navigate("/auth/laboratory/perfil");
  };

  return (
    <LayoutBase
      userType="laboratory"
      tabsData={tabsData}
      handlePerfilClick={handlePerfilClick}
      perfilPageComponent={<LaboratoryPerfilPage />}
      defaultPath="/inicio"
    >
      <Sidebar tabsData={tabsData} handleLogOutInClick={handleLogOutInClick} />
    </LayoutBase>
  );
}