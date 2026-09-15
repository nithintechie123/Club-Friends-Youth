import React from 'react';
import { Home, Calendar, Bell, Image, Gift, MessageSquareHeart } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'darshan', label: 'Darshan', icon: Home },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'pooja', label: 'Pooja', icon: Bell, highlight: true },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'seva', label: 'Seva', icon: Gift },
    { id: 'prayers', label: 'Prayers', icon: MessageSquareHeart },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t-2 border-amber-300/80 shadow-[0_-8px_25px_rgba(180,83,9,0.12)] py-1.5 px-2">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          if (item.highlight) {
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="relative -top-5 flex flex-col items-center group focus:outline-none"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-400 text-white scale-110 shadow-orange-500/50 ring-4 ring-amber-300 animate-aura'
                    : 'bg-gradient-to-tr from-orange-500 via-amber-600 to-red-600 text-white shadow-orange-900/30 group-hover:scale-105 border-2 border-amber-200'
                }`}>
                  <Icon className="w-6 h-6 animate-pulse text-white drop-shadow" />
                </div>
                <span className={`text-[10px] font-black mt-0.5 tracking-tight ${
                  isActive ? 'text-amber-900' : 'text-amber-800'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all ${
                isActive
                  ? 'text-amber-900 font-black scale-105 bg-amber-100/90 border border-amber-300/80 shadow-sm'
                  : 'text-stone-600 hover:text-amber-700 font-bold'
              }`}
            >
              <div className="relative">
                <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.8] text-amber-700' : ''}`} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-amber-600 rounded-full shadow-sm"></span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 font-bold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

