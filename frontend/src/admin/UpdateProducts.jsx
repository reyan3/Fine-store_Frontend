import { useState, useEffect } from "react";
import api from "../api/fetch.js";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, RefreshCcw, Layout, Tag, Box, Info } from "lucide-react";

// Update Products in admin page

// Get products
// Update products

const UpdateProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [form, setform] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const loadProduct = async () => {
    try {
      const response = await api.get("/products");
      const product = response.data.products.find((p) => p._id === id);
      if (product) setform(product);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/products/update/${id}`, form);
      navigate("/admin/products");
    } catch (err) {
      alert(err.response?.data?.msg || "Update Failed");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <RefreshCcw className="text-indigo-600 animate-spin" size={32} />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-12 px-4 sm:px-6 transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <button
          onClick={() => navigate("/admin/products")}
          className="mb-8 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center gap-2 cursor-pointer group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Cancel & Return
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Preview Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              <div className="bg-white dark:bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] p-6 border border-white dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-black/20">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Layout size={12} /> Live Preview
                </p>
                <div className="aspect-square bg-slate-50 dark:bg-slate-950 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 p-4 mb-4">
                  <img 
                    src={form.image || "https://placehold.co/400x400?text=No+Image"} 
                    className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal brightness-100 dark:brightness-90"
                    alt="Preview" 
                  />
                </div>
                <h3 className="font-black text-slate-900 dark:text-white truncate">{form.title || "Untitled Product"}</h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">₹{Number(form.price).toLocaleString()}</p>
              </div>
              
              <div className="bg-indigo-600 rounded-4xl p-6 text-white shadow-lg shadow-indigo-200 dark:shadow-none">
                <div className="flex items-center gap-2 mb-2">
                   <Info size={16} />
                   <span className="text-[10px] font-black uppercase tracking-widest">Editor Tip</span>
                </div>
                <p className="text-xs font-medium leading-relaxed opacity-90">
                  Ensure descriptions are SEO-friendly to improve your store's visibility.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900/40 backdrop-blur-xl rounded-[3rem] shadow-2xl shadow-slate-200/50 dark:shadow-black/40 border border-white dark:border-slate-800 p-8 sm:p-12">
              <div className="mb-10">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
                  Modify <span className="text-indigo-600 dark:text-indigo-400">Listing.</span>
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                  ID: <span className="font-mono text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded uppercase tracking-tighter">{id}</span>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title - Full Width */}
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-2 mb-2">
                      <Tag size={12} /> Product Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:bg-white dark:focus:bg-slate-950 focus:border-indigo-500 transition-all text-slate-900 dark:text-white outline-none font-bold"
                      required
                    />
                  </div>

                  {/* Price & Stock */}
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-2 mb-2 block">Price (INR)</label>
                    <input
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-900 dark:text-white outline-none font-bold"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-2 mb-2 block">Stock Units</label>
                    <input
                      type="number"
                      name="stock"
                      value={form.stock}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-900 dark:text-white outline-none font-bold"
                      required
                    />
                  </div>

                  {/* Category */}
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-2 mb-2">
                      <Box size={12} /> Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-900 dark:text-white outline-none font-bold"
                      required
                    />
                  </div>

                  {/* Image URL */}
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-2 mb-2 block">Cover Image URL</label>
                    <input
                      type="text"
                      name="image"
                      value={form.image}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-900 dark:text-white outline-none font-bold"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-2 mb-2 block">Description</label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows="5"
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-900 dark:text-white outline-none font-medium leading-relaxed"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-10 bg-slate-900 dark:bg-indigo-600 text-white py-6 rounded-3xl font-black text-sm uppercase tracking-[0.25em] hover:bg-indigo-600 dark:hover:bg-indigo-500 shadow-2xl shadow-indigo-100 dark:shadow-indigo-900/20 transition-all active:scale-[0.97] flex items-center justify-center gap-3 cursor-pointer group"
                >
                  <Save size={20} className="group-hover:scale-110 transition-transform" />
                  Synchronize Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProducts;