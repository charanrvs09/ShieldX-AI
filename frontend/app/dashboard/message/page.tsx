"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function MessageScannerPage() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyzeMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);

    try {
      const response = await fetch(
        "https://shieldx-ai.onrender.com/analyze-text",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
          }),
        }
      );

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Backend connection failed.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white flex">
      <Sidebar />

      <section className="flex-1 p-10">
        <h1 className="text-5xl font-bold text-cyan-400 mb-4">
          Message Scanner
        </h1>

        <p className="text-slate-400 mb-8">
          Analyze SMS, emails, and messages for phishing threats.
        </p>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <textarea
            value={message}
            onChange={(event) =>
              setMessage(event.target.value)
            }
            placeholder="Paste suspicious message here..."
            className="w-full h-48 bg-slate-950 border border-slate-700 rounded-xl p-4 text-white outline-none"
          />

          <button
            onClick={analyzeMessage}
            className="mt-5 bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-bold text-black"
          >
            {loading ? "Analyzing..." : "Analyze Message"}
          </button>
        </div>

        {result && (
          <div className="mt-8 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <h2 className="text-2xl font-bold mb-4">
                Scan Result
              </h2>

              <div className="space-y-3">
                <p>
                  <span className="font-bold">
                    Prediction:
                  </span>{" "}
                  <span
                    className={
                      result.prediction === "Scam"
                        ? "text-red-400"
                        : "text-green-400"
                    }
                  >
                    {result.prediction}
                  </span>
                </p>

                <p>
                  <span className="font-bold">
                    Risk Score:
                  </span>{" "}
                  {result.risk}%
                </p>

                <p>
                  <span className="font-bold">
                    Reason:
                  </span>{" "}
                  {result.reason}
                </p>
              </div>
            </div>

            <div className="bg-slate-900 border border-cyan-500 rounded-3xl p-6">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">
                AI Threat Analysis
              </h2>

              <div className="space-y-3">
                {result.explanation?.map(
                  (
                    item: string,
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="bg-slate-950 p-4 rounded-xl border border-slate-700"
                    >
                      • {item}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}