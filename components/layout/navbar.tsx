"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";
import { Menu, X, Sparkles } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamically import LocaleSwitcher to avoid SSR issues
const LocaleSwitcher = dynamic(() => import("../LocaleSwitcher"), {
  ssr: false,
  loading: () => (
    <div className="size-8 animate-pulse rounded-full border border-white/30 bg-white/20"></div>
  )
});

export function NavBar() {
  const { data: session } = useSession();
  const t = useTranslations("nav");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLightBackground, setIsLightBackground] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    const checkBackground = () => {
      setIsLightBackground(true);
    };

    window.addEventListener("scroll", handleScroll);
    checkBackground();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { title: t("home"), href: "/" },
    { title: t("projects"), href: "/p" },
    // { title: t("blog"), href: "/blog" },
    { title: t("about"), href: "/about" },
    { title: t("contact"), href: "/contact" }
  ];

  const socialLinks = [
    { 
      icon: TiktokIcon, 
      href: "https://tiktok.com/@yourusername", 
      label: "TikTok" 
    },
    { 
      icon: InstagramIcon, 
      href: "https://instagram.com/yourusername", 
      label: "Instagram" 
    },
    { 
      icon: SnapchatIcon, 
      href: "https://snapchat.com/add/yourusername", 
      label: "Snapchat" 
    }
  ];

  const closeMobileMenu = () => setMobileOpen(false);

  // Conditional text colors
  const textColor = isLightBackground ? "text-gray-800" : "text-white";
  const hoverTextColor = isLightBackground ? "hover:text-gray-900" : "hover:text-white";
  const iconColor = isLightBackground ? "text-gray-700" : "text-white";
  const borderColor = isLightBackground ? "border-white/30" : "border-white/20";
  const separatorColor = isLightBackground ? "bg-white/40" : "bg-white/30";
  const hoverBg = isLightBackground ? "hover:bg-white/30" : "hover:bg-white/20";

  // Don't render until mounted to avoid hydration issues
  if (!isMounted) {
    return (
      <header className="fixed top-6 z-40 h-20 w-full px-4">
        <div className="mx-auto max-w-7xl">
          <div className="h-20 animate-pulse rounded-2xl border border-white/30 bg-white/20 shadow-2xl backdrop-blur-3xl"></div>
        </div>
      </header>
    );
  }

  return (
    <>
      {/* Dashboard Banner */}
      {session && (
        <div className="fixed top-0 z-50 w-full px-6 py-3">
          <div className="mx-auto max-w-7xl">
            <div className={cn(
              "rounded-2xl border border-white/30 bg-white/20 px-6 py-3 text-center shadow-2xl backdrop-blur-3xl",
              !isLightBackground && "border-white/20 bg-black/20"
            )}>
              <Link
                href={session.user.role === "ADMIN" ? "/admin" : "/dashboard"}
                className={cn(
                  "flex items-center justify-center gap-2 font-medium transition-colors",
                  textColor,
                  hoverTextColor
                )}
              >
                <Sparkles className={cn("size-4", iconColor)} />
                {t("goToDashboard")}
                <Sparkles className={cn("size-4", iconColor)} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <header
        className={cn(
          "fixed z-40 h-20 w-full px-4 transition-all duration-500",
          session ? "top-[72px]" : "top-6"
        )}
      >
        <div className="mx-auto max-w-7xl">
          <div className={cn(
            "h-20 rounded-2xl border border-white/30 bg-white/20 shadow-2xl backdrop-blur-3xl transition-all duration-500",
            !isLightBackground && "border-white/20 bg-black/20"
          )}>
            {/* 70px height container */}
            <div className="flex h-[70px] items-center justify-between px-6 lg:px-8">
              {/* Logo */}
              <Link 
                href="/" 
                className="flex shrink-0 items-center"
                onClick={closeMobileMenu}
              >
                <Image
                  src="https://17mm2glo1t.ufs.sh/f/rQix7xjgXapPnMkzCZsvM65OTuZmLfX0irPqwtUyhICdlcAW"
                  alt="Logo"
                  width={70}
                  height={50}
                  className="object-cover transition-all duration-300 hover:scale-105"
                  priority
                />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden items-center gap-8 lg:flex">
                {navLinks.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href as any}
                    className={cn(
                      "font-medium ",
                      textColor,
                      hoverTextColor
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>

              {/* Right Controls */}
              <div className="flex items-center gap-4">
                {/* Social Links - Desktop */}
                <div className="hidden items-center gap-4 lg:flex">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "rounded-2xl p-3 transition-all duration-300 hover:scale-110 hover:shadow-lg",
                          textColor,
                          hoverTextColor,
                          hoverBg
                        )}
                        aria-label={social.label}
                      >
                        <IconComponent className="size-6" />
                      </a>
                    );
                  })}
                </div>

                <div className="hidden items-center gap-4 lg:flex">
                  {/* Separator */}
                  <div className={cn("h-8 w-px", separatorColor)}></div>
                  
                  {/* Locale Switcher */}
                  <div className={cn(
                    "rounded-full border border-white/30 bg-white/20 p-1 backdrop-blur-xl",
                    !isLightBackground && "border-white/20 bg-black/20"
                  )}>
                    <LocaleSwitcher />
                  </div>
                  
                  <div className={cn("h-8 w-px", separatorColor)}></div>
                </div>

                {/* Mobile Menu Button */}
                <button
                  className={cn(
                    "rounded-2xl border border-white/30 bg-white/20 p-2 shadow-lg backdrop-blur-xl transition-all duration-300 hover:shadow-xl lg:hidden",
                    !isLightBackground && "border-white/20 bg-black/20",
                    textColor,
                    hoverTextColor,
                    hoverBg
                  )}
                  onClick={() => setMobileOpen(!mobileOpen)}
                  aria-label={mobileOpen ? "Close menu" : "Open menu"}
                >
                  {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <div
              className={cn(
                "overflow-hidden border-t transition-all duration-500 lg:hidden",
                borderColor,
                mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className={cn(
                "flex flex-col space-y-4 bg-white/10 p-6 backdrop-blur-2xl",
                !isLightBackground && "bg-black/20"
              )}>
                {navLinks.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href as any}
                    className={cn(
                      "rounded-xl p-4 text-center font-medium transition-all duration-300",
                      textColor,
                      hoverTextColor,
                      hoverBg
                    )}
                    onClick={closeMobileMenu}
                  >
                    {item.title}
                  </Link>
                ))}
                
                {/* Social Links - Mobile */}
                <div className="flex justify-center gap-6 pt-6">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "rounded-2xl p-4 transition-all duration-300 hover:scale-110 hover:shadow-lg",
                          textColor,
                          hoverTextColor,
                          hoverBg
                        )}
                        aria-label={social.label}
                      >
                        <IconComponent className="size-7" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

