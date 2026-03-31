import { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/fetch.js";

// Handle Auth of login and Google login

const Login = () => {
  const [form, setform] = useState({ email: "", password: "" });
  const [msg, setmsg] = useState("");
  const [Remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setform((prev) => ({ ...prev, email: savedEmail }));
      setRemember(true);
    }
  }, []);

  // Handle google Login
  const handleSuccess = async (response) => {
    try {
      // response.credential is the token from Google
      // sending credential object from googleLogin
      const res = await api.post("/auth/googlelogin", {
        idToken: response.credential,
      });
      localStorage.setItem("userName", res.data.user.name);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userMail", res.data.user.email);
      localStorage.setItem("userAvatar", res.data.user.avatar);
      localStorage.setItem("userId", res.data.user.id);
      localStorage.setItem("isAdmin", res.data.user.isAdmin);
      setmsg("Login Successfully!");
      if (res.data.user.isAdmin) {
        navigate("/admin/products");
      } else {
        setTimeout(() => navigate("/"), 1000);
      }
    } catch (err) {
      console.error("Login Failed", err);
    }
  };

  // Handle Simple login
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Remember) {
      localStorage.setItem("rememberedEmail", form.email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }
    try {
      const response = await api.post("/auth/login", form);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userName", response.data.user.name);
      localStorage.setItem("userMail", response.data.user.email);
      localStorage.setItem("userAvatar", response.data.user.avatar);
      localStorage.setItem("userId", response.data.user.id);
      localStorage.setItem("isAdmin", response.data.user.isAdmin);
      setmsg("Login Successfully!");
      if (response.data.user.isAdmin) {
        navigate("/admin/products");
      } else {
        setTimeout(() => navigate("/"), 1000);
      }
    } catch (err) {
      setmsg(err?.response?.data?.msg || "Internal Error!");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden px-4 py-10 pt-24 sm:px-6">
      {/* Decorative background blurs */}
      <div className="hidden sm:block absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-200/30 rounded-full blur-[120px]"></div>
      <div className="hidden sm:block absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-200/30 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-md bg-white sm:bg-white/80 sm:backdrop-blur-xl p-8 sm:p-10 h-auto sm:rounded-[2.5rem] shadow-xl sm:shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 sm:border-white relative z-10 flex flex-col justify-center transition-all duration-300">
        {/* Brand Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex w-12 h-12 bg-indigo-600 rounded-2xl items-center justify-center shadow-lg mb-4">
            <span className="text-white font-bold text-2xl italic">F</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tighter text-slate-900 leading-tight">
            Welcome Back<span className="text-indigo-600">.</span>
          </h2>
          <p className="text-slate-500 text-sm mt-2 font-medium">
            Log in to manage your orders
          </p>
        </div>

        {/* Responsive Alert Box */}
        {msg && (
          <div
            className={`mb-6 p-4 rounded-2xl text-xs sm:text-sm font-bold text-center animate-bounce-short ${
              msg.includes("Successfully")
                ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                : "bg-rose-50 text-rose-600 border border-rose-100"
            }`}
          >
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div className="space-y-1">
            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-slate-50 border border-slate-100 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-500 transition-all text-sm sm:text-base outline-none"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-slate-50 border border-slate-100 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-500 transition-all text-sm sm:text-base outline-none"
              required
            />
          </div>

          <div className="flex items-center justify-between px-1 py-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                name="remember"
                checked={Remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
              <span className="text-xs font-semibold text-slate-500 select-none group-hover:text-slate-700 transition-colors">
                Remember
              </span>
            </label>
            <button
              type="button"
              onClick={() => navigate("/forgot")}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
            >
              Forgot?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base hover:bg-indigo-600 shadow-lg shadow-indigo-100 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            Sign In
          </button>
        </form>

        <p className="text-center mt-8 sm:mt-10 text-sm text-slate-500 font-medium">
          New here?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 font-bold hover:underline underline-offset-4 transition-all"
          >
            Create account
          </Link>
        </p>

        <div className="flex justify-center mt-6 w-full">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => console.log("Login Failed")}
            shape="pill" // Matches your rounded-2xl/full style
            width="200" // Set a fixed width to match your input fields
            text="signin_with" // More professional phrasing
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
