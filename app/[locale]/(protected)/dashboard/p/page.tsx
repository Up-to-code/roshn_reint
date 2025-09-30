"use client";
import React, { useState } from 'react';
import { Search, Filter, Plus, MoreVertical, Eye, Edit, Trash2, MapPin, Bed, Bath, Maximize, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useTranslations, useLocale } from 'next-intl';

interface Property {
  id: string;
  title: string;
  type: string;
  price: number;
  city: string;
  district: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  status: 'available' | 'rented' | 'sold';
  image: string;
  featured: boolean;
}

export default function PropertiesDashboard() {
  const t = useTranslations('properties');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const properties: Property[] = [
    {
      id: '1',
      title: 'Luxury Apartment in Downtown',
      type: 'apartment',
      price: 2500000,
      city: 'Riyadh',
      district: 'Al Olaya',
      bedrooms: 3,
      bathrooms: 2,
      area: 180,
      status: 'available',
      featured: true,
      image: '/api/placeholder/400/250'
    },
    {
      id: '2',
      title: 'Modern Villa with Pool',
      type: 'villa',
      price: 4500000,
      city: 'Jeddah',
      district: 'Al Hamra',
      bedrooms: 5,
      bathrooms: 4,
      area: 420,
      status: 'available',
      featured: true,
      image: '/api/placeholder/400/250'
    },
    {
      id: '3',
      title: 'Commercial Office Space',
      type: 'office',
      price: 1500000,
      city: 'Riyadh',
      district: 'Al Nakheel',
      bedrooms: 0,
      bathrooms: 2,
      area: 300,
      status: 'rented',
      featured: false,
      image: '/api/placeholder/400/250'
    },
    {
      id: '4',
      title: 'Cozy Family Apartment',
      type: 'apartment',
      price: 1200000,
      city: 'Dammam',
      district: 'Al Aziziya',
      bedrooms: 2,
      bathrooms: 2,
      area: 140,
      status: 'sold',
      featured: false,
      image: '/api/placeholder/400/250'
    }
  ];

  const statusColors = {
    available: 'bg-green-100 text-green-800 border-green-200',
    rented: 'bg-blue-100 text-blue-800 border-blue-200',
    sold: 'bg-gray-100 text-gray-800 border-gray-200'
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusText = (status: string) => {
    return t(`status.${status}`);
  };

  const getTypeText = (type: string) => {
    return t(`types.${type}`);
  };

  return (
    <div className="min-h-screen bg-background p-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t('title')}</h1>
            <p className="text-muted-foreground mt-2">{t('subtitle')}</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            {t('actions.addProperty')}
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('stats.total')}</p>
                  <p className="text-2xl font-bold text-foreground">{properties.length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Bed className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('stats.available')}</p>
                  <p className="text-2xl font-bold text-foreground">
                    {properties.filter(p => p.status === 'available').length}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <div className="w-6 h-6 bg-green-600 rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('stats.rented')}</p>
                  <p className="text-2xl font-bold text-foreground">
                    {properties.filter(p => p.status === 'rented').length}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <div className="w-6 h-6 bg-blue-600 rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('stats.sold')}</p>
                  <p className="text-2xl font-bold text-foreground">
                    {properties.filter(p => p.status === 'sold').length}
                  </p>
                </div>
                <div className="p-3 bg-gray-100 rounded-lg">
                  <div className="w-6 h-6 bg-gray-600 rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('search.placeholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="all">{t('filters.all')}</option>
                <option value="available">{t('status.available')}</option>
                <option value="rented">{t('status.rented')}</option>
                <option value="sold">{t('status.sold')}</option>
              </select>

              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                {t('actions.moreFilters')}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                {property.featured && (
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                    {t('badges.featured')}
                  </Badge>
                )}
                <Badge className={`absolute top-3 right-3 border ${statusColors[property.status]}`}>
                  {getStatusText(property.status)}
                </Badge>
              </div>

              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <Badge variant="outline" className="mb-2">
                    {getTypeText(property.type)}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <Eye className="w-4 h-4" />
                        {t('actions.view')}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Edit className="w-4 h-4" />
                        {t('actions.edit')}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-destructive">
                        <Trash2 className="w-4 h-4" />
                        {t('actions.delete')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <h3 className="font-semibold text-lg mb-2 line-clamp-1">{property.title}</h3>
                
                <div className="flex items-center text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">
                    {property.district}, {property.city}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-foreground">
                    {t('currency')} {property.price.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between border-t pt-3">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Bed className="w-4 h-4" />
                    <span>{property.bedrooms}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Bath className="w-4 h-4" />
                    <span>{property.bathrooms}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Maximize className="w-4 h-4" />
                    <span>{property.area}m²</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Car className="w-4 h-4" />
                    <span>2</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-muted-foreground mb-4">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">{t('empty.title')}</h3>
                <p>{t('empty.description')}</p>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                {t('actions.addProperty')}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}