"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

interface ScanRecord {
  type: string;
  prediction: string;
  risk: number;
  time: string;
}

export default function HistoryPage() {
  const [scans, setScans] = useState<ScanRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(
          "https://shieldx-ai.onrender.com/history"
        );

        const data = await response.json();

        setScans(data.reverse());
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    fetchHistory();
  }, []);

  const getColor = (prediction: string) => {
    if (
      prediction.includes("Scam") ||
      prediction.includes("Suspicious")
    ) {
      return "text-red-400";
    }

    return "text-green-400";
  };

  return (
    <main className="min-h-screen bg-black text-white flex">
      <Sidebar />

      <section className="flex-1 p-10">
        <h1 className="text-5xl font-bold text-cyan-400 mb-4">
          Scan History
        </h1>

        <p className="text-slate-400 mb-8">
          Real scan history collected by ShieldX AI.
        </p>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-950">
              <tr>
                <th className="text-left p-5">Type</th>
                <th className="text-left p-5">Prediction</th>
                <th className="text-left p-5">Risk</th>
                <th className="text-left p-5">Time</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="p-5 text-center"
                  >
                    Loading...
                  </td>
                </tr>
              ) : (
                scans.map((scan, index) => (
                  <tr
                    key={index}
                    className="border-t border-slate-800"
                  >
                    <td className="p-5">
                      {scan.type}
                    </td>

                    <td
                      className={`p-5 font-semibold ${getColor(
                        scan.prediction
                      )}`}
                    >
                      {scan.prediction}
                    </td>

                    <td className="p-5">
                      {scan.risk}%
                    </td>

                    <td className="p-5 text-slate-400">
                      {scan.time}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}