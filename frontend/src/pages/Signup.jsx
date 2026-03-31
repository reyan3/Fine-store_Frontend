import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/fetch.js";

// Setting up new account


const Signup = () => {
  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [msg, setmsg] = useState("");

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/signup", form);
      setmsg(response.data.msg);
    } catch (err) {
      setmsg(err.response?.data?.msg || "Internal Error");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden px-4 py-10 pt-24 sm:px-6">
      
      {/* Background Decorative Blurs - Optimized for mobile performance */}
      <div className="hidden sm:block absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-indigo-200/40 rounded-full blur-[100px]"></div>
      <div className="hidden sm:block absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-purple-200/40 rounded-full blur-[100px]"></div>

      {/* Main Glass Card */}
      <div className="w-full max-w-md bg-white sm:bg-white/80 sm:backdrop-blur-xl p-8 sm:p-10 h-auto rounded-[2.5rem] shadow-xl shadow-slate-200/50 sm:border sm:border-white relative z-10 transition-all duration-300">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 bg-indigo-600 rounded-2xl items-center justify-center shadow-lg shadow-indigo-100 mb-4">
             <span className="text-white font-bold text-2xl italic">F</span>
          </div>
          <h2 className="text-3xl font-black tracking-tighter text-slate-900 leading-tight">
            Join the <span className="text-indigo-600">Store.</span>
          </h2>
          <p className="text-slate-500 text-sm mt-2 font-medium">Create an account to start shopping</p>
        </div>

        {/* Status Message */}
        {msg && (
          <div className={`mb-6 p-4 rounded-2xl text-xs sm:text-sm font-bold text-center animate-in fade-in slide-in-from-top-2 ${
            msg.toLowerCase().includes("success") 
              ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
              : "bg-rose-50 text-rose-600 border border-rose-100"
          }`}>
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Full Name Input */}
          <div className="space-y-1">
            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              className="w-full px-5 py-3.5 sm:py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-500 transition-all outline-none text-slate-700"
              required
            />
          </div>

          {/* Email Input */}
          <div className="space-y-1">
            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full px-5 py-3.5 sm:py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-500 transition-all outline-none text-slate-700"
              required
            />
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full px-5 py-3.5 sm:py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-500 transition-all outline-none text-slate-700"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-4 mt-2 rounded-2xl font-bold text-sm sm:text-base hover:bg-indigo-600 shadow-xl shadow-slate-200 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            Create Account
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center mt-8 text-sm text-slate-500 font-medium">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 font-bold hover:underline underline-offset-4 transition-all">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;