"use client";

import { TestimonialsSection as TestimonialsSectionType } from "@/types/home-page";
import { Star } from "lucide-react";

interface TestimonialsSectionProps {
  content: TestimonialsSectionType;
}

export function TestimonialsSection({ content }: TestimonialsSectionProps) {
  if (!content.testimonials || content.testimonials.length === 0) return null;

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            {content.title}
          </h2>
          <p className="text-xl text-gray-600">
            {content.subtitle}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {content.testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-xl bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
            >
              {/* Rating */}
              <div className="mb-4 flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.rating
                        ? "fill-current text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="mb-6 italic text-gray-600">
                &quot;{testimonial.content}&quot;
              </blockquote>

              {/* Author */}
              <div className="flex items-center">
                {testimonial.avatar && (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="mr-4 h-12 w-12 rounded-full"
                  />
                )}
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.position}</p>
                  <p className="text-sm text-primary">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}