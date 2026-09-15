import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
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
