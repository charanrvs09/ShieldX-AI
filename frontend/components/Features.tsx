export default function Features() {
    return (
      <section id="features" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-5xl font-bold text-center mb-4">
          Security Features
        </h2>
  
        <p className="text-slate-400 text-center mb-14">
          AI-powered protection against modern phishing attacks.
        </p>
  
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">
              Message Scanner
            </h3>
  
            <p className="text-slate-400">
              Detect phishing messages, social engineering attacks,
              fraudulent SMS messages and suspicious emails.
            </p>
          </div>
  
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">
              URL Scanner
            </h3>
  
            <p className="text-slate-400">
              Analyze suspicious URLs and identify potentially
              malicious websites before opening them.
            </p>
          </div>
  
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-red-400 mb-4">
              Screenshot Scanner
            </h3>
  
            <p className="text-slate-400">
              OCR-powered screenshot analysis for scam messages,
              fake login pages and phishing screenshots.
            </p>
          </div>
        </div>
      </section>
    );
  }