"use client";

import { WhyUsSection as WhyUsSectionType } from "@/types/home-page";

interface WhyUsSectionProps {
  content: WhyUsSectionType;
}

export function WhyUsSection({ content }: WhyUsSectionProps) {
  return (
    <section className="py-20 bg-[#1a1a1a]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            {content.title || "ليش أحنا"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {content.features?.map((feature, index) => (
            <div
              key={feature.id}
              className="p-8 rounded-xl bg-[#2a2a2a] border border-gray-700 hover:border-[#FF8C42] transition-all duration-300 text-center"
            >
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FF8C42]/10 text-[#FF8C42] border-2 border-[#FF8C42]/20">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
              </div>
              
              <h3 className="mb-4 text-xl font-bold text-white">
                {feature.title}
              </h3>
              
              <p className="text-gray-300 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}