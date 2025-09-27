import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const SETTINGS_FILE = path.join(DATA_DIR, 'global-settings.json');

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Default settings structure
const defaultSettings = {
  navigation: {
    mainLinks: [
      { id: '1', label: 'Home', href: '/', external: false, icon: 'home' },
      { id: '2', label: 'About', href: '/about', external: false, icon: 'info' },
    ],
    additionalMenus: [
      {
        id: '1',
        title: 'Products',
        items: [
          { id: '1-1', label: 'Web Design', href: '/products/web-design', external: false },
          { id: '1-2', label: 'Development', href: '/products/development', external: false },
        ]
      }
    ],
    backgroundColor: '#ffffff',
    textColor: '#000000',
    sticky: true,
  },
  footer: {
    copyrightText: '© 2024 My Company. All rights reserved.',
    sections: [
      {
        id: '1',
        title: 'Quick Links',
        links: [
          { id: '1-1', label: 'Home', href: '/', external: false },
          { id: '1-2', label: 'About', href: '/about', external: false },
        ]
      },
      {
        id: '2',
        title: 'Support',
        links: [
          { id: '2-1', label: 'Contact', href: '/contact', external: false },
          { id: '2-2', label: 'Help Center', href: '/help', external: false },
        ]
      }
    ],
    socialLinks: [
      { platform: 'facebook', url: 'https://facebook.com', icon: 'facebook' },
      { platform: 'twitter', url: 'https://twitter.com', icon: 'twitter' },
      { platform: 'instagram', url: 'https://instagram.com', icon: 'instagram' },
    ],
    backgroundColor: '#f8fafc',
    textColor: '#64748b',
    showSocialLinks: true,
  },
  logo: {
    imageUrl: '/logo.png',
    altText: 'Company Logo',
    width: 150,
    height: 50,
  },
  meta: {
    title: 'My Website',
    description: 'A modern website built with Next.js',
    keywords: 'website, nextjs, react',
    author: 'My Company',
    ogImage: '/og-image.jpg',
  },
};

// Read settings from JSON file
export async function readSettings(): Promise<any> {
  try {
    ensureDataDir();
    
    if (!fs.existsSync(SETTINGS_FILE)) {
      // Create file with default settings if it doesn't exist
      await writeSettings(defaultSettings);
      return defaultSettings;
    }
    
    const data = fs.readFileSync(SETTINGS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading settings:', error);
    return defaultSettings;
  }
}

// Write settings to JSON file
export async function writeSettings(settings: any): Promise<boolean> {
  try {
    ensureDataDir();
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing settings:', error);
    return false;
  }
}

// Update specific settings section
export async function updateSettingsSection(section: string, data: any): Promise<boolean> {
  try {
    const currentSettings = await readSettings();
    const updatedSettings = {
      ...currentSettings,
      [section]: data
    };
    return await writeSettings(updatedSettings);
  } catch (error) {
    console.error('Error updating settings section:', error);
    return false;
  }
}

// Reset settings to default
export async function resetSettings(): Promise<boolean> {
  return await writeSettings(defaultSettings);
}