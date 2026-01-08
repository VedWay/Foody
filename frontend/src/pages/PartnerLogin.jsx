import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Store, 
  Lock, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  Briefcase, 
  ChefHat 
} from 'lucide-react';

const PartnerLogin = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
  restaurantName: "",
  businessCategory: "",
  email: "",
  password: ""
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

const navigate = useNavigate();


const handleSubmit = async (e) => {
  e.preventDefault();

  const url = isLogin
    ? "http://localhost:3000/api/auth/partner/login"
    : "http://localhost:3000/api/auth/partner/register";

  const payload = isLogin
    ? {
        email: formData.email,
        password: formData.password
      }
    : formData;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Something went wrong");
      return;
    }

    if (isLogin) {
      localStorage.setItem("partnerToken", data.token);
      alert("Partner login successful");
      navigate("/partner/home");
    } else {
      alert("Registration successful. Please login.");
      setIsLogin(true);
    }

  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};


  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row font-sans">
      
      {/* --- Left Side: Professional Branding --- */}
      <div className="hidden lg:flex lg:w-5/12 bg-slate-900 relative flex-col justify-between p-12 overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-emerald-500 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[10%] left-[-10%] w-80 h-80 bg-blue-500 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10">
          <div className="text-3xl font-black text-white mb-16 tracking-tighter">
            foody<span className="text-emerald-400">.</span> <span className="text-xs uppercase tracking-[0.2em] font-light ml-2 opacity-60">Partners</span>
          </div>

          <h2 className="text-5xl font-extrabold text-white leading-tight mb-8">
            {isLogin ? "Welcome back, Chef." : "Take your kitchen to the next level."}
          </h2>
          
          <div className="space-y-6">
            {[
              "Manage orders in real-time",
              "Access deep growth analytics",
              "Weekly automated payouts",
              "24/7 dedicated merchant support"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-emerald-100/80">
                <CheckCircle2 size={20} className="text-emerald-400" />
                <span className="text-lg font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-3xl">
          <p className="text-white italic opacity-80 mb-4">
            "Switching to Foody increased our delivery volume by 40% in the first three months. The merchant dashboard is a game changer."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center font-bold text-white">MK</div>
            <div>
              <p className="text-white font-bold text-sm"> Mahesh Kumar</p>
              <p className="text-slate-400 text-xs">Owner, PizzaBay</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Right Side: Partner Form --- */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-16 bg-slate-50 md:bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo Only */}
          <div className="lg:hidden text-2xl font-black mb-8 text-center">
            foody<span className="text-emerald-500">.</span> <span className="text-xs uppercase opacity-50">Partners</span>
          </div>

          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
              {isLogin ? "Merchant Login" : "Merchant Registration"}
            </h1>
            <p className="text-slate-500">
              {isLogin 
                ? "Access your store dashboard and manage operations." 
                : "Fill out the business profile to start selling on Foody."}
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="relative">
                  <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    name="restaurantName"
                    placeholder="Restaurant / Business Name" 
                    value={formData.restaurantName}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition"
                  />
                </div>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <select className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition appearance-none text-slate-500"
                    name="businessCategory"
                    value={formData.businessCategory}
                    onChange={handleChange}
                  >
                    <option>Select Business Category</option>
                    <option>Fine Dining</option>
                    <option>Fast Food / QSR</option>
                    <option>Home Kitchen</option>
                    <option>Bakery & Sweets</option>
                  </select>
                </div>
              </>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Business Email Address" 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange} 
                placeholder="Password" 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition"
              />
            </div>

            {isLogin && (
              <div className="text-right">
                <button className="text-emerald-600 font-bold text-sm hover:text-emerald-700 transition">Forgot merchant password?</button>
              </div>
            )}

            <button className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-2xl font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-2 group mt-6">
              {isLogin ? "Sign In to Dashboard" : "Register My Business"}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
            </button>
          </form>

          {/* Toggle Button */}
          <div className="mt-10 p-6 bg-slate-50 rounded-3xl border border-slate-100 text-center">
            <p className="text-slate-500 text-sm">
              {isLogin ? "New to the platform?" : "Already a partner?"}{' '}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-emerald-600 font-black hover:underline ml-1"
              >
                {isLogin ? "Start Selling Now" : "Back to Login"}
              </button>
            </p>
          </div>
          
          <div className="mt-8 flex justify-center gap-6 text-slate-400 grayscale opacity-50">
            <ChefHat size={24} />
            <Store size={24} />
            <Briefcase size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerLogin;