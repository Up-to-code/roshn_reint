"use client";

import { PortfolioSection as PortfolioSectionType } from "@/types/home-page";
import { Button } from "@/components/ui/button";

interface PortfolioSectionProps {
  content: PortfolioSectionType;
}

export function PortfolioSection({ content }: PortfolioSectionType) {
  if (!content.projects || content.projects.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C2C2C] mb-4">
            {content.title}
          </h2>
          <p className="text-xl text-gray-600">
            {content.subtitle}
          </p>
        </div>

        {/* Portfolio Grid - 2 rows of 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.projects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-lg bg-white border border-gray-200 shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/10" />
              </div>
              
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-[#2C2C2C]">
                  {project.title}
                </h3>
                <p className="mb-4 text-gray-600 line-clamp-2">
                  {project.description}
                </p>
                
                <Button className="bg-[#FF8C42] hover:bg-[#FF8C42]/90 text-white">
                  <a href={project.link}>View Project</a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}