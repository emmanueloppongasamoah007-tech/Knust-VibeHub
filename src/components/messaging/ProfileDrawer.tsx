import React, { useState, useEffect } from 'react';
import { X, Phone, Search, Bell, Ban, Image as ImageIcon, Video } from 'lucide-react';
import { toast } from 'sonner';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    avatar?: string;
    username: string;
    online: boolean;
    bio: string;
  };
}

export function ProfileDrawer({ isOpen, onClose, user }: ProfileDrawerProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCall = () => {
    toast(`Calling ${user.name}...`, { icon: '📞' });
  };

  const handleVideoCall = () => {
    toast(`Starting video call with ${user.name}...`, { icon: '📹' });
  };

  const handleSearchInConversation = () => {
    toast(`Search opened for ${user.name}`);
  };

  const handleMuteNotifications = () => {
    toast(`Notifications muted for ${user.name}`);
  };

  const handleBlockUser = () => {
    toast.error(`Blocked ${user.name}`);
  };

  const handleSeeAllMedia = () => {
    toast(`Opening media gallery for ${user.name}`);
  };

  // Shared media placeholder images
  const sharedMedia = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=200&h=200&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&h=200&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=200&h=200&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=200&h=200&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=center',
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={(e) => {
            e.stopPropagation();
            console.log('Backdrop clicked');
            onClose();
          }}
        />
      )}

      {/* Drawer */}
      {isOpen && (
        <div
          className={`fixed top-0 right-0 h-full bg-white dark:bg-slate-800 shadow-2xl z-50 transition-all duration-300 ease-in-out translate-x-0 opacity-100 ${
            isMobile ? 'w-full' : 'w-[70%] max-w-md'
          }`}
        >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-slate-800 to-teal-600 p-6 pb-12">
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log('X button clicked');
              onClose();
            }}
            className="absolute top-4 right-4 p-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/40 transition-colors text-white shadow-lg"
          >
            <X size={20} />
          </button>

          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-white p-1 shadow-lg mb-4">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <div className="text-gray-500 text-2xl font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="text-center text-white">
              <h2 className="text-2xl font-bold mb-1 text-white">{user.name}</h2>
              <p className="text-white/80 text-sm mb-2">@{user.username}</p>
              <div className="flex items-center justify-center gap-2">
                <div className={`w-2 h-2 rounded-full ${user.online ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                <span className="text-sm text-white/90">
                  {user.online ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 text-center">
            {user.bio}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="p-6 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleCall}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl transition-colors"
            >
              <Phone size={18} className="text-blue-600 dark:text-blue-400" />
              <span className="font-medium text-blue-600 dark:text-blue-400">Call</span>
            </button>
            <button
              onClick={handleVideoCall}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl transition-colors"
            >
              <Video size={18} className="text-green-600 dark:text-green-400" />
              <span className="font-medium text-green-600 dark:text-green-400">Video</span>
            </button>
          </div>

          <div className="space-y-2">
            <button
              onClick={handleSearchInConversation}
              className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:bg-gray-700 rounded-xl transition-colors text-left"
            >
              <Search size={18} className="text-gray-600 dark:text-gray-400" />
              <span className="text-gray-800 dark:text-gray-300">Search in conversation</span>
            </button>
            <button
              onClick={handleMuteNotifications}
              className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:bg-gray-700 rounded-xl transition-colors text-left"
            >
              <Bell size={18} className="text-gray-600 dark:text-gray-400" />
              <span className="text-gray-800 dark:text-gray-300">Mute notifications</span>
            </button>
            <button
              onClick={handleBlockUser}
              className="w-full flex items-center gap-3 px-4 py-3 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl transition-colors text-left"
            >
              <Ban size={18} className="text-red-600 dark:text-red-400" />
              <span className="font-medium text-red-600 dark:text-red-400">Block user</span>
            </button>
          </div>
        </div>

        {/* Shared Media Section */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ color: '#000000', fontSize: '18px', fontWeight: '600' }}>Shared Media</h3>
            <button
              onClick={handleSeeAllMedia}
              style={{ color: '#000000', fontSize: '14px', fontWeight: '500' }}
            >
              See all
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {sharedMedia.map((media, index) => (
              <div key={index} className="aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
                <img
                  src={media}
                  alt={`Shared media ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                />
              </div>
            ))}
          </div>
        </div>
        </div>
      )}
    </>
  );
}
