"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Define types locally since the import is causing issues
interface Project {
  id: string | number;
  image: string;
  title: string;
  description: string;
  link: string;
}

interface PortfolioSectionContent {
  title: string;
  subtitle: string;
  projects: Project[];
}

interface PortfolioSectionProps {
  content: PortfolioSectionContent;
  className?: string;
}

export function PortfolioSection({ content, className }: PortfolioSectionProps) {
  if (!content.projects || content.projects.length === 0) return null;

  return (
    <section className={cn("py-16 md:py-24 bg-white", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 tracking-tight">
            {content.title}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {content.projects.map((project, index) => (
            <PortfolioCard 
              key={project.id} 
              project={project} 
              priority={index < 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface PortfolioCardProps {
  project: Project;
  priority?: boolean;
}

function PortfolioCard({ project, priority = false }: PortfolioCardProps) {
  return (
    <article className="group relative bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Image Container */}
      <div className="relative h-72 md:h-80 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading={priority ? "eager" : "lazy"}
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Content */}
      <div className="p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-semibold text-black mb-3 tracking-tight">
          {project.title}
        </h3>
        <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
          {project.description}
        </p>
        
        {/* CTA Button */}
        <Button 
          asChild
          variant="outline"
          className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors duration-200"
        >
          <a href={project.link} className="inline-flex items-center gap-2">
            View Project
            <svg 
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </Button>
      </div>
    </article>
  );
}