import React, { useState } from 'react';
import { MapPin, Mail, Phone, Calendar, Edit2, Award, Image as ImageIcon } from 'lucide-react';
import { UserAvatar } from '../components/common/UserAvatar';
import { PostCard, Post } from '../components/feed/PostCard';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

interface ProfilePageProps {
  isOwnProfile?: boolean;
}

export function ProfilePage({ isOwnProfile = true }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState('posts');

  const profileData = {
    name: 'Kwame Mensah',
    avatar: undefined,
    coverPhoto: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZXxlbnwwfHx8fDE2NjM0ODI2OTh8MA&ixlib=rb-4.1.0&q=80&w=1920',
    program: 'Computer Science',
    department: 'Faculty of Engineering',
    level: 'Level 300',
    bio: 'Passionate about technology and innovation. Love building cool projects and learning new things every day!',
    location: 'Kumasi, Ghana',
    email: 'kwame.mensah@knust.edu.gh',
    phone: '+233 24 123 4567',
    joined: 'September 2022',
    stats: {
      posts: 156,
      followers: 842,
      following: 523,
    },
    interests: ['Web Development', 'AI & ML', 'Mobile Apps', 'Cybersecurity', 'Cloud Computing'],
  };

  const userPosts: Post[] = [
    {
      id: '1',
      author: {
        name: profileData.name,
        avatar: profileData.avatar,
        subtitle: `${profileData.program} • ${profileData.level}`,
      },
      content: 'Just finished an amazing hackathon at the Tech Lab! Built a web app that helps students track their academic progress. Big thanks to everyone who participated! 🚀',
      image: 'https://images.unsplash.com/photo-1700936655767-7049129f1995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwZXZlbnQlMjBjb25mZXJlbmNlfGVufDF8fHx8MTc2MzQ4MjEwOHww&ixlib=rb-4.1.0&q=80&w=1080',
      timestamp: '2 hours ago',
      likes: 124,
      comments: 18,
      shares: 5,
      liked: false,
    },
  ];

  const achievements = [
    { title: 'Top Contributor', icon: '🏆', date: 'Nov 2024' },
    { title: 'Hackathon Winner', icon: '💻', date: 'Oct 2024' },
    { title: 'Community Helper', icon: '🤝', date: 'Sep 2024' },
    { title: 'Early Adopter', icon: '⭐', date: 'Sep 2022' },
  ];

  return (
    <div className="pb-8">
      {/* Cover Photo */}
      <div className="relative h-80 bg-gradient-to-r from-slate-800 to-teal-600">
        {profileData.coverPhoto && (
          <>
            <img
              src={profileData.coverPhoto}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-800/50 to-teal-600/50"></div>
          </>
        )}
        {!profileData.coverPhoto && (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-teal-700 to-teal-600"></div>
        )}
        {isOwnProfile && (
          <button className="absolute top-1/2 right-4 transform -translate-y-1/2 px-4 py-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors flex items-center gap-2">
            <ImageIcon size={18} />
            <span>Change Cover</span>
          </button>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Profile Header */}
        <div className="relative -mt-24 mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
            {/* Profile Picture */}
            <div className="relative">
              <UserAvatar
                src={profileData.avatar}
                name={profileData.name}
                size="2xl"
                className="ring-4 ring-white dark:ring-slate-900"
              />
              {isOwnProfile && (
                <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors">
                  <Edit2 size={16} />
                </button>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-gray-800 dark:text-gray-100 mb-2">{profileData.name}</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">
                      {profileData.program} • {profileData.level}
                    </p>
                    <p className="text-gray-500 dark:text-gray-500">{profileData.department}</p>
                  </div>
                  {isOwnProfile ? (
                    <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl">
                      <Edit2 size={18} className="mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">
                        Follow
                      </Button>
                      <Button variant="outline" className="rounded-xl">
                        Message
                      </Button>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="flex gap-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <div className="text-gray-800 dark:text-gray-100">{profileData.stats.posts}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Posts</div>
                  </div>
                  <div>
                    <div className="text-gray-800 dark:text-gray-100">{profileData.stats.followers}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Followers</div>
                  </div>
                  <div>
                    <div className="text-gray-800 dark:text-gray-100">{profileData.stats.following}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Following</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList className="bg-white dark:bg-slate-800 p-1 rounded-xl border border-gray-200 dark:border-gray-700">
            <TabsTrigger value="posts" className="rounded-lg">Posts</TabsTrigger>
            <TabsTrigger value="about" className="rounded-lg">About</TabsTrigger>
            <TabsTrigger value="friends" className="rounded-lg">Friends</TabsTrigger>
            <TabsTrigger value="photos" className="rounded-lg">Photos</TabsTrigger>
            <TabsTrigger value="achievements" className="rounded-lg">Achievements</TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <TabsContent value="posts" className="mt-0 space-y-6">
                {userPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onLike={() => {}}
                    onComment={() => {}}
                    onShare={() => {}}
                    onSave={() => {}}
                  />
                ))}
              </TabsContent>

              <TabsContent value="about" className="mt-0">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6 space-y-6">
                  <div>
                    <h3 className="text-gray-800 dark:text-gray-100 mb-3">Bio</h3>
                    <p className="text-gray-600 dark:text-gray-400">{profileData.bio}</p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-gray-800 dark:text-gray-100">Contact Information</h3>
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <Mail size={18} className="text-indigo-500" />
                      <span>{profileData.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <Phone size={18} className="text-indigo-500" />
                      <span>{profileData.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <MapPin size={18} className="text-indigo-500" />
                      <span>{profileData.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <Calendar size={18} className="text-indigo-500" />
                      <span>Joined {profileData.joined}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-gray-800 dark:text-gray-100 mb-3">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {profileData.interests.map((interest, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="friends" className="mt-0">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6">
                  <h3 className="text-gray-800 dark:text-gray-100 mb-4">Friends ({profileData.stats.followers})</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="text-center">
                        <UserAvatar src={undefined} name={`Friend ${i}`} size="lg" className="mx-auto mb-2" />
                        <p className="text-sm text-gray-800 dark:text-gray-100">Friend {i}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Level {i}00</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="photos" className="mt-0">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6">
                  <h3 className="text-gray-800 dark:text-gray-100 mb-4">Photos</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop&crop=center" alt="Photo 1" className="aspect-square object-cover rounded-lg" />
                    <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=300&fit=crop&crop=center" alt="Photo 2" className="aspect-square object-cover rounded-lg" />
                    <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop&crop=center" alt="Photo 3" className="aspect-square object-cover rounded-lg" />
                    <img src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=300&h=300&fit=crop&crop=center" alt="Photo 4" className="aspect-square object-cover rounded-lg" />
                    <img src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=300&h=300&fit=crop&crop=center" alt="Photo 5" className="aspect-square object-cover rounded-lg" />
                    <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop&crop=center" alt="Photo 6" className="aspect-square object-cover rounded-lg" />
                    <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=300&fit=crop&crop=center" alt="Photo 7" className="aspect-square object-cover rounded-lg" />
                    <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop&crop=center" alt="Photo 8" className="aspect-square object-cover rounded-lg" />
                    <img src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=300&h=300&fit=crop&crop=center" alt="Photo 9" className="aspect-square object-cover rounded-lg" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="achievements" className="mt-0">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6">
                  <h3 className="text-gray-800 dark:text-gray-100 mb-4">Achievements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl">
                        <div className="text-3xl">{achievement.icon}</div>
                        <div>
                          <h4 className="text-gray-800 dark:text-gray-100">{achievement.title}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{achievement.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Bio Widget */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-5">
                <h3 className="text-gray-800 dark:text-gray-100 mb-3">About</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{profileData.bio}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <MapPin size={16} className="text-indigo-500" />
                    <span>{profileData.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Calendar size={16} className="text-indigo-500" />
                    <span>Joined {profileData.joined}</span>
                  </div>
                </div>
              </div>

              {/* Interests Widget */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-5">
                <h3 className="text-gray-800 dark:text-gray-100 mb-3">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
