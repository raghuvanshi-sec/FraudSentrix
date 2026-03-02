import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="auth-container">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
