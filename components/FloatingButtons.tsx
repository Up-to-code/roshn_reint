"use client";

import { useState, useEffect } from "react";
import { Phone, MessageCircle } from "lucide-react";

interface FloatingButtonsProps {
  locale: string;
}

interface ContactSettings {
  phoneNumber: string;
  whatsappNumber: string;
  showPhone: boolean;
  showWhatsApp: boolean;
}

export function FloatingButtons({ locale }: FloatingButtonsProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [settings, setSettings] = useState<ContactSettings>({
    phoneNumber: "+966501234567",
    whatsappNumber: "966501234567",
    showPhone: true,
    showWhatsApp: true,
  });

  const isRTL = locale === "ar";

  useEffect(() => {
    setMounted(true);
    loadSettings();
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadSettings = async () => {
    try {
      const response = await fetch('/api/contact-settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Failed to load contact settings:', error);
    }
  };

  if (!mounted) return null;

  const whatsappMessage = isRTL 
    ? "مرحبًا، أود الاستفسار عن خدماتكم" 
    : "Hello, I would like to inquire about your services";

  const handleCall = () => {
    window.open(`tel:${settings.phoneNumber}`, '_self');
  };

  const handleWhatsApp = () => {
    const url = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  const visibleButtons = [
    settings.showWhatsApp && {
      id: 'whatsapp',
      onClick: handleWhatsApp,
      icon: MessageCircle,
      label: isRTL ? "واتساب" : "WhatsApp",
      gradient: "from-[#25D366] to-[#128C7E]",
      hoverGradient: "from-[#128C7E] to-[#075E54]",
      shadow: "hover:shadow-[#25D366]/50",
    },
    settings.showPhone && {
      id: 'phone',
      onClick: handleCall,
      icon: Phone,
      label: isRTL ? "اتصال" : "Call",
      gradient: "from-blue-600 to-blue-700",
      hoverGradient: "from-blue-700 to-blue-800",
      shadow: "hover:shadow-blue-600/50",
    },
  ].filter(Boolean);

  if (visibleButtons.length === 0) return null;

  return (
    <div 
      className={`fixed bottom-8 z-50 flex flex-col gap-4 ${isRTL ? 'left-8' : 'right-8'} ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'
      } transition-all duration-300`}
    >
      {visibleButtons.map((button) => {
        const Icon = button.icon;
        return (
          <button
            key={button.id}
            onClick={button.onClick}
            className={`group relative flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r ${button.gradient} p-5 text-white shadow-2xl transition-all hover:scale-110 ${button.shadow}`}
            aria-label={button.label}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${button.hoverGradient} opacity-0 transition-opacity group-hover:opacity-100`} />
            <Icon className="relative z-10 size-7" />
            <span className="relative z-10 text-base font-bold">
              {button.label}
            </span>
            <div className="absolute -right-2 -top-2 size-20 rounded-full bg-white/10 blur-xl" />
          </button>
        );
      })}
    </div>
  );
}