import { useState, useEffect } from "react";
import api from "../api/fetch.js";
import { useNavigate, Link } from "react-router-dom";
import Toast from "../components/Toast.jsx";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ChevronLeft,
  ShieldCheck,
  PackageCheck,
} from "lucide-react";

// get/load items
// Remove items
// Update items

const Cart = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [cart, setcart] = useState({ items: [] });
  const [toast, settoast] = useState("");
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    try {
      const response = await api.get(`/cart/${userId}`);
      setcart(response.data);
    } catch (err) {
      console.error("Cart error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (productId) => {
    try {
      await api.post(`/cart/remove`, { userId, productId });
      settoast("Item Removed From Cart!");
      loadCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error("Removal failed", err);
    }
  };

  const updateItem = async (productId, quantity) => {
    if (quantity <= 0) {
      await removeItem(productId);
    } else {
      try {
        await api.post(`/cart/update`, { userId, productId, quantity });
        loadCart();
        window.dispatchEvent(new Event("cartUpdated"));
      } catch (err) {
        console.error("Update failed", err);
      }
    }
  };

  const items = cart?.items || [];

  const totalPrice = items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0,
  );

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 transition-colors">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      {toast && <Toast message={toast} onClose={() => settoast(null)} />}

      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Shopping{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                Cart.
              </span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-bold text-sm mt-2 uppercase tracking-widest">
              {cart?.items && cart.items.length > 0 ? cart.items.length : 0} items ready for checkout
            </p>
          </div>
          <Link
            to="/"
            className="hidden sm:flex items-center gap-2 text-slate-400 dark:text-slate-500 font-black text-xs uppercase tracking-widest hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <ChevronLeft size={16} /> Continue Shopping
          </Link>
        </div>

        { !cart?.items || cart.items.length === 0  ? (
          <div className="bg-white dark:bg-slate-900/40 backdrop-blur-xl rounded-[3rem] p-16 text-center border border-white dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-black/20">
            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-300 dark:text-slate-600">
              <ShoppingBag size={40} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Your cart is empty
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium mb-10 mt-2">
              Looks like you haven't added any gear yet.
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-slate-900 dark:bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all active:scale-95 shadow-xl dark:shadow-indigo-900/20 cursor-pointer"
            >
              Explore Products
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left Column: Cart Items */}
            <div className="lg:w-2/3 space-y-6">
              {cart.items.map((i) => (
                <div
                  key={i.productId._id}
                  className="group bg-white dark:bg-slate-900/40 backdrop-blur-sm p-4 sm:p-6 rounded-[2.5rem] border border-white dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-indigo-100/30 dark:hover:shadow-black/40 transition-all duration-500 flex items-center gap-3"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-slate-50 dark:bg-slate-950 rounded-3xl overflow-hidden shrink-0 border border-slate-100 dark:border-slate-800">
                    <img
                      src={i.productId.image}
                      alt={i.productId.title}
                      className="w-full h-full object-contain p-4 mix-blend-multiply dark:mix-blend-normal brightness-100 dark:brightness-90 group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Details */}
                  <div className="grow min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 overflow-hidden">
                      <div>
                        <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight truncate leading-tight">
                          {i.productId.title}
                        </h2>
                        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
                          {i.productId.category || "Premium Hardware"}
                        </p>
                      </div>
                      <p className="text-lg font-black text-indigo-600 dark:text-indigo-400 tracking-tighter">
                        ₹{(i.productId.price * i.quantity).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center bg-slate-50 dark:bg-slate-950 rounded-2xl p-1 border border-slate-100 dark:border-slate-800">
                        <button
                          onClick={() =>
                            updateItem(i.productId._id, i.quantity - 1)
                          }
                          className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-white dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-rose-500 rounded-xl transition-all font-bold cursor-pointer"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 sm:w-12 text-center font-black text-slate-900 dark:text-white text-sm">
                          {i.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateItem(i.productId._id, i.quantity + 1)
                          }
                          className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-white dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-indigo-600 rounded-xl transition-all font-bold cursor-pointer"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(i.productId._id)}
                        className="flex items-center gap-2 text-[10px] font-black text-slate-300 dark:text-slate-600 hover:text-rose-500 dark:hover:text-rose-500 uppercase tracking-widest transition-colors cursor-pointer"
                      >
                        <Trash2 size={14} />
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 dark:shadow-black/40 border border-white dark:border-slate-800 sticky top-32">
                <h2 className="text-xl font-black text-slate-900 dark:text-white mb-8 uppercase tracking-tight">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span className="text-slate-900 dark:text-slate-200">
                      ₹{totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest">
                    <span>Shipping</span>
                    <span className="text-emerald-500 font-black">Free</span>
                  </div>
                  <div className="h-px bg-slate-100 dark:bg-slate-800 my-6"></div>
                  <div className="flex justify-between items-end">
                    <span className="text-slate-400 dark:text-slate-500 font-black text-[10px] uppercase tracking-[0.2em]">
                      Total
                    </span>
                    <span className="text-4xl font-black text-indigo-600 dark:text-indigo-400 tracking-tighter">
                      ₹{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-slate-900 dark:bg-indigo-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all shadow-xl dark:shadow-indigo-900/20 active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
                >
                  Checkout Now <ArrowRight size={16} />
                </button>

                {/* Trust Badges */}
                <div className="mt-8 pt-8 border-t border-slate-50 dark:border-slate-800/50 grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <ShieldCheck size={20} className="text-emerald-500" />
                    <span className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      Secure Payments
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2 text-center">
                    <PackageCheck size={20} className="text-indigo-500" />
                    <span className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      Fast Delivery
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
