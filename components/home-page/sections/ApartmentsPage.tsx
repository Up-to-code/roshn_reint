"use client";
// pages/sale.tsx
import React from 'react';
import ModernApartmentGrid from '@/components/home-page/sections/ModernApartmentGrid';

const SalePage: React.FC = () => {
  const realisticApartments = [
    {
      id: '1',
      title: 'Skyline Luxury Condo',
      price: 750000,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
      bedrooms: 2,
      bathrooms: 2,
      area: 1250,
      location: 'Downtown Financial District',
      yearBuilt: 2020,
      parking: true,
      type: 'condo' as const,
      status: 'available' as const,
    },
    {
      id: '2',
      title: 'Riverside Modern Apartment',
      price: 525000,
      image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
      bedrooms: 3,
      bathrooms: 2,
      area: 1450,
      location: 'East Riverside',
      yearBuilt: 2018,
      parking: false,
      type: 'apartment' as const,
      status: 'pending' as const,
    },
    {
      id: '3',
      title: 'Historic District Loft',
      price: 895000,
      image: 'https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
      bedrooms: 1,
      bathrooms: 1,
      area: 1800,
      location: 'Old Town Historic District',
      yearBuilt: 1920,
      parking: true,
      type: 'loft' as const,
      status: 'available' as const,
    },
    {
      id: '4',
      title: 'City View Penthouse',
      price: 1200000,
      image: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
      bedrooms: 3,
      bathrooms: 3,
      area: 2200,
      location: 'Uptown Heights',
      yearBuilt: 2022,
      parking: true,
      type: 'condo' as const,
      status: 'available' as const,
    },
    {
      id: '5',
      title: 'Garden Apartment Complex',
      price: 385000,
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
      bedrooms: 2,
      bathrooms: 1,
      area: 950,
      location: 'Green Valley Suburbs',
      yearBuilt: 2015,
      parking: true,
      type: 'apartment' as const,
      status: 'sold' as const,
    },
    {
      id: '6',
      title: 'Modern Studio Loft',
      price: 320000,
      image: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
      bedrooms: 1,
      bathrooms: 1,
      area: 650,
      location: 'Arts District',
      yearBuilt: 2019,
      parking: false,
      type: 'loft' as const,
      status: 'available' as const,
    },
    {
      id: '7',
      title: 'Luxury High-Rise Condo',
      price: 950000,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
      bedrooms: 2,
      bathrooms: 2,
      area: 1350,
      location: 'Central Business District',
      yearBuilt: 2021,
      parking: true,
      type: 'condo' as const,
      status: 'available' as const,
    },
    {
      id: '8',
      title: 'Contemporary Urban Living',
      price: 675000,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
      bedrooms: 2,
      bathrooms: 2,
      area: 1100,
      location: 'Midtown',
      yearBuilt: 2017,
      parking: true,
      type: 'apartment' as const,
      status: 'pending' as const,
    },
    {
      id: '9',
      title: 'Minimalist Downtown Apartment',
      price: 420000,
      image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
      bedrooms: 1,
      bathrooms: 1,
      area: 750,
      location: 'Downtown Core',
      yearBuilt: 2020,
      parking: false,
      type: 'apartment' as const,
      status: 'available' as const,
    }
  ];

  const handleViewDetails = (apartment: any) => {
    console.log('View details for:', apartment);
    // In real app: router.push(`/apartments/${apartment.id}`)
  };

  const handleContactAgent = (apartment: any) => {
    console.log('Contact agent for:', apartment);
    // In real app: open contact form/modal
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <ModernApartmentGrid
        apartments={realisticApartments}
        onViewDetails={handleViewDetails}
        onContactAgent={handleContactAgent}
      />
    </div>
  );
};

export default SalePage;