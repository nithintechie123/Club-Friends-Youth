import React, { useState, useEffect } from 'react';
import { MessageSquareHeart, Send, Heart, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_PRAYERS } from '../data/festivalData';
import { devotionalAudio } from '../utils/audio';

export default function PrayerWallSection() {
  const [prayers, setPrayers] = useState(() => {
    const saved = localStorage.getItem('cfy_village_prayers');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_PRAYERS;
      }
    }
    return INITIAL_PRAYERS;
  });

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  useEffect(() => {
    localStorage.setItem('cfy_village_prayers', JSON.stringify(prayers));
  }, [prayers]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    devotionalAudio.playFlowerChime();

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FF9800', '#F44336']
    });

    const newPrayer = {
      id: Date.now(),
      name: name.trim(),
      location: location.trim() || 'Pipri Devotee',
      message: message.trim(),
      time: 'Just now',
      likes: 1,
      liked: true
    };

    setPrayers([newPrayer, ...prayers]);
    setName('');
    setLocation('');
    setMessage('');
    setIsSubmitting(false);
    setSuccessToast(true);

    setTimeout(() => setSuccessToast(false), 3500);
  };

  const handleLikePrayer = (id) => {
    setPrayers(prayers.map(p => {
      if (p.id === id) {
        const isLiked = !p.liked;
        if (isLiked) devotionalAudio.playFlowerChime();
        return {
          ...p,
          liked: isLiked,
          likes: isLiked ? p.likes + 1 : p.likes - 1
        };
      }
      return p;
    }));
  };

  return (
    <div className="space-y-4">
      {/* Section Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-[#7c2d12] font-['Cinzel',serif]">
            Bhakti Sandesh & Prayer Wall
          </h2>
          <p className="text-[11px] text-amber-900 font-semibold">
            Post your greetings, prayers & chants to Lord Ganesha
          </p>
        </div>
      </div>

      {/* Prayer Submission Box */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-4.5 shadow-xl border-2 border-amber-300 space-y-3">
        <div className="flex items-center gap-2 pb-2.5 border-b border-amber-200">
          <MessageSquareHeart className="w-4 h-4 text-orange-600" />
          <h3 className="text-xs font-black text-[#7c2d12] uppercase tracking-wider">
            Write Your Devotional Message
          </h3>
        </div>

        {successToast && (
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-bold p-3 rounded-2xl text-center shadow-md border border-white animate-bounce">
            🙏 Your prayer has been offered to Lord Ganesha! Ganpati Bappa Morya!
          </div>
        )}

        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="text-[10px] text-[#7c2d12] font-bold block mb-1">Your Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ramesh & Family"
              className="w-full bg-amber-50/40 border border-amber-300 rounded-xl px-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500"
            />
          </div>
          <div>
            <label className="text-[10px] text-[#7c2d12] font-bold block mb-1">Village / City</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Pipri / Armoor / NRI"
              className="w-full bg-amber-50/40 border border-amber-300 rounded-xl px-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] text-[#7c2d12] font-bold block mb-1">Your Prayer / Devotional Wish *</label>
          <textarea
            required
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="May Vigneshwara shower peace, health and prosperity on Pipri village..."
            className="w-full bg-amber-50/40 border border-amber-300 rounded-xl px-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500 resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-festive-primary text-xs py-2.5 px-4 rounded-xl shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Post Prayer & Chants</span>
        </button>
      </form>

      {/* Prayers Feed */}
      <div className="space-y-3">
        {prayers.map((prayer) => (
          <div
            key={prayer.id}
            className="bg-white border-2 border-amber-200 hover:border-amber-400 rounded-3xl p-4 shadow-md transition-all"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 text-white font-black text-xs flex items-center justify-center shadow-sm">
                  {prayer.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#431407]">
                    {prayer.name}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-amber-800 font-medium">
                    <MapPin className="w-3 h-3 text-red-600" />
                    <span>{prayer.location}</span>
                    <span>•</span>
                    <span>{prayer.time}</span>
                  </div>
                </div>
              </div>

              {/* Heart / Blessing Reaction Button */}
              <button
                onClick={() => handleLikePrayer(prayer.id)}
                className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border transition-all ${
                  prayer.liked
                    ? 'bg-red-50 border-red-300 text-red-600 shadow-sm'
                    : 'bg-amber-50 border-amber-200 text-amber-900 hover:bg-amber-100'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${prayer.liked ? 'text-red-600 fill-red-600' : ''}`} />
                <span>{prayer.likes}</span>
              </button>
            </div>

            {/* Prayer Content */}
            <p className="text-xs text-[#2b0d06] mt-2.5 leading-relaxed bg-amber-50/50 p-3 rounded-2xl border border-amber-200/60 font-medium">
              "{prayer.message}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
