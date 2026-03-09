import React from 'react';
import { Link } from 'react-router';
import { ShieldAlert, Zap, Lock, Eye, ArrowRight, Activity, Terminal } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0d1520] text-slate-300 font-dmsans overflow-hidden flex flex-col">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1b2636_1px,transparent_1px),linear-gradient(to_bottom,#1b2636_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-30"></div>
      
      {/* Dynamic Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#22d3ee]/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-[#ff2a2a]/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Navigation (Simple) */}
      <nav className="relative z-50 flex items-center justify-between px-6 md:px-12 py-8 max-w-[1600px] mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#ff2a2a] flex items-center justify-center">
            <ShieldAlert size={22} className="text-white" />
          </div>
          <span className="font-syne font-bold text-2xl tracking-tighter text-white uppercase">TrustLayerX</span>
        </div>
        <Link 
          to="/dashboard" 
          className="bg-white/5 hover:bg-white/10 text-white border border-white/20 px-6 py-2.5 font-syne font-bold text-xs uppercase tracking-widest transition-all hover:border-white/40"
        >
          Access Terminal
        </Link>
      </nav>

      {/* Hero Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-20 pb-32">
        <div className="inline-flex items-center gap-3 bg-[#131d2b] border border-[#1b2636] px-4 py-2 mb-8 animate-fade-slide-up opacity-0" style={{ animationDelay: '200ms' }}>
          <Activity size={14} className="text-[#22d3ee] animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#22d3ee]">Neural Network Active</span>
        </div>

        <h1 className="text-5xl md:text-8xl font-syne font-bold text-white tracking-tighter mb-8 leading-[0.9] animate-fade-slide-up opacity-0" style={{ animationDelay: '400ms' }}>
          DEFEAT DIGITAL <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] via-white to-[#10b981]">DECEPTION</span>
        </h1>

        <p className="max-w-2xl text-slate-400 text-lg md:text-xl font-medium mb-12 leading-relaxed animate-fade-slide-up opacity-0" style={{ animationDelay: '600ms' }}>
          An advanced heuristic ecosystem designed to expose vishing, deepfakes, and phishing threats through real-time cryptographic verification and neural analysis.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 animate-fade-slide-up opacity-0" style={{ animationDelay: '800ms' }}>
          <Link 
            to="/dashboard" 
            className="group relative bg-[#ff2a2a] hover:bg-[#ff1a1a] text-white px-12 py-5 font-syne font-bold text-sm uppercase tracking-[0.2em] transition-all flex items-center gap-4 overflow-hidden shadow-[0_0_40px_rgba(255,42,42,0.3)] hover:shadow-[0_0_60px_rgba(255,42,42,0.5)]"
          >
            <span className="relative z-10">Initialize System</span>
            <ArrowRight size={18} className="relative z-10 group-hover:translate-x-2 transition-transform" />
            <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform"></div>
          </Link>
          
          <button className="bg-[#131d2b] hover:bg-[#1b2636] text-white border border-[#1b2636] px-12 py-5 font-syne font-bold text-sm uppercase tracking-[0.2em] transition-all flex items-center gap-4">
            <Terminal size={18} />
            View Documentation
          </button>
        </div>

        {/* Feature Grid Overlays */}
        <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full animate-fade-slide-up opacity-0" style={{ animationDelay: '1000ms' }}>
          {[
            { label: 'Voice Isolation', icon: Zap, color: '#10b981' },
            { label: 'Video Forensics', icon: Eye, color: '#ff2a2a' },
            { label: 'Packet Scrutiny', icon: Lock, color: '#a855f7' },
            { label: 'Neural Text Scan', icon: ShieldAlert, color: '#22d3ee' }
          ].map((item, i) => (
            <div key={i} className="bg-[#131d2b]/50 border border-[#1b2636] p-6 text-left group hover:bg-[#131d2b] transition-all">
              <item.icon size={24} style={{ color: item.color }} className="mb-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-300 transition-colors">{item.label}</div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="relative z-10 border-t border-[#1b2636] p-8 flex flex-col md:flex-row items-center justify-between gap-6 max-w-[1600px] mx-auto w-full">
        <div className="flex items-center gap-8">
            <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-[0.3em]">System Version</span>
                <span className="text-white text-xs font-mono">v4.0.0-PRO-FINAL</span>
            </div>
            <div className="w-[1px] h-8 bg-[#1b2636]"></div>
            <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-[0.3em]">Architecture</span>
                <span className="text-white text-xs font-mono uppercase tracking-tighter">Distributed Neural Ledger</span>
            </div>
        </div>
        <div className="text-[10px] uppercase font-bold text-slate-500 tracking-[0.2em]">
          &copy; 2026 TrustLayerX Security Ecosystem. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
