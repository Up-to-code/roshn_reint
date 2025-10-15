
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { PropertiesService, type CreatePropertyData } from '@/lib/api/properties-service';
import { CustomUploader } from '@/components/shared/custom-uploader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { 
  ArrowLeft, 
  X, 
  Image as ImageIcon, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Car, 
  Calendar,
  DollarSign,
  Building,
  Home,
  Plus,
  Minus,
  Save,
  RotateCcw,
  AlertCircle,
  CheckCircle,
  Upload,
  Building2
} from 'lucide-react';

interface EditPropertyFormData extends CreatePropertyData {}

// Helper function to deep compare objects
const isEqual = (obj1: any, obj2: any): boolean => {
  if (obj1 === obj2) return true;
  
  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    return obj1 === obj2;
  }
  
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) return false;
  
  for (const key of keys1) {
    if (!keys2.includes(key)) return false;
    
    if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])) {
      if (obj1[key].length !== obj2[key].length) return false;
      for (let i = 0; i < obj1[key].length; i++) {
        if (obj1[key][i] !== obj2[key][i]) return false;
      }
    } else if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      if (!isEqual(obj1[key], obj2[key])) return false;
    } else if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  
  return true;
};

export default function EditPropertyPage() {
  const t = useTranslations('propertyForm');
  const commonT = useTranslations('common');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const router = useRouter();
  const params = useParams();
  const propertyId = params.id as string;
  
  const [loading, setLoading] = useState(false);
  const [loadingProperty, setLoadingProperty] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalData, setOriginalData] = useState<EditPropertyFormData | null>(null);
  const [formData, setFormData] = useState<EditPropertyFormData>({
    titleEn: '',
    titleAr: '',
    descriptionEn: '',
    descriptionAr: '',
    price: 0,
    type: 'APARTMENT',
    status: 'AVAILABLE',
    city: '',
    district: '',
    bedrooms: 1,
    bathrooms: 1,
    area: 0,
    parking: 0,
    features: [],
    images: [],
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [stepCompleted, setStepCompleted] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false
  });

  // Required fields configuration
  const requiredFields = {
    titleEn: true,
    titleAr: true,
    price: true,
    type: true,
    status: true,
    city: true,
    bedrooms: true,
    bathrooms: true,
    area: true,
    parking: true,
  };

  // Use ref to track the latest form data for submission
  const formDataRef = useRef(formData);
  
  // Update ref whenever formData changes
  useEffect(() => {
    formDataRef.current = formData;
    
    // Check if there are actual changes compared to original data
    if (originalData) {
      const hasActualChanges = !isEqual(formData, originalData);
      setHasChanges(hasActualChanges);
    }
    
    // Check step completion
    checkStepCompletion();
  }, [formData, originalData, currentStep]);

  useEffect(() => {
    if (propertyId) {
      loadProperty();
    }
  }, [propertyId]);

  // Check if current step is completed
  const checkStepCompletion = () => {
    const currentData = formDataRef.current;
    
    const stepRequirements = {
      1: () => 
        currentData.titleEn.trim() !== '' &&
        currentData.titleAr.trim() !== '' &&
        currentData.price > 0 &&
        Boolean(currentData.type) &&
        Boolean(currentData.status) &&
        currentData.city.trim() !== '',
      2: () => 
        currentData.bedrooms > 0 &&
        currentData.bathrooms > 0 &&
        currentData.area > 0 &&
        currentData.parking >= 0,
      3: () => currentData.images.length > 0 // Step 3 requires at least one image
    };

    setStepCompleted(prev => ({
      ...prev,
      [currentStep]: stepRequirements[currentStep]()
    }));
  };

  const loadProperty = async () => {
    try {
      setLoadingProperty(true);
      console.log('Loading property with ID:', propertyId);
      const property = await PropertiesService.getById(propertyId);
      
      if (!property) {
        console.error('Property not found');
        alert('Property not found');
        return;
      }
      
      console.log('Property loaded:', property);
      
      const editData: EditPropertyFormData = {
        titleEn: property.titleEn,
        titleAr: property.titleAr,
        descriptionEn: property.descriptionEn || '',
        descriptionAr: property.descriptionAr || '',
        price: property.price,
        type: property.type,
        status: property.status,
        city: property.city,
        district: property.district || '',
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        area: property.area,
        parking: property.parking,
        features: property.features,
        images: property.images,
      };
      
      setFormData(editData);
      formDataRef.current = editData;
      setOriginalData(editData);
      setHasChanges(false);
    } catch (error) {
      console.error('Error loading property:', error);
      alert(`Error loading property: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoadingProperty(false);
    }
  };

  const updateFormData = (field: keyof EditPropertyFormData, value: any) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      formDataRef.current = newData;
      return newData;
    });
    
    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleImageUpload = (urls: string[]) => {
    setFormData(prev => {
      const newData = { ...prev, images: [...prev.images, ...urls] };
      formDataRef.current = newData;
      return newData;
    });
  };

  const removeImage = (index: number) => {
    setFormData(prev => {
      const newData = { ...prev, images: prev.images.filter((_, i) => i !== index) };
      formDataRef.current = newData;
      return newData;
    });
  };

  const resetToOriginal = () => {
    if (originalData) {
      setFormData(originalData);
      formDataRef.current = originalData;
      setHasChanges(false);
      setFieldErrors({});
    }
  };

  // Required field indicator component
  const RequiredIndicator = () => (
    <span className="ml-1 text-destructive">*</span>
  );

  const validateForm = (): { isValid: boolean; errors: Record<string, string> } => {
    const errors: Record<string, string> = {};
    const currentData = formDataRef.current;

    // Required field validation
    if (requiredFields.titleEn && !currentData.titleEn.trim()) {
      errors.titleEn = isRTL ? 'العنوان بالإنجليزية مطلوب' : 'English title is required';
    }
    if (requiredFields.titleAr && !currentData.titleAr.trim()) {
      errors.titleAr = isRTL ? 'العنوان بالعربية مطلوب' : 'Arabic title is required';
    }
    if (requiredFields.price && (!currentData.price || currentData.price <= 0)) {
      errors.price = isRTL ? 'يرجى إدخال سعر صحيح' : 'Please enter a valid price';
    }
    if (requiredFields.city && !currentData.city.trim()) {
      errors.city = isRTL ? 'يرجى إدخال مدينة صحيحة' : 'Please enter a valid city';
    }
    if (requiredFields.area && (!currentData.area || currentData.area <= 0)) {
      errors.area = isRTL ? 'يرجى إدخال مساحة صحيحة' : 'Please enter a valid area';
    }
    if (requiredFields.bedrooms && (!currentData.bedrooms || currentData.bedrooms <= 0)) {
      errors.bedrooms = isRTL ? 'يرجى إدخال عدد غرف النوم' : 'Please enter number of bedrooms';
    }
    if (requiredFields.bathrooms && (!currentData.bathrooms || currentData.bathrooms <= 0)) {
      errors.bathrooms = isRTL ? 'يرجى إدخال عدد الحمامات' : 'Please enter number of bathrooms';
    }
    
    // Check if at least one image is uploaded
    if (currentData.images.length === 0) {
      errors.images = isRTL ? 'يرجى رفع صورة واحدة على الأقل' : 'Please upload at least one image';
    }

    setFieldErrors(errors);
    return { isValid: Object.keys(errors).length === 0, errors };
  };

  const validateCurrentStep = (): boolean => {
    const stepValidations: Record<number, (keyof EditPropertyFormData)[]> = {
      1: ['titleEn', 'titleAr', 'price', 'type', 'status', 'city'],
      2: ['bedrooms', 'bathrooms', 'area', 'parking'],
      3: []
    };

    const currentStepFields = stepValidations[currentStep] || [];
    const errors: Record<string, string> = {};
    const currentData = formDataRef.current;

    currentStepFields.forEach(field => {
      if (requiredFields[field]) {
        if (field === 'titleEn' && !currentData.titleEn.trim()) {
          errors.titleEn = isRTL ? 'العنوان بالإنجليزية مطلوب' : 'English title is required';
        }
        if (field === 'titleAr' && !currentData.titleAr.trim()) {
          errors.titleAr = isRTL ? 'العنوان بالعربية مطلوب' : 'Arabic title is required';
        }
        if (field === 'price' && (!currentData.price || currentData.price <= 0)) {
          errors.price = isRTL ? 'يرجى إدخال سعر صحيح' : 'Please enter a valid price';
        }
        if (field === 'city' && !currentData.city.trim()) {
          errors.city = isRTL ? 'يرجى إدخال مدينة صحيحة' : 'Please enter a valid city';
        }
        if (field === 'area' && (!currentData.area || currentData.area <= 0)) {
          errors.area = isRTL ? 'يرجى إدخال مساحة صحيحة' : 'Please enter a valid area';
        }
        if (field === 'bedrooms' && (!currentData.bedrooms || currentData.bedrooms <= 0)) {
          errors.bedrooms = isRTL ? 'يرجى إدخال عدد غرف النوم' : 'Please enter number of bedrooms';
        }
        if (field === 'bathrooms' && (!currentData.bathrooms || currentData.bathrooms <= 0)) {
          errors.bathrooms = isRTL ? 'يرجى إدخال عدد الحمامات' : 'Please enter number of bathrooms';
        }
        if (field === 'parking' && currentData.parking < 0) {
          errors.parking = isRTL ? 'يرجى إدخال عدد صحيح لمواقف السيارات' : 'Please enter a valid number for parking';
        }
      }
    });

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all steps are completed
    if (!stepCompleted[1] || !stepCompleted[2] || !stepCompleted[3]) {
      alert(isRTL 
        ? 'يرجى إكمال جميع الخطوات الثلاث قبل الحفظ' 
        : 'Please complete all three steps before saving'
      );
      
      // Navigate to first incomplete step
      if (!stepCompleted[1]) setCurrentStep(1);
      else if (!stepCompleted[2]) setCurrentStep(2);
      else if (!stepCompleted[3]) setCurrentStep(3);
      
      return;
    }
    
    // Check if there are actual changes
    if (!hasChanges) {
      alert(isRTL 
        ? 'لم تقم بإجراء أي تغييرات. لا حاجة للحفظ.' 
        : 'No changes were made. No need to save.'
      );
      return;
    }
    
    // Final validation
    const validation = validateForm();
    if (!validation.isValid) {
      const errorCount = Object.keys(validation.errors).length;
      alert(isRTL 
        ? `يرجى تصحيح ${errorCount} خطأ${errorCount > 1 ? 'ء' : ''} في النموذج`
        : `Please fix ${errorCount} error${errorCount > 1 ? 's' : ''} in the form`
      );
      
      // Find the first step with errors and navigate to it
      const errorFields = Object.keys(validation.errors);
      if (errorFields.some(field => ['titleEn', 'titleAr', 'price', 'type', 'status', 'city'].includes(field))) {
        setCurrentStep(1);
      } else if (errorFields.some(field => ['bedrooms', 'bathrooms', 'area', 'parking'].includes(field))) {
        setCurrentStep(2);
      } else if (errorFields.includes('images')) {
        setCurrentStep(3);
      }
      
      return;
    }

    setLoading(true);
    try {
      const currentFormData = formDataRef.current;
      const basicData: CreatePropertyData = {
        titleEn: currentFormData.titleEn,
        titleAr: currentFormData.titleAr,
        descriptionEn: currentFormData.descriptionEn,
        descriptionAr: currentFormData.descriptionAr,
        price: currentFormData.price,
        type: currentFormData.type,
        status: currentFormData.status,
        city: currentFormData.city,
        district: currentFormData.district,
        bedrooms: currentFormData.bedrooms,
        bathrooms: currentFormData.bathrooms,
        area: currentFormData.area,
        parking: currentFormData.parking,
        features: currentFormData.features,
        images: currentFormData.images
      };

      console.log('Submitting property data:', basicData);
      
      await PropertiesService.update(propertyId, basicData);
      
      // Update original data to reflect saved state
      setOriginalData(currentFormData);
      setHasChanges(false);
      
      // Show success message
      alert(isRTL ? 'تم تحديث العقار بنجاح!' : 'Property updated successfully!');
      
      // Redirect to properties list
      router.push(`/${locale}/dashboard/p`);
      
    } catch (error) {
      console.error('Error updating property:', error);
      const errorMessage = error instanceof Error ? error.message : commonT('error');
      alert(isRTL ? `خطأ في تحديث العقار: ${errorMessage}` : `Error updating property: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const propertyTypes = [
    { value: 'APARTMENT', label: isRTL ? 'شقة' : 'Apartment', icon: Building },
    { value: 'VILLA', label: isRTL ? 'فيلا' : 'Villa', icon: Home },
    { value: 'OFFICE', label: isRTL ? 'مكتب' : 'Office', icon: Building2 },
    { value: 'SHOP', label: isRTL ? 'متجر' : 'Shop', icon: Building2 }
  ];

  const statusOptions = [
    { value: 'AVAILABLE', label: isRTL ? 'متاح' : 'Available' },
    { value: 'RENTED', label: isRTL ? 'مؤجر' : 'Rented' },
    { value: 'SOLD', label: isRTL ? 'مباع' : 'Sold' }
  ];

  const steps = [
    { number: 1, title: isRTL ? 'المعلومات الأساسية' : 'Basic Information', icon: Building2 },
    { number: 2, title: isRTL ? 'تفاصيل العقار' : 'Property Details', icon: Home },
    { number: 3, title: isRTL ? 'الصور والوسائط' : 'Images & Media', icon: ImageIcon }
  ];

  const nextStep = () => {
    if (validateCurrentStep()) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      alert(isRTL 
        ? "يرجى ملء جميع الحقول المطلوبة بشكل صحيح"
        : "Please fill in all required fields correctly"
      );
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Allow direct navigation to completed steps
  const goToStep = (stepNumber: number) => {
    if (stepNumber <= currentStep || stepCompleted[stepNumber]) {
      setCurrentStep(stepNumber);
    }
  };

  if (loadingProperty) {
    return (
      <div className="min-h-screen bg-background px-4 py-8 text-foreground" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="mx-auto max-w-6xl">
          <div className="py-12 text-center">
            <div className="text-lg text-muted-foreground">{commonT('loading')}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8 text-foreground" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href={`/${locale}/dashboard/p`}
            className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            {isRTL ? 'العودة إلى العقارات' : 'Back to Properties'}
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-foreground">
                {isRTL ? 'تعديل العقار' : 'Edit Property'}
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                {isRTL ? 'تعديل معلومات العقار الحالي' : 'Edit current property information'}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                {isRTL ? `الخطوة ${currentStep} من ${steps.length}` : `Step ${currentStep} of ${steps.length}`}
              </div>
              <div className="text-sm text-muted-foreground">
                {steps[currentStep - 1].title}
              </div>
            </div>
          </div>
        </div>

        {/* Progress with clickable steps */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.number;
                const isCompleted = stepCompleted[step.number];
                const canNavigate = step.number <= currentStep || isCompleted;
                
                return (
                  <div key={step.number} className="flex items-center">
                    <button
                      type="button"
                      onClick={() => canNavigate && goToStep(step.number)}
                      className={`flex size-12 items-center justify-center rounded-full border-2 transition-all ${
                        isActive 
                          ? 'border-primary bg-primary text-white' 
                          : isCompleted 
                          ? 'cursor-pointer border-green-500 bg-green-500 text-white hover:bg-green-600'
                          : canNavigate
                          ? 'cursor-pointer border-muted-foreground bg-background text-muted-foreground hover:border-primary/50'
                          : 'border-muted-foreground bg-muted text-muted-foreground'
                      }`}
                      disabled={!canNavigate}
                    >
                      {isCompleted ? (
                        <CheckCircle className="size-5" />
                      ) : (
                        <Icon className="size-5" />
                      )}
                    </button>
                    <div className={isRTL ? "mr-3" : "ml-3"}>
                      <div className={`text-sm font-medium ${
                        isActive ? 'text-primary' : isCompleted ? 'text-green-600' : 'text-muted-foreground'
                      }`}>
                        {step.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {isCompleted 
                          ? (isRTL ? 'مكتمل' : 'Completed')
                          : (isActive ? (isRTL ? 'جاري' : 'Current') : (isRTL ? 'قيد الانتظار' : 'Pending'))
                        }
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`mx-4 h-0.5 w-16 ${
                        stepCompleted[step.number] ? 'bg-green-500' : 'bg-muted-foreground'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Step completion status */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm">
            <div className={`flex items-center gap-1 ${stepCompleted[1] ? 'text-green-600' : 'text-muted-foreground'}`}>
              {stepCompleted[1] ? <CheckCircle className="size-4" /> : <div className="size-2 rounded-full bg-muted-foreground" />}
              <span>{isRTL ? 'المعلومات الأساسية' : 'Basic Information'}</span>
            </div>
            <span className="text-muted-foreground">•</span>
            <div className={`flex items-center gap-1 ${stepCompleted[2] ? 'text-green-600' : 'text-muted-foreground'}`}>
              {stepCompleted[2] ? <CheckCircle className="size-4" /> : <div className="size-2 rounded-full bg-muted-foreground" />}
              <span>{isRTL ? 'تفاصيل العقار' : 'Property Details'}</span>
            </div>
            <span className="text-muted-foreground">•</span>
            <div className={`flex items-center gap-1 ${stepCompleted[3] ? 'text-green-600' : 'text-muted-foreground'}`}>
              {stepCompleted[3] ? <CheckCircle className="size-4" /> : <div className="size-2 rounded-full bg-muted-foreground" />}
              <span>{isRTL ? 'الصور والوسائط' : 'Images & Media'}</span>
            </div>
          </div>
        </div>

        {/* Changes Indicator */}
        {hasChanges && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="size-5 text-orange-600" />
                  <span className="font-medium text-orange-800">
                    {isRTL ? 'لديك تغييرات غير محفوظة' : 'You have unsaved changes'}
                  </span>
                </div>
                <Button variant="outline" size="sm" onClick={resetToOriginal}>
                  <RotateCcw className="mr-2 size-4" />
                  {isRTL ? 'إعادة التعيين' : 'Reset Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* No Images Warning */}
        {!stepCompleted[3] && currentStep === 3 && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="size-5 text-orange-600" />
                <span className="font-medium text-orange-800">
                  {isRTL ? 'يرجى رفع صورة واحدة على الأقل قبل الحفظ' : 'Please upload at least one image before saving'}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Home className="size-5 text-primary" />
                  {isRTL ? 'المعلومات الأساسية' : 'Basic Information'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Property Type */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">
                    {isRTL ? 'نوع العقار' : 'Property Type'} <RequiredIndicator />
                  </Label>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {propertyTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => updateFormData('type', type.value)}
                          className={`rounded-lg border-2 p-4 transition-all hover:shadow-md ${
                            formData.type === type.value
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <Icon className="mx-auto mb-2 size-8" />
                          <div className="text-sm font-medium">{type.label}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                {/* Price and Status */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-base font-semibold">
                      <DollarSign className="mr-2 inline size-4" />
                      {isRTL ? 'السعر (دولار)' : 'Price (USD)'} <RequiredIndicator />
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price || ''}
                      onChange={(e) => updateFormData('price', parseFloat(e.target.value) || 0)}
                      placeholder={isRTL ? 'أدخل سعر العقار' : 'Enter property price'}
                      className={`text-lg ${fieldErrors.price ? 'border-destructive' : ''}`}
                      required
                    />
                    {fieldErrors.price && (
                      <p className="flex items-center gap-1 text-sm text-destructive">
                        <AlertCircle className="size-3" />
                        {fieldErrors.price}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-base font-semibold">
                      <Calendar className="mr-2 inline size-4" />
                      {isRTL ? 'الحالة' : 'Status'} <RequiredIndicator />
                    </Label>
                    <Select value={formData.status} onValueChange={(val) => updateFormData('status', val)}>
                      <SelectTrigger className={fieldErrors.status ? 'border-destructive' : ''}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-base font-semibold">
                    <MapPin className="size-4" />
                    {isRTL ? 'الموقع' : 'Location'}
                  </Label>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="city">
                        {isRTL ? 'المدينة' : 'City'} <RequiredIndicator />
                      </Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => updateFormData('city', e.target.value)}
                        placeholder={isRTL ? 'أدخل المدينة' : 'Enter city'}
                        className={fieldErrors.city ? 'border-destructive' : ''}
                        required
                      />
                      {fieldErrors.city && (
                        <p className="flex items-center gap-1 text-sm text-destructive">
                          <AlertCircle className="size-3" />
                          {fieldErrors.city}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="district">{isRTL ? 'المنطقة/الحي' : 'District/Area'}</Label>
                      <Input
                        id="district"
                        value={formData.district}
                        onChange={(e) => updateFormData('district', e.target.value)}
                        placeholder={isRTL ? 'أدخل المنطقة أو الحي' : 'Enter district or area'}
                      />
                    </div>
                  </div>
                </div>

                {/* Content - English */}
                <div className="space-y-4">
                  <h3 className="border-b border-border pb-2 text-lg font-semibold">
                    {isRTL ? 'المحتوى الإنجليزي' : 'English Content'}
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="titleEn">
                        {isRTL ? 'عنوان العقار' : 'Property Title'} <RequiredIndicator />
                      </Label>
                      <Input
                        id="titleEn"
                        value={formData.titleEn}
                        onChange={(e) => updateFormData('titleEn', e.target.value)}
                        placeholder={isRTL ? 'أدخل عنوان العقار بالإنجليزية' : 'Enter property title in English'}
                        className={fieldErrors.titleEn ? 'border-destructive' : ''}
                        required
                      />
                      {fieldErrors.titleEn && (
                        <p className="flex items-center gap-1 text-sm text-destructive">
                          <AlertCircle className="size-3" />
                          {fieldErrors.titleEn}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="descriptionEn">{isRTL ? 'الوصف' : 'Description'}</Label>
                      <RichTextEditor
                        value={formData.descriptionEn}
                        onChange={(value) => updateFormData('descriptionEn', value)}
                        placeholder={isRTL ? 'أدخل وصف مفصل للعقار بالإنجليزية' : 'Enter detailed property description in English'}
                        isRTL={false}
                      />
                    </div>
                  </div>
                </div>

                {/* Content - Arabic */}
                <div className="space-y-4" dir="rtl">
                  <h3 className="border-b border-border pb-2 text-lg font-semibold">المحتوى العربي</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="titleAr">
                        عنوان العقار <RequiredIndicator />
                      </Label>
                      <Input
                        id="titleAr"
                        value={formData.titleAr}
                        onChange={(e) => updateFormData('titleAr', e.target.value)}
                        placeholder="أدخل عنوان العقار بالعربية"
                        className={`text-right ${fieldErrors.titleAr ? 'border-destructive' : ''}`}
                        required
                        dir="rtl"
                      />
                      {fieldErrors.titleAr && (
                        <p className="flex items-center gap-1 text-sm text-destructive">
                          <AlertCircle className="size-3" />
                          {fieldErrors.titleAr}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="descriptionAr">الوصف</Label>
                      <RichTextEditor
                        value={formData.descriptionAr}
                        onChange={(value) => updateFormData('descriptionAr', value)}
                        placeholder="أدخل وصف مفصل للعقار بالعربية"
                        isRTL={true}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Property Details */}
          {currentStep === 2 && (
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Building className="size-5 text-primary" />
                  {isRTL ? 'تفاصيل العقار' : 'Property Details'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Details */}
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Bed className="size-4" />
                      {isRTL ? 'غرف النوم' : 'Bedrooms'} <RequiredIndicator />
                    </Label>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => updateFormData('bedrooms', Math.max(1, formData.bedrooms - 1))}
                      >
                        <Minus className="size-4" />
                      </Button>
                      <Input
                        type="number"
                        value={formData.bedrooms}
                        onChange={(e) => updateFormData('bedrooms', parseInt(e.target.value) || 1)}
                        className={`text-center ${fieldErrors.bedrooms ? 'border-destructive' : ''}`}
                        min="1"
                        required
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => updateFormData('bedrooms', formData.bedrooms + 1)}
                      >
                        <Plus className="size-4" />
                      </Button>
                    </div>
                    {fieldErrors.bedrooms && (
                      <p className="flex items-center gap-1 text-sm text-destructive">
                        <AlertCircle className="size-3" />
                        {fieldErrors.bedrooms}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Bath className="size-4" />
                      {isRTL ? 'الحمامات' : 'Bathrooms'} <RequiredIndicator />
                    </Label>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => updateFormData('bathrooms', Math.max(1, formData.bathrooms - 1))}
                      >
                        <Minus className="size-4" />
                      </Button>
                      <Input
                        type="number"
                        value={formData.bathrooms}
                        onChange={(e) => updateFormData('bathrooms', parseInt(e.target.value) || 1)}
                        className={`text-center ${fieldErrors.bathrooms ? 'border-destructive' : ''}`}
                        min="1"
                        required
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => updateFormData('bathrooms', formData.bathrooms + 1)}
                      >
                        <Plus className="size-4" />
                      </Button>
                    </div>
                    {fieldErrors.bathrooms && (
                      <p className="flex items-center gap-1 text-sm text-destructive">
                        <AlertCircle className="size-3" />
                        {fieldErrors.bathrooms}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Square className="size-4" />
                      {isRTL ? 'المساحة (م²)' : 'Area (m²)'} <RequiredIndicator />
                    </Label>
                    <Input
                      type="number"
                      value={formData.area}
                      onChange={(e) => updateFormData('area', parseInt(e.target.value) || 0)}
                      placeholder={isRTL ? 'أدخل المساحة' : 'Enter area'}
                      className={fieldErrors.area ? 'border-destructive' : ''}
                      min="1"
                      required
                    />
                    {fieldErrors.area && (
                      <p className="flex items-center gap-1 text-sm text-destructive">
                        <AlertCircle className="size-3" />
                        {fieldErrors.area}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Car className="size-4" />
                      {isRTL ? 'مواقف السيارات' : 'Parking'} <RequiredIndicator />
                    </Label>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => updateFormData('parking', Math.max(0, formData.parking - 1))}
                      >
                        <Minus className="size-4" />
                      </Button>
                      <Input
                        type="number"
                        value={formData.parking}
                        onChange={(e) => updateFormData('parking', parseInt(e.target.value) || 0)}
                        className="text-center"
                        min="0"
                        required
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => updateFormData('parking', formData.parking + 1)}
                      >
                        <Plus className="size-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Images & Media */}
          {currentStep === 3 && (
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ImageIcon className="size-5 text-primary" />
                  {isRTL ? 'الصور والوسائط' : 'Images & Media'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-2xl border-2 border-dashed border-border bg-muted/20 p-8 text-center transition-colors hover:bg-muted/40">
                  <Upload className="mx-auto mb-4 size-12 text-muted-foreground" />
                  <h3 className="mb-2 text-lg font-semibold">
                    {isRTL ? 'رفع صور العقار' : 'Upload Property Images'}
                  </h3>
                  <p className="mx-auto mb-6 max-w-md text-muted-foreground">
                    {isRTL 
                      ? 'اسحب وأفلت صورك هنا، أو انقر للتصفح. التنسيقات المدعومة: JPG, PNG, WEBP (الحد الأقصى 12 صورة)'
                      : 'Drag and drop your images here, or click to browse. Supported formats: JPG, PNG, WEBP (Max 12 images)'
                    }
                  </p>
                  <CustomUploader
                    bucket="IMAGES"
                    onMultipleUploadComplete={handleImageUpload}
                    buttonText={isRTL ? "اختر الصور" : "Select Images"}
                    multiple={true}
                    maxFiles={12}
                    acceptedFileTypes="image"
                  />
                </div>

                {formData.images.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-base font-semibold">
                        {isRTL ? `الصور المرفوعة (${formData.images.length})` : `Uploaded Images (${formData.images.length})`}
                      </Label>
                      <Badge variant="secondary">
                        {formData.images.length} / 12 {isRTL ? 'صورة' : 'images'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                      {formData.images.map((url, idx) => (
                        <div key={idx} className="group relative aspect-square">
                          <img 
                            src={url} 
                            alt={isRTL ? `صورة العقار ${idx + 1}` : `Property image ${idx + 1}`}
                            className="size-full rounded-lg border-2 border-border object-cover" 
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100"
                          >
                            <X className="size-4" />
                          </button>
                          <div className="absolute bottom-2 left-2 rounded bg-black/50 px-2 py-1 text-xs text-white">
                            {idx + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Button 
              type="button" 
              variant="outline" 
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              {isRTL ? 'السابق' : 'Previous'}
            </Button>
            
            <div className="flex gap-3">
              <Button type="button" variant="outline" asChild>
                <Link href={`/${locale}/dashboard/p`}>
                  {isRTL ? 'إلغاء' : 'Cancel'}
                </Link>
              </Button>
              
              {currentStep < steps.length ? (
                <Button 
                  type="button" 
                  onClick={nextStep}
                  disabled={!stepCompleted[currentStep]}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isRTL ? 'الخطوة التالية' : 'Next Step'}
                  {stepCompleted[currentStep] && <CheckCircle className="ml-2 size-4" />}
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  disabled={loading || !hasChanges || !stepCompleted[1] || !stepCompleted[2] || !stepCompleted[3]}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  {loading ? (
                    <>
                      <Save className="mr-2 size-4 animate-spin" />
                      {isRTL ? 'جاري تحديث العقار...' : 'Updating Property...'}
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 size-4" />
                      {isRTL ? 'تحديث العقار' : 'Update Property'}
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}