import * as React from "react";
import Link from "next/link";

import { footerLinks, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/layout/mode-toggle";

import { NewsletterForm } from "../forms/newsletter-form";
import { Icons } from "../shared/icons";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  const propertyData = {
    id: "PR-2025-001",
    title: "شقق فندقية فاخرة على الكورنيش",
    subtitle: "إطلالة بحرية ساحرة مع تصميم عصري", 
    agent: {
      name: "العقارية الخليجية",
      title: "وكيل عقاري معتمد",
      phone: "+966 50 123 4567",
      whatsapp: "+966 50 123 4567",
      email: "info@realestate.sa",
      logo: "ع",
      license: "رخصة فال: 1234567890",
      rating: 4.8,
      deals: 150,
      city: "جدة",
    },
    breadcrumb: ["الرئيسية", "عقارات", "جدة", "الخالدية"],
    location: {
      street: "طريق الكورنيش",
      nearbyPlaces: ["مركز ريد سي مول", "كورنيش جدة", "مطار الملك عبدالعزيز"],
      coordinates: { lat: 21.5433, lng: 39.1728 },
      city: "جدة",
    },
  }
  return (
       <footer className="bg-card border-t py-12 mt-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">{propertyData.agent.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                منصة عقارية رائدة في المملكة العربية السعودية، نوفر أفضل العقارات والخدمات الاحترافية
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">روابط سريعة</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition">الرئيسية</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition">عقارات للبيع</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition">عقارات للإيجار</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition">من نحن</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">خدماتنا</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition">شراء عقار</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition">بيع عقار</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition">إيجار عقار</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition">استشارات عقارية</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">تواصل معنا</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>{propertyData.location.city}، المملكة العربية السعودية</p>
                <p>{propertyData.agent.phone}</p>
                <p>{propertyData.agent.email}</p>
              </div>
            </div>
          </div>
          <div className="text-center text-muted-foreground text-sm pt-8 border-t">
            © 2025 {propertyData.agent.name}. جميع الحقوق محفوظة
          </div>
        </div>
      </footer>
  );
}
