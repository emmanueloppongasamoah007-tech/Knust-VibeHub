import React, { useState, useRef, useEffect } from 'react';
import { Search, Phone, Video, MoreVertical, Paperclip, Smile, Send, X, Image as ImageIcon, File, Mic } from 'lucide-react';
import { UserAvatar } from '../components/common/UserAvatar';
import { Button } from '../components/ui/button';
import { ProfileDrawer } from '../components/messaging/ProfileDrawer';
import { toast } from 'sonner';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../components/ui/dropdown-menu';
import { Popover, PopoverTrigger, PopoverContent } from '../components/ui/popover';

interface Chat {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online?: boolean;
}

interface Message {
  id: string;
  text: string;
  timestamp: string;
  sent: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

export function MessagingPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      name: 'Kwame Mensah',
      lastMessage: 'Sounds good! See you at the library',
      timestamp: '2m',
      unread: 2,
      online: true,
    },
    {
      id: '2',
      name: 'Ama Asante',
      lastMessage: 'Did you get the assignment notes?',
      timestamp: '1h',
      unread: 0,
      online: true,
    },
    {
      id: '3',
      name: 'Study Group',
      lastMessage: 'Meeting rescheduled to 3pm',
      timestamp: '3h',
      unread: 5,
      online: false,
    },
    {
      id: '4',
      name: 'Kofi Boateng',
      lastMessage: 'Thanks for the help!',
      timestamp: '1d',
      unread: 0,
      online: false,
    },
  ]);

  const [conversations, setConversations] = useState<Record<string, Message[]>>({
    '1': [
      {
        id: '1',
        text: 'Hey! Are you free this afternoon?',
        timestamp: '2:30 PM',
        sent: false,
      },
      {
        id: '2',
        text: 'Yes, I am! What\'s up?',
        timestamp: '2:32 PM',
        sent: true,
        status: 'read',
      },
      {
        id: '3',
        text: 'Want to study together at the library? I need help with the signals assignment',
        timestamp: '2:33 PM',
        sent: false,
      },
      {
        id: '4',
        text: 'Sure! I\'ll be there around 3pm',
        timestamp: '2:35 PM',
        sent: true,
        status: 'read',
      },
      {
        id: '5',
        text: 'Sounds good! See you at the library',
        timestamp: '2:36 PM',
        sent: false,
      },
    ],
    '2': [
      {
        id: '1',
        text: 'Hi Ama! How was the exam?',
        timestamp: '10:15 AM',
        sent: true,
        status: 'delivered',
      },
      {
        id: '2',
        text: 'It was tough but manageable. Did you get the assignment notes?',
        timestamp: '10:20 AM',
        sent: false,
      },
      {
        id: '3',
        text: 'Yeah, I can share them with you',
        timestamp: '10:22 AM',
        sent: true,
        status: 'delivered',
      },
    ],
    '3': [
      {
        id: '1',
        text: 'Hey everyone! Quick update about tomorrow\'s meeting',
        timestamp: '9:00 AM',
        sent: false,
      },
      {
        id: '2',
        text: 'Meeting rescheduled to 3pm',
        timestamp: '9:05 AM',
        sent: false,
      },
      {
        id: '3',
        text: 'Same room or different?',
        timestamp: '9:10 AM',
        sent: true,
        status: 'delivered',
      },
      {
        id: '4',
        text: 'Same room - CS Lab 2',
        timestamp: '9:15 AM',
        sent: false,
      },
      {
        id: '5',
        text: 'Got it, thanks!',
        timestamp: '9:16 AM',
        sent: true,
        status: 'delivered',
      },
    ],
    '4': [
      {
        id: '1',
        text: 'Can you help me with the math problem?',
        timestamp: 'Yesterday',
        sent: false,
      },
      {
        id: '2',
        text: 'Sure, which one?',
        timestamp: 'Yesterday',
        sent: true,
        status: 'read',
      },
      {
        id: '3',
        text: 'The one on page 45, question 3',
        timestamp: 'Yesterday',
        sent: false,
      },
      {
        id: '4',
        text: 'Thanks for the help!',
        timestamp: 'Yesterday',
        sent: false,
      },
    ],
  });

  // Check screen size
  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close emoji picker when clicking outside

  // Mark messages as read when chat is selected
  React.useEffect(() => {
    if (selectedChat) {
      setChats(prevChats => 
        prevChats.map(chat => 
          chat.id === selectedChat 
            ? { ...chat, unread: 0 }
            : chat
        )
      );
    }
  }, [selectedChat]);

  // Filter chats based on search query
  const filteredChats = chats.filter((chat) => {
    const query = searchQuery.toLowerCase();
    return (
      chat.name.toLowerCase().includes(query) ||
      chat.lastMessage.toLowerCase().includes(query)
    );
  });

  const selectedChatData = chats.find((c) => c.id === selectedChat);
  const messages = selectedChat ? conversations[selectedChat] || [] : [];

  const handleSendMessage = () => {
    if (messageText.trim() && selectedChat) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: messageText.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sent: true,
        status: 'sent',
      };

      // Add message to the conversation
      setConversations(prev => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), newMessage]
      }));

      // Update the chat's last message
      setChats(prevChats =>
        prevChats.map(chat =>
          chat.id === selectedChat
            ? { ...chat, lastMessage: messageText.trim(), timestamp: 'Just now' }
            : chat
        )
      );

      setMessageText('');
      console.log('Message sent:', messageText);
    }
  };

  const handlePhoneCall = () => {
    toast(`Calling ${selectedChatData?.name}...`, { icon: '📞' });
  };

  const handleVideoCall = () => {
    toast(`Starting video call with ${selectedChatData?.name}...`, { icon: '📹' });
  };

  const handleMoreOptions = () => {
    console.log('Opening more options for:', selectedChatData?.name);
  };

  const handleMuteNotifications = () => {
    toast(`Notifications from ${selectedChatData?.name} muted`);
  };

  const handleBlockUser = () => {
    toast.error(`Blocked ${selectedChatData?.name}`);
  };

  const handleBackToList = () => {
    setSelectedChat(null);
    setShowProfile(false);
  };

  const handleOpenProfileDrawer = () => {
    if (isMobile) {
      setIsProfileOpen(true);
    } else {
      setShowProfile(!showProfile);
    }
  };

  const handleCloseProfileDrawer = () => {
    setIsProfileOpen(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast.success(`Attached file: ${file.name}`);
    }
  };

  const addEmoji = (emoji: string) => {
    setMessageText(prev => prev + emoji);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row">
      {/* Chat List */}
      <div className={`${isMobile && selectedChat ? 'hidden' : 'flex'} ${isMobile ? 'w-full' : 'w-80'} bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-gray-700 flex flex-col`}>
        {/* Search Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700/50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-100 dark:border-gray-700/50 ${
                  selectedChat === chat.id ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''
                }`}
              >
                <div className="relative">
                  <UserAvatar src={chat.avatar} name={chat.name} size="md" online={chat.online} />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm text-gray-800 dark:text-gray-100 truncate">{chat.name}</h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{chat.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <div className="w-5 h-5 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center flex-shrink-0">
                    {chat.unread}
                  </div>
                )}
              </button>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No conversations found
            </div>
          )}
        </div>
      </div>

      {/* Conversation Window */}
      {selectedChatData ? (
        <div className="flex-1 flex flex-col bg-gray-50 dark:bg-slate-900/50">
          {/* Chat Header */}
          <div className="h-16 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700 px-4 md:px-6 flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              {isMobile && (
                <button
                  onClick={handleBackToList}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-400 md:hidden"
                >
                  <X size={20} />
                </button>
              )}
              <button
                onClick={handleOpenProfileDrawer}
                className="flex items-center gap-3 -mx-2 px-2 py-1 rounded-lg transition-colors"
              >
                <UserAvatar src={selectedChatData.avatar} name={selectedChatData.name} size="md" online={selectedChatData.online} />
                <div className="text-left">
                  <h3 className="text-gray-800 dark:text-gray-100">{selectedChatData.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {selectedChatData.online ? 'Online' : 'Offline'}
                  </p>
                </div>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={handlePhoneCall}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-400"
                title="Start voice call"
              >
                <Phone size={20} />
              </button>
              <button 
                onClick={handleVideoCall}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-400"
                title="Start video call"
              >
                <Video size={20} />
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button 
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-400"
                    title="More options"
                  >
                    <MoreVertical size={20} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={handleOpenProfileDrawer}>View Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleMuteNotifications}>Mute Notifications</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast.success('Chat history cleared')}>Clear History</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleBlockUser} className="text-red-600">Block User</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] md:max-w-md px-4 py-2 rounded-2xl ${
                    message.sent
                      ? 'bg-indigo-600 text-white rounded-br-sm'
                      : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 rounded-bl-sm'
                  }`}
                >
                  <p>{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sent ? 'text-indigo-200' : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center gap-2 md:gap-3">
              <label 
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-400 cursor-pointer"
              >
                <Paperclip size={20} />
                <input type="file" className="hidden" onChange={handleFileUpload} />
              </label>
              <input
                ref={inputRef}
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 bg-gray-100 dark:bg-gray-700/50 border-0 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="relative">
                <Popover>
                  <PopoverTrigger asChild>
                    <button 
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-400"
                      title="Add emoji"
                    >
                      <Smile size={20} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent side="top" align="end" className="w-[280px] p-2 mb-2">
                    <div className="grid grid-cols-5 gap-2">
                      {['😀','😂','🥰','😎','🤔','🙌','👍','🔥','❤️','🎉','✨','👀','💯','🙌','👏'].map(emoji => (
                        <button
                          key={emoji}
                          onClick={() => addEmoji(emoji)}
                          className="hover:bg-gray-100 dark:hover:bg-gray-700 text-xl p-2 rounded-lg transition-colors"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <button
                onClick={handleSendMessage}
                className="p-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                title="Send message"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={`${isMobile ? 'flex' : 'hidden md:flex'} flex-1 flex items-center justify-center bg-gray-50 dark:bg-slate-900/50`}>
          <p className="text-gray-500 dark:text-gray-400">Select a conversation to start messaging</p>
        </div>
      )}

      {/* Profile Panel - Desktop Only */}
      {!isMobile && showProfile && selectedChatData && (
        <div className="w-80 bg-white dark:bg-slate-800 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-gray-800 dark:text-gray-100">Profile</h3>
              <button
                onClick={() => setShowProfile(false)}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-400"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col items-center mb-6">
              <UserAvatar src={selectedChatData.avatar} name={selectedChatData.name} size="2xl" />
              <h3 className="text-gray-800 dark:text-gray-100 mt-4">{selectedChatData.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Computer Science • Level 300</p>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm text-gray-600 dark:text-gray-400 mb-2">About</h4>
                <p className="text-gray-800 dark:text-gray-100">
                  Passionate about tech and innovation. Love building cool projects!
                </p>
              </div>

              <div>
                <h4 className="text-sm text-gray-600 dark:text-gray-400 mb-3">Media Shared</h4>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Button 
                  onClick={handleMuteNotifications}
                  variant="outline" 
                  className="w-full rounded-xl"
                >
                  Mute Notifications
                </Button>
                <Button 
                  onClick={handleBlockUser}
                  variant="outline" 
                  className="w-full rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Block User
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Drawer */}
      {selectedChatData && (
        <ProfileDrawer
          isOpen={isProfileOpen}
          onClose={handleCloseProfileDrawer}
          user={{
            name: selectedChatData.name,
            avatar: selectedChatData.avatar,
            username: selectedChatData.name.toLowerCase().replace(/\s+/g, '_'),
            online: selectedChatData.online || false,
            bio: `${selectedChatData.name} is a student passionate about learning and collaboration. Always ready to help and share knowledge.`,
          }}
        />
      )}
    </div>
  );
}
