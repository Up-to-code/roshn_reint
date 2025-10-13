import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { PropertiesServerService } from '@/lib/api/properties-server';
import { PropertyUtils } from '@/lib/api/properties-service';
import { Property, PropertyStatus } from '@prisma/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, MapPin, Bed, Bath, Square, Car,
  Building, Calendar, Clock
} from 'lucide-react';
import Link from 'next/link';
import PropertyImageGallery from './PropertyImageGallery';

interface PropertyDetailPageProps {
  params: {
    id: string;
    locale: string;
  };
}

export async function generateMetadata({ params }: PropertyDetailPageProps): Promise<Metadata> {
  const { id, locale } = params;
  
  try {
    const property = await PropertiesServerService.getById(id);
    const title = PropertyUtils.getLocalizedTitle(property, locale);
    const description = PropertyUtils.getLocalizedDescription(property, locale);
    
    return {
      title: `${title} | Real Estate`,
      description: description || `Property in ${property.city}`,
      openGraph: {
        title,
        description: description || `Property in ${property.city}`,
        images: property.images?.slice(0, 1) || [],
      },
    };
  } catch {
    return {
      title: 'Property Not Found',
      description: 'The requested property could not be found.',
    };
  }
}

function PropertyDescription({ content, isRTL }: { content: string | null; isRTL: boolean }) {
  if (!content) return null;

  const formatDescription = (html: string) => {
    return html
      .replace(/<p>/g, '<p class="mb-4 leading-relaxed">')
      .replace(/<h1>/g, '<h1 class="text-2xl font-bold mb-4">')
      .replace(/<h2>/g, '<h2 class="text-xl font-bold mb-3">')
      .replace(/<h3>/g, '<h3 class="text-lg font-bold mb-2">')
      .replace(/<ul>/g, '<ul class="list-disc list-inside mb-4 space-y-1">')
      .replace(/<ol>/g, '<ol class="list-decimal list-inside mb-4 space-y-1">')
      .replace(/<strong>/g, '<strong class="font-bold">')
      .replace(/<em>/g, '<em class="italic">')
      .replace(/<blockquote>/g, '<blockquote class="border-l-4 border-primary pl-4 italic bg-muted/50 py-2 my-4">');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          {isRTL ? 'الوصف' : 'Description'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          className="prose prose-lg max-w-none dark:prose-invert"
          style={{ direction: isRTL ? 'rtl' : 'ltr' }}
          dangerouslySetInnerHTML={{ 
            __html: formatDescription(content) 
          }}
        />
      </CardContent>
    </Card>
  );
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { id, locale } = params;
  const isRTL = locale === 'ar';
  
  let property: Property;
  try {
    property = await PropertiesServerService.getById(id);
  } catch {
    notFound();
  }

  const getStatusColor = (status: PropertyStatus) => {
    const colors = {
      [PropertyStatus.AVAILABLE]: 'bg-green-500 text-white',
      [PropertyStatus.RENTED]: 'bg-blue-500 text-white', 
      [PropertyStatus.SOLD]: 'bg-gray-500 text-white'
    };
    return colors[status] || 'bg-gray-500 text-white';
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": PropertyUtils.getLocalizedTitle(property, locale),
    "description": PropertyUtils.getLocalizedDescription(property, locale) || `Property in ${property.city}`,
    "image": property.images || [],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": property.city,
      "addressRegion": property.district || property.city,
    },
    "offers": {
      "@type": "Offer",
      "price": property.price,
      "priceCurrency": "SAR",
    }
  };

  const t = {
    back: isRTL ? "العودة إلى العقارات" : "Back to Properties",
    features: isRTL ? "مميزات العقار" : "Property Features",
    bedrooms: isRTL ? "غرف نوم" : "Bedrooms",
    bathrooms: isRTL ? "حمامات" : "Bathrooms",
    area: isRTL ? "المساحة (م²)" : "Area (m²)",
    parking: isRTL ? "مواقف سيارات" : "Parking",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="my-40 min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="mx-auto max-w-7xl px-4 py-6">
          
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-6">
              <Link href={`/${locale}/p`} className="flex items-center gap-2">
                <ArrowLeft className="size-4" />
                {t.back}
              </Link>
            </Button>
            
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <Badge className={getStatusColor(property.status)}>
                    {property.status}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-2">
                    <Building className="size-4" />
                    {property.type}
                  </Badge>
                  <div className="text-3xl font-bold text-primary">
                    {formatPrice(property.price)}
                  </div>
                </div>
                
                <h1 className="mb-3 text-3xl font-bold lg:text-4xl">
                  {PropertyUtils.getLocalizedTitle(property, locale)}
                </h1>
                
                <div className="mb-4 flex items-center text-muted-foreground">
                  <MapPin className={`size-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  <span className="text-lg font-medium">
                    {property.city}{property.district ? `, ${property.district}` : ''}
                  </span>
                </div>

                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4" />
                    <span>{new Date(property.createdAt).toLocaleDateString(locale)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-4" />
                    <span>{new Date(property.updatedAt).toLocaleDateString(locale)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Image Gallery */}
            {property.images && property.images.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <PropertyImageGallery 
                    images={property.images}
                    title={PropertyUtils.getLocalizedTitle(property, locale)}
                    isRTL={isRTL}
                  />
                </CardContent>
              </Card>
            )}

            {/* Key Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Building className="size-5" />
                  {t.features}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {property.bedrooms > 0 && (
                    <div className="rounded-lg border bg-muted/30 p-4 text-center">
                      <Bed className="mx-auto mb-2 size-8 text-primary" />
                      <div className="text-2xl font-bold">{property.bedrooms}</div>
                      <div className="text-sm text-muted-foreground">{t.bedrooms}</div>
                    </div>
                  )}
                  
                  {property.bathrooms > 0 && (
                    <div className="rounded-lg border bg-muted/30 p-4 text-center">
                      <Bath className="mx-auto mb-2 size-8 text-primary" />
                      <div className="text-2xl font-bold">{property.bathrooms}</div>
                      <div className="text-sm text-muted-foreground">{t.bathrooms}</div>
                    </div>
                  )}
                  
                  {property.area > 0 && (
                    <div className="rounded-lg border bg-muted/30 p-4 text-center">
                      <Square className="mx-auto mb-2 size-8 text-primary" />
                      <div className="text-2xl font-bold">{property.area}</div>
                      <div className="text-sm text-muted-foreground">{t.area}</div>
                    </div>
                  )}
                  
                  {property.parking !== null && property.parking > 0 && (
                    <div className="rounded-lg border bg-muted/30 p-4 text-center">
                      <Car className="mx-auto mb-2 size-8 text-primary" />
                      <div className="text-2xl font-bold">{property.parking}</div>
                      <div className="text-sm text-muted-foreground">{t.parking}</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <PropertyDescription 
              content={PropertyUtils.getLocalizedDescription(property, locale)}
              isRTL={isRTL}
            />
          </div>
        </div>
      </div>
    </>
  );
}