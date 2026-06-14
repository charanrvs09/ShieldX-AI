export default function Stats() {
    return (
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <h3 className="text-4xl font-bold text-cyan-400">
              99%
            </h3>
  
            <p className="text-slate-400 mt-2">
              Detection Accuracy
            </p>
          </div>
  
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <h3 className="text-4xl font-bold text-green-400">
              OCR
            </h3>
  
            <p className="text-slate-400 mt-2">
              Screenshot Analysis
            </p>
          </div>
  
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <h3 className="text-4xl font-bold text-blue-400">
              AI
            </h3>
  
            <p className="text-slate-400 mt-2">
              ML Threat Detection
            </p>
          </div>
  
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <h3 className="text-4xl font-bold text-purple-400">
              24/7
            </h3>
  
            <p className="text-slate-400 mt-2">
              Real-Time Analysis
            </p>
          </div>
        </div>
      </section>
    );
  }