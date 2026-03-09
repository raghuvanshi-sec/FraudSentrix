import React from 'react';
import { Link } from 'react-router';
import Header from '../components/TrustLayer/Main/Header';
import { 
  ShieldAlert, 
  Search, 
  Mail, 
  Globe, 
  ArrowRight, 
  Activity, 
  Cpu, 
  Bell, 
  CheckCircle2, 
  BarChart4, 
  Zap, 
  Fingerprint,
  UserCheck,
  ShieldCheck
} from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-300 font-inter selection:bg-[#22d3ee]/30 selection:text-white">
      {/* Mesh Gradient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#22d3ee]/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[0%] left-[-10%] w-[50%] h-[50%] bg-[#ff2a2a]/5 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#1b2636_1px,transparent_1px)] [background-size:40px_40px] opacity-10"></div>
      </div>

      <Header />

      {/* Hero Section */}
      <header className="relative z-10 pt-20 pb-32 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Enterprise AI Active</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-syne font-extrabold text-white leading-[1.1] tracking-tight">
            Real-Time Digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-[#10b981]">Authenticity & Scam</span> <br />
            Protection Platform
          </h1>

          <p className="text-xl text-slate-400 max-w-xl leading-relaxed mx-auto lg:mx-0">
            Detect phishing, deepfake voices, fake domains, and digital arrest scams before they cause damage with our neural heuristic engine.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
            <Link 
              to="/dashboard" 
              className="w-full sm:w-auto bg-[#10b981] hover:bg-[#059669] text-white px-10 py-4 rounded-lg font-bold text-base transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#10b981]/20"
            >
              Launch Dashboard <ArrowRight size={20} />
            </Link>
            <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 px-10 py-4 rounded-lg font-bold text-base transition-all">
              View Demo
            </button>
          </div>
        </div>

        <div className="flex-1 relative group">
          <div className="absolute -inset-4 bg-gradient-to-br from-[#22d3ee]/20 to-transparent rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative bg-[#0d1520] border border-white/10 p-2 rounded-xl shadow-2xl overflow-hidden animate-float">
             {/* Simplified Dashboard Mockup */}
             <div className="bg-[#070b14] rounded-lg overflow-hidden border border-white/5">
                <div className="h-10 bg-[#131d2b] border-b border-white/5 flex items-center px-4 justify-between">
                   <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]"></div>
                   </div>
                   <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">TrustLayer-X Control v4.0</div>
                   <div className="flex gap-4">
                      <Bell size={12} className="text-slate-500" />
                      <div className="w-4 h-4 rounded-full bg-slate-700" />
                   </div>
                </div>
                <div className="p-4 grid grid-cols-4 gap-3">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="h-16 bg-[#131d2b] border border-white/5 p-3">
                        <div className="w-4 h-4 rounded bg-[#22d3ee]/20 mb-2"></div>
                        <div className="w-full h-1.5 bg-white/5 rounded"></div>
                     </div>
                   ))}
                </div>
                <div className="px-4 pb-4 space-y-3">
                   <div className="h-40 bg-[#131d2b] border border-white/5 relative flex flex-col justify-center items-center">
                      <Activity size={40} className="text-[#22d3ee]/30 animate-pulse" />
                   </div>
                   <div className="grid grid-cols-2 gap-3">
                      <div className="h-24 bg-[#131d2b] border border-white/5" />
                      <div className="h-24 bg-[#131d2b] border border-white/5" />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </header>

      {/* Threats Section */}
      <section id="features" className="relative z-10 py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-syne font-bold text-white tracking-tight">The Growing Threat of Digital Fraud</h2>
            <p className="text-slate-500 max-w-2xl mx-auto uppercase text-xs font-bold tracking-[0.3em]">Institutional Grade Heuristic Protection</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Scam Calls', 
                desc: 'Fraudsters impersonate police, bank officials, or government agents to coerce victims into immediate fund transfers.',
                icon: ShieldAlert,
                color: 'text-[#ff2a2a]',
                bg: 'bg-[#ff2a2a]/10'
              },
              { 
                title: 'Phishing Attacks', 
                desc: 'Highly deceptive emails and SMS messages that mimic financial institutions to harvest private credentials.',
                icon: Mail,
                color: 'text-[#a855f7]',
                bg: 'bg-[#a855f7]/10'
              },
              { 
                title: 'Fake Domains', 
                desc: 'Look-alike websites with typosquatted URLs designed to steal session tokens and sensitive login data.',
                icon: Globe,
                color: 'text-[#22d3ee]',
                bg: 'bg-[#22d3ee]/10'
              },
            ].map((card, i) => (
              <div key={i} className="bg-[#131d2b]/40 backdrop-blur-md border border-white/5 p-10 group hover:border-white/10 transition-all hover:translate-y-[-4px]">
                <div className={`w-14 h-14 ${card.bg} rounded-xl flex items-center justify-center mb-8 border border-white/5 shadow-inner transition-transform group-hover:scale-110`}>
                  <card.icon size={26} className={card.color} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 italic tracking-tight">{card.title}</h3>
                <p className="text-slate-400 leading-relaxed font-medium">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Flow Section */}
      <section id="how-it-works" className="relative z-10 py-32 max-w-7xl mx-auto px-6 overflow-hidden">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-syne font-bold text-white mb-4">How TrustLayer-X Protects You</h2>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto">Real-time analytics powered by machine learning uncover threats and stop digital fraud in its tracks through a multi-stage neural pipeline.</p>
        </div>

        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-4">
          {/* Connecting Lines (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#22d3ee]/20 to-transparent -translate-y-1/2 -z-10"></div>
          
          {[
            { label: 'User Input', icon: Cpu, step: '01' },
            { label: 'AI Detection Engine', icon: Search, step: '02' },
            { label: 'Risk Analysis', icon: BarChart4, step: '03' },
            { label: 'Security Alert', icon: Bell, step: '04' },
          ].map((item, i) => (
            <div key={i} className="relative flex flex-col items-center group w-64">
              <div className="w-24 h-24 bg-[#131d2b] border-2 border-white/5 rounded-2xl flex items-center justify-center mb-6 shadow-2xl transition-all group-hover:border-[#10b981]/50 group-hover:scale-110 relative">
                 <item.icon size={36} className="text-[#10b981]" />
                 <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#1b2636] border border-white/10 flex items-center justify-center text-[10px] font-bold text-slate-500 tracking-tighter shadow-xl">
                   {item.step}
                 </span>
              </div>
              <h4 className="text-white font-bold tracking-tight text-lg mb-2">{item.label}</h4>
              <div className="flex gap-1 text-[#10b981] opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight size={14} />
              </div>

              {/* Arrow Connector (Desktop) */}
              {i < 3 && (
                <div className="hidden lg:flex absolute top-[48px] -right-24 items-center gap-1 z-20">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]/40 animate-pulse"></div>
                   <div className="w-4 h-[1px] bg-gradient-to-r from-[#10b981]/40 to-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Intelligence Section (Stats) */}
      <section id="stats" className="relative z-10 py-24 bg-[#131d2b]/20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-syne font-bold text-white mb-4">Intelligent Threat Intelligence</h2>
          <p className="text-slate-500 font-medium mb-20">Real-time analytics powered by machine learning uncover threats fraud in its tracks.</p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { label: 'Scam Patterns Detected', val: '1000+', icon: Fingerprint, color: '#10b981' },
              { label: 'Training Data Samples', val: '20k+', icon: Zap, color: '#22d3ee' },
              { label: 'Detection Accuracy', val: '90%', icon: UserCheck, color: '#94a3b8' },
              { label: 'Real-Time Risk Alerts', val: 'ACTIVE', valColor: 'text-[#ff2a2a]', icon: ShieldCheck, color: '#ff2a2a' },
            ].map((stat, i) => (
              <div key={i} className="space-y-4">
                <div className="flex justify-center">
                  <stat.icon size={34} style={{ color: stat.color }} className="opacity-80" />
                </div>
                <div className={`text-4xl font-syne font-extrabold ${stat.valColor || 'text-white'}`}>{stat.val}</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-32 max-w-7xl mx-auto px-6 text-center">
        <div className="relative p-16 overflow-hidden rounded-[2.5rem]">
           <div className="absolute inset-0 bg-gradient-to-br from-[#131d2b] to-[#070b14] -z-10 border border-white/5"></div>
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_transparent_0%,_#070b14_100%)] opacity-20 pointer-events-none"></div>
           
           <h2 className="text-4xl md:text-6xl font-syne font-bold text-white mb-8">Get Started with TrustLayer-X</h2>
           <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
             Safeguard your digital presence with cutting edge AI detection tools. <br className="hidden md:block" />
             Join the network of protected individuals today.
           </p>

           <Link 
            to="/dashboard" 
            className="inline-flex items-center gap-4 bg-[#10b981] hover:bg-[#059669] text-white px-12 py-5 rounded-xl font-bold text-lg shadow-2xl shadow-[#10b981]/20 transition-all active:scale-95"
           >
            Launch Dashboard <ArrowRight size={24} />
           </Link>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="relative z-10 border-t border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center">
              <ShieldAlert size={16} className="text-slate-400" />
            </div>
            <span className="font-syne font-bold text-lg text-white">TrustLayer-X</span>
          </div>
          
          <div className="flex gap-12 text-sm font-medium text-slate-500">
             <button className="hover:text-white transition-colors">Documentation</button>
             <button className="hover:text-white transition-colors">Privacy Policy</button>
             <button className="hover:text-white transition-colors">API Status</button>
          </div>

          <div className="text-sm font-medium text-slate-500">
            &copy; 2026 FraudSentrix Ecosystem.
          </div>
        </div>
      </footer>
    </div>
  );
}
