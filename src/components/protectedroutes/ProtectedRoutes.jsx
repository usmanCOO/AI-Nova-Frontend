import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = (WrappedComponent) => {
  const Wraper = () => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem("access_token");
    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/");
      }
    }, [!isAuthenticated]);
    if (!isAuthenticated) {
      return null;
    }
    return <WrappedComponent />;
  };
  return Wraper;
};

export default ProtectedRoutes;
