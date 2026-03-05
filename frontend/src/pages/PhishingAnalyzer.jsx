import React, { useState } from 'react';
import ResultCard from '../components/ResultCard';
import RiskBadge from '../components/RiskBadge';
import Loader from '../components/Loader';
import InputBox from '../components/InputBox';
import { analyzePhishing } from '../services/api';

const PhishingAnalyzer = () => {
  const [senderEmail, setSenderEmail] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!emailContent.trim() || !senderEmail.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await analyzePhishing(emailContent, senderEmail);
      setResult(response.data);
    } catch (err) {
      setError(err.message || 'Failed to analyze email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Phishing Analyzer</h1>
        <p className="text-slate-400">Scan emails to uncover deceptive senders, malicious patterns, and urgency traps.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Input Section */}
        <div className="space-y-6">
          <form onSubmit={handleAnalyze} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg">
            
            <InputBox
              id="senderEmail"
              label="Sender Email Address"
              type="email"
              placeholder="e.g., alert@secure-paypal-verify.com"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              className="mb-4"
            />

            <InputBox
              as="textarea"
              id="emailContent"
              label="Email Content"
              placeholder="Paste the body of the suspicious email here..."
              rows={6}
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              className="mb-6"
            />
            
            <button
              type="submit"
              disabled={loading || !emailContent.trim() || !senderEmail.trim()}
              className="w-full bg-purple-500 hover:bg-purple-400 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {loading ? (
                <>
                  <Loader className="mr-2 h-5 w-5 border-t-white" />
                  Scanning Email...
                </>
              ) : (
                'Analyze Email'
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
            <ResultCard title="Phishing Analysis" className="animate-in slide-in-from-bottom-4 duration-500">
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

                {result.domainMismatch && (
                  <div className="p-3 bg-risk-red/10 border border-risk-red/30 rounded-lg flex items-start gap-3">
                    <svg className="w-5 h-5 text-risk-red mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                      <h4 className="text-risk-red font-bold text-sm">Domain Warning</h4>
                      <p className="text-slate-300 text-sm mt-1">The sender email comes from a free or public domain (like gmail.com) but the content claims to be from an official organization.</p>
                    </div>
                  </div>
                )}

                {result.keywordHits && result.keywordHits.length > 0 && (
                  <div>
                    <span className="text-slate-400 font-medium block mb-3">Suspicious Keywords Found</span>
                    <div className="flex flex-wrap gap-2">
                      {result.keywordHits.map((word, i) => (
                        <span key={i} className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-md text-sm text-slate-300">
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ResultCard>
          ) : (
            <div className="h-full border-2 border-dashed border-slate-700/50 rounded-2xl flex flex-col items-center justify-center p-8 text-center bg-slate-800/20 text-slate-500">
               <svg className="w-16 h-16 mb-4 text-slate-600 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p>Enter the sender's email and message body to check for phishing indicators.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhishingAnalyzer;
