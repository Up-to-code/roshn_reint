// app/page.tsx
"use client";

import { useEffect } from "react";
import { useHomePageStore } from "@/store/home-page-store";
import { LanguageSwitcher } from "@/components/language-switcher";
import { HeroSection } from "@/components/home-page/sections/hero-section";
import { BannersSection } from "@/components/home-page/sections/banners-section";
import { WhyUsSection } from "@/components/home-page/sections/why-us-section";
import { AboutUsSection } from "@/components/home-page/sections/about-us-section";
import { TestimonialsSection } from "@/components/home-page/sections/testimonials-section";
import { ContactUsSection } from "@/components/home-page/sections/contact-us-section";

export default function Home() {
  const { data, currentLang, loadData, isLoading } = useHomePageStore();

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#2C2C2C]">
        <div className="text-center text-white">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-[#FF8C42]"></div>
          <p className="mt-4 text-gray-300">
            {currentLang === 'en' ? 'Loading...' : 'جاري التحميل...'}
          </p>
        </div>
      </div>
    );
  }

  const content = data[currentLang];

  if (!content) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#2C2C2C]">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold text-gray-300">
            {currentLang === 'en' ? 'No content available' : 'لا يوجد محتوى متاح'}
          </h1>
          <p className="mt-2 text-gray-400">
            {currentLang === 'en' ? 'Please configure your home page content' : 'يرجى تكوين محتوى الصفحة الرئيسية'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
      <LanguageSwitcher />
      <HeroSection content={content.hero} />
      <BannersSection banners={content.banners} />
      <WhyUsSection content={content.whyUs} />
      <AboutUsSection content={content.aboutUs} />
      <TestimonialsSection content={content.testimonials} />
      <ContactUsSection content={content.contactUs} />
    </div>
  );
}