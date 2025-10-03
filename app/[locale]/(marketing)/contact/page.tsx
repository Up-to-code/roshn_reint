'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";

interface ContactPageProps {
  params: {
    locale: string;
  };
}

interface ContactContent {
  enabled: boolean;
  title: string;
  subtitle: string;
  contactInfo: {
    address: string;
    phone: string;
    email: string;
    workingHours: string;
  };
  form?: {
    enabled: boolean;
  };
}

export default function ContactPage({ params }: ContactPageProps) {
  const { locale } = params;
  const [content, setContent] = useState<ContactContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const isRTL = locale === "ar";

  // Fetch contact page data from API
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        // Use absolute URL for API call
        const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/home-page?locale=${locale}`, {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch contact data');
        }

        const data = await response.json();
        
        // Extract contactUs section from the home page data
        if (data.contactUs) {
          setContent(data.contactUs);
        } else {
          // Fallback content if no data from API
          setContent({
            enabled: true,
            title: locale === "ar" ? "تواصل معنا" : "Contact Us",
            subtitle: locale === "ar" 
              ? "نحن هنا لمساعدتك. تواصل معنا لأي استفسارات أو أسئلة." 
              : "We're here to help. Contact us for any inquiries or questions.",
            contactInfo: {
              address: "123 Business District, Downtown, City 10001",
              phone: "+1 (555) 123-4567",
              email: "hello@company.com",
              workingHours: "Mon - Fri: 9:00 AM - 6:00 PM"
            },
            form: {
              enabled: true
            }
          });
        }
      } catch (error) {
        console.error('Error fetching contact data:', error);
        // Fallback content in case of error
        setContent({
          enabled: true,
          title: locale === "ar" ? "تواصل معنا" : "Contact Us",
          subtitle: locale === "ar" 
            ? "نحن هنا لمساعدتك. تواصل معنا لأي استفسارات أو أسئلة." 
            : "We're here to help. Contact us for any inquiries or questions.",
          contactInfo: {
            address: "123 Business District, Downtown, City 10001",
            phone: "+1 (555) 123-4567",
            email: "hello@company.com",
            workingHours: "Mon - Fri: 9:00 AM - 6:00 PM"
          },
          form: {
            enabled: true
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, [locale]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);
    
    try {
      console.log('Submitting form data:', formData);

      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response:', text.substring(0, 200));
        throw new Error('Server returned non-JSON response');
      }

      const result = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: locale === "ar" ? "تم إرسال رسالتك بنجاح!" : "Your message has been sent successfully!"
        });
        setFormData({ name: '', phoneNumber: '', message: '' });
      } else {
        // Handle API validation errors
        const errorMessage = result.errors?.[0]?.message || 
                            result.message || 
                            `Error: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Submission error:', error);
      
      let errorMessage: string;
      if (error instanceof Error) {
        if (error.message.includes('JSON')) {
          errorMessage = locale === "ar" 
            ? "خطأ في الخادم: يرجى المحاولة مرة أخرى لاحقًا"
            : "Server error: Please try again later";
        } else {
          errorMessage = error.message;
        }
      } else {
        errorMessage = locale === "ar" 
          ? "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى."
          : "An unexpected error occurred. Please try again.";
      }

      setStatus({
        type: 'error',
        message: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state
  if (loading || !content) {
    return (
      <section className="bg-zinc-50 py-16 dark:bg-zinc-900 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-400">
              <div className="size-1.5 animate-pulse rounded-full bg-zinc-500"></div>
              {locale === "ar" ? "جاري التحميل..." : "Loading..."}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Early return if content is not enabled
  if (!content.enabled) {
    return (
      <section className="bg-zinc-50 py-16 dark:bg-zinc-900 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-zinc-100 md:text-5xl">
              {locale === "ar" ? "الصفحة غير متوفرة" : "Page Not Available"}
            </h2>
            <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-xl">
              {locale === "ar" ? "عذراً، صفحة الاتصال غير متاحة حالياً." : "Sorry, the contact page is currently unavailable."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-zinc-50 py-16 dark:bg-zinc-900 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center md:mb-16">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-400">
            <div className="size-1.5 animate-pulse rounded-full bg-zinc-500"></div>
            {locale === "ar" ? "جاهز للتواصل" : "Ready to Connect"}
          </div>
          <h2 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-zinc-100 md:text-5xl">
            {content.title}
          </h2>
          <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-xl">
            {content.subtitle}
          </p>
        </div>

        <div className={`grid items-start gap-12 lg:grid-cols-2 lg:gap-16 ${isRTL ? "lg:grid-flow-col-dense" : ""}`}>
          {/* Contact Information */}
          <div className={isRTL ? "lg:order-2" : "lg:order-1"}>
            <div className="bg-zinc-900 p-8 text-zinc-100 dark:bg-zinc-950 md:p-10">
              <div>
                <h3 className="mb-4 text-2xl font-bold text-zinc-100 md:text-4xl">
                  {locale === "ar" ? "لنتحدث" : "Let's Talk"}
                </h3>
                <p className="mb-8 text-base font-light text-zinc-400 md:text-lg">
                  {locale === "ar" ? "اختر طريقتك المفضلة للتواصل معنا" : "Choose your preferred method to reach us"}
                </p>
                
                <div className="space-y-6">
                  <div className={`group flex cursor-pointer items-start gap-4 p-4 transition-all duration-300 hover:bg-zinc-800 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <div className="bg-zinc-700 p-3">
                      <MapPin className="size-5 text-zinc-100" />
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-2 text-base font-bold text-zinc-100 md:text-lg">
                        {locale === "ar" ? "موقعنا" : "Our Location"}
                      </h4>
                      <p className="text-sm leading-relaxed text-zinc-400 md:text-base">
                        {content.contactInfo.address}
                      </p>
                    </div>
                    <ArrowRight className={`size-4 text-zinc-500 opacity-0 transition-all duration-300 group-hover:opacity-100 ${isRTL ? "rotate-180" : ""}`} />
                  </div>

                  <div className={`group flex cursor-pointer items-start gap-4 p-4 transition-all duration-300 hover:bg-zinc-800 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <div className="bg-zinc-700 p-3">
                      <Phone className="size-5 text-zinc-100" />
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-2 text-base font-bold text-zinc-100 md:text-lg">
                        {locale === "ar" ? "رقم الهاتف" : "Phone Number"}
                      </h4>
                      <p className="text-sm text-zinc-400 md:text-base">
                        {content.contactInfo.phone}
                      </p>
                    </div>
                    <ArrowRight className={`size-4 text-zinc-500 opacity-0 transition-all duration-300 group-hover:opacity-100 ${isRTL ? "rotate-180" : ""}`} />
                  </div>

                  <div className={`group flex cursor-pointer items-start gap-4 p-4 transition-all duration-300 hover:bg-zinc-800 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <div className="bg-zinc-700 p-3">
                      <Mail className="size-5 text-zinc-100" />
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-2 text-base font-bold text-zinc-100 md:text-lg">
                        {locale === "ar" ? "البريد الإلكتروني" : "Email Address"}
                      </h4>
                      <p className="text-sm text-zinc-400 md:text-base">
                        {content.contactInfo.email}
                      </p>
                    </div>
                    <ArrowRight className={`size-4 text-zinc-500 opacity-0 transition-all duration-300 group-hover:opacity-100 ${isRTL ? "rotate-180" : ""}`} />
                  </div>

                  <div className={`group flex cursor-pointer items-start gap-4 p-4 transition-all duration-300 hover:bg-zinc-800 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <div className="bg-zinc-700 p-3">
                      <Clock className="size-5 text-zinc-100" />
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-2 text-base font-bold text-zinc-100 md:text-lg">
                        {locale === "ar" ? "ساعات العمل" : "Working Hours"}
                      </h4>
                      <p className="text-sm text-zinc-400 md:text-base">
                        {content.contactInfo.workingHours}
                      </p>
                    </div>
                    <ArrowRight className={`size-4 text-zinc-500 opacity-0 transition-all duration-300 group-hover:opacity-100 ${isRTL ? "rotate-180" : ""}`} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          {content.form?.enabled && (
            <div className={`border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900 md:p-10 ${isRTL ? "lg:order-1" : "lg:order-2"}`}>
              <div>
                <div className="mb-8">
                  <h3 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100 md:text-4xl">
                    {locale === "ar" ? "إرسال رسالة" : "Send Message"}
                  </h3>
                  <p className="text-base font-light text-zinc-500 dark:text-zinc-400 md:text-lg">
                    {locale === "ar" ? "سنتواصل معك خلال 24 ساعة" : "We'll get back to you within 24 hours"}
                  </p>
                </div>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Name Field */}
                  <div className="group">
                    <label className={`mb-2 block text-sm font-semibold tracking-wide text-zinc-900 dark:text-zinc-100 ${isRTL ? "text-right" : ""}`}>
                      {locale === "ar" ? "الاسم الكامل" : "Full Name"} <span className="text-zinc-500">*</span>
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      minLength={2}
                      placeholder={locale === "ar" ? "أدخل اسمك الكامل" : "Enter your full name"}
                      className={`h-12 border-2 border-zinc-200 font-medium text-zinc-900 transition-all duration-300 placeholder:text-zinc-400 focus:border-zinc-500 group-hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-600 dark:group-hover:border-zinc-600 ${isRTL ? "text-right" : ""}`}
                      dir={isRTL ? "rtl" : "ltr"}
                    />
                    <p className="mt-1 text-xs text-zinc-500">
                      {locale === "ar" ? "يجب أن يكون الاسم على الأقل حرفين" : "Name must be at least 2 characters"}
                    </p>
                  </div>

                  {/* Phone Field */}
                  <div className="group">
                    <label className={`mb-2 block text-sm font-semibold tracking-wide text-zinc-900 dark:text-zinc-100 ${isRTL ? "text-right" : ""}`}>
                      {locale === "ar" ? "رقم الهاتف" : "Phone Number"} <span className="text-zinc-500">*</span>
                    </label>
                    <Input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      minLength={5}
                      placeholder={locale === "ar" ? "أدخل رقم هاتفك" : "Enter your phone number"}
                      className={`h-12 border-2 border-zinc-200 font-medium text-zinc-900 transition-all duration-300 placeholder:text-zinc-400 focus:border-zinc-500 group-hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-600 dark:group-hover:border-zinc-600 ${isRTL ? "text-right" : ""}`}
                      dir={isRTL ? "rtl" : "ltr"}
                    />
                    <p className="mt-1 text-xs text-zinc-500">
                      {locale === "ar" ? "يجب أن يكون رقم الهاتف على الأقل 5 أرقام" : "Phone number must be at least 5 characters"}
                    </p>
                  </div>

                  {/* Message Field */}
                  <div className="group">
                    <label className={`mb-2 block text-sm font-semibold tracking-wide text-zinc-900 dark:text-zinc-100 ${isRTL ? "text-right" : ""}`}>
                      {locale === "ar" ? "رسالتك" : "Your Message"} <span className="text-zinc-500">*</span>
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      minLength={10}
                      rows={6}
                      placeholder={locale === "ar" ? "اكتب رسالتك هنا..." : "Write your message here..."}
                      className={`resize-none border-2 border-zinc-200 font-medium text-zinc-900 transition-all duration-300 placeholder:text-zinc-400 focus:border-zinc-500 group-hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-600 dark:group-hover:border-zinc-600 ${isRTL ? "text-right" : ""}`}
                      dir={isRTL ? "rtl" : "ltr"}
                    />
                    <p className="mt-1 text-xs text-zinc-500">
                      {locale === "ar" ? "يجب أن تكون الرسالة على الأقل 10 أحرف" : "Message must be at least 10 characters"}
                    </p>
                  </div>

                  {/* Status Message */}
                  {status && (
                    <div className={`flex items-center gap-3 rounded-lg p-4 ${
                      status.type === 'success' 
                        ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                        : 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                    } ${isRTL ? "flex-row-reverse" : ""}`}>
                      {status.type === 'success' ? (
                        <CheckCircle className="size-5 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="size-5 flex-shrink-0" />
                      )}
                      <p className="text-sm font-medium">{status.message}</p>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className={`h-12 w-full bg-zinc-900 text-base font-bold text-zinc-100 transition-all duration-300 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent dark:border-zinc-900 dark:border-t-transparent"></div>
                        {locale === "ar" ? "جاري الإرسال..." : "Sending..."}
                      </span>
                    ) : (
                      <span className={`flex items-center justify-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <Send className={`size-4 transition-transform duration-300 ${isRTL ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
                        {locale === "ar" ? "إرسال الرسالة" : "Send Message"}
                      </span>
                    )}
                  </Button>

                  {/* Trust indicator */}
                  <div className="text-center">
                    <p className="text-sm font-medium text-zinc-400 dark:text-zinc-500">
                      🔒 {locale === "ar" ? "معلوماتك آمنة ومشفرة" : "Your information is secure and encrypted"}
                    </p>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Additional CTA Section */}
        <div className="mt-12 text-center md:mt-16">
          <div className="border border-zinc-200 bg-zinc-100 p-8 dark:border-zinc-800 dark:bg-zinc-800 md:p-12">
            <h3 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100 md:text-3xl">
              {locale === "ar" ? "هل لديك أسئلة أخرى؟" : "Still have questions?"}
            </h3>
            <p className="mx-auto mb-6 max-w-2xl text-base text-zinc-600 dark:text-zinc-400 md:mb-8 md:text-lg">
              {locale === "ar" ? "فريقنا هنا لمساعدتك في الحصول على الإجابات التي تحتاجها." : "Our team is here to help you get the answers you need."}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-zinc-900 px-6 py-3 text-base font-bold text-zinc-100 transition-all duration-300 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
                {locale === "ar" ? "جدولة مكالمة" : "Schedule a Call"}
              </Button>
              <Button variant="outline" className="border-2 border-zinc-900 px-6 py-3 text-base font-bold text-zinc-900 transition-all duration-300 hover:bg-zinc-900 hover:text-zinc-100 dark:border-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-100 dark:hover:text-zinc-900">
                {locale === "ar" ? "محادثة مباشرة" : "Live Chat"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}