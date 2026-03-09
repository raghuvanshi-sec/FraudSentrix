import React from 'react';
import { Activity, Phone, Mail, Globe, FileText } from 'lucide-react';
import Badge from '../Shared/Badge';

export default function RealTimeThreats() {
  const threats = [
    { id: 1, type: 'SCAM CALL', severity: 'HIGH', title: 'Impersonation: Bank Of America', time: 'Just now', icon: Phone, color: 'text-[#ff2a2a]' },
    { id: 2, type: 'PHISHING', severity: 'MEDIUM', title: 'Suspicious Invoice #882', time: '2m ago', icon: Mail, color: 'text-[#fde047]' },
    { id: 3, type: 'DOMAIN', severity: 'MEDIUM', title: 'Flagged: pay-pal-sec.com', time: '14m ago', icon: Globe, color: 'text-[#fde047]' },
    { id: 4, type: 'DOCUMENT', severity: 'LOW', title: 'Example.pdf analyzed', time: '1h ago', icon: FileText, color: 'text-[#10b981]' },
  ];

  return (
    <div className="bg-[#131d2b] border border-[#1b2636] animate-fade-slide-up opacity-0 relative" style={{ animationDelay: '800ms' }}>
      {/* Top Header */}
      <div className="p-4 border-b border-[#1b2636] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#ff2a2a] animate-pulse-dot" />
          <h3 className="font-syne font-bold text-white tracking-wide text-sm">Live Feed</h3>
        </div>
        <Activity size={16} className="text-slate-500" />
      </div>

      {/* Feed List */}
      <div className="flex flex-col">
        {threats.map((t) => (
          <div key={t.id} className="p-4 border-b border-[#1b2636] last:border-b-0 hover:bg-[#0d1520]/50 transition-colors group cursor-pointer">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">{t.type}</span>
              <span className="text-[10px] text-slate-600 font-dmsans group-hover:text-slate-400 transition-colors">{t.time}</span>
            </div>
            <div className="flex gap-3 items-start">
              <div className={`mt-0.5 ${t.color}`}>
                <t.icon size={16} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-300 mb-2 truncate group-hover:text-white transition-colors title-clamp">
                  {t.title}
                </p>
                <Badge level={t.severity} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
