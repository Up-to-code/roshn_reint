import Link from "next/link";
import { getLocale } from "next-intl/server";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/layout/mode-toggle";
import { NewsletterForm } from "../forms/newsletter-form";

// Categories with Unsplash images
const categories = [
  {
    id: 1,
    title: "Villas",
    href: "/properties?type=villa",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=400&fit=crop&crop=center",
    alt: "Luxury villas"
  },
  {
    id: 2,
    title: "Apartments",
    href: "/properties?type=apartment",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=400&fit=crop&crop=center",
    alt: "Modern apartments"
  },
  {
    id: 3,
    title: "Townhouses",
    href: "/properties?type=townhouse",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=400&fit=crop&crop=center",
    alt: "Spacious townhouses"
  },
  {
    id: 4,
    title: "Land",
    href: "/properties?type=land",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center",
    alt: "Residential land"
  },
  {
    id: 5,
    title: "Commercial",
    href: "/properties?type=commercial",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=400&fit=crop&crop=center",
    alt: "Commercial properties"
  },
  {
    id: 6,
    title: "Offices",
    href: "/properties?type=office",
    image: "https://images.unsplash.com/photo-1497366214040-6e8f6d6b229e?w=400&h=400&fit=crop&crop=center",
    alt: "Office spaces"
  }
];

const quickLinks = [
  { title: "Home", href: "/" },
  { title: "Properties", href: "/p" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" }
];

const services = [
  { title: "Buy Property", href: "/services/buy" },
  { title: "Sell Property", href: "/services/sell" },
  { title: "Rent Property", href: "/services/rent" },
  { title: "Property Management", href: "/services/management" }
];

const socialLinks = [
  { name: "Facebook", href: "#", icon: "facebook" },
  { name: "Twitter", href: "#", icon: "twitter" },
  { name: "Instagram", href: "#", icon: "instagram" },
  { name: "LinkedIn", href: "#", icon: "linkedin" }
];

export async function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  const locale = await getLocale();
  const isRTL = locale === "ar";

  return (
    <footer className={cn("mt-20 border-t border-zinc-200 bg-zinc-50 py-12 dark:border-zinc-800 dark:bg-zinc-950", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Categories Grid */}
        <div className="mb-12">
          <h3 className="mb-6 text-center text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {isRTL ? "تصفح حسب الفئة" : "Browse by Category"}
          </h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="group relative overflow-hidden rounded-lg transition-transform hover:scale-105"
              >
                <div className="relative aspect-square">
                  <Image
                    src={category.image}
                    alt={category.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    priority={category.id <= 3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-center text-sm font-semibold text-white">
                      {isRTL ? 
                        category.title === "Villas" ? "فلل"
                        : category.title === "Apartments" ? "شقق"
                        : category.title === "Townhouses" ? "تاون هاوس"
                        : category.title === "Land" ? "أراضي"
                        : category.title === "Commercial" ? "تجاري"
                        : category.title === "Offices" ? "مكاتب"
                        : category.title
                        : category.title
                      }
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

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
              <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                {isRTL ? "العقارية" : "RealEstate"}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {isRTL 
                ? "منصة عقارية رائدة تقدم أفضل الخدمات والعقارات في المملكة" 
                : "Leading real estate platform offering the best properties and services"
              }
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-bold text-zinc-900 dark:text-zinc-100">
              {isRTL ? "روابط سريعة" : "Quick Links"}
            </h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  >
                    {isRTL 
                      ? link.title === "Home" ? "الرئيسية"
                      : link.title === "Properties" ? "العقارات"
                      : link.title === "About" ? "من نحن"
                      : link.title === "Contact" ? "اتصل بنا"
                      : link.title
                      : link.title
                    }
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 font-bold text-zinc-900 dark:text-zinc-100">
              {isRTL ? "خدماتنا" : "Our Services"}
            </h4>
            <ul className="space-y-2 text-sm">
              {services.map((service) => (
                <li key={service.href}>
                  <Link 
                    href={service.href}
                    className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  >
                    {isRTL 
                      ? service.title === "Buy Property" ? "شراء عقار"
                      : service.title === "Sell Property" ? "بيع عقار"
                      : service.title === "Rent Property" ? "إيجار عقار"
                      : service.title === "Property Management" ? "إدارة العقارات"
                      : service.title
                      : service.title
                    }
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="mb-4 font-bold text-zinc-900 dark:text-zinc-100">
              {isRTL ? "ابق على تواصل" : "Stay Connected"}
            </h4>
            <NewsletterForm />
            <div className="mt-4 flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="flex size-8 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-100 text-zinc-600 transition-colors hover:bg-zinc-200 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-100"
                >
                  <span className="sr-only">{social.name}</span>
                  {/* You can add actual icons here */}
                  <div className="size-4 rounded-full bg-zinc-400" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-200 pt-8 text-center text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
          <p>
            © {new Date().getFullYear()} {isRTL ? "العقارية" : "RealEstate"}. 
            {isRTL ? " جميع الحقوق محفوظة" : " All rights reserved"}
          </p>
        </div>
      </div>
    </footer>
  );
}