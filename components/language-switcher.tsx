// components/language-switcher.tsx
"use client";

import { useHomePageStore } from "@/store/home-page-store";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { currentLang, setCurrentLang } = useHomePageStore();

  const toggleLanguage = () => {
    setCurrentLang(currentLang === 'en' ? 'ar' : 'en');
  };

  return (
    <Button
      onClick={toggleLanguage}
      variant="outline"
      size="sm"
      className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm border-gray-300"
    >
      <Globe className="w-4 h-4 mr-2" />
      {currentLang === 'en' ? 'العربية' : 'English'}
    </Button>
  );
}