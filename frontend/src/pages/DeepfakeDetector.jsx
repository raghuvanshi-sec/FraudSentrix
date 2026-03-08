import React, { useState } from 'react';
import ResultCard from '../components/ResultCard';
import RiskBadge from '../components/RiskBadge';
import Loader from '../components/Loader';
import InputBox from '../components/InputBox';
import { analyzeDeepfake } from '../services/api';

const DeepfakeDetector = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [manipulationType, setManipulationType] = useState('face-swap');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!videoUrl.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await analyzeDeepfake(videoUrl, manipulationType);
      setResult(response.data);
    } catch (err) {
      setError(err.message || 'Failed to analyze video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Deepfake Content Detector</h1>
        <p className="text-slate-400">Scan videos for AI-generated facial manipulations, lip-syncing, and synthetic media.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Input Section */}
        <div className="space-y-6">
          <form onSubmit={handleAnalyze} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg">
            
            <InputBox
              id="videoUrl"
              label="Video URL (S3/CDN/Public)"
              type="url"
              placeholder="e.g., https://example.com/suspicious-video.mp4"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="mb-4"
            />

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-400 mb-2">Detection Focus</label>
              <select 
                value={manipulationType}
                onChange={(e) => setManipulationType(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-red-500/50 outline-none transition-all appearance-none"
              >
                <option value="face-swap">Face Swap Detection</option>
                <option value="lip-sync">Lip Sync Analysis</option>
                <option value="voice-clone">Synthetic Voice Match</option>
                <option value="entire-synthetic">Full Generative Video</option>
              </select>
            </div>
            
            <button
              type="submit"
              disabled={loading || !videoUrl.trim()}
              className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center shadow-[0_4px_20px_-5px_rgba(220,38,38,0.4)]"
            >
              {loading ? (
                <>
                  <Loader className="mr-2 h-5 w-5 border-t-white" />
                  Running Neural Scan...
                </>
              ) : (
                'Scan for Deepfakes'
              )}
            </button>
          </form>

          <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl">
            <h4 className="text-sm font-bold text-slate-300 mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Technical Note
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Detection uses spatial-temporal consistency checks and frequency domain analysis to identify synthetic artifacts common in GAN and Diffusion-based generators.
            </p>
          </div>

          {error && (
            <div className="p-4 bg-risk-red/10 border border-risk-red/30 rounded-lg text-risk-red text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Results Section */}
        <div>
          {result ? (
            <ResultCard title="Deepfake Analysis" className="animate-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-700 pb-4">
                  <span className="text-slate-400 font-medium">Result</span>
                  <RiskBadge level={result.risk} />
                </div>
                
                <div className="flex justify-between items-center border-b border-slate-700 pb-4">
                  <span className="text-slate-400 font-medium">Deepfake Confidence</span>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-3xl font-bold ${
                      result.score > 70 ? 'text-risk-red' : result.score > 40 ? 'text-suspicious-yellow' : 'text-safe-green'
                    }`}>
                      {result.score}%
                    </span>
                  </div>
                </div>

                {/* Progress Bar for Confidence */}
                <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${
                      result.score > 70 ? 'bg-risk-red' : result.score > 40 ? 'bg-suspicious-yellow' : 'bg-safe-green'
                    }`}
                    style={{ width: `${result.score}%` }}
                  ></div>
                </div>

                <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700 flex items-center justify-center aspect-video relative overflow-hidden group">
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                   <svg className="w-12 h-12 text-white/50 relative z-10 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.632l-3-2z" clipRule="evenodd" />
                   </svg>
                   <p className="absolute bottom-3 left-3 z-10 text-[10px] text-slate-300 font-mono uppercase tracking-widest">Preview: {manipulationType}</p>
                </div>
                
                {result.risk === 'HIGH' && (
                  <div className="mt-6 p-4 bg-risk-red/5 border border-risk-red/20 rounded-lg">
                    <p className="text-risk-red text-sm font-medium flex items-start gap-2">
                      <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" clipRule="evenodd" />
                      </svg>
                      CRITICAL: Highly synthetic artifacts detected. This content is likely generated or manipulated by AI.
                    </p>
                  </div>
                )}
              </div>
            </ResultCard>
          ) : (
            <div className="h-full border-2 border-dashed border-slate-700/50 rounded-2xl flex flex-col items-center justify-center p-8 text-center bg-slate-800/20 text-slate-500">
               <svg className="w-16 h-16 mb-4 text-slate-600 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <p>Provide a video link to perform an AI-driven deepfake analysis.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeepfakeDetector;
