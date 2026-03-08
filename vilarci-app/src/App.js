import React, { useEffect, useRef } from 'react';
import { App as CapacitorApp } from '@capacitor/app';

function App() {
  const iframeRef = useRef(null);

  // 1. PURE DOM OFFLINE LISTENER (No React state = no iframe resets!)
  useEffect(() => {
    const overlay = document.getElementById('vilarci-offline-overlay');

    const handleOnline = () => { if (overlay) overlay.style.display = 'none'; };
    const handleOffline = () => { if (overlay) overlay.style.display = 'flex'; };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check when app opens
    if (!navigator.onLine && overlay) overlay.style.display = 'flex';

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // 2. HARDWARE BACK BUTTON BRIDGE
  useEffect(() => {
    let backListener = null;
    const setupBackButton = async () => {
      backListener = await CapacitorApp.addListener('backButton', () => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
          iframeRef.current.contentWindow.postMessage({ type: 'HARDWARE_BACK' }, '*');
        }
      });
    };
    setupBackButton();
    return () => { if (backListener) backListener.remove(); };
  }, []);

  // 3. EXIT APP LISTENER
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'EXIT_APP') CapacitorApp.exitApp();
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div style={{ margin: 0, padding: 0, width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#d32f2f', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* THE EXTRA NAVBAR: Protects the battery/notch space natively */}
      <div style={{ height: 'env(safe-area-inset-top, 40px)', backgroundColor: '#d32f2f', width: '100%', zIndex: 9999 }}></div>

      {/* PURE DOM OFFLINE OVERLAY: Hidden by default, controlled directly by the OS */}
      <div id="vilarci-offline-overlay" style={{
        display: 'none',
        position: 'absolute', top: 'env(safe-area-inset-top, 40px)', left: 0, right: 0, bottom: 0,
        flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', zIndex: 10000, textAlign: 'center', fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <svg style={{ width: '70px', height: '70px', opacity: 0.3, marginBottom: '20px' }} viewBox="0 0 24 24" fill="none" stroke="#d32f2f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path><path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
        <h1 style={{ color: '#d32f2f', fontStyle: 'italic', margin: '0 0 5px 0', fontSize: '28px', fontWeight: 900, letterSpacing: '-1px' }}>Vilarci</h1>
        <p style={{ margin: '0 0 25px 0', color: '#6b7280', fontSize: '15px', lineHeight: 1.4, padding: '0 40px' }}>You're offline.<br/>Waiting for connection...</p>
        <div style={{ border: '3px solid #f3f3f3', borderTop: '3px solid #d32f2f', borderRadius: '50%', width: '26px', height: '26px', animation: 'spin 0.8s linear infinite' }}><style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style></div>
      </div>

      {/* THE APP IFRAME: Rendered once, never resets! */}
      <iframe 
        ref={iframeRef}
        src="https://krishnendu-kar.github.io/vilarci/" 
        title="Vilarci App"
        style={{ 
          flex: 1, 
          height: '100%', /* 🔴 ONLY THIS CHANGED: Forces the iframe to be scrollable */
          width: '100%', 
          border: 'none', 
          display: 'block', 
          margin: 0, 
          padding: 0, 
          backgroundColor: '#ffffff' 
        }}
        allow="geolocation; microphone; camera"
      />
    </div>
  );
}

export default App;