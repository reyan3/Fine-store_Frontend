import { useState } from "react";
import api from "../api/fetch";
import Toast from "../components/Toast";
import { Mail, MapPin, Send } from "lucide-react";

const Contact = () => {
  const [form, setform] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const userId = localStorage.getItem("userId");

  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if(!userId) return alert("Must Have To Login First!")
    e.preventDefault();
    try {
      const response = await api.post("/help/submit", form);
      setToast(response.data.message || "Message sent successfully!");
      setform(form);
    } catch (err) {
      setToast("Something went wrong. Try again!");
    }
  };


  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white pt-40 sm:pt-48 pb-20 px-4 sm:px-6 overflow-hidden transition-colors duration-500">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className={`text-center mb-12 sm:mb-20`}>
          <h2 className="text-indigo-600 dark:text-indigo-400 font-black text-[10px] uppercase tracking-[0.4em] mb-4">
            Support
          </h2>
          <h1 className="text-4xl sm:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
            Get in <span className="text-indigo-600 dark:text-indigo-500">Touch.</span>
          </h1>
          <p className="mt-6 text-slate-500 dark:text-slate-400 font-bold text-sm sm:text-base uppercase tracking-tight">
            Our premium support team is here for your tech needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Left Side: Contact Form Card */}
          <div
            className={`lg:col-span-3 bg-white dark:bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] sm:rounded-[3.5rem] p-8 sm:p-12 shadow-2xl shadow-slate-200/60 dark:shadow-black/50 border border-white dark:border-slate-800`}
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={form.name}
                    placeholder="John Doe"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-500/40 outline-none text-slate-700 dark:text-slate-200 font-bold text-sm transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={form.email}
                    placeholder="john@example.com"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-500/40 outline-none text-slate-700 dark:text-slate-200 font-bold text-sm transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-2">
                  Subject
                </label>
                <div className="relative">
                  <select
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-500/40 outline-none text-slate-700 dark:text-slate-200 font-bold text-sm appearance-none cursor-pointer"
                    name="subject"
                    onChange={handleChange}
                    value={form.subject}
                    required
                  >
                    <option className="dark:bg-slate-900">General Inquiry</option>
                    <option className="dark:bg-slate-900">Order Support</option>
                    <option className="dark:bg-slate-900">Product Returns</option>
                    <option className="dark:bg-slate-900">Partnership</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="5"
                  placeholder="How can we help you?"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-500/40 outline-none text-slate-700 dark:text-slate-200 font-bold text-sm transition-all resize-none"
                  required
                ></textarea>
              </div>

              <button
                className="w-full py-5 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl sm:rounded-3xl font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
                type="submit"
              >
                Send Message
                <Send size={16} strokeWidth={3} />
              </button>
            </form>
          </div>

          {/* Right Side: Info Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Direct Contact Card */}
            <div
              className={`bg-white dark:bg-slate-900/40 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-black/20`}
            >
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Mail className="text-indigo-600 dark:text-indigo-400" size={24} />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tighter mb-2 text-slate-900 dark:text-white">
                Email Us
              </h3>
              <p className="text-slate-500 dark:text-indigo-400 font-bold text-sm mb-4 tracking-tight">
                support@finestore.com
              </p>
              <p className="text-slate-400 dark:text-slate-500 text-xs font-medium leading-relaxed">
                Available Mon-Fri, 9am - 6pm EST. We usually respond within 24
                hours.
              </p>
            </div>

            {/* Visit Us Card */}
            <div
              className={`bg-white dark:bg-slate-900/40 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-black/20`}
            >
              <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="text-emerald-600 dark:text-emerald-400" size={24} />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tighter mb-2 text-slate-900 dark:text-white">
                Office
              </h3>
              <p className="text-slate-500 dark:text-emerald-400 font-bold text-sm mb-4 tracking-tight">
                Sector 47B, Chandigarh
              </p>
              <p className="text-slate-400 dark:text-slate-500 text-xs font-medium leading-relaxed">
                Our headquarters is the heart of our curated selection process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;