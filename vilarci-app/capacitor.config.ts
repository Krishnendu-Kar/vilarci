import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vilarci.customer',
  appName: 'Vilarci',
  webDir: 'public', 
  server: {
    // We added ?source=vilarci_app so the website instantly knows it's the app!
    url: 'https://krishnendu-kar.github.io/vilarci/?source=vilarci_app', 
    cleartext: true,
    errorPath: 'error.html',
    allowNavigation: [
      "*krishnendu-kar.github.io*",
      "*.github.io"
    ]
  },
  plugins: {
    StatusBar: {
      overlaysWebView: false, // 🔴 ANDROID WILL NOW PUSH THE WEBSITE DOWN
      style: 'DARK', // Keeps the battery icons white
      backgroundColor: '#d32f2f' // 🔴 PAINTS THE NATIVE STATUS BAR VILARCI RED
    }
  }
};

export default config;