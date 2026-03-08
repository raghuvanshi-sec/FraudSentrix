import React, { useState } from 'react';
import ResultCard from '../components/ResultCard';
import RiskBadge from '../components/RiskBadge';
import Loader from '../components/Loader';
import InputBox from '../components/InputBox';
import { analyzeScam } from '../services/api';

const VishingDetection = () => {
  const [callerId, setCallerId] = useState('');
  const [transcript, setTranscript] = useState('');
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!transcript.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const metadata = {
        callerId,
        duration: parseInt(duration) || 0,
        transcript
      };
      const response = await analyzeScam(transcript, 'audio', metadata);
      setResult(response.data);
    } catch (err) {
      setError(err.message || 'Failed to analyze vishing report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Vishing (Voice Scam) Detection</h1>
        <p className="text-slate-400">Analyze phone call transcripts and metadata to identify voice-based fraudulent activities.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Input Section */}
        <div className="space-y-6">
          <form onSubmit={handleAnalyze} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg">
            <InputBox
              id="callerId"
              label="Caller ID / Phone Number"
              placeholder="e.g., +1 (555) 000-1234"
              value={callerId}
              onChange={(e) => setCallerId(e.target.value)}
              className="mb-4"
            />

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-400 mb-2">Call Duration (seconds)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g., 120"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
              />
            </div>

            <InputBox
              as="textarea"
              id="transcript"
              label="Call Transcript"
              placeholder="Paste the transcription of the call here..."
              rows={6}
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              className="mb-6"
            />
            
            <button
              type="submit"
              disabled={loading || !transcript.trim()}
              className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {loading ? (
                <>
                  <Loader className="mr-2 h-5 w-5 border-t-white" />
                  Analyzing Audio...
                </>
              ) : (
                'Analyze Call'
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
            <ResultCard title="Vishing Assessment" className="animate-in slide-in-from-bottom-4 duration-500">
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

                <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Deduplication Hash</p>
                  <p className="text-xs text-slate-400 break-all font-mono">{result.hash}</p>
                </div>
                
                {result.risk === 'HIGH' && (
                  <div className="mt-6 p-4 bg-risk-red/5 border border-risk-red/20 rounded-lg">
                    <p className="text-risk-red text-sm font-medium flex items-start gap-2">
                      <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      This voice transcript matches known social engineering patterns. Advise the user to hang up immediately.
                    </p>
                  </div>
                )}
              </div>
            </ResultCard>
          ) : (
            <div className="h-full border-2 border-dashed border-slate-700/50 rounded-2xl flex flex-col items-center justify-center p-8 text-center bg-slate-800/20 text-slate-500">
               <svg className="w-16 h-16 mb-4 text-slate-600 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              <p>Enter caller details and transcript to perform a voice scam analysis.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VishingDetection;
