import React, { useState } from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import { EventCard, Event } from '../components/cards/EventCard';
import { Button } from '../components/ui/button';

interface EventsPageProps {
  focusEventId?: string | null;
}

export function EventsPage({ focusEventId }: EventsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Academic', 'Tech', 'Social', 'Sports', 'Cultural'];

  const events: Event[] = [
    {
      id: '1',
      title: 'Tech Career Fair 2024',
      banner: 'https://images.unsplash.com/photo-1560439514-0fc9d2cd5e1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwbWVldHVwJTIwZXZlbnR8ZW58MXx8fHwxNzYzNDgyNDczfDA&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'Nov 25, 2024',
      time: '10:00 AM - 4:00 PM',
      location: 'Great Hall, KNUST',
      attending: 342,
      category: 'Tech',
      host: 'KNUST Career Services',
      isAttending: false,
    },
    {
      id: '2',
      title: 'AI & Machine Learning Workshop',
      banner: 'https://images.unsplash.com/photo-1700936655767-7049129f1995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwZXZlbnQlMjBjb25mZXJlbmNlfGVufDF8fHx8MTc2MzQ4MjEwOHww&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'Nov 28, 2024',
      time: '2:00 PM - 6:00 PM',
      location: 'CS Department Lab',
      attending: 156,
      category: 'Tech',
      host: 'Google Developer Group KNUST',
      isAttending: true,
    },
    {
      id: '3',
      title: 'Annual Sports Gala',
      banner: 'https://images.unsplash.com/photo-1686947078751-cc721eb86b9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBjb21wZXRpdGlvbiUyMHN0YWRpdW18ZW58MXx8fHwxNzYzNDgyNTU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'Dec 2, 2024',
      time: '8:00 AM - 5:00 PM',
      location: 'KNUST Sports Complex',
      attending: 523,
      category: 'Sports',
      host: 'KNUST Sports Council',
      isAttending: false,
    },
    {
      id: '4',
      title: 'Cultural Night Festival',
      banner: 'https://images.unsplash.com/photo-1760860771437-854670c3dcca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGZlc3RpdmFsJTIwY29sb3JmdWx8ZW58MXx8fHwxNzYzNDgyNTU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'Dec 5, 2024',
      time: '6:00 PM - 11:00 PM',
      location: 'University Theatre',
      attending: 789,
      category: 'Cultural',
      host: 'KNUST Cultural Committee',
      isAttending: true,
    },
    {
      id: '5',
      title: 'Research Symposium 2024',
      banner: 'https://images.unsplash.com/photo-1759922378146-8e143fb47cd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2FkZW1pYyUyMHNlbWluYXIlMjBwcmVzZW50YXRpb258ZW58MXx8fHwxNzYzNDgyNTY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'Dec 10, 2024',
      time: '9:00 AM - 3:00 PM',
      location: 'Faculty of Engineering',
      attending: 234,
      category: 'Academic',
      host: 'Research & Innovation Office',
      isAttending: false,
    },
    {
      id: '6',
      title: 'Startup Pitch Competition',
      banner: 'https://images.unsplash.com/photo-1560439514-0fc9d2cd5e1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwbWVldHVwJTIwZXZlbnR8ZW58MXx8fHwxNzYzNDgyNDczfDA&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'Dec 15, 2024',
      time: '1:00 PM - 5:00 PM',
      location: 'Innovation Hub',
      attending: 198,
      category: 'Tech',
      host: 'KNUST Entrepreneurship Center',
      isAttending: false,
    },
  ];

  const orderedEvents = focusEventId
    ? [...events].sort((a, b) => {
        if (a.id === focusEventId) return -1;
        if (b.id === focusEventId) return 1;
        return 0;
      })
    : events;

  const filteredEvents = orderedEvents.filter((event) => {
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.host.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleJoinEvent = (eventId: string) => {
    console.log('Joined event:', eventId);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-gray-800 dark:text-gray-100 mb-2">Discover Events</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Find and join events happening around campus
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events..."
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <Button
          variant="outline"
          className="px-6 rounded-xl border-gray-200 dark:border-gray-700 whitespace-nowrap"
        >
          <Filter size={20} className="mr-2" />
          More Filters
        </Button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${
              selectedCategory === category
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-400'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} onJoin={handleJoinEvent} />
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-16">
          <Calendar className="mx-auto mb-4 text-gray-400" size={48} />
          <h3 className="text-gray-800 dark:text-gray-100 mb-2">No events found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}
