"use client";

import { useState } from "react";
import { useGlobalSettingsStore } from "@/store/global-settings-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, GripVertical } from "lucide-react";

const SOCIAL_PLATFORMS = [
  { value: 'facebook', label: 'Facebook' },
  { value: 'twitter', label: 'Twitter' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'github', label: 'GitHub' },
];

export function FooterEditor() {
  const {
    settings: { footer },
    updateFooter,
    addFooterSection,
    updateFooterSection,
    removeFooterSection,
    addSocialLink,
    updateSocialLink,
    removeSocialLink,
  } = useGlobalSettingsStore();

  const [newSectionTitle, setNewSectionTitle] = useState('');

  const addNewSection = () => {
    if (newSectionTitle) {
      addFooterSection({
        id: Date.now().toString(),
        title: newSectionTitle,
        links: [],
      });
      setNewSectionTitle('');
    }
  };

  const addLinkToSection = (sectionId: string) => {
    const section = footer.sections.find(s => s.id === sectionId);
    if (section) {
      updateFooterSection(sectionId, {
        links: [...section.links, {
          id: Date.now().toString(),
          label: 'New Link',
          href: '#',
          external: false,
        }]
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Footer Sections */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Footer Sections</h3>
        
        <div className="grid gap-4 md:grid-cols-2">
          {footer.sections.map((section) => (
            <div key={section.id} className="rounded-lg border bg-card p-4">
              <div className="mb-3 flex items-center gap-2">
                <GripVertical className="size-4 text-muted-foreground" />
                <Input
                  value={section.title}
                  onChange={(e) => updateFooterSection(section.id, { title: e.target.value })}
                  placeholder="Section title"
                  className="bg-transparent font-medium"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeFooterSection(section.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                {section.links.map((link) => (
                  <div key={link.id} className="flex gap-2">
                    <Input
                      value={link.label}
                      onChange={(e) => {
                        const updatedLinks = section.links.map(l =>
                          l.id === link.id ? { ...l, label: e.target.value } : l
                        );
                        updateFooterSection(section.id, { links: updatedLinks });
                      }}
                      placeholder="Link label"
                      className="flex-1"
                    />
                    <Input
                      value={link.href}
                      onChange={(e) => {
                        const updatedLinks = section.links.map(l =>
                          l.id === link.id ? { ...l, href: e.target.value } : l
                        );
                        updateFooterSection(section.id, { links: updatedLinks });
                      }}
                      placeholder="URL"
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const updatedLinks = section.links.filter(l => l.id !== link.id);
                        updateFooterSection(section.id, { links: updatedLinks });
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  onClick={() => addLinkToSection(section.id)}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Link
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            value={newSectionTitle}
            onChange={(e) => setNewSectionTitle(e.target.value)}
            placeholder="New section title"
            className="flex-1"
          />
          <Button onClick={addNewSection} variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add Section
          </Button>
        </div>
      </div>

      {/* Social Links */}
      <div className="space-y-4 rounded-lg border bg-card p-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={footer.showSocialLinks}
            onChange={(e) => updateFooter({ showSocialLinks: e.target.checked })}
            className="rounded border-gray-300 dark:border-gray-600"
          />
          <label className="text-sm font-medium text-foreground">Show Social Links</label>
        </div>

        <div className="space-y-3">
          {footer.socialLinks.map((social) => (
            <div key={social.platform} className="flex items-center gap-2">
              <select
                value={social.platform}
                onChange={(e) => {
                  removeSocialLink(social.platform);
                  addSocialLink({
                    ...social,
                    platform: e.target.value,
                  });
                }}
                className="flex-1 rounded border border-input bg-background px-3 py-2 text-sm"
              >
                {SOCIAL_PLATFORMS.map(platform => (
                  <option key={platform.value} value={platform.value}>
                    {platform.label}
                  </option>
                ))}
              </select>
              <Input
                value={social.url}
                onChange={(e) => updateSocialLink(social.platform, { url: e.target.value })}
                placeholder="Profile URL"
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeSocialLink(social.platform)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <Button
          onClick={() => addSocialLink({
            platform: 'facebook',
            url: '',
            icon: 'facebook',
          })}
          variant="outline"
          size="sm"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Social Link
        </Button>
      </div>

      {/* Footer Settings */}
      <div className="space-y-4 rounded-lg border bg-card p-4">
        <h3 className="text-lg font-medium text-foreground">Footer Settings</h3>
        
        <div>
          <label className="text-sm font-medium text-foreground">Copyright Text</label>
          <Input
            value={footer.copyrightText}
            onChange={(e) => updateFooter({ copyrightText: e.target.value })}
            placeholder="© 2024 My Company. All rights reserved."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground">Background Color</label>
            <Input
              value={footer.backgroundColor}
              onChange={(e) => updateFooter({ backgroundColor: e.target.value })}
              placeholder="#f8fafc"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Text Color</label>
            <Input
              value={footer.textColor}
              onChange={(e) => updateFooter({ textColor: e.target.value })}
              placeholder="#64748b"
            />
          </div>
        </div>
      </div>
    </div>
  );
}