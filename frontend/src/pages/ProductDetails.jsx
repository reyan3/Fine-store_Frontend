import { useState, useEffect } from "react";
import api from "../api/fetch.js";
import Toast from "../components/Toast.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  ShoppingBag, 
  Heart, 
  Star, 
  ShieldCheck, 
  Truck, 
} from "lucide-react";

// Specific Product Detail Page
// Get product
// Get Favourite
// Add to cart
// Toggle favourite

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setproduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, settoast] = useState(null);
  const [favorite, setfavorite] = useState(false);
  const navigate = useNavigate();

  const loadProduct = async () => {
    try {
      const response = await api.get("/products");
      const productCheck = response.data.products.find((p) => p._id === id);
      setproduct(productCheck);
    } catch (err) {
      console.error("Error is : ", err.message);
    } finally {
      setLoading(false);
    }
  };

  const checkIsFavorite = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    try {
      const response = await api.get(`/favourites/${userId}`);
      const isFav = response.data.some((f) => f.productId._id === id);
      // some() -> returns bool value
      setfavorite(isFav);
    } catch (err) {
      console.error("Error fetching favorites:", err);
    }
  };

  useEffect(() => {
    checkIsFavorite();
    loadProduct();
  }, [id]);

  const toggleFavourite = async (productId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return alert("Please log in!");
    try {
      await api.post("/favourites/toggle", { userId, productId });
      settoast(favorite ? "Removed from favourites" : "Added to favourites!");
      setfavorite(!favorite);
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  const addToCart = async (productId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please Log in to add items in cart!");
      return;
    }
    settoast("Added to Bag!");
    await api.post(`/cart/add`, { userId, productId });
    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 transition-colors">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
        <h2 className="text-2xl font-black text-slate-400 dark:text-slate-600 uppercase tracking-tighter">
          Product Not Found
        </h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer"
        >
          Go Back Home
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500 animate-slide-up-fade">
      {toast && <Toast message={toast} onClose={() => settoast(null)} />}
      
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-black transition-all group cursor-pointer"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs uppercase tracking-[0.2em]">Go Back</span>
        </button>

        <div className="bg-white dark:bg-slate-900/40 backdrop-blur-xl rounded-[3rem] shadow-2xl shadow-slate-200/60 dark:shadow-black/40 overflow-hidden border border-white dark:border-slate-800 flex flex-col lg:flex-row min-h-125">
          
          {/* Left: Image Side */}
          <div className="w-full lg:w-1/2 bg-slate-50 dark:bg-slate-950 p-10 flex items-center justify-center relative border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800">
            <div className="absolute top-8 left-8 z-10">
              <span className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] text-slate-800 dark:text-slate-200 shadow-sm border border-white dark:border-slate-700">
                {product.category || "Premium"}
              </span>
            </div>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-auto max-h-100 object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-105 mix-blend-multiply dark:mix-blend-normal brightness-100 dark:brightness-90"
            />
          </div>

          {/* Right: Info Side */}
          <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white dark:bg-transparent">
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                  <span className="ml-3 text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">
                    Top Rated Choice
                  </span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6">
                  {product.title}
                </h1>

                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm sm:text-base font-medium">
                  {product.description}
                </p>
              </div>

              {/* Price Section */}
              <div className="py-8 border-y border-slate-50 dark:border-slate-800/50">
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-3">
                  Investment
                </p>
                <div className="flex items-center gap-6">
                  <span className=" text-2xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-slate-300 dark:text-slate-600 line-through text-sm font-bold">
                      ₹{Math.round(product.price * 1.2).toLocaleString()}
                    </span>
                    <span className="text-emerald-500 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest mt-1">
                      Save 20%
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Area */}
              <div className="flex items-center gap-4 w-full">
                <button
                  onClick={() => addToCart(product._id)}
                  className="grow bg-slate-900 dark:bg-indigo-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all shadow-xl dark:shadow-indigo-900/20 active:scale-95 flex items-center justify-center gap-3 cursor-pointer p-3"
                >
                  <ShoppingBag size={18} />
                  Add To Bag
                </button>

                <button
                  onClick={() => toggleFavourite(product._id)}
                  className={`shrink-0 p-5 border rounded-2xl transition-all cursor-pointer ${
                    favorite 
                    ? "bg-rose-50 border-rose-100 text-rose-500 dark:bg-rose-500/10 dark:border-rose-500/20" 
                    : "border-slate-100 dark:border-slate-800 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <Heart size={22} fill={favorite ? "currentColor" : "none"} />
                </button>
              </div>

              {/* Footer Badges */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-indigo-500">
                    <Truck size={18} />
                  </div>
                  <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Free Express Shipping</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-emerald-500">
                    <ShieldCheck size={18} />
                  </div>
                  <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">2 Year Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;