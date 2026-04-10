import React from 'react';
import { Home, MessageCircle, Calendar, Users, Compass, Settings, TrendingUp, UserPlus, Heart } from 'lucide-react';
import logo from '../../../logo.png';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
  active?: boolean;
}

interface LeftSidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
}

export function LeftSidebar({ activePage, onNavigate, stats }: LeftSidebarProps) {
  const navItems: NavItem[] = [
    { icon: <Home size={20} />, label: 'Home', path: 'home' },
    { icon: <MessageCircle size={20} />, label: 'Messages', path: 'messages' },
    { icon: <Calendar size={20} />, label: 'Events', path: 'events' },
    { icon: <Users size={20} />, label: 'Groups', path: 'groups' },
    { icon: <Compass size={20} />, label: 'Explore', path: 'explore' },
    { icon: <Settings size={20} />, label: 'Settings', path: 'settings' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white/70 dark:bg-slate-800/95 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 z-30">
      <div className="flex flex-col h-full px-4 pb-4 pt-0">
        {/* Logo */}
        <div className="mb-4 px-2 flex items-center -mt-30">
          <img src={logo} alt="KNUST VibeHub Logo" className="h-14 w-auto max-w-full object-contain" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => onNavigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activePage === item.path
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Stats Section */}
        <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <TrendingUp size={16} />
                <span className="text-sm">Posts</span>
              </div>
              <span className="text-indigo-600 dark:text-indigo-400">{stats.posts}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Heart size={16} />
                <span className="text-sm">Followers</span>
              </div>
              <span className="text-indigo-600 dark:text-indigo-400">{stats.followers}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <UserPlus size={16} />
                <span className="text-sm">Following</span>
              </div>
              <span className="text-indigo-600 dark:text-indigo-400">{stats.following}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
