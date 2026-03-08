import React, { useEffect, useRef, useState } from 'react';
import { App as CapacitorApp } from '@capacitor/app';

function App() {
  const iframeRef = useRef(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isRetrying, setIsRetrying] = useState(false);

  // 1. Native Network Listener
  useEffect(() => {
    const handleOnline = () => {
      setIsRetrying(true);
      setTimeout(() => {
        setIsOnline(true);
        setIsRetrying(false);
      }, 1000); 
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // 2. BULLETPROOF HARDWARE BACK BUTTON BRIDGE
  useEffect(() => {
    let backListener = null;

    const setupBackButton = async () => {
      backListener = await CapacitorApp.addListener('backButton', () => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
          // Fire the signal deep into the live website
          iframeRef.current.contentWindow.postMessage({ type: 'HARDWARE_BACK' }, '*');
        }
      });
    };
    
    setupBackButton();
    
    // Clean up ONLY this specific listener so React doesn't accidentally break it
    return () => {
      if (backListener) {
        backListener.remove();
      }
    };
  }, []);

  // 3. Exit App Listener
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'EXIT_APP') {
        CapacitorApp.exitApp();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const manualRetry = () => {
    if (navigator.onLine) {
      setIsRetrying(true);
      setTimeout(() => {
        setIsOnline(true);
        setIsRetrying(false);
      }, 800);
    } else {
      alert("Still no internet connection detected.");
    }
  };

  // 4. The Native Offline UI
  if (!isOnline) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        height: '100vh', width: '100vw', backgroundColor: '#ffffff', textAlign: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <svg style={{ width: '70px', height: '70px', opacity: 0.3, marginBottom: '20px' }} viewBox="0 0 24 24" fill="none" stroke="#d32f2f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="1" y1="1" x2="23" y2="23"></line>
          <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>
          <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>
          <path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path>
          <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path>
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
          <line x1="12" y1="20" x2="12.01" y2="20"></line>
        </svg>
        <h1 style={{ color: '#d32f2f', fontStyle: 'italic', margin: '0 0 5px 0', fontSize: '28px', fontWeight: 900, letterSpacing: '-1px' }}>Vilarci</h1>
        <p style={{ margin: '0 0 25px 0', color: '#6b7280', fontSize: '15px', lineHeight: 1.4, padding: '0 40px' }}>
          {isRetrying ? "Reconnecting..." : "You're offline.\nWaiting for connection..."}
        </p>
        {isRetrying ? (
          <div style={{ border: '3px solid #f3f3f3', borderTop: '3px solid #d32f2f', borderRadius: '50%', width: '26px', height: '26px', animation: 'spin 0.8s linear infinite' }}>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        ) : (
          <button onClick={manualRetry} style={{ backgroundColor: '#d32f2f', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px' }}>
            Retry Connection
          </button>
        )}
      </div>
    );
  }

  // 5. The Online App UI
  return (
    <div style={{ 
      margin: 0, padding: 0, width: '100vw', height: '100vh', overflow: 'hidden', 
      backgroundColor: '#d32f2f', display: 'flex', flexDirection: 'column'
    }}>
      <div style={{
        height: 'env(safe-area-inset-top, 0px)',
        backgroundColor: '#d32f2f',
        width: '100%'
      }}></div>
      <iframe 
        ref={iframeRef}
        src="https://krishnendu-kar.github.io/vilarci/?source=vilarci_app" 
        title="Vilarci App"
        style={{ flex: 1, width: '100%', border: 'none', display: 'block', margin: 0, padding: 0, backgroundColor: '#ffffff' }}
        allow="geolocation; microphone; camera"
      />
    </div>
  );
}

export default App;