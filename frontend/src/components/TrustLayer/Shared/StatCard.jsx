import React from 'react';

export default function StatCard({ title, value, icon: Icon, colorClass, delay = 0 }) {
  return (
    <div 
      className="relative bg-[#131d2b] border border-[#1b2636] p-5 flex flex-col justify-between overflow-hidden group hover:border-slate-500 transition-colors duration-300 animate-fade-slide-up opacity-0"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-none bg-[#0d1520] border border-[#1b2636] ${colorClass}`}>
          <Icon size={20} strokeWidth={1.5} />
        </div>
      </div>
      <div>
        <h3 className="text-slate-400 text-sm font-medium mb-1 font-dmsans uppercase tracking-wider text-[11px]">{title}</h3>
        <p className="text-3xl font-syne font-bold text-white group-hover:scale-105 origin-left transition-transform duration-300">
          {value}
        </p>
      </div>
      
      {/* Bottom accent line */}
      <div className={`absolute bottom-0 left-0 h-[2px] w-full opacity-50 ${colorClass.replace('text-', 'bg-')}`} />
      
      {/* Hover illumination */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}
