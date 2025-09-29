"use client";

import { TestimonialsSection as TestimonialsSectionType } from "@/types/home-page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

interface TestimonialsSectionProps {
  content: TestimonialsSectionType;
}

export function TestimonialsSection({ content }: TestimonialsSectionProps) {
  if (!content.testimonials || content.testimonials.length === 0) return null;

  const TestimonialCard = ({
    testimonial,
    index,
  }: {
    testimonial: any;
    index: number;
  }) => (
    <div
      className="group bg-gray-900 rounded-xl border border-gray-800 p-8 hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 hover:translate-y-[-4px]"
      key={`testimonial-${testimonial.id}-${index}`}
    >
      {/* Stars */}
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${
              i < (testimonial.rating || 5)
                ? "fill-orange-500 text-orange-500"
                : "fill-gray-700 text-gray-700"
            }`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <div className="relative">
        <div className="absolute -top-2 -left-2 text-orange-500/20 text-4xl font-serif">"</div>
        <p className="text-lg text-gray-300 leading-relaxed mb-6 relative z-10 font-light">
          {testimonial.content}
        </p>
      </div>

      {/* Author */}
      <div className="flex items-center gap-4 pt-6 border-t border-gray-800">
        <Avatar className="h-14 w-14 ring-2 ring-gray-700 group-hover:ring-orange-500 transition-all duration-300">
          {testimonial.avatar && (
            <AvatarImage
              src={testimonial.avatar}
              alt={testimonial.name}
              className="object-cover"
            />
          )}
          <AvatarFallback className="text-base font-medium bg-orange-500 text-black font-bold">
            {testimonial.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-lg font-semibold text-white truncate">
            {testimonial.name}
          </p>
          <p className="text-sm text-gray-400 truncate">{testimonial.position}</p>
          {testimonial.company && (
            <p className="text-xs text-orange-400 font-semibold truncate">
              {testimonial.company}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium rounded-full mb-8">
            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
            Testimonials
          </div>
          <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">
            {content.title}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
            {content.subtitle}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {content.testimonials.map((testimonial, index) => (
            <TestimonialCard 
              testimonial={testimonial} 
              index={index} 
              key={testimonial.id || index} 
            />
          ))}
        </div>

   
      </div>
    </section>
  );
}