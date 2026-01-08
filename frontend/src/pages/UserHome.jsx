import React, { useState } from 'react';
import { 
  Search, MapPin, Filter, Star, Clock, Heart, 
  ChevronDown, User, ShoppingCart, Percent, 
  ArrowRight, Bike, UtensilsCrossed 
} from 'lucide-react';

const UserHome = () => {
  const [activeTab, setActiveTab] = useState('delivery');
  const [activeFilter, setActiveFilter] = useState('All');

  const restaurants = [
    { id: 1, name: "The Green Bowl", rating: 4.5, time: "25-30", price: "$20", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500", offer: "40% OFF", tag: "Healthy" },
    { id: 2, name: "Luigi's Pizzeria", rating: 4.2, time: "30-40", price: "$15", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500", offer: "Free Delivery", tag: "Pizza" },
    { id: 3, name: "Sushi Master", rating: 4.8, time: "20-25", price: "$35", img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500", offer: "Buy 1 Get 1", tag: "Japanese" },
    { id: 4, name: "Burger Theory", rating: 4.0, time: "15-20", price: "$12", img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500", offer: null, tag: "Burgers" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* --- 1. TOP NAV (Compact) --- */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 px-4 md:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6 flex-1">
          <div className="text-2xl font-black text-slate-900 italic">foody<span className="text-emerald-500">.</span></div>
          
          {/* Address & Search Bar */}
          <div className="hidden md:flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 w-full max-w-2xl shadow-sm">
            <div className="flex items-center gap-2 pr-3 border-r border-slate-300 min-w-[180px] text-sm text-slate-600">
              <MapPin size={16} className="text-emerald-500" />
              <span className="truncate">Home - 42nd Avenue...</span>
              <ChevronDown size={14} />
            </div>
            <div className="flex items-center gap-2 pl-3 flex-1 text-sm">
              <Search size={16} className="text-slate-400" />
              <input type="text" placeholder="Search for 'Crispy Chicken'..." className="bg-transparent outline-none w-full" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 ml-4">
          <button className="relative p-2 text-slate-600 hover:bg-slate-50 rounded-full transition">
            <ShoppingCart size={22} />
            <span className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">2</span>
          </button>
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 group-hover:bg-emerald-50 transition">
              <User size={20} />
            </div>
            <span className="hidden sm:block font-bold text-sm text-slate-700">Alex <ChevronDown size={14} className="inline" /></span>
          </div>
        </div>
      </nav>

      {/* --- 2. SERVICE TABS --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-6">
        <div className="flex gap-12 border-b border-slate-100 mb-8">
          <button 
            onClick={() => setActiveTab('delivery')}
            className={`flex items-center gap-3 pb-4 border-b-2 transition-all ${activeTab === 'delivery' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-slate-400'}`}
          >
            <div className={`p-2 rounded-full ${activeTab === 'delivery' ? 'bg-emerald-100' : 'bg-slate-100'}`}><Bike size={24} /></div>
            <span className="text-xl font-bold">Delivery</span>
          </button>
          <button 
            onClick={() => setActiveTab('dining')}
            className={`flex items-center gap-3 pb-4 border-b-2 transition-all ${activeTab === 'dining' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-slate-400'}`}
          >
            <div className={`p-2 rounded-full ${activeTab === 'dining' ? 'bg-emerald-100' : 'bg-slate-100'}`}><UtensilsCrossed size={24} /></div>
            <span className="text-xl font-bold">Dining Out</span>
          </button>
        </div>

        {/* --- 3. PROMO SLIDERS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-6 rounded-[2rem] text-white flex justify-between items-center relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-1 leading-tight">Up to 60% OFF</h3>
              <p className="opacity-80 text-sm mb-4 font-medium">On your first 5 orders!</p>
              <button className="bg-white text-emerald-600 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest">Code: FOODY60</button>
            </div>
            <Percent size={100} className="absolute -right-4 -bottom-4 opacity-20 rotate-12 group-hover:scale-110 transition" />
          </div>
          <div className="bg-slate-900 p-6 rounded-[2rem] text-white flex justify-between items-center relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-1 leading-tight">Foody Premium</h3>
              <p className="opacity-80 text-sm mb-4 font-medium">Unlimited Free Delivery</p>
              <button className="bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-1">Upgrade <ArrowRight size={14} /></button>
            </div>
            <Star size={100} className="absolute -right-4 -bottom-4 opacity-10 -rotate-12" />
          </div>
          <div className="hidden lg:flex bg-amber-50 p-6 rounded-[2rem] border border-amber-100 flex-col justify-center">
             <h4 className="text-amber-800 font-bold text-lg mb-1">Welcome back, Alex!</h4>
             <p className="text-amber-700/60 text-sm">You have 450 points to spend.</p>
             <div className="w-full bg-amber-200 h-2 rounded-full mt-4 overflow-hidden">
                <div className="bg-amber-500 h-full w-[70%]"></div>
             </div>
          </div>
        </div>

        {/* --- 4. FILTERS --- */}
        <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar">
          <button className="flex items-center gap-2 border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 transition"><Filter size={16}/> Filters</button>
          {['Rating 4.0+', 'Pure Veg', 'Cuisines', 'Fast Delivery', 'Great Offers'].map(filter => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium border transition ${activeFilter === filter ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* --- 5. RESTAURANT GRID --- */}
        <h2 className="text-3xl font-black mb-8 text-slate-900 italic">Top rated near you</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {restaurants.map((res) => (
            <div key={res.id} className="group cursor-pointer">
              <div className="relative h-56 rounded-[2rem] overflow-hidden mb-4">
                <img src={res.img} alt={res.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                {res.offer && (
                   <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-lg">
                      {res.offer}
                   </div>
                )}
                <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-emerald-500 transition">
                  <Heart size={18} />
                </button>
              </div>
              <div className="flex justify-between items-start px-1">
                <div>
                  <h4 className="font-bold text-lg text-slate-900 group-hover:text-emerald-600 transition">{res.name}</h4>
                  <div className="flex items-center gap-2 text-slate-400 text-sm mt-1 font-medium">
                    <span>{res.tag}</span>
                    <span>•</span>
                    <span>{res.price} for two</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                   <div className="bg-emerald-500 text-white px-2 py-0.5 rounded-lg text-xs font-bold flex items-center gap-1">
                     {res.rating} <Star size={10} className="fill-white" />
                   </div>
                   <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
                     <Clock size={12} /> {res.time} min
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserHome;