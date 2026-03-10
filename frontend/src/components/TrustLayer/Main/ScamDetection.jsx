import React, { useState } from 'react';
import { PhoneCall, Fingerprint, Search, AlertCircle, FileText, Activity } from 'lucide-react';
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
          keywords: response.data.score > 70 ? ['Urgent Attention', 'Verification Needed', 'Suspicious Language'] : ['Normal Interaction']
        });
      }
    } catch (err) {
      setError(err.message || "Failed to analyze transcript.");
    } finally {
      setAnalyzing(false);
    }
  };

  const getScoreColor = (score) => {
    if (score > 70) return 'text-[#ff2a2a]';
    if (score > 40) return 'text-[#fde047]';
    return 'text-[#22d3ee]';
  };

  return (
    <section className="bg-[#131d2b] border border-[#1b2636] flex flex-col md:flex-row min-h-[450px] animate-fade-slide-up opacity-0 relative" style={{ animationDelay: '200ms' }}>
      <div className="absolute top-0 left-0 w-[4px] h-full bg-[#22d3ee]" />
      
      {/* Input Area */}
      <div className="flex-1 p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#1b2636]">
        <div className="flex flex-col gap-1 mb-8">
          <div className="flex items-center gap-3">
            <FileText size={22} className="text-[#22d3ee]" />
            <h2 className="font-syne font-bold text-2xl text-white tracking-wide uppercase">Text Analyzer</h2>
          </div>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold ml-9">Neural Scam & Message Detection</p>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <label className="text-[10px] uppercase tracking-widest text-[#22d3ee] font-bold">Input Source Material</label>
          <textarea 
            className="flex-1 min-h-[180px] w-full bg-[#0d1520] border border-[#1b2636] focus:border-[#22d3ee] p-5 text-sm resize-none outline-none font-dmsans text-slate-300 transition-colors placeholder:text-slate-600 leading-relaxed"
            placeholder="Paste call transcript or message content here..."
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-center mt-8">
          <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
            <Fingerprint size={14} className="text-[#22d3ee]/50" />
            Quantized Neural Verification
          </div>
          <button 
            onClick={handleAnalyze}
            disabled={analyzing}
            className="bg-[#22d3ee]/10 hover:bg-[#22d3ee]/20 text-[#22d3ee] border border-[#22d3ee]/30 font-syne font-bold py-4 px-10 flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed group tracking-widest text-xs"
          >
            {analyzing ? (
              <span className="w-5 h-5 border-2 border-[#22d3ee]/30 border-t-[#22d3ee] rounded-full animate-spin" />
            ) : (
              <><Search size={18} className="group-hover:scale-110 transition-transform" /> INITIATE SCAN</>
            )}
          </button>
        </div>
        
        {error && (
          <div className="mt-4 p-4 bg-[#ff2a2a]/10 border border-[#ff2a2a]/20 flex items-center gap-3 text-[#ff2a2a] text-[11px] font-bold uppercase tracking-wide">
            <AlertCircle size={16} />
            {error}
          </div>
        )}
      </div>

      {/* Result Panel */}
      <div className="w-full md:w-[360px] bg-[#0d1520]/50 p-8 flex flex-col justify-center border-t md:border-t-0 md:border-l border-[#1b2636]">
        {!result ? (
          <div className="flex flex-col items-center justify-center text-slate-600 h-full py-12 text-center">
            <div className="w-20 h-20 rounded-full border border-[#1b2636] flex items-center justify-center mb-6 bg-[#0d1520]">
              <Activity size={32} className="opacity-20 animate-pulse text-[#22d3ee]" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-500">Awaiting Neural<br/>Input Stream</p>
          </div>
        ) : (
          <div className="animate-fade-slide-up space-y-10">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Risk Category</span>
              <Badge level={result.level} />
            </div>

            <div className="text-center py-8 border-y border-[#1b2636]/50 relative">
              <div className="flex items-end justify-center gap-1">
                <span className={`text-8xl font-syne font-bold leading-none ${getScoreColor(result.score)}`}>
                  {result.score}
                </span>
                <span className="text-slate-600 text-sm font-bold mb-3 uppercase tracking-tighter">/ 100</span>
              </div>
              <p className="text-[10px] uppercase text-slate-500 font-bold tracking-[0.4em] mt-6">Threat Index</p>
            </div>
            
            <div className="space-y-5">
              <span className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Detection Matrices</span>
              <div className="space-y-3">
                {result.keywords.map(kw => (
                  <div key={kw} className="flex items-center gap-4 p-4 bg-[#131d2b] border border-[#1b2636] group hover:border-[#22d3ee]/50 transition-colors">
                    <div className={`w-2 h-2 rounded-none transition-colors ${result.score > 70 ? 'bg-[#ff2a2a]' : 'bg-[#22d3ee]'}`} />
                    <span className="text-[11px] font-bold tracking-widest text-slate-400 group-hover:text-slate-200 uppercase">
                      {kw}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full py-4 border border-[#1b2636] text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] hover:bg-[#1b2636] hover:text-[#22d3ee] transition-all border-dashed">
              Export to Security Ledger
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
