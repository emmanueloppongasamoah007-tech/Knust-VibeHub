import React, { useState } from 'react';
import { User, Lock, Bell, Palette, Shield, Smartphone, LogOut, ChevronRight } from 'lucide-react';
import { Switch } from '../components/ui/switch';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';

interface SettingsPageProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onLogout: () => void;
}

export function SettingsPage({ darkMode, onToggleDarkMode, onLogout }: SettingsPageProps) {
  const [notifications, setNotifications] = useState({
    posts: true,
    comments: true,
    messages: true,
    events: false,
    groups: true,
  });

  const settingsSections = [
    {
      title: 'Account',
      icon: <User size={20} />,
      items: [
        { label: 'Edit Profile', description: 'Update your personal information' },
        { label: 'Change Password', description: 'Update your password' },
        { label: 'Email Preferences', description: 'Manage email notifications' },
      ],
    },
    {
      title: 'Privacy & Safety',
      icon: <Shield size={20} />,
      items: [
        { label: 'Profile Visibility', description: 'Control who can see your profile' },
        { label: 'Blocked Users', description: 'Manage blocked accounts' },
        { label: 'Data & Privacy', description: 'Download or delete your data' },
      ],
    },
    {
      title: 'Security',
      icon: <Lock size={20} />,
      items: [
        { label: 'Two-Factor Authentication', description: 'Add extra security to your account' },
        { label: 'Login Activity', description: 'See where you\'re logged in' },
        { label: 'Connected Apps', description: 'Manage third-party apps' },
      ],
    },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-gray-800 dark:text-gray-100 mb-2">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="space-y-6">
        {/* Appearance */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <Palette size={20} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-gray-800 dark:text-gray-100">Appearance</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-800 dark:text-gray-100 mb-1">Dark Mode</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Switch between light and dark theme
                </p>
              </div>
              <Switch checked={darkMode} onCheckedChange={onToggleDarkMode} />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <Bell size={20} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-gray-800 dark:text-gray-100">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-800 dark:text-gray-100 mb-1">Post Notifications</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get notified when someone posts
                </p>
              </div>
              <Switch
                checked={notifications.posts}
                onCheckedChange={(checked) => setNotifications({ ...notifications, posts: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-800 dark:text-gray-100 mb-1">Comment Notifications</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get notified about new comments
                </p>
              </div>
              <Switch
                checked={notifications.comments}
                onCheckedChange={(checked) => setNotifications({ ...notifications, comments: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-800 dark:text-gray-100 mb-1">Message Notifications</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get notified about new messages
                </p>
              </div>
              <Switch
                checked={notifications.messages}
                onCheckedChange={(checked) => setNotifications({ ...notifications, messages: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-800 dark:text-gray-100 mb-1">Event Reminders</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get reminded about upcoming events
                </p>
              </div>
              <Switch
                checked={notifications.events}
                onCheckedChange={(checked) => setNotifications({ ...notifications, events: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-800 dark:text-gray-100 mb-1">Group Activity</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get notified about group updates
                </p>
              </div>
              <Switch
                checked={notifications.groups}
                onCheckedChange={(checked) => setNotifications({ ...notifications, groups: checked })}
              />
            </div>
          </div>
        </div>

        {/* Other Settings Sections */}
        {settingsSections.map((section, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                <div className="text-indigo-600 dark:text-indigo-400">{section.icon}</div>
              </div>
              <h2 className="text-gray-800 dark:text-gray-100">{section.title}</h2>
            </div>

            <div className="space-y-2">
              {section.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
                >
                  <div>
                    <h3 className="text-gray-800 dark:text-gray-100 mb-1">{item.label}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Connected Devices */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <Smartphone size={20} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-gray-800 dark:text-gray-100">Connected Devices</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Smartphone size={18} className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-gray-800 dark:text-gray-100">Chrome on Windows</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Kumasi, Ghana • Active now</p>
                </div>
              </div>
              <span className="text-xs text-green-600 dark:text-green-400 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                Current
              </span>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6">
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full h-12 border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl"
          >
            <LogOut size={20} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
