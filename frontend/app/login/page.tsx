"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email && password) {
      localStorage.setItem("shieldx-user", email);
      router.push("/dashboard");
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-xl bg-slate-950 border border-slate-800 rounded-3xl p-10">
        <h1 className="text-5xl font-bold text-cyan-400 text-center mb-4">
          ShieldX AI
        </h1>

        <p className="text-slate-400 text-center mb-10">
          Sign in to access your security dashboard
        </p>

        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-slate-300">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              className="w-full p-4 rounded-xl bg-black border border-slate-700 text-white"
            />
          </div>

          <div>
            <label className="block mb-2 text-slate-300">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              className="w-full p-4 rounded-xl bg-black border border-slate-700 text-white"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition text-black font-bold py-4 rounded-xl"
          >
            Login
          </button>
        </div>

        <p className="text-center text-slate-500 mt-8">
          Demo Login Page
        </p>
      </div>
    </main>
  );
}