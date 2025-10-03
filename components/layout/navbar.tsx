"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import LocaleSwitcher from "../LocaleSwitcher";
import { ModeToggle } from "./mode-toggle";
import { Link } from "@/i18n/routing";
import { Menu, X } from "lucide-react";
import Image from "next/image";

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

  const navLinks = [
    { title: t("projects"), href: "/p" },
    { title: t("blog"), href: "/blog" },
    { title: t("about"), href: "/about" },
    { title: t("contact"), href: "/contact" }
  ];

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <>
      {/* Dashboard Banner */}
      {session && (
        <div className="fixed top-0 z-50 w-full border-b border-zinc-800 bg-zinc-900 py-2 text-center shadow-lg">
          <MaxWidthWrapper>
            <Link
              href={session.user.role === "ADMIN" ? "/admin" : "/dashboard"}
              className="font-semibold text-zinc-100 transition-colors hover:text-zinc-300"
            >
              → {t("goToDashboard")}
            </Link>
          </MaxWidthWrapper>
        </div>
      )}

      {/* Main Navigation */}
      <header
        className={cn(
          "sticky z-40 w-full border-b backdrop-blur transition-all duration-300",
          session ? "top-[40px]" : "top-0",
          isScrolled 
            ? "border-zinc-800 bg-zinc-950/95 shadow-md" 
            : "border-transparent bg-zinc-950/90"
        )}
      >
        <MaxWidthWrapper className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="r">
              <Image
                src="https://fhupmhxzhukzzqunrtur.supabase.co/storage/v1/object/public/images/New%20Project%203%20(1).png"
                alt="Logo"
              
                loading="eager"
             width={100}
             height={100}
                className="object-cover"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((item, index) => (
              <Link
                key={index}
                href={item.href as any}
                className="relative font-medium text-zinc-300 transition-colors hover:text-zinc-100"
              >
                {item.title}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-zinc-500 transition-all hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center gap-3">
            <ModeToggle />
            <LocaleSwitcher />
            <button
              className="rounded-lg border border-zinc-700 p-2.5 text-zinc-300 transition-colors hover:bg-zinc-800 md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </MaxWidthWrapper>

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed left-0 z-40 w-full border-t border-zinc-800 bg-zinc-950/95 backdrop-blur transition-all md:hidden",
            mobileOpen ? "top-16 opacity-100" : "pointer-events-none -top-full opacity-0"
          )}
        >
          <div className="flex flex-col gap-1 px-4 py-6">
            {navLinks.map((item, index) => (
              <Link
                key={index}
                href={item.href as any}
                className="w-full rounded-lg px-6 py-4 text-center font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
                onClick={closeMobileMenu}
              >
                {item.title}
              </Link>
            ))}

            {session && (
              <div className="w-full px-6 py-4">
                <Link
                  href={session.user.role === "ADMIN" ? "/admin" : "/dashboard"}
                  onClick={closeMobileMenu}
                  className="block w-full"
                >
                  <Button className="w-full bg-zinc-800 text-zinc-100 hover:bg-zinc-700">
                    {t("dashboard")}
                  </Button>
                </Link>
              </div>
            )}
            
            {/* Mobile Controls */}
            <div className="flex items-center justify-center gap-4 pt-4">
              <div className="rounded-lg border border-zinc-700 bg-zinc-800 p-2">
                <ModeToggle />
              </div>
              <div className="rounded-lg border border-zinc-700 bg-zinc-800 p-2">
                <LocaleSwitcher />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}