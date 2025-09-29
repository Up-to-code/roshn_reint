import { NextRequest, NextResponse } from 'next/server';
import { readSettings, writeSettings } from '@/lib/db-utils';

const defaultHomePageData = {
  en: {
    hero: {
      title: "Welcome to Our Platform",
      subtitle: "Innovative solutions for your business growth",
      primaryButton: { text: "Get Started", link: "/signup", variant: "primary" as const },
      secondaryButton: { text: "Learn More", link: "/about", variant: "secondary" as const },
      backgroundVideo: "",
      overlayColor: "rgba(0,0,0,0.4)",
    },
    banners: [],
    whyUs: { title: "Why Choose Us", subtitle: "We provide the best services in the industry", features: [] },
    testimonials: { title: "Testimonials", subtitle: "What our clients say", testimonials: [] },
    aboutUs: { title: "About Us", content: "We are a leading company...", image: "", stats: [] },
    contactUs: {
      title: "Contact Us",
      subtitle: "Get in touch",
      description: "We'd love to hear from you",
      enabled: true,
      email: "info@company.com",
      phone: "+1234567890",
      address: "123 Main Street",
      formEnabled: true,
      contactInfo: {
        address: "123 Main Street",
        phone: "+1234567890",
        email: "info@company.com",
        workingHours: "Mon-Fri: 9AM-5PM",
      },
      form: { enabled: true, fields: [] },
      map: { enabled: true, embedCode: "" },
    },
  },
  ar: {
    hero: {
      title: "مرحباً بكم في منصتنا",
      subtitle: "حلول مبتكرة لنمو عملك",
      primaryButton: { text: "ابدأ الآن", link: "/signup", variant: "primary" as const },
      secondaryButton: { text: "اعرف المزيد", link: "/about", variant: "secondary" as const },
      backgroundVideo: "",
      overlayColor: "rgba(0,0,0,0.4)",
    },
    banners: [],
    whyUs: { title: "لماذا تختارنا", subtitle: "نقدم أفضل الخدمات في المجال", features: [] },
    testimonials: { title: "آراء العملاء", subtitle: "ما يقوله عملاؤنا", testimonials: [] },
    aboutUs: { title: "من نحن", content: "نحن شركة رائدة...", image: "", stats: [] },
    contactUs: {
      title: "اتصل بنا",
      subtitle: "ابق على تواصل",
      description: "نحن سعداء بتواصلك معنا",
      enabled: true,
      email: "info@company.com",
      phone: "+1234567890",
      address: "123 الشارع الرئيسي",
      formEnabled: true,
      contactInfo: {
        address: "123 الشارع الرئيسي",
        phone: "+1234567890",
        email: "info@company.com",
        workingHours: "الإثنين-الجمعة: 9ص-5م",
      },
      form: { enabled: true, fields: [] },
      map: { enabled: true, embedCode: "" },
    },
  },
};

// GET /api/home-page
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') as 'en' | 'ar' | null;

    const settings = await readSettings();
    const homePageData = settings.homePage || defaultHomePageData;

    const mergedData = {
      en: { ...defaultHomePageData.en, ...homePageData.en },
      ar: { ...defaultHomePageData.ar, ...homePageData.ar },
    };

    if (locale && (locale === 'ar' || locale === 'en')) {
      return NextResponse.json({ success: true, data: mergedData[locale] });
    }

    return NextResponse.json({ success: true, data: mergedData });
  } catch (error) {
    console.error('Error reading home page data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to read home page data' },
      { status: 500 }
    );
  }
}

// POST /api/home-page
export async function POST(request: NextRequest) {
  try {
    const homePageData = await request.json();

    if (!homePageData.en || !homePageData.ar) {
      return NextResponse.json(
        { success: false, error: 'Invalid home page data structure' },
        { status: 400 }
      );
    }

    const settings = await readSettings();

    const updatedSettings = { ...settings, homePage: homePageData };

    const success = await writeSettings(updatedSettings);

    if (success) {
      return NextResponse.json({ success: true, message: 'Home page data saved successfully' });
    }

    return NextResponse.json(
      { success: false, error: 'Failed to save home page data' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Error saving home page data:', error);
    return NextResponse.json(
      { success: false, error: 'Invalid home page data' },
      { status: 400 }
    );
  }
}
