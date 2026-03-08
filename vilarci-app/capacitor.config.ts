import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vilarci.customer',
  appName: 'Vilarci',
  webDir: 'public', // 🔴 Changed to 'public' so it directly grabs your offline page
  server: {
    url: 'https://krishnendu-kar.github.io/vilarci/', // 🔴 THE DIRECT NATIVE CONNECTION
    cleartext: true,
    errorPath: 'error.html',
    allowNavigation: [
      "*krishnendu-kar.github.io*",
      "*.github.io"
    ]
  },
  plugins: {
    StatusBar: {
      overlaysWebView: true,
      style: 'DARK' 
    }
  }
};

export default config;