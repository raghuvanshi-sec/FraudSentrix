import React, { useState } from 'react';
import { Mail, Search, AlertCircle } from 'lucide-react';
import Badge from '../Shared/Badge';

export default function PhishingEmailAnalyzer() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setResult({
        level: 'MEDIUM',
        flags: ['Fake government domain (irs-gov-secure.com)', 'Urgent action request', 'Generic greeting used']
      });
      setAnalyzing(false);
    }, 1500);
  };

  return (
    <section className="bg-[#131d2b] border border-[#1b2636] flex flex-col md:flex-row min-h-[300px] animate-fade-slide-up opacity-0 relative" style={{ animationDelay: '300ms' }}>
      <div className="absolute top-0 left-0 w-[4px] h-full bg-[#fde047]" />
      
      {/* Input Area */}
      <div className="flex-1 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#1b2636]">
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Mail size={18} className="text-[#fde047]" />
            <h2 className="font-syne font-bold text-white tracking-wide">Phishing Email Analyzer</h2>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">Sender Address</label>
              <input 
                type="text" 
                className="w-full bg-[#0d1520] border border-[#1b2636] focus:border-[#fde047] p-3 text-sm outline-none font-dmsans text-slate-300 transition-colors placeholder:text-slate-600"
                placeholder="e.g. support@irs-gov-secure.com"
                defaultValue="support@irs-gov-secure.com"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">Email Body</label>
              <textarea 
                className="w-full min-h-[100px] bg-[#0d1520] border border-[#1b2636] focus:border-[#fde047] p-3 text-sm resize-none outline-none font-dmsans text-slate-300 transition-colors placeholder:text-slate-600"
                placeholder="Paste email content..."
                defaultValue="Dear Customer, your tax refund is waiting. Click here within 24 hours to claim it or you will be fined."
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button 
            onClick={handleAnalyze}
            disabled={analyzing}
            className="bg-[#fde047]/10 hover:bg-[#fde047]/20 text-[#fde047] border border-[#fde047]/30 font-syne font-bold py-2 px-6 flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {analyzing ? (
              <span className="w-4 h-4 border-2 border-[#fde047]/30 border-t-[#fde047] rounded-full animate-spin" />
            ) : (
              <><Search size={16} /> Scan Email</>
            )}
          </button>
        </div>
      </div>

      {/* Result Panel */}
      <div className="w-full md:w-[320px] bg-[#0d1520]/50 p-6 flex flex-col justify-center">
        {!result ? (
          <div className="flex flex-col items-center justify-center text-slate-500 h-full">
            <AlertCircle size={32} className="mb-3 opacity-20" />
            <p className="text-xs uppercase tracking-widest font-bold">Awaiting Scan</p>
          </div>
        ) : (
          <div className="animate-fade-slide-up">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs uppercase text-slate-400 font-bold tracking-widest">Threat Level</span>
              <Badge level={result.level} />
            </div>
            
            <div className="space-y-4 mt-6">
              <h4 className="text-[11px] uppercase text-slate-500 font-bold tracking-widest">Identified Flags</h4>
              <ul className="space-y-3">
                {result.flags.map((flag, i) => (
                  <li key={i} className="text-sm font-medium text-slate-300 flex items-start gap-2">
                    <span className="text-[#fde047] mt-1 shrink-0 w-1.5 h-1.5 bg-[#fde047] rounded-none"></span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
