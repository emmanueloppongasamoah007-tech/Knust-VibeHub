# KNUST VibeHub

A modern, clean, and professional social platform designed for KNUST students to connect, share, and engage with their campus community.

## 🎨 Design Features

- **Modern UI/UX**: Clean, minimalistic design inspired by Instagram, Telegram, and LinkedIn
- **Glass Morphism**: iOS 17/18-style frosted glass effects throughout
- **Responsive Design**: Fully responsive layouts that work on desktop, tablet, and mobile
- **Dark Mode**: Complete dark mode support with smooth transitions
- **Smooth Animations**: Subtle transitions and hover effects for better UX
- **Gradient Accents**: Beautiful gradient backgrounds and buttons

## 🎯 Color Palette

- **Primary**: #4F46E5 (Indigo)
- **Primary Soft**: #6C63FF (Soft Violet)
- **Success**: #22C55E
- **Danger**: #EF4444
- **Accent Green**: #10B981
- **Accent Blue**: #3B82F6

## 📱 Pages & Features

### Authentication
- **Login Page**: Clean login with social auth options
- **Register Page**: Multi-step registration form
- **Forgot Password**: Password reset flow

### Main Application
- **Home Feed**: Social feed with post composer, engagement stats, and suggested connections
- **Messaging**: Telegram-style messaging with chat list, conversation view, and profile panel
- **Events**: Discover and join campus events with category filters
- **Groups**: Explore and join student groups and communities
- **Profile**: Complete profile page with tabs for posts, about, friends, photos, and achievements
- **Settings**: Comprehensive settings with notifications, privacy, security, and appearance
- **Explore**: Discover trending topics, events, groups, and people

## 🧩 Component Structure

### Layout Components
- `MainLayout`: Main app container with sidebar and top navigation
- `LeftSidebar`: Navigation sidebar with stats
- `TopNavigation`: Search bar, notifications, and user menu

### Feed Components
- `PostComposer`: Create new posts with media options
- `PostCard`: Display posts with engagement actions
- `CommentSection`: Comments and reactions

### Card Components
- `EventCard`: Event cards with details and join button
- `GroupCard`: Group cards with member count
- `UserAvatar`: Avatar with automatic initials fallback

### Common Components
- `StatsCard`: Reusable stats display card
- All shadcn/ui components for forms, dialogs, etc.

## 🚀 Key Features

1. **Dynamic Avatars**: Auto-generated gradient avatars with initials when no profile picture
2. **Real-time Status**: Online/offline indicators in messaging
3. **Smart Search**: Global search across events, groups, and people
4. **Category Filters**: Filter content by categories
5. **Engagement Metrics**: Like, comment, share on posts
6. **Event RSVP**: Join and track event attendance
7. **Group Management**: Join groups and see member counts
8. **Notification System**: Configurable notifications for different activities
9. **Profile Customization**: Complete profile with cover photos, bios, and interests
10. **Achievement System**: Badges and achievements for user engagement

## 🎨 Design Principles

- **Airy & Clean**: Generous white space and clear visual hierarchy
- **Soft Shadows**: Subtle depth with light shadows
- **Rounded Corners**: All cards and buttons use consistent border radius
- **Consistent Spacing**: 6-unit spacing system (multiples of 0.25rem)
- **Typography**: Clear hierarchy with Inter/SF Pro-style fonts
- **Accessibility**: High contrast ratios and keyboard navigation support

## 🌙 Dark Mode

Complete dark mode implementation with:
- Slate color scheme (#0f172a, #1e293b, #334155)
- Adjusted opacity for glass effects
- Proper contrast for readability
- Smooth theme transitions

## 📐 Layout System

- **3-Column Layout**: Left sidebar (navigation), Main content, Right sidebar (widgets)
- **Responsive Breakpoints**: Mobile-first approach
- **Sticky Elements**: Navigation stays visible during scroll
- **Z-index Hierarchy**: Proper layering for overlays and modals

## 🔧 Tech Stack

- React + TypeScript
- Tailwind CSS v4
- Lucide Icons
- Shadcn/ui Components
- Responsive Design Patterns

## 📱 Responsive Behavior

- **Desktop**: Full 3-column layout
- **Tablet**: 2-column layout (sidebar + main)
- **Mobile**: Single column with collapsible navigation

## 🎯 Next Steps

Some suggested enhancements:
- Add real-time notifications
- Implement actual backend with Supabase
- Add image upload functionality
- Implement video/audio calls in messaging
- Add story/status feature
- Create mobile app version
- Add analytics dashboard
- Implement content moderation tools

---

Built with ❤️ for KNUST students
