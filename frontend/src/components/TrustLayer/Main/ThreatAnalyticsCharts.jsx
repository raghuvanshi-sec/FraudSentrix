import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart3 } from 'lucide-react';

const pieData = [
  { name: 'Scam Calls', value: 42.9, color: '#ff2a2a' },
  { name: 'Phishing URLs', value: 32.5, color: '#fde047' },
  { name: 'Domain Spoof', value: 19.5, color: '#22d3ee' },
  { name: 'Doc Tampering', value: 5.1, color: '#10b981' },
];

const barData = [
  { day: 'Mon', threats: 24 },
  { day: 'Tue', threats: 38 },
  { day: 'Wed', threats: 15 },
  { day: 'Thu', threats: 42 },
  { day: 'Fri', threats: 55 },
  { day: 'Sat', threats: 68 },
  { day: 'Sun', threats: 31 },
];

export default function ThreatAnalyticsCharts() {
  return (
    <section className="bg-[#131d2b] border border-[#1b2636] p-6 animate-fade-slide-up opacity-0" style={{ animationDelay: '600ms' }}>
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 size={18} className="text-[#22d3ee]" />
        <h2 className="font-syne font-bold text-white tracking-wide">Threat Analytics</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Pie Chart */}
        <div className="flex flex-col">
          <h3 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-4">Distribution by Type</h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  stroke="none"
                  dataKey="value"
                  paddingAngle={2}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ backgroundColor: '#0d1520', border: '1px solid #1b2636', borderRadius: 0, padding: '12px' }}
                  itemStyle={{ color: '#e2e8f0', fontFamily: 'DM Sans', fontSize: '13px', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-4">
            {pieData.map(d => (
              <div key={d.name} className="flex items-center gap-2 text-xs text-slate-400">
                <div className="w-2 h-2 rounded-none" style={{ backgroundColor: d.color }} />
                <span>{d.name}</span>
                <span className="font-syne font-bold text-slate-300">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="flex flex-col">
           <h3 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-4">Detections (7 Days)</h3>
           <div className="h-[200px] w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <XAxis dataKey="day" axisLine={{ stroke: '#1b2636' }} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'DM Sans' }} dy={10} />
                <Tooltip 
                  cursor={{ fill: '#0d1520' }}
                  contentStyle={{ backgroundColor: '#131d2b', border: '1px solid #1b2636', borderRadius: 0, padding: '12px' }}
                  labelStyle={{ color: '#64748b', marginBottom: '4px', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold' }}
                  itemStyle={{ color: '#ff2a2a', fontFamily: 'Syne', fontWeight: 'bold' }}
                />
                <Bar dataKey="threats" fill="#ff2a2a" radius={0} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </section>
  );
}
