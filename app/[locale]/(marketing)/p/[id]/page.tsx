"use client";
import React, { useState } from 'react';
import { Heart, Share2, Bed, Bath, Maximize, MapPin, Phone, Mail, MessageSquare, ChevronLeft, ChevronRight, Car, Shield, Wifi, Dumbbell, Waves, Wind, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

// Mock Data
const propertyData = {
  id: "PR-2025-001",
  title: "شقق فندقية فاخرة على الكورنيش",
  subtitle: "إطلالة بحرية ساحرة مع تصميم عصري",
  description: "اكتشف الفخامة في قلب جدة مع هذه الشقة الفندقية الاستثنائية. تقع في منطقة الخالدية الراقية على بعد خطوات من الكورنيش، حيث يلتقي التصميم المعاصر بالراحة المطلقة. تتميز الشقة بمساحات واسعة ومفتوحة مع إطلالات بانورامية على البحر الأحمر. تم تصميم كل ركن بعناية فائقة لتوفير أقصى درجات الراحة والأناقة.",
  price: 1250000,
  pricePerMeter: 8333,
  currency: "ريال",
  status: "متاح",
  featured: true,
  location: {
    city: "جدة",
    district: "الخالدية",
    street: "طريق الكورنيش",
    nearbyPlaces: ["مركز ريد سي مول", "كورنيش جدة", "مطار الملك عبدالعزيز"],
    coordinates: { lat: 21.5433, lng: 39.1728 }
  },
  specifications: {
    bedrooms: 4,
    bathrooms: 3,
    area: 150,
    livingRooms: 2,
    kitchens: 1,
    maidRoom: true,
    parkingSpaces: 2,
    floor: 12,
    totalFloors: 15,
    type: "شقة فندقية",
    status: "جاهز للسكن",
    yearBuilt: 2024,
    furnished: "مفروشة بالكامل",
    view: "إطلالة بحرية"
  },
  features: [
    { icon: Car, text: "موقف سيارات مغطى", highlight: true },
    { icon: Shield, text: "حراسة أمنية 24/7", highlight: true },
    { icon: Wind, text: "تكييف مركزي", highlight: false },
    { icon: Waves, text: "حمام سباحة أولمبي", highlight: true },
    { icon: Dumbbell, text: "صالة رياضية مجهزة", highlight: true },
    { icon: Wifi, text: "انترنت فائق السرعة", highlight: false },
    { icon: null, text: "مطبخ مجهز بالكامل", highlight: false },
    { icon: null, text: "نظام أمان ذكي", highlight: true },
    { icon: null, text: "غرفة خادمة مع حمام", highlight: false },
    { icon: null, text: "بلكونة واسعة", highlight: false },
    { icon: null, text: "مصعد سريع", highlight: false },
    { icon: null, text: "مولد كهرباء احتياطي", highlight: false }
  ],
  amenities: [
    "ردهة فاخرة مع استقبال 24 ساعة",
    "منطقة لعب أطفال آمنة",
    "غرفة اجتماعات للسكان",
    "خدمة صيانة سريعة",
    "نظام إدارة المبنى الذكي",
    "مواقف زوار إضافية"
  ],
  images: [
    'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
    'https://images.unsplash.com/photo-1600573472556-e21c32d0d0e4?w=1200',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200',
    'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=1200'
  ],
  agent: {
    name: "العقارية الخليجية",
    title: "وكيل عقاري معتمد",
    phone: "+966 50 123 4567",
    whatsapp: "+966 50 123 4567",
    email: "info@realestate.sa",
    logo: "ع",
    license: "رخصة فال: 1234567890",
    rating: 4.8,
    deals: 150
  },
  breadcrumb: ["الرئيسية", "عقارات", "جدة", "الخالدية"]
};

export default function PropertyListing() {
  const [mainImage, setMainImage] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: 'أنا مهتم بهذا العقار وأرغب في الحصول على المزيد من المعلومات'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen bg-background ${darkMode ? 'dark' : ''}`} dir="rtl">


      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-6">
          {propertyData.breadcrumb.join(' / ')}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Header */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {propertyData.featured && <Badge variant="default">مميز</Badge>}
                    <Badge variant="outline">{propertyData.status}</Badge>
                  </div>
                  <h1 className="text-4xl font-bold mb-2">{propertyData.title}</h1>
                  <p className="text-lg text-muted-foreground mb-3">{propertyData.subtitle}</p>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{propertyData.location.street}، {propertyData.location.district}، {propertyData.location.city}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-baseline gap-3">
                <div className="text-5xl font-bold">{propertyData.price.toLocaleString()}</div>
                <div className="text-xl text-muted-foreground">{propertyData.currency}</div>
                <div className="text-sm text-muted-foreground mr-auto">
                  {propertyData.pricePerMeter.toLocaleString()} {propertyData.currency}/م²
                </div>
              </div>
            </div>

            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={propertyData.images[mainImage]} 
                    alt="Property"
                    className="w-full h-[500px] object-cover"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setMainImage((mainImage - 1 + propertyData.images.length) % propertyData.images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setMainImage((mainImage + 1) % propertyData.images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                  <div className="absolute bottom-4 right-4 bg-black/70 dark:bg-white/70 text-white dark:text-black px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                    {mainImage + 1} / {propertyData.images.length}
                  </div>
                </div>
                <div className="grid grid-cols-8 gap-2 p-4 bg-muted/50">
                  {propertyData.images.map((img, idx) => (
                    <img 
                      key={idx}
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      onClick={() => setMainImage(idx)}
                      className={`w-full h-20 object-cover rounded cursor-pointer transition ${
                        mainImage === idx ? 'ring-2 ring-primary opacity-100' : 'opacity-50 hover:opacity-100'
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Property Stats */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-4 gap-6">
                  <div className="text-center">
                    <Bed className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{propertyData.specifications.bedrooms}</div>
                    <div className="text-sm text-muted-foreground">غرف نوم</div>
                  </div>
                  <div className="text-center">
                    <Bath className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{propertyData.specifications.bathrooms}</div>
                    <div className="text-sm text-muted-foreground">حمامات</div>
                  </div>
                  <div className="text-center">
                    <Maximize className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{propertyData.specifications.area}</div>
                    <div className="text-sm text-muted-foreground">متر مربع</div>
                  </div>
                  <div className="text-center">
                    <Car className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{propertyData.specifications.parkingSpaces}</div>
                    <div className="text-sm text-muted-foreground">موقف</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">وصف العقار</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {propertyData.description}
                </p>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">المميزات</h2>
                <div className="grid grid-cols-2 gap-3">
                  {propertyData.features.map((feature, idx) => {
                    const Icon = feature.icon;
                    return (
                      <div 
                        key={idx} 
                        className={`flex items-center gap-3 p-3 rounded-lg transition ${
                          feature.highlight 
                            ? 'bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30' 
                            : 'bg-muted dark:bg-muted/50'
                        }`}
                      >
                        {Icon && <Icon className="w-5 h-5 text-primary" />}
                        {!Icon && <div className="w-2 h-2 bg-primary rounded-full" />}
                        <span className="text-sm">{feature.text}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Details */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">التفاصيل</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "رقم العقار", value: propertyData.id },
                    { label: "نوع العقار", value: propertyData.specifications.type },
                    { label: "المساحة", value: `${propertyData.specifications.area} م²` },
                    { label: "حالة العقار", value: propertyData.specifications.status },
                    { label: "عدد الغرف", value: propertyData.specifications.bedrooms },
                    { label: "سنة البناء", value: propertyData.specifications.yearBuilt },
                    { label: "الطابق", value: `${propertyData.specifications.floor} من ${propertyData.specifications.totalFloors}` },
                    { label: "الإطلالة", value: propertyData.specifications.view },
                    { label: "الأثاث", value: propertyData.specifications.furnished },
                    { label: "غرف المعيشة", value: propertyData.specifications.livingRooms }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between py-3 border-b">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">خدمات المبنى</h2>
                <div className="grid grid-cols-2 gap-3">
                  {propertyData.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">الموقع</h2>
                <div className="w-full h-80 bg-muted dark:bg-muted/50 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">{propertyData.location.street}، {propertyData.location.district}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">أماكن قريبة</h3>
                  <div className="flex flex-wrap gap-2">
                    {propertyData.location.nearbyPlaces.map((place, idx) => (
                      <Badge key={idx} variant="secondary">{place}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Agent Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 text-3xl font-bold">
                      {propertyData.agent.logo}
                    </div>
                    <h3 className="text-xl font-bold mb-1">{propertyData.agent.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{propertyData.agent.title}</p>
                    <p className="text-xs text-muted-foreground">{propertyData.agent.license}</p>
                    <div className="flex items-center justify-center gap-4 mt-3 text-sm">
                      <div>
                        <span className="font-bold">⭐ {propertyData.agent.rating}</span>
                        <span className="text-muted-foreground"> تقييم</span>
                      </div>
                      <div className="w-px h-4 bg-border" />
                      <div>
                        <span className="font-bold">{propertyData.agent.deals}+</span>
                        <span className="text-muted-foreground"> صفقة</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <Input 
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="الاسم الكامل"
                    />

                    <Input 
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="البريد الإلكتروني"
                    />

                    <Input 
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="رقم الجوال"
                    />

                    <Textarea 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows="4"
                      placeholder="رسالتك"
                    />
                  </div>

                  <div className="space-y-3">
                    <Button onClick={handleSubmit} className="w-full">
                      إرسال الرسالة
                    </Button>

                    <Button variant="outline" className="w-full">
                      <MessageSquare className="w-4 h-4 ml-2" />
                      تواصل عبر واتساب
                    </Button>
                  </div>

                  <div className="mt-6 pt-6 border-t space-y-3">
                    <Button variant="ghost" className="w-full justify-start">
                      <Phone className="w-4 h-4 ml-2" />
                      {propertyData.agent.phone}
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Mail className="w-4 h-4 ml-2" />
                      {propertyData.agent.email}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4">معلومات سريعة</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">رقم الإعلان</span>
                      <span className="font-medium">{propertyData.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">تاريخ النشر</span>
                      <span className="font-medium">منذ أسبوعين</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">المشاهدات</span>
                      <span className="font-medium">1,245</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

    
    </div>
  );
}