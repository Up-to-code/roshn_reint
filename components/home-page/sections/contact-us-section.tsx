/* eslint-disable react/no-unescaped-entities */
"use client";

import { ContactUsSection as ContactUsSectionType } from "@/types/home-page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send, ArrowRight } from "lucide-react";
import { useState } from "react";

interface ContactUsSectionProps {
  content: ContactUsSectionType;
}

export function ContactUsSection({ content }: ContactUsSectionProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!content.enabled) return null;

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Form submitted:', formData);
    
    setIsSubmitting(false);
  };

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-20 text-center">
          <div className="mb-8 inline-flex items-center gap-3 border border-orange-200 bg-orange-500/10 px-6 py-3 text-base font-medium text-orange-600">
            <div className="size-2 animate-pulse rounded-full bg-orange-500"></div>
            Ready to Connect
          </div>
          <h2 className="mb-6 text-6xl font-black text-black">
            {content.title}
          </h2>
          <p className="mx-auto max-w-3xl text-2xl font-light leading-relaxed text-gray-600">
            {content.subtitle}
          </p>
        </div>

        <div className="grid items-start gap-20 lg:grid-cols-2">
          {/* Contact Information */}
          <div>
            <div className="bg-black p-10 text-white">
              <div>
                <h3 className="mb-4 text-4xl font-bold text-white">
                  Let&apos;s Talk
                </h3>
                <p className="mb-12 text-lg font-light text-orange-200">
                  Choose your preferred method to reach us
                </p>
                
                <div className="space-y-8">
                  <div className="group flex cursor-pointer items-start gap-6 p-6 transition-all duration-300 hover:bg-white/5">
                    <div className="bg-orange-500 p-4">
                      <MapPin className="size-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-2 text-lg font-bold text-white">Our Location</h4>
                      <p className="leading-relaxed text-orange-100">{content.contactInfo.address}</p>
                    </div>
                    <ArrowRight className="size-5 text-orange-300 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                  </div>

                  <div className="group flex cursor-pointer items-start gap-6 p-6 transition-all duration-300 hover:bg-white/5">
                    <div className="bg-orange-500 p-4">
                      <Phone className="size-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-2 text-lg font-bold text-white">Phone Number</h4>
                      <p className="text-orange-100">{content.contactInfo.phone}</p>
                    </div>
                    <ArrowRight className="size-5 text-orange-300 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                  </div>

                  <div className="group flex cursor-pointer items-start gap-6 p-6 transition-all duration-300 hover:bg-white/5">
                    <div className="bg-orange-500 p-4">
                      <Mail className="size-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-2 text-lg font-bold text-white">Email Address</h4>
                      <p className="text-orange-100">{content.contactInfo.email}</p>
                    </div>
                    <ArrowRight className="size-5 text-orange-300 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                  </div>

                  <div className="group flex cursor-pointer items-start gap-6 p-6 transition-all duration-300 hover:bg-white/5">
                    <div className="bg-orange-500 p-4">
                      <Clock className="size-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-2 text-lg font-bold text-white">Working Hours</h4>
                      <p className="text-orange-100">{content.contactInfo.workingHours}</p>
                    </div>
                    <ArrowRight className="size-5 text-orange-300 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          {content.form?.enabled && (
            <div className="border border-orange-100 bg-white p-10">
              <div>
                <div className="mb-12">
                  <h3 className="mb-4 text-4xl font-black text-black">
                    Send Message
                  </h3>
                  <p className="text-lg font-light text-gray-500">
                    We'll get back to you within 24 hours
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid gap-8 sm:grid-cols-2">
                    {content.form.fields.map((field, index) => (
                      field.type !== 'textarea' ? (
                        <div key={index} className="group">
                          <label className="mb-4 block text-sm font-semibold tracking-wide text-black">
                            {field.label} {field.required && <span className="text-orange-500">*</span>}
                          </label>
                          <Input
                            type={field.type}
                            required={field.required}
                            value={formData[field.name] || ''}
                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                            placeholder={`Enter your ${field.label.toLowerCase()}`}
                            className="h-14 border-2 border-gray-200 font-medium text-black transition-all duration-300 placeholder:text-gray-400 focus:border-orange-500 group-hover:border-orange-300"
                          />
                        </div>
                      ) : null
                    ))}
                  </div>

                  {/* Textarea fields - full width */}
                  {content.form.fields.map((field, index) => (
                    field.type === 'textarea' && (
                      <div key={index} className="group">
                        <label className="mb-4 block text-sm font-semibold tracking-wide text-black">
                          {field.label} {field.required && <span className="text-orange-500">*</span>}
                        </label>
                        <Textarea
                          required={field.required}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          placeholder={`Tell us about your ${field.label.toLowerCase()}`}
                          rows={6}
                          className="resize-none border-2 border-gray-200 font-medium text-black transition-all duration-300 placeholder:text-gray-400 focus:border-orange-500 group-hover:border-orange-300"
                        />
                      </div>
                    )
                  ))}
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="group h-14 w-full bg-black text-lg font-bold text-white transition-all duration-300 hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-3">
                        <div className="size-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Sending...
                      </div>
                    ) : (
                      <>
                        <Send className="mr-3 size-5 transition-transform duration-300 group-hover:translate-x-1" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>

                {/* Trust indicator */}
                <div className="mt-8 text-center">
                  <p className="text-sm font-medium text-gray-400">
                    🔒 Your information is secure and encrypted
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Additional CTA Section */}
        <div className="mt-20 text-center">
          <div className="border border-orange-200 bg-orange-50 p-12">
            <h3 className="mb-4 text-3xl font-black text-black">
              Still have questions?
            </h3>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
              Our team is here to help you get the answers you need.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-black px-8 py-6 text-lg font-bold text-white transition-all duration-300 hover:bg-orange-500">
                Schedule a Call
              </Button>
              <Button variant="outline" className="border-2 border-black px-8 py-6 text-lg font-bold text-black transition-all duration-300 hover:bg-black hover:text-white">
                Live Chat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}