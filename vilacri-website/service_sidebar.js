/**
 * SERVICE SIDEBAR (Fixed for your Schema)
 * Usage: initSidebar(supabaseClient, 'sidebar-container');
 */

window.initSidebar = async function(supabaseClient, containerId = 'sidebar-container') {
    const container = document.getElementById(containerId);
    
    // Safety Checks
    if (!container) return console.warn(`Sidebar container '${containerId}' not found.`);
    if (!supabaseClient) {
        container.innerHTML = '<p class="text-red-500 p-4 text-xs">Error: DB not connected.</p>';
        return;
    }

    // 1. Loading State
    container.innerHTML = `
        <div class="p-4 space-y-4 animate-pulse">
            <div class="h-4 bg-slate-100 rounded w-3/4"></div>
            <div class="h-4 bg-slate-100 rounded w-1/2"></div>
        </div>
    `;

    // 2. Fetch Data (UPDATED FOR YOUR SCHEMA)
    // We request 'icon_url' instead of 'icon'
    const { data: categories, error } = await supabaseClient
        .from('service_categories')
        .select(`
            id, 
            name, 
            icon_url,
            service_sub_categories (
                id, 
                name
            )
        `)
        .order('name');

    if (error) {
        console.error('Sidebar Error:', error);
        container.innerHTML = '<div class="p-4 text-slate-400 text-sm">Unavailable</div>';
        return;
    }

    // 3. Render Data
    renderSidebarHTML(categories || [], container);
};

function renderSidebarHTML(categories, container) {
    container.innerHTML = ''; // Clear loader
    
    // "All Services" Link
    const allLink = document.createElement('a');
    allLink.href = 'services.html'; 
    allLink.className = 'flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium border-b border-slate-100 transition';
    allLink.innerHTML = `<i data-lucide="grid" class="w-5 h-5"></i> All Services`;
    container.appendChild(allLink);

    // Loop through Categories
    categories.forEach(cat => {
        const wrapper = document.createElement('div');
        wrapper.className = 'border-b border-slate-100';

        // Check for subcategories using the relationship name from your schema
        const subCats = cat.service_sub_categories || [];
        const hasSub = subCats.length > 0;
        
        // Use 'icon_url' from your new schema
        // If it's a URL (http...), render an <img>. If it's an emoji/text, render text.
        let iconHtml = '<span class="text-lg">🔹</span>';
        if (cat.icon_url) {
            if (cat.icon_url.startsWith('http')) {
                iconHtml = `<img src="${cat.icon_url}" class="w-6 h-6 object-contain">`;
            } else {
                iconHtml = `<span class="text-lg">${escapeHtml(cat.icon_url)}</span>`;
            }
        }

        // Header HTML
        const header = document.createElement('div');
        header.className = 'flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-slate-50 transition group select-none';
        
        header.innerHTML = `
            <a href="service_list.html?category_id=${cat.id}" class="flex items-center gap-3 text-slate-700 group-hover:text-indigo-600 flex-1">
                ${iconHtml}
                <span class="font-medium text-sm">${escapeHtml(cat.name)}</span>
            </a>
            ${hasSub ? `<div class="p-1 hover:bg-slate-200 rounded-full transition" onclick="window.toggleSubmenu(event, 'sub-${cat.id}', 'arrow-${cat.id}')">
                <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400 transition-transform duration-200" id="arrow-${cat.id}"></i>
            </div>` : ''}
        `;

        wrapper.appendChild(header);

        // Sub-Category List
        if (hasSub) {
            const subList = document.createElement('div');
            subList.id = `sub-${cat.id}`;
            subList.className = 'hidden bg-slate-50 pl-11 pr-4 py-2 space-y-1 shadow-inner';

            subCats.forEach(sub => {
                const subLink = document.createElement('a');
                subLink.href = `service_list.html?sub_id=${sub.id}`; // URL filter
                subLink.className = 'block text-sm text-slate-500 hover:text-indigo-600 py-1.5 hover:translate-x-1 transition-transform';
                subLink.innerText = sub.name; 
                subList.appendChild(subLink);
            });
            wrapper.appendChild(subList);
        }

        container.appendChild(wrapper);
    });

    if (window.lucide) window.lucide.createIcons();
}

// Toggle Helper
window.toggleSubmenu = function(event, listId, arrowId) {
    if(event) { event.preventDefault(); event.stopPropagation(); }
    
    const list = document.getElementById(listId);
    const arrow = document.getElementById(arrowId);
    
    if (list && arrow) {
        list.classList.toggle('hidden');
        arrow.style.transform = list.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
    }
};

// Security Helper
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
}