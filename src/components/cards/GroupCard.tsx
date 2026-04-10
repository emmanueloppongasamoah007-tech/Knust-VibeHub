import React from 'react';
import { Users, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';

export interface Group {
  id: string;
  name: string;
  banner: string;
  members: number;
  category: string;
  description: string;
  isJoined?: boolean;
}

interface GroupCardProps {
  group: Group;
  onJoin?: (groupId: string) => void;
}

export function GroupCard({ group, onJoin }: GroupCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 overflow-hidden hover:shadow-lg transition-all">
      {/* Group Banner */}
      <div className="relative h-32">
        <img src={group.banner} alt={group.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white truncate">{group.name}</h3>
        </div>
      </div>

      {/* Group Details */}
      <div className="p-5">
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
            <Users size={16} className="text-indigo-500" />
            <span>{group.members.toLocaleString()} members</span>
          </div>
          <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-xs text-indigo-600 dark:text-indigo-400 rounded-full">
            {group.category}
          </span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {group.description}
        </p>

        <Button
          onClick={() => onJoin?.(group.id)}
          className={`w-full rounded-xl ${
            group.isJoined
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
          }`}
        >
          {group.isJoined ? 'Joined' : 'Join Group'}
        </Button>
      </div>
    </div>
  );
}
