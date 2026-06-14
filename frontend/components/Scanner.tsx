"use client";

import { useState } from "react";

export default function Scanner() {
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [activeTab, setActiveTab] = useState("message");

  const [result, setResult] = useState<null | {
    prediction: string;
    risk: number;
    reason: string;
  }>(null);

  const analyzeMessage = async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/analyze-text",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      }
    );

    const data = await response.json();
    setResult(data);
  };

  const analyzeURL = async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/analyze-url",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      }
    );

    const data = await response.json();
    setResult(data);
  };

  const analyzeImage = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);

    const response = await fetch(
      "http://127.0.0.1:8000/analyze-image",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    setResult(data);
  };

  const threatLevel =
    result?.risk && result.risk >= 80
      ? "HIGH"
      : result?.risk && result.risk >= 50
      ? "MEDIUM"
      : "LOW";

  return (
    <section
      id="scanner"
      className="max-w-6xl mx-auto px-6 py-24"
    >
      <h2 className="text-5xl font-bold text-center mb-4">
        Threat Scanner
      </h2>

      <p className="text-slate-400 text-center mb-10">
        Scan suspicious messages, URLs and screenshots.
      </p>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab("message")}
          className={`px-5 py-3 rounded-xl font-semibold ${
            activeTab === "message"
              ? "bg-cyan-500 text-black"
              : "bg-slate-800"
          }`}
        >
          Message
        </button>

        <button
          onClick={() => setActiveTab("url")}
          className={`px-5 py-3 rounded-xl font-semibold ${
            activeTab === "url"
              ? "bg-cyan-500 text-black"
              : "bg-slate-800"
          }`}
        >
          URL
        </button>

        <button
          onClick={() => setActiveTab("image")}
          className={`px-5 py-3 rounded-xl font-semibold ${
            activeTab === "image"
              ? "bg-cyan-500 text-black"
              : "bg-slate-800"
          }`}
        >
          Screenshot
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
        {activeTab === "message" && (
          <>
            <textarea
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              placeholder="Paste suspicious message..."
              className="w-full h-40 bg-black border border-slate-700 rounded-xl p-4"
            />

            <button
              onClick={analyzeMessage}
              className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-black px-6 py-3 rounded-xl font-bold"
            >
              Analyze Message
            </button>
          </>
        )}

        {activeTab === "url" && (
          <>
            <input
              value={url}
              onChange={(event) =>
                setUrl(event.target.value)
              }
              placeholder="https://example.com"
              className="w-full bg-black border border-slate-700 rounded-xl p-4"
            />

            <button
              onClick={analyzeURL}
              className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-black px-6 py-3 rounded-xl font-bold"
            >
              Analyze URL
            </button>
          </>
        )}

        {activeTab === "image" && (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                if (event.target.files?.[0]) {
                  setImage(event.target.files[0]);
                }
              }}
              className="w-full"
            />

            <button
              onClick={analyzeImage}
              className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-black px-6 py-3 rounded-xl font-bold"
            >
              Analyze Screenshot
            </button>
          </>
        )}
      </div>

      {result && (
        <div className="mt-10 bg-slate-900 border border-slate-800 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-3xl font-bold">
              Threat Analysis Report
            </h3>

            <span
              className={`px-4 py-2 rounded-full font-bold ${
                threatLevel === "HIGH"
                  ? "bg-red-500/20 text-red-400"
                  : threatLevel === "MEDIUM"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-green-500/20 text-green-400"
              }`}
            >
              {threatLevel} RISK
            </span>
          </div>

          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span>Threat Score</span>
              <span>{result.risk}%</span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-4">
              <div
                className={`h-4 rounded-full ${
                  result.risk >= 80
                    ? "bg-red-500"
                    : result.risk >= 50
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
                style={{ width: `${result.risk}%` }}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">
                Detection Result
              </h4>

              <p className="text-slate-300">
                {result.prediction}
              </p>

              <p className="text-slate-400 mt-3">
                {result.reason}
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-4">
                Recommended Action
              </h4>

              {result.risk >= 80 ? (
                <ul className="space-y-2 text-red-400">
                  <li>• Do not click any links</li>
                  <li>• Do not share credentials</li>
                  <li>• Block and report sender</li>
                  <li>• Delete immediately</li>
                </ul>
              ) : result.risk >= 50 ? (
                <ul className="space-y-2 text-yellow-400">
                  <li>• Verify source manually</li>
                  <li>• Avoid sensitive information</li>
                  <li>• Proceed with caution</li>
                </ul>
              ) : (
                <ul className="space-y-2 text-green-400">
                  <li>• No major threats detected</li>
                  <li>• Content appears legitimate</li>
                  <li>• Continue normally</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}