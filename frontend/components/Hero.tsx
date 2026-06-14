export default function Hero() {
    return (
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 blur-3xl" />
  
        <div className="relative max-w-6xl mx-auto text-center px-6">
          <div className="inline-block px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm mb-6">
            AI-Powered Cybersecurity Platform
          </div>
  
          <h1 className="text-6xl md:text-8xl font-extrabold mb-8">
            Protect Yourself From
            <span className="text-cyan-400">
              {" "}Scams & Phishing
            </span>
          </h1>
  
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10">
            Detect phishing messages, malicious URLs, and scam screenshots
            using machine learning and OCR-powered threat analysis.
          </p>
  
          <div className="flex justify-center gap-4">
            <button className="bg-cyan-500 hover:bg-cyan-600 text-black px-8 py-4 rounded-xl font-bold">
              Start Scanning
            </button>
  
            <button className="border border-slate-700 px-8 py-4 rounded-xl font-bold hover:border-cyan-500 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>
    );
  }