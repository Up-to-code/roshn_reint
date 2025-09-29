// components/ModernApartmentGrid.tsx
import React from 'react';
import ModernApartmentCard from './ModernApartmentCard';

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

interface ModernApartmentGridProps {
  apartments: Apartment[];
  onViewDetails: (apartment: Apartment) => void;
  onContactAgent: (apartment: Apartment) => void;
}

const ModernApartmentGrid: React.FC<ModernApartmentGridProps> = ({
  apartments,
  onViewDetails,
  onContactAgent,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Premium Apartments for Sale
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover modern living spaces in prime locations with exceptional amenities
        </p>
        
        {/* Stats */}
        <div className="flex justify-center gap-8 mt-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-500">{apartments.length}</div>
            <div className="text-gray-600">Properties</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-500">
              {apartments.filter(a => a.status === 'available').length}
            </div>
            <div className="text-gray-600">Available</div>
          </div>
        </div>
      </div>

      {/* Apartments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {apartments.map((apartment) => (
          <ModernApartmentCard
            key={apartment.id}
            apartment={apartment}
            onViewDetails={onViewDetails}
            onContactAgent={onContactAgent}
          />
        ))}
      </div>
    </div>
  );
};

export default ModernApartmentGrid;