import { Metadata } from "next";
import BlogList from "@/components/blog/BlogList";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const isAr = params.locale === "ar";
  
  return {
    title: isAr ? "المدونة - عقارات" : "Blog - Real Estate",
    description: isAr
      ? "اقرأ أحدث المقالات حول العقارات والاستثمار وأسواق الممتلكات"
      : "Read the latest articles about real estate, investment, and property markets",
    keywords: isAr 
      ? ["عقارات", "استثمار", "مدونة عقارية", "أسواق الممتلكات"]
      : ["real estate", "investment", "property blog", "market trends"],
    openGraph: {
      title: isAr ? "المدونة - عقارات" : "Blog - Real Estate",
      description: isAr
        ? "اقرأ أحدث المقالات حول العقارات والاستثمار"
        : "Read the latest articles about real estate and investment",
      type: "website",
      locale: isAr ? "ar_SA" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: isAr ? "المدونة - عقارات" : "Blog - Real Estate",
      description: isAr
        ? "اقرأ أحدث المقالات حول العقارات والاستثمار"
        : "Read the latest articles about real estate and investment",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function BlogPage({ params }: { params: { locale: string } }) {
  return (
    <main 
      className="min-h-screen bg-background" 
      dir={params.locale === "ar" ? "rtl" : "ltr"}
    >
      <BlogList locale={params.locale} />
    </main>
  );
}