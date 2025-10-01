"use client";

import { AboutUsSection as AboutUsSectionType } from "@/types/home-page";

interface AboutUsSectionProps {
  content: AboutUsSectionType;
}

export function AboutUsSection({ content }: AboutUsSectionProps) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content Section */}
          <div className="order-2 lg:order-1">
            {/* Title */}
            <h2 className="mb-6 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:mb-8 lg:text-5xl">
              {content.title}
            </h2>
            
            {/* Content Paragraphs */}
            <div className="mb-8 space-y-4 lg:mb-12 lg:space-y-6">
              {content.content.split('\n').map((paragraph, index) => (
                <p 
                  key={index} 
                  className="text-base leading-relaxed text-gray-600 lg:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Stats Grid */}
            {content.stats && content.stats.length > 0 && (
              <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-8">
                {content.stats.map((stat) => (
                  <div 
                    key={stat.id} 
                    className="rounded-lg p-4 text-center transition-all duration-300 hover:bg-gray-50 hover:shadow-sm"
                  >
                    <div className="mb-2 text-2xl font-bold text-orange-500 transition-colors duration-300 sm:text-3xl lg:text-4xl">
                      {stat.value}
                    </div>
                    <div className="text-xs font-medium uppercase tracking-wider text-gray-500 sm:text-sm">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Image Section */}
          <div className="relative order-1 lg:order-2">
            {content.image && (
              <div className="group relative">
                <img
                  src={content.image}
                  alt={content.title}
                  className="h-64 w-full rounded-xl object-cover shadow-lg transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-xl sm:h-80 lg:h-96 xl:h-[500px]"
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 rounded-xl bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-5" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}