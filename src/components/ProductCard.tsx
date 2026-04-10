import React from 'react';
import { MapPin, Heart, MessageCircle } from 'lucide-react';

interface ProductCardProps {
  title: string;
  price: string;
  category: string;
  image: string;
  seller: string;
  condition?: string;
}

export default function ProductCard({ title, price, category, image, seller, condition }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group cursor-pointer">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        
        {/* Like Button */}
        <button className="absolute top-2 right-2 p-1 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
          <Heart className="w-3 h-3 text-gray-600 hover:text-red-500" />
        </button>
      </div>
      
      {/* Product Info */}
      <div className="p-2">
        <h3 className="font-medium text-gray-900 mb-1 text-xs line-clamp-2 leading-tight">
          {title}
        </h3>
        
        <div className="text-sm font-bold text-gray-900 mb-1">{price}</div>
        
        <div className="flex items-center text-xs text-gray-500">
          <MapPin className="w-2 h-2 mr-1" />
          <span className="truncate">Kumasi Campus</span>
        </div>
      </div>
    </div>
  );
}
