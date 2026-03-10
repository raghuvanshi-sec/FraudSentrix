import { ShieldAlert, Bell } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  const tabs = [
    { name: 'Dashboard', path: '/dashboard', exact: true },
    { name: 'Text Analyzer', path: '/dashboard/scam-detection' },
    { name: 'Vishing & Deepfake', path: '/dashboard/vishing-deepfake' },
    { name: 'Phishing Alerts', path: '/dashboard/phishing-analyzer' },
    { name: 'Domain Check', path: '/dashboard/domain-checker' },
    { name: 'Doc Verify', path: '/dashboard/document-verification' }
  ];
  
  return (
    <header className="sticky top-0 z-50 bg-[#0d1520]/90 backdrop-blur-md border-b border-[#1b2636]">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#ff2a2a] to-orange-600 flex items-center justify-center">
            <ShieldAlert size={18} className="text-white" />
          </div>
          <span className="font-syne font-bold text-xl tracking-wide text-white">TrustLayer-X</span>
        </div>

        {/* Navigation Tabs (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 h-full">
          {tabs.map((tab) => (
            <NavLink 
              key={tab.path}
              to={tab.path}
              end={tab.exact}
              className={({ isActive }) => `
                h-full px-4 text-sm font-medium transition-colors relative flex items-center
                ${isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'}
              `}
            >
              {({ isActive }) => (
                <>
                  {tab.name}
                  {isActive && (
                    <span className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#ff2a2a]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#ff2a2a] animate-pulse-dot" />
          </button>
          <div className="w-9 h-9 border border-[#1b2636] bg-[#131d2b] flex items-center justify-center cursor-pointer hover:border-slate-500 transition-colors">
            <span className="text-xs font-bold font-syne text-[#22d3ee]">OP</span>
          </div>
        </div>
      </div>
    </header>
  );
}
