import { useEffect, useState } from "react";
import api from "../api/fetch.js";
import { Link } from "react-router-dom";
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Package, 
  MoreHorizontal,
  ExternalLink 
} from "lucide-react";

// All Product in admin page

// Delete products
// Get products


const ProductList = () => {
  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      const response = await api.get("/products");
      setproducts(response.data.products);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("This action cannot be undone. Delete product?")) return;
    try {
      await api.delete(`/products/delete/${id}`);
      loadProducts();
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-600 rounded-lg text-white">
                <Package size={20} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Inventory <span className="text-indigo-600 dark:text-indigo-400">Control.</span>
              </h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest">
              Managing {products.length} live products
            </p>
          </div>
          
          <Link
            to="/admin/products/add"
            className="flex items-center gap-2 bg-slate-900 dark:bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all shadow-xl dark:shadow-indigo-900/20 active:scale-95 group"
          >
            <Plus size={16} className="group-hover:rotate-90 transition-transform" />
            Add New Product
          </Link>
        </div>

        {/* Table Container */}
        <div className="bg-white dark:bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-black/40 border border-white dark:border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800">
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                    Product Details
                  </th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                    Pricing
                  </th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                    Stock Level
                  </th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 text-right">
                    Management
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {products.map((p) => (
                  <tr
                    key={p._id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-slate-50 dark:bg-slate-950 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 p-2 shrink-0">
                          <img 
                            src={p.image} 
                            alt="" 
                            className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal brightness-100 dark:brightness-90"
                          />
                        </div>
                        <div>
                          <p className="font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                            {p.title}
                          </p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                            {p.category || "Hardware"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">
                        ₹{p.price.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${p.stock > 10 ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                        <span className="text-sm font-bold text-slate-600 dark:text-slate-400">
                          {p.stock} <span className="text-[10px] uppercase opacity-50 ml-1">Units</span>
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          to={`/productDetail/${p._id}`}
                          className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                          title="View Live"
                        >
                          <ExternalLink size={18} />
                        </Link>
                        <Link
                          to={`/admin/products/update/${p._id}`}
                          className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                          title="Edit Product"
                        >
                          <Edit3 size={18} />
                        </Link>
                        <button
                          onClick={() => deleteProduct(p._id)}
                          className="p-2 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      {/* Mobile Actions Fallback */}
                      <div className="sm:hidden text-right">
                         <MoreHorizontal className="text-slate-300 mx-auto" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {products.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                No products found in database
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;