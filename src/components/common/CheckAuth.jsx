import React from "react";
import { useLocation, Navigate } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, children }) => {
  const location = useLocation();

  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/register" />;
    } else {
      return <Navigate to="/dashboard" />;
    }
  }
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/register" />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    return <Navigate to="/dashboard" />;
  }
  return <>{children}</>;
};

export default CheckAuth;
