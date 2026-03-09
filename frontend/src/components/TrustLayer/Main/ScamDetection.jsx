import React, { useState } from 'react';
import { PhoneCall, Fingerprint, Search, AlertCircle } from 'lucide-react';
import Badge from '../Shared/Badge';
import { analyzeScam } from '../../../services/api';

export default function ScamDetection() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [transcript, setTranscript] = useState("Hello, this is fraud department from your bank. We detected suspicious activity. Please verify your identity by providing your routing number immediately, or your account will be locked.");
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!transcript.trim()) return;
    
    setAnalyzing(true);
    setError(null);
    try {
      const response = await analyzeScam(transcript, 'text');
      if (response.success) {
        setResult({
          score: response.data.score,
          level: response.data.risk,
          keywords: response.data.score > 70 ? ['Urgent Attention', 'Verification Needed', 'Suspicious Language'] : ['Safe Pattern']
        });
      }
    } catch (err) {
      setError(err.message || "Failed to analyze transcript.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <section className="bg-[#131d2b] border border-[#1b2636] flex flex-col md:flex-row min-h-[300px] animate-fade-slide-up opacity-0 relative" style={{ animationDelay: '200ms' }}>
      <div className="absolute top-0 left-0 w-[4px] h-full bg-[#ff2a2a]" />
      
      {/* Input Area */}
      <div className="flex-1 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#1b2636]">
        <div className="flex items-center gap-2 mb-4">
          <PhoneCall size={18} className="text-[#22d3ee]" />
          <h2 className="font-syne font-bold text-white tracking-wide">Scam Call Detection</h2>
        </div>
        <textarea 
          className="flex-1 min-h-[120px] w-full bg-[#0d1520] border border-[#1b2636] focus:border-[#22d3ee] p-4 text-sm resize-none outline-none font-dmsans text-slate-300 transition-colors placeholder:text-slate-600 mb-4"
          placeholder="Paste call transcript here..."
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
        />
        <div className="flex justify-end">
          <button 
            onClick={handleAnalyze}
            disabled={analyzing}
            className="bg-[#22d3ee]/10 hover:bg-[#22d3ee]/20 text-[#22d3ee] border border-[#22d3ee]/30 font-syne font-bold py-2 px-6 flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {analyzing ? (
              <span className="w-4 h-4 border-2 border-[#22d3ee]/30 border-t-[#22d3ee] rounded-full animate-spin" />
            ) : (
              <><Search size={16} /> Analyze Transcript</>
            )}
          </button>
        </div>
        {error && (
          <div className="mt-4 flex items-center gap-2 text-[#ff2a2a] text-xs font-bold animate-pulse">
            <AlertCircle size={14} />
            {error}
          </div>
        )}
      </div>

      {/* Result Panel */}
      <div className="w-full md:w-[320px] bg-[#0d1520]/50 p-6 flex flex-col justify-center">
        {!result ? (
          <div className="flex flex-col items-center justify-center text-slate-500 h-full">
            <Fingerprint size={32} className="mb-3 opacity-20" />
            <p className="text-xs uppercase tracking-widest font-bold">Awaiting Input</p>
          </div>
        ) : (
          <div className="animate-fade-slide-up">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs uppercase text-slate-400 font-bold tracking-widest">Risk Score</span>
              <Badge level={result.level} />
            </div>
            <div className="flex items-end gap-1 mb-8">
              <span className="text-6xl font-syne font-bold text-[#ff2a2a] leading-none">{result.score}</span>
              <span className="text-slate-500 mb-1">/100</span>
            </div>
            
            <div className="space-y-3">
              <span className="text-xs uppercase text-slate-400 font-bold tracking-widest">Detected Flags</span>
              <div className="flex flex-wrap gap-2">
                {result.keywords.map(kw => (
                  <span key={kw} className="text-[11px] font-bold tracking-wider border border-[#1b2636] bg-[#131d2b] text-slate-300 px-2 py-1 uppercase">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
