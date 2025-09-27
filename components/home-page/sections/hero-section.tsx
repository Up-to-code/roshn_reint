// components/home-page/sections/hero-section.tsx
"use client";

import { HeroSection as HeroSectionType } from "@/types/home-page";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useEffect, useRef } from "react";

interface HeroSectionProps {
  content: HeroSectionType;
}

export function HeroSection({ content }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays correctly
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Video autoplay failed:', error);
      });
    }
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#2C2C2C]">
      {/* Background Video */}
      {content.backgroundVideo && (
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
            style={{ 
              opacity: content.backgroundImage ? 0 : 1 // Show video only if no image
            }}
          >
            <source src={content.backgroundVideo} type="video/mp4" />
            <source src={content.backgroundVideo} type="video/webm" />
            Your browser does not support the video tag.
          </video>
          {/* Overlay with dynamic color */}
          <div 
            className="absolute inset-0"
            style={{ 
              backgroundColor: content.overlayColor || 'rgba(0,0,0,0.4)',
              mixBlendMode: 'multiply' // This helps the overlay blend better with the video
            }} 
          />
        </div>
      )}
      
      {/* Background Image Fallback */}
      {content.backgroundImage && !content.backgroundVideo && (
        <div className="absolute inset-0 z-0">
          <img
            src={content.backgroundImage}
            alt="Modern Architecture"
            className="h-full w-full object-cover"
            style={{ opacity: 0.8 }}
          />
          {/* Overlay with dynamic color */}
          <div 
            className="absolute inset-0"
            style={{ 
              backgroundColor: content.overlayColor || 'rgba(0,0,0,0.4)',
              mixBlendMode: 'multiply'
            }} 
          />
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center text-white">
        <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
          {content.accentText && (
            <span className="text-[#FF8C42]">{content.accentText}</span>
          )}
          {content.title}
        </h1>
        
        {content.subtitle && (
          <p className="mb-8 text-xl leading-relaxed text-gray-200 md:text-2xl">
            {content.subtitle}
          </p>
        )}
        
        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
          {content.primaryButton && content.primaryButton.text && (
            <Button 
              size="lg" 
              className="bg-[#FF8C42] px-8 py-3 text-lg font-semibold text-white hover:bg-[#FF8C42]/90"
            >
              {content.primaryButton.link ? (
                <a href={content.primaryButton.link}>
                  {content.primaryButton.text}
                </a>
              ) : (
                content.primaryButton.text
              )}
            </Button>
          )}
          
          {content.secondaryButton && content.secondaryButton.text && (
            <Button 
              size="lg" 
              variant="outline"
              className="px-8 py-3 text-lg border-white text-white hover:bg-white/10"
            >
              {content.secondaryButton.link ? (
                <a href={content.secondaryButton.link} className="flex items-center">
                  <Play className="mr-2 h-4 w-4" />
                  {content.secondaryButton.text}
                </a>
              ) : (
                <span className="flex items-center">
                  <Play className="mr-2 h-4 w-4" />
                  {content.secondaryButton.text}
                </span>
              )}
            </Button>
          )}
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 transform">
        <div className="animate-bounce">
          <div className="flex h-10 w-6 justify-center rounded-full border-2 border-[#FF8C42]">
            <div className="mt-2 h-3 w-1 rounded-full bg-[#FF8C42]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}