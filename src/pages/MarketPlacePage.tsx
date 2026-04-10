import React from 'react';

export function MarketPlacePage() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Marketplace
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          No items available at the moment
        </p>
      </div>
    </div>
  );
}
