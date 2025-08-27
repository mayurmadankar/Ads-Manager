import React from "react";
import { useLocation, Navigate } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, children }) => {
  const location = useLocation();

  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    } else {
      return <Navigate to="/ads/dashboard" />;
    }
  }
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    return <Navigate to="/ads/dashboard" />;
  }
  return <>{children}</>;
};

export default CheckAuth;
