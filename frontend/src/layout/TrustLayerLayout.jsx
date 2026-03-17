import React from 'react';
import { Outlet } from 'react-router';
import Header from '../components/TrustLayer/Main/Header';
import RealTimeThreats from '../components/TrustLayer/Sidebar/RealTimeThreats';
import ThreatAnalyticsFeed from '../components/TrustLayer/Sidebar/ThreatAnalyticsFeed';
import RecentActivity from '../components/TrustLayer/Sidebar/RecentActivity';
import SecurityInsights from '../components/TrustLayer/Sidebar/SecurityInsights';

export default function TrustLayerLayout() {
  return (
    <div className="min-h-screen flex flex-col font-dmsans bg-[#0d1520] text-slate-300">
      <Header />
      <div className="flex-1 w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8">
        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
          {/* Main Content Area via Router */}
          <main className="flex-1 min-w-0 pb-12">
            <Outlet />
          </main>
          
          {/* Persistent Tech-Brutalist Sidebar */}
          <aside className="w-full xl:w-[320px] shrink-0 flex flex-col gap-6 lg:gap-8">
            <RealTimeThreats />
            <ThreatAnalyticsFeed />
            <RecentActivity />
            <SecurityInsights />
          </aside>
        </div>
      </div>
    </div>
  );
}
