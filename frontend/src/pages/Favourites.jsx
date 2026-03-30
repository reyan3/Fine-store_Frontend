import api from "../api/fetch.js";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Heart,
  Trash2,
  ArrowRight,
  ShoppingBag,
  Ghost,
  ExternalLink,
} from "lucide-react";

// Get favourites
// Remove favourites

const Favourites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchFavorites = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setFavorites([]);
      setLoading(false);
      return;
    }
    try {
      const response = await api.get(`/favourites/${userId}`);
      setFavorites(response.data);
    } catch (err) {
      console.error("Error fetching favorites", err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = async (productId) => {
    const userId = localStorage.getItem("userId");
    try {
      await api.post(`/favourites/toggle`, { userId, productId });
      setFavorites((prev) =>
        prev.filter((item) => item.productId._id !== productId),
      );
    } catch (err) {
      console.error("Removal failed", err);
      fetchFavorites();
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  // Skeleton structure while in loading
  if (loading)
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 pt-32 px-4 sm:px-8 transition-colors duration-500">
        <div className="max-w-6xl mx-auto">
          <div className="h-12 w-64 bg-slate-100 dark:bg-slate-900 rounded-2xl animate-pulse mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-96 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] animate-pulse border border-transparent dark:border-slate-800"
              />
            ))}
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-20 px-4 sm:px-8 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Heart className="text-rose-500 fill-rose-500" size={18} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                Wishlist
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Saved Gear<span className="text-indigo-600 dark:text-indigo-400">.</span>
            </h1>
          </div>
          <p className="hidden sm:block text-slate-400 dark:text-slate-500 font-bold text-sm uppercase tracking-widest">
            {favorites.length} Items Total
          </p>
        </div>

        {favorites.length === 0 ? (
          /* Empty State - Dark Mode Ready */
          <div className="flex flex-col items-center justify-center py-32 bg-[#F9FAFB] dark:bg-slate-900/20 rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800 transition-colors">
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-sm dark:shadow-black/20 mb-6 text-slate-200 dark:text-slate-700">
              <Ghost size={48} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Your vault is empty
            </h2>
            <p className="text-slate-400 dark:text-slate-500 font-medium mt-2 mb-8">
              Saving items makes it easier to build your setup later.
            </p>
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all shadow-xl dark:shadow-indigo-900/20 active:scale-95 cursor-pointer"
            >
              Start Exploring <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((item) => (
              <div
                key={item.productId._id}
                className="group bg-white dark:bg-slate-900/40 rounded-[2.5rem] p-6 border border-slate-50 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/50 dark:hover:shadow-indigo-900/20 transition-all duration-500 backdrop-blur-sm"
              >
                {/* Product Image Area */}
                <Link
                  to={`/productDetail/${item.productId._id}`}
                  className="block relative aspect-square bg-slate-50 dark:bg-slate-950 rounded-4xl overflow-hidden mb-6"
                >
                  <img
                    src={item.productId.image}
                    alt={item.productId.title}
                    className="w-full h-full object-contain p-8 mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 transition-transform duration-700 brightness-100 dark:brightness-90"
                  />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    <div className="p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl text-slate-900 dark:text-white border border-white dark:border-slate-700 shadow-lg">
                      <ExternalLink size={16} />
                    </div>
                  </div>
                </Link>

                {/* Info Area */}
                <div className="px-2">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h3 className="font-black text-slate-900 dark:text-white text-lg uppercase tracking-tight line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {item.productId.title}
                    </h3>
                    <p className="font-black text-indigo-600 dark:text-indigo-400 text-lg tracking-tighter">
                      ₹{item.productId.price.toLocaleString()}
                    </p>
                  </div>

                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6">
                    {item.productId.category || "Premium Hardware"}
                  </p>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        navigate(`/productDetail/${item.productId._id}`)
                      }
                      className="flex-3 flex items-center justify-center gap-2 bg-slate-900 dark:bg-indigo-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all cursor-pointer shadow-lg dark:shadow-indigo-900/10"
                    >
                      <ShoppingBag size={14} /> View Item
                    </button>
                    <button
                      onClick={() => removeFromFavorites(item.productId._id)}
                      className="flex-1 flex items-center justify-center border border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-600 rounded-2xl hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:text-rose-500 hover:border-rose-100 dark:hover:border-rose-800 transition-all cursor-pointer"
                      title="Remove from favorites"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;