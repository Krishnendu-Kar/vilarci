import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vilarci.customer',
  appName: 'Vilarci',
  webDir: 'build', // 🔴 Back to 'build' so it loads your local App.js
  server: {
    cleartext: true,
    errorPath: 'error.html',
    allowNavigation: [
      "*krishnendu-kar.github.io*",
      "*.github.io"
    ]
  },
  plugins: {
    StatusBar: {
      overlaysWebView: true, // Lets the React app go underneath the battery icons
      style: 'DARK' 
    }
  }
};

export default config;