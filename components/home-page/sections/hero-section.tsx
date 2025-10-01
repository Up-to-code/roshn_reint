// components/home-page/sections/hero-section.tsx
"use client";

import { HeroSection as HeroSectionType } from "@/types/home-page";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import Link from "next/link";

interface HeroSectionProps {
  content: HeroSectionType;
}

export function HeroSection({ content }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  const Overlay = () => (
    <div
      className="absolute inset-0 bg-black/60"
      aria-hidden="true"
    />
  );

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black"
      aria-label={content.title || "Hero section"}
    >
      {/* Background (Video or Image) */}
      <div className="absolute inset-0 z-0">
        {content.backgroundVideo ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="size-full object-cover"
          >
            <source src={content.backgroundVideo} type="video/mp4" />
            <source src={content.backgroundVideo} type="video/webm" />
          </video>
        ) : content.backgroundImage ? (
          <img
            src={content.backgroundImage}
            alt={content.title || "Hero Background"}
            className="size-full object-cover"
          />
        ) : null}
        <Overlay />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white">
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          {content.accentText && (
            <span className="block text-[#FF8C42]">{content.accentText}</span>
          )}
          <span className="leading-snug">{content.title}</span>
        </h1>

        {content.subtitle && (
          <p className="mb-10 text-lg leading-relaxed text-gray-200 sm:text-xl lg:text-2xl">
            {content.subtitle}
          </p>
        )}

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          {content.primaryButton?.text && (
            <Button
              asChild
              size="lg"
              className="rounded-xl bg-[#FF8C42] px-8 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-[#FF8C42]/90 focus:outline-none focus:ring-2 focus:ring-[#FF8C42]/70 focus:ring-offset-2 focus:ring-offset-black"
            >
              {content.primaryButton.link ? (
                <Link href={content.primaryButton.link}>
                  {content.primaryButton.text}
                </Link>
              ) : (
                <span>{content.primaryButton.text}</span>
              )}
            </Button>
          )}

          {content.secondaryButton?.text && (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-xl border border-white/80 bg-white/10 px-8 py-3 text-base font-medium text-white backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
            >
              {content.secondaryButton.link ? (
                <Link href={content.secondaryButton.link}>
                  {content.secondaryButton.text}
                </Link>
              ) : (
                <span>{content.secondaryButton.text}</span>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2">
        <div className="animate-bounce">
          <div className="flex h-12 w-6 justify-center rounded-full border-2 border-[#FF8C42]">
            <div className="mt-2 h-3 w-1 rounded-full bg-[#FF8C42]" />
          </div>
        </div>
      </div>
    </section>
  );
}
