import React, { useState } from 'react';
import ResultCard from '../components/ResultCard';
import RiskBadge from '../components/RiskBadge';
import Loader from '../components/Loader';
import InputBox from '../components/InputBox';
import { checkDomain } from '../services/api';

const DomainChecker = () => {
  const [officialDomain, setOfficialDomain] = useState('');
  const [suspectedDomain, setSuspectedDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!officialDomain.trim() || !suspectedDomain.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await checkDomain(officialDomain, suspectedDomain);
      setResult(response.data);
    } catch (err) {
      setError(err.message || 'Failed to check domain. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Domain Checker</h1>
        <p className="text-slate-400">Identify fake or impersonated domains commonly used in typosquatting and phishing attacks.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Input Section */}
        <div className="space-y-6">
          <form onSubmit={handleAnalyze} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg">
            
            <InputBox
              id="officialDomain"
              label="Known Official Domain"
              type="text"
              placeholder="e.g., paypal.com"
              value={officialDomain}
              onChange={(e) => setOfficialDomain(e.target.value)}
              className="mb-4"
            />

            <InputBox
              id="suspectedDomain"
              label="Suspected / Target Domain"
              type="text"
              placeholder="e.g., paypa1-verify.com"
              value={suspectedDomain}
              onChange={(e) => setSuspectedDomain(e.target.value)}
              className="mb-8"
            />
            
            <button
              type="submit"
              disabled={loading || !officialDomain.trim() || !suspectedDomain.trim()}
              className="w-full bg-safe-green hover:bg-emerald-500 text-slate-900 font-bold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {loading ? (
                <>
                  <Loader className="mr-2 h-5 w-5" />
                  Checking Domains...
                </>
              ) : (
                'Check Domain'
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
            <ResultCard title="Domain Analysis" className="animate-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-6">
                
                <div className="flex justify-between items-center border-b border-slate-700 pb-4">
                  <span className="text-slate-400 font-medium">Classification</span>
                  <RiskBadge level={result.risk} />
                </div>
                
                <div className="flex justify-between items-center border-b border-slate-700 pb-4">
                  <span className="text-slate-400 font-medium">Similarity Match</span>
                  <span className={`text-xl font-bold ${
                    result.similarity > 80 && result.similarity < 100 ? 'text-risk-red' : 'text-slate-200'
                  }`}>
                    {result.similarity}%
                  </span>
                </div>

                <div className="pt-2">
                   <h4 className="text-slate-400 font-medium mb-3">Result Details</h4>
                   <p className={`text-lg font-medium ${result.risk === 'SAFE' ? 'text-safe-green' : 'text-risk-red'}`}>
                     {result.classification}
                   </p>
                   {result.warning && (
                     <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                       {result.warning}
                     </p>
                   )}
                </div>
              </div>
            </ResultCard>
          ) : (
            <div className="h-full min-h-[300px] border-2 border-dashed border-slate-700/50 rounded-2xl flex flex-col items-center justify-center p-8 text-center bg-slate-800/20 text-slate-500">
               <svg className="w-16 h-16 mb-4 text-slate-600 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <p>Enter the real domain and the suspicious domain to evaluate similarities and impersonation risks.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DomainChecker;
