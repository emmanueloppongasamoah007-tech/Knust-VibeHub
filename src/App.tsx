import React, { useState, useEffect } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { HomePage } from './pages/HomePage';
import { MessagingPage } from './pages/MessagingPage';
import { EventsPage } from './pages/EventsPage';
import { GroupsPage } from './pages/GroupsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { ExplorePage } from './pages/ExplorePage';
import { MarketPlacePage } from './pages/MarketPlacePage';
import { ServicesPage } from './pages/ServicesPage';
import { StudyToolsPage } from './pages/StudyToolsPage';
import { CalendarPage } from './pages/CalendarPage';
import { Toaster } from './components/ui/sonner';

type Page =
  | 'login'
  | 'register'
  | 'forgot-password'
  | 'home'
  | 'messages'
  | 'events'
  | 'groups'
  | 'explore'
  | 'marketplace'
  | 'services'
  | 'study-tools'
  | 'calendar'
  | 'profile'
  | 'settings';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const currentUser = {
    name: 'Kwame Mensah',
    avatar: undefined,
  };

  const userStats = {
    posts: 156,
    followers: 842,
    following: 523,
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('home');
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('login');
  };

  const handleNavigate = (page: Page) => {
    if (page !== 'events') {
      setSelectedEventId(null);
    }
    setCurrentPage(page);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Auth pages
  if (!isAuthenticated) {
    if (currentPage === 'register') {
      return <RegisterPage onRegister={handleRegister} onNavigate={handleNavigate} />;
    }
    if (currentPage === 'forgot-password') {
      return <ForgotPasswordPage onNavigate={handleNavigate} />;
    }
    return <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />;
  }

  // Main app pages
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            user={currentUser}
            onNavigate={(page) => handleNavigate(page as Page)}
            onSelectEvent={(eventId) => {
              setSelectedEventId(eventId);
              handleNavigate('events');
            }}
          />
        );
      case 'messages':
        return <MessagingPage />;
      case 'events':
        return <EventsPage focusEventId={selectedEventId} />;
      case 'groups':
        return <GroupsPage />;
      case 'explore':
        return <ExplorePage onNavigate={(page) => handleNavigate(page as Page)} />;
      case 'marketplace':
        return <MarketPlacePage />;
      case 'services':
        return <ServicesPage />;
      case 'study-tools':
        return <StudyToolsPage />;
      case 'calendar':
        return <CalendarPage />;
      case 'profile':
        return <ProfilePage isOwnProfile={true} />;
      case 'settings':
        return (
          <SettingsPage 
            darkMode={darkMode} 
            onToggleDarkMode={toggleDarkMode}
            onLogout={handleLogout}
          />
        );
      default:
        return <HomePage user={currentUser} />;
    }
  };

  return (
    <>
      <MainLayout
        activePage={currentPage}
        onNavigate={handleNavigate}
        user={currentUser}
        stats={userStats}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        notifications={3}
        messages={2}
      >
        {renderPage()}
      </MainLayout>
      <Toaster />
    </>
  );
}
