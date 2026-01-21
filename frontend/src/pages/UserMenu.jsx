import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, Clock, Info, Search, Leaf, 
  Plus, Minus, ShoppingBag, ArrowLeft,
  ChevronRight, Share2, Heart, Percent, Zap
} from 'lucide-react';
import { apiRequest } from '../utils/api';

const RestaurantMenu = () => {
  const { partnerId } = useParams(); // Restaurant ID from URL
  const navigate = useNavigate();

  /* --- STATE --- */
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  /* --- FETCH DATA --- */
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        // Fetch restaurant info and its specific food items
        const res = await apiRequest(`/food/restaurant/${partnerId}`);
 
        const data = res.data || res;
        
        // Assuming the backend returns { restaurant: {...}, foods: [...] }
        setRestaurant(data.restaurant || { name: "The Burger Joint", rating: 4.8, time: "25-30", address: "Downtown" });
        setMenuItems(data.foods || data); 
      } catch (err) {
        console.error("Error fetching menu:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [partnerId]);

  /* --- CART LOGIC --- */
  const updateCart = (item, delta) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i._id === item._id);
      let newCart;

      if (existingItem) {
        if (existingItem.qty + delta <= 0) {
          newCart = prevCart.filter((i) => i._id !== item._id);
        } else {
          newCart = prevCart.map((i) =>
            i._id === item._id ? { ...i, qty: i.qty + delta } : i
          );
        }
      } else {
        newCart = [...prevCart, { ...item, qty: 1 }];
      }
      
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  /* --- FILTERING --- */
  const filteredMenu = menuItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (activeCategory === "All" || item.category === activeCategory)
  );

  const categories = ["All", ...new Set(menuItems.map(item => item.category))];

  if (loading) return <div className="min-h-screen flex items-center justify-center font-black italic text-2xl animate-pulse">FOODY.</div>;

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* --- 1. STICKY NAV --- */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 font-bold text-slate-600 hover:text-emerald-600 transition"
        >
          <ArrowLeft size={20} /> <span>Back to Home</span>
        </button>
        <div className="flex gap-4">
          <button className="p-2.5 bg-slate-50 rounded-xl hover:bg-slate-100 transition"><Share2 size={18} /></button>
          <button className="p-2.5 bg-slate-50 rounded-xl hover:bg-rose-50 hover:text-rose-500 transition"><Heart size={18} /></button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-12">
        
        {/* --- 2. MENU SECTION (Left) --- */}
        <div className="flex-1">
          {/* Restaurant Branding */}
          <div className="mb-10">
            <h1 className="text-5xl font-black mb-3 italic tracking-tighter">{restaurant?.name}</h1>
            <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-slate-400 mb-6">
              <span className="flex items-center gap-1.5 bg-emerald-500 text-white px-3 py-1 rounded-xl">
                {restaurant?.rating || "4.5"} <Star size={14} className="fill-white" />
              </span>
              <span className="flex items-center gap-2"><Clock size={18} className="text-emerald-500" /> {restaurant?.time || "25-30"} mins</span>
              <span className="flex items-center gap-2"><MapPin size={18} className="text-emerald-500" /> {restaurant?.address || "Nearby"}</span>
            </div>
            
            {/* Promo Banner */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 p-4 rounded-[2rem] flex items-center gap-4">
              <div className="bg-white p-3 rounded-2xl shadow-sm text-emerald-600"><Percent size={24}/></div>
              <div>
                <p className="font-black text-emerald-800">60% OFF up to ₹120</p>
                <p className="text-xs font-bold text-emerald-600/70 uppercase">Use Code: STEALDEAL</p>
              </div>
            </div>
          </div>

          {/* Menu Search & Tabs */}
          <div className="sticky top-[81px] bg-white z-40 py-4 border-b border-slate-100 mb-8 flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center bg-slate-50 px-4 py-3 rounded-2xl flex-1 w-full">
              <Search size={18} className="text-slate-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search in menu..." 
                className="bg-transparent outline-none w-full font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar w-full md:w-auto">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-2xl text-sm font-black transition-all whitespace-nowrap ${
                    activeCategory === cat ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Dishes List */}
          <div className="space-y-12">
            {filteredMenu.map((item) => {
              const cartItem = cart.find(i => i._id === item._id);
              return (
                <div key={item._id} className="flex justify-between gap-8 group animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex-1">
                    <div className="mb-2">
                      {item.veg ? (
                        <div className="w-4 h-4 border-2 border-emerald-500 p-0.5 flex items-center justify-center"><div className="w-full h-full bg-emerald-500 rounded-full" /></div>
                      ) : (
                        <div className="w-4 h-4 border-2 border-rose-500 p-0.5 flex items-center justify-center"><div className="w-full h-full bg-rose-500 rounded-full" /></div>
                      )}
                    </div>
                    <h4 className="text-2xl font-black mb-1 group-hover:text-emerald-600 transition leading-tight">{item.name}</h4>
                    <p className="font-black text-lg text-slate-700 mb-3">₹{item.price}</p>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-lg">
                      {item.description || "The chef's special recipe, prepared with fresh ingredients and authentic spices."}
                    </p>
                  </div>

                  <div className="relative flex-shrink-0">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-50">
                      <img src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                    </div>
                    {/* Dynamic Add Button */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 shadow-2xl">
                      {!cartItem ? (
                        <button 
                          onClick={() => updateCart(item, 1)}
                          className="w-full bg-white text-emerald-600 border border-emerald-100 py-3 rounded-2xl font-black hover:bg-emerald-50 transition active:scale-95 shadow-xl"
                        >
                          ADD
                        </button>
                      ) : (
                        <div className="w-full bg-emerald-500 text-white flex items-center justify-between px-3 py-3 rounded-2xl font-black shadow-xl">
                          <button onClick={() => updateCart(item, -1)} className="hover:scale-125 transition"><Minus size={18} /></button>
                          <span>{cartItem.qty}</span>
                          <button onClick={() => updateCart(item, 1)} className="hover:scale-125 transition"><Plus size={18} /></button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- 3. CART SIDEBAR (Right) --- */}
        <div className="hidden lg:block w-96 sticky top-28 h-[calc(100vh-140px)]">
          <div className="bg-slate-50 rounded-[3rem] p-8 border border-slate-100 h-full flex flex-col shadow-sm">
            <h3 className="text-3xl font-black mb-8 italic flex items-center gap-3">
              Your Bag <ShoppingBag size={28} className="text-emerald-500" />
            </h3>
            
            <div className="flex-1 overflow-y-auto no-scrollbar space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                  <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mb-4"><ShoppingBag size={32}/></div>
                  <p className="font-bold">Your bag is empty.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item._id} className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800 text-sm">{item.name}</span>
                      <span className="text-xs font-black text-slate-400">₹{item.price * item.qty}</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white px-2 py-1 rounded-xl border border-slate-200">
                      <button onClick={() => updateCart(item, -1)} className="text-emerald-500"><Minus size={14} /></button>
                      <span className="text-sm font-bold">{item.qty}</span>
                      <button onClick={() => updateCart(item, 1)} className="text-emerald-500"><Plus size={14} /></button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-8 mt-8 border-t border-slate-200">
                <div className="flex justify-between mb-6">
                  <span className="font-bold text-slate-400">Subtotal</span>
                  <span className="font-black text-2xl">₹{cartTotal}</span>
                </div>
                <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-slate-900 hover:bg-emerald-600 text-white py-5 rounded-[2rem] font-black text-lg transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 active:scale-95"
                >
                  Checkout <ArrowRight size={20}/>
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* --- 4. MOBILE CART BAR --- */}
      {cart.length > 0 && (
        <div className="lg:hidden fixed bottom-6 left-6 right-6 bg-emerald-600 text-white p-5 rounded-[2rem] shadow-2xl flex items-center justify-between z-50 animate-in slide-in-from-bottom-10">
          <div>
            <p className="text-[10px] font-black uppercase opacity-80">{cart.length} Items in bag</p>
            <p className="text-xl font-black">₹{cartTotal} <span className="text-xs font-medium opacity-60">+ Taxes</span></p>
          </div>
          <button 
            onClick={() => navigate('/checkout')}
            className="flex items-center gap-2 font-black text-lg bg-white text-emerald-600 px-6 py-3 rounded-2xl"
          >
            VIEW CART <ShoppingBag size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

// Simple internal icon component for address
const MapPin = ({size, className}) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);
const ArrowRight = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
);

export default RestaurantMenu;