import React from 'react';
import { Link } from 'react-router';
import CyberHero from '../components/CyberHero';

const Dashboard = () => {
  const tools = [
    {
      title: 'Text Analyzer',
      description: 'Analyze transcripts from phone calls or text messages for potential scams and impersonation.',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      path: '/dashboard/scam-detection',
      color: 'bg-[#22d3ee]/10 text-[#22d3ee] border-[#22d3ee]/30 group-hover:bg-[#22d3ee]/20 group-hover:border-[#22d3ee]/50',
      glow: 'group-hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.3)]'
    },
    {
      title: 'Vishing Detection',
      description: 'Analyze phone call transcripts and metadata to identifying voice-based phishing and social engineering.',
      icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z',
      path: '/dashboard/vishing-detection',
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 group-hover:bg-emerald-500/20 group-hover:border-emerald-400/50',
      glow: 'group-hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]'
    },
    {
      title: 'Deepfake Detector',
      description: 'Scan videos for AI-generated facial manipulations, lip-syncing, and synthetic media artifacts.',
      icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
      path: '/dashboard/deepfake-detector',
      color: 'bg-red-500/10 text-red-400 border-red-500/30 group-hover:bg-red-500/20 group-hover:border-red-400/50',
      glow: 'group-hover:shadow-[0_0_30px_-5px_rgba(239,68,68,0.3)]'
    },
    {
      title: 'Phishing Analyzer',
      description: 'Scan emails to uncover deceptive senders, malicious links, and phishing keywords.',
      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      path: '/dashboard/phishing-analyzer',
      color: 'bg-purple-500/10 text-purple-400 border-purple-500/30 group-hover:bg-purple-500/20 group-hover:border-purple-400/50',
      glow: 'group-hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)]'
    },
    {
      title: 'Domain Checker',
      description: 'Verify if a suspected URL matches an official domain or is a typosquatting fake.',
      icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
      path: '/dashboard/domain-checker',
      color: 'bg-safe-green/10 text-safe-green border-safe-green/30 group-hover:bg-safe-green/20 group-hover:border-safe-green/50',
      glow: 'group-hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]'
    },
    {
      title: 'Document Verification',
      description: 'Upload digital documents and verify their cryptographic hash against trusted records.',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      path: '/dashboard/document-verification',
      color: 'bg-suspicious-yellow/10 text-suspicious-yellow border-suspicious-yellow/30 group-hover:bg-suspicious-yellow/20 group-hover:border-suspicious-yellow/50',
      glow: 'group-hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.3)]'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in zoom-in-95 duration-500 pb-12">
      
      {/* Premium Integrated Hero */}
      <CyberHero />

      {/* Analyzer Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
         {/* Decorative Grid Background for Cards */}
         <div className="absolute inset-x-0 -top-12 -bottom-12 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800/20 via-transparent to-transparent -z-10 pointer-events-none"></div>

        {tools.map((tool) => (
          <Link 
            key={tool.title} 
            to={tool.path}
            className={`group block relative rounded-none bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800 p-8 transition-all duration-500 overflow-hidden hover:-translate-y-1 ${tool.glow}`}
          >
            {/* Hover Gradient Overlay */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${tool.color.split(' ')[0]}`}></div>
            
            <div className="relative z-10">
               <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center border transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${tool.color}`}>
                     <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tool.icon} />
                     </svg>
                  </div>
                  
                  {/* Arrow Icon */}
                  <div className="w-8 h-8 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                     <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                     </svg>
                  </div>
               </div>
               
               <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
                  {tool.title}
               </h2>
               
               <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                  {tool.description}
               </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
