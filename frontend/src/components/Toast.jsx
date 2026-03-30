import { useEffect } from "react";
import { X, Bell } from "lucide-react";

const Toast = ({ message, onClose }) => {
  // 1. Determine status color based on message content
  const isNegative =
    message?.toLowerCase().includes("removed") ||
    message?.toLowerCase().includes("error") ||
    message?.toLowerCase().includes("failed");

  // 2. Memoize sound URLs so they don't reload unnecessarily
  const soundUrls = {
    success:
      "/add.mp3", // Short digital chirp
    error: "/remove.mp3", // Subtle alert
  };

  useEffect(() => {
    // 3. Play sound on mount
    const audio = new Audio(isNegative ? soundUrls.error : soundUrls.success);
    audio.volume = 0.4; // Keep it subtle, not jarring
    audio.currentTime = 0; 

    audio.play().catch((err) => {
      // Browsers sometimes block audio if the user hasn't interacted with the page yet
      console.log("Audio playback blocked until user interaction:", err);
    });

    // 4. Cleanup and auto-close
    const timer = setTimeout(onClose, 3000);
    return () => {
      clearTimeout(timer);
      // Stop the audio if the toast is closed early
      audio.pause();
      audio.currentTime = 0;
    };
  }, [onClose, isNegative]); // Added isNegative to dependency array

  return (
    <div className="fixed top-24 right-4 sm:right-8 z-100 flex items-center gap-4 bg-white/70 dark:bg-slate-900/80 backdrop-blur-2xl border border-white/40 dark:border-slate-800/50 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] px-5 py-4 rounded-4xl animate-in slide-in-from-right-8 fade-in duration-500 group">
      {/* Dynamic Status Icon */}
      <div
        className={`relative flex items-center justify-center w-10 h-10 rounded-2xl transition-colors duration-500 ${
          isNegative
            ? "bg-rose-50 dark:bg-rose-500/10 text-rose-500"
            : "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500"
        }`}
      >
        <Bell size={18} className="animate-pulse" />
        <span
          className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
            isNegative ? "bg-rose-500" : "bg-emerald-500"
          }`}
        />
      </div>

      <div className="flex flex-col min-w-35">
        <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] mb-0.5">
          FineStore System
        </p>
        <p className="text-sm font-black text-slate-800 dark:text-slate-100 tracking-tight leading-none">
          {message}
        </p>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="p-2 bg-slate-50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-xl transition-all cursor-pointer active:scale-90"
      >
        <X size={14} strokeWidth={3} />
      </button>
    </div>
  );
};

export default Toast;
