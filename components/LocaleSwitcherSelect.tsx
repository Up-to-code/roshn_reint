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