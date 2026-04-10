import React, { useState } from 'react';
import { Search, Filter, Users } from 'lucide-react';
import { GroupCard, Group } from '../components/cards/GroupCard';
import { Button } from '../components/ui/button';

export function GroupsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Study Groups', 'Tech', 'Sports', 'Social', 'Academic'];

  const groups: Group[] = [
    {
      id: '1',
      name: 'KNUST Tech Community',
      banner: 'https://images.unsplash.com/photo-1700936655767-7049129f1995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwZXZlbnQlMjBjb25mZXJlbmNlfGVufDF8fHx8MTc2MzQ4MjEwOHww&ixlib=rb-4.1.0&q=80&w=1080',
      members: 2456,
      category: 'Tech',
      description: 'A community for tech enthusiasts, developers, and innovators. Share ideas, collaborate on projects, and stay updated with the latest tech trends.',
      isJoined: true,
    },
    {
      id: '2',
      name: 'Engineering Study Squad',
      banner: 'https://images.unsplash.com/photo-1722248540590-ba8b7af1d7b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbGlicmFyeSUyMHN0dWR5fGVufDF8fHx8MTc2MzQ1NzcyMHww&ixlib=rb-4.1.0&q=80&w=1080',
      members: 1834,
      category: 'Study Groups',
      description: 'Collaborative study group for engineering students. Weekly meetups, resource sharing, and exam preparation sessions.',
      isJoined: false,
    },
    {
      id: '3',
      name: 'KNUST Football Club',
      banner: 'https://images.unsplash.com/photo-1686947078751-cc721eb86b9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBjb21wZXRpdGlvbiUyMHN0YWRpdW18ZW58MXx8fHwxNzYzNDgyNTU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      members: 3201,
      category: 'Sports',
      description: 'Join us for weekly training sessions, friendly matches, and tournaments. All skill levels welcome!',
      isJoined: true,
    },
    {
      id: '4',
      name: 'Computer Science 300',
      banner: 'https://images.unsplash.com/photo-1758270704840-0ac001215b55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwZ3JvdXAlMjBzdHVkeXxlbnwxfHx8fDE3NjM0ODIxMDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      members: 567,
      category: 'Study Groups',
      description: 'Level 300 CS students group for discussions, assignments help, and project collaboration.',
      isJoined: false,
    },
    {
      id: '5',
      name: 'KNUST Photography Club',
      banner: 'https://images.unsplash.com/photo-1760860771437-854670c3dcca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGZlc3RpdmFsJTIwY29sb3JmdWx8ZW58MXx8fHwxNzYzNDgyNTU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      members: 892,
      category: 'Social',
      description: 'Capture the beauty of campus life! Join us for photo walks, workshops, and exhibitions.',
      isJoined: false,
    },
    {
      id: '6',
      name: 'Business Analytics Network',
      banner: 'https://images.unsplash.com/photo-1759922378146-8e143fb47cd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2FkZW1pYyUyMHNlbWluYXIlMjBwcmVzZW50YXRpb258ZW58MXx8fHwxNzYzNDgyNTY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      members: 1245,
      category: 'Academic',
      description: 'Connect with fellow business students. Share insights, discuss case studies, and network with professionals.',
      isJoined: true,
    },
  ];

  const filteredGroups = groups.filter((group) => {
    const matchesCategory = selectedCategory === 'All' || group.category === selectedCategory;
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          group.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleJoinGroup = (groupId: string) => {
    console.log('Joined group:', groupId);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-gray-800 dark:text-gray-100 mb-2">Explore Groups</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Find communities that match your interests and connect with like-minded students
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
            placeholder="Search groups..."
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

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map((group) => (
          <GroupCard key={group.id} group={group} onJoin={handleJoinGroup} />
        ))}
      </div>

      {filteredGroups.length === 0 && (
        <div className="text-center py-16">
          <Users className="mx-auto mb-4 text-gray-400" size={48} />
          <h3 className="text-gray-800 dark:text-gray-100 mb-2">No groups found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}
