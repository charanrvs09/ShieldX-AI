"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface ScanRecord {
  type: string;
  prediction: string;
  risk: number;
  time: string;
}

const COLORS = ["#22c55e", "#ef4444"];

export default function AnalyticsPage() {
  const [scans, setScans] = useState<ScanRecord[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/history"
        );

        const data = await response.json();
        setScans(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHistory();
  }, []);

  const totalScans = scans.length;

  const threatsBlocked = scans.filter(
    (scan) =>
      scan.prediction.includes("Scam") ||
      scan.prediction.includes("Suspicious")
  ).length;

  const safeRequests = scans.filter(
    (scan) =>
      scan.prediction.includes("Safe")
  ).length;

  const detectionRate =
    totalScans > 0
      ? Math.round((threatsBlocked / totalScans) * 100)
      : 0;

  const threatData = [
    {
      day: "Scans",
      scans: totalScans,
      threats: threatsBlocked,
    },
  ];

  const pieData = [
    {
      name: "Safe",
      value: safeRequests,
    },
    {
      name: "Threats",
      value: threatsBlocked,
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white flex">
      <Sidebar />

      <section className="flex-1 p-10">
        <h1 className="text-5xl font-bold text-cyan-400 mb-3">
          Analytics
        </h1>

        <p className="text-slate-400 mb-10">
          Real-time security intelligence and threat insights.
        </p>

        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <div className="bg-slate-900 p-6 rounded-3xl">
            <p className="text-slate-400">
              Total Scans
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {totalScans}
            </h2>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl">
            <p className="text-slate-400">
              Threats Detected
            </p>

            <h2 className="text-4xl font-bold text-red-400 mt-2">
              {threatsBlocked}
            </h2>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl">
            <p className="text-slate-400">
              Safe Requests
            </p>

            <h2 className="text-4xl font-bold text-green-400 mt-2">
              {safeRequests}
            </h2>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl">
            <p className="text-slate-400">
              Detection Rate
            </p>

            <h2 className="text-4xl font-bold text-cyan-400 mt-2">
              {detectionRate}%
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-slate-900 p-6 rounded-3xl">
            <h2 className="text-2xl font-bold mb-6">
              Threat Overview
            </h2>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={threatData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="scans"
                    stroke="#06b6d4"
                    strokeWidth={3}
                  />

                  <Line
                    type="monotone"
                    dataKey="threats"
                    stroke="#ef4444"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl">
            <h2 className="text-2xl font-bold mb-6">
              Threat Distribution
            </h2>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    outerRadius={100}
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}