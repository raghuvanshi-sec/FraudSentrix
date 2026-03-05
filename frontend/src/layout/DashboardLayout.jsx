import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router';

const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z', exact: true },
    { name: 'Scam Detection', path: '/dashboard/scam-detection', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
    { name: 'Phishing Analyzer', path: '/dashboard/phishing-analyzer', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { name: 'Domain Checker', path: '/dashboard/domain-checker', icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9' },
    { name: 'Doc Verification', path: '/dashboard/document-verification', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-dark text-slate-200 font-sans">
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo area */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/50 shadow-inner">
                 <svg className="w-6 h-6 text-safe-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                 </svg>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white hidden sm:block">
                TrustLayer <span className="text-safe-green">X</span>
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                 const isActive = item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path);
                 return (
                   <NavLink
                     key={item.path}
                     to={item.path}
                     className={`
                       flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300
                       ${isActive 
                         ? 'bg-safe-green/10 text-safe-green border border-safe-green/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]' 
                         : 'text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700/50'
                       }
                     `}
                   >
                     <svg className={`w-4 h-4 ${isActive ? 'opacity-100' : 'opacity-70'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                     </svg>
                     {item.name}
                   </NavLink>
                 )
              })}
            </div>

            {/* User Profile / Actions (Desktop) */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="h-8 w-px bg-slate-700"></div> {/* Divider */}
              <button className="flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                 </svg>
              </button>
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-safe-green to-teal-500 p-[2px] cursor-pointer hover:shadow-[0_0_15px_-3px_rgba(16,185,129,0.4)] transition-shadow">
                <div className="w-full h-full rounded-full border-2 border-slate-900 overflow-hidden bg-slate-800">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="User Profile" />
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none transition-colors border border-transparent hover:border-slate-700"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out border-b border-slate-800 bg-slate-900/95 backdrop-blur-xl ${isMobileMenuOpen ? 'max-h-96 opacity-100 visible' : 'max-h-0 opacity-0 invisible overflow-hidden'}`}>
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navItems.map((item) => {
              const isActive = item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path);
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium transition-colors
                    ${isActive 
                      ? 'bg-safe-green/10 text-safe-green border border-safe-green/10' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white border border-transparent'
                    }
                  `}
                >
                  <svg className={`w-5 h-5 ${isActive ? 'opacity-100' : 'opacity-70'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                  {item.name}
                </NavLink>
              )
            })}
            
            <div className="mt-6 pt-6 border-t border-slate-800 flex items-center justify-between px-3">
              <div className="flex items-center gap-3">
                 <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-safe-green to-teal-500 p-[2px]">
                   <div className="w-full h-full rounded-full border-2 border-slate-900 overflow-hidden bg-slate-800">
                     <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="User Profile" />
                   </div>
                 </div>
                 <div>
                    <p className="text-sm font-medium text-white">Administrator</p>
                    <p className="text-xs text-slate-400">admin@trustlayer.com</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area - Requires padding top to account for fixed navbar */}
      <main className="flex-1 w-full pt-20"> {/* pt-20 matches h-20 of navbar */}
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-5rem)]">
          {/* Subtle page background glow */}
          <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none -z-10"></div>
          
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
