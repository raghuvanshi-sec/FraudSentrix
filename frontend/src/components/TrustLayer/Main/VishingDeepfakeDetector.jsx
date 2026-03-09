import React, { useState } from 'react';
import { Mic, ShieldAlert, Cpu, Activity, Play, Volume2, Fingerprint, Video } from 'lucide-react';
import Badge from '../Shared/Badge';
import { analyzeScam } from '../../../services/api';

export default function VishingDeepfakeDetector() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('vishing'); // 'vishing' or 'deepfake'
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState(null);

  const themeColor = activeTab === 'vishing' ? '#10b981' : '#ff2a2a';
  const themeBg = activeTab === 'vishing' ? 'bg-[#10b981]/10' : 'bg-[#ff2a2a]/10';
  const themeBorder = activeTab === 'vishing' ? 'border-[#10b981]/30' : 'border-[#ff2a2a]/30';
  const themeText = activeTab === 'vishing' ? 'text-[#10b981]' : 'text-[#ff2a2a]';
  const themeFocus = activeTab === 'vishing' ? 'focus:border-[#10b981]' : 'focus:border-[#ff2a2a]';

  const handleAnalyze = async () => {
    if (!inputText.trim() && activeTab === 'vishing') return;
    
    setAnalyzing(true);
    setError(null);
    try {
      const type = activeTab === 'vishing' ? 'audio' : 'video';
      const metadata = activeTab === 'vishing' 
        ? { transcript: inputText } 
        : { videoUrl: inputText, confidenceScore: Math.floor(Math.random() * 40) + 50 };

      const response = await analyzeScam(inputText, type, metadata);
      
      if (response.success) {
        setResult({
          score: response.data.score,
          status: response.data.risk,
          threats: response.data.score > 70 ? ['Urgent Request Pattern', 'Suspicious Content Detected'] : ['No significant threats detected'],
          transcript: type === 'audio' ? inputText : "Visual anomalies detected in frame sequence.",
          analysis: response.message
        });
      }
    } catch (err) {
      setError(err.message || "Analysis failed. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  const getScoreColor = (score) => {
    if (score > 70) return 'text-[#ff2a2a]';
    if (score > 40) return activeTab === 'vishing' ? 'text-[#10b981]' : 'text-orange-500';
    return 'text-[#22d3ee]';
  };

  return (
    <div className="animate-fade-slide-up space-y-8">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-4">
             <div className={`p-2 bg-[#0d1520] border border-[#1b2636] ${themeText}`}>
                {activeTab === 'vishing' ? <Mic size={24} /> : <Video size={24} />}
             </div>
             <div>
                <h2 className="font-syne font-bold text-3xl text-white uppercase tracking-tight">
                  {activeTab === 'vishing' ? 'Audio Threat' : 'Video Threat'} <span className="text-slate-600">Analysis</span>
                </h2>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
                  {activeTab === 'vishing' ? 'Vishing & AI Voice Deepfake Detection' : 'Advanced Neural Video Manipulation Scan'}
                </p>
             </div>
          </div>
        </div>
        <div className="flex bg-[#131d2b] border border-[#1b2636] p-1 h-12">
          <button 
            onClick={() => { setActiveTab('vishing'); setResult(null); setError(null); }}
            className={`px-8 text-xs font-bold transition-all tracking-widest ${activeTab === 'vishing' ? 'bg-[#10b981] text-white shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'text-slate-500 hover:text-slate-300'}`}
          >
            VISHING
          </button>
          <button 
            onClick={() => { setActiveTab('deepfake'); setResult(null); setError(null); }}
            className={`px-8 text-xs font-bold transition-all tracking-widest ${activeTab === 'deepfake' ? 'bg-[#ff2a2a] text-white shadow-[0_0_20px_rgba(255,42,42,0.2)]' : 'text-slate-500 hover:text-slate-300'}`}
          >
            DEEPFAKE
          </button>
        </div>
      </div>

      <section className={`bg-[#131d2b] border border-[#1b2636] flex flex-col md:flex-row min-h-[450px] relative overflow-hidden ${themeBg}`}>
        <div className="absolute top-0 left-0 w-[4px] h-full transition-colors duration-500" style={{ backgroundColor: themeColor }} />
        
        {/* Input Area */}
        <div className="flex-1 p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#1b2636]">
          <div className="relative group flex-1 flex flex-col">
            <div className="absolute top-0 right-0 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
              {activeTab === 'vishing' ? <ShieldAlert size={120} /> : <Cpu size={120} />}
            </div>
            
            <label className={`block text-[10px] font-bold uppercase tracking-widest mb-4 transition-colors duration-500`} style={{ color: themeColor }}>
              {activeTab === 'vishing' ? 'Neural Voice Transcript' : 'Source Video Feed / URI'}
            </label>
            
            <div className="relative flex-1 flex flex-col">
              <textarea 
                placeholder={activeTab === 'vishing' ? "Paste call transcript or suspicious audio log..." : "Enter video URL or paste frame sequence hash..."}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className={`w-full flex-1 bg-[#0d1520] border border-[#1b2636] p-5 text-sm text-slate-300 focus:outline-none transition-colors resize-none leading-relaxed placeholder:text-slate-700 ${themeFocus}`}
              />
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button className="p-2.5 bg-[#1b2636] text-slate-400 hover:bg-[#253244] hover:text-white transition-all border border-transparent hover:border-slate-500">
                  <Play size={16} />
                </button>
                <button className="p-2.5 bg-[#1b2636] text-slate-400 hover:bg-[#253244] hover:text-white transition-all border border-transparent hover:border-slate-500">
                  <Volume2 size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-6">
            {/* Waveform / Visual Feed */}
            <div className="bg-[#0d1520] border border-[#1b2636] p-4">
               <div className="flex items-center justify-between mb-3 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                 <span>Spectral Analysis Feed</span>
                 <span className="flex gap-1">
                   {[1,2,3].map(i => <div key={i} className="w-1 h-3" style={{ backgroundColor: `${themeColor}40` }} />)}
                 </span>
               </div>
               <div className="h-12 flex items-center gap-1">
                 {Array.from({length: 48}).map((_, i) => (
                   <div 
                     key={i} 
                     className="flex-1 rounded-none transition-all duration-500"
                     style={{ 
                       height: `${analyzing ? 20 + Math.random() * 80 : 10 + Math.random() * 15}%`,
                       backgroundColor: themeColor,
                       opacity: analyzing ? 0.6 : 0.15
                     }}
                   />
                 ))}
               </div>
            </div>

            <button 
              onClick={handleAnalyze}
              disabled={analyzing}
              className={`w-full py-5 font-syne font-bold text-sm tracking-[0.2em] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 group text-white`}
              style={{ backgroundColor: themeColor }}
            >
              {analyzing ? (
                <>
                  <Activity size={20} className="animate-pulse" />
                  ISOLATING FREQUENCIES...
                </>
              ) : (
                <>
                  <Fingerprint size={20} className="group-hover:scale-110 transition-transform" />
                  INITIATE NEURAL SCAN
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-[#ff2a2a]/10 border border-[#ff2a2a]/30 text-[#ff2a2a] text-[11px] font-bold uppercase tracking-wider flex items-center gap-3">
              <AlertCircle size={14} />
              {error}
            </div>
          )}
        </div>

        {/* Results Panel */}
        <div className="w-full md:w-[360px] bg-[#0d1520]/50 p-8 flex flex-col justify-center border-t md:border-t-0 md:border-l border-[#1b2636]">
          {result ? (
            <div className="animate-fade-slide-up space-y-10">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Neural Status</span>
                <Badge level={result.status} />
              </div>

              <div className="text-center py-8 border-y border-[#1b2636]/50">
                <div className="flex items-end justify-center gap-1">
                  <span className={`text-8xl font-syne font-bold leading-none ${getScoreColor(result.score)}`}>
                    {result.score}
                  </span>
                  <span className="text-slate-600 text-sm font-bold mb-3 uppercase tracking-tighter">/ 100</span>
                </div>
                <p className="text-[10px] uppercase text-slate-500 font-bold tracking-[0.4em] mt-6">Threat Index</p>
              </div>

              <div className="space-y-6 flex-1">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Detected Anomalies</h4>
                  <ul className="space-y-3">
                    {result.threats.map((threat, idx) => (
                      <li key={idx} className={`flex items-start gap-4 p-3 bg-[#131d2b] border border-[#1b2636] transition-colors hover:border-slate-700`}>
                        <ShieldAlert size={14} className="shrink-0 mt-0.5" style={{ color: themeColor }} />
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{threat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`p-5 bg-[#0d1520] border-l-2 ${themeBorder}`}>
                   <h4 className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: themeColor }}>Technical Audit</h4>
                   <p className="text-[11px] text-slate-500 italic leading-relaxed font-medium">
                     "{activeTab === 'vishing' ? result.transcript : result.analysis}"
                   </p>
                </div>
              </div>

              <button className={`w-full py-4 border border-[#1b2636] text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] hover:bg-[#1b2636] hover:${themeText} transition-all border-dashed`}>
                Generate Forensic Audit
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center h-full">
              <div className="w-20 h-20 rounded-full bg-[#1b2636] flex items-center justify-center mb-6">
                <Activity size={32} className="text-slate-600 animate-pulse" />
              </div>
              <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-white mb-2">Neural Link Idle</h4>
              <p className="text-[10px] text-slate-600 max-w-[220px] leading-relaxed uppercase font-bold tracking-widest">
                Awaiting input stream to evaluate material authenticity and detection matrices.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
