// src/components/DistributorRoute.tsx
import { ReactNode } from "react";
import { Navigate } from "@tanstack/react-router";

interface User {
  id: string;
  email: string;
  role: "SUPERADMIN" | "ADMIN" | "DISTRIBUTOR" | "DONOR";
}

interface Props {
  children: ReactNode;
}

const DistributorRoute = ({ children }: Props) => {
  const userString = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  if (!userString || !token) {
    // Not logged in
    return <Navigate to="/login" />;
  }

  let user: User;

  try {
    user = JSON.parse(userString);
  } catch {
    // Corrupted localStorage, clear it
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }

  if (user.role.toUpperCase() !== "DISTRIBUTOR") {
    // Not a distributor
    return <Navigate to="/login" />;
  }

  // User is a distributor, allow access
  return <>{children}</>;
};

export default DistributorRoute;
