import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Zap, ArrowRight } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const revealClass = (delay) => `
    transition-all duration-1000 transform 
    ${delay} 
    ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
  `;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white pt-40 sm:pt-48 pb-20 px-4 sm:px-6 overflow-hidden transition-colors duration-500">
      <div className="max-w-5xl mx-auto">
        
        {/* Hero Section Card */}
        <div className={`${revealClass('delay-0')} bg-white dark:bg-slate-900/40 rounded-[2.5rem] sm:rounded-[4rem] p-8 sm:p-20 shadow-2xl shadow-slate-200/60 dark:shadow-black/50 border border-white dark:border-slate-800 backdrop-blur-xl relative overflow-hidden mb-10`}>
          
          <div className="relative z-10 text-center sm:text-left">
            <h2 className="text-indigo-600 dark:text-indigo-400 font-black text-[10px] uppercase tracking-[0.3em] mb-6">
              Our Vision
            </h2>
            <h1 className="text-4xl sm:text-7xl font-black tracking-tighter mb-8 leading-[0.9] text-slate-900 dark:text-white">
              The New <br /> Standard of <br /> 
              <span className="text-indigo-600 dark:text-indigo-500 italic font-serif">Curated</span> Shopping.
            </h1>
            <p className="max-w-xl text-slate-500 dark:text-slate-400 font-bold text-sm sm:text-lg leading-relaxed uppercase tracking-tight">
              FineStore is more than a marketplace. It is a digital boutique dedicated to high-performance tech and minimalist lifestyle essentials.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className={`${revealClass('delay-200')} grid grid-cols-2 md:grid-cols-4 gap-4 mb-10`}>
          {[
            { label: "Items", value: "1.2k+" },
            { label: "Users", value: "50k" },
            { label: "Shipping", value: "Free" },
            { label: "Support", value: "24/7" }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900/60 p-6 sm:p-8 rounded-4xl border border-white dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-black/20 text-center hover:-translate-y-2 hover:border-indigo-100 dark:hover:border-indigo-900/50 transition-all duration-300 backdrop-blur-sm">
              <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-1">
                {stat.value}
              </p>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Details Section */}
        <div className={`${revealClass('delay-300')} grid md:grid-cols-2 gap-8 mb-10`}>
          <div className="bg-white dark:bg-slate-900/40 p-10 rounded-[3rem] border border-white dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-black/20 group hover:border-indigo-100 dark:hover:border-indigo-500/30 transition-all duration-300">
            <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
              <CheckCircle className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tighter mb-4 text-slate-900 dark:text-white">Quality First.</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed">
              Every item in our collection is hand-vetted for durability and performance. We don't believe in mass markets—we believe in "Fine" markets.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900/40 p-10 rounded-[3rem] border border-white dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-black/20 group hover:border-emerald-100 dark:hover:border-emerald-500/30 transition-all duration-300">
            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
              <Zap className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tighter mb-4 text-slate-900 dark:text-white">Fast & Secure.</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed">
              Using cutting edge logistics and encrypted payment gateways, we ensure that your premium upgrade arrives at your doorstep securely.
            </p>
          </div>
        </div>

        {/* CTA Footer Card */}
        <div className={`${revealClass('delay-500')} bg-slate-900 dark:bg-indigo-600 rounded-[3rem] p-12 sm:p-20 text-center relative overflow-hidden group transition-colors duration-700`}>
          {/* Decorative Circle for Dark Mode CTA */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000"></div>
          
          <div className="relative z-10">
            <h2 className="text-white text-3xl sm:text-5xl font-black tracking-tighter mb-10 leading-none">
              Ready to upgrade <br /> your collection?
            </h2>
            <button 
              onClick={() => navigate("/")}
              className="bg-indigo-600 dark:bg-white text-white dark:text-indigo-600 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:scale-105 hover:bg-indigo-500 dark:hover:bg-slate-100 transition-all shadow-2xl active:scale-95 cursor-pointer inline-flex items-center gap-3"
            >
              Start Shopping <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;