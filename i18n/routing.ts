import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ar", "en"],

  defaultLocale: "ar",

  pathnames: {
    "/": {
      en: "/",
      ar: "/",
    },
    "/admin": {
      en: "/admin",
      ar: "/admin",
    },
    "/dashboard": {
      en: "/dashboard",
      ar: "/dashboard",
    },
    "/login": {
      en: "/login",
      ar: "/login",
    },
    "/register": {
      en: "/register",
      ar: "/register",
    },
     "/projects": {
      en: "/projects",
      ar: "/projects",
    },
    "/about": {
      en: "/about",
      ar: "/about",
    },
    "/contact": {
      en: "/contact",
      ar: "/contact",
    },
    "/404": {
      en: "/404",
      ar: "/404",
    },
 
  },
});

// ✅ هتكون الأنواع (types) مضبوطة مع TypeScript
export type Locale = (typeof routing.locales)[number];
export type Pathnames = keyof typeof routing["pathnames"];

// ✅ wrappers بتاعت Next-intl Navigation
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
