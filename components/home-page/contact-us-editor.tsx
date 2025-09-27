// components/home-page/contact-us-editor.tsx
"use client";

import { useHomePageStore } from "@/store/home-page-store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, MapPin, Phone, Mail, Clock } from "lucide-react";

export function ContactUsEditor() {
  const { data, currentLang, updateContactUs } = useHomePageStore();
  const contactData = data[currentLang].contactUs;

  const updateField = (field: string, value: any) => {
    updateContactUs({ [field]: value });
  };

  const updateContactInfo = (field: string, value: string) => {
    updateContactUs({
      contactInfo: {
        ...contactData.contactInfo,
        [field]: value
      }
    });
  };

  const updateFormField = (index: number, field: string, value: any) => {
    const updatedFields = [...contactData.form.fields];
    updatedFields[index] = {
      ...updatedFields[index],
      [field]: value
    };
    
    updateContactUs({
      form: {
        ...contactData.form,
        fields: updatedFields
      }
    });
  };

  const addFormField = () => {
    const newField = {
      name: `field-${Date.now()}`,
      label: "New Field",
      required: false,
      type: "text"
    };
    
    updateContactUs({
      form: {
        ...contactData.form,
        fields: [...contactData.form.fields, newField]
      }
    });
  };

  const removeFormField = (index: number) => {
    const updatedFields = contactData.form.fields.filter((_, i) => i !== index);
    updateContactUs({
      form: {
        ...contactData.form,
        fields: updatedFields
      }
    });
  };

  const updateMapSettings = (field: string, value: any) => {
    updateContactUs({
      map: {
        ...contactData.map,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Basic Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Settings</CardTitle>
          <CardDescription>Configure the main contact section settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="contact-enabled">Enable Contact Section</Label>
            <Switch
              id="contact-enabled"
              checked={contactData.enabled}
              onCheckedChange={(checked) => updateField("enabled", checked)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contact-title">Title</Label>
            <Input
              id="contact-title"
              value={contactData.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="Contact Us"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contact-subtitle">Subtitle</Label>
            <Input
              id="contact-subtitle"
              value={contactData.subtitle}
              onChange={(e) => updateField("subtitle", e.target.value)}
              placeholder="We're here to help"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-description">Description</Label>
            <Textarea
              id="contact-description"
              value={contactData.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Get in touch with us..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Update your company's contact details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Address
            </Label>
            <Input
              id="address"
              value={contactData.contactInfo.address}
              onChange={(e) => updateContactInfo("address", e.target.value)}
              placeholder="Your company address"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone Number
            </Label>
            <Input
              id="phone"
              value={contactData.contactInfo.phone}
              onChange={(e) => updateContactInfo("phone", e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={contactData.contactInfo.email}
              onChange={(e) => updateContactInfo("email", e.target.value)}
              placeholder="contact@company.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="working-hours" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Working Hours
            </Label>
            <Input
              id="working-hours"
              value={contactData.contactInfo.workingHours}
              onChange={(e) => updateContactInfo("workingHours", e.target.value)}
              placeholder="Mon - Fri: 9:00 AM - 6:00 PM"
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Form Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Contact Form</CardTitle>
              <CardDescription>Customize the contact form fields and settings</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="form-enabled">Enable Form</Label>
              <Switch
                id="form-enabled"
                checked={contactData.form.enabled}
                onCheckedChange={(checked) => updateField("formEnabled", checked)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {contactData.form.fields.map((field, index) => (
              <div key={index} className="flex items-end gap-4 p-4 border rounded-lg">
                <div className="grid grid-cols-2 gap-4 flex-1">
                  <div className="space-y-2">
                    <Label htmlFor={`field-name-${index}`}>Field Name</Label>
                    <Input
                      id={`field-name-${index}`}
                      value={field.name}
                      onChange={(e) => updateFormField(index, "name", e.target.value)}
                      placeholder="field_name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`field-label-${index}`}>Display Label</Label>
                    <Input
                      id={`field-label-${index}`}
                      value={field.label}
                      onChange={(e) => updateFormField(index, "label", e.target.value)}
                      placeholder="Your Name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`field-type-${index}`}>Field Type</Label>
                    <select
                      id={`field-type-${index}`}
                      value={field.type}
                      onChange={(e) => updateFormField(index, "type", e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="text">Text</option>
                      <option value="email">Email</option>
                      <option value="tel">Phone</option>
                      <option value="textarea">Text Area</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={field.required}
                      onCheckedChange={(checked) => updateFormField(index, "required", checked)}
                    />
                    <Label htmlFor={`field-required-${index}`}>Required Field</Label>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeFormField(index)}
                  className="shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          
          <Button variant="outline" onClick={addFormField} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Form Field
          </Button>
        </CardContent>
      </Card>

      {/* Map Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Map Integration</CardTitle>
              <CardDescription>Add an embedded map to your contact section</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="map-enabled">Enable Map</Label>
              <Switch
                id="map-enabled"
                checked={contactData.map.enabled}
                onCheckedChange={(checked) => updateMapSettings("enabled", checked)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="map-embed">Map Embed Code</Label>
            <Textarea
              id="map-embed"
              value={contactData.map.embedCode}
              onChange={(e) => updateMapSettings("embedCode", e.target.value)}
              placeholder='<iframe src="https://www.google.com/maps/embed?..." ...></iframe>'
              rows={6}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}