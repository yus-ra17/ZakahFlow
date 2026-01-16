"use client";

import { useState } from "react";
import { api } from "../api";
import { Link as RouterLink } from "@tanstack/react-router";
import styles from "./LoginPage.module.css"; // Reuse your login page styles

export function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    // Trim inputs and validate
    if (!name.trim() || !email.trim() || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      // Connect to backend /auth/register
      await api.post("/auth/register", {
        name: name.trim(),
        email: email.trim(),
        password,
      });

      alert("Account created successfully. Please login.");
      window.location.href = "/login"; // Redirect to login page
    } catch (err: any) {
      // Show backend error or fallback
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.middleCard}>
        {/* LEFT IMAGE */}
        <div className={styles.left}>
          <img
            src="/assets/images/download (13).jpeg"
            className={styles.sideImage}
            alt="Register"
          />
        </div>

        {/* RIGHT FORM */}
        <form
          className={styles.formBox}
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          {/* Register Title */}
          <h2 className={styles.CreateTitle}>Create Account</h2>

          {/* Error */}
          {error && <p className={styles.error}>{error}</p>}

          {/* Name */}
          <div className={styles.inputWrapper}>
            <input
              className={styles.inputField}
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className={styles.inputWrapper}>
            <input
              className={styles.inputField}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className={styles.inputWrapper}>
            <input
              className={styles.inputField}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Register Button */}
          <button
            className={styles.button}
            type="submit"
            style={{ fontWeight: 700 }}
          >
            Register
          </button>

          {/* Link to Login */}
          <p className={styles.registerText} style={{ marginTop: "1rem" }}>
            Already have an account?
            <RouterLink to="/login" className={styles.registerLink}>
              Login
            </RouterLink>
          </p>
        </form>
      </div>
    </div>
  );
}
