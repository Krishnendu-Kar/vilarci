/**
 * UNIVERSAL SIDEBAR MANAGER
 * Automatically injects HTML/CSS and handles Amazon-style drill-down navigation.
 */

// 1. CONFIGURATION
const SB_URL_SIDEBAR = 'https://gxvcgubbqtccoycvdupq.supabase.co'; 
const SB_KEY_SIDEBAR = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4dmNndWJicXRjY295Y3ZkdXBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0ODA2MzQsImV4cCI6MjA4MDA1NjYzNH0.7Hobx-emspJQ7HLyjaWR-XQhzk948LWufq3OCimKk4w';
const sbClientSidebar = window.supabase.createClient(SB_URL_SIDEBAR, SB_KEY_SIDEBAR);

// 2. STATE
let menuHistory = [];
const currentParams = new URLSearchParams(window.location.search);

// 3. INITIALIZATION (Runs immediately)
document.addEventListener('DOMContentLoaded', () => {
    injectStyles();
    injectSidebarHTML();
    // Re-run icon render in case lucide is loaded later
    if(window.lucide) window.lucide.createIcons();
});

// 4. INJECT CSS
function injectStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
        /* Overlay */
        #usb-overlay {
            position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 9998;
            opacity: 0; visibility: hidden; transition: 0.3s; backdrop-filter: blur(2px);
        }
        #usb-overlay.open { opacity: 1; visibility: visible; }

        /* Sidebar Shell */
        #usb-sidebar {
            position: fixed; top: 0; left: 0; bottom: 0; width: 85%; max-width: 360px;
            background: white; z-index: 9999; transform: translateX(-100%);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex; flex-direction: column; box-shadow: 4px 0 15px rgba(0,0,0,0.1);
        }
        #usb-sidebar.open { transform: translateX(0); }

        /* Header */
        .usb-header {
            background: #111827; color: white; padding: 16px; display: flex; 
            align-items: center; justify-content: space-between; flex-shrink: 0;
        }
        
        /* Nav Bar (Back Button) */
        .usb-nav {
            background: #f3f4f6; padding: 12px 16px; border-bottom: 1px solid #e5e7eb;
            display: flex; align-items: center; gap: 10px; cursor: pointer;
            font-weight: 700; color: #374151; font-size: 14px; text-transform: uppercase;
            transition: 0.2s;
        }
        .usb-nav:hover { background: #e5e7eb; }
        .usb-nav.hidden { display: none; }

        /* Content List */
        .usb-content { flex: 1; overflow-y: auto; padding-bottom: 20px; }
        
        /* List Items */
        .usb-item {
            padding: 14px 20px; display: flex; justify-content: space-between; align-items: center;
            color: #374151; cursor: pointer; border-bottom: 1px solid #f9fafb; transition: 0.2s;
            font-size: 15px; font-weight: 500;
        }
        .usb-item:hover { background: #f3f4f6; color: #111827; }
        .usb-item.active { background: #eff6ff; color: #2563eb; font-weight: 700; border-left: 4px solid #2563eb; }
        
        /* Section Title */
        .usb-section-title {
            padding: 16px 20px 8px; font-weight: 800; font-size: 16px; color: #111827;
        }
        .usb-see-all {
            color: #4b5563; font-size: 14px; padding: 12px 20px;
        }
    `;
    document.head.appendChild(style);
}

// 5. INJECT HTML
function injectSidebarHTML() {
    const html = `
        <div id="usb-overlay" onclick="toggleSidebar()"></div>
        <div id="usb-sidebar">
            <div class="usb-header">
                <div style="display:flex; align-items:center; gap:10px;">
                    <div style="width:32px; height:32px; background:rgba(255,255,255,0.2); border-radius:50%; display:flex; align-items:center; justify-content:center;">
                        <i data-lucide="user" width="18" height="18"></i>
                    </div>
                    <span style="font-weight:700; font-size:18px;">Hello, Sign in</span>
                </div>
                <button onclick="toggleSidebar()" style="background:none; border:none; color:white; cursor:pointer;">
                    <i data-lucide="x" width="28" height="28"></i>
                </button>
            </div>

            <div id="usb-nav-header" class="usb-nav hidden" onclick="goBack()">
                <i data-lucide="arrow-left" width="18" height="18"></i>
                <span id="usb-title">MAIN MENU</span>
            </div>

            <div id="usb-content" class="usb-content"></div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
}

// 6. GLOBAL FUNCTIONS
window.toggleSidebar = function() {
    const sb = document.getElementById('usb-sidebar');
    const ov = document.getElementById('usb-overlay');
    
    if (sb.classList.contains('open')) {
        sb.classList.remove('open');
        ov.classList.remove('open');
    } else {
        sb.classList.add('open');
        ov.classList.add('open');
        loadMainCategories(); // Always reset to root when opening
    }
}

// 7. LOGIC
async function loadMainCategories() {
    menuHistory = [];
    updateHeader("Main Menu", false);
    renderLoading();

    const { data, error } = await sbClientSidebar.from('categories').select('*').order('name');
    
    if (error) return console.error(error);

    // Active Check: Is there a category_id in URL?
    const activeId = currentParams.get('category_id');

    let html = `<div class="usb-section-title">Shop By Category</div>`;
    
    data.forEach(cat => {
        // Highlight if this is the active category
        const isActive = activeId == cat.id ? 'active' : '';
        
        html += `
            <div class="usb-item ${isActive}" onclick="loadSubCategories('${cat.id}', '${escapeQuotes(cat.name)}')">
                <span>${cat.name}</span>
                <i data-lucide="chevron-right" width="16" height="16" style="opacity:0.5;"></i>
            </div>
        `;
    });

    render(html);
}

async function loadSubCategories(catId, catName) {
    menuHistory.push({ type: 'main' });
    updateHeader("MAIN MENU", true);
    renderLoading();

    const { data, error } = await sbClientSidebar.from('sub_categories').select('*').eq('category_id', catId).order('name');

    // "See All" Link Logic
    let html = `
        <div class="usb-section-title">${catName}</div>
        <div class="usb-item usb-see-all" onclick="window.location.href='product_list.html?category_id=${catId}'">
            See All in ${catName}
        </div>
        <div style="height:1px; background:#e5e7eb; margin:5px 0;"></div>
    `;

    const activeId = currentParams.get('sub_id'); // Check URL for sub_id

    if (data && data.length > 0) {
        data.forEach(sub => {
            const isActive = activeId == sub.id ? 'active' : '';
            html += `
                <div class="usb-item ${isActive}" onclick="loadSuperSub('${sub.id}', '${escapeQuotes(sub.name)}', '${catId}', '${catName}')">
                    <span>${sub.name}</span>
                    <i data-lucide="chevron-right" width="16" height="16" style="opacity:0.5;"></i>
                </div>
            `;
        });
    } else {
        html += `<div style="padding:20px; color:#9ca3af; text-align:center;">No sub-categories found.</div>`;
    }

    render(html);
}

async function loadSuperSub(subId, subName, parentId, parentName) {
    menuHistory.push({ type: 'sub', id: parentId, name: parentName });
    updateHeader(parentName, true);
    renderLoading();

    const { data } = await sbClientSidebar.from('super_sub_categories').select('*').eq('sub_category_id', subId).order('name');

    let html = `
        <div class="usb-section-title">${subName}</div>
        <div class="usb-item usb-see-all" onclick="window.location.href='product_list.html?sub_id=${subId}'">
            See All in ${subName}
        </div>
        <div style="height:1px; background:#e5e7eb; margin:5px 0;"></div>
    `;

    const activeId = currentParams.get('super_id'); // Check URL

    if (data && data.length > 0) {
        data.forEach(item => {
            const isActive = activeId == item.id ? 'active' : '';
            html += `
                <div class="usb-item ${isActive}" onclick="window.location.href='product_list.html?super_id=${item.id}'">
                    <span>${item.name}</span>
                </div>
            `;
        });
    } else {
        html += `<div style="padding:20px; color:#9ca3af; text-align:center;">No further categories.</div>`;
    }

    render(html);
}

// 8. HELPERS
window.goBack = function() {
    const prev = menuHistory.pop();
    if (!prev) return;
    if (prev.type === 'main') loadMainCategories();
    else if (prev.type === 'sub') loadSubCategories(prev.id, prev.name);
}

function updateHeader(text, showBack) {
    document.getElementById('usb-title').innerText = text;
    const nav = document.getElementById('usb-nav-header');
    if (showBack) nav.classList.remove('hidden');
    else nav.classList.add('hidden');
}

function render(html) {
    const container = document.getElementById('usb-content');
    container.innerHTML = html;
    container.scrollTop = 0;
    if(window.lucide) window.lucide.createIcons();
}

function renderLoading() {
    document.getElementById('usb-content').innerHTML = `
        <div style="display:flex; justify-content:center; align-items:center; height:150px;">
            <div style="width:30px; height:30px; border:3px solid #e5e7eb; border-top-color:#4f46e5; border-radius:50%; animation:usb-spin 1s linear infinite;"></div>
        </div>
        <style>@keyframes usb-spin {to{transform: rotate(360deg);}}</style>
    `;
}

function escapeQuotes(str) {
    return str.replace(/'/g, "\\'");
}