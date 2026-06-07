import { useState } from "react";
import { api } from "../api";
import { Link as RouterLink } from "@tanstack/react-router";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) { setError("Please fill all fields"); return; }
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = "/superadmin";
    } catch (err: any) {
      if (err.code === "ERR_NETWORK") setError("Cannot connect to server. Please try again later.");
      else setError(err.response?.data?.error || "Login failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,#2a2416,#0f0c05)] flex items-center justify-center font-[Poppins,sans-serif] p-4">
      <div className="w-full max-w-[1100px] h-auto md:h-[568px] flex flex-col md:flex-row rounded-[30px] overflow-hidden bg-gradient-to-br from-[rgba(255,215,120,0.08)] via-[rgba(255,215,120,0.03)] to-[rgba(156,140,102,0.08)] backdrop-blur-[18px] border border-[rgba(255,215,120,0.25)] shadow-[0_35px_90px_rgba(0,0,0,0.65)]">
        {/* Left - Image */}
        <div className="hidden md:block flex-[1.1] relative">
          <img src="/assets/images/download (34).jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(212,175,55,0.15)] to-[rgba(102,73,22,0.6)]"></div>
          <div className="absolute bottom-12 left-8 right-8">
            <h2 className="text-[1.9rem] text-[#ffd166] font-bold mb-2 drop-shadow-lg">Welcome Back</h2>
            <p className="text-[1.1rem] text-[#f8f6f4] font-semibold tracking-wide">Sign in to continue your Zakah journey</p>
          </div>
        </div>

        {/* Right - Form */}
        <div className="flex-[0.9] p-8 md:p-14 flex flex-col justify-center bg-[rgba(20,16,6,0.92)]">
          <h1 className="text-[2rem] md:text-[2.4rem] text-[#f5d77a] font-bold mb-8 text-center">Login</h1>

          {error && <p className="text-[#ff9b9b] mb-4 text-sm text-center">{error}</p>}

          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4 max-w-[380px] mx-auto w-full">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full px-4 py-3 rounded-xl border border-[rgba(255,215,120,0.22)] bg-[rgba(255,255,255,0.06)] text-white text-sm focus:outline-none focus:border-[#f5d77a] placeholder:text-gray-500 transition-colors" placeholder="Email" />
            
            <div className="relative">
              <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required
                className="w-full px-4 py-3 rounded-xl border border-[rgba(255,215,120,0.22)] bg-[rgba(255,255,255,0.06)] text-white text-sm focus:outline-none focus:border-[#f5d77a] placeholder:text-gray-500 transition-colors" placeholder="Password" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[rgba(255,215,120,0.9)] text-sm">
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#f5d77a] to-[#cfa94a] text-black font-bold text-sm hover:translate-y-[-2px] hover:shadow-[0_8px_20px_rgba(245,215,122,0.5)] transition-all disabled:opacity-50">
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-[rgba(255,235,180,0.75)] text-sm">
            Don't have an account? <RouterLink to="/register" className="text-[#f5d77a] font-semibold ml-1">Register</RouterLink>
          </p>
        </div>
      </div>
    </div>
  );
}
