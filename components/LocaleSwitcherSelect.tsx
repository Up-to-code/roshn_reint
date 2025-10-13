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
import { ChevronDown } from "lucide-react";

type Props = {
  label: string;
};

type Locale = 'en' | 'ar';

export default function LocaleSwitcherSelect({ label }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { currentLang, setCurrentLang } = useHomePageStore();

  const handleLocaleChange = (nextLocale: Locale) => {
    const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, '') || '/';
    setCurrentLang(nextLocale);
    router.push(`/${nextLocale}${pathWithoutLocale}`);
  };

  return (
    <Select value={currentLang} onValueChange={handleLocaleChange}>
      <SelectTrigger
        className="h-11 w-[120px] gap-2 rounded-xl bg-background/90 font-medium backdrop-blur-xl"
        aria-label={label}
      >
        <SelectValue />
        <ChevronDown className="size-4" />
      </SelectTrigger>
      <SelectContent className="rounded-xl bg-background/95 backdrop-blur-xl">
        <SelectItem value="ar" className="rounded-lg font-medium">
          <div className="flex items-center gap-2.5">
            <span>🇸🇦</span>
            <span>العربية</span>
          </div>
        </SelectItem>
        <SelectItem value="en" className="rounded-lg font-medium">
          <div className="flex items-center gap-2.5">
            <span>🇺🇸</span>
            <span>English</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}