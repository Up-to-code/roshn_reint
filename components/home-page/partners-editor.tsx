// components/home-page/partners-editor.tsx
"use client";

import { useState } from "react";
import { useHomePageStore } from "@/store/home-page-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, GripVertical } from "lucide-react";

export function PartnersEditor() {
  const { data, currentLang, addPartner, updatePartner, removePartner } = useHomePageStore();
  const partners = data[currentLang].partners || [];

  const [newPartner, setNewPartner] = useState({
    src: "",
    alt: "",
  });

  const handleAddPartner = () => {
    if (newPartner.src && newPartner.alt) {
      addPartner({
        id: Date.now().toString(),
        ...newPartner,
      });
      setNewPartner({ src: "", alt: "" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Existing partners */}
      <div className="space-y-4">
        <h3 className="font-medium">
          Current Partners ({currentLang.toUpperCase()})
        </h3>
        <div className="space-y-3">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex items-start gap-3 rounded-lg border p-4"
            >
              <GripVertical className="mt-2 h-4 w-4 text-muted-foreground" />
              <div className="grid flex-1 gap-2">
                <Input
                  value={partner.src}
                  onChange={(e) =>
                    updatePartner(partner.id, { src: e.target.value })
                  }
                  placeholder="Logo image URL"
                />
                <Input
                  value={partner.alt}
                  onChange={(e) =>
                    updatePartner(partner.id, { alt: e.target.value })
                  }
                  placeholder="Alt text (accessibility)"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removePartner(partner.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Add new partner */}
      <div className="rounded-lg border bg-muted/50 p-4">
        <h3 className="mb-3 font-medium">
          Add New Partner ({currentLang.toUpperCase()})
        </h3>
        <div className="grid gap-3">
          <Input
            value={newPartner.src}
            onChange={(e) =>
              setNewPartner({ ...newPartner, src: e.target.value })
            }
            placeholder="Logo image URL"
          />
          <Input
            value={newPartner.alt}
            onChange={(e) =>
              setNewPartner({ ...newPartner, alt: e.target.value })
            }
            placeholder="Alt text (accessibility)"
          />
          <Button onClick={handleAddPartner} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Partner
          </Button>
        </div>
      </div>
    </div>
  );
}
