"use client";

import { useState } from "react";
import { ContactUsSection as ContactUsSectionType } from "@/types/home-page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface ContactUsSectionProps {
  content: ContactUsSectionType;
  locale: string;
}

export function ContactUsSection({ content, locale }: ContactUsSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const isRTL = locale === "ar";

  if (!content.enabled) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear status when user starts typing again
    if (status) setStatus(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);
    
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const result = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: isRTL ? "تم إرسال رسالتك بنجاح! سوف نعود إليك في أقرب وقت ممكن." : "Your message has been sent successfully! We'll get back to you as soon as possible."
        });
        setFormData({ name: '', phoneNumber: '', message: '' });
      } else {
        throw new Error(result.errors?.[0]?.message || result.message || 'Submission failed');
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: isRTL 
          ? "عذرًا، حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة."
          : "Sorry, there was an error sending your message. Please try again or contact us directly."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mx-auto my-40 max-w-7xl rounded-3xl bg-zinc-900 py-16 md:mx-10 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          
          {/* Title Section */}
          <div className={`max-w-lg text-center text-white lg:text-left ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              {content.title}
            </h2>
            {content.subtitle && (
              <p className="text-lg leading-relaxed text-zinc-300">
                {content.subtitle}
              </p>
            )}
          </div>     
          
          {/* Contact Form */}
          {content.form?.enabled && (
            <div className="space-y-6">
              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-200">
                    {isRTL ? "الاسم" : "Name"} *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    minLength={2}
                    disabled={isLoading}
                    placeholder={isRTL ? "أدخل اسمك الكامل" : "Enter your full name"}
                    className="h-12 rounded-lg border-zinc-700 bg-zinc-800 text-white transition-colors placeholder:text-zinc-400 focus:border-white focus:ring-1 focus:ring-white"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-zinc-200">
                    {isRTL ? "رقم الجوال" : "Phone Number"} *
                  </label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    minLength={5}
                    disabled={isLoading}
                    placeholder={isRTL ? "أدخل رقم الجوال" : "Enter your phone number"}
                    className="h-12 rounded-lg border-zinc-700 bg-zinc-800 text-white transition-colors placeholder:text-zinc-400 focus:border-white focus:ring-1 focus:ring-white"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-200">
                    {isRTL ? "الرسالة" : "Message"} *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    minLength={10}
                    rows={4}
                    disabled={isLoading}
                    placeholder={isRTL ? "أخبرنا كيف يمكننا مساعدتك..." : "Tell us how we can help you..."}
                    className="resize-none rounded-lg border-zinc-700 bg-zinc-800 text-white transition-colors placeholder:text-zinc-400 focus:border-white focus:ring-1 focus:ring-white"
                  />
                </div>

                {/* Status Message */}
                {status && (
                  <div className={`flex items-start gap-3 rounded-lg p-4 ${
                    status.type === 'success' 
                      ? 'bg-green-500/20 text-green-300' 
                      : 'bg-red-500/20 text-red-300'
                  }`}>
                    {status.type === 'success' ? (
                      <CheckCircle className="mt-0.5 size-5 shrink-0" />
                    ) : (
                      <AlertCircle className="mt-0.5 size-5 shrink-0" />
                    )}
                    <p className="text-sm leading-relaxed">{status.message}</p>
                  </div>
                )}

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="h-12 w-full rounded-lg bg-white font-semibold text-zinc-900 transition-all hover:bg-zinc-100 hover:shadow-lg disabled:opacity-70"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="size-4 animate-spin" />
                      {isRTL ? "جاري الإرسال..." : "Sending..."}
                    </span>
                  ) : (
                    isRTL ? "إرسال الرسالة" : "Send Message"
                  )}
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}