import React from 'react';
import { Link } from 'react-router';

const Dashboard = () => {
  const tools = [
    {
      title: 'Scam Detection',
      description: 'Analyze transcripts from phone calls or text messages for potential scams and impersonation.',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      path: '/dashboard/scam-detection',
      color: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    },
    {
      title: 'Phishing Analyzer',
      description: 'Scan emails to uncover deceptive senders, malicious links, and phishing keywords.',
      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      path: '/dashboard/phishing-analyzer',
      color: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    },
    {
      title: 'Domain Checker',
      description: 'Verify if a suspected URL matches an official domain or is a typosquatting fake.',
      icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
      path: '/dashboard/domain-checker',
      color: 'bg-safe-green/20 text-safe-green border-safe-green/30'
    },
    {
      title: 'Document Verification',
      description: 'Upload digital documents and verify their cryptographic hash against trusted records.',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      path: '/dashboard/document-verification',
      color: 'bg-suspicious-yellow/20 text-suspicious-yellow border-suspicious-yellow/30'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
      
      {/* Hero Header */}
      <div className="bg-slate-800/50 rounded-2xl p-8 lg:p-12 border border-slate-700 shadow-xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-safe-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2">
            TrustLayer <span className="text-transparent bg-clip-text bg-gradient-to-r from-safe-green to-emerald-400">Lite X</span>
          </h1>
          <p className="text-xl text-slate-300 font-light max-w-2xl leading-relaxed">
            Digital Threat Detection Platform designed to protect against impersonation, phishing, and tampered digital assets.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
        {tools.map((tool) => (
          <Link 
            key={tool.title} 
            to={tool.path}
            className="group block"
          >
            <div className="bg-slate-900 border border-slate-700/50 hover:border-slate-500 rounded-xl p-6 h-full transition-all duration-300 hover:shadow-2xl hover:shadow-slate-800 hover:-translate-y-1">
              <div className={`w-14 h-14 rounded-lg flex items-center justify-center border mb-6 transition-transform group-hover:scale-110 ${tool.color}`}>
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tool.icon} />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white mb-3 group-hover:text-safe-green transition-colors">{tool.title}</h2>
              <p className="text-slate-400 leading-relaxed text-sm">
                {tool.description}
              </p>
              
              <div className="mt-6 flex items-center text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                Open Tool 
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
