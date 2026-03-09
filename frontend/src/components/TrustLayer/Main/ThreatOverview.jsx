import React, { useState, useEffect } from 'react';
import StatCard from '../Shared/StatCard';
import { Activity, AlertTriangle, Mic, Video, FileText } from 'lucide-react';
import { getScanStats } from '../../../services/api';

export default function ThreatOverview() {
  const [statsData, setStatsData] = useState({
    totalScans: 0,
    highRiskScans: 0,
    textScans: 0,
    audioScans: 0,
    videoScans: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getScanStats();
      setStatsData(data);
    };
    fetchStats();
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { title: 'Total Scans', value: statsData.totalScans.toString(), icon: Activity, colorClass: 'text-[#22d3ee]' },
    { title: 'High Risk Alerts', value: statsData.highRiskScans.toString(), icon: AlertTriangle, colorClass: 'text-[#ff2a2a]' },
    { title: 'Text Analysis', value: statsData.textScans.toString(), icon: FileText, colorClass: 'text-orange-500' },
    { title: 'Audio Scans', value: statsData.audioScans.toString(), icon: Mic, colorClass: 'text-[#fde047]' },
    { title: 'Video Scans', value: statsData.videoScans.toString(), icon: Video, colorClass: 'text-[#10b981]' },
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
