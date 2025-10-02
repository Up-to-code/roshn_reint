import { ContactUsSection as ContactUsSectionType } from "@/types/home-page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send, ArrowRight } from "lucide-react";
import { getLocale } from "next-intl/server";

interface ContactUsSectionProps {
  content: ContactUsSectionType;
}

export async function ContactUsSection({ content }: ContactUsSectionProps) {
  const locale = await getLocale();
  const isRTL = locale === "ar";

  if (!content.enabled) return null;

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
                
                <form className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    {content.form.fields.map((field, index) => (
                      field.type !== 'textarea' ? (
                        <div key={index} className="group">
                          <label className={`mb-2 block text-sm font-semibold tracking-wide text-zinc-900 dark:text-zinc-100 ${isRTL ? "text-right" : ""}`}>
                            {field.label} {field.required && <span className="text-zinc-500">*</span>}
                          </label>
                          <Input
                            type={field.type}
                            required={field.required}
                            placeholder={locale === "ar" ? `أدخل ${field.label}` : `Enter your ${field.label.toLowerCase()}`}
                            className={`h-12 border-2 border-zinc-200 font-medium text-zinc-900 transition-all duration-300 placeholder:text-zinc-400 focus:border-zinc-500 group-hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-600 dark:group-hover:border-zinc-600 ${isRTL ? "text-right" : ""}`}
                          />
                        </div>
                      ) : null
                    ))}
                  </div>

                  {/* Textarea fields - full width */}
                  {content.form.fields.map((field, index) => (
                    field.type === 'textarea' && (
                      <div key={index} className="group">
                        <label className={`mb-2 block text-sm font-semibold tracking-wide text-zinc-900 dark:text-zinc-100 ${isRTL ? "text-right" : ""}`}>
                          {field.label} {field.required && <span className="text-zinc-500">*</span>}
                        </label>
                        <Textarea
                          required={field.required}
                          placeholder={locale === "ar" ? `أخبرنا عن ${field.label}` : `Tell us about your ${field.label.toLowerCase()}`}
                          rows={6}
                          className={`resize-none border-2 border-zinc-200 font-medium text-zinc-900 transition-all duration-300 placeholder:text-zinc-400 focus:border-zinc-500 group-hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-600 dark:group-hover:border-zinc-600 ${isRTL ? "text-right" : ""}`}
                        />
                      </div>
                    )
                  ))}
                  
                  <Button 
                    type="submit" 
                    className={`h-12 w-full bg-zinc-900 text-base font-bold text-zinc-100 transition-all duration-300 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <Send className={`size-4 transition-transform duration-300 ${isRTL ? "ml-2 rotate-180 group-hover:-translate-x-1" : "mr-2 group-hover:translate-x-1"}`} />
                    {locale === "ar" ? "إرسال الرسالة" : "Send Message"}
                  </Button>
                </form>

                {/* Trust indicator */}
                <div className="mt-6 text-center">
                  <p className="text-sm font-medium text-zinc-400 dark:text-zinc-500">
                    🔒 {locale === "ar" ? "معلوماتك آمنة ومشفرة" : "Your information is secure and encrypted"}
                  </p>
                </div>
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