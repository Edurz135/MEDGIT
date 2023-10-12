import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { LocalStorageServices } from "../../services";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = LocalStorageServices.GetData("isLoggedIn");
  let location = useLocation();
  
  if (isLoggedIn == "false") {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
