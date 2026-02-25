import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';
import { 
  Loader2, Star, Package, Wrench, 
  Coffee, Utensils 
} from 'lucide-react';

// --- 1. BANNER SLIDER COMPONENT ---
const BannerSlider = () => {
  const banners = [
    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80", 
    "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    // Added negative margin top (-mt-6) so it tucks BEHIND the curved gradient bar
    <div className="relative w-full mt-2.5 h-44 md:h-56 rounded-[8px] bg-gray-100 overflow-hidden z-0 mt-[-25px]">
      {banners.map((img, index) => (
        <img
          key={index}
          src={img}
          alt="Banner"
          className={`absolute top-0 p-1 rounded-[30px] left-0 w-full h-full object-cover transition-opacity duration-700 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
        {banners.map((_, idx) => (
          <div key={idx} className={`h-1.5 w-1.5 rounded-full shadow-sm ${idx === currentIndex ? 'bg-white' : 'bg-white/40'}`} />
        ))}
      </div>
    </div>
  );
};

// --- 2. MAIN HOME COMPONENT ---
export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products') // Make sure table name matches your DB (products vs product)
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(20);

    if (!error) setProducts(data || []);
    setLoading(false);
  };

  const quickLinks = [
    { name: 'Combo', icon: <Package size={22} />, color: 'text-purple-600', bg: 'bg-white' },
    { name: 'Services', icon: <Wrench size={22} />, link: '/services', color: 'text-orange-500', bg: 'bg-white' },
    { name: 'Staples', icon: <Coffee size={22} />, color: 'text-green-600', bg: 'bg-white' },
    { name: 'Snacks', icon: <Utensils size={22} />, color: 'text-red-500', bg: 'bg-white' },
  ];

  return (
    // REMOVED huge padding-top. Now relying on natural flow because Navbar is sticky.
    // The min-h-screen ensures background covers everything.
    <div className="bg-gray-100 min-h-screen pb-20">
      
      {/* A. GRADIENT ICON BAR 
         - Removed 'pt-3' to tighten space.
         - 'rounded-b-[2rem]' creates the curve.
         - 'relative z-10' ensures it sits ON TOP of the slider.
      */}
      <div className="bg-gradient-to-r from-[#b30000] via-purple-700 to-pink-600 pb-10 pt-2 px-2 rounded-b-[2.5rem] shadow-lg relative z-10">
        <div className="flex justify-between items-start px-2 gap-2">
          {quickLinks.map((item, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-center min-w-[70px] cursor-pointer group"
              onClick={() => item.link && navigate(item.link)}
            >
              <div className={`w-14 h-14 ${item.bg} rounded-full flex items-center justify-center shadow-lg ${item.color} active:scale-95 transition-transform border-2 border-white/20`}>
                {item.icon}
              </div>
              <span className="text-white text-[10px] font-bold mt-2 uppercase tracking-wide opacity-95 text-shadow-sm">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* B. BANNER SLIDER */}
      {/* No padding here, relying on negative margin inside the component */}
      <BannerSlider />

      {/* C. PRODUCT GRID */}
      <div className="p-3 mt-2">
        {loading ? (
          <div className="flex justify-center py-10"><Loader2 className="animate-spin text-red-600" /></div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {products.map((product) => {
               const off = product.original_price > product.base_price 
                 ? Math.round(((product.original_price - product.base_price) / product.original_price) * 100) 
                 : 0;

               return (
                <div 
                  key={product.id} 
                  onClick={() => navigate(`/product/${product.slug}`)}
                  className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden flex flex-col active:scale-[0.99] transition-transform"
                >
                  <div className="h-40 bg-gray-50 flex items-center justify-center relative p-4">
                    <img 
                      src={product.images?.[0] || 'https://via.placeholder.com/150'} 
                      alt={product.name}
                      className="max-h-full max-w-full object-contain mix-blend-multiply"
                    />
                    {off > 0 && (
                      <span className="absolute top-2 right-2 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                        {off}% OFF
                      </span>
                    )}
                  </div>

                  <div className="p-3 flex flex-col flex-1">
                    <h3 className="font-medium text-gray-800 text-xs line-clamp-2 leading-tight mb-1">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center gap-1 mb-2">
                      <div className="bg-green-600 text-white text-[10px] font-bold px-1.5 rounded flex items-center gap-0.5">
                         {product.rating_avg || 3.8} <Star size={8} fill="currentColor" />
                      </div>
                      <span className="text-[10px] text-gray-400">({product.rating_count || 45})</span>
                    </div>

                    <div className="mt-auto">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-gray-900">₹{product.base_price}</span>
                        {product.original_price > product.base_price && (
                          <span className="text-[10px] text-gray-400 line-through">₹{product.original_price}</span>
                        )}
                      </div>
                      
                      <button className="w-full mt-2 py-1.5 border border-green-600 text-green-600 font-bold text-xs rounded hover:bg-green-50 uppercase tracking-wide">
                          Add +
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  );
}