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
  ArrowLeft, MapPin, Bed, Bath, Square, Car, Share2, Heart,
  Phone, Mail, Building, CheckCircle,
  Calendar, Wifi, Shield, TreePine, Dumbbell,
  Waves, Car as CarIcon, Utensils,
  Clock, ChevronLeft, ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import PropertyImageGallery from './PropertyImageGallery';

interface PropertyDetailPageProps {
  params: {
    id: string;
    locale: string;
  };
}

const FALLBACK_HTML_DESCRIPTION = `
  <p>This beautiful property offers modern living in a prime location. Featuring spacious rooms, 
  contemporary design, and premium finishes throughout.</p>
  
  <p><strong>Key Features:</strong></p>
  <ul>
    <li>Modern kitchen with high-end appliances</li>
    <li>Spacious living areas with natural light</li>
    <li>Energy-efficient design</li>
    <li>Prime location with easy access to amenities</li>
  </ul>
  
  <p>Contact us today to schedule a viewing and experience this exceptional property for yourself.</p>
`;

// Generate SEO Metadata - This must remain a server component
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

// HTML Description Formatter Component
function PropertyDescription({ content, isRTL }: { content: string | null; isRTL: boolean }) {
  const formatDescription = (html: string | null) => {
    if (!html) return FALLBACK_HTML_DESCRIPTION;

    const formattedHtml = html
      .replace(/<p>/g, '<p class="mb-4 leading-relaxed text-foreground">')
      .replace(/<h1>/g, '<h1 class="text-2xl font-bold mb-4 text-foreground">')
      .replace(/<h2>/g, '<h2 class="text-xl font-bold mb-3 text-foreground">')
      .replace(/<h3>/g, '<h3 class="text-lg font-bold mb-2 text-foreground">')
      .replace(/<ul>/g, '<ul class="list-disc list-inside mb-4 space-y-1">')
      .replace(/<ol>/g, '<ol class="list-decimal list-inside mb-4 space-y-1">')
      .replace(/<li>/g, '<li class="text-foreground">')
      .replace(/<strong>/g, '<strong class="font-bold text-foreground">')
      .replace(/<em>/g, '<em class="italic text-foreground">')
      .replace(/<blockquote>/g, '<blockquote class="border-l-4 border-primary pl-4 italic bg-muted/50 py-2 my-4 text-foreground">');

    return formattedHtml;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Description</CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          className="prose prose-lg max-w-none dark:prose-invert
            prose-headings:text-foreground
            prose-p:leading-relaxed prose-p:text-foreground
            prose-a:text-primary
            hover:prose-a:text-primary/80
            prose-blockquote:text-foreground
            prose-strong:text-foreground prose-em:text-foreground
            prose-ol:text-foreground
            prose-ul:text-foreground prose-li:text-foreground"
          style={{ direction: isRTL ? 'rtl' : 'ltr' }}
          dangerouslySetInnerHTML={{ 
            __html: formatDescription(content) 
          }}
        />
      </CardContent>
    </Card>
  );
}

