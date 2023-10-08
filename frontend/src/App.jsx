import React from "react";
import { Routes, Route } from "react-router-dom";
import UnauthorizedLayout from "./views/layouts/unauthorized/unauthorized.layout";
import { PatientLayout } from "./views/layouts";
import { PatientPerfilPage } from "./views/pages";
import { DoctorLayout } from "./views/layouts";
import { DoctorPerfilPage } from "./views/pages";
import { LaboratoryLayout } from "./views/layouts";
import { LaboratoryPerfilPage } from "./views/pages";
import {MainPage} from "./views/pages";

export default function App() {
  return (
  
    <Routes>

      <Route path="/auth/patient/*" element={<PatientLayout />}>
        <Route path="perfil" element={<PatientPerfilPage />} />
    </Route>

    <Route path="/auth/doctor/*" element={<DoctorLayout />}>
        <Route path="perfil" element={<DoctorPerfilPage />} />
    </Route>

    <Route path="/auth/laboratory/*" element={<LaboratoryLayout />}>
        <Route path="perfil" element={<LaboratoryPerfilPage />} />
    </Route>

    <Route path="/mainPage" element={<MainPage />} />
    <Route path="/*" element={<UnauthorizedLayout />} />
</Routes>
  );
}
