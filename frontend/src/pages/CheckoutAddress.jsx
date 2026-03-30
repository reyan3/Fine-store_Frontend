import { useState } from "react";
import api from "../api/fetch.js";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ShieldCheck, MapPin, Phone, User, Mail } from "lucide-react";

// Add address

const CheckoutAddress = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [form, setform] = useState({
    fullname: "",
    email: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddresses = async (e) => {
    e.preventDefault();
    try {
      await api.post("/address/add", { ...form, userId });
      navigate("/checkout");
    } catch (err) {
      console.error("error is : ", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-black transition-all group cursor-pointer"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] uppercase tracking-[0.2em]">Return to Cart</span>
        </button>

        <div className="bg-white dark:bg-slate-900/40 backdrop-blur-xl rounded-[3rem] p-8 sm:p-14 shadow-2xl shadow-slate-200/50 dark:shadow-black/40 border border-white dark:border-slate-800 relative overflow-hidden">
          
          {/* Subtle Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100 dark:bg-slate-800">
            <div className="w-1/2 h-full bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.5)]"></div>
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="text-indigo-600" size={24} />
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Shipping <span className="text-indigo-600 dark:text-indigo-400">Hub.</span>
              </h1>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              Confirm your delivery coordinates for FineStore logistics.
            </p>
          </div>

          <form onSubmit={handleAddresses} className="space-y-8">
            {/* Contact Information Group */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-2">
                    <User size={12} /> Full Name
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    required
                    placeholder="Enter your name"
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white dark:focus:bg-slate-950 focus:border-indigo-500 transition-all font-bold text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-2">
                    <Phone size={12} /> Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91"
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white dark:focus:bg-slate-950 focus:border-indigo-500 transition-all font-bold text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-2">
                  <Mail size={12} /> Email for Updates
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="alex@example.com"
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white dark:focus:bg-slate-950 focus:border-indigo-500 transition-all font-bold text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700"
                />
              </div>
            </div>

            {/* Address Group */}
            <div className="pt-4 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-2">
                  Residential Address
                </label>
                <input
                  type="text"
                  name="addressLine"
                  required
                  placeholder="Street, Landmark, Apartment"
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white dark:focus:bg-slate-950 focus:border-indigo-500 transition-all font-bold text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-2">City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all font-bold text-slate-900 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-2">State</label>
                  <input
                    type="text"
                    name="state"
                    required
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all font-bold text-slate-900 dark:text-white"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-2">Zip Code</label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all font-bold text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="group w-full bg-slate-900 dark:bg-indigo-600 text-white py-6 rounded-4xl font-black text-xs uppercase tracking-[0.3em] hover:bg-indigo-600 dark:hover:bg-indigo-500 shadow-2xl shadow-indigo-100 dark:shadow-indigo-900/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer mt-10 px-4"
            >
              Continue to Payment
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-50 dark:border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
             <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                <ShieldCheck size={16} className="text-emerald-500" />
                Secure 256-bit SSL Connection
             </div>
             <div className="flex gap-4">
                <div className="h-6 w-10 bg-slate-100 dark:bg-slate-800 rounded opacity-50"></div>
                <div className="h-6 w-10 bg-slate-100 dark:bg-slate-800 rounded opacity-50"></div>
                <div className="h-6 w-10 bg-slate-100 dark:bg-slate-800 rounded opacity-50"></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutAddress;