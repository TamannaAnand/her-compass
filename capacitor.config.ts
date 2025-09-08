import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.c6c44d1009fd49bdab700ba5c33f4b2e',
  appName: 'A Lovable project',
  webDir: 'dist',
  server: {
    url: 'https://c6c44d10-09fd-49bd-ab70-0ba5c33f4b2e.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  bundledWebRuntime: false
};

export default config;