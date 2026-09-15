import React from 'react';
import { Clock, MapPin, Sparkles, Flame, Navigation, Radio } from 'lucide-react';
import HeroCarousel from './HeroCarousel';
import { FESTIVAL_INFO } from '../data/festivalData';

export default function DarshanSection({ onOpenPooja, onImageClick }) {
  return (
    <div className="space-y-4">
      {/* Dynamic Festive Hero Carousel */}
      <HeroCarousel 
        onImageClick={onImageClick} 
        onOpenPooja={onOpenPooja} 
      />

      {/* Daily Harati & Pooja Timings Schedule Card - Vibrant Crimson & Gold */}
      <div className="festive-card rounded-2xl p-4 shadow-xl gold-glow-border">
        <div className="flex items-center justify-between pb-3 border-b border-amber-400/30">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-yellow-300 border border-amber-400/40">
              <Clock className="w-4 h-4 text-yellow-300" />
            </div>
            <h3 className="text-sm font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-amber-400 font-['Cinzel',serif]">
              Daily Nitya Harati Timings
            </h3>
          </div>
          <span className="text-[10px] bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold px-2.5 py-0.5 rounded-full shadow-sm border border-yellow-300/40">
            Open for All Devotees
          </span>
        </div>

        <div className="divide-y divide-amber-400/15 mt-2">
          {FESTIVAL_INFO.aartiTimings.map((slot, index) => (
            <div key={index} className="py-2.5 flex items-center justify-between text-xs hover:bg-black/20 px-1 rounded-lg transition-colors">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 shadow-sm shadow-orange-500/50"></span>
                <div>
                  <p className="font-bold text-amber-100">{slot.title}</p>
                  <span className="text-[10px] text-amber-300/80 font-semibold">{slot.period}</span>
                </div>
              </div>
              <span className="font-mono font-extrabold text-yellow-300 bg-gradient-to-r from-black/70 to-amber-950/60 px-2.5 py-1 rounded-lg border border-yellow-400/40 shadow-sm">
                {slot.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Pandal Landmark & Address Card */}
      <div className="bg-gradient-to-r from-[#2c0d08] via-[#1e0705] to-[#2c0d08] border-2 border-amber-400/60 rounded-2xl p-4 flex items-center justify-between text-xs gap-3 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-red-600 text-white shadow-md shadow-orange-950/60 mt-0.5 flex-shrink-0">
            <MapPin className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase text-yellow-400 tracking-wider">
              Pandal Venue
            </span>
            <h4 className="font-extrabold text-white text-sm mt-0.5">
              {FESTIVAL_INFO.landmark}
            </h4>
            <p className="text-[11px] text-amber-200 font-semibold mt-0.5">
              Village: <strong className="text-yellow-300">Pipri</strong>, Mandal: <strong className="text-yellow-300">Armoor</strong>
            </p>
            <p className="text-[10px] text-amber-300/80 font-medium">
              District: Nizamabad, Telangana
            </p>
          </div>
        </div>
        <a 
          href={FESTIVAL_INFO.mapsUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-festive-primary text-xs px-3.5 py-2.5 rounded-xl shadow-lg active:scale-95 transition-transform flex-shrink-0 flex items-center gap-1.5"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Navigate</span>
        </a>
      </div>
    </div>
  );
}
