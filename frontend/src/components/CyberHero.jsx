import React from 'react';

const CyberHero = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl mb-12 group">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none"></div>
      
      {/* Animated Glow Elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-safe-green/20 rounded-full blur-3xl opacity-50 mix-blend-screen group-hover:opacity-70 transition-opacity duration-1000 animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-50 mix-blend-screen group-hover:opacity-70 transition-opacity duration-1000"></div>

      <div className="relative z-10 px-8 py-16 md:px-12 md:py-20 lg:py-24 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div className="flex-1 space-y-8 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-slate-800/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-700/50 shadow-inner">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-safe-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-safe-green"></span>
            </span>
            <span className="text-xs font-semibold tracking-wider text-slate-300 uppercase">System Active & Monitoring</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] animate-in slide-in-from-left duration-700">
            Defend Against <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-safe-green via-emerald-400 to-teal-500">
              Digital Deception
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed max-w-xl">
            TrustLayer Lite X is an advanced threat detection platform. We analyze transcripts, scrutinize domains, and cryptographically verify documents to protect you from modern scams.
          </p>
          
           <div className="flex flex-wrap items-center gap-4 pt-4">
            <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
               <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
               Zero-Trust Architecture
            </div> 
            
            
 
            <div className="w-1.5 h-1.5 rounded-full bg-slate-700 hidden sm:block"></div>
            <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
               <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
               Real-time Analysis
            </div>
          </div>
        </div>

        {/* Right Visual / Radar Element */}
        <div className="hidden lg:flex flex-col items-center justify-center relative w-72 h-72 shrink-0">
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border border-slate-700/30 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]"></div>
          {/* Middle Ring */}
          <div className="absolute inset-8 rounded-full border border-slate-600/40"></div>
          {/* Inner Ring */}
          <div className="absolute inset-16 rounded-full border border-slate-500/50 bg-slate-800/20 backdrop-blur-sm flex items-center justify-center">
             <svg className="w-10 h-10 text-safe-green opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
             </svg>
          </div>
          
          {/* Scanner Line */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
             <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-safe-green/20 to-transparent origin-right animate-spin" style={{ animationDuration: '3s' }}></div>
          </div>

          <div className="absolute -bottom-8 bg-slate-800 border border-slate-700 mx-auto px-4 py-1.5 rounded-lg shadow-lg">
             <div className="text-xs font-mono text-slate-400">Status <span className="text-safe-green font-semibold ml-2">SECURE</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberHero;
