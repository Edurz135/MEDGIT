import React from "react";
import { Routes, Route } from "react-router-dom";
import UnauthorizedLayout from "./views/layouts/unauthorized/unauthorized.layout";
import { PatientLayout } from "./views/layouts";
import { DoctorLayout } from "./views/layouts";
import { LaboratoryLayout } from "./views/layouts";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route
        path="/auth/patient/*"
        element={
          <ProtectedRoute>
            <PatientLayout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/auth/doctor/*"
        element={
          <ProtectedRoute>
            <DoctorLayout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/auth/laboratory/*"
        element={
          <ProtectedRoute>
            <LaboratoryLayout />
          </ProtectedRoute>
        }
      />
      <Route path="/*" element={<UnauthorizedLayout />} />
    </Routes>
  );
}