// Custom SVG Icons
const TiktokIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const SnapchatIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M5.829 17.843c.323 1.754 1.413 2.536 3.011 2.536h.262c.342 0 .74-.07 1.128-.207.397-.14.784-.347 1.144-.618.428-.327.956.147.742.644-.069.159-.136.321-.204.481l-.203.481c-.119.282-.237.564-.367.826-.099.205-.085.467.192.62.079.044.178.085.281.085.137 0 .298-.063.466-.19.342-.257.712-.621 1.071-.985.388-.392.823-.833 1.382-.833h.061c2.676 0 4.204-1.1 4.469-3.499.22-1.997-.434-3.037-1.354-3.674.296-.384.525-.818.614-1.375.18-1.137-.226-1.956-.665-2.397-.42-.422-.981-.648-1.616-.648-.632 0-1.146.195-1.659.586-.421.322-.764.768-1.079 1.232-.379.558-.386 1.298-.007 1.837.328.465.894.723 1.486.723.466 0 .933-.175 1.305-.496.17-.146.354-.312.526-.466.182-.164.406-.089.435.118l.015.099c.049.32.097.644.073.949-.037.474-.289.902-.692 1.175-.47.318-1.056.42-1.636.342-.327-.045-.65-.142-.964-.261-.538-.202-1.077-.405-1.738-.184-.489.163-.856.515-1.102.995-.24.467-.277 1.006-.132 1.518.096.342.274.637.518.869.354.341.824.526 1.316.526.632 0 1.227-.269 1.713-.765.255-.259.591-.207.719.104.069.166.138.332.197.497.096.267.032.57-.172.762-.204.192-.479.267-.745.222-.455-.077-.925-.125-1.406-.125h-.061c-.623 0-1.235.095-1.822.28-1.328.411-2.293 1.287-2.598 2.563zM12.015.002C5.953.002 1.055 4.9 1.055 10.962c0 6.063 4.898 10.961 10.96 10.961 6.063 0 10.961-4.898 10.961-10.961C22.976 4.9 18.078.002 12.015.002z"/>
  </svg>
);