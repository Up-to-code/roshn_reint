"use client";

import { useContext, useState } from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ModalContext } from "@/components/modals/providers";
import { Icons } from "@/components/shared/icons";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import LocaleSwitcher from "../LocaleSwitcher";
import { Link } from "@/i18n/routing";
import { Menu, X } from "lucide-react";

interface NavBarProps {
  scroll?: boolean;
  large?: boolean;
}

export function NavBar({ scroll = false }: NavBarProps) {
  const scrolled = useScroll(50);
  const { data: session, status } = useSession();
  const { setShowSignInModal } = useContext(ModalContext);
  const t = useTranslations("nav");

  const allLinks = [
    { title: t("projects"), href: "/projects" },
    { title: t("about"), href: "/about" },
    { title: t("contact"), href: "/contact" }
  ] as const;

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* 🔹 Top bar (like WordPress) */}
      {session && (
        <div className="w-full border-b bg-muted py-1 text-center text-sm">
          <Link
            href={session.user.role === "ADMIN" ? "/admin" : "/dashboard"}
            className="font-medium text-primary hover:underline"
          >
            Go to Dashboard
          </Link>
        </div>
      )}

      {/* 🔹 Main Nav */}
      <header
        className={cn(
          "sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all",
          scroll ? (scrolled ? "border-b" : "bg-transparent") : "border-b"
        )}
      >
        <MaxWidthWrapper
          className="flex h-14 items-center justify-between py-4"
          large={false}
        >
          {/* logo */}
          <Link href="/" className="flex items-center space-x-1.5">
            {/* your logo here */}
            {/* <Image src={siteConfig.logo} alt="logo" width={40} height={40} /> */}
          </Link>

          {/* desktop links */}
          <nav className="hidden flex-1 justify-center gap-6 md:flex">
            {allLinks.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                prefetch={true}
                className="flex items-center text-lg font-medium text-foreground/60 transition-colors hover:text-foreground/80 sm:text-sm"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* right section */}
          <div className="flex items-center gap-4">
            {status === "unauthenticated" ? (
              <Button
                className="hidden gap-2 px-4 md:flex"
                size="sm"
                onClick={() => setShowSignInModal(true)}
              >
                <span>{t("signin")}</span>
                <Icons.arrowRight className="size-4" />
              </Button>
            ) : status === "loading" ? (
              <Skeleton className="hidden h-9 w-24 rounded-xl lg:flex" />
            ) : null}

            <LocaleSwitcher />

            {/* mobile menu toggle */}
            <button
              className="p-2 md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </MaxWidthWrapper>

        {/* mobile menu */}
        {mobileOpen && (
          <div className="absolute left-0 top-14 flex w-full flex-col items-center gap-4 border-t bg-background py-6 md:hidden">
            {allLinks.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-lg font-medium text-foreground/80 hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {item.title}
              </Link>
            ))}

            {session ? (
              <Link
                href={session.user.role === "ADMIN" ? "/admin" : "/dashboard"}
                onClick={() => setMobileOpen(false)}
              >
                <Button size="sm">Dashboard</Button>
              </Link>
            ) : status === "unauthenticated" ? (
              <Button size="sm" onClick={() => setShowSignInModal(true)}>
                {t("signin")}
              </Button>
            ) : null}
          </div>
        )}
      </header>
    </>
  );
}
