// ==========================================
// VILARCI UNIFIED HEADER & SIDEBAR COMPONENT
// ==========================================

// 1. STATE MANAGEMENT
let menuStack = [{ type: 'root', title: 'Main Menu', data: [] }];

// 2. COMPONENT CSS (Header + Sidebar)
const componentCSS = `
    /* --- HEADER STYLES --- */
    header { 
        position: fixed; 
        width: 100vw; 
        z-index: 99; 
        top: 0; 
        left: 0; 
        box-sizing: border-box; 
        font-family: 'Inter', system-ui, -apple-system, sans-serif; 
    }

    
    .border { 
        border: 1px solid transparent; 
        border-radius: 6px; 
        cursor: pointer; 
        transition: all 0.2s; 
    }
    .border:hover { 
        border: 1px solid rgba(255, 255, 255, 0.4); 
        background: rgba(255, 255, 255, 0.1); 
    }
    
    /* TOP NAVBAR */
    .navbar { 
        height: 56px; 
        width: 100%; 
        background: linear-gradient(90deg, #d32f2f, #e43e3e); 
        color: #ffffff; 
        display: flex; 
        align-items: center; 
        padding: 0 15px;
        gap: 15px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    /* LOGO AREA */
    .nav-logo { 
        display: flex; 
        align-items: center; 
        gap: 8px; 
        padding: 4px 8px;
    }
    .logo { 
        height: 32px; 
        width: 32px; 
        object-fit: cover; 
        border-radius: 50%;
        background: white;
        padding: 2px;
    }
    .logo-name { 
        font-size: 24px; 
        font-weight: 800; 
        letter-spacing: -0.5px;
    }
    
    /* LOCATION AREA */
    .nav-address { 
        display: flex; 
        flex-direction: column; 
        justify-content: center; 
        padding: 4px 10px;
        margin-right: auto; /* Pushes the links to the far right */
    }
    .location { 
        color: #ffd54f; /* Premium Gold/Yellow */
        font-size: 11px; 
        font-weight: 800; 
        text-transform: uppercase; 
        letter-spacing: 0.5px;
        margin-bottom: 2px;
        line-height: 1;
    }
    .location-name { 
        font-size: 14px; 
        font-weight: 700; 
        display: flex; 
        align-items: center; 
        gap: 5px;
        line-height: 1;
        white-space: nowrap;
    }
    
    /* LINKS AREA */
    .nav-links {
        display: flex;
        align-items: center;
        gap: 4px;
    }
    .nav-links a { 
        text-decoration: none; 
        color: #ffffff; 
        font-weight: 600; 
        font-size: 15px; 
        padding: 8px 12px; 
        white-space: nowrap;
    }
/* --- ULTRA PREMIUM PROFILE BUTTON --- */
    .profile-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        background: #e43e3e;
        color: #fbe1f8 !important; /* Vilarci Red text/icon */
        
        border-radius: 50px !important; /* Perfect Pill Shape */
        font-weight: 800 !important;
        font-size: 15px;
        text-decoration: none;
         transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    }
    .profile-btn i {
        font-size: 22px;
    }
    .profile-btn:hover {
        background: #fff9f9;
        color: #c62828 !important; /* Darker red on hover */
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
        border-color: #ce093a; /* Premium gold ring on hover */
    }
    @media (max-width: 300px) {
        .profile-text { display: none; } /* Hides text on mobile */
        .profile-btn { padding: 6px 12px !important; }
    }
        
    /* NAVBAR RESPONSIVE QUERIES */
    @media (max-width: 850px) { .feedback-link { display: none; } }
    @media (max-width: 700px) { .seller-link { display: none; } }
    @media (max-width: 430px) { .profile-text{ display: none; } }
    @media (max-width: 400px) { 
        .logo-name { font-size: 20px; } 
        .logo { height: 26px; width: 26px; } 
        .location { font-size: 10px; }
        .location-name { font-size: 13px; } 
        .navbar { gap: 5px; padding: 0 8px; }
    }

    /* SEARCH PANEL */
    .panel { 
        height: 50px; 
        width: 100%; 
        background: #9e0303; 
        color: #fdfdfb; 
        display: flex; 
        align-items: center; 
        padding: 0 15px; 
        gap: 12px; 
    }
    
    .panel-all { 
        display: flex; align-items: center; gap: 6px; padding: 6px 10px; 
        font-weight: 700; font-size: 15px; color: #fff; 
    }
    
    .nav-search { 
        height: 38px; 
        display: flex; 
        flex-grow: 1; 
        max-width: 700px;
        margin-right: 65px; /* Leaves room for the floating cart */
        border-radius: 6px;
        overflow: hidden;
    }
    
    .search-input { 
        height: 100%; 
        width: 100%; 
        font-size: 15px; 
        border: none; 
        padding-left: 12px; 
        color: #333;
    }
    .search-input:focus { outline: none; }
    
    .search-icon { 
        height: 100%; 
        width: 50px; 
        background: #ffecb3; 
        display: flex; 
        justify-content: center; 
        align-items: center; 
        cursor: pointer;
        color: #d81b60;
        font-size: 16px;
        transition: background 0.2s;
    }
    .search-icon:hover { background: #ffe082; }

    /* FLOATING CART BUTTON */
    .cart { 
        position: fixed; 
        right: 12px; 
        top: 61px; /* Perfectly aligned to right of search bar */
        height: 38px; 
        width: 48px; 
        background: linear-gradient(135deg, #ffffff, #ffe082); 
        color: #9e0303;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 8px; 
        z-index: 10; 
        cursor: pointer;
        box-shadow: 0 3px 6px rgba(0,0,0,0.2);
        transition: transform 0.2s;
    }
    .cart:hover { transform: scale(1.05); }
    .cart-amount { font-weight: 800; font-size: 13px; line-height: 1; margin-bottom: 2px;}
    .cart-icon { font-size: 14px; line-height: 1;}
    
    /* TICKER MESSAGE BOX */
    .message-box1 { width: 100%; background-color: #f1f5f9; height: 30px; display: flex; align-items: center; padding: 0 20px; border-bottom: 1px solid #e2e8f0; }
    .message-box2 { width: 100%; overflow: hidden; display: flex; align-items: center; }
    .message-text { display: inline-block; white-space: nowrap; color: #dc2626; font-weight: 700; font-size: 13px; animation: scrollText 20s linear infinite; }
    
    @keyframes scrollText { from { transform: translateX(100vw); } to { transform: translateX(-100%); } }

    /* --- SIDEBAR STYLES --- */
    #usb-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.4); z-index: 9998; opacity: 0; visibility: hidden; transition: all 0.3s ease; backdrop-filter: blur(3px); }
    #usb-overlay.open { opacity: 1; visibility: visible; }
    
    #usb-sidebar { position: fixed; top: 0; left: 0; bottom: 0; width: 85%; max-width: 340px; background: #ffffff; z-index: 9999; transform: translateX(-100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); display: flex; flex-direction: column; box-shadow: 4px 0 24px rgba(0,0,0,0.1); }
    #usb-sidebar.open { transform: translateX(0); }
    
    .usb-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; background: #ffffff; border-bottom: 1px solid #f1f5f9; }
    .usb-title { font-weight: 700; font-size: 16px; color: #0f172a; flex-grow: 1; text-align: center; letter-spacing: 0.5px; text-transform: uppercase; }
    .usb-btn { background: none; border: none; padding: 6px; cursor: pointer; color: #64748b; border-radius: 8px; transition: 0.2s; display: flex; align-items: center; }
    .usb-btn:hover { background: #f1f5f9; color: #0f172a; }
    
    .usb-content { flex-grow: 1; overflow-y: auto; padding-bottom: 20px; }
    .usb-item { display: flex; align-items: center; justify-content: space-between; padding: 16px 24px; border-bottom: 1px solid #f8fafc; cursor: pointer; transition: all 0.2s; }
    .usb-item:hover { background: #f8fafc; padding-left: 28px; }
    .usb-item-left { display: flex; align-items: center; gap: 14px; font-weight: 600; color: #334155; font-size: 15px; }
    
    .usb-icon { width: 20px; height: 20px; object-fit: contain; color: #6366f1; }
    .usb-icon-img { width: 24px; height: 24px; object-fit: contain; border-radius: 4px; }
    
    .usb-loader { padding: 24px; display: flex; flex-direction: column; gap: 16px; }
    .usb-skeleton { height: 20px; background: #e2e8f0; border-radius: 4px; animation: pulse 1.5s infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
`;

