import { getTranslations, getLocale } from "next-intl/server";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Building, 
  Users, 
  Award, 
  Target, 
  Heart, 
  Shield,
  TrendingUp,
  MapPin,
  Mail,
  Phone,
  CheckCircle
} from "lucide-react";
import Link from "next/link";

// Icon mapping
const iconMap: Record<string, any> = {
  Shield,
  Heart,
  Target,
  TrendingUp,
  Building,
  Users,
  Award
};

// Helper function to get localized text
const getLocalizedText = (obj: any, locale: string, fallback: string = '') => {
  if (typeof obj === 'string') return obj;
  if (obj && typeof obj === 'object') {
    return obj[locale] || obj.en || fallback;
  }
  return fallback;
};

export const dynamic = "force-dynamic";

// Fetch about data from API
async function getAboutData() {
  try {
    const hdrs = headers();
    const host = hdrs.get('x-forwarded-host') || hdrs.get('host') || '';
    const proto = hdrs.get('x-forwarded-proto') || 'https';
    const envBase = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || '';
    const baseUrl = envBase || (host ? `${proto}://${host}` : '');
    const response = await fetch(`${baseUrl}/api/about`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error('Failed to fetch about data:', response.statusText);
      return null;
    }
    
    const result = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching about data:', error);
    return null;
  }
}

