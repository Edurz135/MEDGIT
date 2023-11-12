import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../../pages/loginPage/loginPage";
import RegisterPage from "../../pages/registerPage/registerPage";
import MainPage from "../../pages/mainPage/MainPage";
import PatientLayout from "../auth/patient.layout";
import DoctorLayout from "../auth/doctor.layout";
import LaboratoryLayout from "../auth/laboratory.layout";

export default function UnauthorizedLayout() {
  return (
      <Routes>
        <Route path="" element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="auth/patient/inicio" element={<PatientLayout/>}/>
        <Route path="auth/doctor/inicio" element={<DoctorLayout/>}/>
        <Route path="auth/laboratory/inicio" element={<LaboratoryLayout/>}/>
        <Route path="*" element={<Navigate replace to={""} />} />
        
      </Routes>
  );
}
