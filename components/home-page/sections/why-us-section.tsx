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
    <section className="bg-black py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-5xl font-bold text-white">
            {content.title}
          </h2>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-300">
            {content.subtitle}
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column */}
          <div className="space-y-8">
            {content.features.slice(0, Math.ceil(content.features.length / 2)).map((feature) => (
              <div
                key={feature.id}
                className="group rounded-xl border border-gray-800 bg-gray-900 p-8 transition-all duration-300 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/10"
              >
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-orange-500 text-2xl text-white transition-transform group-hover:scale-110">
                    {feature.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="mb-3 text-2xl font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-lg leading-relaxed text-gray-300">
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
                className="group rounded-xl border border-gray-800 bg-gray-900 p-8 transition-all duration-300 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/10"
              >
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-orange-500 text-2xl text-white transition-transform group-hover:scale-110">
                    {feature.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="mb-3 text-2xl font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-lg leading-relaxed text-gray-300">
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