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
       <footer className="mt-20 border-t bg-card py-12">
        <div className="container mx-auto px-6">
          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-xl font-bold">{propertyData.agent.name}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                منصة عقارية رائدة في المملكة العربية السعودية، نوفر أفضل العقارات والخدمات الاحترافية
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-bold">روابط سريعة</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground transition hover:text-primary">الرئيسية</a></li>
                <li><a href="#" className="text-muted-foreground transition hover:text-primary">عقارات للبيع</a></li>
                <li><a href="#" className="text-muted-foreground transition hover:text-primary">عقارات للإيجار</a></li>
                <li><a href="#" className="text-muted-foreground transition hover:text-primary">من نحن</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-bold">خدماتنا</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground transition hover:text-primary">شراء عقار</a></li>
                <li><a href="#" className="text-muted-foreground transition hover:text-primary">بيع عقار</a></li>
                <li><a href="#" className="text-muted-foreground transition hover:text-primary">إيجار عقار</a></li>
                <li><a href="#" className="text-muted-foreground transition hover:text-primary">استشارات عقارية</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-bold">تواصل معنا</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>{propertyData.location.city}، المملكة العربية السعودية</p>
                <p>{propertyData.agent.phone}</p>
                <p>{propertyData.agent.email}</p>
              </div>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            © 2025 {propertyData.agent.name}. جميع الحقوق محفوظة
          </div>
        </div>
      </footer>
  );
}
