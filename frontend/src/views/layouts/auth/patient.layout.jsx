import React from "react";
import { PatientMainPage, PatientCitasPage, PatientHistorialPage, PatientPerfilPage, PatientAppointmentBookingPage } from "../../pages";
import { HomeOutlined, FolderOpenOutlined, ReadOutlined, SearchOutlined } from "@ant-design/icons";
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
    {
      index: 3,
      icon: <SearchOutlined />,
      component: <PatientAppointmentBookingPage />,
      label: "Reservar cita",
      url: "appointmentBooking",
    },
    
  ];

  const handlePerfilClick = () => {
    navigate("/auth/patient/perfil");
  };

  return (
    <LayoutBase
      userType="patient"
      tabsData={tabsData}
      handlePerfilClick={handlePerfilClick}
      perfilPageComponent={<PatientPerfilPage />}
      defaultPath="/inicio"
    >
      <Sidebar tabsData={tabsData} handleLogOutInClick={handleLogOutInClick} />
    </LayoutBase>
  );
}