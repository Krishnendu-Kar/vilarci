import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { Clock, CheckCircle2 } from 'lucide-react';

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('id', { ascending: false });
      if (data) setServices(data);
    };
    fetchServices();
  }, []);

  return (
    <div className="pt-[5px] pb-10 px-4 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-extrabold text-slate-900 mb-4">Home Services</h1>
      
      <div className="grid grid-cols-1 gap-4">
        {services.map((svc) => (
          <div key={svc.slug} className="bg-white rounded-xl border overflow-hidden shadow-sm flex flex-col">
            <div className="relative h-40 bg-gray-200">
               <img src={svc.image_url} alt={svc.name} className="h-full w-full object-cover" />
               {svc.badge_label && (
                   <span className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded">
                       {svc.badge_label}
                   </span>
               )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg text-slate-800">{svc.name}</h3>
              <div className="flex items-center gap-3 text-slate-500 text-xs mt-2 mb-4">
                <span className="flex items-center gap-1"><Clock size={12} /> {svc.duration_minutes} mins</span>
                <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-green-500"/> Verified</span>
              </div>
              <div className="flex justify-between items-center border-t pt-3">
                <div>
                    <span className="font-extrabold text-xl text-slate-900">₹{svc.price}</span>
                    {svc.normal_price && <span className="ml-2 text-xs text-gray-400 line-through">₹{svc.normal_price}</span>}
                </div>
                <button className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-1.5 rounded-lg font-bold text-sm">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}