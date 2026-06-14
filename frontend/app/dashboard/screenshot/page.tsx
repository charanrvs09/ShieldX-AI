"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function ScreenshotScannerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyzeImage = async () => {
    if (!file) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "https://shieldx-ai.onrender.com/analyze-image",
        {
          method: "POST",
          body: formData,
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
          Screenshot Scanner
        </h1>

        <p className="text-slate-400 mb-8">
          Upload screenshots and detect phishing scams using OCR and AI.
        </p>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              if (event.target.files?.[0]) {
                setFile(event.target.files[0]);
              }
            }}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4"
          />

          <button
            onClick={analyzeImage}
            className="mt-5 bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-bold text-black"
          >
            {loading
              ? "Analyzing..."
              : "Analyze Screenshot"}
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
                      result.prediction.includes(
                        "Safe"
                      )
                        ? "text-green-400"
                        : "text-red-400"
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

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <h2 className="text-2xl font-bold mb-4">
                OCR Extracted Text
              </h2>

              <div className="bg-slate-950 border border-slate-700 rounded-xl p-4 whitespace-pre-wrap">
                {result.extracted_text}
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}