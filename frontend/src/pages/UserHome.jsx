import React, { useState, useEffect } from 'react';
import { 
  Search, MapPin, Filter, Star, Clock, Heart, 
  ChevronDown, User, ShoppingCart, Percent, 
  ArrowRight, Bike, UtensilsCrossed 
} from 'lucide-react';
import { apiRequest } from '../utils/api';

const UserHome = () => {
  const [activeTab, setActiveTab] = useState('delivery');
  const [activeFilter, setActiveFilter] = useState('All');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFoods = async () => {
  try {
    setLoading(true);
    setError(null);

    const res = await apiRequest('/food/all'); // public OR user-safe
    const list = res.data || res.foods || res;

    setRestaurants(Array.isArray(list) ? list : []);
  } catch (err) {
    console.error("Error fetching food items:", err);
    setError(err.message || "Failed to load restaurants");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchFoods();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold">
        Loading restaurants...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* --- TOP NAV --- */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 px-4 md:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6 flex-1">
          <div className="text-2xl font-black text-slate-900 italic">
            foody<span className="text-emerald-500">.</span>
          </div>
          <div className="hidden md:flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 w-full max-w-2xl shadow-sm">
            <div className="flex items-center gap-2 pr-3 border-r border-slate-300 min-w-[180px] text-sm text-slate-600">
              <MapPin size={16} className="text-emerald-500" />
              <span className="truncate">Home - 42nd Avenue...</span>
              <ChevronDown size={14} />
            </div>
            <div className="flex items-center gap-2 pl-3 flex-1 text-sm">
              <Search size={16} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search for 'Crispy Chicken'..."
                className="bg-transparent outline-none w-full"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6 ml-4">
          <button className="relative p-2 text-slate-600 hover:bg-slate-50 rounded-full transition">
            <ShoppingCart size={22} />
            <span className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              2
            </span>
          </button>
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 group-hover:bg-emerald-50 transition">
              <User size={20} />
            </div>
            <span className="hidden sm:block font-bold text-sm text-slate-700">
              Alex <ChevronDown size={14} className="inline" />
            </span>
          </div>
        </div>
      </nav>

      {/* --- SERVICE TABS --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-6">
        <div className="flex gap-12 border-b border-slate-100 mb-8">
          <button
            onClick={() => setActiveTab('delivery')}
            className={`flex items-center gap-3 pb-4 border-b-2 transition-all ${
              activeTab === 'delivery'
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-slate-400'
            }`}
          >
            <div
              className={`p-2 rounded-full ${
                activeTab === 'delivery' ? 'bg-emerald-100' : 'bg-slate-100'
              }`}
            >
              <Bike size={24} />
            </div>
            <span className="text-xl font-bold">Delivery</span>
          </button>
          <button
            onClick={() => setActiveTab('dining')}
            className={`flex items-center gap-3 pb-4 border-b-2 transition-all ${
              activeTab === 'dining'
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-slate-400'
            }`}
          >
            <div
              className={`p-2 rounded-full ${
                activeTab === 'dining' ? 'bg-emerald-100' : 'bg-slate-100'
              }`}
            >
              <UtensilsCrossed size={24} />
            </div>
            <span className="text-xl font-bold">Dining Out</span>
          </button>
        </div>

        {/* --- RESTAURANT GRID --- */}
        <h2 className="text-3xl font-black mb-8 text-slate-900 italic">
          Top rated near you
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {restaurants.length === 0 && (
            <div className="col-span-full text-center text-slate-500 font-medium">
              No restaurants found.
            </div>
          )}
          {restaurants.map((res) => (
            <div key={res._id} className="group cursor-pointer">
              <div className="relative h-56 rounded-[2rem] overflow-hidden mb-4">
                <img
                  src={res.image || 'https://via.placeholder.com/500'}
                  alt={res.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
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
                  <h4 className="font-bold text-lg text-slate-900 group-hover:text-emerald-600 transition">
                    {res.name}
                  </h4>
                  <div className="flex items-center gap-2 text-slate-400 text-sm mt-1 font-medium">
                    <span>{res.description}</span>
                    <span>•</span>
                    <span>${res.price} for two</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="bg-emerald-500 text-white px-2 py-0.5 rounded-lg text-xs font-bold flex items-center gap-1">
                    {res.rating || 4.5} <Star size={10} className="fill-white" />
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
                    <Clock size={12} /> {res.time || '25-30'} min
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
