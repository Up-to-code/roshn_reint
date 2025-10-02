"use client"
import React, { useState, useEffect } from 'react';
import { Property, PropertyStatus } from '@prisma/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Heart, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize,
  Building,
  Star,
  Share2,
  Crown
} from 'lucide-react';
import Link from 'next/link';

interface RealEstateListingsProps {
  properties: Property[];
  locale: string;
}

export default function RealEstateListings({ properties, locale }: RealEstateListingsProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});
  const isRTL = locale === 'ar';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const handleImageError = (propertyId: string) => {
    setImageErrors(prev => ({ ...prev, [propertyId]: true }));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US').format(price);
  };

  const getStatusText = (status: PropertyStatus) => {
    const statusMap = {
      [PropertyStatus.AVAILABLE]: locale === 'ar' ? 'متاح' : 'Available',
      [PropertyStatus.RENTED]: locale === 'ar' ? 'مؤجر' : 'Rented',
      [PropertyStatus.SOLD]: locale === 'ar' ? 'مباع' : 'Sold'
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: PropertyStatus) => {
    const colors = {
      [PropertyStatus.AVAILABLE]: 'bg-green-100 text-green-800 hover:bg-green-100',
      [PropertyStatus.RENTED]: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
      [PropertyStatus.SOLD]: 'bg-gray-100 text-gray-800 hover:bg-gray-100'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getLocalizedTitle = (property: Property): string => {
    return locale === 'ar' ? property.titleAr : property.titleEn;
  };

  const getLocalizedDescription = (property: Property): string | null => {
    return locale === 'ar' ? property.descriptionAr : property.descriptionEn;
  };

  const truncateText = (text: string, maxLength: number): string => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const safeProperties = properties || [];
  
  // Get featured property for the compact card (first available property)
  const featuredProperty = safeProperties.find(p => p.status === PropertyStatus.AVAILABLE) || safeProperties[0];
  const mainProperties = featuredProperty ? safeProperties.filter(p => p.id !== featuredProperty.id) : safeProperties;

  // Loading state
  if (isLoading) {
    return (
      <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-background">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          {/* Header Skeleton */}
          <div className="mb-8">
            <Skeleton className="mb-2 h-8 w-64" />
            <Skeleton className="h-4 w-32" />
          </div>

          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Main Listings Skeleton */}
            <div className="space-y-6 lg:w-2/3">
              {[...Array(4)].map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-80 md:shrink-0">
                      <Skeleton className="aspect-[4/3] w-full md:h-full" />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex h-full flex-col">
                        <div className="mb-4 flex items-start justify-between">
                          <div className="flex-1">
                            <Skeleton className="mb-2 h-6 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                          </div>
                          <div className="text-right">
                            <Skeleton className="mb-1 h-8 w-24" />
                            <Skeleton className="h-3 w-16" />
                          </div>
                        </div>
                        <div className="mb-6 flex gap-8">
                          <Skeleton className="h-10 w-24" />
                          <Skeleton className="h-10 w-24" />
                          <Skeleton className="h-10 w-24" />
                        </div>
                        <Skeleton className="mb-2 h-4 w-full" />
                        <Skeleton className="mb-4 h-4 w-2/3" />
                        <div className="mt-auto flex gap-3">
                          <Skeleton className="h-11 flex-1" />
                          <Skeleton className="size-11" />
                          <Skeleton className="size-11" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Compact Card Skeleton */}
            <div className="lg:w-1/3">
              <Card className="sticky top-8">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4">
                  <Skeleton className="mb-2 h-6 w-3/4" />
                  <Skeleton className="mb-4 h-4 w-full" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-background py-10">
      <div className="container mx-auto my-10 max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-semibold">
            {locale === 'ar' ? 'العقارات المتاحة' : 'Available Properties'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {safeProperties.length} {locale === 'ar' ? 'عقار متاح' : 'properties available'}
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Main Listings - 2/3 width */}
          <div className="space-y-6 lg:w-2/3">
            {mainProperties.map((property) => (
              <div key={property.id}>
                {/* Desktop & Tablet Horizontal Layout */}
                <Card className="hidden transition-colors hover:border-primary/50 md:block">
                  <div className="flex">
                    {/* Image Section */}
                    <div className="relative h-56 w-72 shrink-0">
                      {property.images && property.images.length > 0 && !imageErrors[property.id] ? (
                        <img 
                          src={property.images[0]} 
                          alt={getLocalizedTitle(property)}
                          className="size-full object-cover"
                          onError={() => handleImageError(property.id)}
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center bg-muted">
                          <Building className="size-12 text-muted-foreground" />
                        </div>
                      )}
                      
                      {/* Status Badge */}
                      <div className="absolute left-3 top-3">
                        <Badge className={getStatusColor(property.status)}>
                          {getStatusText(property.status)}
                        </Badge>
                      </div>
                      
                      {/* Favorite Button */}
                      <Button 
                        variant="secondary" 
                        size="icon"
                        className="absolute right-3 top-3 size-8 bg-background/80"
                        onClick={(e) => toggleFavorite(property.id, e)}
                      >
                        <Heart 
                          className={`size-4 ${
                            favorites.includes(property.id) 
                              ? 'fill-red-500 text-red-500' 
                              : ''
                          }`} 
                        />
                      </Button>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-6">
                      <div className="flex h-full flex-col">
                        {/* Header with Title and Price */}
                        <div className="mb-4 flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="mb-2 line-clamp-2 text-xl font-semibold">
                              {getLocalizedTitle(property)}
                            </h3>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <MapPin className="size-4" />
                              <span>
                                {property.city}{property.district && `, ${property.district}`}
                              </span>
                            </div>
                          </div>
                          <div className="ml-6 text-left">
                            <p className="text-2xl font-bold">
                              {formatPrice(property.price)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {locale === 'ar' ? 'ريال سعودي' : 'SAR'}
                            </p>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="mb-4 flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            <div className="flex size-8 items-center justify-center rounded-md bg-muted">
                              <Bed className="size-4" />
                            </div>
                            <span className="text-sm font-medium">
                              {property.bedrooms} {locale === 'ar' ? 'غرف' : 'Beds'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex size-8 items-center justify-center rounded-md bg-muted">
                              <Bath className="size-4" />
                            </div>
                            <span className="text-sm font-medium">
                              {property.bathrooms} {locale === 'ar' ? 'حمام' : 'Baths'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex size-8 items-center justify-center rounded-md bg-muted">
                              <Maximize className="size-4" />
                            </div>
                            <span className="text-sm font-medium">
                              {property.area} {locale === 'ar' ? 'م²' : 'm²'}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Star className="size-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">4.8</span>
                          </div>
                        </div>

                        {/* Description */}
                        {getLocalizedDescription(property) && (
                          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                            {truncateText(getLocalizedDescription(property), 120)}
                          </p>
                        )}

                        {/* Action Buttons */}
                        <div className="mt-auto flex gap-3">
                          <Button asChild className="flex-1">
                            <Link href={`/${locale}/p/${property.id}`}>
                              {locale === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                            </Link>
                          </Button>
                          <Button variant="outline" size="icon">
                            <Phone className="size-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <MessageCircle className="size-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Share2 className="size-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Mobile Card Layout */}
                <Card className="md:hidden">
                  <div className="relative h-48">
                    {property.images && property.images.length > 0 && !imageErrors[property.id] ? (
                      <img 
                        src={property.images[0]} 
                        alt={getLocalizedTitle(property)}
                        className="size-full object-cover"
                        onError={() => handleImageError(property.id)}
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center bg-muted">
                        <Building className="size-12 text-muted-foreground" />
                      </div>
                    )}
                    
                    {/* Status Badge */}
                    <div className="absolute left-3 top-3">
                      <Badge className={getStatusColor(property.status)}>
                        {getStatusText(property.status)}
                      </Badge>
                    </div>
                    
                    {/* Favorite Button */}
                    <Button 
                      variant="secondary" 
                      size="icon"
                      className="absolute right-3 top-3 size-8 bg-background/80"
                      onClick={(e) => toggleFavorite(property.id, e)}
                    >
                      <Heart 
                        className={`size-4 ${
                          favorites.includes(property.id) 
                            ? 'fill-red-500 text-red-500' 
                            : ''
                        }`} 
                      />
                    </Button>
                  </div>

                  <CardContent className="p-4">
                    {/* Header with Title and Price */}
                    <div className="mb-3 flex items-start justify-between">
                      <h3 className="line-clamp-2 flex-1 text-lg font-semibold">
                        {getLocalizedTitle(property)}
                      </h3>
                      <div className="ml-3 text-left">
                        <p className="text-xl font-bold">
                          {formatPrice(property.price)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {locale === 'ar' ? 'ريال' : 'SAR'}
                        </p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="size-4" />
                      <span className="truncate">
                        {property.city}{property.district && `, ${property.district}`}
                      </span>
                    </div>

                    {/* Features */}
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Bed className="size-4 text-muted-foreground" />
                          <span className="font-medium">{property.bedrooms}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bath className="size-4 text-muted-foreground" />
                          <span className="font-medium">{property.bathrooms}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Maximize className="size-4 text-muted-foreground" />
                          <span className="font-medium">{property.area} {locale === 'ar' ? 'م²' : 'm²'}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Star className="size-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">4.8</span>
                      </div>
                    </div>

                    {/* Description */}
                    {getLocalizedDescription(property) && (
                      <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                        {truncateText(getLocalizedDescription(property), 100)}
                      </p>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button asChild className="flex-1">
                        <Link href={`/${locale}/properties/${property.id}`}>
                          {locale === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                        </Link>
                      </Button>
                      <Button variant="outline" size="icon">
                        <Phone className="size-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <MessageCircle className="size-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Compact Card Sidebar - 1/3 width */}
          <div className="lg:w-1/3">
            {featuredProperty && (
              <Card className="sticky top-8 border-primary/20">
                <div className="relative">
                  {/* Featured Badge */}
                  <div className="absolute left-3 top-3 z-10">
                    <Badge className="flex items-center gap-1 border-0 bg-amber-500 text-white">
                      <Crown className="size-3" />
                      {locale === 'ar' ? 'مميز' : 'Featured'}
                    </Badge>
                  </div>

                  {/* Image */}
                  <div className="relative h-48">
                    {featuredProperty.images && featuredProperty.images.length > 0 && !imageErrors[featuredProperty.id] ? (
                      <img 
                        src={featuredProperty.images[0]} 
                        alt={getLocalizedTitle(featuredProperty)}
                        className="size-full object-cover"
                        onError={() => handleImageError(featuredProperty.id)}
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center bg-muted">
                        <Building className="size-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  <CardContent className="p-4">
                    {/* Title and Price */}
                    <div className="mb-3">
                      <h3 className="mb-1 line-clamp-2 text-lg font-semibold">
                        {getLocalizedTitle(featuredProperty)}
                      </h3>
                      <div className="mb-2 flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="size-3" />
                        <span className="truncate">
                          {featuredProperty.city}{featuredProperty.district && `, ${featuredProperty.district}`}
                        </span>
                      </div>
                      <p className="text-xl font-bold text-primary">
                        {formatPrice(featuredProperty.price)}
                        <span className="ml-1 text-sm font-normal text-muted-foreground">
                          {locale === 'ar' ? 'ريال' : 'SAR'}
                        </span>
                      </p>
                    </div>

                    {/* Quick Features */}
                    <div className="mb-4 flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Bed className="size-4 text-muted-foreground" />
                        <span>{featuredProperty.bedrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="size-4 text-muted-foreground" />
                        <span>{featuredProperty.bathrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Maximize className="size-4 text-muted-foreground" />
                        <span>{featuredProperty.area} {locale === 'ar' ? 'م²' : 'm²'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="size-4 fill-yellow-400 text-yellow-400" />
                        <span>4.8</span>
                      </div>
                    </div>

                    {/* Description */}
                    {getLocalizedDescription(featuredProperty) && (
                      <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                        {truncateText(getLocalizedDescription(featuredProperty), 80)}
                      </p>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <Button asChild className="w-full">
                        <Link href={`/${locale}/properties/${featuredProperty.id}`}>
                          {locale === 'ar' ? 'عرض العقار المميز' : 'View Featured Property'}
                        </Link>
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Phone className="mr-2 size-4" />
                          {locale === 'ar' ? 'اتصل' : 'Call'}
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <MessageCircle className="mr-2 size-4" />
                          {locale === 'ar' ? 'رسالة' : 'Message'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            )}

            {/* Additional Info Card */}
            <Card className="mt-6">
              <CardContent className="p-4">
                <h4 className="mb-3 font-semibold">
                  {locale === 'ar' ? 'نصائح سريعة' : 'Quick Tips'}
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span>
                      {locale === 'ar' ? 'تحقق من الموقع الشخصي' : 'Verify property documents'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span>
                      {locale === 'ar' ? 'قم بزيارة العقار شخصياً' : 'Visit the property in person'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span>
                      {locale === 'ar' ? 'تفاوض على السعر' : 'Negotiate the price'}
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Load More */}
        {safeProperties.length > 0 && (
          <div className="mt-8 flex justify-center">
            <Button variant="outline" size="lg">
              {locale === 'ar' ? 'عرض المزيد من العقارات' : 'Load More Properties'}
            </Button>
          </div>
        )}

        {/* Empty State */}
        {safeProperties.length === 0 && (
          <Card className="py-12 text-center">
            <CardContent>
              <div className="mb-4 text-6xl">🏠</div>
              <h3 className="mb-2 text-xl font-semibold">
                {locale === 'ar' ? 'لا توجد عقارات متاحة' : 'No properties available'}
              </h3>
              <p className="mb-6 text-muted-foreground">
                {locale === 'ar' 
                  ? 'تفقد لاحقاً للعقارات الجديدة' 
                  : 'Check back later for new property listings'
                }
              </p>
              <Button>
                {locale === 'ar' ? 'استكشاف العقارات' : 'Explore Properties'}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}