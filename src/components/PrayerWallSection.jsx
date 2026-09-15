import React, { useState, useEffect } from 'react';
import { MessageSquareHeart, Send, Heart, MapPin, Sparkles } from 'lucide-react';
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
          <h2 className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-100 font-['Cinzel',serif]">
            Bhakti Sandesh & Prayer Wall
          </h2>
          <p className="text-[11px] text-amber-200 font-medium">
            Post your greetings, prayers & chants to Lord Ganesha
          </p>
        </div>
      </div>

      {/* Prayer Submission Box */}
      <form onSubmit={handleSubmit} className="festive-card rounded-2xl p-4 shadow-xl space-y-3 gold-glow-border">
        <div className="flex items-center gap-2 pb-2 border-b border-amber-400/30">
          <MessageSquareHeart className="w-4 h-4 text-yellow-300" />
          <h3 className="text-xs font-extrabold text-yellow-300 uppercase tracking-wider">
            Write Your Devotional Message
          </h3>
        </div>

        {successToast && (
          <div className="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 text-stone-950 text-xs font-bold p-2.5 rounded-xl text-center shadow-lg border-2 border-white animate-bounce">
            🙏 Your prayer has been offered to Lord Ganesha! Ganpati Bappa Morya!
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] text-yellow-300 font-bold block mb-1">Your Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ramesh & Family"
              className="w-full bg-black/60 border border-amber-400/40 rounded-xl px-2.5 py-2 text-xs text-amber-100 placeholder-stone-400 focus:outline-none focus:border-yellow-300"
            />
          </div>
          <div>
            <label className="text-[10px] text-yellow-300 font-bold block mb-1">Village / City</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Pipri / Armoor / NRI"
              className="w-full bg-black/60 border border-amber-400/40 rounded-xl px-2.5 py-2 text-xs text-amber-100 placeholder-stone-400 focus:outline-none focus:border-yellow-300"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] text-yellow-300 font-bold block mb-1">Your Prayer / Devotional Wish *</label>
          <textarea
            required
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="May Vigneshwara shower peace, health and prosperity on Pipri village..."
            className="w-full bg-black/60 border border-amber-400/40 rounded-xl px-2.5 py-2 text-xs text-amber-100 placeholder-stone-400 focus:outline-none focus:border-yellow-300 resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-festive-primary text-xs py-2.5 px-4 rounded-xl shadow-xl flex items-center justify-center gap-1.5 active:scale-95 transition-all"
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
            className="bg-gradient-to-br from-[#260c08] to-[#1a0604] border-2 border-amber-400/35 hover:border-yellow-300 rounded-2xl p-4 shadow-lg transition-all"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-600 text-stone-950 font-extrabold text-xs flex items-center justify-center shadow-md">
                  {prayer.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-white">
                    {prayer.name}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-amber-300/80">
                    <MapPin className="w-3 h-3 text-red-400" />
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
                    ? 'bg-red-950 border-red-500 text-red-300 shadow-sm shadow-red-500/40'
                    : 'bg-black/50 border-amber-400/30 text-amber-200 hover:text-white'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${prayer.liked ? 'text-red-500 fill-red-500' : ''}`} />
                <span>{prayer.likes}</span>
              </button>
            </div>

            {/* Prayer Content */}
            <p className="text-xs text-amber-100 mt-2.5 leading-relaxed bg-black/40 p-3 rounded-xl border border-amber-400/15 font-medium">
              "{prayer.message}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