// 3. HTML TEMPLATES (RESTRUCTURED FOR FLEXBOX)
const headerHTML = `
    <header>
        <div class="navbar">
            <div class="nav-logo border" onclick="window.location.href='index.html'">
                <img class="logo" src="logo.png" alt="Vilarci" loading="lazy" onerror="this.style.display='none'">
                <div class="logo-name">Vilarci</div>
            </div>
            
            <div class="nav-address border">
                <p class="location">Delivering to</p>
                <div class="location-name"><i class="fa-solid fa-location-dot"></i> <span id="loc-text">Location</span></div>
            </div>
            
            <div class="nav-links">
                <a class="profile-btn" href="profile.html">
                    <i class="fa-regular fa-circle-user"></i>
                    <span class="profile-text">Profile</span>
                </a>
                
                <a class="border seller-link" href="seller home.html">Become a Seller</a>
                <a class="border feedback-link" href="feedback.html">Feedback</a>
            </div>
        </div>
        
        <div class="panel">
            <div class="panel-all border" onclick="openSidebar()">
                <i class="fa-solid fa-bars"></i>
                <span>All</span>
            </div>
            <div class="nav-search border">
                <input type="search" class="search-input" id="globalSearch" placeholder="Search Vilarci...">
                <div class="search-icon"><i class="fa-solid fa-magnifying-glass"></i></div>
            </div>
        </div>

        <div class="cart" onclick="window.location.href='cart.html'">
            <div class="cart-amount" id="cart-count-badge">0</div>
            <div class="cart-icon"><i class="fa-solid fa-cart-shopping"></i></div>
        </div>
        
        <div class="message-box1">
            <div class="message-box2">
                <div class="message-text">🔥 Super Deals Live! Lightning-fast delivery at incredible prices. Order Now!</div>
            </div>
        </div>
    </header>
`;

