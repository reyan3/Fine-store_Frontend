import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/fetch";
import {
  User,
  Package,
  Heart,
  LogOut,
  ShieldCheck,
  MapPin,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";

// Profile
// Get counts of orders and favourites
// set primary address
// Handle delete account
// Handle logout

const ProfileMenu = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    avatar: "",
    isAdmin: false,
  });
  const [counts, setCounts] = useState({ orders: 0, favourites: 0 });
  const [loading, setLoading] = useState(true);
  const [primaryAddress, setPrimaryAddress] = useState("");

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) {
      setUser({
        id: storedId,
        name: localStorage.getItem("userName") || "User",
        email: localStorage.getItem("userMail") || "Not provided",
        avatar: localStorage.getItem("userAvatar"),
        isAdmin: localStorage.getItem("isAdmin") === "true",
      });
      fetchCounts(storedId);
    }
  }, []);

  const fetchCounts = async (userId) => {
    try {
      const res = await api.get(`/quickStats/${userId}`);
      const addressRes = await api.get(`/address/${userId}`);
      if (addressRes.data && addressRes.data.length > 0) {
        setPrimaryAddress(addressRes.data[0]);
      }
      setCounts({
        orders: res.data.countOrder || 0,
        favourites: res.data.countFavourite || 0,
      });
    } catch (err) {
      console.error("Stats fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("This action is permanent. Are you absolutely sure?")) {
      try {
        await api.delete(`/auth/delete/${user.id}`);
        localStorage.clear();
        navigate("/");
      } catch (err) {
        console.error("Deletion failed", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900/50 py-6 transition-colors duration-500">
      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-64 bg-linear-to-b from-indigo-50/50 dark:from-indigo-900/10 to-transparent -z-10" />

      <div className="max-w-7xl mx-auto pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-80 shrink-0 space-y-6">
            <div className="bg-white dark:bg-slate-900/40 backdrop-blur-xl rounded-4xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-black/40 border border-white dark:border-slate-800">
              <div className="flex flex-col items-center text-center">
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-1 bg-linear-to-tr from-indigo-600 to-purple-600 rounded-[2.2rem] blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                  <img
                    src={user.avatar || `https://ui-avatars.com/api/?name=${user.name || 'User'}&background=6366f1&color=fff`}
                    className="relative w-24 h-24 rounded-4xl object-cover border-4 border-white dark:border-slate-800 shadow-sm transition-transform duration-500 group-hover:scale-[1.02]"
                    alt="profile"
                  />
                </div>
                <h2 className="mt-5 text-xl font-black tracking-tight dark:text-white">
                  {user.name}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-4">
                  {user.email}
                </p>
                {user.isAdmin && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-indigo-100 dark:border-indigo-500/20">
                    <ShieldCheck size={12} /> Admin Access
                  </span>
                )}
              </div>

              <nav className="mt-10 space-y-2">
                <button className="w-full flex items-center justify-between p-4 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl shadow-lg shadow-slate-200 dark:shadow-indigo-900/20 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3 font-bold text-sm">
                    <User size={18} /> Overview
                  </div>
                  <ChevronRight size={16} className="opacity-50 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigate("/my-orders")}
                  className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-2xl transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-3 font-bold text-sm">
                    <Package size={18} /> My Orders
                  </div>
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                </button>
              </nav>

              <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-4 text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-2xl transition-all font-bold text-sm group cursor-pointer"
                >
                  <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
                  Sign Out
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Purchases Stat */}
              <div className="bg-white dark:bg-slate-900/40 backdrop-blur-sm rounded-[2.5rem] p-8 border border-white dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 dark:hover:shadow-indigo-900/10 transition-all duration-500 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-4 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                    <Package size={24} />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    Active Store
                  </span>
                </div>
                <h3 className="text-4xl font-black text-slate-900 dark:text-white">
                  {loading ? "..." : counts.orders}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 font-bold text-sm mt-1">
                  Total Purchases
                </p>
              </div>

              {/* Favourites Stat */}
              <div className="bg-white dark:bg-slate-900/40 backdrop-blur-sm rounded-[2.5rem] p-8 border border-white dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-rose-100/50 dark:hover:shadow-rose-900/10 transition-all duration-500 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-4 bg-rose-50 dark:bg-rose-500/10 text-rose-500 dark:text-rose-400 rounded-2xl group-hover:bg-rose-500 group-hover:text-white transition-colors duration-500">
                    <Heart size={24} />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    Saved Items
                  </span>
                </div>
                <h3 className="text-4xl font-black text-slate-900 dark:text-white">
                  {loading ? "..." : counts.favourites}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 font-bold text-sm mt-1">
                  In your Favourites
                </p>
              </div>
            </div>

            {/* Profile Info Card */}
            <div className="bg-white dark:bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white dark:border-slate-800 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-bl-[5rem] -z-10" />

              <h3 className="text-2xl font-black tracking-tight mb-10 dark:text-white">
                Account Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                    Display Name
                  </p>
                  <p className="text-lg font-bold text-slate-800 dark:text-slate-200">
                    {user.name.toUpperCase()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                    Verified Email
                  </p>
                  <p className="text-lg font-bold text-slate-800 dark:text-slate-200">
                    {user.email}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                    Default Address
                  </p>
                  <div className="flex items-start gap-2 text-slate-800 dark:text-slate-200 font-bold">
                    <MapPin size={16} className="text-slate-400 mt-1 shrink-0" />
                    {primaryAddress ? (
                      <div className="text-sm">
                        <p className="text-slate-700 dark:text-slate-300">
                          {primaryAddress.addressLine}, {primaryAddress.city}
                        </p>
                        <p className="text-slate-500 dark:text-slate-500 font-medium">
                          {primaryAddress.state} - {primaryAddress.pincode}
                        </p>
                      </div>
                    ) : (
                      <span className="text-sm text-slate-400 italic">No address on file</span>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                    Security Status
                  </p>
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span>2FA Enabled</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-rose-50/50 dark:bg-rose-950/20 rounded-[2.5rem] p-10 border border-rose-100 dark:border-rose-900/30 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 rounded-2xl">
                  <ShieldAlert size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-black text-rose-900 dark:text-rose-400">
                    Deactivate Account
                  </h4>
                  <p className="text-sm text-rose-700/70 dark:text-rose-500/70 font-medium">
                    This will permanently delete all your order history and saved data.
                  </p>
                </div>
              </div>
              <button
                onClick={handleDeleteAccount}
                className="px-8 py-4 bg-white dark:bg-slate-900 text-rose-600 border border-rose-200 dark:border-rose-900/50 rounded-2xl font-black text-sm hover:bg-rose-600 dark:hover:bg-rose-600 hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                Delete Account
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;