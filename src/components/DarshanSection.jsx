import React from 'react';
import { Clock, MapPin, Sparkles, Flame, Navigation } from 'lucide-react';
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



      {/* Daily Harati & Pooja Timings Schedule Card - Light Festive Style */}
      <div className="bg-white border-2 border-amber-300 rounded-3xl p-4.5 shadow-xl shadow-amber-900/5">
        <div className="flex items-center justify-between pb-3 border-b border-amber-200">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800 border border-amber-300 shadow-sm">
              <Clock className="w-4 h-4 text-amber-700" />
            </div>
            <h3 className="text-sm font-black text-[#7c2d12] font-['Cinzel',serif]">
              Daily Nitya Harati Timings
            </h3>
          </div>
          <span className="text-[10px] bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold px-2.5 py-0.5 rounded-full shadow-sm">
            Open for All
          </span>
        </div>

        <div className="divide-y divide-amber-100 mt-2">
          {FESTIVAL_INFO.aartiTimings.map((slot, index) => (
            <div key={index} className="py-2.5 flex items-center justify-between text-xs hover:bg-amber-50/50 px-1.5 rounded-xl transition-colors">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 shadow-sm"></span>
                <div>
                  <p className="font-bold text-[#431407]">{slot.title}</p>
                  <span className="text-[10px] text-amber-700 font-semibold">{slot.period}</span>
                </div>
              </div>
              <span className="font-mono font-extrabold text-[#7c2d12] bg-amber-50 px-3 py-1 rounded-xl border border-amber-300 shadow-sm">
                {slot.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Pandal Landmark & Address Card */}
      <div className="bg-gradient-to-r from-amber-50 via-[#fffbf0] to-orange-50 border-2 border-amber-300 rounded-3xl p-4 flex items-center justify-between text-xs gap-3 shadow-lg shadow-amber-900/5">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-br from-amber-500 to-red-600 text-white shadow-md mt-0.5 flex-shrink-0">
            <MapPin className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-amber-700 tracking-wider">
              Pandal Venue
            </span>
            <h4 className="font-black text-[#7c2d12] text-sm mt-0.5">
              {FESTIVAL_INFO.landmark}
            </h4>
            <p className="text-[11px] text-amber-900 font-bold mt-0.5">
              Village: <strong className="text-orange-700">Pipri</strong>, Mandal: <strong className="text-orange-700">Armoor</strong>
            </p>
            <p className="text-[10px] text-amber-800/80 font-medium">
              District: Nizamabad, Telangana
            </p>
          </div>
        </div>
        <a
          href={FESTIVAL_INFO.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-festive-primary text-xs px-3.5 py-2.5 rounded-xl shadow-md active:scale-95 transition-transform flex-shrink-0 flex items-center gap-1.5"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Navigate</span>
        </a>
      </div>
    </div>
  );
}
