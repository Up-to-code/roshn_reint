"use client";
import React, { useState } from 'react';
import { Upload, X, MapPin, DollarSign, Bed, Bath, Maximize, Car, Save, Eye, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations, useLocale } from 'next-intl';

interface FormData {
  title: string;
  description: string;
  price: string;
  type: string;
  city: string;
  district: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  parking: string;
  features: string[];
}

interface ImagePreview {
  url: string;
  name: string;
}

export default function CreatePropertyDashboard() {
  const t = useTranslations('property');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const [activeTab, setActiveTab] = useState('basic');
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    price: '',
    type: 'apartment',
    city: '',
    district: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    parking: '',
    features: []
  });

  const tabs = [
    { id: 'basic', label: t('tabs.basic') },
    { id: 'details', label: t('tabs.details') },
    { id: 'features', label: t('tabs.features') },
    { id: 'images', label: t('tabs.images') }
  ];

  const propertyTypes = [
    { value: 'apartment', label: t('types.apartment') },
    { value: 'villa', label: t('types.villa') },
    { value: 'office', label: t('types.office') },
    { value: 'shop', label: t('types.shop') }
  ];

  const featuresList = t.raw('features.list');

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = Array.from(files).map(file => ({
      url: URL.createObjectURL(file),
      name: file.name
    }));
    
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Property Data:', formData);
    console.log('Images:', images);
    alert(t('success'));
  };

  return (
    <div className="min-h-screen bg-background p-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t('title')}
          </h1>
          <p className="text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>

        {/* Progress Tabs */}
        <div className="flex border-b border-border mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Basic Information */}
          {activeTab === 'basic' && (
            <Card>
              <CardHeader>
                <CardTitle>{t('sections.basic')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('form.title')}
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => updateFormData('title', e.target.value)}
                    placeholder={t('placeholders.title')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('form.description')}
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => updateFormData('description', e.target.value)}
                    placeholder={t('placeholders.description')}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <DollarSign className="w-4 h-4 inline mr-1" />
                      {t('form.price')}
                    </label>
                    <Input
                      type="number"
                      value={formData.price}
                      onChange={(e) => updateFormData('price', e.target.value)}
                      placeholder="500000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('form.type')}
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => updateFormData('type', e.target.value)}
                      className="w-full p-2 border border-input rounded-md bg-background"
                    >
                      {propertyTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Property Details */}
          {activeTab === 'details' && (
            <Card>
              <CardHeader>
                <CardTitle>{t('sections.details')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      {t('form.city')}
                    </label>
                    <Input
                      value={formData.city}
                      onChange={(e) => updateFormData('city', e.target.value)}
                      placeholder={t('placeholders.city')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('form.district')}
                    </label>
                    <Input
                      value={formData.district}
                      onChange={(e) => updateFormData('district', e.target.value)}
                      placeholder={t('placeholders.district')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Bed className="w-4 h-4 inline mr-1" />
                      {t('form.bedrooms')}
                    </label>
                    <Input
                      type="number"
                      value={formData.bedrooms}
                      onChange={(e) => updateFormData('bedrooms', e.target.value)}
                      placeholder="3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Bath className="w-4 h-4 inline mr-1" />
                      {t('form.bathrooms')}
                    </label>
                    <Input
                      type="number"
                      value={formData.bathrooms}
                      onChange={(e) => updateFormData('bathrooms', e.target.value)}
                      placeholder="2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Maximize className="w-4 h-4 inline mr-1" />
                      {t('form.area')}
                    </label>
                    <Input
                      type="number"
                      value={formData.area}
                      onChange={(e) => updateFormData('area', e.target.value)}
                      placeholder="200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Car className="w-4 h-4 inline mr-1" />
                      {t('form.parking')}
                    </label>
                    <Input
                      type="number"
                      value={formData.parking}
                      onChange={(e) => updateFormData('parking', e.target.value)}
                      placeholder="1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Features */}
          {activeTab === 'features' && (
            <Card>
              <CardHeader>
                <CardTitle>{t('sections.features')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {featuresList.map((feature: string, index: number) => (
                    <Badge
                      key={index}
                      variant={formData.features.includes(feature) ? 'default' : 'outline'}
                      className="cursor-pointer p-3 justify-center text-sm"
                      onClick={() => handleFeatureToggle(feature)}
                    >
                      {formData.features.includes(feature) && (
                        <CheckCircle className="w-4 h-4 mr-1" />
                      )}
                      {feature}
                    </Badge>
                  ))}
                </div>
                {formData.features.length > 0 && (
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      {t('features.selected', { count: formData.features.length })}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Images */}
          {activeTab === 'images' && (
            <Card>
              <CardHeader>
                <CardTitle>{t('sections.images')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
                    <label className="cursor-pointer">
                      <span className="text-primary font-medium">{t('images.upload')}</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    <p className="text-sm text-muted-foreground mt-2">
                      {t('images.requirements')}
                    </p>
                  </div>

                  {images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {images.map((img, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={img.url}
                            alt={img.name}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button variant="outline" className="gap-2">
            <Eye className="w-4 h-4" />
            {t('actions.preview')}
          </Button>
          <Button onClick={handleSubmit} className="gap-2">
            <Save className="w-4 h-4" />
            {t('actions.save')}
          </Button>
        </div>

        {/* Summary */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">{t('summary.title')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{formData.price || '0'}</div>
                <div className="text-sm text-muted-foreground">{t('summary.price')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{formData.bedrooms || '0'}</div>
                <div className="text-sm text-muted-foreground">{t('summary.bedrooms')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{formData.area || '0'}</div>
                <div className="text-sm text-muted-foreground">{t('summary.area')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{images.length}</div>
                <div className="text-sm text-muted-foreground">{t('summary.images')}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}