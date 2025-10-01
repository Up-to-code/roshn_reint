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

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
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
      {/* Dashboard bar */}
      {session && (
        <div className="fixed top-0 z-50 w-full border-b bg-blue-600 py-2 text-center">
          <MaxWidthWrapper>
            <Link
              href={session.user.role === "ADMIN" ? "/admin" : "/dashboard"}
              className="font-semibold text-white hover:underline"
            >
              → {t("goToDashboard")}
            </Link>
          </MaxWidthWrapper>
        </div>
      )}

      {/* Main Nav */}
      <header
        className={cn(
          "sticky z-40 w-full border-b backdrop-blur-md transition-all duration-300",
          session ? "top-[40px]" : "top-0",
          isScrolled 
            ? "border-border bg-background/95" 
            : "border-transparent bg-transparent"
        )}
      >
        <MaxWidthWrapper className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 text-xl font-bold">
            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-600 text-white">
              VG
            </div>
            <span className={cn(
              "transition-colors duration-300",
              isScrolled ? "text-foreground" : "text-white"
            )}>
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden items-center gap-6 md:flex">
            {allLinks.map((item, index) => (
              <Link
                key={index}
                href={item.href as any}
                className={cn(
                  "font-medium transition-colors duration-300",
                  isScrolled 
                    ? "text-foreground hover:text-blue-600" 
                    : "text-white hover:text-blue-300"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-4">
            <ModeToggle />
            <LocaleSwitcher />
            <button
              className={cn(
                "rounded-lg p-2 transition-colors duration-300",
                isScrolled 
                  ? "text-foreground hover:bg-accent" 
                  : "text-white hover:bg-white/10"
              )}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </MaxWidthWrapper>

        {/* Mobile menu */}
        <div
          className={cn(
            "absolute left-0 w-full overflow-hidden border-t backdrop-blur-lg transition-all duration-300 md:hidden",
            mobileOpen ? "top-16 opacity-100" : "pointer-events-none top-0 opacity-0",
            isScrolled 
              ? "border-border bg-background/95" 
              : "border-transparent bg-black/95"
          )}
        >
          <div className="flex flex-col items-center gap-2 py-4">
            {allLinks.map((item, index) => (
              <Link
                key={index}
                href={item.href as any}
                className={cn(
                  "w-full px-4 py-3 text-center font-medium transition-colors duration-300",
                  isScrolled 
                    ? "text-foreground hover:bg-accent" 
                    : "text-white hover:bg-white/10"
                )}
                onClick={() => setMobileOpen(false)}
              >
                {item.title}
              </Link>
            ))}

            {session && (
              <Link
                href={session.user.role === "ADMIN" ? "/admin" : "/dashboard"}
                onClick={() => setMobileOpen(false)}
                className="w-full px-4 py-3"
              >
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                  {t("dashboard")}
                </Button>
              </Link>
            )}
            
            <div className="flex items-center gap-4 pt-4">
              <ModeToggle />
              <LocaleSwitcher />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}