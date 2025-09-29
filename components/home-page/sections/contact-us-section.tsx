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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-orange-500/10 border border-orange-200 text-orange-600 text-base font-medium mb-8">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            Ready to Connect
          </div>
          <h2 className="text-6xl font-black text-black mb-6">
            {content.title}
          </h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            {content.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Contact Information */}
          <div>
            <div className="bg-black p-10 text-white">
              <div>
                <h3 className="text-4xl font-bold mb-4 text-white">
                  Let's Talk
                </h3>
                <p className="text-orange-200 text-lg mb-12 font-light">
                  Choose your preferred method to reach us
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-6 p-6 hover:bg-white/5 transition-all duration-300 group cursor-pointer">
                    <div className="p-4 bg-orange-500">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-lg mb-2">Our Location</h4>
                      <p className="text-orange-100 leading-relaxed">{content.contactInfo.address}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-orange-300 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </div>

                  <div className="flex items-start gap-6 p-6 hover:bg-white/5 transition-all duration-300 group cursor-pointer">
                    <div className="p-4 bg-orange-500">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-lg mb-2">Phone Number</h4>
                      <p className="text-orange-100">{content.contactInfo.phone}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-orange-300 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </div>

                  <div className="flex items-start gap-6 p-6 hover:bg-white/5 transition-all duration-300 group cursor-pointer">
                    <div className="p-4 bg-orange-500">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-lg mb-2">Email Address</h4>
                      <p className="text-orange-100">{content.contactInfo.email}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-orange-300 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </div>

                  <div className="flex items-start gap-6 p-6 hover:bg-white/5 transition-all duration-300 group cursor-pointer">
                    <div className="p-4 bg-orange-500">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-lg mb-2">Working Hours</h4>
                      <p className="text-orange-100">{content.contactInfo.workingHours}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-orange-300 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          {content.form?.enabled && (
            <div className="bg-white p-10 border border-orange-100">
              <div>
                <div className="mb-12">
                  <h3 className="text-4xl font-black text-black mb-4">
                    Send Message
                  </h3>
                  <p className="text-gray-500 text-lg font-light">
                    We'll get back to you within 24 hours
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid sm:grid-cols-2 gap-8">
                    {content.form.fields.map((field, index) => (
                      field.type !== 'textarea' ? (
                        <div key={index} className="group">
                          <label className="block text-sm font-semibold text-black mb-4 tracking-wide">
                            {field.label} {field.required && <span className="text-orange-500">*</span>}
                          </label>
                          <Input
                            type={field.type}
                            required={field.required}
                            value={formData[field.name] || ''}
                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                            placeholder={`Enter your ${field.label.toLowerCase()}`}
                            className="h-14 transition-all duration-300 border-2 border-gray-200 focus:border-orange-500 text-black placeholder-gray-400 font-medium group-hover:border-orange-300"
                          />
                        </div>
                      ) : null
                    ))}
                  </div>

                  {/* Textarea fields - full width */}
                  {content.form.fields.map((field, index) => (
                    field.type === 'textarea' && (
                      <div key={index} className="group">
                        <label className="block text-sm font-semibold text-black mb-4 tracking-wide">
                          {field.label} {field.required && <span className="text-orange-500">*</span>}
                        </label>
                        <Textarea
                          required={field.required}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          placeholder={`Tell us about your ${field.label.toLowerCase()}`}
                          rows={6}
                          className="resize-none transition-all duration-300 border-2 border-gray-200 focus:border-orange-500 text-black placeholder-gray-400 font-medium group-hover:border-orange-300"
                        />
                      </div>
                    )
                  ))}
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-14 bg-black hover:bg-orange-500 text-white font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </div>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>

                {/* Trust indicator */}
                <div className="mt-8 text-center">
                  <p className="text-gray-400 text-sm font-medium">
                    🔒 Your information is secure and encrypted
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Additional CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-orange-50 p-12 border border-orange-200">
            <h3 className="text-3xl font-black text-black mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Our team is here to help you get the answers you need.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="bg-black text-white hover:bg-orange-500 px-8 py-6 text-lg font-bold transition-all duration-300">
                Schedule a Call
              </Button>
              <Button variant="outline" className="border-2 border-black text-black hover:bg-black hover:text-white px-8 py-6 text-lg font-bold transition-all duration-300">
                Live Chat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}