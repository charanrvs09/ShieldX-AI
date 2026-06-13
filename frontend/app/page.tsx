"use client";

import { useState } from "react";

export default function Home() {
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
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/analyze-text",
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
    }
  };

  const analyzeURL = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/analyze-url",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url,
          }),
        }
      );

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
    }
  };

  const analyzeImage = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/analyze-image",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="flex items-center justify-between px-8 py-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-green-400">
          ShieldX AI
        </h1>

        <div className="flex gap-6 text-gray-300">
          <button>Features</button>
          <button>Scanner</button>
          <button>Dashboard</button>
        </div>
      </nav>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-6xl font-bold text-center mb-8">
          ShieldX AI
        </h1>

        <p className="text-center text-gray-400 mb-10">
          Analyze suspicious messages, URLs, and screenshots instantly.
        </p>

        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveTab("message")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "message"
                ? "bg-green-500 text-black"
                : "bg-gray-800 text-white"
            }`}
          >
            Message Scanner
          </button>

          <button
            onClick={() => setActiveTab("url")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "url"
                ? "bg-blue-500 text-white"
                : "bg-gray-800 text-white"
            }`}
          >
            URL Scanner
          </button>

          <button
            onClick={() => setActiveTab("image")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "image"
                ? "bg-red-500 text-white"
                : "bg-gray-800 text-white"
            }`}
          >
            Screenshot Scanner
          </button>
        </div>

        <div className="bg-gray-950 border border-gray-800 rounded-3xl p-6">
          {activeTab === "message" && (
            <>
              <label className="block mb-3 text-lg font-semibold">
                Suspicious Message
              </label>

              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Paste suspicious message here..."
                className="w-full h-40 bg-black border border-gray-700 rounded-xl p-4 text-white"
              />

              <button
                onClick={analyzeMessage}
                className="mt-4 bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-xl"
              >
                Analyze
              </button>
            </>
          )}

          {activeTab === "url" && (
            <>
              <label className="block mb-3 text-lg font-semibold">
                Suspicious URL
              </label>

              <input
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                placeholder="https://example.com"
                className="w-full bg-black border border-gray-700 rounded-xl p-4 text-white"
              />

              <button
                onClick={analyzeURL}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl"
              >
                Analyze URL
              </button>
            </>
          )}

          {activeTab === "image" && (
            <>
              <label className="block mb-3 text-lg font-semibold">
                Upload Screenshot
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  if (event.target.files?.[0]) {
                    setImage(event.target.files[0]);
                  }
                }}
                className="w-full bg-black border border-gray-700 rounded-xl p-4 text-white"
              />

              <button
                onClick={analyzeImage}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl"
              >
                Analyze Screenshot
              </button>
            </>
          )}
        </div>

        {result && (
          <div className="mt-8 border border-gray-800 bg-gray-950 rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-4">
              Analysis Result
            </h2>

            <p>
              <strong>Prediction:</strong> {result.prediction}
            </p>

            <p>
              <strong>Risk Score:</strong> {result.risk}%
            </p>

            <p>
              <strong>Reason:</strong> {result.reason}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}