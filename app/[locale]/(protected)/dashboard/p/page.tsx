// app/[locale]/properties/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { PropertiesService } from '@/lib/api/properties-service';
import { Property } from '@prisma/client';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { 
  FaSearch, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaMapMarkerAlt, 
  FaBed, 
  FaBath, 
  FaRulerCombined,
  FaHome 
} from 'react-icons/fa';

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

  const getStatusText = (status: string) => t(`status.${status.toLowerCase()}`);
  const getTypeText = (type: string) => t(`types.${type.toLowerCase()}`);

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="mx-auto max-w-7xl py-12 text-center">
          <div className="text-text-secondary text-lg">{commonT('loading')}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className={isRTL ? 'text-right' : ''}>
              <h1 className="text-text-primary text-3xl font-bold">{t('title')}</h1>
              <p className="text-text-secondary mt-2">{t('subtitle')}</p>
            </div>
            <Link 
              href={`/${locale}/dashboard/p/create`}
              className="hover:bg-primary-dark flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white transition-colors"
            >
              <FaPlus className="text-sm" />
              {t('actions.add')}
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-text-primary w-full rounded-lg border border-border bg-background p-3 pl-12 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <FaSearch className={`text-text-muted absolute left-4 top-3`} />
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.map((property) => (
            <div key={property.id} className="bg-background-card overflow-hidden rounded-lg border border-border transition-shadow hover:shadow-lg">
              {/* Property Image */}
              <div className="relative">
                <img
                  src={property.images[0] || '/api/placeholder/400/250'}
                  alt={getLocalizedTitle(property)}
                  className="h-48 w-full object-cover"
                />
                <div className={`absolute right-3 top-3 rounded-full px-3 py-1 text-sm text-white ${statusColors[property.status]}`}>
                  {getStatusText(property.status)}
                </div>
              </div>
              
              {/* Property Details */}
              <div className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="bg-background-alt text-text-secondary rounded px-2 py-1 text-sm capitalize">
                    {getTypeText(property.type)}
                  </span>
                  <div className="flex gap-2">
                    <Link 
                      href={`/${locale}/dashboard/p/edit/${property.id}`}
                      className="hover:text-primary-dark p-1 text-primary"
                    >
                      <FaEdit />
                    </Link>
                    <button 
                      onClick={() => handleDelete(property.id)}
                      className="text-error p-1 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                <h3 className="text-text-primary mb-2 text-lg font-semibold">
                  {getLocalizedTitle(property)}
                </h3>
                
                {/* Location */}
                <div className="text-text-secondary mb-3 flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  <span className="text-sm">{property.city}</span>
                </div>

                {/* Price */}
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-text-primary text-xl font-bold">
                    ${property.price.toLocaleString()}
                  </span>
                </div>

                {/* Features */}
                <div className="text-text-secondary flex justify-between border-t border-border pt-3 text-sm">
                  <div className="flex items-center gap-1">
                    <FaBed />
                    <span>{property.bedrooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaBath />
                    <span>{property.bathrooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaRulerCombined />
                    <span>{property.area}m²</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <div className="py-12 text-center">
            <FaHome className="text-text-secondary mx-auto mb-4 text-6xl" />
            <p className="text-text-secondary text-lg">
              {properties.length === 0 ? t('createFirst') : t('noProperties')}
            </p>
            {properties.length === 0 && (
              <Link 
                href={`/${locale}/dashboard/p/create`}
                className="hover:bg-primary-dark mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2 text-white transition-colors"
              >
                <FaPlus />
                {t('actions.add')}
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}