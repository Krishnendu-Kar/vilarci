import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { Star, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';

export default function ProductDetails({ addToCart }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [uiType, setUiType] = useState('packet'); 

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await supabase.from('products').select('*').eq('slug', slug).single();
      if (data) {
        setProduct(data);
        setSelectedPrice(data.base_price);
        
        // --- LOGIC FROM YOUR HTML FILE ---
        const idString = String(data.id);
        const fashionCode = idString.length >= 8 ? idString.substring(6, 8) : "00";
        const subAreaCode = idString.length >= 11 ? idString.substring(8, 11) : "000";

        if (fashionCode === '12') {
          setUiType('fashion');
        } else if (subAreaCode === '185') { 
          setUiType('weight');
          // logic for bulk rules would go here
          setSelectedLabel("1 Unit");
        } else {
          setUiType('packet');
          setSelectedLabel("1 Unit");
        }
      }
    };
    fetchProduct();
  }, [slug]);

  const handleAdd = () => {
    if (uiType === 'fashion' && !selectedLabel) {
      toast.error("Please select a size");
      return;
    }
    addToCart({ ...product, price: selectedPrice, variant: selectedLabel });
    toast.success("Added to Cart");
  };

  if (!product) return <div className="pt-40 text-center">Loading...</div>;

  return (
    <div className="pb-24 bg-white min-h-screen">
        
      {/* Simple Header
      <div className="px-4 py-2 flex items-center gap-2 border-b">
        <ArrowLeft size={20} onClick={() => navigate(-1)} className="cursor-pointer"/>
        <span className="font-bold text-slate-700">Product Details</span>
      </div> */}

      {/* Image */}
      <div className="h-72 w-full flex items-center justify-center bg-gray-50 border-b p-4">
        <img src={product.images?.[0]} alt={product.name} className="h-full object-contain mix-blend-multiply" />
      </div>

      {/* Info Block */}
      <div className="p-4">
        <h1 className="text-lg font-bold text-slate-900 leading-snug mb-2">{product.name}</h1>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-green-700 text-white px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1">
            {product.rating_avg || 4.5} <Star size={10} fill="white" />
          </span>
          <span className="text-gray-500 text-xs font-medium">{product.rating_count || 0} Ratings</span>
        </div>

        <div className="flex items-baseline gap-3 mb-4 bg-green-50 p-3 rounded-lg border border-green-100">
          <span className="text-3xl font-bold text-slate-900">₹{selectedPrice}</span>
          {product.original_price > selectedPrice && (
            <>
                <span className="text-gray-400 line-through text-sm">₹{product.original_price}</span>
                <span className="text-green-600 text-xs font-bold">
                    {Math.round(((product.original_price - selectedPrice)/product.original_price)*100)}% OFF
                </span>
            </>
          )}
        </div>

        {/* Dynamic Interface based on Type */}
        <div className="mb-6">
            {uiType === 'packet' && (
               <div className="flex items-center justify-between border p-3 rounded-lg bg-gray-50">
                 <span className="font-bold text-sm text-slate-700">Quantity</span>
                 <div className="flex items-center bg-white border rounded">
                   <button className="px-3 py-1 text-gray-500">-</button>
                   <span className="px-3 font-bold text-sm">1</span>
                   <button className="px-3 py-1 text-green-600">+</button>
                 </div>
               </div>
            )}

            {uiType === 'fashion' && (
              <div>
                  <p className="font-bold text-sm mb-2">Select Size</p>
                  <div className="grid grid-cols-4 gap-3">
                    {product.variants?.map((v, i) => (
                       <div key={i}
                         onClick={() => { setSelectedLabel(v.size); setSelectedPrice(v.price); }}
                         className={`border py-2 rounded text-center cursor-pointer text-sm font-bold ${selectedLabel === v.size ? 'border-blue-600 bg-blue-50 text-blue-700' : 'bg-white'}`}
                       >
                         {v.size}
                       </div>
                    ))}
                  </div>
              </div>
            )}
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex items-center gap-2 text-xs text-gray-600 border p-2 rounded bg-gray-50">
                <Truck size={16} className="text-blue-500"/> Fast Delivery
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600 border p-2 rounded bg-gray-50">
                <ShieldCheck size={16} className="text-green-500"/> Quality Check
            </div>
        </div>

        {/* Description */}
        <div>
            <h3 className="font-bold text-sm mb-1">Description</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{product.description || "No description provided."}</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t p-3 flex gap-2 shadow-lg z-50">
        <button onClick={handleAdd} className="flex-1 bg-white border-2 border-slate-200 text-slate-800 font-bold py-3 rounded-xl text-sm">
          Add to Cart
        </button>
        <button className="flex-1 bg-yellow-400 text-black font-bold py-3 rounded-xl text-sm">
          Buy Now
        </button>
      </div>
    </div>
  );
}