import React, { useState } from 'react';
import { Globe, Search, ShieldCheck, ShieldAlert } from 'lucide-react';
import Badge from '../Shared/Badge';

export default function DomainImpersonationChecker() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setResult({
        isImpersonation: true,
        distances: 2,
        warning: 'Suspicious domain uses homoglyph (0 instead of o)'
      });
      setAnalyzing(false);
    }, 1200);
  };

  return (
    <section className="bg-[#131d2b] border border-[#1b2636] p-6 animate-fade-slide-up relative opacity-0" style={{ animationDelay: '400ms' }}>
      <div className="absolute top-0 left-0 w-[4px] h-full bg-[#22d3ee]" />

      <div className="flex items-center gap-2 mb-6">
        <Globe size={18} className="text-[#22d3ee]" />
        <h2 className="font-syne font-bold text-white tracking-wide">Domain Impersonation</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Inputs */}
        <div className="flex-1 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">Official Domain</label>
            <input 
              type="text" 
              className="w-full bg-[#0d1520] border border-[#1b2636] focus:border-[#22d3ee] p-3 text-sm outline-none font-dmsans text-slate-300 transition-colors"
              defaultValue="microsoft.com"
            />
          </div>
          <div className="flex items-center justify-center pt-5">
            <span className="text-slate-600 font-bold font-syne">VS</span>
          </div>
          <div className="flex-1">
            <label className="block text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">Suspicious Domain</label>
            <input 
              type="text" 
              className="w-full bg-[#0d1520] border border-[#1b2636] focus:border-[#ff2a2a] p-3 text-sm outline-none font-dmsans text-slate-300 transition-colors"
              defaultValue="micr0soft.com"
            />
          </div>
        </div>

        {/* Action & Result */}
        <div className="w-full lg:w-auto flex flex-col justify-end">
           <button 
            onClick={handleAnalyze}
            disabled={analyzing}
            className="w-full lg:w-auto bg-[#22d3ee]/10 hover:bg-[#22d3ee]/20 text-[#22d3ee] border border-[#22d3ee]/30 font-syne font-bold py-3 px-8 flex items-center justify-center gap-2 transition-colors disabled:opacity-50 h-[46px]"
          >
            {analyzing ? (
              <span className="w-4 h-4 border-2 border-[#22d3ee]/30 border-t-[#22d3ee] rounded-full animate-spin" />
            ) : (
              <><Search size={16} /> Check</>
            )}
          </button>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-[#0d1520] border border-[#ff2a2a]/30 flex items-start flex-col sm:flex-row gap-4 animate-fade-slide-up">
          <div className="mt-1 sm:mt-0 p-2 bg-[#ff2a2a]/10 border border-[#ff2a2a]/30 border-dashed">
            {result.isImpersonation ? <ShieldAlert size={24} className="text-[#ff2a2a]" /> : <ShieldCheck size={24} className="text-[#10b981]" />}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between md:justify-start gap-4 mb-2">
              <h3 className="font-syne font-bold text-white text-lg">Impersonation Detected</h3>
              <Badge level="HIGH" />
            </div>
            <p className="text-sm text-slate-400 font-dmsans">
              {result.warning}. Levenshtein distance: <span className="text-[#ff2a2a] font-bold">{result.distances}</span>
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
