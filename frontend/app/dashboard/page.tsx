"use client";

import Sidebar from "@/components/Sidebar";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-black text-white flex">
      <Sidebar />

      <section className="flex-1 p-10">
        <div className="mb-10">
          <h1 className="text-5xl font-bold mb-3">
            Threat Dashboard
          </h1>

          <p className="text-slate-400">
            Real-time threat monitoring and security insights.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
            <p className="text-slate-400">
              Total Scans
            </p>

            <h2 className="text-4xl font-bold mt-3">
              12,847
            </h2>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
            <p className="text-slate-400">
              Threats Blocked
            </p>

            <h2 className="text-4xl font-bold text-red-400 mt-3">
              2,194
            </h2>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
            <p className="text-slate-400">
              Safe Requests
            </p>

            <h2 className="text-4xl font-bold text-green-400 mt-3">
              10,653
            </h2>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
            <p className="text-slate-400">
              Detection Rate
            </p>

            <h2 className="text-4xl font-bold text-cyan-400 mt-3">
              99%
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-4">
              Threat Analytics
            </h2>

            <div className="h-72 rounded-2xl bg-slate-950 flex items-center justify-center text-slate-500">
              Charts Coming Soon
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-4">
              Threat Overview
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Scam Messages</span>
                <span className="text-red-400">
                  843
                </span>
              </div>

              <div className="flex justify-between">
                <span>Malicious URLs</span>
                <span className="text-yellow-400">
                  527
                </span>
              </div>

              <div className="flex justify-between">
                <span>Suspicious Screenshots</span>
                <span className="text-cyan-400">
                  824
                </span>
              </div>

              <div className="flex justify-between">
                <span>Safe Scans</span>
                <span className="text-green-400">
                  10653
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <h2 className="text-2xl font-bold mb-6">
            Recent Activity
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between bg-slate-950 p-4 rounded-xl">
              <span>URL Scan</span>
              <span className="text-green-400">
                Safe
              </span>
            </div>

            <div className="flex justify-between bg-slate-950 p-4 rounded-xl">
              <span>Message Scan</span>
              <span className="text-red-400">
                Scam
              </span>
            </div>

            <div className="flex justify-between bg-slate-950 p-4 rounded-xl">
              <span>Screenshot Scan</span>
              <span className="text-yellow-400">
                Suspicious
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}