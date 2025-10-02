import { Property, PropertyStatus } from '@prisma/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize,
  Building
} from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { getLocale } from 'next-intl/server';

// Simple translation helper
const t = (ar: string, en: string, locale: string) => locale === 'ar' ? ar : en;

// Format price
const formatPrice = (price: number) => new Intl.NumberFormat('en-US').format(price);

// Get localized content
const getLocalizedTitle = (property: Property, locale: string) => 
  locale === 'ar' ? property.titleAr : property.titleEn;

const getStatusText = (status: PropertyStatus, locale: string) => {
  const statusMap = {
    [PropertyStatus.AVAILABLE]: t('متاح', 'Available', locale),
    [PropertyStatus.RENTED]: t('مؤجر', 'Rented', locale),
    [PropertyStatus.SOLD]: t('مباع', 'Sold', locale)
  };
  return statusMap[status] || status;
};

// Fetch properties server-side
async function getProperties() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/properties`, {
      cache: 'no-store'
    });
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}

// Property Card Component
function PropertyCard({ property, locale }: { property: Property; locale: string }) {
  const isRTL = locale === 'ar';
  
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {property.images?.[0] ? (
          <img 
            src={property.images[0]} 
            alt={getLocalizedTitle(property, locale)}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-zinc-100 dark:bg-zinc-800">
            <Building className="size-12 text-zinc-400 dark:text-zinc-600" />
          </div>
        )}
        
        {/* Status Badge */}
        <div className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-4`}>
          <Badge 
            variant="secondary"
            className="bg-white/90 text-xs font-medium dark:bg-zinc-900/90"
          >
            {getStatusText(property.status, locale)}
          </Badge>
        </div>
        
        {/* Favorite Button */}
        <button
          className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-4 flex size-8 items-center justify-center rounded-full bg-white/90 shadow-sm transition-all hover:scale-110 dark:bg-zinc-900/90`}
        >
          <Heart className="size-4 text-zinc-600 transition-colors hover:text-red-500 dark:text-zinc-400" />
        </button>

        {/* Price */}
        <div className={`absolute ${isRTL ? 'right-4' : 'left-4'} bottom-4`}>
          <div className="rounded bg-black/70 px-3 py-1 text-white">
            <span className="text-lg font-bold">
              {formatPrice(property.price)}
            </span>
            <span className="ml-1 text-xs">
              {t('ريال', 'SAR', locale)}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-5 dark:bg-zinc-900">
        {/* Title */}
        <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {getLocalizedTitle(property, locale)}
        </h3>

        {/* Location */}
        <div className="mb-3 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <MapPin className="size-4" />
          <span>{property.city}</span>
        </div>

        {/* Features */}
        <div className="mb-4 flex items-center gap-4 text-sm text-zinc-700 dark:text-zinc-300">
          <div className="flex items-center gap-1">
            <Bed className="size-4" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="size-4" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="size-4" />
            <span>{property.area}m²</span>
          </div>
        </div>

        {/* View Button */}
        <Button asChild className="w-full">
          <Link href={`/${locale}/properties/${property.id}`}>
            {t('عرض التفاصيل', 'View Details', locale)}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

// Main Component
export default async function HomePropertiesGrid() {
  // Get current locale from server
  const locale = await getLocale();
  const properties = await getProperties();
  const displayProperties = properties.slice(0, 3);
  const isRTL = locale === 'ar';
  
  return (
    <section className="bg-zinc-50 py-16 dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            {t('عقارات مميزة', 'Featured Properties', locale)}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            {t('اكتشف أفضل العقارات', 'Discover the best properties', locale)}
          </p>
        </div>

        {/* Properties Grid */}
        {displayProperties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {displayProperties.map((property) => (
                <PropertyCard 
                  key={property.id} 
                  property={property} 
                  locale={locale} 
                />
              ))}
            </div>

            {/* View All Button */}
            <div className="mt-10 text-center">
              <Button asChild variant="outline" size="lg" className="px-8 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800">
                <Link href={`/${locale}/p`} className={isRTL ? 'flex-row-reverse' : ''}>
                  {t('عرض كل العقارات', 'View All Properties', locale)}
                  <span className={`ml-2 rounded bg-zinc-100 px-2 py-1 text-sm dark:bg-zinc-800 ${isRTL ? 'ml-0 mr-2' : ''}`}>
                    {properties.length}
                  </span>
                </Link>
              </Button>
            </div>
          </>
        ) : (
          // Empty State
          <div className="mx-auto max-w-md text-center">
            <Building className="mx-auto mb-4 size-16 text-zinc-400 dark:text-zinc-600" />
            <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              {t('لا توجد عقارات', 'No Properties', locale)}
            </h3>
            <p className="mb-6 text-zinc-600 dark:text-zinc-400">
              {t('تفقد لاحقاً', 'Check back later', locale)}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}