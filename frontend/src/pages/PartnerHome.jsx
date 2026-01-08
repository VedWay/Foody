import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Utensils, 
  Star, 
  TrendingUp, 
  Settings, 
  LogOut, 
  Bell, 
  Check, 
  X, 
  Clock, 
  ChevronRight,
  Circle
} from 'lucide-react';

const PartnerHome = () => {
  const [isOpen, setIsOpen] = useState(true);

  const activeOrders = [
    { id: "#FD-9021", items: "2x Classic Burger, 1x Large Fries", total: "$32.50", time: "5 mins ago", status: "New" },
    { id: "#FD-9018", items: "1x Family Pizza, 3x Coke", total: "$45.00", time: "12 mins ago", status: "Preparing" },
    { id: "#FD-9015", items: "4x Spicy Tacos", total: "$22.00", time: "18 mins ago", status: "Preparing" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      
      {/* --- 1. SIDEBAR --- */}
      <aside className="w-64 bg-slate-900 text-slate-400 flex flex-col hidden lg:flex">
        <div className="p-8 text-2xl font-black text-white italic">
          foody<span className="text-emerald-500">.</span> <span className="text-[10px] uppercase tracking-widest block opacity-50 not-italic">Merchant</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          {[
            { name: 'Dashboard', icon: <LayoutDashboard size={20} />, active: true },
            { name: 'Live Orders', icon: <ClipboardList size={20} />, badge: "3" },
            { name: 'Menu Manager', icon: <Utensils size={20} /> },
            { name: 'Reviews', icon: <Star size={20} /> },
            { name: 'Insights', icon: <TrendingUp size={20} /> },
            { name: 'Store Settings', icon: <Settings size={20} /> },
          ].map((item, i) => (
            <button key={i} className={`w-full flex items-center justify-between p-3 rounded-xl transition ${item.active ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-900/20' : 'hover:bg-slate-800 hover:text-white'}`}>
              <div className="flex items-center gap-3 font-semibold text-sm">
                {item.icon} {item.name}
              </div>
              {item.badge && <span className="bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full">{item.badge}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="w-full flex items-center gap-3 p-3 text-sm font-semibold hover:text-white transition">
            <LogOut size={20} /> Log Out
          </button>
        </div>
      </aside>

      {/* --- 2. MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col">
        
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition ${isOpen ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
              <Circle size={10} fill={isOpen ? "currentColor" : "transparent"} className={isOpen ? "animate-pulse" : ""} />
              {isOpen ? "STORES OPEN" : "STORE CLOSED"}
            </div>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-xs font-bold text-slate-400 hover:text-slate-900 transition underline underline-offset-4"
            >
              Toggle Status
            </button>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-slate-400 hover:text-slate-900 transition">
              <Bell size={22} />
              <span className="absolute -top-1 -right-1 bg-rose-500 w-2 h-2 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold leading-none mb-1">The Burger Joint</p>
                <p className="text-[10px] text-slate-400 uppercase font-black">Store ID: #88219</p>
              </div>
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-600 border border-slate-200">
                BJ
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full">
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { label: "Today's Revenue", val: "$1,240.50", trend: "+12%", color: "text-emerald-500" },
              { label: "Total Orders", val: "48", trend: "+5%", color: "text-blue-500" },
              { label: "Avg. Prep Time", val: "14 min", trend: "-2 min", color: "text-purple-500" },
              { label: "Store Rating", val: "4.8", trend: "0.2", color: "text-amber-500" },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
                <div className="flex justify-between items-end">
                  <h3 className="text-2xl font-black">{stat.val}</h3>
                  <span className={`text-xs font-bold px-2 py-1 rounded-lg bg-slate-50 ${stat.color}`}>{stat.trend}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LIVE ORDERS PANEL */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black">Live Orders</h2>
                <button className="text-emerald-600 font-bold text-sm">View All History</button>
              </div>

              <div className="space-y-4">
                {activeOrders.map((order) => (
                  <div key={order.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group hover:border-emerald-500/30 transition">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-emerald-600 font-bold border border-slate-100">
                        {order.status === 'New' ? <Bell size={20} className="animate-bounce" /> : <Clock size={20} />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-black text-lg">{order.id}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${order.status === 'New' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}>
                            {order.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500 font-medium">{order.items}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <div className="text-right hidden sm:block mr-4">
                        <p className="font-bold text-slate-900">{order.total}</p>
                        <p className="text-xs text-slate-400">{order.time}</p>
                      </div>
                      <button className="flex-1 md:flex-none bg-slate-100 hover:bg-rose-100 hover:text-rose-600 p-3 rounded-xl transition text-slate-400">
                        <X size={20} />
                      </button>
                      <button className="flex-1 md:flex-none bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold transition shadow-lg shadow-emerald-200 flex items-center gap-2">
                        <Check size={18} /> Accept
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* QUICK ACTIONS & MENU STATS */}
            <div className="space-y-8">
              <h2 className="text-2xl font-black">Quick Actions</h2>
              <div className="bg-slate-900 rounded-[2rem] p-8 text-white">
                <p className="text-emerald-400 font-bold text-sm mb-2">Need help?</p>
                <h3 className="text-xl font-bold mb-6 italic leading-snug">Connect with your dedicated partner manager</h3>
                <button className="w-full bg-white text-slate-900 py-3 rounded-xl font-bold hover:bg-emerald-400 transition">
                  Contact Support
                </button>
              </div>

              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                <h3 className="font-bold mb-6 flex justify-between items-center">
                  Top Items <span>Last 7 Days</span>
                </h3>
                <div className="space-y-6">
                  {[
                    { name: "Classic Cheeseburger", sales: 124, price: "$1,488" },
                    { name: "Spicy Chicken Wings", sales: 98, price: "$882" },
                    { name: "French Fries Large", sales: 85, price: "$425" },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-slate-300 font-black">0{i+1}</span>
                        <div>
                          <p className="text-sm font-bold text-slate-800">{item.name}</p>
                          <p className="text-xs text-slate-400">{item.sales} orders</p>
                        </div>
                      </div>
                      <span className="font-bold text-emerald-600 text-sm">{item.price}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-8 flex items-center justify-center gap-2 text-slate-400 font-bold text-xs hover:text-slate-900 transition uppercase tracking-widest">
                  View Menu Report <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PartnerHome;