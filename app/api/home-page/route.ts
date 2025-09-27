import { NextRequest, NextResponse } from 'next/server';
import { readSettings, writeSettings } from '@/lib/db-utils';

// Default data structure to ensure consistency
const defaultHomePageData = {
  en: {
    hero: {
      title: "",
      subtitle: "",
      primaryButton: { text: "", link: "", variant: "primary" as const },
      secondaryButton: { text: "", link: "", variant: "secondary" as const },
      backgroundVideo: "",
      overlayColor: "rgba(0,0,0,0.4)"
    },
    banners: [],
    whyUs: { title: "", subtitle: "", features: [] },
    testimonials: { title: "", subtitle: "", testimonials: [] },
    aboutUs: { title: "", content: "", image: "", stats: [] },
    contactUs: {
      title: "", subtitle: "", description: "", enabled: true,
      email: "", phone: "", address: "", formEnabled: true,
      contactInfo: { address: "", phone: "", email: "", workingHours: "" },
      form: { enabled: true, fields: [] },
      map: { enabled: true, embedCode: "" }
    }
  },
  ar: {
    // Same structure as English
    hero: {
      title: "",
      subtitle: "",
      primaryButton: { text: "", link: "", variant: "primary" as const },
      secondaryButton: { text: "", link: "", variant: "secondary" as const },
      backgroundVideo: "",
      overlayColor: "rgba(0,0,0,0.4)"
    },
    banners: [],
    whyUs: { title: "", subtitle: "", features: [] },
    testimonials: { title: "", subtitle: "", testimonials: [] },
    aboutUs: { title: "", content: "", image: "", stats: [] },
    contactUs: {
      title: "", subtitle: "", description: "", enabled: true,
      email: "", phone: "", address: "", formEnabled: true,
      contactInfo: { address: "", phone: "", email: "", workingHours: "" },
      form: { enabled: true, fields: [] },
      map: { enabled: true, embedCode: "" }
    }
  }
};

// GET /api/home-page - Read home page data
export async function GET() {
  try {
    const settings = await readSettings();
    const homePageData = settings.homePage || defaultHomePageData;
    
    // Merge with default to ensure all fields exist
    const mergedData = {
      en: { ...defaultHomePageData.en, ...homePageData.en },
      ar: { ...defaultHomePageData.ar, ...homePageData.ar }
    };
    
    return NextResponse.json({ 
      success: true, 
      data: mergedData 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to read home page data' },
      { status: 500 }
    );
  }
}

// POST /api/home-page - Update home page data
export async function POST(request: NextRequest) {
  try {
    const homePageData = await request.json();
    
    // Validate structure
    if (!homePageData.en || !homePageData.ar) {
      return NextResponse.json(
        { success: false, error: 'Invalid home page data structure' },
        { status: 400 }
      );
    }
    
    // Read current settings
    const settings = await readSettings();
    
    // Update only home page data
    const updatedSettings = {
      ...settings,
      homePage: homePageData
    };
    
    const success = await writeSettings(updatedSettings);
    
    if (success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Home page data saved successfully' 
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to save home page data' },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid home page data' },
      { status: 400 }
    );
  }
}