const sidebarHTML = `
    <div id="usb-overlay" onclick="closeSidebar()"></div>
    <div id="usb-sidebar">
        <div class="usb-header">
            <button id="usb-back-btn" class="usb-btn hidden" onclick="sidebarGoBack()">
                <i data-lucide="arrow-left"></i>
            </button>
            <div class="usb-title" id="usb-title">Menu</div>
            <button class="usb-btn" onclick="closeSidebar()">
                <i data-lucide="x"></i>
            </button>
        </div>
        <div id="usb-content" class="usb-content"></div>
    </div>
`;

// ==========================================
// 4. INITIALIZATION & INJECTION
// ==========================================
function initializeComponent() {
    // Inject CSS
    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = componentCSS;
    document.head.appendChild(styleSheet);

    // Inject Header
    const headerPlaceholder = document.getElementById('vilarci-header');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = headerHTML;
        headerPlaceholder.style.display = "block";
        headerPlaceholder.style.marginBottom = "136px"; // Perfectly spaces <main> below header
    } else {
        console.warn("Header placeholder <div id='vilarci-header'></div> not found on this page.");
    }

    // Inject Sidebar into body
    document.body.insertAdjacentHTML('beforeend', sidebarHTML);

    // Format Location Text Safely
    const locationElement = document.getElementById('loc-text');
    if(locationElement) {
        // Fallback placeholder text
        let text = "Radhaballavpur"; 
        
        // If you load actual location from DB/Local storage later, update "text" variable here
        
        const truncatedText = text.length > 10 ? text.substring(0, 10) + "..." : text;
        locationElement.innerText = truncatedText;
    }

    // Initialize logic
    updateGlobalCartCount();
    renderSidebar();
}

