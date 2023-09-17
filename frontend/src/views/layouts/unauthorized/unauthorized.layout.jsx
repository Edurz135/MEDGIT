import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../../pages/loginPage/loginPage";
import RegisterPage from "../../pages/registerPage/registerPage";
import MainPage from "../../pages/mainPage/MainPage";

export default function UnauthorizedLayout() {
  return (
      <Routes>
        <Route path="" element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate replace to={""} />} />
      </Routes>
  );
}
