export default function Footer() {
    return (
      <footer
        id="about"
        className="border-t border-slate-800 mt-24"
      >
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-cyan-400 mb-4">
            ShieldX AI
          </h2>
  
          <p className="text-slate-400 max-w-2xl">
            ShieldX AI uses Machine Learning and OCR
            technologies to detect phishing attacks,
            scam messages, malicious URLs and
            suspicious screenshots.
          </p>
  
          <p className="text-slate-500 mt-8">
            © 2026 ShieldX AI. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }