import { useParams, useNavigate } from "react-router-dom";
import { 
  Check, 
  ShoppingBag, 
  ArrowRight, 
  Package, 
  Copy,
  CheckCircle2
} from "lucide-react";
import { useState } from "react";

// Order success Page Showing order id and can copy for future reference

const OrderSuccess = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center px-4 pt-30 pb-5 transition-colors duration-500">
      <div className="w-full max-w-md">
        
        {/* Main Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] py-15 px-4 shadow-xl shadow-slate-200/60 dark:shadow-black/20 border border-slate-100 dark:border-slate-800 text-center">
          
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center shadow-lg shadow-emerald-200 dark:shadow-emerald-900/20 animate-bounce">
              <Check className="text-white" size={40} strokeWidth={3} />
            </div>
          </div>

          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
            Order <span className="text-indigo-600 dark:text-indigo-400">Placed!</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-8">
            Your items are being processed and will be shipped shortly.
          </p>

          {/* Order ID Section */}
          <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-4  border border-slate-100 dark:border-slate-800 mb-8 ">
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 text-center">
              Order Reference
            </p>
            <div 
              onClick={handleCopy}
              className="flex items-center justify-center gap-3 cursor-pointer group"
            >
              <code className="text-sm font-bold text-slate-800 dark:text-slate-200 tracking-tight">
                #{id?.toUpperCase() || "FINE-2026-STORE"}
              </code>
              {copied ? (
                <CheckCircle2 size={16} className="text-emerald-500" />
              ) : (
                <Copy size={16} className="text-slate-300 dark:text-slate-600 group-hover:text-indigo-600 transition-colors" />
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => navigate("/")}
              className="w-full bg-indigo-600 dark:bg-indigo-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-all active:scale-95 flex items-center justify-center gap-3 cursor-pointer shadow-lg shadow-indigo-100 dark:shadow-none"
            >
              <ShoppingBag size={18} />
              Continue Shopping
            </button>

            <button
              onClick={() => navigate("/my-orders")}
              className="w-full py-4 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white font-bold text-[10px] uppercase tracking-widest transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Package size={16} />
              View My Orders
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-8 text-center text-slate-400 dark:text-slate-600 text-[10px] font-bold uppercase tracking-widest">
          A confirmation email has been sent to your inbox.
        </p>
      </div>
    </div>
  ); 
};

export default OrderSuccess;