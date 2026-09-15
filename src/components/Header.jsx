import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, MapPin, Radio, Bell, Flame } from 'lucide-react';
import { devotionalAudio } from '../utils/audio';
import { FESTIVAL_INFO } from '../data/festivalData';

export default function Header({ currentAartiCountdown, onOpenPooja }) {
  const [isPlayingAmbient, setIsPlayingAmbient] = useState(false);

  const toggleSound = () => {
    const isPlaying = devotionalAudio.toggleDevotionalAmbient();
    setIsPlayingAmbient(isPlaying);
    devotionalAudio.playFlowerChime();
  };

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-b from-[#220704] via-[#1c0604]/95 to-[#160503]/95 backdrop-blur-md border-b-2 border-amber-400/50 shadow-xl shadow-orange-950/40">
      {/* Decorative Floral Marigold Toran / Traditional Header Ribbon */}
      <div className="h-2.5 w-full bg-gradient-to-r from-orange-600 via-yellow-400 to-amber-500 flex items-center justify-around overflow-hidden shadow-sm">
        {[...Array(12)].map((_, i) => (
          <span key={i} className="text-[10px] transform -translate-y-0.5">
            {i % 2 === 0 ? '🌼' : '🌺'}
          </span>
        ))}
      </div>

      <div className="max-w-md mx-auto px-3.5 py-2 flex items-center justify-between">
        {/* Logo & Club Branding */}
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-yellow-400 via-amber-500 to-red-600 p-0.5 shadow-lg shadow-orange-600/50 flex items-center justify-center animate-aura">
              <div className="w-full h-full rounded-full bg-[#1e0705] flex items-center justify-center p-1">
                <img 
                  src="/ganesha-icon.svg" 
                  alt="Ganesha" 
                  className="w-8 h-8 object-contain animate-float"
                />
              </div>
            </div>
            {/* Live Indicator Dot */}
            <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-90"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-black"></span>
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 font-['Cinzel',serif] tracking-wider leading-none drop-shadow-sm">
                {FESTIVAL_INFO.clubName}
              </h1>
              <span className="text-[10px] bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold px-2 py-0.5 rounded-full shadow-sm border border-yellow-300/40 tracking-wide">
                UTSAV 2026
              </span>
            </div>
            <p className="text-[11px] text-amber-200/90 font-medium truncate max-w-[210px] flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-red-400 flex-shrink-0" />
              <span>{FESTIVAL_INFO.landmark}, <strong>{FESTIVAL_INFO.village}</strong></span>
            </p>
          </div>
        </div>

        {/* Audio Toggle & Quick Pooja Trigger */}
        <div className="flex items-center gap-1.5">
          {/* Virtual Pooja Shortcut */}
          <button
            onClick={onOpenPooja}
            className="flex items-center gap-1 btn-festive-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-lg active:scale-95 transition-transform"
            title="Open Interactive Pooja"
          >
            <Bell className="w-3.5 h-3.5 text-yellow-200 animate-bounce" />
            <span>Pooja</span>
          </button>

          {/* Devotional Background Sound Player */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-full border transition-all ${
              isPlayingAmbient 
                ? 'bg-amber-400 text-stone-950 border-yellow-300 shadow-md shadow-amber-400/50 scale-105' 
                : 'bg-black/50 text-amber-300 border-amber-500/40 hover:bg-black/70'
            }`}
            title={isPlayingAmbient ? "Pause Devotional Tanpura" : "Play Devotional Ambient Sound"}
          >
            {isPlayingAmbient ? (
              <Volume2 className="w-4 h-4 animate-pulse text-stone-950" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Live Aarti Countdown Banner - Vibrant Crimson & Gold */}
      <div className="bg-gradient-to-r from-red-950 via-amber-950 to-red-950 py-1.5 px-3.5 border-t border-amber-400/30 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-90"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
          <span className="font-bold text-yellow-300 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-orange-400 animate-diya" />
            Next Harati:
          </span>
          <span className="text-amber-100 font-semibold truncate">Evening Maha Harati (7:30 PM)</span>
        </div>
        <div className="bg-gradient-to-r from-red-900 to-amber-900 text-yellow-300 px-2.5 py-0.5 rounded-lg font-mono font-extrabold text-[11px] border border-yellow-400/60 shadow-md">
          {currentAartiCountdown || "02h : 38m : 15s"}
        </div>
      </div>
    </header>
  );
}
