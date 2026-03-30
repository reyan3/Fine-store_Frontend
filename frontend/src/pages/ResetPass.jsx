import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/fetch.js";

// Reset Password page User receive from link
// set new password

const ResetPassword = () => {
  const { id, token } = useParams(); // Grabs data from the URL bar
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending the ID and Token BACK to the backend with the new password
      await api.put(`/forgot/resetpass/${id}/${token}`, { password });
      setMsg("Password updated! Redirecting to login...");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setMsg("Link expired or invalid. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 animate-slide-up-fade">
      <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100">
        <h2 className="text-3xl font-black text-slate-900 mb-6">
          New Password
        </h2>

        {msg && (
          <div className="mb-6 p-4 bg-emerald-50 text-emerald-600 rounded-2xl text-sm font-bold">
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none font-bold"
            required
          />
          <button
            type="submit"
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-600 transition-all cursor-pointer"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