// Main Component - Server Component
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
    if (locale === 'ar') {
      return new Intl.NumberFormat('ar-SA', {
        style: 'currency',
        currency: 'SAR',
        minimumFractionDigits: 0,
      }).format(price);
    }
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const amenities = [
    { key: 'wifi', label: 'WiFi', icon: Wifi, arLabel: 'واي فاي' },
    { key: 'security', label: 'Security', icon: Shield, arLabel: 'أمن' },
    { key: 'garden', label: 'Garden', icon: TreePine, arLabel: 'حديقة' },
    { key: 'gym', label: 'Gym', icon: Dumbbell, arLabel: 'نادي رياضي' },
    { key: 'pool', label: 'Pool', icon: Waves, arLabel: 'مسبح' },
    { key: 'parking', label: 'Parking', icon: CarIcon, arLabel: 'موقف سيارات' },
    { key: 'kitchen', label: 'Kitchen', icon: Utensils, arLabel: 'مطبخ' },
  ];

  const propertyFeatures = property.features || [];

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

  // Translation mappings
  const translations = {
    en: {
      back: "Back to Properties",
      description: "Description",
      features: "Property Features",
      bedrooms: "Bedrooms",
      bathrooms: "Bathrooms",
      area: "Area (m²)",
      parking: "Parking",
      amenities: "Amenities",
      details: "Property Details",
      type: "Property Type",
      status: "Status",
      location: "Location",
      listed: "Listed Date",
      updated: "Last Updated",
      propertyId: "Property ID",
      ready: "Ready to move in",
      contact: "Contact Agent",
      message: "Send Message",
      save: "Save",
      share: "Share",
      viewAllPhotos: "View All Photos",
      photo: "Photo",
      of: "of"
    },
    ar: {
      back: "العودة إلى العقارات",
      description: "الوصف",
      features: "مميزات العقار",
      bedrooms: "غرف نوم",
      bathrooms: "حمامات",
      area: "المساحة (م²)",
      parking: "مواقف سيارات",
      amenities: "المرافق",
      details: "تفاصيل العقار",
      type: "نوع العقار",
      status: "الحالة",
      location: "الموقع",
      listed: "تاريخ الإدراج",
      updated: "آخر تحديث",
      propertyId: "معرف العقار",
      ready: "جاهز للسكن",
      contact: "الاتصال بالوسيط",
      message: "إرسال رسالة",
      save: "حفظ",
      share: "مشاركة",
      viewAllPhotos: "عرض كل الصور",
      photo: "صورة",
      of: "من"
    }
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="my-10 min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="mx-auto max-w-7xl px-4 py-6">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-6 hover:bg-accent">
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
                </div>
                
                <h1 className="mb-3 text-3xl font-bold text-foreground lg:text-4xl">
                  {PropertyUtils.getLocalizedTitle(property, locale)}
                </h1>
                
                <div className="mb-4 flex items-center text-muted-foreground">
                  <MapPin className={`size-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  <span className="text-lg font-medium">{property.city}, {property.district}</span>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4" />
                    <span>{t.listed} {new Date(property.createdAt).toLocaleDateString(locale)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-4" />
                    <span>{t.updated} {new Date(property.updatedAt).toLocaleDateString(locale)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Heart className="size-4" />
                  {t.save}
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Share2 className="size-4" />
                  {t.share}
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="space-y-6 lg:col-span-2">
              {/* Gallery with Thumbnails */}
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <PropertyImageGallery 
                    images={property.images || []}
                    title={PropertyUtils.getLocalizedTitle(property, locale)}
                    isRTL={isRTL}
                  />
                </CardContent>
              </Card>

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
                    <div className="rounded-lg border bg-primary/5 p-4 text-center">
                      <Bed className="mx-auto mb-2 size-8 text-primary" />
                      <div className="text-2xl font-bold text-foreground">{property.bedrooms}</div>
                      <div className="text-sm text-muted-foreground">{t.bedrooms}</div>
                    </div>
                    
                    <div className="rounded-lg border bg-primary/5 p-4 text-center">
                      <Bath className="mx-auto mb-2 size-8 text-primary" />
                      <div className="text-2xl font-bold text-foreground">{property.bathrooms}</div>
                      <div className="text-sm text-muted-foreground">{t.bathrooms}</div>
                    </div>
                    
                    <div className="rounded-lg border bg-primary/5 p-4 text-center">
                      <Square className="mx-auto mb-2 size-8 text-primary" />
                      <div className="text-2xl font-bold text-foreground">{property.area}</div>
                      <div className="text-sm text-muted-foreground">{t.area}</div>
                    </div>
                    
                    <div className="rounded-lg border bg-primary/5 p-4 text-center">
                      <Car className="mx-auto mb-2 size-8 text-primary" />
                      <div className="text-2xl font-bold text-foreground">{property.parking || 0}</div>
                      <div className="text-sm text-muted-foreground">{t.parking}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description with HTML formatting */}
              <PropertyDescription 
                content={PropertyUtils.getLocalizedDescription(property, locale)}
                isRTL={isRTL}
              />

              {/* Amenities */}
              {propertyFeatures.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <CheckCircle className="size-5" />
                      {t.amenities}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                      {propertyFeatures.map((feature, index) => {
                        const amenity = amenities.find(a => a.key === feature);
                        if (!amenity) return null;
                        
                        const Icon = amenity.icon;
                        const label = locale === 'ar' ? amenity.arLabel : amenity.label;
                        
                        return (
                          <div key={index} className="flex items-center gap-3 rounded-lg border bg-muted/50 p-3">
                            <Icon className="size-5 text-primary" />
                            <span className="font-medium text-foreground">{label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Property Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{t.details}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b py-2">
                        <span className="text-muted-foreground">{t.type}</span>
                        <span className="font-medium">{property.type}</span>
                      </div>
                      <div className="flex items-center justify-between border-b py-2">
                        <span className="text-muted-foreground">{t.status}</span>
                        <Badge className={getStatusColor(property.status)}>
                          {property.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between border-b py-2">
                        <span className="text-muted-foreground">{t.location}</span>
                        <span className="text-right font-medium">
                          {property.city}, {property.district}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b py-2">
                        <span className="text-muted-foreground">{t.listed}</span>
                        <span className="font-medium">
                          {new Date(property.createdAt).toLocaleDateString(locale)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-b py-2">
                        <span className="text-muted-foreground">{t.updated}</span>
                        <span className="font-medium">
                          {new Date(property.updatedAt).toLocaleDateString(locale)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-b py-2">
                        <span className="text-muted-foreground">{t.propertyId}</span>
                        <span className="font-mono text-sm">{property.id.slice(-8)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Price Card */}
              <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="mb-2 text-4xl font-bold">
                      {formatPrice(property.price)}
                    </div>
                    <div className="mb-6 text-primary-foreground/80">{t.ready}</div>
                    
                    <div className="space-y-3">
                      <Button className="w-full bg-background text-foreground hover:bg-background/90" size="lg">
                        <Phone className={`${isRTL ? 'ml-2' : 'mr-2'} size-4`} />
                        {t.contact}
                      </Button>
                      <Button variant="outline" className="w-full border-background text-background hover:bg-background/20" size="sm">
                        <Mail className={`${isRTL ? 'ml-2' : 'mr-2'} size-4`} />
                        {t.message}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}