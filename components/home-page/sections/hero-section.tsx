"use client";

import { HeroSection as HeroSectionType } from "@/types/home-page";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, PlayCircle, Search } from "lucide-react";

interface HeroSectionProps {
  content: HeroSectionType;
}

export function HeroSection({ content }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsClient(true);
    
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const Overlay = () => (
    <div
      className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"
      aria-hidden="true"
    />
  );

  // Don't render video on server to prevent hydration mismatch
  const renderBackground = () => {
    if (!isClient) {
      // Server-side render fallback with gradient overlay
      return content.backgroundImage ? (
        <>
          <img
            src={content.backgroundImage}
            alt={content.title || "Hero Background"}
            className="animate-slow-zoom size-full scale-105 object-cover"
          />
        </>
      ) : (
        <div className="size-full bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900" />
      );
    }

    return content.backgroundVideo ? (
      <>
        {!isVideoLoaded && content.backgroundImage && (
          <img
            src={content.backgroundImage}
            alt={content.title || "Hero Background"}
            className="absolute inset-0 size-full object-cover"
          />
        )}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={handleVideoLoad}
          className={`size-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src={content.backgroundVideo} type="video/mp4" />
          <source src={content.backgroundVideo} type="video/webm" />
        </video>
      </>
    ) : content.backgroundImage ? (
      <img
        src={content.backgroundImage}
        alt={content.title || "Hero Background"}
        className="animate-slow-zoom size-full scale-105 object-cover"
      />
    ) : (
      <div className="size-full bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900" />
    );
  };

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black"
      aria-label={content.title || "Hero section"}
    >
      {/* Background (Video or Image) */}
      <div className="absolute inset-0 z-0">
        {renderBackground()}
        <Overlay />
      </div>

      {/* Animated particles/dots in background */}
      <div className="absolute inset-0 z-[1] overflow-hidden">
        <div className="absolute -left-1/4 top-1/4 size-96 animate-pulse rounded-full bg-[#FF8C42]/10 blur-3xl" />
        <div className="absolute -right-1/4 bottom-1/4 size-96 animate-pulse rounded-full bg-blue-500/10 blur-3xl" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Accent badge/tag */}
        {content.accentText && (
          <div className="animate-fade-in-down mb-6">
            <span className="inline-block rounded-full border border-[#FF8C42]/30 bg-[#FF8C42]/20 px-6 py-2 text-sm font-semibold text-[#FF8C42] backdrop-blur-sm">
              {content.accentText}
            </span>
          </div>
        )}

        {/* Main Title */}
        <h1 className="animate-fade-in-up mb-6 text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
          <span className="block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text leading-tight text-transparent drop-shadow-2xl">
            {content.title}
          </span>
        </h1>

        {/* Subtitle */}
        {content.subtitle && (
          <p className="mx-auto mb-10 max-w-3xl animate-fade-in text-lg font-light leading-relaxed text-gray-200 sm:text-xl lg:text-2xl" style={{ animationDelay: '0.2s' }}>
            {content.subtitle}
          </p>
        )}

        {/* Search Bar (Optional - uncomment if needed) */}
        {/* <div className="mb-10 animate-fade-in-up mx-auto max-w-2xl" style={{ animationDelay: '0.3s' }}>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search properties, locations, or neighborhoods..."
              className="w-full rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 pl-14 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF8C42] transition-all"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
            <Button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-[#FF8C42] hover:bg-[#FF8C42]/90 text-white px-8">
              Search
            </Button>
          </div>
        </div> */}

        {/* CTA Buttons */}
        {/* <div className="animate-fade-in-up flex flex-col items-center justify-center gap-4 sm:flex-row" style={{ animationDelay: '0.4s' }}>
          <Button
            size="lg"
            onClick={() => window.location.href = '/properties'}
            className="group relative overflow-hidden rounded-full bg-[#FF8C42] px-8 py-6 text-lg font-semibold text-white shadow-2xl transition-all hover:scale-105 hover:bg-[#FF8C42]/90 hover:shadow-[#FF8C42]/50"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Properties
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 -z-0 bg-gradient-to-r from-[#FF8C42] to-orange-600 opacity-0 transition-opacity group-hover:opacity-100" />
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            onClick={() => window.location.href = '/about'}
            className="rounded-full border-2 border-white/30 bg-white/10 px-8 py-6 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/20"
          >
            <span className="flex items-center gap-2">
              <PlayCircle className="size-5" />
              Watch Video
            </span>
          </Button>
        </div> */}

        {/* Stats or Key Points */}
        {/* <div className="mt-16 grid animate-fade-in grid-cols-2 gap-8 md:grid-cols-4" style={{ animationDelay: '0.6s' }}>
          {[
            { label: "Properties", value: "500+" },
            { label: "Happy Clients", value: "1000+" },
            { label: "Years Experience", value: "15+" },
            { label: "Cities", value: "20+" }
          ].map((stat, index) => (
            <div key={index} className="group">
              <div className="mb-1 text-3xl font-bold text-[#FF8C42] transition-transform group-hover:scale-110 md:text-4xl">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-gray-300 md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div> */}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-fade-in" style={{ animationDelay: '0.8s' }}>
        <div className="animate-bounce">
          <div className="flex h-14 w-7 justify-center rounded-full border-2 border-[#FF8C42] bg-[#FF8C42]/10 backdrop-blur-sm">
            <div className="animate-scroll mt-3 h-3 w-1 rounded-full bg-[#FF8C42]" />
          </div>
        </div>
      </div>

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slow-zoom {
          0%, 100% {
            transform: scale(1.05);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @keyframes scroll {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
          100% {
            transform: translateY(0);
          }
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-slow-zoom {
          animation: slow-zoom 20s ease-in-out infinite;
        }

        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}