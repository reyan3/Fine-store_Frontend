import { useEffect, useState } from "react";
import api from "../api/fetch.js";
import Toast from "../components/Toast.jsx";
import { Link } from "react-router-dom";
import {
  Search,
  ChevronDown,
  Plus,
  LayoutGrid,
  ShoppingBag,
  Sparkles,
  MessageCircle,
  X,
  Send,
} from "lucide-react";

// Main Logic and data fetching page

// Chatbot
// Get Products
// Add to cart

const Home = () => {
  const [products, setproducts] = useState([]);
  const [search, setsearch] = useState("");
  const [category, setcategory] = useState("");
  const [show, setShow] = useState(false);
  const [toast, settoast] = useState("");

  // FAQ Chatbot State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatQuery, setChatQuery] = useState("");
  const [chatResponse, setChatResponse] = useState(
    "Hey! Ask me anything about FINESTORE ⭐.",
  );
  const [showBar, setShowBar] = useState(true);

  const loadProducts = async () => {
    try {
      const response = await api.get(
        `/products?search=${search}&category=${category}`,
      );
      setproducts(response.data.products);
    } catch (err) {
      console.error("Error is : ", err.message);
    }
  };

  // Handle FAQ logic
  const handleFAQ = async (e) => {
    e.preventDefault();
    if (!chatQuery) return;
    setChatResponse("Thinking...");
    try {
      const res = await api.post("/openrouterapi/chatbot", {
        prompt: chatQuery,
      });
      setChatResponse(res.data.answer);
    } catch (err) {
      setChatResponse("Couldn't reach the lab. Try again later.");
    } finally {
      setChatQuery("");
    }
  };

  useEffect(() => {
    loadProducts();
    setShow(true);
  }, [search, category]);

  const addToCart = async (productId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      settoast("Please Log in first!");
      return;
    }
    try {
      await api.post(`/cart/add`, { userId, productId });
      settoast("Added to Bag!");
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      settoast("Could not add item");
    }
  };

  const date = new Date();

  // For animation
  const reveal = (delay) => `
    transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) 
    ${delay} 
    ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
  `;

  return (
    <div>
      {toast && <Toast message={toast} onClose={() => settoast(null)} />}

      {/* FineBot Live NOTIFICATION BAR */}
      {showBar && (
        <div className="sticky top-0 z-110 w-full bg-slate-900 opacity-60  dark:bg-indigo-600 py-3 px-4 overflow-hidden group border-b border-white/5">
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full duration-2000 transition-transform" />
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 mx-auto">
              <Sparkles
                size={14}
                className="text-indigo-400 dark:text-white animate-pulse"
              />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white text-center">
                FineBot AI is live. Get instant support.
              </p>
            </div>
            <button
              onClick={() => setShowBar(!showBar)}
              className="text-white/40 hover:text-white cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 overflow-hidden">
        {/* Decorative background blur - Adjusted for Dark Mode */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-50 dark:bg-indigo-600/10 rounded-full blur-[120px] -z-10 opacity-60" />

        <div className={`text-center mb-16 ${reveal("delay-0")}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-full mb-8">
            <Sparkles
              size={14}
              className="text-indigo-600 dark:text-indigo-400"
            />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              {date.getFullYear()} Collection Live
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-slate-900 dark:text-white mb-8 leading-[0.9]">
            The New <br />
            <span className="text-indigo-600 dark:text-indigo-500">
              Standard.
            </span>
          </h1>

          <p className="text-slate-400 dark:text-slate-500 max-w-xl mx-auto text-base sm:text-lg font-medium leading-relaxed">
            High-performance hardware for those who build the future. Curated,
            tested, and ready to deploy.
          </p>
        </div>

        {/* Action Bar - Search & Filter */}
        <div className={`max-w-4xl mx-auto mb-20 ${reveal("delay-200")}`}>
          <div className="flex flex-col md:flex-row items-center gap-4 bg-white dark:bg-slate-900/50 dark:backdrop-blur-xl p-3 rounded-4xl sm:rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] dark:shadow-black/50 border border-slate-50 dark:border-slate-800">
            {/* Search Input */}
            <div className="relative w-full group">
              <Search
                className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors"
                size={20}
              />
              <input
                type="text"
                placeholder="Search the lab..."
                value={search}
                onChange={(e) => setsearch(e.target.value)}
                className="w-full pl-16 pr-6 py-5 rounded-[2.5rem] bg-slate-50 dark:bg-slate-950 border-transparent dark:border-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-indigo-500/5 outline-none text-slate-800 dark:text-white font-bold placeholder:text-slate-300 dark:placeholder:text-slate-700 transition-all"
              />
            </div>

            {/* Category Select */}
            <div className="relative w-full md:w-80 group">
              <select
                value={category}
                onChange={(e) => setcategory(e.target.value)}
                className="w-full appearance-none pl-8 pr-12 py-5 bg-slate-900 dark:bg-indigo-600 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-widest outline-none cursor-pointer hover:bg-slate-800 dark:hover:bg-indigo-500 transition-all shadow-xl shadow-slate-200 dark:shadow-none"
              >
                <option value="">All Categories</option>
                <option value="Laptops">Laptops</option>
                <option value="Tab">Tabs</option>
                <option value="Gaming">Consoles</option>
                <option value="Clothes">Clothes</option>
                <option value="Phones">Mobiles</option>
              </select>
              <ChevronDown
                className="absolute right-6 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
                size={18}
              />
            </div>
          </div>
        </div>

        {/* Dynamic Grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 ${reveal("delay-500")}`}
        >
          {products.map((p) => (
            <div key={p._id} className="group flex flex-col">
              {/* Image Frame - Glassmorphism in Dark Mode */}
              <Link
                to={`/productDetail/${p._id}`}
                className="relative aspect-4/5 rounded-[2.5rem] overflow-hidden flex items-center justify-center p-10 bg-slate-50/50 dark:bg-slate-900/40 border border-transparent dark:border-slate-800 group-hover:border-slate-100 dark:group-hover:border-slate-700 transition-all duration-700"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal brightness-100 dark:brightness-90 group-hover:scale-110 transition-transform duration-1000 ease-out"
                />

                {/* Overlay Badge */}
                <div className="absolute top-6 left-6">
                  <span className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.15em] text-slate-800 dark:text-slate-200 shadow-sm border border-slate-100 dark:border-slate-800">
                    {p.category || "In Stock"}
                  </span>
                </div>

                {/* Quick Add Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(p._id);
                  }}
                  className="absolute bottom-6 right-6 p-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl shadow-xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:bg-indigo-600 dark:hover:bg-indigo-500 cursor-pointer"
                >
                  <Plus size={20} />
                </button>
              </Link>

              {/* Product Info */}
              <div className="pt-6 px-2">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-black text-slate-900 dark:text-white text-lg uppercase tracking-tight leading-tight line-clamp-2 transition-colors">
                    {p.title}
                  </h3>
                  <p className="font-black text-slate-900 dark:text-white text-xl tracking-tighter transition-colors">
                    <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mr-0.5">
                      ₹
                    </span>
                    {p.price.toLocaleString()}
                  </p>
                </div>

                <p className="mt-2 text-slate-400 dark:text-slate-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                  <LayoutGrid size={10} /> {p.category || "Premium Gear"}
                </p>

                <button
                  onClick={() => addToCart(p._id)}
                  className="mt-6 w-full py-4 bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-500 group-hover:bg-slate-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-slate-950 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 flex items-center justify-center gap-3 cursor-pointer"
                >
                  <ShoppingBag size={14} />
                  Move to Bag
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-40">
            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-8 transition-colors">
              <Search
                size={32}
                className="text-slate-200 dark:text-slate-700"
              />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter transition-colors">
              No gear matches
            </h3>
            <p className="text-slate-400 dark:text-slate-600 font-bold text-xs uppercase tracking-widest mt-3">
              Reset filters to try again
            </p>
          </div>
        )}
      </section>

      {/* --- FAQ CHATBOT UI --- */}
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-100 flex flex-col items-end">
        {/* Chat Window */}
        {isChatOpen && (
          <div className="mb-4 w-[85vw] sm:w-95 max-w-95 bg-white/80 dark:bg-slate-900/90 backdrop-blur-2xl border border-slate-200/50 dark:border-slate-800 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden transition-all animate-in fade-in slide-in-from-bottom-5 duration-300">
            {/* Header - Stays sticky at the top of the popup */}
            <div className="p-5 sm:p-6 bg-indigo-600 dark:bg-indigo-500 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                  <Sparkles size={16} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-white font-black text-[10px] uppercase tracking-[0.2em]">
                    Fine Bot
                  </h3>
                  <span className="text-indigo-100 text-[8px] font-bold uppercase tracking-widest opacity-80">
                    AI Assistant
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-all cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Content - Scrollable area */}
            <div className="p-6 sm:p-8 h-72 sm:h-80 overflow-y-auto scrollbar-hide flex flex-col gap-4">
              {/* Bot Message Bubble */}
              <div className="flex flex-col gap-1 max-w-[85%] self-start">
                <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-3xl rounded-tl-none border border-slate-200/50 dark:border-slate-700/50">
                  <p
                    className={
                      chatResponse === "Thinking..."
                        ? `text-xs sm:text-[13px] font-bold text-slate-700 dark:text-slate-200 leading-relaxed animate-pulse`
                        : `text-xs sm:text-[13px] font-bold text-slate-700 dark:text-slate-200 leading-relaxed`
                    }
                  >
                    {chatResponse}
                  </p>
                </div>
                <span className="text-[8px] uppercase tracking-widest font-black text-slate-400 dark:text-slate-500 ml-2">
                  FineBot • Just now
                </span>
              </div>
            </div>

            {/* Input Area - Fixed at bottom of popup */}
            <form
              onSubmit={handleFAQ}
              className="p-4 bg-slate-50/50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 flex gap-2"
            >
              <input
                type="text"
                placeholder="Ask a question..."
                value={chatQuery}
                onChange={(e) => setChatQuery(e.target.value)}
                className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-3 text-xs font-bold text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-indigo-400/30 transition-all"
              />
              <button
                type="submit"
                className="p-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-2xl hover:bg-indigo-700 dark:hover:bg-indigo-400 hover:shadow-lg hover:shadow-indigo-500/30 transition-all cursor-pointer disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        )}

        {/* Toggle Button - Main Action */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-14 h-14 sm:w-16 sm:h-16 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-[1.8rem] sm:rounded-4xl flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer group relative overflow-hidden"
        >
          {/* Subtle Inner Glow for Dark Mode */}
          <div className="absolute inset-0 bg-linear-to-tr from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {isChatOpen ? (
            <X size={24} className="relative z-10" />
          ) : (
            <div className="relative z-10 flex items-center justify-center">
              <MessageCircle
                size={24}
                className="group-hover:rotate-12 transition-transform"
              />
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default Home;
