import React from "react";
import {
  DoctorMainPage,
  DoctorCitasPage,
  DoctorHistorialPage,
  DoctorPerfilPage,
  DoctorAvalabilityPage,
} from "../../pages";
import {
  HomeOutlined,
  FolderOpenOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
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
      component: <DoctorMainPage />,
      label: "Inicio",
      url: "inicio",
      hidden: false,
    },
    
    {
      index: 1,
      icon: <FolderOpenOutlined />,
      component: <DoctorCitasPage />,
      label: "Citas",
      url: "citas",
      hidden: false,
    },
    {
      index: 2,
      icon: <ReadOutlined />,
      component: <DoctorHistorialPage />,
      label: "Historial clinico",
      url: "historialClinico",
      hidden: false,
    },
    {
      index: 3,
      component: <DoctorAvalabilityPage />,
      url: "availability",
      hidden: true,
    },
    
  ];

  const handlePerfilClick = () => {
    navigate("/auth/doctor/perfil");
  };

  return (
    <LayoutBase
      userType="doctor"
      tabsData={tabsData}
      handlePerfilClick={handlePerfilClick}
      perfilPageComponent={<DoctorPerfilPage />}
      defaultPath="/inicio"
    >
      <Sidebar tabsData={tabsData} handleLogOutInClick={handleLogOutInClick} />
    </LayoutBase>
  );
}