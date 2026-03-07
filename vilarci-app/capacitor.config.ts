import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vilarci.customer',
  appName: 'Vilarci',
  webDir: 'build',
  server: {
    url: 'https://krishnendu-kar.github.io/vilarci/',
    cleartext: true,
    errorPath: 'error.html'
  },
  plugins: {
    StatusBar: {
      overlaysWebView: false,
      style: 'DARK', // Makes battery/wifi icons white
      backgroundColor: '#8b0000' // Matches your website header
    }
  }
};

export default config;