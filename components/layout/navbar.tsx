"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import LocaleSwitcher from "../LocaleSwitcher";
import { ModeToggle } from "./mode-toggle";
import { Link } from "@/i18n/routing";
import { Menu, X } from "lucide-react";

export function NavBar() {
  const { data: session } = useSession();
  const t = useTranslations("nav");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const allLinks = [
    { title: t("projects"), href: "/projects" },
    { title: t("about"), href: "/about" },
    { title: t("contact"), href: "/contact" }
  ];

  return (
    <>
      {/* Dashboard Banner */}
      {session && (
        <div className="fixed top-0 z-50 w-full border-b bg-gradient-to-r from-blue-600 to-blue-700 py-2 text-center shadow-lg">
          <MaxWidthWrapper>
            <Link
              href={session.user.role === "ADMIN" ? "/admin" : "/dashboard"}
              className="font-semibold text-white transition-all duration-200 hover:scale-105 hover:underline"
            >
              → {t("goToDashboard")}
            </Link>
          </MaxWidthWrapper>
        </div>
      )}

      {/* Main Navigation */}
      <header
        className={cn(
          "sticky z-40 w-full border-b backdrop-blur-xl transition-all duration-500 ease-out",
          session ? "top-[40px]" : "top-0",
          isScrolled 
            ? "border-gray-800 bg-black/95 shadow-2xl" 
            : "border-transparent bg-black/90"
        )}
      >
        <MaxWidthWrapper className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="group flex items-center space-x-3"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-blue-500/25">
              VG
            </div>
            <span className="text-xl font-bold text-white transition-all duration-300 group-hover:text-blue-300">
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {allLinks.map((item, index) => (
              <Link
                key={index}
                href={item.href as any}
                className="group relative font-medium text-white/90 transition-all duration-300 hover:scale-105 hover:text-blue-300"
              >
                {item.title}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center gap-3">
            <ModeToggle className={cn(
              "transition-all duration-500",
              isScrolled ? "opacity-100" : "opacity-90"
            )} />
            <LocaleSwitcher />
            <button
              className="rounded-xl border border-white/20 p-2.5 text-white transition-all duration-300 hover:scale-105 hover:bg-white/10 active:scale-95 md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </MaxWidthWrapper>

        {/* Mobile Menu Overlay */}
        {mobileOpen && (
          <div 
            className="fixed inset-0 z-30 bg-black/90 backdrop-blur-3xl transition-all duration-500 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed left-0 z-40 w-full border-t border-gray-800 backdrop-blur-3xl transition-all duration-500 md:hidden",
            mobileOpen ? "top-16 opacity-100" : "pointer-events-none -top-full opacity-0",
            "bg-black/95"
          )}
        >
          <div className="flex flex-col items-center gap-1 px-4 py-6">
            {allLinks.map((item, index) => (
              <Link
                key={index}
                href={item.href as any}
                className="w-full rounded-xl border border-transparent px-6 py-4 text-center font-medium text-white/90 transition-all duration-300 hover:border-white/10 hover:bg-white/10 hover:text-white active:scale-95"
                onClick={() => setMobileOpen(false)}
              >
                {item.title}
              </Link>
            ))}

            {session && (
              <div className="w-full px-6 py-4">
                <Link
                  href={session.user.role === "ADMIN" ? "/admin" : "/dashboard"}
                  onClick={() => setMobileOpen(false)}
                  className="block w-full"
                >
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-purple-700 active:scale-95">
                    {t("dashboard")}
                  </Button>
                </Link>
              </div>
            )}
            
            {/* Mobile Controls */}
            <div className="flex items-center gap-4 pb-2 pt-6">
              <div className="rounded-xl border border-white/10 bg-white/5 p-2">
                <ModeToggle />
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-2">
                <LocaleSwitcher />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}