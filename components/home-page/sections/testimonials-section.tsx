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
      className="group rounded-xl border border-gray-800 bg-gray-900 p-8 transition-all duration-300 hover:translate-y-[-4px] hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-500/20"
      key={`testimonial-${testimonial.id}-${index}`}
    >
      {/* Stars */}
      <div className="mb-6 flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`size-5 ${
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
        <div className="absolute -left-2 -top-2 font-serif text-4xl text-orange-500/20">&quot;</div>
        <p className="relative z-10 mb-6 text-lg font-light leading-relaxed text-gray-300">
          {testimonial.content}
        </p>
      </div>

      {/* Author */}
      <div className="flex items-center gap-4 border-t border-gray-800 pt-6">
        <Avatar className="size-14 ring-2 ring-gray-700 transition-all duration-300 group-hover:ring-orange-500">
          {testimonial.avatar && (
            <AvatarImage
              src={testimonial.avatar}
              alt={testimonial.name}
              className="object-cover"
            />
          )}
          <AvatarFallback className="bg-orange-500 text-base font-bold text-black">
            {testimonial.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-semibold text-white">
            {testimonial.name}
          </p>
          <p className="truncate text-sm text-gray-400">{testimonial.position}</p>
          {testimonial.company && (
            <p className="truncate text-xs font-semibold text-orange-400">
              {testimonial.company}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-20 text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-400">
            <div className="size-1.5 animate-pulse rounded-full bg-orange-500"></div>
            Testimonials
          </div>
          <h2 className="mb-6 text-5xl font-bold tracking-tight text-white">
            {content.title}
          </h2>
          <p className="mx-auto max-w-2xl text-xl font-light leading-relaxed text-gray-400">
            {content.subtitle}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
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