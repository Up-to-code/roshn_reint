"use client";

import { FeaturesSection as FeaturesSectionType } from "@/types/home-page";

interface FeaturesSectionProps {
  content: FeaturesSectionType;
}

export function FeaturesSection({ content }: FeaturesSectionType) {
  if (!content.features || content.features.length === 0) return null;

  return (
    <section className="py-20 bg-[#2C2C2C]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {content.title}
          </h2>
          <p className="text-xl text-gray-300">
            {content.subtitle}
          </p>
        </div>

        {/* Features Grid - 2 rows of 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.features.map((feature, index) => (
            <div
              key={feature.id}
              className="group p-6 rounded-lg bg-gray-800/50 border border-gray-700 transition-all duration-300 hover:border-[#FF8C42]"
            >
              <div className="mb-4 flex items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF8C42]/20 text-[#FF8C42]">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
              </div>
              
              <h3 className="mb-3 text-xl font-bold text-white">
                {feature.title}
              </h3>
              
              <p className="leading-relaxed text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}