import Link from "next/link";
import { getLocale } from "next-intl/server";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/layout/mode-toggle";

interface FooterLink {
  id: string;
  label: string;
  href: string;
  external: boolean;
}

interface FooterSection {
  id: string;
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

interface FooterData {
  copyrightText: string;
  sections: FooterSection[];
  socialLinks: SocialLink[];
  backgroundColor: string;
  textColor: string;
  showSocialLinks: boolean;
}

// Function to fetch footer data from API
async function getFooterData(locale: string): Promise<FooterData | null> {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/home-page?locale=${locale}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch footer data');
    }

    const result = await response.json();
    console.log(result.data.footer);

    if (result.success && result.data?.footer) {
      return result.data.footer;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching footer data:', error);
    return null;
  }
}

export async function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  const locale = await getLocale();
  const isRTL = locale === "ar";

  // Fetch footer data directly from API
  const footerData = await getFooterData(locale);

  // If no footer data from API, return minimal footer
  if (!footerData) {
    return (
      <footer className={cn("mt-20 border-t border-zinc-200 bg-zinc-50 py-8 dark:border-zinc-800 dark:bg-zinc-950", className)}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-zinc-600 dark:text-zinc-400">
            <p>
              © {new Date().getFullYear()} {isRTL ? "العقارية" : "RealEstate"}. 
              {isRTL ? " جميع الحقوق محفوظة" : " All rights reserved"}
            </p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer 
      className={cn("mt-20 border-t border-zinc-200 py-12 dark:border-zinc-800", className)}
      style={{ 
        backgroundColor: footerData.backgroundColor,
        color: footerData.textColor
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Content */}
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="relative size-10 overflow-hidden rounded-lg">
                <Image
                  src="/logo.jpg"
                  alt="Logo"
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <span className="text-xl font-bold" style={{ color: footerData.textColor }}>
                {isRTL ? "العقارية" : "RealEstate"}
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: footerData.textColor, opacity: 0.8 }}>
              {isRTL 
                ? "منصة عقارية رائدة تقدم أفضل الخدمات والعقارات في المملكة" 
                : "Leading real estate platform offering the best properties and services"
              }
            </p>
          </div>

          {/* Footer Sections from API */}
          {footerData.sections.map((section) => (
            <div key={section.id}>
              <h4 className="mb-4 font-bold" style={{ color: footerData.textColor }}>
                {section.title}
              </h4>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link.id}>
                    <Link 
                      href={link.href}
                      className="transition-colors hover:opacity-80"
                      style={{ color: footerData.textColor, opacity: 0.8 }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div 
          className="border-t pt-8 text-center text-sm"
          style={{ 
            borderColor: footerData.textColor,
            color: footerData.textColor,
            opacity: 0.8
          }}
        >
          <p>{footerData.copyrightText}</p>
        </div>
      </div>
    </footer>
  );
}