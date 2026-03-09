import React from 'react';
import { Lightbulb, Shield, ShieldCheck } from 'lucide-react';

export default function SecurityInsights() {
  const tips = [
    { icon: Lightbulb, text: 'Enable strict DMARC enforcement to block 90% of spoofed emails.', color: 'text-[#fde047]' },
    { icon: Shield, text: 'Configure custom rules for executive impersonation defense.', color: 'text-[#22d3ee]' },
    { icon: ShieldCheck, text: 'All system components are currently operating with latest definitions.', color: 'text-[#10b981]' },
  ];

  return (
    <div className="bg-[#0d1520] border border-[#1b2636] border-dashed p-5 animate-fade-slide-up opacity-0" style={{ animationDelay: '1100ms' }}>
      <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#10b981] mb-5">Security Insights</h3>
      
      <div className="space-y-4">
        {tips.map((tip, i) => (
          <div key={i} className="flex gap-3">
            <tip.icon size={16} className={`mt-0.5 shrink-0 ${tip.color}`} />
            <p className="text-[13px] text-slate-400 font-medium leading-snug">{tip.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
