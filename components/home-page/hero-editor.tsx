"use client";

import { useHomePageStore } from "@/store/home-page-store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Default hero data as fallback
const defaultHero = {
  title: "",
  subtitle: "",
  primaryButton: {
    text: "",
    link: "",
    variant: "primary" as const
  },
  secondaryButton: {
    text: "",
    link: "",
    variant: "secondary" as const
  },
  backgroundVideo: "",
  overlayColor: "rgba(0,0,0,0.4)"
};

export function HeroEditor() {
  const { data, currentLang, updateHero, updateHeroButton } = useHomePageStore();
  
  // Safe data access with fallbacks
  const content = data?.[currentLang];
  const hero = content?.hero || defaultHero;

  // If data isn't loaded yet, show loading state
  if (!content) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-1/4 rounded bg-muted"></div>
          <div className="h-10 rounded bg-muted"></div>
          <div className="h-4 w-1/3 rounded bg-muted"></div>
          <div className="h-20 rounded bg-muted"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div>
          <label className="text-sm font-medium">Hero Title ({currentLang.toUpperCase()})</label>
          <Input
            value={hero.title}
            onChange={(e) => updateHero({ title: e.target.value })}
            placeholder="Main hero title"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Hero Subtitle ({currentLang.toUpperCase()})</label>
          <Textarea
            value={hero.subtitle}
            onChange={(e) => updateHero({ subtitle: e.target.value })}
            placeholder="Hero subtitle description"
            rows={3}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Background Video URL</label>
          <Input
            value={hero.backgroundVideo}
            onChange={(e) => updateHero({ backgroundVideo: e.target.value })}
            placeholder="/videos/hero-bg.mp4"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Overlay Color</label>
          <Input
            value={hero.overlayColor}
            onChange={(e) => updateHero({ overlayColor: e.target.value })}
            placeholder="rgba(0,0,0,0.4)"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Primary Button ({currentLang.toUpperCase()})</h3>
        <div className="grid gap-3 rounded-lg border p-4">
          <Input
            value={hero.primaryButton?.text || ""}
            onChange={(e) => updateHeroButton('primary', { text: e.target.value })}
            placeholder="Button text"
          />
          <Input
            value={hero.primaryButton?.link || ""}
            onChange={(e) => updateHeroButton('primary', { link: e.target.value })}
            placeholder="Button link"
          />
          <Select
            value={hero.primaryButton?.variant || "primary"}
            onValueChange={(value: any) => updateHeroButton('primary', { variant: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Button variant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="primary">Primary</SelectItem>
              <SelectItem value="secondary">Secondary</SelectItem>
              <SelectItem value="outline">Outline</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Secondary Button ({currentLang.toUpperCase()})</h3>
        <div className="grid gap-3 rounded-lg border p-4">
          <Input
            value={hero.secondaryButton?.text || ""}
            onChange={(e) => updateHeroButton('secondary', { text: e.target.value })}
            placeholder="Button text"
          />
          <Input
            value={hero.secondaryButton?.link || ""}
            onChange={(e) => updateHeroButton('secondary', { link: e.target.value })}
            placeholder="Button link"
          />
          <Select
            value={hero.secondaryButton?.variant || "secondary"}
            onValueChange={(value: any) => updateHeroButton('secondary', { variant: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Button variant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="primary">Primary</SelectItem>
              <SelectItem value="secondary">Secondary</SelectItem>
              <SelectItem value="outline">Outline</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}