import React, { useState, useEffect } from 'react';
import { Sparkles, Flame, Volume2, ArrowRight } from 'lucide-react';
import { devotionalAudio } from '../utils/audio';
import { FESTIVAL_INFO } from '../data/festivalData';

export default function SplashScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Play initial gentle welcoming chime on user interaction or mount
    try {
      devotionalAudio.playTempleBell();
    } catch (e) {}

    // 3.5 seconds timer with progress bar
    const duration = 3500;
    const intervalTime = 35;
    const step = (100 / (duration / intervalTime));

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          triggerExit();
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const triggerExit = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onFinish();
    }, 600);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-6 bg-gradient-to-b from-[#fffbeb] via-[#fef3c7] to-[#fff7ed] transition-opacity duration-600 ${
        isFadingOut ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Radiant Background Light Rays & Warm Saffron Aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-400/20 via-orange-300/10 to-transparent pointer-events-none animate-aura"></div>
      
      {/* Decorative Traditional Toran at Top */}
      <div className="w-full max-w-sm flex items-center justify-center gap-2 pt-2 text-amber-900 text-xs font-serif font-black tracking-widest z-10">
        <span className="text-orange-600">☸</span>
        <span className="text-amber-950 drop-shadow-sm font-bold">॥ శ్రీ వరసిద్ధి వినాయక చవితి మహోత్సవాలు ॥</span>
        <span className="text-orange-600">☸</span>
      </div>

      {/* Center Stage: The Official Club Friends Youth Logo & Flaming Lions */}
      <div className="my-auto w-full max-w-sm flex flex-col items-center text-center z-10 animate-in zoom-in-90 fade-in duration-700">
        {/* Glow Ring behind Logo */}
        <div className="relative w-full px-2 py-3">
          <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-300 rounded-3xl blur-xl opacity-60 animate-pulse pointer-events-none"></div>

          {/* Official Cropped Logo Banner */}
          <div className="relative bg-white rounded-2xl p-3.5 border-2 border-amber-300 shadow-2xl shadow-amber-900/15 flex flex-col items-center overflow-hidden">
            <img 
              src="/youth-logo-banner.png" 
              alt="Club Friends Youth - Pipri Logo" 
              className="w-full h-auto object-contain rounded-lg drop-shadow-md animate-float"
            />

            {/* Tagline under Logo */}
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="text-white font-black tracking-wider bg-gradient-to-r from-red-600 to-orange-600 px-3 py-0.5 rounded-full shadow-sm">
                🔥 PIPRI 🔥
              </span>
              <span className="text-amber-950 font-bold">
                భక్తి • సేవ • ఐక్యత
              </span>
            </div>
          </div>
        </div>

        {/* Village & Pandal Venue Indicator */}
        <div className="mt-4 px-4 py-2.5 rounded-2xl bg-white/90 border border-amber-200 backdrop-blur-md shadow-md">
          <h2 className="text-sm font-black text-amber-950 font-['Cinzel',serif] tracking-wider">
            {FESTIVAL_INFO.clubName}
          </h2>
          <p className="text-[11px] text-orange-700 font-bold mt-0.5">
            {FESTIVAL_INFO.landmark}, {FESTIVAL_INFO.village}
          </p>
          <p className="text-[10px] text-stone-600 font-medium mt-0.5">
            Mandal: Armoor • District: Nizamabad (Telangana)
          </p>
        </div>
      </div>

      {/* Bottom Progress & Quick Skip Button */}
      <div className="w-full max-w-xs space-y-3 pb-4 z-10">
        {/* Animated Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] text-amber-900 font-black px-1">
            <span>స్వాగతం / Welcome</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-amber-100 rounded-full overflow-hidden border border-amber-300 p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 rounded-full transition-all duration-75 shadow-sm"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Enter Immediately Button */}
        <button
          onClick={triggerExit}
          className="w-full btn-festive-primary text-xs py-3 rounded-2xl shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-transform font-black"
        >
          <span>దర్శనం ప్రారంభించండి (Enter App)</span>
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}
