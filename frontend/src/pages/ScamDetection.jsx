import React, { useState } from 'react';
import ResultCard from '../components/ResultCard';
import RiskBadge from '../components/RiskBadge';
import Loader from '../components/Loader';
import InputBox from '../components/InputBox';
import { analyzeScam } from '../services/api';

const ScamDetection = () => {
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!transcript.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await analyzeScam(transcript);
      setResult(response.data);
    } catch (err) {
      setError(err.message || 'Failed to analyze transcript. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Scam Call Detection</h1>
        <p className="text-slate-400">Identify potential "Digital Arrest" and authority impersonation scams from call transcripts or text messages.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Input Section */}
        <div className="space-y-6">
          <form onSubmit={handleAnalyze} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg">
            <InputBox
              as="textarea"
              id="transcript"
              label="Paste Transcript or Message"
              placeholder="e.g., 'This is officer from cyber crime unit. Your Aadhaar is linked to illegal activity...'"
              rows={8}
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              className="mb-6"
            />
            
            <button
              type="submit"
              disabled={loading || !transcript.trim()}
              className="w-full bg-safe-green hover:bg-emerald-500 text-slate-900 font-bold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {loading ? (
                <>
                  <Loader className="mr-2 h-5 w-5" />
                  Analyzing...
                </>
              ) : (
                'Analyze Transcript'
              )}
            </button>
          </form>

          {error && (
            <div className="p-4 bg-risk-red/10 border border-risk-red/30 rounded-lg text-risk-red text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Results Section */}
        <div>
          {result ? (
            <ResultCard title="Analysis Results" className="animate-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-700 pb-4">
                  <span className="text-slate-400 font-medium">Risk Level</span>
                  <RiskBadge level={result.risk} />
                </div>
                
                <div className="flex justify-between items-center border-b border-slate-700 pb-4">
                  <span className="text-slate-400 font-medium">Threat Score</span>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-3xl font-bold ${
                      result.score > 70 ? 'text-risk-red' : result.score > 40 ? 'text-suspicious-yellow' : 'text-safe-green'
                    }`}>
                      {result.score}
                    </span>
                    <span className="text-slate-500 text-sm">/ 100</span>
                  </div>
                </div>

                {result.flags && result.flags.length > 0 && (
                  <div>
                    <span className="text-slate-400 font-medium block mb-3">Detected Flags</span>
                    <div className="flex flex-wrap gap-2">
                      {result.flags.map((flag, i) => (
                        <span key={i} className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-md text-sm text-slate-300">
                          {flag.replace('_', ' ').toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {result.risk === 'HIGH' && (
                  <div className="mt-6 p-4 bg-risk-red/5 border border-risk-red/20 rounded-lg">
                    <p className="text-risk-red text-sm font-medium flex items-start gap-2">
                      <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      This transcript contains patterns closely matching known authority impersonation scams. Do not transfer funds or share personal information.
                    </p>
                  </div>
                )}
              </div>
            </ResultCard>
          ) : (
            <div className="h-full border-2 border-dashed border-slate-700/50 rounded-2xl flex flex-col items-center justify-center p-8 text-center bg-slate-800/20 text-slate-500">
              <svg className="w-16 h-16 mb-4 text-slate-600 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <p>Paste a transcript and click analyze to see the threat assessment here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScamDetection;
