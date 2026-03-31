import { useState, useEffect } from "react";
import api from "../api/fetch.js";
import { useNavigate } from "react-router-dom";
import { Package, CheckCircle2, ArrowRight, ShoppingBag, Loader2, MapPin, Receipt } from "lucide-react";

// Get all orders

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const fetchOrders = async () => {
    if (!userId) {
      navigate("/login");
      return;
    }
    try {
      const { data } = await api.get(`/order/getorder/${userId}`);
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-3">
             <div className="p-2 bg-indigo-600 rounded-lg text-white">
                <Package size={20} />
             </div>
             <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
               My <span className="text-indigo-600 dark:text-indigo-400">Orders.</span>
             </h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest">
            Tracking {orders.length} active shipments
          </p>
        </header>

        {orders.length > 0 ? (
          <div className="space-y-10">
            {orders.map((order) => {
              const steps = ["Placed", "Shipped", "Out for Delivery", "Delivered"];
              const statusMap = {
                "Placed": 0,
                "Shipped": 1,
                "Out for Delivery": 2,
                "Delivered": 3
              };
              const currentStepIndex = statusMap[order.status] ?? 0;

              return (
                <div
                  key={order._id}
                  className="bg-white dark:bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] p-6 sm:p-10 shadow-2xl shadow-slate-200/50 dark:shadow-black/40 border border-white dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all duration-500 group"
                >
                  {/* Order ID & Status Badge */}
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Order Identifier</p>
                      <p className="font-mono text-xs font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full inline-block">
                        #{order._id.slice(-12).toUpperCase()}
                      </p>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Status</p>
                       <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest animate-pulse">
                         {order.status || "Processing"}
                       </span>
                    </div>
                  </div>

                  {/* --- PROGRESS STEPPER --- */}
                  <div className="relative flex justify-between items-center mb-16 px-2">
                    <div className="absolute left-0 top-1/2 w-full h-0.75 bg-slate-100 dark:bg-slate-800 -translate-y-1/2 z-0 rounded-full"></div>
                    <div
                      className="absolute left-0 top-1/2 h-0.75 bg-indigo-600 -translate-y-1/2 transition-all duration-1000 ease-out z-0 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.4)]"
                      style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                    ></div>

                    {steps.map((step, index) => (
                      <div key={step} className="relative z-10 flex flex-col items-center">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center border-4 transition-all duration-700 ${
                            index <= currentStepIndex
                              ? "bg-indigo-600 border-white dark:border-slate-900 text-white shadow-lg shadow-indigo-200 dark:shadow-none"
                              : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-300 dark:text-slate-700"
                          }`}
                        >
                          {index < currentStepIndex ? <CheckCircle2 size={18} /> : (
                            <span className="text-[10px] font-black">{index + 1}</span>
                          )}
                        </div>
                        <span className={`absolute -bottom-10 text-[8px] sm:text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-colors duration-500 ${
                            index <= currentStepIndex ? "text-slate-900 dark:text-white" : "text-slate-300 dark:text-slate-700"
                          } ${index === 0 ? "left-0" : index === steps.length - 1 ? "right-0" : "left-1/2 -translate-x-1/2"}`}
                        >
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* --- ORDER CONTENT --- */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pt-10 border-t border-slate-50 dark:border-slate-800/50">
                    {/* Items Section */}
                    <div className="md:col-span-3 space-y-4">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                         <ShoppingBag size={12} /> Bag Contents
                       </p>
                       <div className="grid grid-cols-1 gap-4">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-4 bg-slate-50/50 dark:bg-slate-950/30 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                            <div className="w-14 h-14 bg-white dark:bg-slate-900 rounded-xl p-2 shrink-0">
                               <img src={item.productId?.image} alt="" className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-black text-slate-900 dark:text-white truncate">
                                {item.productId?.title}
                              </p>
                              <p className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                                Qty: {item.quantity} • ₹{item.productId?.price?.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                       </div>
                    </div>

                    {/* Summary Section */}
                    <div className="md:col-span-2 space-y-6">
                      <div className="bg-slate-900 dark:bg-indigo-600 p-6 rounded-4xl text-white shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                           <Receipt size={18} />
                           <p className="text-[10px] font-black uppercase tracking-widest">Total Paid</p>
                        </div>
                        <p className="text-3xl font-black">
                          ₹{order.totalAmount?.toLocaleString()}
                        </p>
                        <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2">
                           <MapPin size={14} className="text-indigo-300 dark:text-indigo-200" />
                           <p className="text-[10px] font-medium opacity-80 truncate">
                             {order.address?.city}, {order.address?.zipCode}
                           </p>
                        </div>
                      </div>

                      <button
                        onClick={() => navigate(`/ordersuccess/${order._id}`)}
                        className="w-full py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group/btn"
                      >
                        Order Manifest <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24 bg-white dark:bg-slate-900/40 backdrop-blur-xl rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
               <ShoppingBag className="text-slate-300" size={32} />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">No History Yet.</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium mb-8">Your wardrobe is waiting for its first FineStore piece.</p>
            <button
              onClick={() => navigate("/")}
              className="bg-slate-900 dark:bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl active:scale-95 cursor-pointer"
            >
              Start Exploring
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;