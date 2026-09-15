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
      case 'pooja': return <Flame className="w-4 h-4 text-orange-400" />;
      case 'annadanam': return <Utensils className="w-4 h-4 text-emerald-400" />;
      case 'cultural': 
      case 'music': return <Music className="w-4 h-4 text-purple-400" />;
      case 'competition':
      case 'sports': return <Trophy className="w-4 h-4 text-yellow-400" />;
      case 'auction': return <Sparkles className="w-4 h-4 text-amber-400" />;
      default: return <Tag className="w-4 h-4 text-amber-400" />;
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
          <h2 className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-100 font-['Cinzel',serif]">
            Festival Activities & Events
          </h2>
          <p className="text-[11px] text-amber-200 font-medium">
            Maha Annadanam (20/09/2026), Harati, Cultural & Visarjan Schedule
          </p>
        </div>
      </div>

      {/* Category Filter Pills (Horizontal Scroll with Vibrant Colors) */}
      <div className="flex gap-2 overflow-x-auto pb-1.5 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`flex-shrink-0 text-xs px-3.5 py-1.5 rounded-full font-bold transition-all shadow-md ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500 text-stone-950 border-2 border-white scale-105 shadow-amber-500/50'
                : 'bg-[#220906] text-amber-200 border border-amber-400/30 hover:border-yellow-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Event Cards List */}
      <div className="space-y-3">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-8 festive-card rounded-2xl text-amber-200 text-xs">
            No events found for this filter.
          </div>
        ) : (
          filteredEvents.map((event) => {
            const isLive = event.status === 'Live Today';
            const isCompleted = event.status === 'Completed';

            return (
              <div
                key={event.id}
                className={`relative rounded-2xl p-4 border-2 transition-all shadow-xl ${
                  isLive
                    ? 'bg-gradient-to-br from-[#38110b] via-[#240905] to-[#1c0604] border-yellow-300 shadow-orange-950/70 ring-2 ring-yellow-400/40'
                    : isCompleted
                    ? 'bg-[#1b0604]/90 border-amber-400/25 opacity-90'
                    : 'bg-gradient-to-br from-[#290d09] to-[#1c0604] border-amber-400/50 hover:border-yellow-300'
                }`}
              >
                {/* Event Card Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 rounded-xl bg-black/60 border border-amber-400/30 shadow-md">
                      {getCategoryIcon(event.category)}
                    </span>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-yellow-400">
                        {event.badge} • Day {event.day}
                      </span>
                      <h3 className="text-sm font-extrabold text-amber-100 font-['Cinzel',serif] mt-0.5">
                        {event.title}
                      </h3>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border shadow-sm ${
                      isLive
                        ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white border-yellow-300 animate-pulse'
                        : isCompleted
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-500/60'
                        : 'bg-amber-950 text-yellow-300 border-yellow-400/60'
                    }`}
                  >
                    {event.status}
                  </span>
                </div>

                {/* Event Description */}
                <p className="text-xs text-amber-100 font-medium mt-2.5 leading-relaxed">
                  {event.description}
                </p>

                {/* Time, Venue & Action Footer */}
                <div className="mt-3 pt-2.5 border-t border-amber-400/20 flex items-center justify-between text-xs">
                  <div className="flex flex-col gap-1 text-[11px] text-amber-200">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-yellow-300" />
                      <span className="font-extrabold text-white">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-red-400" />
                      <span className="text-amber-200/90 font-medium">{event.location}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => shareEvent(event)}
                    className="flex items-center gap-1 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white border border-emerald-300/40 text-[11px] font-extrabold px-3 py-1.5 rounded-xl shadow-md transition-all active:scale-95"
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
