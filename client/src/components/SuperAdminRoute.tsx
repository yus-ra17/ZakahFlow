import { ReactNode } from "react";
import { Navigate } from "@tanstack/react-router";

const SuperAdminRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;
  return <>{children}</>;
};

export default SuperAdminRoute;
