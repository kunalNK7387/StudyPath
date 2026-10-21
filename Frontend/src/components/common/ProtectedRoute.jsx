import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export const ProtectedRoute = ({ children }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  // Wait until the session check finishes
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Checking your login...</p>
      </div>
    );
  }

  // Redirect unauthenticated users to login
  if (!isAuthenticated || !user) {
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
