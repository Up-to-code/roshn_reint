// app/[locale]/properties/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { PropertiesService } from '@/lib/api/properties-service';
import { Property } from '@prisma/client';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
 

export default function PropertiesDashboard() {
  const t = useTranslations('properties');
  const commonT = useTranslations('common');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const [search, setSearch] = useState('');
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const data = await PropertiesService.getAll();
      setProperties(data);
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(commonT('confirmDelete'))) return;
    
    try {
      await PropertiesService.delete(id);
      setProperties(properties.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting property:', error);
      alert(commonT('error'));
    }
  };

  const getLocalizedTitle = (property: Property) => {
    return locale === 'ar' ? property.titleAr : property.titleEn;
  };

  const filteredProperties = properties.filter(p => {
    const title = getLocalizedTitle(p).toLowerCase();
    const searchTerm = search.toLowerCase();
    return title.includes(searchTerm) || p.city.toLowerCase().includes(searchTerm);
  });

  const statusColors = {
    AVAILABLE: 'bg-green-500',
    RENTED: 'bg-blue-500', 
    SOLD: 'bg-gray-500'
  };

  const getStatusText = (status: string) => {
    return t(`status.${status.toLowerCase()}`);
  };

  const getTypeText = (type: string) => {
    return t(`types.${type.toLowerCase()}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="max-w-7xl mx-auto text-center py-12">
          <div className="text-lg text-text-secondary">{commonT('loading')}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
          <div className={isRTL ? 'text-right' : ''}>
            <h1 className="text-2xl font-bold text-text-primary">{t('title')}</h1>
            <p className="text-text-secondary mt-1">{t('subtitle')}</p>
          </div>
          <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link 
              href={`/${locale}/dashboard/p/create`}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
            >
              + {t('actions.add')}
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="bg-background-card border border-border rounded-lg p-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full p-3 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                isRTL ? 'pr-12' : 'pl-12'
              }`}
            />
            <div className={`absolute top-3 ${isRTL ? 'right-4' : 'left-4'} text-text-muted`}>
              🔍
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div key={property.id} className="bg-background-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={property.images[0] || '/api/placeholder/400/250'}
                  alt={getLocalizedTitle(property)}
                  className="w-full h-48 object-cover"
                />
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-white text-sm ${statusColors[property.status]}`}>
                  {getStatusText(property.status)}
                </div>
              </div>
              
              <div className="p-4">
                <div className={`flex justify-between items-start mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-sm text-text-secondary capitalize bg-background-alt px-2 py-1 rounded">
                    {getTypeText(property.type)}
                  </span>
                  <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Link 
                      href={`/${locale}/dashboard/p/edit/${property.id}`}
                      className="text-primary hover:text-primary-dark p-1"
                    >
                      ✏️
                    </Link>
                    <button 
                      onClick={() => handleDelete(property.id)}
                      className="text-error hover:text-red-700 p-1"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <h3 className={`font-semibold text-lg mb-2 text-text-primary ${isRTL ? 'text-right' : ''}`}>
                  {getLocalizedTitle(property)}
                </h3>
                
                <div className={`flex items-center text-text-secondary mb-3 ${
                  isRTL ? 'flex-row-reverse' : ''
                }`}>
                  <span className={`${isRTL ? 'ml-2' : 'mr-2'}`}>📍</span>
                  <span className="text-sm">{property.city}</span>
                </div>

                <div className={`flex justify-between items-center mb-4 ${
                  isRTL ? 'flex-row-reverse' : ''
                }`}>
                  <span className="text-xl font-bold text-text-primary">
                    ${property.price.toLocaleString()}
                  </span>
                </div>

                <div className={`flex justify-between border-t border-border pt-3 text-sm text-text-secondary ${
                  isRTL ? 'flex-row-reverse' : ''
                }`}>
                  <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span>🛏️</span>
                    <span>{property.bedrooms}</span>
                  </div>
                  <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span>🚿</span>
                    <span>{property.bathrooms}</span>
                  </div>
                  <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span>📐</span>
                    <span>{property.area}m²</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-secondary text-lg">
              {properties.length === 0 ? t('createFirst') : t('noProperties')}
            </p>
            {properties.length === 0 && (
              <Link 
                href={`/${locale}/dashboard/p/create`}
                className="inline-block mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
              >
                + {t('actions.add')}
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}