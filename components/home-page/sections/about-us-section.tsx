"use client";

import { AboutUsSection as AboutUsSectionType } from "@/types/home-page";

interface AboutUsSectionProps {
  content: AboutUsSectionType;
}

export function AboutUsSection({ content }: AboutUsSectionProps) {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Section */}
          <div className="order-2 lg:order-1">
            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 lg:mb-8 leading-tight">
              {content.title}
            </h2>
            
            {/* Content Paragraphs */}
            <div className="space-y-4 lg:space-y-6 mb-8 lg:mb-12">
              {content.content.split('\n').map((paragraph, index) => (
                <p 
                  key={index} 
                  className="text-gray-600 leading-relaxed text-base lg:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Stats Grid */}
            {content.stats && content.stats.length > 0 && (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {content.stats.map((stat) => (
                  <div 
                    key={stat.id} 
                    className="text-center p-4 rounded-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-sm"
                  >
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-500 mb-2 transition-colors duration-300">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Image Section */}
          <div className="order-1 lg:order-2 relative">
            {content.image && (
              <div className="relative group">
                <img
                  src={content.image}
                  alt={content.title}
                  className="w-full h-64 sm:h-80 lg:h-96 xl:h-[500px] object-cover rounded-xl shadow-lg transition-all duration-500 group-hover:shadow-xl group-hover:scale-[1.02]"
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}