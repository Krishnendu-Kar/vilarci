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
        color: #fffafe !important; /* Vilarci Red text/icon */
        
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


  /* --- LOCATION MODAL STYLES --- */
    #loc-modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6); z-index: 10000; opacity: 0; visibility: hidden; transition: all 0.3s ease; backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; }
    #loc-modal-overlay.open { opacity: 1; visibility: visible; }
    
    .loc-modal { background: #ffffff; width: 90%; max-width: 400px; border-radius: 16px; padding: 24px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1); transform: scale(0.95) translateY(10px); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); opacity: 0; }
    #loc-modal-overlay.open .loc-modal { transform: scale(1) translateY(0); opacity: 1; }
    
    .loc-modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
    .loc-modal-title { font-size: 18px; font-weight: 800; color: #0f172a; display: flex; align-items: center; gap: 8px; }
    .loc-close-btn { background: #f1f5f9; border: none; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #64748b; transition: 0.2s; }
    .loc-close-btn:hover { background: #e2e8f0; color: #0f172a; }
    
    .loc-fixed-inputs { display: flex; flex-direction: column; gap: 10px; margin-bottom: 12px; }
    .loc-input-group { background: #f8fafc; border: 1px solid #e2e8f0; padding: 10px 14px; border-radius: 8px; display: flex; align-items: center; justify-content: space-between; color: #64748b; font-size: 14px; font-weight: 600; cursor: not-allowed; }
    
    .loc-label { font-size: 12px; font-weight: 700; color: #64748b; margin-bottom: 4px; display: block; text-transform: uppercase; letter-spacing: 0.5px; }
    .loc-select { width: 100%; padding: 12px 14px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 15px; font-weight: 600; color: #0f172a; cursor: pointer; outline: none; appearance: none; background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%2364748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>') no-repeat right 14px center; background-color: white; margin-bottom: 12px; transition: 0.2s; }
    .loc-select:focus { border-color: #e43e3e; box-shadow: 0 0 0 3px rgba(228, 62, 62, 0.2); background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%23e43e3e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>'); }
    .loc-select:disabled { background-color: #f8fafc; cursor: not-allowed; color: #94a3b8; border-color: #e2e8f0; background-image: none; }
    
    .loc-save-btn { width: 100%; background: #e43e3e; color: white; border: none; padding: 14px; border-radius: 8px; font-weight: 700; font-size: 15px; margin-top: 8px; cursor: pointer; transition: 0.2s; box-shadow: 0 4px 6px -1px rgba(228, 62, 62, 0.3); }
    .loc-save-btn:hover { background: #c62828; transform: translateY(-1px); }
    .loc-save-btn:disabled { background: #cbd5e1; cursor: not-allowed; box-shadow: none; transform: none; }
`;

// 3. HTML TEMPLATES (RESTRUCTURED FOR FLEXBOX)
const headerHTML = `
    <header>
        <div class="navbar">
            <div class="nav-logo border" onclick="window.location.href='index.html'">
                <img class="logo" src="logo.png" alt="Vilarci" loading="lazy" onerror="this.style.display='none'">
                <div class="logo-name">Vilarci</div>
            </div>
            
            <div class="nav-address border" onclick="openLocationModal()">
                <p class="location">Results Based On</p>
                <div class="location-name"><i class="fa-solid fa-location-dot"></i> <span id="loc-text">Select Location</span></div>
            </div>
            
            <div class="nav-links">
                <a class="profile-btn" href="profile.html">
                    <i class="fa-regular fa-circle-user"></i>
                    <span class="profile-text">Profile</span>
                </a>
                
                <a class="border seller-link" href="seller-home.html">Become a Seller</a>
                <a class="border feedback-link" href="feedback.html">Feedback</a>
            </div>
        </div>
        
        <div class="panel">
            <div class="panel-all border" onclick="openSidebar()">
                <i class="fa-solid fa-bars"></i>
                <span>All</span>
            </div>
            <div class="nav-search border" onclick="window.location.href='universal search.html'">
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
    
    // --> ADD THIS LINE: Inject Location Modal into body
    document.body.insertAdjacentHTML('beforeend', locationModalHTML);

    // --> ADD THIS BLOCK: Check Local Storage for saved location
    const savedLoc = localStorage.getItem('vilarci_user_location');
    if (savedLoc) {
        const locObj = JSON.parse(savedLoc);
        updateHeaderLocationText(locObj.name);
    } else {
        updateHeaderLocationText("Select Location");
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
                <div class="usb-item" onclick="#">
                    <div class="usb-item-left"><i class="fa-solid fa-motorcycle" style="color: #d81f28;"></i><span>Buy For Me</span></div>
                    <i data-lucide="chevron-right" style="color:#cbd5e1; width:18px;"></i>
                </div>
                <div class="usb-item" onclick="#">
                    <div class="usb-item-left"><i class="fa-solid fa-person-chalkboard" style="color: #1f28d8;"></i><span>Explore Nearby Teachers</span></div>
                    <i data-lucide="chevron-right" style="color:#cbd5e1; width:18px;"></i>
                </div>

            <div style="height: 8px; background: #f8fafc; margin: 16px 0;"></div>


            <div class="usb-item" onclick="window.location.href='profile.html'">
                <div class="usb-item-left"><i data-lucide="user-circle" class="usb-icon" style="color: #64748b;"></i> Profile</div>
            </div>
            <div class="usb-item" onclick="window.location.href='orders.html'">
                <div class="usb-item-left"><i data-lucide="package" class="usb-icon" style="color: #64748b;"></i> Orders</div>
            </div>
           <div class="usb-item" onclick="window.location.href='wishlist.html'">
                <div class="usb-item-left"><i data-lucide="heart" class="usb-icon" style="color: #ff0066;"></i> Wishlist</div>
            </div>
            <div class="usb-item" onclick="window.location.href='wallet.html'">
                <div class="usb-item-left"><i data-lucide="wallet" class="usb-icon" style="color: #64748b;"></i> Wallet</div>
            </div>
            <div class="usb-item" onclick="window.location.href='lucky-winners.html'">
                <div class="usb-item-left"><i data-lucide="trophy" class="usb-icon" style="color: #64748b;"></i> Lucky Winners</div>
            </div>
            <div class="usb-item" onclick="window.location.href='help.html'">
                <div class="usb-item-left"><i data-lucide="help-circle" class="usb-icon" style="color: #64748b;"></i> Need Help?</div>
            </div>
            <div class="usb-item" onclick="window.location.href='seller-home.html'">
                <div class="usb-item-left"><i data-lucide="store" class="usb-icon" style="color: #64748b;"></i> Become a Seller</div>
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


// ==========================================
// 8. LOCATION PICKER LOGIC
// ==========================================

// ==========================================
// 8. LOCATION PICKER LOGIC (CASCADING)
// ==========================================

const locationModalHTML = `
    <div id="loc-modal-overlay" onclick="if(event.target === this) closeLocationModal()">
        <div class="loc-modal">
            <div class="loc-modal-header">
                <div class="loc-modal-title">
                    <i class="fa-solid fa-map-location-dot" style="color: #e43e3e;"></i> 
                    Delivery Location
                </div>
                <button class="loc-close-btn" onclick="closeLocationModal()">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>

            <div class="loc-fixed-inputs">
                <div class="loc-input-group">
                    <span>State</span> <span style="color: #0f172a;">West Bengal</span>
                </div>
            </div>

            <label class="loc-label">District</label>
            <select id="loc-district" class="loc-select">
                <option value="1" selected>Purba Medinipur</option>
            </select>

            <label class="loc-label">Main Zone</label>
            <select id="loc-mainzone" class="loc-select" onchange="handleMainZoneChange()">
                <option value="dist_1">-- All of Purba Medinipur --</option>
                <option value="1" selected>Tamluk</option>
            </select>

            <label class="loc-label">Sub Zone</label>
            <select id="loc-subzone" class="loc-select" onchange="enableSaveBtn()">
                <option value="" disabled selected>Loading local zones...</option>
            </select>

            <button id="loc-save-btn" class="loc-save-btn" onclick="saveLocation()" disabled>Confirm Location</button>
        </div>
    </div>
`;

window.openLocationModal = async function() {
    const overlay = document.getElementById('loc-modal-overlay');
    if (!overlay) return;
    
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden'; 

    const subZoneSelect = document.getElementById('loc-subzone');
    
    // Only fetch from DB if empty
    if (subZoneSelect.options.length <= 1) {
        await loadSubZonesForTamluk();
    }
};

window.handleMainZoneChange = async function() {
    const mainZoneVal = document.getElementById('loc-mainzone').value;
    const subZoneSelect = document.getElementById('loc-subzone');
    const saveBtn = document.getElementById('loc-save-btn');

    if (mainZoneVal === 'dist_1') {
        // User wants the whole district. Lock the sub-zone dropdown!
        subZoneSelect.innerHTML = '<option value="dist_1" selected>All Areas Included</option>';
        subZoneSelect.disabled = true;
        saveBtn.disabled = false;
    } else {
        // User selected Tamluk. Unlock and load the specific zones.
        subZoneSelect.disabled = false;
        subZoneSelect.innerHTML = '<option value="" disabled selected>Loading...</option>';
        saveBtn.disabled = true;
        await loadSubZonesForTamluk();
    }
};

window.loadSubZonesForTamluk = async function() {
    const db = getDB();
    const subZoneSelect = document.getElementById('loc-subzone');
    if(!db) return;

    const { data, error } = await db.from('sub_zones').select('id, name').eq('main_zone_id', 1).order('id');
    
    if (error || !data) {
        subZoneSelect.innerHTML = '<option value="" disabled selected>Error loading zones</option>';
        return;
    }

    subZoneSelect.innerHTML = '<option value="" disabled selected>-- Select your Area --</option>';
    subZoneSelect.innerHTML += `<option value="main_1" style="font-weight:bold; color:#e43e3e;">All of Tamluk</option>`;
    
    data.forEach(zone => {
        subZoneSelect.innerHTML += `<option value="sub_${zone.id}">${zone.name}</option>`;
    });
};

window.enableSaveBtn = function() {
    document.getElementById('loc-save-btn').disabled = false;
};

window.closeLocationModal = function() {
    const overlay = document.getElementById('loc-modal-overlay');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = ''; 
};

window.saveLocation = function() {
    const mainZoneSelect = document.getElementById('loc-mainzone');
    const subZoneSelect = document.getElementById('loc-subzone');
    const saveBtn = document.getElementById('loc-save-btn');
    
    if (saveBtn.disabled) return;

    let locType = '';
    let locId = '';
    let selectedName = '';

    // Logic to determine what they actually picked
    if (mainZoneSelect.value === 'dist_1') {
        locType = 'district';
        locId = '1';
        selectedName = 'Purba Medinipur';
    } else if (subZoneSelect.value === 'main_1') {
        locType = 'main_zone';
        locId = '1';
        selectedName = 'Tamluk';
    } else {
        locType = 'sub_zone';
        locId = subZoneSelect.value.split('_')[1];
        selectedName = subZoneSelect.options[subZoneSelect.selectedIndex].text;
    }

    const locationData = { id: locId, type: locType, name: selectedName };
    localStorage.setItem('vilarci_user_location', JSON.stringify(locationData));

    updateHeaderLocationText(selectedName);
    closeLocationModal();

    window.dispatchEvent(new CustomEvent('vilarciLocationChanged', { detail: locationData }));
};

function updateHeaderLocationText(name) {
    const locTextEl = document.getElementById('loc-text');
    if(locTextEl) {
        const truncated = name.length > 13 ? name.substring(0, 13) + "..." : name;
        locTextEl.innerText = truncated;
    }
}
// Start everything on load
document.addEventListener('DOMContentLoaded', initializeComponent);


// ==============================================================
// VILARCI HYBRID APP LOGIC (Only runs if opened from Play Store)
// ==============================================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Check if the website is running inside the Capacitor Android App
    if (window.Capacitor && window.Capacitor.isNative) {
        
        // A. Add a class to the body so we know it's the app
        document.body.classList.add('is-native-app');

        // B. Dynamically inject the "App-Only" CSS to all pages
        const nativeCSS = `
            /* Prevent browser pull-to-refresh */
            body.is-native-app {
                overscroll-behavior-y: none; 
                -webkit-user-select: none;
                user-select: none;
                -webkit-touch-callout: none; 
            }
            /* Allow typing in search and text boxes */
            body.is-native-app input, 
            body.is-native-app textarea {
                -webkit-user-select: auto;
                user-select: auto;
            }
            /* Hide ugly browser scrollbars but keep scrolling */
            body.is-native-app ::-webkit-scrollbar {
                display: none;
            }
        `;
        const styleSheet = document.createElement('style');
        styleSheet.innerText = nativeCSS;
        document.head.appendChild(styleSheet);

        // C. Global Android Hardware Back Button Fix
        if (window.Capacitor.Plugins && window.Capacitor.Plugins.App) {
            window.Capacitor.Plugins.App.addListener('backButton', ({ canGoBack }) => {
                const path = window.location.pathname;
                // Check if user is on the main Home Page (accounting for GitHub Pages URL)
                const isHome = path === '/' || path === '/vilarci/' || path.endsWith('index.html') || path === '';
                
                if (canGoBack && !isHome) {
                    // Deep in the website -> Go back 1 page
                    window.history.back();
                } else {
                    // On the home page -> Close the entire App smoothly
                    window.Capacitor.Plugins.App.exitApp();
                }
            });
        }
    }
});