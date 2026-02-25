import React, { createContext, useState, useEffect, useContext } from 'react';
import { Network } from '@capacitor/network';

const SyncContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSync = () => useContext(SyncContext);

export const SyncProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(true);
  const [syncStatus, setSyncStatus] = useState('Idle');

  useEffect(() => {
    Network.getStatus().then(status => {
      setIsOnline(status.connected);
      if (status.connected) triggerSync();
    });

    const listener = Network.addListener('networkStatusChange', status => {
      setIsOnline(status.connected);
      if (status.connected) {
        triggerSync();
      } else {
        setSyncStatus('Offline');
      }
    });

    return () => listener.remove();
  }, []);

  const triggerSync = async () => {
    setSyncStatus('Syncing...');
    
    // BACKEND SERVER PORT
const SERVER_URL = 'http://127.0.0.1:5000';

    try {
      // 🚀 STEP A: PUSH LOCAL CHANGES TO SERVER FIRST
      const queue = JSON.parse(localStorage.getItem('syncQueue') || '[]');
      
      for (const task of queue) {
        if (task.type === 'UPDATE_PROFILE') {
          await fetch(`${SERVER_URL}/api/profile`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task.payload)
          });
          console.log("🔼 PUSHED local data to laptop:", task.payload);
        }
      }

      // Clear the queue once pushed successfully
      localStorage.setItem('syncQueue', '[]');

      // 📥 STEP B: PULL FRESH DATA FROM SERVER SECOND
      const response = await fetch(`${SERVER_URL}/api/profile`);
      if (response.ok) {
        const serverData = await response.json();
        localStorage.setItem('userProfileData', JSON.stringify(serverData));
        console.log("🔽 PULLED fresh data from laptop:", serverData);
      }

      setSyncStatus('Up to date');
      window.dispatchEvent(new Event('storage')); // Reload UI immediately

    } catch (error) {
      console.error("Server unreachable:", error.message);
      setSyncStatus('Server Offline - Local Mode');
    }
  };

  const saveAction = (type, payload) => {
    if (type === 'UPDATE_PROFILE') {
        localStorage.setItem('userProfileData', JSON.stringify(payload));
    }
    const queue = JSON.parse(localStorage.getItem('syncQueue') || '[]');
    queue.push({ type, payload, timestamp: new Date().toISOString() });
    localStorage.setItem('syncQueue', JSON.stringify(queue));

    if (isOnline) triggerSync();
  };

  return (
    <SyncContext.Provider value={{ isOnline, syncStatus, saveAction }}>
      {syncStatus !== 'Up to date' && syncStatus !== 'Idle' && (
        <div style={{ background: isOnline ? '#f59e0b' : '#ef4444', color: 'white', fontSize: '11px', textAlign: 'center', padding: '4px', position: 'fixed', top: 0, width: '100%', zIndex: 9999, fontWeight: 'bold' }}>
          {syncStatus}
        </div>
      )}
      {children}
    </SyncContext.Provider>
  );
};