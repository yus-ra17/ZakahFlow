import { ReactNode } from "react";
import { Navigate } from "@tanstack/react-router";

const DistributorRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;
  return <>{children}</>;
};

export default DistributorRoute;
