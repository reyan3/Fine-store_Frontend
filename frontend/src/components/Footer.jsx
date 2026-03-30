import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 px-6 border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          
          {/* Left: Brand & Tagline */}
          <div className="text-center md:text-left">
            <Link to="/" className="font-black text-2xl tracking-tighter text-slate-800 dark:text-white group">
              FINE<span className="text-indigo-600 dark:text-indigo-400">STORE</span>
            </Link>
            <p className="text-slate-400 dark:text-slate-500 text-sm mt-2 font-medium max-w-50">
              Quality essentials for the modern home.
            </p>
          </div>

          {/* Center: Minimal Links */}
          <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Shop</Link>
            <Link to="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About</Link>
            <Link to="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</Link>
          </div>

          {/* Right: Copyright/Socials */}
          <div className="text-slate-400 dark:text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
            © {currentYear} • Built with <Heart size={10} className="text-rose-500 fill-rose-500" /> by FINESTORE
          </div>

        </div>

        {/* Decorative Polish Section */}
        <div className="mt-12 pt-8 border-t border-gray-50 dark:border-slate-900 flex justify-center">
          <div className="flex gap-4">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 transition-colors"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 transition-colors"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 transition-colors"></span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;