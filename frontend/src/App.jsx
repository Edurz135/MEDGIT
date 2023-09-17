import React from "react";
import { Routes, Route } from "react-router-dom";
import UnauthorizedLayout from "./views/layouts/unauthorized/unauthorized.layout";

export default function App() {
  return (
    <Routes>
      <Route path="/*" element={<UnauthorizedLayout />} />
    </Routes>
  );
}
