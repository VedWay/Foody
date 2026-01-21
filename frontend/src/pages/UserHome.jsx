import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, MapPin, Star, Clock, Heart,
  ChevronDown, User, ShoppingCart, Bike, 
  UtensilsCrossed, Percent, ArrowRight,
  Flame, Zap, SlidersHorizontal, LogOut, Settings,
  Compass, TrendingUp, Award, ShoppingBag, ChevronRight
} from 'lucide-react';
import { apiRequest } from '../utils/api';

/* -------- HELPERS -------- */
const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try { return JSON.parse(atob(token.split(".")[1])); } catch { return null; }
};

const getCart = () => {
  try { return JSON.parse(localStorage.getItem("cart")) || []; } catch { return []; }
};

// Appetite Triggering Categories
const CUISINES = [
  // --- POPULAR CRAVINGS ---
  { name: 'Pizza', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400' },
  { name: 'Burgers', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400' },
  { name: 'Biryani', img: 'https://plus.unsplash.com/premium_photo-1694141252774-c937d97641da?q=80&w=776&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Fried Chicken', img: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  
  // --- GLOBAL FLAVORS ---
  { name: 'Sushi', img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400' },
  { name: 'Tacos', img: 'https://plus.unsplash.com/premium_photo-1661730329741-b3bf77019b39?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGFjb3N8ZW58MHx8MHx8fDA%3D' },
  { name: 'Pasta', img: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=400' },
  { name: 'Ramen', img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400' },
  { name: 'Chinese', img: 'https://images.unsplash.com/photo-1552611052-33e04de081de?w=400' },

];

const UserHome = () => {
  const [activeTab, setActiveTab] = useState('delivery');
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const user = getUserFromToken();
  const cart = getCart();
  const navigate = useNavigate();

  const fetchFoods = useCallback(async () => {
    try {
      setLoading(true);
      const res = await apiRequest('/food/all');
      const list = res?.data || res?.foods || res;
      setRestaurants(Array.isArray(list) ? list : []);
    } catch (err) {
      setError("Failed to load food items.");
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  }, []);

  useEffect(() => { fetchFoods(); }, [fetchFoods]);

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((r) =>
      (r.name?.toLowerCase().includes(search.toLowerCase()) ||
       r.category?.toLowerCase().includes(search.toLowerCase())) &&
      (activeTab === "delivery" ? true : r.type === "dining")
    );
  }, [restaurants, search, activeTab]);

  return (
    <div className="min-h-screen bg-[#FBFCFE] font-sans text-slate-900 pb-20">
      
      {/* --- 1. MODERN GLASS NAV --- */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-slate-100 px-6 md:px-16 py-4 flex items-center justify-between">
        <div className="flex items-center gap-12 flex-1">
          <div className="text-4xl font-black italic tracking-tighter cursor-pointer group" onClick={() => window.location.reload()}>
            foody<span className="text-emerald-500 group-hover:animate-ping inline-block">.</span>
          </div>

          <div className="hidden lg:flex items-center bg-slate-100/60 rounded-[2rem] px-6 py-3 w-full max-w-2xl border border-transparent focus-within:border-emerald-200 focus-within:bg-white focus-within:shadow-xl focus-within:shadow-emerald-100/50 transition-all">
            <div className="flex items-center gap-2 pr-6 border-r border-slate-200 text-sm font-black text-slate-700 hover:text-emerald-600 transition cursor-pointer">
              <MapPin size={18} className="text-emerald-500" />
              <span className="truncate max-w-[120px]">Home, Mumbai</span>
              <ChevronDown size={14} />
            </div>
            <div className="flex items-center gap-3 pl-6 flex-1">
              <Search size={20} className="text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for 'Crispy Dosa' or 'Italian'..."
                className="bg-transparent outline-none w-full font-bold text-slate-600 placeholder:text-slate-300"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 ml-8">
          <button className="relative p-3 bg-white shadow-sm border border-slate-100 rounded-2xl text-slate-600 hover:bg-emerald-500 hover:text-white hover:shadow-emerald-200 hover:shadow-lg transition-all duration-300">
            <ShoppingCart size={22} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] w-6 h-6 rounded-full flex items-center justify-center font-black border-4 border-white">
                {cart.length}
              </span>
            )}
          </button>

          <div className="relative group">
            <div onClick={() => setIsProfileOpen(!isProfileOpen)} className="w-12 h-12 rounded-2xl overflow-hidden cursor-pointer border-2 border-white shadow-md hover:scale-105 transition active:scale-95">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
            </div>
            {isProfileOpen && (
              <div className="absolute right-0 mt-4 w-64 bg-white rounded-[2.5rem] shadow-2xl border border-slate-50 p-4 animate-in fade-in zoom-in-95 duration-200 z-50">
                <div className="px-4 py-3 mb-2">
                  <p className="text-xs font-black text-emerald-500 uppercase tracking-widest">Premium Member</p>
                  <p className="text-lg font-black text-slate-800">{user?.name || "Foodie Guest"}</p>
                </div>
                <div className="h-[1px] bg-slate-50 mx-2 mb-2" />
                <button className="w-full flex items-center gap-3 p-4 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-2xl transition"><User size={18}/> My Profile</button>
                <button className="w-full flex items-center gap-3 p-4 text-sm font-bold text-rose-500 hover:bg-rose-50 rounded-2xl transition"><LogOut size={18}/> Sign Out</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        
        {/* --- 2. BOLD PROMO HERO --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2 relative h-72 bg-slate-900 rounded-[3.5rem] overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1000" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-1000" alt="Hero" />
            <div className="relative z-20 h-full flex flex-col justify-center p-12">
              <span className="bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full w-fit mb-4 tracking-[0.2em] uppercase">Limited Offer</span>
              <h2 className="text-5xl font-black text-white italic tracking-tighter leading-none mb-6">Flavor feast:<br/>Up to 60% OFF</h2>
              <button className="bg-white text-black px-8 py-4 rounded-2xl font-black flex items-center gap-3 w-fit hover:bg-emerald-500 hover:text-white transition-all shadow-xl">
                Order Now <ArrowRight size={20}/>
              </button>
            </div>
          </div>
          <div className="relative h-72 bg-emerald-600 rounded-[3.5rem] p-10 overflow-hidden flex flex-col justify-center shadow-2xl shadow-emerald-100">
            <h2 className="text-4xl font-black text-white italic leading-none mb-2">Foody<br/><span className="text-emerald-200 text-5xl tracking-tighter">GOLD</span></h2>
            <p className="text-emerald-100 font-bold mb-8">No delivery fees. Forever.</p>
            <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black shadow-lg hover:scale-105 transition">Upgrade</button>
            <Bike size={160} className="absolute -right-12 -bottom-4 text-white/10 -rotate-12" />
          </div>
        </div>

        {/* --- 3. VISUAL CATEGORIES (The "Hunger" Section) --- */}
        <section className="mb-16">
          <h3 className="text-2xl font-black italic tracking-tighter mb-8 flex items-center gap-3">
            What's on your mind? <UtensilsCrossed size={24} className="text-emerald-500"/>
          </h3>
          <div className="flex gap-8 overflow-x-auto no-scrollbar pb-4">
            {CUISINES.map((c) => (
              <div key={c.name} className="flex-shrink-0 group cursor-pointer text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-3 border-4 border-white shadow-lg group-hover:shadow-emerald-100 group-hover:border-emerald-500 transition-all duration-500">
                  <img src={c.img} className="w-full h-full object-cover group-hover:scale-125 transition duration-500" alt={c.name} />
                </div>
                <span className="text-sm font-black text-slate-400 group-hover:text-slate-900 transition tracking-tighter uppercase">{c.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* --- 4. TABS & FILTER BAR --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div className="flex gap-12 border-b border-slate-100">
            {['delivery', 'dining'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-6 text-2xl font-black italic capitalize transition-all ${activeTab === tab ? 'text-slate-900' : 'text-slate-300 hover:text-slate-500'}`}
              >
                {tab === 'delivery' ? 'Quick Delivery' : 'Book a Table'}
                {activeTab === tab && <div className="absolute bottom-[-1px] left-0 w-full h-1.5 bg-emerald-500 rounded-full animate-in slide-in-from-left-2" />}
              </button>
            ))}
          </div>

          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-500 hover:border-emerald-500 hover:text-emerald-500 transition"><SlidersHorizontal size={16} /> Filters</button>
            <button className="px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest border bg-white border-slate-100 text-slate-400">Pure Veg</button>
            <button className="px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest border bg-white border-slate-100 text-slate-400">Rating 4.0+</button>
          </div>
        </div>

        {/* --- 5. THE RESTAURANT GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {loading ? (
             [1,2,3,4,5,6,7,8].map(n => (
              <div key={n} className="animate-pulse">
                <div className="bg-slate-200 h-72 rounded-[3.5rem] mb-6" />
                <div className="h-6 bg-slate-200 rounded-lg w-3/4 mb-4" />
                <div className="h-4 bg-slate-200 rounded-lg w-1/2" />
              </div>
            ))
          ) : filteredRestaurants.map((res) => (
            <div 
              key={res._id} 
              className="group cursor-pointer animate-in fade-in slide-in-from-bottom-6 duration-700"
              onClick={() => navigate(`/user/restaurant/${res.foodPartner._id}`)}
            >
              <div className="relative h-72 rounded-[3.5rem] overflow-hidden mb-6 shadow-xl shadow-slate-200/50 group-hover:shadow-emerald-200 group-hover:-translate-y-2 transition-all duration-500">
                <img
                  src={res.image || res.video || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600"}
                  alt={res.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="absolute top-5 left-5 flex flex-col gap-2">
                  {res.rating >= 4.5 && (
                    <span className="bg-white/90 backdrop-blur-md text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl">
                      <Award size={14} /> Top Choice
                    </span>
                  )}
                  {res.discount && (
                    <span className="bg-rose-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl">
                      <Percent size={14} /> {res.discount} OFF
                    </span>
                  )}
                </div>
                
                <button className="absolute top-5 right-5 bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-rose-500 transition-all active:scale-90">
                  <Heart size={20} />
                </button>
                
                <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end transform translate-y-10 group-hover:translate-y-0 transition-transform">
                    <span className="bg-emerald-500 text-white px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2">
                        View Menu <ChevronRight size={14}/>
                    </span>
                </div>
              </div>

              <div className="px-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-black text-2xl text-slate-900 group-hover:text-emerald-600 transition tracking-tighter leading-none">
                    {res.name}
                  </h4>
                  <div className="bg-emerald-500 text-white px-3 py-1 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-lg shadow-emerald-100">
                    {(res.rating || 4.5).toFixed(1)} <Star size={12} className="fill-white" />
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-slate-400 text-sm font-bold mb-4">
                  <span className="truncate">{res.category || "Fusion Cuisine"}</span>
                  <span className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                  <span className="text-slate-900">₹{res.price || "300"} for two</span>
                </div>

                <div className="flex items-center gap-6 pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600"><Clock size={14} /></div>
                    {res.deliveryTime || "20-25"} min
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <div className="p-1.5 bg-amber-50 rounded-lg text-amber-600"><TrendingUp size={14} /></div>
                    Trending Now
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default UserHome;