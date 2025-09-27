"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Locale, Pathnames, routing, usePathname, useRouter } from "@/i18n/routing";
import { useHomePageStore } from "@/store/home-page-store";
import { useEffect, useState } from "react";

type Props = {
  label: string;
};

export default function LocaleSwitcherSelect({ label }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLocale, setCurrentLocale] = useState<Locale>(routing.defaultLocale);
  
  // Use the home page store for the button variant
  const { currentLang, setCurrentLang } = useHomePageStore();

  // 🧹 دالة تنظف أي prefix لغة موجود في المسار
  const stripLocale = (path: string): string => {
    const segments = path.split("/").filter(Boolean);

    if (segments.length > 0 && routing.locales.includes(segments[0] as Locale)) {
      // شيل أول segment لو هو locale
      return "/" + segments.slice(1).join("/");
    }
    return path || "/";
  };

  // 📌 detect locale from URL and sync with store
  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length > 0 && routing.locales.includes(segments[0] as Locale)) {
      const detectedLocale = segments[0] as Locale;
      setCurrentLocale(detectedLocale);
      // Sync store with detected locale
      setCurrentLang(detectedLocale);
    } else {
      // enforce defaultLocale لو مفيش prefix
      setCurrentLocale(routing.defaultLocale);
      // Sync store with default locale
      setCurrentLang(routing.defaultLocale);
    }
  }, [pathname, setCurrentLang]);

  function onSelectChange(nextLocale: string) {
    let cleanPath = stripLocale(pathname) as Pathnames;
  
    // fallback لو مش معرف في routing
    if (!(cleanPath in routing.pathnames)) {
      cleanPath = "/" as Pathnames;
    }

    // Update the store when locale changes
    setCurrentLang(nextLocale as 'en' | 'ar');
  
    router.replace(cleanPath, { locale: nextLocale as Locale });
  }
  return (
    <Select value={currentLocale} onValueChange={onSelectChange}>
      <SelectTrigger
        className="h-8 min-w-[120px] border-none bg-transparent focus:ring-0 focus:ring-offset-0"
        aria-label={label}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ar">العربية</SelectItem>
        <SelectItem value="en">English</SelectItem>
      </SelectContent>
    </Select>
  );
}