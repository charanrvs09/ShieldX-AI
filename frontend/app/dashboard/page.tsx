"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

interface Scan {
  type: string;
  prediction: string;
  risk: number;
  time: string;
}

export default function DashboardPage() {
  const [history, setHistory] = useState<Scan[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/history")
      .then((response) => response.json())
      .then((data) => {
        setHistory(data.reverse());
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const totalScans = history.length;

  const threatsDetected = history.filter(
    (scan) =>
      scan.prediction.includes("Scam") ||
      scan.prediction.includes("Suspicious")
  ).length;

  const safeRequests = history.filter(
    (scan) =>
      scan.prediction.includes("Safe")
  ).length;

  const detectionRate =
    totalScans > 0
      ? Math.round((threatsDetected / totalScans) * 100)
      : 0;

  const messageThreats = history.filter(
    (scan) =>
      scan.type === "Message" &&
      scan.prediction.includes("Scam")
  ).length;

  const urlThreats = history.filter(
    (scan) =>
      scan.type === "URL" &&
      scan.prediction.includes("Suspicious")
  ).length;

  const screenshotThreats = history.filter(
    (scan) =>
      scan.type === "Screenshot" &&
      scan.prediction.includes("Scam")
  ).length;

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
              {totalScans}
            </h2>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
            <p className="text-slate-400">
              Threats Detected
            </p>

            <h2 className="text-4xl font-bold text-red-400 mt-3">
              {threatsDetected}
            </h2>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
            <p className="text-slate-400">
              Safe Requests
            </p>

            <h2 className="text-4xl font-bold text-green-400 mt-3">
              {safeRequests}
            </h2>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
            <p className="text-slate-400">
              Detection Rate
            </p>

            <h2 className="text-4xl font-bold text-cyan-400 mt-3">
              {detectionRate}%
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-4">
              Threat Overview
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Scam Messages</span>
                <span className="text-red-400">
                  {messageThreats}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Malicious URLs</span>
                <span className="text-yellow-400">
                  {urlThreats}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Suspicious Screenshots</span>
                <span className="text-cyan-400">
                  {screenshotThreats}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Safe Scans</span>
                <span className="text-green-400">
                  {safeRequests}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-4">
              Recent Statistics
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total Records</span>
                <span>{totalScans}</span>
              </div>

              <div className="flex justify-between">
                <span>Threat Percentage</span>
                <span className="text-red-400">
                  {detectionRate}%
                </span>
              </div>

              <div className="flex justify-between">
                <span>Safe Percentage</span>
                <span className="text-green-400">
                  {100 - detectionRate}%
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
            {history.slice(0, 5).map((scan, index) => (
              <div
                key={index}
                className="flex justify-between bg-slate-950 p-4 rounded-xl"
              >
                <span>
                  {scan.type} Scan
                </span>

                <span
                  className={
                    scan.prediction.includes("Safe")
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {scan.prediction}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}