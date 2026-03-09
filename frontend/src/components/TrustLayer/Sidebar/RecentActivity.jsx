import React from 'react';

export default function RecentActivity() {
  const activities = [
    { time: '10:42 AM', type: 'SCAM', badge: 'HIGH', desc: 'Blocked call +1 (555) 019-2839' },
    { time: '09:15 AM', type: 'PHISH', badge: 'MEDIUM', desc: 'Quarantined email from admin@pay-pal.com' },
    { time: '08:30 AM', type: 'DOMAIN', badge: 'MEDIUM', desc: 'Flagged 3 homoglyph domains' },
    { time: '08:05 AM', type: 'DOC', badge: 'LOW', desc: 'Verified 12 employment contracts' },
  ];

  return (
    <div className="bg-[#131d2b] border border-[#1b2636] p-5 animate-fade-slide-up opacity-0" style={{ animationDelay: '1000ms' }}>
      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">Recent Activity Log</h3>
      
      <div className="relative border-l border-[#1b2636] ml-2 space-y-6">
        {activities.map((act, i) => (
          <div key={i} className="relative pl-6">
            <div className={`absolute -left-[5px] top-1.5 w-[9px] h-[9px] bg-[#0d1520] border-2 
              ${act.badge === 'HIGH' ? 'border-[#ff2a2a]' : 
                act.badge === 'MEDIUM' ? 'border-[#fde047]' : 'border-[#10b981]'}`} 
            />
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] text-slate-500 font-dmsans font-medium tracking-wider">{act.time}</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 
                ${act.badge === 'HIGH' ? 'bg-[#ff2a2a]/10 text-[#ff2a2a]' : 
                  act.badge === 'MEDIUM' ? 'bg-[#fde047]/10 text-[#fde047]' : 'bg-[#10b981]/10 text-[#10b981]'}`}
              >
                {act.type} {act.badge}
              </span>
            </div>
            <p className="text-sm text-slate-300 font-medium">{act.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
