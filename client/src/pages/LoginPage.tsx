"use client";

import { useState } from "react";
import { api } from "../api";
import { Link as RouterLink } from "@tanstack/react-router";
import styles from "./LoginPage.module.css";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      // Login route connected
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/zakahcalculator"; // Redirect to homepage after login
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  const handleGoogleLogin = () => {
    // Redirect to Google OAuth route
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div className={styles.container}>
      <div className={styles.middleCard}>
        {/* LEFT IMAGE */}
        <div className={styles.left}>
          <img
            src="/assets/images/download (13).jpeg"
            className={styles.sideImage}
            alt="Login"
          />
        </div>

        {/* RIGHT FORM */}
        <form
          className={styles.formBox}
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          {/* Welcome */}
          <div className={styles.formWelcomeBox}>
            <h1 className={styles.formWelcomeTitle}>Welcome Back!</h1>
            {/* <p className={styles.formWelcomeText}>
              Purify your soul <br />
              by giving zakah to those in need
            </p> */}
          </div>

          {/* Login Title */}
          <h2 className={styles.loginTitle}>Login</h2>

          {/* Error */}
          {error && <p className={styles.error}>{error}</p>}

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
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className={styles.togglePassword}
              onClick={() => setShowPassword((prev) => !prev)}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                // Slashed eye (hide)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="#FFD166"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.94 17.94a10 10 0 0 1-11.88-11.88"></path>
                  <path d="M1 1l22 22"></path>
                  <path d="M10.58 10.58a3 3 0 0 1 4.24 4.24"></path>
                </svg>
              ) : (
                // Eye (show)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="#FFD166"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              )}
            </span>
          </div>

          {/* Buttons */}
          <button className={styles.button} type="submit">
            Login
          </button>

          <button
            className={styles.googleButton}
            type="button"
            onClick={handleGoogleLogin}
          >
            <img
              src="/assets/images/icons8-google-48.png"
              alt="Google"
              className={styles.googleIcon}
            />
            Continue with Google
          </button>

          {/* Register Link */}
          <p className={styles.registerText}>
            Don’t have an account?
            <RouterLink to="/register" className={styles.registerLink}>
              Register
            </RouterLink>
          </p>
        </form>
      </div>
    </div>
  );
}
