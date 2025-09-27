// components/home-page/why-us-editor.tsx
"use client";

import { useState } from "react";
import { useHomePageStore } from "@/store/home-page-store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, GripVertical } from "lucide-react";

export function WhyUsEditor() {
  const { data, currentLang, updateWhyUs, addFeature, updateFeature, removeFeature } = useHomePageStore();
  const whyUs = data[currentLang].whyUs;
  const [newFeature, setNewFeature] = useState({
    icon: '',
    title: '',
    description: ''
  });

  const handleAddFeature = () => {
    if (newFeature.title && newFeature.description) {
      addFeature({
        id: Date.now().toString(),
        ...newFeature
      });
      setNewFeature({
        icon: '',
        title: '',
        description: ''
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div>
          <label className="text-sm font-medium">Section Title ({currentLang.toUpperCase()})</label>
          <Input
            value={whyUs.title}
            onChange={(e) => updateWhyUs({ title: e.target.value })}
            placeholder="Why Choose Us?"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Section Subtitle ({currentLang.toUpperCase()})</label>
          <Input
            value={whyUs.subtitle}
            onChange={(e) => updateWhyUs({ subtitle: e.target.value })}
            placeholder="We provide the best solutions"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Features ({currentLang.toUpperCase()})</h3>
        <div className="space-y-3">
          {whyUs.features.map((feature) => (
            <div key={feature.id} className="flex items-start gap-3 rounded-lg border p-4">
              <GripVertical className="mt-2 h-4 w-4 text-muted-foreground" />
              <div className="grid flex-1 gap-2">
                <Input
                  value={feature.icon}
                  onChange={(e) => updateFeature(feature.id, { icon: e.target.value })}
                  placeholder="Emoji or icon"
                />
                <Input
                  value={feature.title}
                  onChange={(e) => updateFeature(feature.id, { title: e.target.value })}
                  placeholder="Feature title"
                />
                <Textarea
                  value={feature.description}
                  onChange={(e) => updateFeature(feature.id, { description: e.target.value })}
                  placeholder="Feature description"
                  rows={2}
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeFeature(feature.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="rounded-lg border bg-muted/50 p-4">
          <h4 className="mb-3 font-medium">Add New Feature ({currentLang.toUpperCase()})</h4>
          <div className="grid gap-2">
            <Input
              value={newFeature.icon}
              onChange={(e) => setNewFeature({ ...newFeature, icon: e.target.value })}
              placeholder="Emoji or icon"
            />
            <Input
              value={newFeature.title}
              onChange={(e) => setNewFeature({ ...newFeature, title: e.target.value })}
              placeholder="Feature title"
            />
            <Textarea
              value={newFeature.description}
              onChange={(e) => setNewFeature({ ...newFeature, description: e.target.value })}
              placeholder="Feature description"
              rows={2}
            />
            <Button onClick={handleAddFeature} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Feature
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}