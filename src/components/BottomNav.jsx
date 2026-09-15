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
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-gradient-to-t from-[#160402] via-[#220704]/95 to-[#2c0a06]/90 backdrop-blur-xl border-t-2 border-amber-400/40 shadow-2xl py-1 px-2">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          if (item.highlight) {
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="relative -top-4 flex flex-col items-center group focus:outline-none"
              >
                <div className={`w-13 h-13 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-tr from-yellow-300 via-amber-400 to-orange-600 text-stone-950 scale-110 shadow-amber-400/80 ring-4 ring-yellow-300 animate-aura'
                    : 'bg-gradient-to-tr from-orange-500 via-amber-600 to-red-600 text-white shadow-orange-950/90 group-hover:scale-105 border-2 border-yellow-300/80'
                }`}>
                  <Icon className="w-6 h-6 animate-pulse" />
                </div>
                <span className={`text-[10px] font-extrabold mt-0.5 tracking-tight ${
                  isActive ? 'text-yellow-300' : 'text-amber-200'
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
              className={`flex flex-col items-center py-1.5 px-2.5 rounded-xl transition-all ${
                isActive
                  ? 'text-yellow-300 font-extrabold scale-110 bg-amber-500/15 border border-amber-400/40 shadow-sm'
                  : 'text-amber-200/70 hover:text-amber-100'
              }`}
            >
              <div className="relative">
                <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5] text-yellow-300' : ''}`} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-yellow-300 rounded-full shadow-sm shadow-yellow-300"></span>
                )}
              </div>
              <span className="text-[10px] mt-1 font-semibold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
