"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Sidebar() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem(
      "shieldx-user"
    );

    if (!user) {
      router.push("/login");
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem(
      "shieldx-user"
    );

    router.push("/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-slate-950 border-r border-slate-800 p-6">
      <h1 className="text-4xl font-extrabold text-cyan-400 mb-10">
        ShieldX AI
      </h1>

      <div className="flex flex-col gap-3">
        <Link
          href="/dashboard"
          className="bg-cyan-500 text-black font-bold px-4 py-3 rounded-xl"
        >
          Dashboard
        </Link>

        <Link
          href="/dashboard/message"
          className="bg-slate-900 hover:bg-slate-800 px-4 py-3 rounded-xl transition"
        >
          Message Scanner
        </Link>

        <Link
          href="/dashboard/url"
          className="bg-slate-900 hover:bg-slate-800 px-4 py-3 rounded-xl transition"
        >
          URL Scanner
        </Link>

        <Link
          href="/dashboard/screenshot"
          className="bg-slate-900 hover:bg-slate-800 px-4 py-3 rounded-xl transition"
        >
          Screenshot Scanner
        </Link>

        <Link
          href="/dashboard/analytics"
          className="bg-slate-900 hover:bg-slate-800 px-4 py-3 rounded-xl transition"
        >
          Analytics
        </Link>

        <Link
          href="/dashboard/history"
          className="bg-slate-900 hover:bg-slate-800 px-4 py-3 rounded-xl transition"
        >
          History
        </Link>
      </div>

      <button
        onClick={logout}
        className="mt-10 w-full bg-red-500 hover:bg-red-600 transition px-4 py-3 rounded-xl font-bold"
      >
        Logout
      </button>
    </aside>
  );
}