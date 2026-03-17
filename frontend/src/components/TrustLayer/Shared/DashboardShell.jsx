import React from 'react';
import Header from '../Main/Header';

export default function DashboardShell({ children, sidebar }) {
  return (
    <div className="min-h-screen flex flex-col font-dmsans bg-[#0d1520] text-slate-300">
      <Header />
      <div className="flex-1 w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8">
        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
          {/* Main Content */}
          <main className="flex-1 flex flex-col gap-6 lg:gap-8 min-w-0">
            {children}
          </main>
          
          {/* Sidebar */}
          <aside className="w-full xl:w-[320px] shrink-0 flex flex-col gap-6 lg:gap-8">
            {sidebar}
          </aside>
        </div>
      </div>
    </div>
  );
}
