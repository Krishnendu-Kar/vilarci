import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { 
  X, ChevronRight, ArrowLeft, UserCircle, 
  ShoppingBag, Wrench, Plane, Heart, Package, 
  Wallet, Gift, Video, Store, Info 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ isOpen, onClose, user }) {
  // menuStack keeps track of where we are (Root -> Main -> Sub -> SuperSub)
  const [menuStack, setMenuStack] = useState([{ type: 'root', title: 'Main Menu', data: [] }]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Reset to root when sidebar closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setMenuStack([{ type: 'root', title: 'Main Menu', data: [] }]);
      }, 300);
    }
  }, [isOpen]);

  // ============================================
  //  LOGIC 1: PRODUCT CATEGORIES (3-Table System)
  // ============================================

  // 1. Fetch Main Categories (Table: categories)
  const fetchMainCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('categories') // MATCHES YOUR DB TABLE
      .select('*')
      .order('name');

    if (!error && data) {
      setMenuStack(prev => [...prev, { type: 'main-cat', title: 'Shop By Category', data: data }]);
    }
    setLoading(false);
  };

  // 2. Fetch Sub Categories (Table: sub_categories)
  const fetchSubCategories = async (catId, catName) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('sub_categories') // MATCHES YOUR DB TABLE
      .select('*')
      .eq('category_id', catId) // Linked by category_id
      .order('name');

    if (!error && data && data.length > 0) {
      // If sub-categories exist, slide to next menu
      setMenuStack(prev => [...prev, { type: 'sub-cat', title: catName, data: data, parentId: catId }]);
    } else {
      // If empty, go to product page
      navigate(`/category/${catId}`);
      onClose();
    }
    setLoading(false);
  };

  // 3. Fetch Super-Sub Categories (Table: super_sub_categories)
  const fetchSuperSubCategories = async (subId, subName) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('super_sub_categories') // MATCHES YOUR DB TABLE
      .select('*')
      .eq('sub_category_id', subId) // Linked by sub_category_id
      .order('name');

    if (!error && data && data.length > 0) {
      setMenuStack(prev => [...prev, { type: 'super-sub-cat', title: subName, data: data }]);
    } else {
      // End of line -> Go to Product Page for this Sub-Category
      navigate(`/product-list?sub_id=${subId}`);
      onClose();
    }
    setLoading(false);
  };

  // ============================================
  //  LOGIC 2: SERVICES (2-Table System)
  // ============================================
  const fetchServiceCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('service_categories')
      .select(`id, name, icon_url, service_sub_categories (id, name)`)
      .order('name');

    if (!error && data) {
      setMenuStack(prev => [...prev, { type: 'service-root', title: 'All Services', data: data }]);
    }
    setLoading(false);
  };

  const handleServiceClick = (category) => {
    if (category.service_sub_categories && category.service_sub_categories.length > 0) {
      setMenuStack(prev => [...prev, { 
        type: 'service-child', 
        title: category.name, 
        data: category.service_sub_categories 
      }]);
    } else {
      navigate(`/services/${category.id}`);
      onClose();
    }
  };

  // ============================================
  //  RENDER HELPERS
  // ============================================
  const goBack = () => {
    if (menuStack.length > 1) {
      setMenuStack(prev => prev.slice(0, -1));
    }
  };

  const currentMenu = menuStack[menuStack.length - 1];

  // Main Menu Options List
  const mainMenuOptions = [
    { label: "Products", icon: <ShoppingBag size={20} className="text-blue-600"/>, action: fetchMainCategories },
    { label: "Services", icon: <Wrench size={20} className="text-orange-600"/>, action: fetchServiceCategories },
    { label: "Travels", icon: <Plane size={20} className="text-sky-500"/>, action: () => { navigate('/travels'); onClose(); }},
    { divider: true },
    { label: "Wishlist", icon: <Heart size={20} className="text-pink-500"/>, action: () => { navigate('/wishlist'); onClose(); }},
    { label: "My Orders", icon: <Package size={20} className="text-green-600"/>, action: () => { navigate('/orders'); onClose(); }},
    { label: "My Wallet", icon: <Wallet size={20} className="text-purple-600"/>, action: () => { navigate('/wallet'); onClose(); }},
    { divider: true },
    { label: "Lucky Winners", icon: <Gift size={20} className="text-yellow-500"/>, action: () => { navigate('/lucky-winners'); onClose(); }},
    { label: "Tutorial Video", icon: <Video size={20} className="text-red-500"/>, action: () => { navigate('/tutorial-video'); onClose(); }},
    { label: "Become a Seller", icon: <Store size={20} className="text-indigo-600"/>, action: () => { navigate('/seller-home'); onClose(); }},
    { label: "About Us", icon: <Info size={20} className="text-gray-500"/>, action: () => { navigate('/about-us'); onClose(); }}
  ];

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <div className={`fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-white z-[70] transform transition-transform duration-300 shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* HEADER */}
        <div className="bg-[#232f3e] text-white p-5 flex flex-col gap-3">
          <div className="flex justify-between items-center">
             <div className="flex items-center gap-3 font-bold text-lg cursor-pointer" onClick={() => { if(!user) navigate('/login'); onClose(); }}>
               <UserCircle size={34} />
               <span>{user ? `Hello, ${user.name}` : "Hello, Sign in"}</span>
             </div>
             <button onClick={onClose}><X size={26} /></button>
          </div>
        </div>

        {/* BACK BUTTON */}
        {menuStack.length > 1 && (
          <div onClick={goBack} className="flex items-center gap-2 p-4 bg-gray-100 font-bold text-slate-700 cursor-pointer border-b hover:bg-gray-200 transition-colors uppercase text-sm">
            <ArrowLeft size={18} /> MAIN MENU
          </div>
        )}

        {/* LIST CONTENT */}
        <div className="overflow-y-auto h-[calc(100%-90px)]">
          {loading ? (
             <div className="flex justify-center items-center p-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>
          ) : (
            <>
              {/* LEVEL 0: ROOT MENU */}
              {currentMenu.type === 'root' && (
                <div className="py-2">
                  {mainMenuOptions.map((item, idx) => (
                    item.divider ? <div key={idx} className="h-[1px] bg-gray-200 my-2 mx-4"></div> :
                    <div key={idx} onClick={item.action} className="flex items-center gap-4 py-3.5 px-6 hover:bg-gray-50 cursor-pointer transition-colors">
                        {item.icon} <span className="font-medium text-slate-700 text-[15px]">{item.label}</span>
                        {(item.label === 'Products' || item.label === 'Services') && <ChevronRight size={16} className="ml-auto text-gray-400" />}
                    </div>
                  ))}
                </div>
              )}

              {/* LEVEL 1: MAIN CATEGORIES (Products) */}
              {currentMenu.type === 'main-cat' && (
                <div className="py-2">
                    <h3 className="px-6 py-3 font-bold text-slate-900 text-sm uppercase tracking-wide border-b border-gray-100 mb-2">{currentMenu.title}</h3>
                    {currentMenu.data.map((cat) => (
                        <div key={cat.id} onClick={() => fetchSubCategories(cat.id, cat.name)} className="flex justify-between items-center py-3.5 px-6 hover:bg-gray-50 cursor-pointer text-slate-700 font-medium border-b border-gray-50">
                            <span>{cat.name}</span> <ChevronRight size={16} className="text-gray-400" />
                        </div>
                    ))}
                </div>
              )}

              {/* LEVEL 2: SUB CATEGORIES */}
              {currentMenu.type === 'sub-cat' && (
                <div className="py-2">
                    <h3 className="px-6 py-3 font-bold text-slate-900 text-sm uppercase tracking-wide border-b border-gray-100 mb-2">{currentMenu.title}</h3>
                    
                    {/* "See All" Link */}
                    <div onClick={() => { navigate(`/category/${currentMenu.parentId}`); onClose(); }} className="py-3 px-6 text-sm text-gray-500 mb-2 cursor-pointer hover:bg-gray-50">See All in {currentMenu.title}</div>
                    
                    {currentMenu.data.map((sub) => (
                        <div key={sub.id} onClick={() => fetchSuperSubCategories(sub.id, sub.name)} className="flex justify-between items-center py-3.5 px-6 hover:bg-gray-50 cursor-pointer text-slate-700 font-medium border-b border-gray-50">
                            <span>{sub.name}</span> <ChevronRight size={16} className="text-gray-400" />
                        </div>
                    ))}
                </div>
              )}

              {/* LEVEL 3: SUPER SUB CATEGORIES */}
              {currentMenu.type === 'super-sub-cat' && (
                 <div className="py-2">
                    <h3 className="px-6 py-3 font-bold text-slate-900 text-sm uppercase tracking-wide border-b border-gray-100 mb-2">{currentMenu.title}</h3>
                    {currentMenu.data.map((superSub) => (
                        <div key={superSub.id} onClick={() => { navigate(`/product-list?super_id=${superSub.id}`); onClose(); }} className="flex justify-between items-center py-3.5 px-6 hover:bg-gray-50 cursor-pointer text-slate-700 font-medium border-b border-gray-50">
                            <span>{superSub.name}</span>
                        </div>
                    ))}
                 </div>
              )}

              {/* SERVICES LOGIC (Remains Same) */}
              {currentMenu.type === 'service-root' && (
                 <div className="py-2">
                    <h3 className="px-6 py-3 font-bold text-slate-900 text-sm uppercase tracking-wide border-b border-gray-100 mb-2">All Services</h3>
                    {currentMenu.data.map((svc) => (
                        <div key={svc.id} onClick={() => handleServiceClick(svc)} className="flex justify-between items-center py-3.5 px-6 hover:bg-gray-50 cursor-pointer text-slate-700 font-medium border-b border-gray-50">
                            <div className="flex items-center gap-3">
                                {svc.icon_url && <img src={svc.icon_url} alt="" className="w-5 h-5 object-contain opacity-70"/>}
                                <span>{svc.name}</span>
                            </div>
                            <ChevronRight size={16} className="text-gray-400" />
                        </div>
                    ))}
                 </div>
              )}

              {currentMenu.type === 'service-child' && (
                 <div className="py-2">
                    <h3 className="px-6 py-3 font-bold text-slate-900 text-sm uppercase tracking-wide border-b border-gray-100 mb-2">{currentMenu.title}</h3>
                    {currentMenu.data.map((sub) => (
                        <div key={sub.id} onClick={() => { navigate(`/service-list/${sub.id}`); onClose(); }} className="flex justify-between items-center py-3.5 px-6 hover:bg-gray-50 cursor-pointer text-slate-700 font-medium border-b border-gray-50">
                            <span>{sub.name}</span>
                        </div>
                    ))}
                 </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}