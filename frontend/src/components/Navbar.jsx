import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/fetch.js";
import {
  ShoppingBag,
  Moon,
  Sun,
  Menu,
  X,
  LogOut,
  ShieldCheck,
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [cartCount, setcartCount] = useState(0);
  const [avatar, setAvatar] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Initialize from localStorage to prevent flash of light mode
  const [darkmode, setdarkmode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  const userId = localStorage.getItem("userId");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  // Handle Theme Switching
  useEffect(() => {
    if (darkmode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    setAvatar(localStorage.getItem("userAvatar"));
    const loadCart = async () => {
      if (!userId) return setcartCount(0);
      try {
        const response = await api.get(`/cart/${userId}`);
        const items = response?.data?.items || []
        console.log(items)
        const total = items.reduce(
          (sum, item) => sum + item.quantity,
          0,
        );
        setcartCount(total);
      } catch (err) {
        console.error("Cart error", err);
      }
    };
    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, [darkmode, userId]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userName");
    localStorage.removeItem("userMail");
    localStorage.removeItem("userAvatar");
    localStorage.removeItem("theme");
    setdarkmode(false)
    setcartCount(0);
    setIsMenuOpen(false);
    navigate("/login");
  };

  const staticLinks = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Contact", to: "/contact" },
    { name: "Favourites", to: "/favourites" },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50 px-2 pt-4 sm:px-6 ">
      <nav className="max-w-6xl mx-auto flex justify-between items-center px-4 py-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-white/40 dark:border-slate-800 shadow-xl dark:shadow-black/50 rounded-3xl transition-all duration-500">
        {/* Brand LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <span className="text-white font-black italic text-lg">F</span>
          </div>
          <span className="font-black text-xl tracking-tighter text-slate-800 dark:text-white">
            FINE
            <span className="text-indigo-600 dark:text-indigo-400">STORE</span>
          </span>
        </Link>

        {/* Desktop Panel */}
        <div className="hidden lg:flex items-center gap-6">
          {staticLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}

          {isAdmin && (
            <Link
              to="/admin/products"
              className="flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 hover:text-amber-600 transition-colors"
            >
              <ShieldCheck size={14} /> Admin
            </Link>
          )}

          {/* Theme Toggle */}
          {userId && (
            <button
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-amber-400 hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-inner"
              onClick={() => setdarkmode(!darkmode)}
            >
              {darkmode ? (
                <Sun size={18} strokeWidth={2.5} />
              ) : (
                <Moon size={18} strokeWidth={2.5} />
              )}
            </button>
          )}

          {userId && (
            <button
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 p-0.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer"
            >
              <img
                src={avatar || "https://ui-avatars.com/api/?name=User"}
                alt="User"
                className="w-9 h-9 rounded-full object-cover shadow-sm ring-2 ring-transparent hover:ring-indigo-500 transition-all"
              />
            </button>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="relative p-3 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors group"
          >
            <ShoppingBag
              size={20}
              className="text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
            />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[9px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-lg">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Desktop Auth */}
          <div className="hidden lg:flex">
            {!userId ? (
              <Link
                to="/login"
                className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-600 dark:hover:bg-indigo-400 transition-all shadow-lg"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={logout}
                className="p-3 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-full transition-all cursor-pointer"
              >
                <LogOut size={20} />
              </button>
            )}
          </div>

          {/* Hamburger Button */}
          <button
            className="lg:hidden p-3 bg-slate-900 dark:bg-slate-800 text-white rounded-full transition-all active:scale-90"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4 p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] shadow-2xl transition-all">
          <div className="flex flex-col gap-4">
            {staticLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest py-3 px-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                {link.name}
              </Link>
            ))}

            {isAdmin && (
              <Link
                to="/admin/products"
                className="flex items-center gap-3 py-3 px-4 rounded-2xl text-sm font-bold text-slate-800 dark:text-amber-400 uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                <ShieldCheck size={14} /> Admin
              </Link>
            )}

            
          {userId && (
            <button
              onClick={() => navigate("/profile")}
              className="flex items-center gap-3 py-3 px-4 rounded-2xl text-sm font-bold text-slate-800 dark:text-amber-400 uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              <img
                src={avatar || "https://ui-avatars.com/api/?name=User"}
                alt="User"
                className="w-9 h-9 rounded-full object-cover shadow-sm ring-2 ring-transparent hover:ring-indigo-500 transition-all"
              />
            </button>
          )}

            <hr className="border-slate-100 dark:border-slate-800" />

            {/* Mobile Theme Toggle */}
            {userId && (
              <button
                className="flex items-center gap-3 py-3 px-4 rounded-2xl text-sm font-bold text-slate-800 dark:text-amber-400 uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                onClick={() => setdarkmode(!darkmode)}
              >
                {darkmode ? <Sun size={20} /> : <Moon size={20} />}
                {darkmode ? "Light Mode" : "Dark Mode"}
              </button>
            )}

            {!userId ? (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-center py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={logout}
                className="bg-rose-50 dark:bg-rose-500/10 text-rose-600 py-4 rounded-2xl font-black uppercase tracking-widest transition-all"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
