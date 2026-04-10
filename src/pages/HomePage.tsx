import React, { useState } from 'react';
import { PostComposer } from '../components/feed/PostComposer';
import { PostCard, Post } from '../components/feed/PostCard';
import { EventCard, Event } from '../components/cards/EventCard';
import { UserAvatar } from '../components/common/UserAvatar';
import { UserPlus } from 'lucide-react';

type NavigatePage =
  | 'home'
  | 'messages'
  | 'events'
  | 'groups'
  | 'explore'
  | 'profile'
  | 'settings';

interface HomePageProps {
  user: {
    name: string;
    avatar?: string;
  };
  onNavigate: (page: NavigatePage) => void;
  onSelectEvent?: (eventId: string) => void;
}

export function HomePage({ user, onNavigate, onSelectEvent }: HomePageProps) {
  const initialPosts: Post[] = [
    {
      id: '1',
      author: {
        name: 'Kwame Mensah',
        subtitle: 'Computer Science • Level 300',
      },
      content: 'Just finished an amazing hackathon at the Tech Lab! Built a web app that helps students track their academic progress. Big thanks to everyone who participated! 🚀',
      image: 'https://images.unsplash.com/photo-1700936655767-7049129f1995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwZXZlbnQlMjBjb25mZXJlbmNlfGVufDF8fHx8MTc2MzQ4MjEwOHww&ixlib=rb-4.1.0&q=80&w=1080',
      timestamp: '2 hours ago',
      likes: 124,
      comments: 18,
      shares: 5,
      liked: true,
    },
    {
      id: '2',
      author: {
        name: 'Ama Asante',
        subtitle: 'Electrical Engineering • Level 200',
      },
      content: 'Study session at the library was incredibly productive today! We covered most of the Signals & Systems syllabus. Who else is ready for next week\'s exam? 📚',
      image: 'https://images.unsplash.com/photo-1722248540590-ba8b7af1d7b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbGlicmFyeSUyMHN0dWR5fGVufDF8fHx8MTc2MzQ1NzcyMHww&ixlib=rb-4.1.0&q=80&w=1080',
      timestamp: '5 hours ago',
      likes: 87,
      comments: 12,
      shares: 3,
    },
    {
      id: '3',
      author: {
        name: 'Kofi Boateng',
        subtitle: 'Mechanical Engineering • Level 400',
      },
      content: 'Our final year project presentation went amazing! The panel loved our innovative cooling system design. Grateful for my team and all the support. One step closer to graduation! 🎓',
      timestamp: '1 day ago',
      likes: 203,
      comments: 34,
      shares: 12,
    },
  ];

  const upcomingEvents: Event[] = [
    {
      id: '1',
      title: 'Tech Career Fair 2024',
      banner: 'https://images.unsplash.com/photo-1560439514-0fc9d2cd5e1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwbWVldHVwJTIwZXZlbnR8ZW58MXx8fHwxNzYzNDgyNDczfDA&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'Nov 25, 2024',
      time: '10:00 AM',
      location: 'Great Hall',
      attending: 342,
      category: 'Career',
      host: 'KNUST Career Services',
    },
    {
      id: '2',
      title: 'AI & Machine Learning Workshop',
      banner: 'https://images.unsplash.com/photo-1700936655767-7049129f1995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwZXZlbnQlMjBjb25mZXJlbmNlfGVufDF8fHx8MTc2MzQ4MjEwOHww&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'Nov 28, 2024',
      time: '2:00 PM',
      location: 'CS Department Lab',
      attending: 156,
      category: 'Tech',
      host: 'Google Developer Group KNUST',
    },
  ];

  const suggestions = [
    { name: 'Abena Owusu', subtitle: 'Business Admin • Level 200', avatar: undefined },
    { name: 'Yaw Addai', subtitle: 'Civil Engineering • Level 300', avatar: undefined },
    { name: 'Efua Mensah', subtitle: 'Computer Science • Level 100', avatar: undefined },
  ];

  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const handlePost = (data: { content: string; image?: string; video?: string; feeling?: string }) => {
    const newPost: Post = {
      id: (posts.length + 1).toString(),
      author: {
        name: user.name,
        subtitle: 'Student',
      },
      content: data.content,
      image: data.image,
      video: data.video,
      feeling: data.feeling,
      timestamp: 'Just now',
      likes: 0,
      comments: 0,
      shares: 0,
    };

    setPosts((prev) => [newPost, ...prev]);
  };

  const handleLike = (postId: string) => {
    setPosts((prevPosts: Post[]) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleComment = (postId: string) => {
    setPosts((prevPosts: Post[]) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, comments: post.comments + 1 } : post
      )
    );
  };

  const handleShare = (postId: string) => {
    setPosts((prevPosts: Post[]) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, shares: post.shares + 1 } : post
      )
    );
  };

  const handleSave = (postId: string) => {
    setPosts((prevPosts: Post[]) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, saved: !post.saved } : post
      )
    );
  };

  return (
    <div className="flex gap-6 p-6 max-w-7xl mx-auto">
      {/* Main Feed */}
      <div className="flex-1 space-y-6">
        <PostComposer user={user} onPost={handlePost} />
        
        {posts.map((post: Post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={handleLike}
            onComment={handleComment}
            onShare={handleShare}
            onSave={handleSave}
          />
        ))}
      </div>

      {/* Right Sidebar */}
      <aside className="w-80 space-y-6 sticky top-20 self-start">
        {/* Upcoming Events */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-5">
          <h3 className="text-gray-800 dark:text-gray-100 mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                compact
                onClick={(eventId) => {
                  onSelectEvent?.(eventId);
                  onNavigate('events');
                }}
              />
            ))}
          </div>
        </div>

        {/* Suggestions */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-5">
          <h3 className="text-gray-800 dark:text-gray-100 mb-4">Suggested Connections</h3>
          <div className="space-y-4">
            {suggestions.map((person, index) => (
              <div key={index} className="flex items-center gap-3">
                <UserAvatar src={person.avatar} name={person.name} size="md" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm text-gray-800 dark:text-gray-100 truncate">{person.name}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{person.subtitle}</p>
                </div>
                <button className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors">
                  <UserPlus size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Channels */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-sm p-5 text-white">
          <h3 className="mb-3">Join Popular Channels</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span># study-groups</span>
              <span className="text-white/70">2.4k members</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span># tech-talk</span>
              <span className="text-white/70">1.8k members</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span># campus-news</span>
              <span className="text-white/70">3.2k members</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
