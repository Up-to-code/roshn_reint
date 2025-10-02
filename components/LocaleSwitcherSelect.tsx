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

  const handleLocaleChange = (nextLocale: Locale) => {
    // Remove current locale from pathname
    const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, '') || '/';
    
    // Update store
    setCurrentLang(nextLocale);
    
    // Navigate to new locale
    router.push(`/${nextLocale}${pathWithoutLocale}`);
  };

  return (
    <Select value={currentLang} onValueChange={handleLocaleChange}>
      <SelectTrigger
        className={cn(
          "h-9 w-[100px] border-zinc-700 bg-zinc-900 text-zinc-100",
          "focus:ring-1 focus:ring-zinc-500 focus:ring-offset-0",
          "hover:border-zinc-600 hover:bg-zinc-800",
          "rounded-lg transition-colors"
        )}
        aria-label={label}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent 
        className="border-zinc-700 bg-zinc-900 text-zinc-100"
      >
        <SelectItem 
          value="ar" 
          className={cn(
            "focus:bg-zinc-800 focus:text-zinc-100",
            "rounded-md transition-colors",
            currentLang === 'ar' && "bg-zinc-800 text-zinc-100"
          )}
        >
          العربية
        </SelectItem>
        <SelectItem 
          value="en"
          className={cn(
            "focus:bg-zinc-800 focus:text-zinc-100",
            "rounded-md transition-colors",
            currentLang === 'en' && "bg-zinc-800 text-zinc-100"
          )}
        >
          English
        </SelectItem>
      </SelectContent>
    </Select>
  );
}