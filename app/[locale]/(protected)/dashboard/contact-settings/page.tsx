"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useTranslations, useLocale } from 'next-intl';
import { Phone, MessageCircle, Save, AlertCircle, CheckCircle } from "lucide-react";

interface ContactSettings {
  phoneNumber: string;
  whatsappNumber: string;
  showPhone: boolean;
  showWhatsApp: boolean;
}

export default function ContactSettingsPage() {
  const t = useTranslations('settings');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [settings, setSettings] = useState<ContactSettings>({
    phoneNumber: '',
    whatsappNumber: '',
    showPhone: true,
    showWhatsApp: true,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoadingData(true);
      const response = await fetch('/api/contact-settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (err) {
      setError(isRTL ? 'فشل في تحميل الإعدادات' : 'Failed to load settings');
    } finally {
      setLoadingData(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');

    try {
      const response = await fetch('/api/contact-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        const data = await response.json();
        setError(data.error || (isRTL ? 'فشل في حفظ الإعدادات' : 'Failed to save settings'));
      }
    } catch (err) {
      setError(isRTL ? 'حدث خطأ أثناء الحفظ' : 'An error occurred while saving');
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="min-h-screen bg-background p-8" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="mx-auto max-w-4xl">
          <div className="py-12 text-center text-muted-foreground">
            {isRTL ? 'جاري التحميل...' : 'Loading...'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">
            {isRTL ? 'إعدادات التواصل' : 'Contact Settings'}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {isRTL 
              ? 'إدارة أرقام الهاتف وواتساب المعروضة على الموقع' 
              : 'Manage phone and WhatsApp numbers displayed on the website'}
          </p>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <Card className="mb-6 border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle className="size-5" />
                <span className="font-medium">
                  {isRTL ? 'تم حفظ الإعدادات بنجاح!' : 'Settings saved successfully!'}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-red-800">
                <AlertCircle className="size-5" />
                <span className="font-medium">{error}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Settings Form */}
        <form onSubmit={handleSubmit}>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="size-5 text-primary" />
                {isRTL ? 'معلومات الاتصال' : 'Contact Information'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Phone Number */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="phoneNumber" className="text-base font-semibold">
                    <Phone className="mr-2 inline size-4" />
                    {isRTL ? 'رقم الهاتف' : 'Phone Number'}
                  </Label>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="showPhone" className="text-sm">
                      {isRTL ? 'إظهار' : 'Show'}
                    </Label>
                    <Switch
                      id="showPhone"
                      checked={settings.showPhone}
                      onCheckedChange={(checked) => 
                        setSettings({ ...settings, showPhone: checked })
                      }
                    />
                  </div>
                </div>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={settings.phoneNumber}
                  onChange={(e) => setSettings({ ...settings, phoneNumber: e.target.value })}
                  placeholder={isRTL ? 'أدخل رقم الهاتف' : 'Enter phone number'}
                  className="text-lg"
                  required
                  dir="ltr"
                />
                <p className="text-sm text-muted-foreground">
                  {isRTL 
                    ? 'مثال: +966501234567' 
                    : 'Example: +966501234567'}
                </p>
              </div>

              {/* WhatsApp Number */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="whatsappNumber" className="text-base font-semibold">
                    <MessageCircle className="mr-2 inline size-4" />
                    {isRTL ? 'رقم واتساب' : 'WhatsApp Number'}
                  </Label>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="showWhatsApp" className="text-sm">
                      {isRTL ? 'إظهار' : 'Show'}
                    </Label>
                    <Switch
                      id="showWhatsApp"
                      checked={settings.showWhatsApp}
                      onCheckedChange={(checked) => 
                        setSettings({ ...settings, showWhatsApp: checked })
                      }
                    />
                  </div>
                </div>
                <Input
                  id="whatsappNumber"
                  type="tel"
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  placeholder={isRTL ? 'أدخل رقم واتساب' : 'Enter WhatsApp number'}
                  className="text-lg"
                  required
                  dir="ltr"
                />
                <p className="text-sm text-muted-foreground">
                  {isRTL 
                    ? 'مثال: 966501234567 (بدون + أو 00)' 
                    : 'Example: 966501234567 (without + or 00)'}
                </p>
              </div>

              {/* Preview */}
              <div className="rounded-lg border-2 border-dashed border-border bg-muted/20 p-6">
                <h3 className="mb-4 font-semibold text-foreground">
                  {isRTL ? 'معاينة الأزرار' : 'Button Preview'}
                </h3>
                <div className="flex flex-col gap-3">
                  {settings.showWhatsApp && (
                    <div className="flex items-center gap-3 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] px-5 py-4 text-white">
                      <MessageCircle className="size-6" />
                      <span className="font-bold">
                        {isRTL ? 'واتساب' : 'WhatsApp'}
                      </span>
                    </div>
                  )}
                  {settings.showPhone && (
                    <div className="flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-4 text-white">
                      <Phone className="size-6" />
                      <span className="font-bold">
                        {isRTL ? 'اتصال' : 'Call'}
                      </span>
                    </div>
                  )}
                  {!settings.showPhone && !settings.showWhatsApp && (
                    <p className="text-center text-sm text-muted-foreground">
                      {isRTL ? 'لا توجد أزرار مفعلة' : 'No buttons enabled'}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-6 text-lg font-semibold hover:from-blue-700 hover:to-purple-700"
              >
                {loading ? (
                  <>
                    <Save className="mr-2 size-5 animate-spin" />
                    {isRTL ? 'جاري الحفظ...' : 'Saving...'}
                  </>
                ) : (
                  <>
                    <Save className="mr-2 size-5" />
                    {isRTL ? 'حفظ الإعدادات' : 'Save Settings'}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}