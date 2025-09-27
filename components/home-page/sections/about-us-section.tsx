"use client";

import { AboutUsSection as AboutUsSectionType } from "@/types/home-page";

interface AboutUsSectionProps {
  content: AboutUsSectionType;
}

export function AboutUsSection({ content }: AboutUsSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#2C2C2C] mb-6">
              {content.title}
            </h2>
            
            <div className="prose prose-lg text-gray-600 mb-8">
              {content.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Stats */}
            {content.stats && content.stats.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {content.stats.map((stat) => (
                  <div key={stat.id} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-[#FF8C42] mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Image */}
          <div className="relative">
            {content.image && (
              <img
                src={content.image}
                alt={content.title}
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}