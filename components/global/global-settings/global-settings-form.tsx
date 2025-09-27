"use client";

import { useState, useEffect } from "react";
import { useGlobalSettingsStore } from "@/store/global-settings-store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NavigationEditor } from "./navigation-editor";
import { FooterEditor } from "./footer-editor";
import { LogoEditor } from "./logo-editor";
import { MetaEditor } from "./meta-editor";
import { Button } from "@/components/ui/button";
import { SaveModal } from "./save-modal";
import { Save, RotateCcw, Loader } from "lucide-react";
import { useTranslations } from "next-intl";

export function GlobalSettingsForm() {
  const [activeTab, setActiveTab] = useState("navigation");
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const { 
    settings, 
    isLoading, 
    loadSettings, 
    saveSettings, 
    resetSettings 
  } = useGlobalSettingsStore();
  const t = useTranslations('GlobalSettings');

  // Load settings on component mount
  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const handleSaveClick = () => {
    setIsSaveModalOpen(true);
  };

  const handleModalClose = () => {
    setIsSaveModalOpen(false);
  };

  const handleReset = async () => {
    if (confirm(t('resetConfirmation'))) {
      await resetSettings();
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <div className="text-center">
          <Loader className="mx-auto mb-4 h-8 w-8 animate-spin" />
          <p className="text-muted-foreground">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t('title')}</h1>
            <p className="text-muted-foreground">{t('description')}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleReset} disabled={isLoading}>
              <RotateCcw className="mr-2 h-4 w-4" />
              {t('resetButton')}
            </Button>
            <Button onClick={handleSaveClick}>
              <Save className="mr-2 h-4 w-4" />
              {t('saveButton')}
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 rounded-md bg-muted p-1">
            <TabsTrigger value="navigation">
              {t('tabs.navigation')}
            </TabsTrigger>
            <TabsTrigger value="footer">
              {t('tabs.footer')}
            </TabsTrigger>
            <TabsTrigger value="logo">
              {t('tabs.logo')}
            </TabsTrigger>
            <TabsTrigger value="meta">
              {t('tabs.meta')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="navigation" className="mt-4">
            <div className="rounded-lg border bg-card p-6">
              <NavigationEditor />
            </div>
          </TabsContent>

          <TabsContent value="footer" className="mt-4">
            <div className="rounded-lg border bg-card p-6">
              <FooterEditor />
            </div>
          </TabsContent>

          <TabsContent value="logo" className="mt-4">
            <div className="rounded-lg border bg-card p-6">
              <LogoEditor />
            </div>
          </TabsContent>

          <TabsContent value="meta" className="mt-4">
            <div className="rounded-lg border bg-card p-6">
              <MetaEditor />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {isSaveModalOpen && (
        <SaveModal
          isOpen={isSaveModalOpen}
          onClose={handleModalClose}
          onSave={saveSettings}
        />
      )}
    </div>
  );
}