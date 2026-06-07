import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { DarkModeToggle } from "../../../darkMode";

interface User {
  name?: string;
  email: string;
  role: string;
}

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { setUser(null); }
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    window.location.href = "/";
  };

  const getDashboardLink = () => {
    if (!user) return "/";
    switch (user.role.toUpperCase()) {
      case "SUPERADMIN": return "/superadmin";
      case "ADMIN": return "/admin";
      case "DISTRIBUTOR": return "/distributor";
      default: return "/zakahcalculator";
    }
  };

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Zakah Calculator", to: "/zakahcalculator" },
    { label: "Nisab", to: "/nisab" },
    { label: "Quran & Hadith", to: "/quran-hadith" },
  ];

  return (
    <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm sticky top-0 z-50 animate-fade-in-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src="/assets/images/resources/logo-1.png" alt="ZakahFlow" className="h-12 w-auto group-hover:scale-105 transition-transform" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-amber-50 hover:text-amber-700 transition-all"
              >
                {link.label}
              </Link>
            ))}
            {user && (
              <Link
                to={getDashboardLink()}
                className="px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-amber-50 hover:text-amber-700 transition-all"
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            <DarkModeToggle />
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-amber-700 font-semibold text-sm">
                      {(user.name || user.email).charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.name || user.email}</span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-scale-in">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name || "User"}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">{user.role}</span>
                    </div>
                    <Link to={getDashboardLink()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setDropdownOpen(false)}>Dashboard</Link>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Sign Out</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">Sign In</Link>
                <Link to="/register" className="px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors shadow-md">Register</Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <DarkModeToggle />
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg className="w-6 h-6 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white animate-fade-in-down">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className="block px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-amber-50 hover:text-amber-700" onClick={() => setMobileOpen(false)}>{link.label}</Link>
            ))}
            {user && (
              <Link to={getDashboardLink()} className="block px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-amber-50 hover:text-amber-700" onClick={() => setMobileOpen(false)}>Dashboard</Link>
            )}
          </div>
          <div className="border-t border-gray-100 px-4 py-3">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-3 py-2">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-amber-700 font-semibold text-sm">{(user.name || user.email).charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user.name || "User"}</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                </div>
                <button onClick={handleLogout} className="w-full px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 text-left">Sign Out</button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link to="/login" className="block px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100" onClick={() => setMobileOpen(false)}>Sign In</Link>
                <Link to="/register" className="block px-3 py-2 text-sm font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700 text-center" onClick={() => setMobileOpen(false)}>Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
