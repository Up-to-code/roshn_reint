// components/home-page/sections/ModernApartmentCard.tsx
import React from 'react';
import Image from 'next/image';

interface Apartment {
  id: string;
  title: string;
  price: number;
  image: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: string;
  yearBuilt: number;
  parking: boolean;
  type: 'condo' | 'apartment' | 'loft';
  status: 'available' | 'sold' | 'pending';
}

interface ModernApartmentCardProps {
  apartment: Apartment;
  onViewDetails: (apartment: Apartment) => void;
  onContactAgent: (apartment: Apartment) => void;
}

const ModernApartmentCard: React.FC<ModernApartmentCardProps> = ({
  apartment,
  onViewDetails,
  onContactAgent,
}) => {
  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`;
    }
    return `$${price}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sold': return 'bg-gray-500';
      case 'pending': return 'bg-orange-500';
      default: return 'bg-green-500';
    }
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-orange-200 transition-all duration-300">
      {/* Image with Status Badge */}
      <div className="relative h-56 w-full">
        <Image
          src={apartment.image}
          alt={apartment.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
        />
        <div className={`absolute top-4 left-4 ${getStatusColor(apartment.status)} text-white px-3 py-1 rounded-full text-sm font-medium capitalize`}>
          {apartment.status}
        </div>
        <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-2 rounded-lg">
          <div className="text-lg font-bold">{formatPrice(apartment.price)}</div>
        </div>
      </div>

      {/* Rest of the component remains the same */}
      <div className="p-5">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{apartment.title}</h3>
          <div className="flex items-center text-gray-600">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">{apartment.location}</span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-100">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="font-semibold text-gray-900">{apartment.bedrooms}</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">Bedrooms</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-semibold text-gray-900">{apartment.bathrooms}</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">Bathrooms</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
              <span className="font-semibold text-gray-900">{apartment.area}</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">Sq Ft</div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="flex justify-between items-center py-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <span>Built:</span>
            <span className="font-medium">{apartment.yearBuilt}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Parking:</span>
            <span className="font-medium">{apartment.parking ? 'Yes' : 'No'}</span>
          </div>
          <div className="capitalize font-medium text-orange-600">
            {apartment.type}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-2">
          <button
            onClick={() => onViewDetails(apartment)}
            className="flex-1 bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300"
          >
            View Details
          </button>
          <button
            onClick={() => onContactAgent(apartment)}
            className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-300"
          >
            Contact Agent
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModernApartmentCard;