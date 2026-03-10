import React, { useState } from 'react';
import { UploadCloud, ShieldAlert, Activity, Video } from 'lucide-react';
import Badge from '../Shared/Badge';

export default function DeepfakeAnalyzer() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
        setResult({
          level: 'CRITICAL',
          score: 95,
          flags: ['Facial Jitter Detected', 'Blink Rate Anomaly (0.08hz)', 'Resolution Mismatch', 'Unnatural Lip Sync'],
          summary: 'Deepfake Video Analysis'
        });
      setAnalyzing(false);
    }, 2000);
  };

  const getScoreColor = (score) => {
    if (score > 70) return 'text-[#ff2a2a]';
    if (score > 40) return 'text-[#f59e0b]';
    return 'text-[#10b981]';
  };

  return (
    <div className="animate-fade-slide-up space-y-8">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-4">
             <div className="p-2 bg-[#0d1520] border border-[#ff2a2a]/30 text-[#ff2a2a]">
                <Video size={24} />
             </div>
             <div>
                <h2 className="font-syne font-bold text-3xl text-white uppercase tracking-tight">
                  Deepfake Video <span className="text-slate-600">Analysis</span>
                </h2>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
                  Facial Artifact & Temporal Consistency Scanning
                </p>
             </div>
          </div>
        </div>
      </div>

      <section className="bg-[#131d2b] border border-[#1b2636] flex flex-col md:flex-row min-h-[450px] relative overflow-hidden bg-[#ff2a2a]/5">
        <div className="absolute top-0 left-0 w-[4px] h-full transition-colors duration-500 bg-[#ff2a2a]" />
        
        {/* Input Area */}
        <div className="flex-1 p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#1b2636]">
          <div className="relative group flex-1 flex flex-col items-center justify-center">
            
            <div className="absolute inset-0 border border-dashed border-[#1b2636] m-4 flex flex-col items-center justify-center bg-[#0d1520]/50 hover:border-[#ff2a2a]/30 transition-colors group cursor-pointer z-10">
                <UploadCloud size={48} className="text-slate-600 group-hover:text-[#ff2a2a] transition-colors mb-4" strokeWidth={1} />
                <h3 className="font-syne font-bold font-medium text-white mb-2">Drop Video File to Scan</h3>
                <p className="text-[11px] text-slate-500 uppercase tracking-widest font-bold">MP4, WEBM up to 50MB</p>
            </div>
            
          </div>
          
          <div className="flex justify-between items-center mt-8 z-20">
            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              <ShieldAlert size={14} className="text-[#ff2a2a] opacity-50" />
              Temporal Engine v4.2
            </div>
            <button 
              onClick={handleAnalyze}
              disabled={analyzing}
              className={`border font-syne font-bold py-4 px-10 flex items-center justify-center gap-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed tracking-widest text-xs bg-[#ff2a2a]/10 border-[#ff2a2a]/30 text-[#ff2a2a]`}
            >
              {analyzing ? (
                <span className="w-5 h-5 border-2 rounded-full animate-spin border-t-transparent border-[#ff2a2a]/30 border-t-[#ff2a2a]" />
              ) : (
                <><Activity size={18} /> INITIATE FRAME SCAN</>
              )}
            </button>
          </div>
        </div>

        {/* Result Panel */}
        <div className="w-full md:w-[360px] bg-[#0d1520]/50 p-8 flex flex-col justify-center border-t md:border-t-0 md:border-l border-[#1b2636]">
          {!result ? (
             <div className="flex flex-col items-center justify-center text-slate-500 h-full py-12 text-center">
              <div className="w-20 h-20 rounded-full border border-[#1b2636] flex items-center justify-center mb-6 bg-[#0d1520]">
                <Activity size={32} className="opacity-20 animate-pulse text-[#ff2a2a]" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-500">Awaiting<br/>Video Matrix</p>
            </div>
          ) : (
            <div className="animate-fade-slide-up space-y-10">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Risk Level</span>
                <Badge level={result.level} />
              </div>

              <div className="text-center py-8 border-y border-[#1b2636]/50 relative">
                 <div className="flex items-end justify-center gap-1">
                   <span className={`text-8xl font-syne font-bold leading-none ${getScoreColor(result.score)}`}>
                     {result.score}
                   </span>
                   <span className="text-slate-600 text-sm font-bold mb-3 uppercase tracking-tighter">/ 100</span>
                 </div>
                 <p className="text-[10px] uppercase text-slate-500 font-bold tracking-[0.4em] mt-6">Temporal Discrepancy Index</p>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Identified Anomalies</h4>
                <ul className="space-y-3">
                  {result.flags.map((flag, i) => (
                    <li key={i} className="text-[11px] font-medium text-slate-300 flex items-start gap-4 p-3 bg-[#131d2b] border border-[#1b2636] group transition-colors hover:border-slate-600">
                      <span className="mt-1 shrink-0 w-2 h-2 rounded-none bg-[#ff2a2a]"></span>
                      <span className="uppercase tracking-widest font-bold leading-relaxed">{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <button className="w-full py-4 border border-[#1b2636] text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] hover:bg-[#1b2636] transition-all border-dashed hover:text-[#ff2a2a]">
                Seal Forensic Log
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
