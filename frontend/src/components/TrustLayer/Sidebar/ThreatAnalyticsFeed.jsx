import React from 'react';
import Badge from '../Shared/Badge';
import { Network, FileWarning } from 'lucide-react';

export default function ThreatAnalyticsFeed() {
  return (
    <div className="flex flex-col gap-4 animate-fade-slide-up opacity-0" style={{ animationDelay: '900ms' }}>
      <h3 className="text-xs font-bold uppercase tracking-widest text-[#22d3ee]">Insights Feed</h3>
      
      {/* Card 1 */}
      <div className="bg-[#131d2b] border border-[#ff2a2a]/30 p-5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-16 h-16 bg-[#ff2a2a]/10 blur-xl rounded-full" />
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div className="p-2 border border-[#ff2a2a]/30 bg-[#ff2a2a]/10 text-[#ff2a2a]">
            <Network size={16} />
          </div>
          <Badge level="HIGH" />
        </div>
        <div className="relative z-10">
          <h4 className="font-syne font-bold text-white mb-1">Largest Scam Network</h4>
          <p className="text-sm text-slate-400 mb-3">Cluster of 14 domains matching similar host signatures.</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-[10px] font-bold border border-[#1b2636] px-2 py-1 text-slate-300 bg-[#0d1520]">finance-secure-login.com</span>
            <span className="text-[10px] font-bold border border-[#1b2636] px-2 py-1 text-slate-300 bg-[#0d1520]">+13 more</span>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-[#131d2b] border border-orange-500/30 p-5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-16 h-16 bg-orange-500/10 blur-xl rounded-full" />
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div className="p-2 border border-orange-500/30 bg-orange-500/10 text-orange-400">
            <FileWarning size={16} />
          </div>
          <Badge level="ALERT" />
        </div>
        <div className="relative z-10">
          <h4 className="font-syne font-bold text-white mb-1">Document Tampered</h4>
          <p className="text-sm text-slate-400">Hash mismatch warning on Q3_Earnings_Report.pdf</p>
        </div>
      </div>
    </div>
  );
}
