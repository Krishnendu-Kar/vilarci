import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vilarci.customer',
  appName: 'Vilarci',
  webDir: 'build',
  server: {
    // 🔴 REMOVED 'url' - Capacitor MUST load your local App.js shell!
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