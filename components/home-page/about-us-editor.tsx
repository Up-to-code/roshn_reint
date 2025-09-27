// components/home-page/about-us-editor.tsx
"use client";

import { useState } from "react";
import { useHomePageStore } from "@/store/home-page-store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, GripVertical } from "lucide-react";

export function AboutUsEditor() {
  const { data, currentLang, updateAboutUs, addStat, updateStat, removeStat } = useHomePageStore();
  const aboutUs = data[currentLang].aboutUs;
  const [newStat, setNewStat] = useState({
    value: '',
    label: ''
  });

  const handleAddStat = () => {
    if (newStat.value && newStat.label) {
      addStat({
        id: Date.now().toString(),
        ...newStat
      });
      setNewStat({
        value: '',
        label: ''
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div>
          <label className="text-sm font-medium">Section Title ({currentLang.toUpperCase()})</label>
          <Input
            value={aboutUs.title}
            onChange={(e) => updateAboutUs({ title: e.target.value })}
            placeholder="About Our Company"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Content ({currentLang.toUpperCase()})</label>
          <Textarea
            value={aboutUs.content}
            onChange={(e) => updateAboutUs({ content: e.target.value })}
            placeholder="Company description"
            rows={4}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Image URL</label>
          <Input
            value={aboutUs.image}
            onChange={(e) => updateAboutUs({ image: e.target.value })}
            placeholder="/images/about-us.jpg"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Statistics ({currentLang.toUpperCase()})</h3>
        <div className="space-y-3">
          {aboutUs.stats.map((stat) => (
            <div key={stat.id} className="flex items-center gap-3 rounded-lg border p-3">
              <GripVertical className="h-4 w-4 text-muted-foreground" />
              <Input
                value={stat.value}
                onChange={(e) => updateStat(stat.id, { value: e.target.value })}
                placeholder="1000+"
              />
              <Input
                value={stat.label}
                onChange={(e) => updateStat(stat.id, { label: e.target.value })}
                placeholder="Happy Clients"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeStat(stat.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="rounded-lg border bg-muted/50 p-3">
          <div className="grid grid-cols-2 gap-2">
            <Input
              value={newStat.value}
              onChange={(e) => setNewStat({ ...newStat, value: e.target.value })}
              placeholder="Value"
            />
            <Input
              value={newStat.label}
              onChange={(e) => setNewStat({ ...newStat, label: e.target.value })}
              placeholder="Label"
            />
          </div>
          <Button onClick={handleAddStat} size="sm" className="mt-2">
            <Plus className="mr-2 h-4 w-4" />
            Add Statistic
          </Button>
        </div>
      </div>
    </div>
  );
}