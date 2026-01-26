import { ReactNode } from "react";
import { Navigate } from "@tanstack/react-router";

interface User {
  id: string;
  email: string;
  role: "SUPERADMIN" | "ADMIN" | "USER";
}

interface Props {
  children: ReactNode;
}

const AdminRoute = ({ children }: Props) => {
  const userString = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  // Not logged in
  if (!userString || !token) {
    return <Navigate to="/login" />;
  }

  let user: User;

  try {
    user = JSON.parse(userString);
  } catch {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }

  // Only allow ADMIN
  if (user.role !== "ADMIN") {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default AdminRoute;