// Global Cart Counter
window.updateGlobalCartCount = function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let count = cart.reduce((acc, item) => acc + item.quantity, 0);
    const badge = document.getElementById('cart-count-badge');
    if (badge) badge.innerText = count;
};

// ==========================================
// 5. SIDEBAR LOGIC
// ==========================================
window.openSidebar = function() {
    document.getElementById('usb-overlay').classList.add('open');
    document.getElementById('usb-sidebar').classList.add('open');
    menuStack = [{ type: 'root', title: 'Main Menu', data: [] }];
    renderSidebar();
};

window.closeSidebar = function() {
    document.getElementById('usb-overlay').classList.remove('open');
    document.getElementById('usb-sidebar').classList.remove('open');
};

window.sidebarGoBack = function() {
    if (menuStack.length > 1) {
        menuStack.pop();
        renderSidebar();
    }
};

function renderSidebar() {
    const currentMenu = menuStack[menuStack.length - 1];
    
    const titleEl = document.getElementById('usb-title');
    const backBtn = document.getElementById('usb-back-btn');
    const content = document.getElementById('usb-content');
    
    if(!titleEl || !content) return; // Prevent errors if DOM isn't ready

    titleEl.innerText = currentMenu.title;
    if (menuStack.length > 1) backBtn.classList.remove('hidden');
    else backBtn.classList.add('hidden');

    if (currentMenu.type === 'loading') {
        content.innerHTML = `
            <div class="usb-loader">
                <div class="usb-skeleton" style="width: 80%;"></div>
                <div class="usb-skeleton" style="width: 60%;"></div>
                <div class="usb-skeleton" style="width: 70%;"></div>
            </div>`;
        return;
    }

    if (currentMenu.type === 'root') {
        content.innerHTML = `
            <div style="padding: 16px 24px 8px; font-size: 12px; font-weight: 700; color: #94a3b8; letter-spacing: 1px; text-transform: uppercase;">Explore Vilarci</div>
            <div class="usb-item" onclick="loadProductMainCategories()">
                <div class="usb-item-left"><i data-lucide="shopping-bag" class="usb-icon"></i><span>Shop Products</span></div>
                <i data-lucide="chevron-right" style="color:#cbd5e1; width:18px;"></i>
            </div>
            <div class="usb-item" onclick="loadServiceMainCategories()">
                <div class="usb-item-left"><i data-lucide="wrench" class="usb-icon" style="color: #ec4899;"></i><span>Book Services</span></div>
                <i data-lucide="chevron-right" style="color:#cbd5e1; width:18px;"></i>
            </div>
            <div style="height: 8px; background: #f8fafc; margin: 16px 0;"></div>
            <div style="padding: 8px 24px 8px; font-size: 12px; font-weight: 700; color: #94a3b8; letter-spacing: 1px; text-transform: uppercase;">My Account</div>
            <div class="usb-item" onclick="window.location.href='profile.html'">
                <div class="usb-item-left"><i data-lucide="user-circle" class="usb-icon" style="color: #64748b;"></i> Profile</div>
            </div>
            <div class="usb-item" onclick="window.location.href='orders.html'">
                <div class="usb-item-left"><i data-lucide="package" class="usb-icon" style="color: #64748b;"></i> Orders</div>
            </div>
            <div class="usb-item" onclick="window.location.href='wallet.html'">
                <div class="usb-item-left"><i data-lucide="wallet" class="usb-icon" style="color: #64748b;"></i> Wallet</div>
            </div>
        `;
    } else {
        if (!currentMenu.data || currentMenu.data.length === 0) {
            content.innerHTML = `<div style="padding: 30px; text-align: center; color: #94a3b8; font-weight: 500;">No items found.</div>`;
        } else {
            let html = '';
            currentMenu.data.forEach(item => {
                const iconHtml = item.icon_url ? `<img src="${item.icon_url}" class="usb-icon-img" />` : '';
                let onClickStr = '';
                let showArrow = true;

                if (currentMenu.type === 'product-main') onClickStr = `loadProductSubCategories('${item.id}', '${item.name.replace(/'/g, "\\'")}')`;
                else if (currentMenu.type === 'product-sub') onClickStr = `loadProductSuperSubCategories('${item.id}', '${item.name.replace(/'/g, "\\'")}')`;
                else if (currentMenu.type === 'product-super-sub') { onClickStr = `window.location.href='product_list.html?super_sub_id=${item.id}'`; showArrow = false; } 
                else if (currentMenu.type === 'service-main') onClickStr = `loadServiceSubCategories('${item.id}', '${item.name.replace(/'/g, "\\'")}')`;
                else if (currentMenu.type === 'service-sub') { onClickStr = `window.location.href='service_list.html?sub_id=${item.id}'`; showArrow = false; }

                html += `
                    <div class="usb-item" onclick="${onClickStr}">
                        <div class="usb-item-left">${iconHtml}<span>${item.name}</span></div>
                        ${showArrow ? '<i data-lucide="chevron-right" style="color:#cbd5e1; width:18px;"></i>' : ''}
                    </div>
                `;
            });
            content.innerHTML = html;
        }
    }

    if (window.lucide) window.lucide.createIcons();
}

