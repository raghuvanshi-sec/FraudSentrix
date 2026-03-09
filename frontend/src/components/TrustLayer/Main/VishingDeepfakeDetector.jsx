import React, { useState } from 'react';
import { Mic, ShieldAlert, Cpu, Activity, Play, Volume2, Fingerprint } from 'lucide-react';
import Badge from '../Shared/Badge';

export default function VishingDeepfakeDetector() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('vishing'); // 'vishing' or 'deepfake'

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      if (activeTab === 'vishing') {
        setResult({
          score: 92,
          status: 'CRITICAL',
          threats: ['Urgent Request Pattern', 'Suspicious Caller Identity', 'VoIP Spoofing Detected'],
          transcript: "This is an urgent call from your bank's security department. We have detected a suspicious transaction of $2,400. To stop this, please verify your social security number immediately..."
        });
      } else {
        setResult({
          score: 88,
          status: 'HIGH RISK',
          threats: ['Synthetic Voice Artifacts', 'Inconsistent Frequency Response', 'No Natural Breathing Patterns'],
          analysis: "Spectral analysis indicates 88% probability of AI-generated speech. Pitch modulation remains static across emotional keywords."
        });
      }
      setAnalyzing(false);
    }, 2500);
  };

  return (
    <div className="animate-fadeSlideUp space-y-6">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-syne font-bold text-2xl text-white flex items-center gap-3">
            <Mic className="text-[#ff2a2a]" />
            Audio Threat <span className="text-slate-500">Analysis</span>
          </h2>
          <p className="text-slate-400 text-sm mt-1">Advanced detection for Vishing (Voice Phishing) and AI Voice Deepfakes.</p>
        </div>
        <div className="flex bg-[#131d2b] border border-[#1b2636] p-1 h-11">
          <button 
            onClick={() => { setActiveTab('vishing'); setResult(null); }}
            className={`px-4 text-xs font-bold transition-all ${activeTab === 'vishing' ? 'bg-[#ff2a2a] text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            VISHING
          </button>
          <button 
            onClick={() => { setActiveTab('deepfake'); setResult(null); }}
            className={`px-4 text-xs font-bold transition-all ${activeTab === 'deepfake' ? 'bg-[#ff2a2a] text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            DEEPFAKE
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#131d2b] border border-[#1b2636] p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              {activeTab === 'vishing' ? <ShieldAlert size={80} /> : <Cpu size={80} />}
            </div>
            
            <label className="block text-[10px] font-bold text-[#ff2a2a] uppercase tracking-widest mb-4">
              {activeTab === 'vishing' ? 'Voice Call Transcript / Audio' : 'Audio File For Analysis'}
            </label>
            
            <div className="relative">
              <textarea 
                placeholder={activeTab === 'vishing' ? "Paste call transcript here or upload audio log..." : "Upload audio file for synthetic voice detection..."}
                className="w-full bg-[#0d1520] border border-[#1b2636] p-4 text-sm text-slate-300 focus:outline-none focus:border-[#ff2a2a] min-h-[180px] transition-colors resize-none"
              />
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button className="p-2 bg-[#1b2636] text-slate-300 hover:bg-[#253244] transition-colors">
                  <Play size={16} />
                </button>
                <button className="p-2 bg-[#1b2636] text-slate-300 hover:bg-[#253244] transition-colors">
                  <Volume2 size={16} />
                </button>
              </div>
            </div>

            <button 
              onClick={handleAnalyze}
              disabled={analyzing}
              className="mt-6 w-full py-4 bg-[#ff2a2a] text-white font-syne font-bold text-sm tracking-widest hover:bg-[#e62020] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
            >
              {analyzing ? (
                <>
                  <Activity size={18} className="animate-pulse" />
                  ANALYZING FREQUENCIES...
                </>
              ) : (
                <>
                  <Fingerprint size={18} className="group-hover:scale-110 transition-transform" />
                  RUN SECURITY SCAN
                </>
              )}
            </button>
          </div>

          {/* Dummy Waveform */}
          <div className="bg-[#131d2b] border border-[#1b2636] p-6">
             <div className="flex items-center justify-between mb-4">
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Live Spectral Feed</span>
               <div className="flex gap-1">
                 {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-3 bg-[#ff2a2a]/30" />)}
               </div>
             </div>
             <div className="h-16 flex items-center gap-1">
               {Array.from({length: 40}).map((_, i) => (
                 <div 
                   key={i} 
                   className={`flex-1 bg-gradient-to-t from-[#ff2a2a]/20 to-[#ff2a2a]/60 rounded-full transition-all duration-500`}
                   style={{ height: `${analyzing ? Math.random() * 100 : 20 + Math.random() * 20}%` }}
                 />
               ))}
             </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-1">
          {result ? (
            <div className="bg-[#131d2b] border border-[#ff2a2a]/30 h-full flex flex-col animate-fadeSlideUp">
              <div className="p-6 border-b border-[#1b2636] bg-[#ff2a2a]/5">
                <Badge type={result.status} text={result.status} />
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-5xl font-syne font-bold text-white">{result.score}</span>
                  <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">THREAT INDEX</span>
                </div>
              </div>

              <div className="p-6 space-y-6 flex-1">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Detected Anomalies</h4>
                  <ul className="space-y-3">
                    {result.threats.map((threat, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs text-slate-300">
                        <ShieldAlert size={14} className="text-[#ff2a2a] shrink-0 mt-0.5" />
                        {threat}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-[#0d1520] border-l-2 border-[#ff2a2a]">
                   <h4 className="text-[10px] font-bold text-[#ff2a2a] uppercase tracking-widest mb-2">Technical Insight</h4>
                   <p className="text-xs text-slate-400 italic leading-relaxed">
                     {activeTab === 'vishing' ? result.transcript : result.analysis}
                   </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button className="w-full py-3 border border-[#1b2636] text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:bg-[#1b2636] hover:text-white transition-all">
                  Generate Forensic Report
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-[#131d2b] border border-[#1b2636] h-full flex flex-col items-center justify-center p-8 text-center border-dashed">
              <div className="w-16 h-16 rounded-full bg-[#1b2636] flex items-center justify-center mb-4">
                <Activity className="text-slate-500" />
              </div>
              <h4 className="font-syne font-bold text-white mb-2">Awaiting Input</h4>
              <p className="text-xs text-slate-500 max-w-[200px] leading-relaxed">
                Run a security scan to evaluate audio authenticity and detect fraud patterns.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
