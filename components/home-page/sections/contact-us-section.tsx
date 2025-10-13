"use client";

import { useState } from "react";
import { ContactUsSection as ContactUsSectionType } from "@/types/home-page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, AlertCircle, Loader2, MessageCircle } from "lucide-react";

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

      const result = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: isRTL 
            ? "تم إرسال رسالتك بنجاح! سوف نعود إليك في أقرب وقت ممكن." 
            : "Your message has been sent successfully! We'll get back to you as soon as possible."
        });
        setFormData({ name: '', phoneNumber: '', message: '' });
      } else {
        throw new Error(result.errors?.[0]?.message || result.message || 'Submission failed');
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: isRTL 
          ? "عذرًا، حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى."
          : "Sorry, there was an error sending your message. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border bg-card shadow-lg">
          <div className="grid lg:grid-cols-2">
            
            {/* Info Side */}
            <div className="border-r bg-muted/30 p-8 lg:p-12">
              <div className={`flex h-full flex-col justify-center space-y-6 ${isRTL ? 'text-right' : ''}`}>
                
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5">
                  <MessageCircle className="size-4 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    {isRTL ? "تواصل معنا" : "Contact Us"}
                  </span>
                </div>
                
                <h2 className="text-3xl font-bold lg:text-4xl">
                  {content.title}
                </h2>
                
                {content.subtitle && (
                  <p className="text-lg text-muted-foreground">
                    {content.subtitle}
                  </p>
                )}

                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-3 rounded-lg border bg-background p-3">
                    <div className="size-2 rounded-full bg-green-500"></div>
                    <span className="text-sm">
                      {isRTL ? "رد سريع خلال 24 ساعة" : "Quick response within 24 hours"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border bg-background p-3">
                    <div className="size-2 rounded-full bg-blue-500"></div>
                    <span className="text-sm">
                      {isRTL ? "دعم متخصص واحترافي" : "Professional support"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Side */}
            {content.form?.enabled && (
              <div className="p-8 lg:p-12">
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      {isRTL ? "الاسم" : "Name"} *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      minLength={2}
                      disabled={isLoading}
                      placeholder={isRTL ? "أدخل اسمك" : "Enter your name"}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phoneNumber" className="text-sm font-medium">
                      {isRTL ? "رقم الجوال" : "Phone"} *
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
                      placeholder={isRTL ? "أدخل رقم الجوال" : "Enter phone number"}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
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
                      placeholder={isRTL ? "أخبرنا كيف يمكننا مساعدتك" : "Tell us how we can help"}
                      className="resize-none"
                    />
                  </div>

                  {status && (
                    <div className={`flex items-start gap-2 rounded-lg border p-3 text-sm ${
                      status.type === 'success' 
                        ? 'border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200' 
                        : 'border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200'
                    }`}>
                      {status.type === 'success' ? (
                        <CheckCircle className="size-4 shrink-0" />
                      ) : (
                        <AlertCircle className="size-4 shrink-0" />
                      )}
                      <p>{status.message}</p>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="h-11 w-full"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        {isRTL ? "جاري الإرسال..." : "Sending..."}
                      </>
                    ) : (
                      isRTL ? "إرسال الرسالة" : "Send Message"
                    )}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    {isRTL ? "جميع الحقوق محفوظة *" : "All fields are required *"}
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}