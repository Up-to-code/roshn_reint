"use client";

import React from "react";
import { useLocale } from "next-intl";

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
  const locale = useLocale();
  const isRTL = locale === "ar";
  
  if (!content.features || content.features.length === 0) return null;

  return (
    <section className="bg-zinc-950 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold text-zinc-100 md:text-5xl">
            {content.title}
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-zinc-400 md:text-xl">
            {content.subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {content.features.map((feature) => (
            <div
              key={feature.id}
              className="group rounded-lg border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-800 md:p-8"
            >
              <div className={`flex items-start gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                {/* Icon */}
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-xl text-zinc-100 transition-transform group-hover:scale-110 md:size-14">
                  {feature.icon}
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-semibold text-zinc-100 md:text-2xl">
                    {feature.title}
                  </h3>
                  <p className="text-base leading-relaxed text-zinc-400 md:text-lg">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}