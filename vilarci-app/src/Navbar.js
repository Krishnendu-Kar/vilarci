import React from 'react';
import { Menu, Search, ShoppingCart, User, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar({ toggleSidebar, cartCount }) {
  return (
    <div className="sticky top-0 z-50 shadow-xl">
      
      {/* TOP STRIP (Logo & Location)
         ADDED: 'pt-12' (padding-top) to make room for the Phone's Status Bar (Battery/WiFi).
         This makes the red background go behind the status bar icons.
      */}
      <div className="bg-gradient-to-r from-[#8b0000] to-[#b30000] text-white pt-7 pb-3 px-4 flex items-center justify-between">
        
        {/* Left: Logo & Menu */}
        <div className="flex items-center gap-3">
          <button onClick={toggleSidebar} className="active:scale-90 transition-transform">
            <Menu size={28} />
          </button>
          <Link to="/" className="flex items-center gap-1">
             <span className="font-black text-2xl italic tracking-tighter drop-shadow-md">Vilarci</span>
          </Link>
        </div>

        {/* Center: Location (Compacted) */}
        <div className="flex flex-col items-end mx-2">
            <div className="flex items-center gap-1 bg-black/20 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
                <MapPin size={14} className="text-yellow-400" />
                <span className="text-xs font-bold truncate max-w-[100px]">Radhamoni...</span>
            </div>
        </div>

        {/* Right: Profile */}
        <Link to="/profile" className="bg-white/10 p-1.5 rounded-full">
            <User size={24} />
        </Link>
      </div>

      {/* BOTTOM STRIP (Search & Cart) - No gap between this and top */}
      <div className="bg-[#b30000] px-3 pb-3 pt-1 flex items-center gap-3">
        {/* Search Input Box */}
        <div className="flex-1 relative">
            <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full py-2.5 pl-10 pr-4 rounded-lg bg-white text-gray-800 text-sm outline-none shadow-inner"
            />
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />
        </div>

        {/* Cart Icon */}
        <Link to="/cart" className="relative p-2 text-white">
            <ShoppingCart size={28} />
            {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-[#8b0000] text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-[#b30000]">
                    {cartCount}
                </span>
            )}
        </Link>
      </div>
    </div>
  );
}