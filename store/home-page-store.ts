// store/home-page-store.ts
import { create } from 'zustand';
import { HomePageStore } from './ts/home-page-store-types';
import { defaultData } from './constants/home-page-store-constants';

export const useHomePageStore = create<HomePageStore>((set, get) => ({
  data: defaultData,
  currentLang: 'en',
  isLoading: false,
  isSaving: false,
  
  setCurrentLang: (lang) => set({ currentLang: lang }),
  
  setData: (newData) => set({ data: newData }),
  
  // Updated loadData to use actual API
  loadData: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/home-page');
      const result = await response.json();
      
      if (result.success) {
        set({ data: result.data, isLoading: false });
        return result.data;
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      set({ isLoading: false });
      throw error;
    }
  },
  
  // Updated saveData to use actual API
  saveData: async () => {
    set({ isSaving: true });
    try {
      const { data } = get();
      
      const response = await fetch('/api/home-page', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (result.success) {
        set({ isSaving: false });
        return true;
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error saving data:', error);
      set({ isSaving: false });
      return false;
    }
  },
  
  // All your existing update methods remain the same...
  updateData: (updates, lang = get().currentLang) => set((state) => ({
    data: {
      ...state.data,
      [lang]: { ...state.data[lang], ...updates }
    }
  })),
  
  updateHero: (updates, lang = get().currentLang) => set((state) => ({
    data: {
      ...state.data,
      [lang]: {
        ...state.data[lang],
        hero: { ...state.data[lang].hero, ...updates }
      }
    }
  })),
  
  updateHeroButton: (type, updates, lang = get().currentLang) => set((state) => ({
    data: {
      ...state.data,
      [lang]: {
        ...state.data[lang],
        hero: {
          ...state.data[lang].hero,
          [`${type}Button`]: { 
            ...state.data[lang].hero[`${type}Button`], 
            ...updates 
          }
        }
      }
    }
  })),
  
  addBanner: (banner, lang = get().currentLang) => set((state) => ({
    data: {
      ...state.data,
      [lang]: {
        ...state.data[lang],
        banners: [...state.data[lang].banners, banner]
      }
    }
  })),
  
  updateBanner: (id, updates, lang = get().currentLang) => set((state) => ({
    data: {
      ...state.data,
      [lang]: {
        ...state.data[lang],
        banners: state.data[lang].banners.map(banner =>
          banner.id === id ? { ...banner, ...updates } : banner
        )
      }
    }
  })),
  
  removeBanner: (id, lang = get().currentLang) => set((state) => ({
    data: {
      ...state.data,
      [lang]: {
        ...state.data[lang],
        banners: state.data[lang].banners.filter(banner => banner.id !== id)
      }
    }
  })),
  
  updateWhyUs: (updates, lang = get().currentLang) => set((state) => ({
    data: {
      ...state.data,
      [lang]: {
        ...state.data[lang],
        whyUs: { ...state.data[lang].whyUs, ...updates }
      }
    }
  })),
  
  addFeature: (feature, lang = get().currentLang) => set((state) => ({
    data: {
      ...state.data,
      [lang]: {
        ...state.data[lang],
        whyUs: {
          ...state.data[lang].whyUs,
          features: [...state.data[lang].whyUs.features, feature]
        }
      }
    }
  })),
  
  updateFeature: (id, updates, lang = get().currentLang) => set((state) => ({
    data: {
      ...state.data,
      [lang]: {
        ...state.data[lang],
        whyUs: {
          ...state.data[lang].whyUs,
          features: state.data[lang].whyUs.features.map(feature =>
            feature.id === id ? { ...feature, ...updates } : feature
          )
        }
      }
    }
  })),
  
  removeFeature: (id, lang = get().currentLang) => set((state) => ({
    data: {
      ...state.data,
      [lang]: {
        ...state.data[lang],
        whyUs: {
          ...state.data[lang].whyUs,
          features: state.data[lang].whyUs.features.filter(feature => feature.id !== id)
        }
      }
    }
  })),
  
  updateTestimonials: (updates, lang = get().currentLang) => set((state) => ({
    data: {
      ...state.data,
      [lang]: {
        ...state.data[lang],
        testimonials: { ...state.data[lang].testimonials, ...updates }
      }
    }
  })),
  
  addTestimonial: (testimonial, lang = get().currentLang) => set((state) => ({
    data: {
      ...state.data,
      [lang]: {
        ...state.data[lang],
        testimonials: {
          ...state.data[lang].testimonials,
          testimonials: [...state.data[lang].testimonials.testimonials, testimonial]
        }
      }
    }
  })),
  
  updateTestimonial: (id, updates, lang = get().currentLang) => set((state) => ({
    data: {
      ...state.data,
      [lang]: {
        ...state.data[lang],
        testimonials: {
          ...state.data[lang].testimonials,
          testimonials: state.data[lang].testimonials.testimonials.map(testimonial =>
            testimonial.id === id ? { ...testimonial, ...updates } : testimonial
          )
        }
      }
    }
  })),
  
  removeTestimonial: (id, lang = get().currentLang) => set((state) => ({
    data: {
      ...state.data,
      [lang]: {
        ...state.data[lang],
        testimonials: {
          ...state.data[lang].testimonials,
          testimonials: state.data[lang].testimonials.testimonials.filter(testimonial => testimonial.id !== id)
        }
      }
    }
  })),
  
  updateAboutUs: (updates, lang = get().currentLang) => set((state) => ({
    data: {
      ...state.data,
      [lang]: {
        ...state.data[lang],
        aboutUs: { ...state.data[lang].aboutUs, ...updates }
      }
    }
  })),
  
  addStat: (stat, lang = get().currentLang) => set((state) => ({
    data: {
      ...state.data,
      [lang]: {
        ...state.data[lang],
        aboutUs: {
          ...state.data[lang].aboutUs,
          stats: [...state.data[lang].aboutUs.stats, stat]
        }
      }
    }
  })),
  
  updateStat: (id, updates, lang = get().currentLang) => set((state) => ({
    data: {
      ...state.data,
      [lang]: {
        ...state.data[lang],
        aboutUs: {
          ...state.data[lang].aboutUs,
          stats: state.data[lang].aboutUs.stats.map(stat =>
            stat.id === id ? { ...stat, ...updates } : stat
          )
        }
      }
    }
  })),
  
  removeStat: (id, lang = get().currentLang) => set((state) => ({
    data: {
      ...state.data,
      [lang]: {
        ...state.data[lang],
        aboutUs: {
          ...state.data[lang].aboutUs,
          stats: state.data[lang].aboutUs.stats.filter(stat => stat.id !== id)
        }
      }
    }
  })),
  
  updateContactUs: (updates, lang = get().currentLang) => set((state) => ({
    data: {
      ...state.data,
      [lang]: {
        ...state.data[lang],
        contactUs: { ...state.data[lang].contactUs, ...updates }
      }
    }
  })),
  
  updateContactData: (contactData, lang = get().currentLang) => set((state) => ({
    data: {
      ...state.data,
      [lang]: {
        ...state.data[lang],
        contactUs: contactData
      }
    }
  })),
  
  addContactFormField: (field, lang = get().currentLang) => set((state) => ({
    data: {
      ...state.data,
      [lang]: {
        ...state.data[lang],
        contactUs: {
          ...state.data[lang].contactUs,
          form: {
            ...state.data[lang].contactUs.form,
            fields: [...state.data[lang].contactUs.form.fields, field]
          }
        }
      }
    }
  })),
  
  updateContactFormField: (index, updates, lang = get().currentLang) => set((state) => {
    const updatedFields = [...state.data[lang].contactUs.form.fields];
    updatedFields[index] = { ...updatedFields[index], ...updates };
    
    return {
      data: {
        ...state.data,
        [lang]: {
          ...state.data[lang],
          contactUs: {
            ...state.data[lang].contactUs,
            form: {
              ...state.data[lang].contactUs.form,
              fields: updatedFields
            }
          }
        }
      }
    };
  }),
  
  removeContactFormField: (index, lang = get().currentLang) => set((state) => ({
    data: {
      ...state.data,
      [lang]: {
        ...state.data[lang],
        contactUs: {
          ...state.data[lang].contactUs,
          form: {
            ...state.data[lang].contactUs.form,
            fields: state.data[lang].contactUs.form.fields.filter((_, i) => i !== index)
          }
        }
      }
    }
  }))
}));