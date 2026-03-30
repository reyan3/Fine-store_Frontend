import { useState } from "react";
import api from "../api/fetch.js";

// Submit new password

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/forgot/submit", { email });
      setMsg(response.data.msg); // "Email sent! Check your inbox."
    } catch (err) {
      setMsg(err.response?.data?.msg || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 animate-slide-up-fade">
      <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100">
        <h2 className="text-3xl font-black text-slate-900 mb-2">Forgot Password?</h2>
        <p className="text-slate-500 mb-8 font-medium">No worries, we'll send you reset instructions.</p>
        
        {msg && <div className="mb-6 p-4 bg-indigo-50 text-indigo-600 rounded-2xl text-sm font-bold">{msg}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input 
            type="email" 
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none font-bold"
            required 
          />
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-600 transition-all cursor-pointer"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;