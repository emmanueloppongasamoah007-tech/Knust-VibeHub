import React from 'react';
import { LeftSidebar } from './LeftSidebar';
import { TopNavigation } from './TopNavigation';

interface MainLayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
  user: {
    name: string;
    avatar?: string;
  };
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
  darkMode: boolean;
  onToggleDarkMode: () => void;
  notifications?: number;
  messages?: number;
}

export function MainLayout({ 
  children, 
  activePage, 
  onNavigate, 
  user, 
  stats,
  darkMode,
  onToggleDarkMode,
  notifications,
  messages
}: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950/30">
      <LeftSidebar activePage={activePage} onNavigate={onNavigate} stats={stats} />
      <TopNavigation 
        user={user} 
        onNavigate={onNavigate}
        darkMode={darkMode}
        onToggleDarkMode={onToggleDarkMode}
        notifications={notifications}
        messages={messages}
      />
      <main className="ml-64 pt-16 min-h-screen">
        {children}
      </main>
    </div>
  );
}
