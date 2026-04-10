import React from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { Button } from '../ui/button';

export interface Event {
  id: string;
  title: string;
  banner: string;
  date: string;
  time: string;
  location: string;
  attending: number;
  category: string;
  host: string;
  isAttending?: boolean;
}

interface EventCardProps {
  event: Event;
  onJoin?: (eventId: string) => void;
  compact?: boolean;
  onClick?: (eventId: string) => void;
}

export function EventCard({ event, onJoin, compact = false, onClick }: EventCardProps) {
  if (compact) {
    return (
      <div
        className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => onClick?.(event.id)}
      >
        <div className="flex gap-3 p-3">
          <img src={event.banner} alt={event.title} className="w-16 h-16 rounded-lg object-cover" />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm truncate text-gray-800 dark:text-gray-100">{event.title}</h4>
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
              <Calendar size={12} />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 mt-1">
              <Users size={12} />
              <span>{event.attending} attending</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 overflow-hidden hover:shadow-lg transition-all flex flex-col h-full">
      {/* Event Banner */}
      <div className="relative h-48">
        <img src={event.banner} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full text-xs text-indigo-600 dark:text-indigo-400">
            {event.category}
          </span>
        </div>
      </div>

      {/* Event Details */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-gray-800 dark:text-gray-100 mb-3">{event.title}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Calendar size={16} className="text-indigo-500" />
            <span className="text-sm">{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Clock size={16} className="text-indigo-500" />
            <span className="text-sm">{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <MapPin size={16} className="text-indigo-500" />
            <span className="text-sm">{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Users size={16} className="text-indigo-500" />
            <span className="text-sm">{event.attending} people attending</span>
          </div>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Hosted by {event.host}</p>

        <div className="mt-auto">
          <Button
            onClick={() => onJoin?.(event.id)}
            className={`w-full rounded-xl ${
              event.isAttending
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
            }`}
          >
            {event.isAttending ? 'Attending' : 'Join Event'}
          </Button>
        </div>
      </div>
    </div>
  );
}
