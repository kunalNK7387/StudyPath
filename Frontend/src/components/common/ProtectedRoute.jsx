import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useApp } from "../../context/AppContext.jsx";

export const ProtectedRoute = ({ children }) => {
  const { user } = useApp();
  const location = useLocation();

  if (!user || !user.isAuthenticated) {
    // Preserve intended destination path so user returns there after signing in
    return (
      <Navigate
        to="/login"
        state={{ from: location, reason: "protected" }}
        replace
      />
    );
  }

  return children;
};
