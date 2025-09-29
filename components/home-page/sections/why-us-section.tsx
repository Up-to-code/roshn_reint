"use client";

import React from "react";

export interface WhyUsSection {
  title: string;
  subtitle: string;
  features: Feature[];
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface WhyUsSectionProps {
  content: WhyUsSection;
}

export function WhyUsSection({ content }: WhyUsSectionProps) {
  if (!content.features || content.features.length === 0) return null;

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            {content.title}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column */}
          <div className="space-y-8">
            {content.features.slice(0, Math.ceil(content.features.length / 2)).map((feature) => (
              <div
                key={feature.id}
                className="group bg-gray-900 rounded-xl p-8 border border-gray-800 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-14 h-14 bg-orange-500 rounded-lg flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {content.features.slice(Math.ceil(content.features.length / 2)).map((feature) => (
              <div
                key={feature.id}
                className="group bg-gray-900 rounded-xl p-8 border border-gray-800 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-14 h-14 bg-orange-500 rounded-lg flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}