import React, { useState } from 'react';
import { Mail, Search, AlertCircle, ShieldAlert, Activity } from 'lucide-react';
import Badge from '../Shared/Badge';

export default function PhishingEmailAnalyzer() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setResult({
        level: 'MEDIUM',
        score: 64,
        flags: ['Fake government domain (irs-gov-secure.com)', 'Urgent action request', 'Generic greeting used']
      });
      setAnalyzing(false);
    }, 1500);
  };

  const getScoreColor = (score) => {
    if (score > 70) return 'text-[#ff2a2a]';
    if (score > 40) return 'text-[#a855f7]';
    return 'text-[#10b981]';
  };

  return (
    <section className="bg-[#131d2b] border border-[#1b2636] flex flex-col md:flex-row min-h-[450px] animate-fade-slide-up opacity-0 relative" style={{ animationDelay: '300ms' }}>
      <div className="absolute top-0 left-0 w-[4px] h-full bg-[#a855f7]" />
      
      {/* Input Area */}
      <div className="flex-1 p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#1b2636]">
        <div className="flex flex-col gap-1 mb-8">
          <div className="flex items-center gap-3">
            <Mail size={22} className="text-[#a855f7]" />
            <h2 className="font-syne font-bold text-2xl text-white tracking-wide uppercase">Email Insight</h2>
          </div>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold ml-9">Advanced Phishing & Deception Analysis</p>
        </div>
        
        <div className="space-y-6 flex-1">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#a855f7] font-bold mb-2">Source / Sender Reference</label>
              <input 
                type="text" 
                className="w-full bg-[#0d1520] border border-[#1b2636] focus:border-[#a855f7] p-4 text-sm outline-none font-dmsans text-slate-300 transition-colors placeholder:text-slate-600"
                placeholder="e.g. support@irs-gov-secure.com"
                defaultValue="support@irs-gov-secure.com"
              />
            </div>
            <div className="flex-1">
              <label className="block text-[10px] uppercase tracking-widest text-[#a855f7] font-bold mb-2">Message Body Analysis</label>
              <textarea 
                className="w-full min-h-[140px] bg-[#0d1520] border border-[#1b2636] focus:border-[#a855f7] p-4 text-sm resize-none outline-none font-dmsans text-slate-300 transition-colors placeholder:text-slate-600 leading-relaxed"
                placeholder="Paste email content..."
                defaultValue="Dear Customer, your tax refund is waiting. Click here within 24 hours to claim it or you will be fined."
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-8">
          <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
            <ShieldAlert size={14} className="text-[#a855f7]/50" />
            Neural Protocol v4.2
          </div>
          <button 
            onClick={handleAnalyze}
            disabled={analyzing}
            className="bg-[#a855f7]/10 hover:bg-[#a855f7]/20 text-[#a855f7] border border-[#a855f7]/30 font-syne font-bold py-4 px-10 flex items-center justify-center gap-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed tracking-widest text-xs"
          >
            {analyzing ? (
              <span className="w-5 h-5 border-2 border-[#a855f7]/30 border-t-[#a855f7] rounded-full animate-spin" />
            ) : (
              <><Search size={18} /> SCAN REPOSITORY</>
            )}
          </button>
        </div>
      </div>

      {/* Result Panel */}
      <div className="w-full md:w-[360px] bg-[#0d1520]/50 p-8 flex flex-col justify-center border-t md:border-t-0 md:border-l border-[#1b2636]">
        {!result ? (
          <div className="flex flex-col items-center justify-center text-slate-500 h-full py-12 text-center">
            <div className="w-20 h-20 rounded-full border border-[#1b2636] flex items-center justify-center mb-6 bg-[#0d1520]">
              <Activity size={32} className="opacity-20 animate-pulse text-[#a855f7]" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-500">Awaiting<br/>Inbound Packet</p>
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
               <p className="text-[10px] uppercase text-slate-500 font-bold tracking-[0.4em] mt-6">Threat Index</p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Identified Flags</h4>
              <ul className="space-y-3">
                {result.flags.map((flag, i) => (
                  <li key={i} className="text-[11px] font-medium text-slate-300 flex items-start gap-4 p-3 bg-[#131d2b] border border-[#1b2636] group hover:border-[#a855f7]/30 transition-colors">
                    <span className="text-[#a855f7] mt-1 shrink-0 w-2 h-2 bg-[#a855f7] rounded-none"></span>
                    <span className="uppercase tracking-widest font-bold leading-relaxed">{flag}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button className="w-full py-4 border border-[#1b2636] text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] hover:bg-[#1b2636] hover:text-[#a855f7] transition-all border-dashed">
              Seal Forensic Log
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
