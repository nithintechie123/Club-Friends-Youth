import React, { useState } from 'react';
import { Clock, MapPin, Tag, Share2, Flame, Trophy, Utensils, Music, Sparkles } from 'lucide-react';
import { FESTIVAL_EVENTS } from '../data/festivalData';

export default function EventsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Pooja', 'Annadanam', 'Cultural', 'Competition', 'Music', 'Sports', 'Auction', 'Visarjan'];

  const filteredEvents = FESTIVAL_EVENTS.filter(event => {
    return selectedCategory === 'All' || event.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const getCategoryIcon = (cat) => {
    switch (cat.toLowerCase()) {
      case 'pooja': return <Flame className="w-4 h-4 text-orange-600" />;
      case 'annadanam': return <Utensils className="w-4 h-4 text-emerald-600" />;
      case 'cultural': 
      case 'music': return <Music className="w-4 h-4 text-purple-600" />;
      case 'competition':
      case 'sports': return <Trophy className="w-4 h-4 text-amber-600" />;
      case 'auction': return <Sparkles className="w-4 h-4 text-yellow-600" />;
      default: return <Tag className="w-4 h-4 text-amber-600" />;
    }
  };

  const shareEvent = (event) => {
    const text = `🎉 *${event.title}* at Club Friends Youth Ganesh Pandal (Pipri, Armoor)\n⏰ ${event.time}\n📍 ${event.location}\n\nJoin us with your family! 🙏`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-[#7c2d12] font-['Cinzel',serif]">
            Festival Activities & Events
          </h2>
          <p className="text-[11px] text-amber-900 font-semibold">
            Maha Annadanam (20/09/2026), Harati, Cultural & Visarjan Schedule
          </p>
        </div>
      </div>

      {/* Category Filter Pills (Horizontal Scroll with Bright Colors) */}
      <div className="flex gap-2 overflow-x-auto pb-1.5 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`flex-shrink-0 text-xs px-3.5 py-1.5 rounded-full font-extrabold transition-all shadow-sm ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md scale-105 border-1.5 border-amber-300'
                : 'bg-white text-amber-900 border-1.5 border-amber-200 hover:border-amber-400 hover:bg-amber-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Event Cards List */}
      <div className="space-y-3">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-8 bg-white border border-amber-200 rounded-2xl text-amber-800 text-xs">
            No events found for this filter.
          </div>
        ) : (
          filteredEvents.map((event) => {
            const isLive = event.status === 'Live Today';
            const isCompleted = event.status === 'Completed';

            return (
              <div
                key={event.id}
                className={`relative rounded-3xl p-4 border-2 transition-all shadow-md ${
                  isLive
                    ? 'bg-gradient-to-br from-amber-50 via-white to-orange-50 border-orange-400 shadow-orange-900/10 ring-2 ring-orange-400/30'
                    : isCompleted
                    ? 'bg-white/80 border-stone-200 opacity-90'
                    : 'bg-white border-amber-200 hover:border-amber-400 hover:shadow-lg'
                }`}
              >
                {/* Event Card Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 rounded-xl bg-amber-50 border border-amber-200 shadow-sm">
                      {getCategoryIcon(event.category)}
                    </span>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-orange-700">
                        {event.badge} • Day {event.day}
                      </span>
                      <h3 className="text-sm font-black text-[#431407] font-['Cinzel',serif] mt-0.5">
                        {event.title}
                      </h3>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border shadow-sm ${
                      isLive
                        ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white border-white animate-pulse'
                        : isCompleted
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : 'bg-amber-100 text-amber-900 border-amber-300'
                    }`}
                  >
                    {event.status}
                  </span>
                </div>

                {/* Event Description */}
                <p className="text-xs text-[#2b0d06] font-medium mt-2.5 leading-relaxed">
                  {event.description}
                </p>

                {/* Time, Venue & Action Footer */}
                <div className="mt-3 pt-2.5 border-t border-amber-100 flex items-center justify-between text-xs">
                  <div className="flex flex-col gap-1 text-[11px] text-amber-900">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-orange-600" />
                      <span className="font-extrabold text-[#7c2d12]">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-red-600" />
                      <span className="text-[#431407] font-semibold">{event.location}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => shareEvent(event)}
                    className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-400 text-[11px] font-extrabold px-3 py-1.5 rounded-xl shadow-sm transition-all active:scale-95"
                    title="Share on WhatsApp"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
