import React from "react";
import {
  PatientMainPage,
  PatientCitasPage,
  PatientHistorialPage,
  PatientPerfilPage,
  PatientAppointmentBookingPage,
  AdministratorMainPage,
} from "../../pages";
import {
  HomeOutlined,
  FolderOpenOutlined,
  ReadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
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
