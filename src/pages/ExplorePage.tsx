import React, { useEffect, useState } from 'react';

interface ExplorePageProps {
  onNavigate?: (page: string) => void;
}

export function ExplorePage({ onNavigate }: ExplorePageProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavigate = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const cards = [
    { key: 'marketplace', title: 'Marketplace' },
    { key: 'services', title: 'Services' },
    { key: 'study-tools', title: 'Study Tools' },
    { key: 'calendar', title: 'Calendar' },
  ];

  return (
    <div className="p-6 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-24 text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-slate-50">
            Explore
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Jump into the core spaces of KNUST VibeHub – marketplace, services, study tools, and your calendar.
          </p>
        </div>

        <div className="h-8"></div>

        <div
          className={
            'grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 ' +
            (mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3') +
            ' transition-all duration-500'
          }
        >
          {cards.map((card) => (
            <button
              key={card.key}
              type="button"
              onClick={() => handleNavigate(card.key)}
              className="relative overflow-hidden rounded-3xl px-12 py-16 sm:px-14 sm:py-20 min-h-[280px] shadow-md shadow-slate-900/10 flex items-center justify-center text-center transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-2xl hover:shadow-blue-400/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 focus:ring-offset-transparent"
              style={{ backgroundColor: '#93c5fd' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#60a5fa'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#93c5fd'}
            >
              <div className="max-w-xs mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2 break-words text-gray-900">
                  {card.title}
                </h2>
                <p className="text-base sm:text-lg text-gray-700">
                  Tap to open the {card.title.toLowerCase()} space.
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

