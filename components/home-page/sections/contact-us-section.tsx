"use client";

import { ContactUsSection as ContactUsSectionType } from "@/types/home-page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";

interface ContactUsSectionProps {
  content: ContactUsSectionType;
}

export function ContactUsSection({ content }: ContactUsSectionProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});

  if (!content.enabled) return null;

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section className="py-20 bg-gray-50">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-[#2C2C2C] mb-6">Get in Touch</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-[#FF8C42] mt-1 mr-4" />
                <div>
                  <h4 className="font-semibold text-[#2C2C2C]">Address</h4>
                  <p className="text-gray-600">{content.contactInfo.address}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-6 h-6 text-[#FF8C42] mt-1 mr-4" />
                <div>
                  <h4 className="font-semibold text-[#2C2C2C]">Phone</h4>
                  <p className="text-gray-600">{content.contactInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="w-6 h-6 text-[#FF8C42] mt-1 mr-4" />
                <div>
                  <h4 className="font-semibold text-[#2C2C2C]">Email</h4>
                  <p className="text-gray-600">{content.contactInfo.email}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="w-6 h-6 text-[#FF8C42] mt-1 mr-4" />
                <div>
                  <h4 className="font-semibold text-[#2C2C2C]">Working Hours</h4>
                  <p className="text-gray-600">{content.contactInfo.workingHours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          {content.form?.enabled && (
            <div>
              <h3 className="text-2xl font-bold text-[#2C2C2C] mb-6">Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {content.form.fields.map((field, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    
                    {field.type === 'textarea' ? (
                      <Textarea
                        required={field.required}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                        rows={4}
                      />
                    ) : (
                      <Input
                        type={field.type}
                        required={field.required}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                      />
                    )}
                  </div>
                ))}
                
                <Button type="submit" size="lg" className="w-full bg-[#FF8C42] hover:bg-[#FF8C42]/90">
                  Send Message
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}