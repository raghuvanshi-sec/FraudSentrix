import React, { useState } from 'react';
import { Mail, Search, ShieldAlert, Activity, Play, Volume2, Fingerprint, Mic } from 'lucide-react';
import Badge from '../Shared/Badge';

export default function PhishingVishingAnalyzer() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('phishing'); // 'phishing' or 'vishing'
  const [inputText, setInputText] = useState('');

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    setAnalyzing(true);
    setTimeout(() => {
      if (activeTab === 'phishing') {
        setResult({
          level: 'MEDIUM',
          score: 64,
          flags: ['Fake government domain detected', 'Urgent action request', 'Generic greeting used'],
          summary: 'Message Body Analysis'
        });
      } else {
         setResult({
          level: 'HIGH',
          score: 89,
          flags: ['Urgent Request Pattern', 'Suspicious Content Detected', 'Voice Cloning Artifacts'],
          summary: 'Audio Transcript Analysis'
        });
      }
      setAnalyzing(false);
    }, 1500);
  };

  const getScoreColor = (score) => {
    if (score > 70) return 'text-[#ff2a2a]';
    if (score > 40) return 'text-[#a855f7]';
    return 'text-[#10b981]';
  };

  const themeColor = activeTab === 'phishing' ? '#a855f7' : '#10b981';
  const themeBg = activeTab === 'phishing' ? 'bg-[#a855f7]/5' : 'bg-[#10b981]/5';

  return (
    <div className="animate-fade-slide-up space-y-8">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-4">
             <div className={`p-2 bg-[#0d1520] border border-[#1b2636]`} style={{ color: themeColor }}>
                {activeTab === 'phishing' ? <Mail size={24} /> : <Mic size={24} />}
             </div>
             <div>
                <h2 className="font-syne font-bold text-3xl text-white uppercase tracking-tight">
                  {activeTab === 'phishing' ? 'Email Insight' : 'Audio Threat'} <span className="text-slate-600">Analysis</span>
                </h2>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
                  {activeTab === 'phishing' ? 'Advanced Phishing & Deception' : 'Vishing & Voice Cloning Detection'}
                </p>
             </div>
          </div>
        </div>
        <div className="flex bg-[#131d2b] border border-[#1b2636] p-1 h-12">
          <button 
            onClick={() => { setActiveTab('phishing'); setResult(null); }}
            className={`px-8 text-xs font-bold transition-all tracking-widest ${activeTab === 'phishing' ? 'bg-[#a855f7] text-white shadow-[0_0_20px_rgba(168,85,247,0.2)]' : 'text-slate-500 hover:text-slate-300'}`}
          >
            PHISHING
          </button>
          <button 
            onClick={() => { setActiveTab('vishing'); setResult(null); }}
            className={`px-8 text-xs font-bold transition-all tracking-widest ${activeTab === 'vishing' ? 'bg-[#10b981] text-white shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'text-slate-500 hover:text-slate-300'}`}
          >
            VISHING
          </button>
        </div>
      </div>

      <section className={`bg-[#131d2b] border border-[#1b2636] flex flex-col md:flex-row min-h-[450px] relative overflow-hidden ${themeBg}`}>
        <div className="absolute top-0 left-0 w-[4px] h-full transition-colors duration-500" style={{ backgroundColor: themeColor }} />
        
        {/* Input Area */}
        <div className="flex-1 p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#1b2636]">
          <div className="relative group flex-1 flex flex-col">
            <div className="absolute top-0 right-0 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
               <ShieldAlert size={120} />
            </div>
            
            {activeTab === 'phishing' && (
              <div className="mb-4">
                <label className="block text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: themeColor }}>Source / Sender Reference</label>
                <input 
                  type="text" 
                  className="w-full bg-[#0d1520] border border-[#1b2636] p-4 text-sm outline-none font-dmsans text-slate-300 transition-colors placeholder:text-slate-600 focus:border-[#a855f7]"
                  placeholder="e.g. support@irs-gov-secure.com"
                />
              </div>
            )}
            
            <label className={`block text-[10px] uppercase tracking-widest font-bold mb-2 transition-colors duration-500`} style={{ color: themeColor }}>
              {activeTab === 'phishing' ? 'Message Body Analysis' : 'Neural Voice Transcript'}
            </label>
            
            <div className="relative flex-1 flex flex-col">
              <textarea 
                className="w-full flex-1 min-h-[140px] bg-[#0d1520] border border-[#1b2636] p-4 text-sm resize-none outline-none font-dmsans text-slate-300 transition-colors placeholder:text-slate-600 leading-relaxed focus:border-current"
                style={{ outlineColor: themeColor }}
                placeholder={activeTab === 'phishing' ? "Paste email content..." : "Paste call transcript or suspicious audio log..."}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              {activeTab === 'vishing' && (
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button className="p-2.5 bg-[#1b2636] text-slate-400 hover:bg-[#253244] hover:text-white transition-all border border-transparent hover:border-slate-500">
                    <Play size={16} />
                  </button>
                  <button className="p-2.5 bg-[#1b2636] text-slate-400 hover:bg-[#253244] hover:text-white transition-all border border-transparent hover:border-slate-500">
                    <Volume2 size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-8">
            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              <ShieldAlert size={14} style={{ color: themeColor, opacity: 0.5 }} />
              Neural Protocol v4.2
            </div>
            <button 
              onClick={handleAnalyze}
              disabled={analyzing}
              className={`border font-syne font-bold py-4 px-10 flex items-center justify-center gap-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed tracking-widest text-xs`}
              style={{ 
                backgroundColor: `${themeColor}1A`, 
                borderColor: `${themeColor}4D`,
                color: themeColor
              }}
            >
              {analyzing ? (
                <span className="w-5 h-5 border-2 rounded-full animate-spin border-t-transparent" style={{ borderColor: `${themeColor}4D`, borderTopColor: themeColor }} />
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
                <Activity size={32} className="opacity-20 animate-pulse" style={{ color: themeColor }} />
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
                    <li key={i} className="text-[11px] font-medium text-slate-300 flex items-start gap-4 p-3 bg-[#131d2b] border border-[#1b2636] group transition-colors hover:border-slate-600">
                      <span className="mt-1 shrink-0 w-2 h-2 rounded-none" style={{ backgroundColor: themeColor }}></span>
                      <span className="uppercase tracking-widest font-bold leading-relaxed">{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="w-full py-4 border border-[#1b2636] text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] hover:bg-[#1b2636] transition-all border-dashed" style={{ '--tw-hover-text': themeColor }}>
                Seal Forensic Log
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
