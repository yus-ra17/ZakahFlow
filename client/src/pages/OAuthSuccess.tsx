import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

export function OAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      navigate({ to: "/login" });
      return;
    }

    localStorage.setItem("token", token);

    // Optional: decode token later if you want role-based routing
    navigate({ to: "/zakahcalculator" });
  }, [navigate]);

  return <p>Signing you in...</p>;
}
