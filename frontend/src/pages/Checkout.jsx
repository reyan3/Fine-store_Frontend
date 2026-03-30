import { useState, useEffect } from "react";
import api from "../api/fetch.js";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Truck, 
  ArrowRight 
} from "lucide-react";

// Get cart
// Set Address
// Delete Address
// Placing order

const Checkout = () => {
  const userId = localStorage.getItem("userId");
  const [address, setaddress] = useState([]);
  const [selectAddress, setselectAddress] = useState(null);
  const [cart, setcart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const otherFunc = async () => {
    if (!userId) {
      navigate("/login");
      return;
    }
    try {
      const cartRes = await api.get(`/cart/${userId}`);
      setcart(cartRes.data);
      const addressRes = await api.get(`/address/${userId}`);
      setaddress(addressRes.data);
      if (addressRes.data.length > 0) {
        setselectAddress(addressRes.data[0]);
      }
    } catch (err) {
      console.error("error is :", err);
    } finally {
      setLoading(false);
    }
  };

  const HandleDelete = async (id) => {
    try {
      await api.delete(`/address/delete/${id}`);
      setaddress((prev) => prev.filter((a) => a._id !== id));
      
      // Reset selected address if it was the one deleted
      if (selectAddress?._id === id) {
        setselectAddress(address.find(a => a._id !== id) || null);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  useEffect(() => {
    otherFunc();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Initializing Logistics</p>
      </div>
    );

  const totalPrice = cart?.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0,
  );

  const placeOrder = async () => {
    try {
      if (!selectAddress) {
        alert("Please Select Address!");
        return;
      }
      const response = await api.post("/order/place", {
        userId,
        address: selectAddress,
      });
      window.dispatchEvent(new Event("cartUpdated"));
      const orderId = response.data.order._id;
      navigate(`/ordersuccess/${orderId}`);
    } catch (err) {
      console.error("error is :", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic">
            CHECK<span className="text-indigo-600">OUT.</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest">Review your details and finalize purchase</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT: Address Selection */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="text-indigo-600" size={18} />
                <h2 className="text-xs font-black text-slate-900 dark:text-slate-200 tracking-[0.2em] uppercase">
                  Shipping Destination
                </h2>
              </div>
              <button
                onClick={() => navigate("/checkaddress")}
                className="group flex items-center gap-2 text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-50 dark:bg-indigo-500/10 px-4 py-2 rounded-xl transition-all hover:bg-indigo-600 hover:text-white cursor-pointer"
              >
                <Plus size={14} className="group-hover:rotate-90 transition-transform" /> Add New
              </button>
            </div>

            <div className="grid gap-4">
              <AnimatePresence mode="popLayout">
                {address && address.length > 0 ? (
                  address.map((a) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={a._id}
                      onClick={() => setselectAddress(a)}
                      className={`relative p-6 rounded-4xl border-2 transition-all cursor-pointer group ${
                        selectAddress?._id === a._id
                          ? "border-indigo-600 bg-white dark:bg-slate-900 shadow-xl shadow-indigo-100/50 dark:shadow-none"
                          : "border-transparent bg-white/60 dark:bg-slate-900/40 hover:border-slate-200 dark:hover:border-slate-800"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <p className="font-black text-slate-900 dark:text-white uppercase text-xs tracking-widest">
                              {a.fullname}
                            </p>
                            {selectAddress?._id === a._id && (
                              <span className="bg-indigo-600 text-white text-[8px] px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">Selected</span>
                            )}
                          </div>
                          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-70">
                            {a.addressLine}, {a.city}, {a.state} - {a.pincode}
                          </p>
                        </div>
                        
                        <button
                          className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            HandleDelete(a._id);
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center gap-6">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                          <Phone size={12} /> {a.phone}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase">
                          <Mail size={12} /> {a.email}
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center p-16 bg-white dark:bg-slate-900/40 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800"
                  >
                    <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-500/10 rounded-full flex items-center justify-center mb-6">
                      <MapPin className="text-indigo-400" size={32} />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">No Address Found</h3>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mb-8 text-center max-w-60">
                      Your logistics details are empty. Add a destination to unlock payment.
                    </p>
                    <button
                      onClick={() => navigate("/checkaddress")}
                      className="bg-slate-900 dark:bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform cursor-pointer shadow-xl shadow-indigo-500/20"
                    >
                      Initialize Address
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: Final Summary */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 dark:bg-slate-900/80 backdrop-blur-xl rounded-[3rem] p-10 text-white sticky top-32 shadow-2xl shadow-indigo-900/20 border border-white/5">
              <div className="flex items-center gap-2 mb-8">
                <Truck className="text-indigo-400" size={18} />
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                  Order Protocol
                </h2>
              </div>

              <div className="space-y-5 mb-10">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Total Items</span>
                  <span className="font-black font-mono">{cart?.items.length} Units</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Payment</span>
                  <span className="bg-white/10 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter">
                    Pay on Delivery
                  </span>
                </div>
                <div className="h-px bg-white/5 my-6"></div>
                <div>
                  <span className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] block mb-2">Total Amount Due</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-white tracking-tighter">
                      ₹{totalPrice.toLocaleString()}
                    </span>
                    <span className="text-indigo-400 font-black text-xs">INR</span>
                  </div>
                </div>
              </div>

              <button
                onClick={placeOrder}
                disabled={!selectAddress}
                className={`w-full py-6 rounded-4xl font-black text-xs uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 group cursor-pointer px-4 ${
                  selectAddress 
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-500/40 active:scale-95" 
                    : "bg-slate-800 text-slate-500 cursor-not-allowed"
                }`}
              >
                Execute Order
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="mt-10 pt-8 border-t border-white/5 flex items-start gap-4">
                <div className="p-3 bg-emerald-500/10 rounded-2xl">
                  <ShieldCheck className="text-emerald-500" size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-white font-black uppercase tracking-widest leading-tight">
                    FineStore Protection
                  </p>
                  <p className="text-[9px] text-slate-500 font-bold uppercase mt-1">
                    Secure transaction & quality guaranteed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;