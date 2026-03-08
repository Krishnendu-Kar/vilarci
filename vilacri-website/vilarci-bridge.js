// ==============================================================
// VILARCI APP BRIDGE: Connects Website to Android Native Shell
// ==============================================================
function initializeNativeApp() {
    // 1. BULLETPROOF NATIVE DETECTION
    const inIframe = window !== window.parent;
    if (!inIframe) return;
    
    if (document.body.classList.contains('is-native-app')) return;
    document.body.classList.add('is-native-app');

    // 2. NATIVE LOCKDOWN (Hides web scrollbars for native feel)
    const nativeCSS = `
        body.is-native-app ::-webkit-scrollbar {
            display: none;
        }
    `;
    const styleSheet = document.createElement('style');
    styleSheet.innerText = nativeCSS;
    document.head.appendChild(styleSheet);

    // 3. LISTEN FOR HARDWARE BACK BUTTON FROM APP.JS
    window.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'HARDWARE_BACK') {
            
            // A. Safely check if Sidebar exists and is open
            const sidebar = document.getElementById('usb-overlay');
            if (sidebar && sidebar.classList.contains('open')) {
                if (typeof sidebarGoBack === 'function' && typeof menuStack !== 'undefined' && menuStack.length > 1) {
                    sidebarGoBack();
                } else if (typeof closeSidebar === 'function') closeSidebar();
                return; 
            }
            
            // B. Safely check if Location Modal exists and is open
            const locModal = document.getElementById('loc-modal-overlay');
            if (locModal && locModal.classList.contains('open')) {
                if (typeof closeLocationModal === 'function') closeLocationModal();
                return; 
            }

            // C. Handle Page Navigation
            const path = window.location.pathname;
            const isHome = path === '/' || path === '/vilarci/' || path.endsWith('index.html') || path === '';
            
            if (!isHome && window.history.length > 1) {
                window.history.back(); // Natively go back one page!
            } else {
                window.parent.postMessage({ type: 'EXIT_APP' }, '*'); // Close app!
            }
        }
    });
}

// Run safely on load
document.addEventListener('DOMContentLoaded', initializeNativeApp);
setTimeout(initializeNativeApp, 500);