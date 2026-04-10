import React from 'react';
import { Search, Bell, MessageCircle, Moon, Sun } from 'lucide-react';
import { UserAvatar } from '../common/UserAvatar';

interface TopNavigationProps {
  user: {
    name: string;
    avatar?: string;
  };
  onNavigate: (page: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  notifications?: number;
  messages?: number;
}

export function TopNavigation({ 
  user, 
  onNavigate, 
  darkMode, 
  onToggleDarkMode,
  notifications = 0,
  messages = 0 
}: TopNavigationProps) {
  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const value = (event.target as HTMLInputElement).value.trim();
      if (!value) return;
      alert(`You searched for "${value}"`);
    }
  };

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white/70 dark:bg-slate-800/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 z-20">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search VibeHub..."
              className="w-full pl-12 pr-4 py-2.5 bg-gray-100 dark:bg-gray-700/50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              onKeyDown={handleSearchKeyDown}
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 ml-6">
          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
          >
            {darkMode ? <Sun size={20} className="text-gray-300" /> : <Moon size={20} className="text-gray-600" />}
          </button>

          {/* Notifications */}
          <button 
            className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
          >
            <Bell size={20} className="text-gray-600 dark:text-gray-300" />
            {notifications > 0 && (
              <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {notifications > 9 ? '9+' : notifications}
              </span>
            )}
          </button>

          {/* Messages */}
          <button 
            onClick={() => onNavigate('messages')}
            className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
          >
            <MessageCircle size={20} className="text-gray-600 dark:text-gray-300" />
            {messages > 0 && (
              <span className="absolute top-1 right-1 w-5 h-5 bg-indigo-500 text-white text-xs rounded-full flex items-center justify-center">
                {messages > 9 ? '9+' : messages}
              </span>
            )}
          </button>

          {/* User Profile */}
          <button 
            onClick={() => onNavigate('profile')}
            className="flex items-center gap-3 pl-3 pr-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
          >
            <UserAvatar src={user.avatar} name={user.name} size="sm" />
            <span className="text-gray-700 dark:text-gray-300">{user.name.split(' ')[0]}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
