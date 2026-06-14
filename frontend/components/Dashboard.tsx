export default function Dashboard() {
    return (
      <section
        id="dashboard"
        className="py-28 px-6 max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold mb-4">
            Threat Dashboard
          </h2>
  
          <p className="text-slate-400 text-lg">
            Real-time threat monitoring and AI-powered analysis
          </p>
        </div>
  
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <p className="text-slate-400 mb-3">
              Total Scans
            </p>
  
            <h3 className="text-5xl font-bold text-white">
              12,847
            </h3>
          </div>
  
          <div className="bg-slate-900 border border-red-900 rounded-3xl p-8">
            <p className="text-slate-400 mb-3">
              Threats Blocked
            </p>
  
            <h3 className="text-5xl font-bold text-red-400">
              2,194
            </h3>
          </div>
  
          <div className="bg-slate-900 border border-green-900 rounded-3xl p-8">
            <p className="text-slate-400 mb-3">
              Safe Requests
            </p>
  
            <h3 className="text-5xl font-bold text-green-400">
              10,653
            </h3>
          </div>
  
          <div className="bg-slate-900 border border-cyan-900 rounded-3xl p-8">
            <p className="text-slate-400 mb-3">
              Detection Rate
            </p>
  
            <h3 className="text-5xl font-bold text-cyan-400">
              99%
            </h3>
          </div>
        </div>
  
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-6">
              Threat Distribution
            </h3>
  
            <div className="space-y-5">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Phishing URLs</span>
                  <span>45%</span>
                </div>
  
                <div className="h-3 bg-slate-800 rounded-full">
                  <div className="h-3 w-[45%] bg-cyan-400 rounded-full" />
                </div>
              </div>
  
              <div>
                <div className="flex justify-between mb-2">
                  <span>Scam Messages</span>
                  <span>35%</span>
                </div>
  
                <div className="h-3 bg-slate-800 rounded-full">
                  <div className="h-3 w-[35%] bg-red-400 rounded-full" />
                </div>
              </div>
  
              <div>
                <div className="flex justify-between mb-2">
                  <span>Malicious Screenshots</span>
                  <span>20%</span>
                </div>
  
                <div className="h-3 bg-slate-800 rounded-full">
                  <div className="h-3 w-[20%] bg-green-400 rounded-full" />
                </div>
              </div>
            </div>
          </div>
  
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-6">
              AI Status
            </h3>
  
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>OCR Engine</span>
                <span className="text-green-400">
                  Online
                </span>
              </div>
  
              <div className="flex justify-between">
                <span>ML Classifier</span>
                <span className="text-green-400">
                  Active
                </span>
              </div>
  
              <div className="flex justify-between">
                <span>URL Scanner</span>
                <span className="text-green-400">
                  Running
                </span>
              </div>
  
              <div className="flex justify-between">
                <span>System Health</span>
                <span className="text-cyan-400">
                  99.9%
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }