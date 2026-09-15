import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Bell, Flame, Sparkles, Heart, RefreshCw, X, ShieldCheck } from 'lucide-react';
import { devotionalAudio } from '../utils/audio';

export default function VirtualPooja({ onClose }) {
  const [isBellRinging, setIsBellRinging] = useState(false);
  const [isDiyaLit, setIsDiyaLit] = useState(true);
  const [isCoconutBroken, setIsCoconutBroken] = useState(false);
  const [chantCount, setChantCount] = useState(0);
  const [flowerCount, setFlowerCount] = useState(0);
  const [activeBlessing, setActiveBlessing] = useState(null);

  const handleRingBell = () => {
    setIsBellRinging(true);
    devotionalAudio.playTempleBell();
    setTimeout(() => setIsBellRinging(false), 1200);
  };

  const handleShowerFlowers = () => {
    setFlowerCount(prev => prev + 1);
    devotionalAudio.playFlowerChime();

    confetti({
      particleCount: 55,
      spread: 80,
      origin: { y: 0.35, x: 0.5 },
      colors: ['#FF9800', '#FFEB3B', '#F44336', '#E91E63', '#FFC107'],
      shapes: ['circle'],
      scalar: 1.25,
      ticks: 200,
      gravity: 0.85,
    });

    showTemporaryBlessing("🌸 Devotional Pushpalankaram Offered to Lord Ganesha!");
  };

  const handleToggleDiya = () => {
    setIsDiyaLit(!isDiyaLit);
    if (!isDiyaLit) {
      devotionalAudio.playFlowerChime();
      showTemporaryBlessing("🪔 Sacred Deepam Lighted! May darkness dispel.");
    }
  };

  const handleBreakCoconut = () => {
    setIsCoconutBroken(true);
    devotionalAudio.playCoconutBreak();
    
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.6, x: 0.5 },
      colors: ['#FFFFFF', '#FFF59D', '#FFE082'],
      scalar: 1,
      ticks: 130
    });

    showTemporaryBlessing("🥥 Coconut Offered! Blessings for success & prosperity.");
    setTimeout(() => setIsCoconutBroken(false), 3000);
  };

  const handlePlayShankh = () => {
    devotionalAudio.playShankh();
    showTemporaryBlessing("🐚 Sacred Shankhanaadam Resonating Across Pipri!");
  };

  const handleChant = () => {
    devotionalAudio.playFlowerChime();
    setChantCount(prev => {
      const next = prev + 1;
      if (next === 108) {
        showTemporaryBlessing("🕉️ 108 Sacred Chants Completed! Mahaganapathi Blessings!");
        confetti({ particleCount: 120, spread: 100 });
      }
      return next;
    });
  };

  const showTemporaryBlessing = (msg) => {
    setActiveBlessing(msg);
    setTimeout(() => setActiveBlessing(null), 3200);
  };

  return (
    <div className="relative bg-gradient-to-b from-[#2a0e0a] via-[#1c0705] to-[#250a07] rounded-3xl border-2 border-amber-400/80 p-4 shadow-2xl overflow-hidden my-3">
      {/* Decorative Golden Rays / Aura Glow */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-yellow-400/20 via-orange-500/10 to-transparent pointer-events-none"></div>

      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b-2 border-amber-400/30 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-600 text-stone-950 shadow-md">
            <Sparkles className="w-4 h-4 animate-spin" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-100 font-['Cinzel',serif] tracking-wide">
              Virtual Pooja Mandapam
            </h2>
            <p className="text-[11px] text-amber-200 font-medium">
              Perform daily rituals & offer prayers from anywhere
            </p>
          </div>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-black/60 text-yellow-300 hover:text-white hover:bg-red-900 border border-amber-400/40 shadow-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Idol Centerstage & Interactive Ritual Space */}
      <div className="relative my-3.5 flex flex-col items-center justify-center min-h-[270px] rounded-2xl bg-gradient-to-b from-black/80 via-[#2d100a]/80 to-black/80 border-2 border-amber-400/40 p-4 overflow-hidden shadow-inner">
        {/* Hanging Brass Temple Bell at Top */}
        <button 
          onClick={handleRingBell}
          className={`absolute top-2 z-20 flex flex-col items-center group cursor-pointer focus:outline-none ${
            isBellRinging ? 'animate-bell' : ''
          }`}
          title="Tap to ring the temple bell"
        >
          <div className="w-1 h-6 bg-gradient-to-b from-yellow-200 via-amber-400 to-yellow-600 shadow-md"></div>
          <div className="relative bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-600 w-12 h-12 rounded-full p-2.5 flex items-center justify-center shadow-xl shadow-amber-400/60 border-2 border-yellow-200 active:scale-95 transition-transform">
            <Bell className="w-6 h-6 text-stone-950 fill-stone-900" />
            <span className="absolute -bottom-1 w-3 h-3 bg-yellow-300 rounded-full border border-black shadow-md"></span>
          </div>
          <span className="text-[10px] font-extrabold text-stone-950 mt-1 bg-gradient-to-r from-yellow-300 to-amber-400 px-2.5 py-0.5 rounded-full shadow-md border border-white/60 uppercase tracking-wider">
            Tap to Ring
          </span>
        </button>

        {/* Idol Divine Silhouette & Glowing Aura */}
        <div className="relative mt-14 mb-2 flex flex-col items-center">
          {/* Pulsing Golden Aura */}
          <div className="absolute -inset-5 rounded-full bg-gradient-to-tr from-yellow-400/30 via-orange-500/40 to-red-500/20 blur-xl animate-aura pointer-events-none"></div>

          <div className="relative w-44 h-48 rounded-2xl overflow-hidden border-2 border-yellow-300 shadow-2xl shadow-orange-600/60 bg-black">
            <img 
              src="/village-ganesh-idol.jpg" 
              alt="Lord Ganesha - Club Friends Youth" 
              className="w-full h-full object-cover object-bottom"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            {/* Village Idol Badge */}
            <div className="absolute top-2 right-2 bg-gradient-to-r from-red-600 to-orange-600 text-yellow-100 text-[10px] px-2 py-0.5 rounded-full font-bold border border-yellow-300/80 shadow-md">
              Pipri Pandal Idol
            </div>
          </div>

          {/* Diya Glow Positioned Below Idol */}
          <div className="flex items-center gap-6 mt-3">
            {/* Left Diya */}
            <div className={`transition-all duration-300 ${isDiyaLit ? 'opacity-100 scale-105' : 'opacity-30'}`}>
              <div className="relative flex flex-col items-center">
                {isDiyaLit && (
                  <div className="w-4 h-6 bg-gradient-to-t from-orange-500 via-yellow-300 to-white rounded-full animate-diya"></div>
                )}
                <div className="w-8 h-3.5 bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700 rounded-b-full border border-yellow-300 shadow-lg"></div>
              </div>
            </div>

            {/* Sacred Mantra display */}
            <div className="text-center px-2 py-1 rounded-xl bg-black/60 border border-amber-400/30">
              <p className="text-xs font-serif text-yellow-300 font-extrabold tracking-wider">
                ॥ ॐ శ్రీ గణేశాయ నమః ॥
              </p>
              <p className="text-[10px] text-amber-200/90 font-medium">
                Om Gam Ganapataye Namaha
              </p>
            </div>

            {/* Right Diya */}
            <div className={`transition-all duration-300 ${isDiyaLit ? 'opacity-100 scale-105' : 'opacity-30'}`}>
              <div className="relative flex flex-col items-center">
                {isDiyaLit && (
                  <div className="w-4 h-6 bg-gradient-to-t from-orange-500 via-yellow-300 to-white rounded-full animate-diya"></div>
                )}
                <div className="w-8 h-3.5 bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700 rounded-b-full border border-yellow-300 shadow-lg"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Temporary Notification Banner */}
        {activeBlessing && (
          <div className="absolute bottom-2 z-30 bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 text-stone-950 text-xs font-extrabold px-4 py-2 rounded-full shadow-2xl border-2 border-white animate-bounce">
            {activeBlessing}
          </div>
        )}
      </div>

      {/* Interactive Pooja Action Tray (4 Vibrant Sacred Buttons) */}
      <div className="grid grid-cols-4 gap-2 pt-1">
        {/* Action 1: Flower Shower */}
        <button
          onClick={handleShowerFlowers}
          className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-gradient-to-b from-orange-950/80 to-amber-950/80 border-2 border-amber-400/50 hover:border-yellow-300 active:scale-95 transition-all shadow-md group"
        >
          <span className="text-2xl group-hover:scale-125 transition-transform">🌸</span>
          <span className="text-[11px] font-bold text-yellow-300 mt-1">Flowers</span>
          <span className="text-[9px] text-amber-200 font-semibold">({flowerCount})</span>
        </button>

        {/* Action 2: Diya Toggle */}
        <button
          onClick={handleToggleDiya}
          className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border-2 active:scale-95 transition-all shadow-md ${
            isDiyaLit 
              ? 'bg-gradient-to-b from-red-950/80 to-amber-950/80 border-yellow-400 text-yellow-300' 
              : 'bg-black/60 border-amber-500/20 text-stone-400'
          }`}
        >
          <Flame className={`w-6 h-6 ${isDiyaLit ? 'text-yellow-300 fill-yellow-400 animate-diya' : 'text-stone-500'}`} />
          <span className="text-[11px] font-bold mt-1">{isDiyaLit ? 'Deepam' : 'Light Diya'}</span>
          <span className="text-[9px] text-amber-200 font-semibold">{isDiyaLit ? 'Lit 🪔' : 'Off'}</span>
        </button>

        {/* Action 3: Coconut Offering */}
        <button
          onClick={handleBreakCoconut}
          className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-gradient-to-b from-orange-950/80 to-amber-950/80 border-2 border-amber-400/50 hover:border-yellow-300 active:scale-95 transition-all shadow-md group"
        >
          <span className="text-2xl group-hover:scale-125 transition-transform">
            {isCoconutBroken ? '🥥✨' : '🥥'}
          </span>
          <span className="text-[11px] font-bold text-yellow-300 mt-1">Coconut</span>
          <span className="text-[9px] text-amber-200 font-semibold">Naivedyam</span>
        </button>

        {/* Action 4: Shankh Sound */}
        <button
          onClick={handlePlayShankh}
          className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-gradient-to-b from-orange-950/80 to-amber-950/80 border-2 border-amber-400/50 hover:border-yellow-300 active:scale-95 transition-all shadow-md group"
        >
          <span className="text-2xl group-hover:scale-125 transition-transform">🐚</span>
          <span className="text-[11px] font-bold text-yellow-300 mt-1">Shankh</span>
          <span className="text-[9px] text-amber-200 font-semibold">Sound</span>
        </button>
      </div>

      {/* Sacred 108 Chanting Japa Counter */}
      <div className="mt-3.5 pt-3 border-t-2 border-amber-400/30 flex items-center justify-between bg-black/50 p-3 rounded-2xl border border-amber-400/20 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold text-yellow-300">Ganesh Japa:</span>
            <span className="font-mono text-sm font-extrabold text-stone-950 bg-gradient-to-r from-yellow-300 to-amber-400 px-2.5 py-0.5 rounded-lg border border-white shadow-md">
              {chantCount} / 108
            </span>
          </div>
          <p className="text-[10px] text-amber-200 font-medium mt-0.5">Complete 108 sacred chants</p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleChant}
            className="btn-festive-primary text-xs px-4 py-2 rounded-xl shadow-lg active:scale-90 transition-transform"
          >
            🕉️ Chant +1
          </button>
          {chantCount > 0 && (
            <button
              onClick={() => setChantCount(0)}
              className="p-2 text-stone-400 hover:text-white rounded-lg bg-black/40 border border-amber-500/20"
              title="Reset counter"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