export default async function AboutPage() {
  const locale = await getLocale();
  const t = await getTranslations("about");
  const isRTL = locale === "ar";
  
  // Fetch about data from API
  const aboutData = await getAboutData();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-zinc-900 dark:bg-zinc-950">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950" />
        <div className="container relative mx-auto px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="text-center">
            <Badge className="mb-6 bg-zinc-800 text-zinc-300 dark:bg-zinc-900 dark:text-zinc-400">
              {getLocalizedText(aboutData?.hero?.badge, locale, t("badge"))}
            </Badge>
            <h1 className="mb-6 text-4xl font-bold text-zinc-100 sm:text-5xl lg:text-6xl">
              {getLocalizedText(aboutData?.hero?.title, locale, t("title"))}
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-zinc-300 lg:text-xl">
              {getLocalizedText(aboutData?.hero?.subtitle, locale, t("subtitle"))}
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className={isRTL ? "lg:order-2" : ""}>
              <div className="relative">
                <img
                  src={aboutData?.story?.image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"}
                  alt="Our Office"
                  className="rounded-2xl shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 rounded-2xl bg-zinc-900 p-6 text-zinc-100 shadow-xl dark:bg-zinc-800">
                  <div className="flex items-center gap-3">
                    <Building className="size-8 text-zinc-400" />
                    <div>
                      <div className="text-2xl font-bold">
                        {getLocalizedText(aboutData?.story?.yearsInBusiness, locale, "15+")}
                      </div>
                      <div className="text-sm text-zinc-400">{t("yearsInBusiness")}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={isRTL ? "lg:order-1" : ""}>
              <Badge className="mb-4 bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                {t("ourStory")}
              </Badge>
              <h2 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-zinc-100 lg:text-4xl">
                {getLocalizedText(aboutData?.story?.title, locale, t("storyTitle"))}
              </h2>
              <div className="space-y-4 text-zinc-600 dark:text-zinc-400">
                <p className="leading-relaxed">
                  {getLocalizedText(aboutData?.story?.paragraph1, locale, t("storyParagraph1"))}
                </p>
                <p className="leading-relaxed">
                  {getLocalizedText(aboutData?.story?.paragraph2, locale, t("storyParagraph2"))}
                </p>
                <p className="leading-relaxed">
                  {getLocalizedText(aboutData?.story?.paragraph3, locale, t("storyParagraph3"))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-zinc-100 py-16 dark:bg-zinc-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="mb-12 text-3xl font-bold text-zinc-900 dark:text-zinc-100 lg:text-4xl">
              {t("achievements")}
            </h2>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {(aboutData?.stats || [
                { value: { en: "500+", ar: "500+" }, label: { en: "Properties Sold", ar: "عقارات مبيعة" } },
                { value: { en: "10+", ar: "10+" }, label: { en: "Years Experience", ar: "سنوات خبرة" } },
                { value: { en: "98%", ar: "98%" }, label: { en: "Client Satisfaction", ar: "رضا العملاء" } },
                { value: { en: "50+", ar: "50+" }, label: { en: "Team Members", ar: "أعضاء الفريق" } }
              ]).map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 lg:text-5xl">
                    {getLocalizedText(stat.value, locale)}
                  </div>
                  <div className="mt-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    {getLocalizedText(stat.label, locale)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              {t("ourValues")}
            </Badge>
            <h2 className="mb-12 text-3xl font-bold text-zinc-900 dark:text-zinc-100 lg:text-4xl">
              {t("valuesTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {(aboutData?.values || [
              {
                id: 1,
                icon: "Shield",
                title: { en: "Trust", ar: "الثقة" },
                description: { 
                  en: "Building lasting relationships through transparency and integrity",
                  ar: "بناء علاقات دائمة من خلال الشفافية والنزاهة"
                }
              },
              {
                id: 2,
                icon: "Heart",
                title: { en: "Passion", ar: "الشغف" },
                description: { 
                  en: "Dedicated to helping clients find their perfect property",
                  ar: "مكرسون لمساعدة العملاء في العثور على عقارهم المثالي"
                }
              },
              {
                id: 3,
                icon: "Target",
                title: { en: "Excellence", ar: "التميز" },
                description: { 
                  en: "Setting the highest standards in real estate service",
                  ar: "وضع أعلى المعايير في خدمة العقارات"
                }
              },
              {
                id: 4,
                icon: "TrendingUp",
                title: { en: "Growth", ar: "النمو" },
                description: { 
                  en: "Continuously evolving to meet market demands",
                  ar: "التطور المستمر لتلبية متطلبات السوق"
                }
              }
            ]).map((value, index) => {
              const Icon = iconMap[value.icon] || Shield;
              return (
                <Card key={index} className="border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                      <Icon className="size-6 text-zinc-600 dark:text-zinc-400" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                      {getLocalizedText(value.title, locale)}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {getLocalizedText(value.description, locale)}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="bg-zinc-100 py-16 dark:bg-zinc-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">
              {t("ourTeam")}
            </Badge>
            <h2 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-zinc-100 lg:text-4xl">
              {t("teamTitle")}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
              {t("teamSubtitle")}
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {(aboutData?.team || [
              {
                id: 1,
                name: { en: "John Doe", ar: "جون دو" },
                role: { en: "CEO & Founder", ar: "الرئيس التنفيذي والمؤسس" },
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
                description: { 
                  en: "Leading the company with 15+ years of real estate expertise",
                  ar: "قيادة الشركة بخبرة تزيد عن 15 عاماً في العقارات"
                }
              },
              {
                id: 2,
                name: { en: "Jane Smith", ar: "جين سميث" },
                role: { en: "Head of Operations", ar: "رئيسة العمليات" },
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
                description: { 
                  en: "Ensuring smooth operations and exceptional client service",
                  ar: "ضمان سلاسة العمليات وخدمة العملاء الاستثنائية"
                }
              },
              {
                id: 3,
                name: { en: "Mike Johnson", ar: "مايك جونسون" },
                role: { en: "Senior Real Estate Advisor", ar: "مستشار عقاري أول" },
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
                description: { 
                  en: "Expert in property valuation and market analysis",
                  ar: "خبير في تقييم العقارات وتحليل السوق"
                }
              },
              {
                id: 4,
                name: { en: "Sarah Williams", ar: "سارة ويليامز" },
                role: { en: "Marketing Director", ar: "مديرة التسويق" },
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
                description: { 
                  en: "Creating innovative marketing strategies for our clients",
                  ar: "خلق استراتيجيات تسويق مبتكرة لعملائنا"
                }
              }
            ]).map((member) => (
              <Card key={member.id} className="border-zinc-200 bg-white text-center dark:border-zinc-700 dark:bg-zinc-900">
                <CardContent className="p-6">
                  <Avatar className="mx-auto mb-4 size-20">
                    <AvatarImage src={member.avatar} alt={getLocalizedText(member.name, locale)} />
                    <AvatarFallback className="bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400">
                      {getLocalizedText(member.name, locale).split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="mb-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {getLocalizedText(member.name, locale)}
                  </h3>
                  <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">
                    {getLocalizedText(member.role, locale)}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-500">
                    {getLocalizedText(member.description, locale)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-zinc-200 bg-zinc-900 dark:border-zinc-700 dark:bg-zinc-950">
            <CardContent className="p-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-zinc-100 lg:text-4xl">
                {getLocalizedText(aboutData?.cta?.title, locale, t("ctaTitle"))}
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-zinc-300">
                {getLocalizedText(aboutData?.cta?.subtitle, locale, t("ctaSubtitle"))}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700">
                  <Link href={`/${locale}/contact`}>
                    {t("contactUs")}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-zinc-600 text-zinc-100 hover:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800">
                  <Link href={`/${locale}/p`}>
                    {t("viewProperties")}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Info */}
      <section className="bg-zinc-50 py-16 dark:bg-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className={`text-center ${isRTL ? "md:text-right" : ""}`}>
              <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-lg bg-zinc-200 dark:bg-zinc-800">
                <MapPin className="size-6 text-zinc-600 dark:text-zinc-400" />
              </div>
              <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">
                {t("visitUs")}
              </h3>
              <p className="whitespace-pre-line text-zinc-600 dark:text-zinc-400">
                {getLocalizedText(aboutData?.contact?.address, locale, "123 Business Street\nCity, State 12345")}
              </p>
            </div>
            <div className={`text-center ${isRTL ? "md:text-right" : ""}`}>
              <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-lg bg-zinc-200 dark:bg-zinc-800">
                <Phone className="size-6 text-zinc-600 dark:text-zinc-400" />
              </div>
              <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">
                {t("callUs")}
              </h3>
              <p className="whitespace-pre-line text-zinc-600 dark:text-zinc-400">
                {getLocalizedText(aboutData?.contact?.phone, locale, "+1 (555) 123-4567\nMon-Fri 9AM-6PM")}
              </p>
            </div>
            <div className={`text-center ${isRTL ? "md:text-right" : ""}`}>
              <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-lg bg-zinc-200 dark:bg-zinc-800">
                <Mail className="size-6 text-zinc-600 dark:text-zinc-400" />
              </div>
              <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">
                {t("emailUs")}
              </h3>
              <p className="whitespace-pre-line text-zinc-600 dark:text-zinc-400">
                {getLocalizedText(aboutData?.contact?.email, locale, "info@realestate.com\n24/7 Support")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}