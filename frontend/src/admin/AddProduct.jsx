import { useState } from "react";
import api from "../api/fetch.js";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, PlusCircle, Image as ImageIcon, Sparkles } from "lucide-react";

// Add product from Admin Page

const AddProduct = () => {
  const [form, setform] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/products/add", form);
      navigate("/admin/products");
    } catch (err) {
      console.error("error : ", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-12 px-4 sm:px-6 transition-colors duration-500">
      <div className="max-w-3xl mx-auto">
        {/* Navigation */}
        <button
          onClick={() => navigate("/admin/products")}
          className="mb-8 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center gap-2 cursor-pointer group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Inventory
        </button>

        <div className="bg-white dark:bg-slate-900/40 backdrop-blur-xl rounded-[3rem] shadow-2xl shadow-slate-200/50 dark:shadow-black/40 border border-white dark:border-slate-800 p-8 sm:p-14 relative overflow-hidden">
          
          {/* Decorative element */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="text-indigo-500" size={20} />
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                New <span className="text-indigo-600 dark:text-indigo-400">Arrival.</span>
              </h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
              Configure your product specifications and listing details below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Image Preview Area */}
            {form.image && (
              <div className="w-full h-48 bg-slate-50 dark:bg-slate-950 rounded-4xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden group relative">
                <img 
                  src={form.image} 
                  alt="Preview" 
                  className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { e.target.src = "https://placehold.co/400x400?text=Invalid+URL"; }}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-[10px] font-black uppercase tracking-widest bg-black/40 backdrop-blur-md px-4 py-2 rounded-full">Live Preview</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {Object.keys(form).map((key) => {
                const isFullWidth = key === "description" || key === "image" || key === "title";
                
                return (
                  <div key={key} className={isFullWidth ? "md:col-span-2" : ""}>
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-2 mb-3">
                      {key === "image" && <ImageIcon size={12} />}
                      {key}
                    </label>

                    {key === "description" ? (
                      <textarea
                        name={key}
                        value={form[key]}
                        onChange={handleChange}
                        placeholder={`Provide a compelling ${key}...`}
                        rows="4"
                        className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:bg-white dark:focus:bg-slate-950 focus:border-indigo-500 dark:focus:border-indigo-500 transition-all text-slate-900 dark:text-white outline-none placeholder:text-slate-300 dark:placeholder:text-slate-700 font-medium"
                        required
                      />
                    ) : (
                      <div className="relative group">
                        <input
                          type={key === "price" || key === "stock" ? "number" : "text"}
                          name={key}
                          value={form[key]}
                          onChange={handleChange}
                          placeholder={key === "image" ? "Paste image URL here..." : `Enter ${key}...`}
                          className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:bg-white dark:focus:bg-slate-950 focus:border-indigo-500 dark:focus:border-indigo-500 transition-all text-slate-900 dark:text-white outline-none placeholder:text-slate-300 dark:placeholder:text-slate-700 font-bold"
                          required
                        />
                        {(key === "price" || key === "stock") && (
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase">
                            {key === "price" ? "INR" : "Units"}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              type="submit"
              className="w-full mt-10 bg-slate-900 dark:bg-indigo-600 text-white py-6 rounded-4xl font-black text-sm uppercase tracking-[0.25em] hover:bg-indigo-600 dark:hover:bg-indigo-500 shadow-2xl shadow-slate-200 dark:shadow-indigo-900/20 transition-all active:scale-[0.97] flex items-center justify-center gap-3 cursor-pointer group"
            >
              <PlusCircle size={20} className="group-hover:rotate-90 transition-transform duration-500" />
              Publish Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;