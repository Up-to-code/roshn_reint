"use client";

import { useState, useEffect } from "react";

interface PartnersBannerProps {
  logos: { src: string; alt: string }[];
  speed?: number;
}

export function PartnersBanner({ 
  logos, 
  speed = 30
}: PartnersBannerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't duplicate logos - use original array
  const logosToShow = logos;

  if (!mounted) {
    return <div className="h-48 bg-orange-500" />;
  }

  return (
    <section className="w-full py-8 px-4 bg-orange-500">
      {/* Logos container */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-orange-500 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-orange-500 to-transparent z-10" />
        
        {/* Scrolling logos */}
        <div
          className="flex items-center gap-20 md:gap-28 animate-scroll"
          style={{
            width: "max-content",
            animationDuration: `${speed}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite"
          }}
        >
          {logosToShow.map((logo, index) => (
            <div
              key={`${logo.alt}-${index}`}
              className="flex-shrink-0 px-4"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-16 md:h-24 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 mix-blend-multiply"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll linear infinite;
        }
      `}</style>
    </section>
  );
}