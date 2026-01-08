import React from 'react';
import { Search, MapPin, ChevronRight, Utensils, Zap, Award, Globe, Smartphone} from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="font-sans text-slate-900 bg-white">
      {/* --- 1. PREMIUM HERO SECTION --- */}
      <header className="relative z-10 h-[600px] flex flex-col items-center justify-center px-4 overflow-hidden">

        {/* Modern Background with a subtle zoom effect */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1667388969250-1c7220bf3f37?q=80&w=1810&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Gourmet Food" 
            className="w-full h-full object-cover brightness-[0.6]"
          />
        </div>

        {/* Top Navigation */}
        <nav className="absolute top-0 w-full max-w-7xl flex justify-between items-center p-6 text-white">
          <div className="text-3xl font-black tracking-tighter cursor-pointer">
            foody<span className="text-emerald-400">.</span>
          </div>
          <div className="hidden md:flex gap-8 items-center font-medium opacity-90">
            <Link
                to="/foodpartner/login"
                className="cursor-pointer hover:text-emerald-400 transition"
              >
               For Restaurants
              </Link>
            <button className="bg-white/20 backdrop-blur-md px-5 py-2 rounded-full border border-white/30 hover:bg-white hover:text-emerald-900 transition">
              Get the App
            </button>
            <Link
                to="/user/login"
                className="bg-white/20 backdrop-blur-md px-5 py-2 rounded-full border border-white/30 hover:bg-white hover:text-emerald-900 transition"
              >
                Sign Up
              </Link>

          </div>
        </nav>

        {/* Hero Search Box */}
        <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h2 className="text-white text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg">
            Find your next <span className="text-emerald-400">favorite</span> bite.
          </h2>
          <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto italic">
            Connecting you with over 2,000+ local kitchens
          </p>
          
          <div className="flex flex-col md:flex-row bg-white rounded-2xl p-2 shadow-2xl w-full">
            {/* Location Selector */}
            <div className="flex items-center gap-3 px-4 py-3 md:border-r border-slate-200 min-w-[240px]">
              <MapPin className="text-emerald-500" size={22} />
              <select className="outline-none bg-transparent w-full text-slate-600 font-medium appearance-none cursor-pointer">
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Bangalore</option>
                <option>Chennai</option>
                <option>Kolkata</option>
              </select>
            </div>
            {/* Main Search */}
            <div className="flex items-center gap-3 px-4 py-3 flex-grow">
              <Search size={22} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Search for 'Spicy Ramen' or 'Italian'..." 
                className="outline-none w-full text-lg placeholder:text-slate-400" 
              />
            </div>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95">
              Explore
            </button>
          </div>
        </div>
      </header>

      {/* --- 2. SERVICE SELECTOR --- */}
      <section className="max-w-7xl mx-auto -mt-16 relative z-20 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Instant Delivery", icon: <Zap className="text-amber-500" />, desc: "Fresh meals in 20 mins", color: "bg-amber-50" },
          { title: "Table Booking", icon: <Utensils className="text-emerald-500" />, desc: "Skip the queue at top spots", color: "bg-emerald-50" },
          { title: "Foody Premium", icon: <Award className="text-purple-500" />, desc: "Exclusive deals for members", color: "bg-purple-50" }
        ].map((item, i) => (
          <div key={i} className={`${item.color} p-8 rounded-3xl border border-white shadow-xl hover:-translate-y-2 transition duration-300 cursor-pointer group`}>
            <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition">
              {item.icon}
            </div>
            <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
            <p className="text-slate-600">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* --- 3. CURATED COLLECTIONS --- */}
      <section className="max-w-7xl mx-auto py-24 px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl font-black mb-3 italic">Foody Favorites</h2>
            <p className="text-slate-500 text-lg">Hand-picked selections based on this week's trends</p>
          </div>
          <button className="text-emerald-600 font-bold flex items-center gap-1 hover:gap-2 transition-all">
            See all <ChevronRight size={20} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Late Night Cravings", spots: "14 Spots", img: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=820&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            { name: "Authentic Asian", spots: "22 Spots", img: "https://images.unsplash.com/flagged/photo-1556742524-750f2ab99913?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            { name: "Cozy Brunch", spots: "10 Spots", img: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            { name: "Vegetarian Delights", spots: "18 Spots", img: "https://plus.unsplash.com/premium_photo-1664648005706-98c10e27949f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
          ].map((col, i) => (
            <div key={i} className="relative h-80 rounded-[2rem] overflow-hidden group cursor-pointer shadow-lg">
              <img src={col.img} alt={col.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h4 className="text-xl font-bold mb-1">{col.name}</h4>
                <p className="text-sm opacity-80 flex items-center gap-1">{col.spots} <ChevronRight size={14} /></p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- 4. FOOTER --- */}
      <footer className="bg-slate-900 text-slate-400 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="text-3xl font-black text-white mb-6">foody<span className="text-emerald-400">.</span></div>
              <p className="text-sm leading-relaxed">
                Making quality food accessible to everyone, everywhere. Founded in 2026.
              </p>
            </div>
            <div>
              <h5 className="text-white font-bold mb-6 tracking-widest uppercase text-xs">Explore</h5>
              <ul className="space-y-4 text-sm hover:text-white transition">
                <li className="cursor-pointer">Trending Near Me</li>
                <li className="cursor-pointer">Cuisines</li>
                <li className="cursor-pointer">Healthy Options</li>
                <li className="cursor-pointer">Offers & Coupons</li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-6 tracking-widest uppercase text-xs">Partners</h5>
              <ul className="space-y-4 text-sm">
                <li className="cursor-pointer">Join as a Merchant</li>
                <li className="cursor-pointer">Drive with Foody</li>
                <li className="cursor-pointer">Business Solutions</li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-6 tracking-widest uppercase text-xs">Get App</h5>
              <div className="flex flex-col gap-3">
                <button className="bg-slate-800 text-white px-6 py-3 rounded-xl border border-slate-700 flex items-center gap-3 hover:bg-slate-700 transition">
                  <Globe size={20} /> App Store
                </button>
                <button className="bg-slate-800 text-white px-6 py-3 rounded-xl border border-slate-700 flex items-center gap-3 hover:bg-slate-700 transition">
                  <Smartphone size={20} /> Play Store
                </button>
              </div>
            </div>
          </div>
          <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <p>© 2026 Foody Technologies Inc. All rights reserved.</p>
            <div className="flex gap-6 uppercase tracking-tighter">
              <span className="cursor-pointer hover:text-white">Privacy</span>
              <span className="cursor-pointer hover:text-white">Terms</span>
              <span className="cursor-pointer hover:text-white">Cookies</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;