// 6. HELPER TO HANDLE LOADING UI
function pushLoading(title) {
    menuStack.push({ type: 'loading', title: title, data: [] });
    renderSidebar();
}

function popLoadingAndPush(newMenuObject) {
    if (menuStack[menuStack.length - 1].type === 'loading') menuStack.pop();
    menuStack.push(newMenuObject);
    renderSidebar();
}

// ==========================================
// 7. SUPABASE DATABASE CALLS
// ==========================================
function getDB() {
    if (window.supabaseClient) return window.supabaseClient; 
    if (typeof supabaseClient !== 'undefined') return supabaseClient; 
    console.error("Vilarci Error: Database client not found! Sidebar won't work.");
    return null;
}

window.loadProductMainCategories = async function() {
    pushLoading('Product Categories');
    const db = getDB();
    if(!db) return;
    const { data, error } = await db.from('categories').select('*').order('name');
    if (!error) popLoadingAndPush({ type: 'product-main', title: 'Product Categories', data: data || [] });
};

window.loadProductSubCategories = async function(parentId, parentName) {
    pushLoading(parentName);
    const db = getDB();
    if(!db) return;
    const { data, error } = await db.from('sub_categories').select('*').eq('category_id', parentId).order('name');
    if (!error) popLoadingAndPush({ type: 'product-sub', title: parentName, data: data || [] });
};

window.loadProductSuperSubCategories = async function(subId, subName) {
    pushLoading(subName);
    const db = getDB();
    if(!db) return;
    const { data, error } = await db.from('super_sub_categories').select('*').eq('sub_category_id', subId).order('name');
    if (!error) popLoadingAndPush({ type: 'product-super-sub', title: subName, data: data || [] });
};

window.loadServiceMainCategories = async function() {
    pushLoading('Service Categories');
    const db = getDB();
    if(!db) return;
    const { data, error } = await db.from('service_categories').select('*').order('name');
    if (!error) popLoadingAndPush({ type: 'service-main', title: 'Service Categories', data: data || [] });
};

window.loadServiceSubCategories = async function(parentId, parentName) {
    pushLoading(parentName);
    const db = getDB();
    if(!db) return;
    const { data, error } = await db.from('service_sub_categories').select('*').eq('category_id', parentId).order('name');
    if (!error) popLoadingAndPush({ type: 'service-sub', title: parentName, data: data || [] });
};

// Start everything on load
document.addEventListener('DOMContentLoaded', initializeComponent);