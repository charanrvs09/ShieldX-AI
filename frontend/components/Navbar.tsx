"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("shieldx-user");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("shieldx-user");
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-black/60 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="text-3xl font-extrabold text-cyan-400"
        >
          ShieldX AI
        </Link>

        <div className="hidden md:flex gap-8 text-slate-300">
          <a href="#features" className="hover:text-cyan-400 transition">
            Features
          </a>

          <a href="#scanner" className="hover:text-cyan-400 transition">
            Scanner
          </a>

          <Link
            href="/dashboard"
            className="hover:text-cyan-400 transition"
          >
            Dashboard
          </Link>

          <a href="#about" className="hover:text-cyan-400 transition">
            About
          </a>
        </div>

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 transition px-5 py-2 rounded-xl text-white font-bold"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            className="bg-cyan-500 hover:bg-cyan-600 transition px-5 py-2 rounded-xl text-black font-bold"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}