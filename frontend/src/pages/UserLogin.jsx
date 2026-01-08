import React, { useState } from 'react';
import { Mail, Lock, User, Phone, ArrowRight, Github, Chrome } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const UserLogin = () => {

const [isLogin, setIsLogin] = useState(true);

const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  phoneNumber: "",
  password: ""
});

const navigate = useNavigate();

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};


const handleSubmit = async (e) => {
  e.preventDefault();

  const url = isLogin
    ? "http://localhost:3000/api/auth/user/login"
    : "http://localhost:3000/api/auth/user/register";

  const payload = isLogin
  ? {
      email: formData.email,
      password: formData.password
    }
  : {
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      password: formData.password
    };


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
      localStorage.setItem("token", data.token);
      alert("Login successful");
      navigate("/home");
      // navigate("/") later
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
      
      {/* --- Left Side: Visual Branding --- */}
      <div className="hidden md:flex md:w-1/2 bg-slate-900 relative items-center justify-center p-12 overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-center">
          <img 
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80" 
            alt="Pizza" 
            className="w-80 h-80 object-cover rounded-[3rem] shadow-2xl rotate-3 mb-8 border-8 border-white/10"
          />
          <h2 className="text-white text-4xl font-black mb-4 italic">
            {isLogin ? "Welcome Back to Foody." : "Join the Foody. Family"}
          </h2>
          <p className="text-emerald-100/60 text-lg max-w-sm mx-auto">
            {isLogin 
              ? "The best flavors in the city are just a few clicks away." 
              : "Discover thousands of restaurants and get exclusive member deals."}
          </p>
        </div>
      </div>

      {/* --- Right Side: Auth Form --- */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-16 lg:p-24 bg-gray-50 md:bg-white">
        
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-3xl font-black tracking-tighter mb-10 text-center md:text-left">
            foody<span className="text-emerald-500">.</span>
          </div>

          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {isLogin ? "Sign In" : "Create Account"}
            </h1>
            <p className="text-slate-500">
              {isLogin ? "Enter your details to start ordering" : "Fill in the details to get started"}
            </p>
          </div>
         

          <div className="relative flex items-center justify-center mb-8">
            <div className="border-t border-slate-200 w-full"></div>
            <span className="bg-white px-4 text-slate-400 text-sm absolute">Or use email</span>
          </div>

          {/* Actual Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  name="fullName"
                  placeholder="Full Name" 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="email" 
                name="email"
                placeholder="Email Address" 
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition"
              />
            </div>

            {!isLogin && (
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="tel" 
                  name="phoneNumber"
                  placeholder="Phone Number" 
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition"
                />
              </div>
            )}

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="password" 
                name="password"
                placeholder="Password" 
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition"
              />
            </div>

            {isLogin && (
              <div className="text-right">
                <button className="text-emerald-600 font-semibold text-sm hover:underline">Forgot Password?</button>
              </div>
            )}

            <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2 group">
              {isLogin ? "Sign In" : "Create Account"}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
            </button>
          </form>

          {/* Toggle Button */}
          <p className="mt-8 text-center text-slate-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-emerald-600 font-bold hover:underline"
            >
              {!isLogin ? "Log In"  : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;