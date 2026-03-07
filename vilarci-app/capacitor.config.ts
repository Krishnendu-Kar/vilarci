import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vilarci.customer',
  appName: 'Vilarci',
  webDir: 'build',
  server: {
    url: 'https://krishnendu-kar.github.io/vilarci/',
    cleartext: true
  }
};

export default config;