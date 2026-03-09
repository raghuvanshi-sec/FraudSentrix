import React from 'react';
import StatCard from '../Shared/StatCard';
import { Activity, AlertTriangle, MailWarning, Globe, FileWarning } from 'lucide-react';

export default function ThreatOverview() {
  const stats = [
    { title: 'Total Scans', value: '132', icon: Activity, colorClass: 'text-[#22d3ee]' },
    { title: 'High Risk Alerts', value: '28', icon: AlertTriangle, colorClass: 'text-[#ff2a2a]' },
    { title: 'Phishing Detected', value: '41', icon: MailWarning, colorClass: 'text-orange-500' },
    { title: 'Domains Flagged', value: '16', icon: Globe, colorClass: 'text-[#fde047]' },
    { title: 'Docs Tampered', value: '7', icon: FileWarning, colorClass: 'text-[#10b981]' },
  ];

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm uppercase tracking-widest text-[#22d3ee] font-bold">Threat Overview</h2>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-[#1b2636] to-transparent ml-4" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={stat.title} {...stat} delay={i * 100} />
        ))}
      </div>
    </section>
  );
}
