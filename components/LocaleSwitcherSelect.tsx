"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, usePathname } from "next/navigation";
import { useHomePageStore } from "@/store/home-page-store";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
};

type Locale = 'en' | 'ar';

export default function LocaleSwitcherSelect({ label }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { currentLang, setCurrentLang } = useHomePageStore();

  const onSelectChange = (nextLocale: Locale) => {
    // Remove current locale from pathname
    const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, '') || '/';
    
    // Update store
    setCurrentLang(nextLocale);
    
    // Navigate to new locale
    router.push(`/${nextLocale}${pathWithoutLocale}`);
  };

  return (
    <Select value={currentLang} onValueChange={onSelectChange}>
      <SelectTrigger
        className={cn(
          "h-9 w-[120px] border border-gray-700 bg-black text-white",
          "focus:ring-1 focus:ring-blue-500 focus:ring-offset-0",
          "hover:border-gray-600 hover:bg-black/80",
          "rounded-xl transition-all duration-200"
        )}
        aria-label={label}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent 
        className="rounded-xl border-gray-700 bg-black text-white shadow-2xl backdrop-blur-2xl"
      >
        <SelectItem 
          value="ar" 
          className={cn(
            "cursor-pointer focus:bg-white/10 focus:text-white",
            "rounded-lg transition-all duration-200",
            currentLang === 'ar' && "bg-white/10 text-blue-400"
          )}
        >
          العربية
        </SelectItem>
        <SelectItem 
          value="en"
          className={cn(
            "cursor-pointer focus:bg-white/10 focus:text-white",
            "rounded-lg transition-all duration-200",
            currentLang === 'en' && "bg-white/10 text-blue-400"
          )}
        >
          English
        </SelectItem>
      </SelectContent>
    </Select>
  );
}