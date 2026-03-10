import React from 'react';

const colors = {
  HIGH: 'bg-[#ff2a2a]/10 text-[#ff2a2a] border border-[#ff2a2a]/30',
  MEDIUM: 'bg-[#fde047]/10 text-[#fde047] border border-[#fde047]/30',
  LOW: 'bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/30',
  ALERT: 'bg-orange-500/10 text-orange-400 border border-orange-400/30',
};

export default function Badge({ level, className = '' }) {
  const colorClass = colors[level] || colors.MEDIUM;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-bold uppercase tracking-wider rounded-none ${colorClass} ${className}`}>
      {level}
    </span>
  );
}
