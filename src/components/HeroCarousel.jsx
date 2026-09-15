import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Share2, Heart, Sparkles, ZoomIn } from 'lucide-react';
import { HERO_CAROUSEL_SLIDES } from '../data/festivalData';
import { devotionalAudio } from '../utils/audio';

export default function HeroCarousel({ onImageClick, onOpenPooja }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [likes, setLikes] = useState({ 0: 345, 1: 289, 2: 412, 3: 256, 4: 242, 5: 298 });
  const [likedSlides, setLikedSlides] = useState({});
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const currentSlide = HERO_CAROUSEL_SLIDES[currentIndex];

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev < HERO_CAROUSEL_SLIDES.length - 1 ? prev + 1 : 0));
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : HERO_CAROUSEL_SLIDES.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < HERO_CAROUSEL_SLIDES.length - 1 ? prev + 1 : 0));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) handleNext();
    else if (diff < -45) handlePrev();
    setTimeout(() => setIsPaused(false), 2000);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    const isLiked = !likedSlides[currentIndex];
    setLikedSlides({ ...likedSlides, [currentIndex]: isLiked });
    setLikes({
      ...likes,
      [currentIndex]: isLiked ? (likes[currentIndex] || 250) + 1 : (likes[currentIndex] || 250) - 1
    });
    if (isLiked) devotionalAudio.playFlowerChime();
  };

  const handleShare = (e) => {
    e.stopPropagation();
    const text = `🌺 *${currentSlide.title}*\n${currentSlide.subtitle}\n📍 Club Friends Youth, Beside Gram Panchayathi Office, Pipri, Armoor\n\nJai Bolo Ganesh Maharaj Ki Jai! 🙏`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div 
      className="relative rounded-3xl overflow-hidden bg-white border-2 border-amber-300 shadow-xl shadow-amber-900/10 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Decorative Golden Corner Accents */}
      <div className="absolute top-2 left-2.5 text-amber-500 text-xs font-serif z-20 pointer-events-none drop-shadow">☸</div>
      <div className="absolute top-2 right-2.5 text-amber-500 text-xs font-serif z-20 pointer-events-none drop-shadow">☸</div>

      {/* Main Slide Presentation Stage - Clean Light Festive Backdrop */}
      <div 
        className="relative h-96 w-full cursor-pointer overflow-hidden bg-gradient-to-b from-[#fffbeb] via-[#fef3c7] to-[#fff7ed] flex items-center justify-center p-1"
        onClick={() => onImageClick?.(currentSlide.image, currentSlide.title, currentSlide.caption)}
      >
        <img
          key={currentSlide.id}
          src={currentSlide.image}
          alt={currentSlide.title}
          className="w-full h-full object-contain transition-all duration-700 animate-in fade-in zoom-in-95 drop-shadow-xl"
        />

        {/* Subtle Light Gradient on Bottom for Title Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#fff8e7]/95 via-transparent to-black/15 pointer-events-none"></div>

        {/* Top Badges */}
        <div className="absolute top-3.5 inset-x-4 flex items-center justify-between z-10 pointer-events-none">
          <span className="flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-orange-600 text-white font-extrabold text-[10px] px-3 py-1 rounded-full shadow-md border border-white/60 tracking-wider">
            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
            {currentSlide.tag}
          </span>
          <span className="bg-white/90 backdrop-blur-md text-[#9a3412] text-[10px] font-mono font-extrabold px-3 py-1 rounded-full border border-amber-300 shadow-sm">
            {currentIndex + 1} / {HERO_CAROUSEL_SLIDES.length}
          </span>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 text-amber-900 hover:bg-amber-500 hover:text-white transition-all border border-amber-300 active:scale-90 z-20 shadow-lg"
          aria-label="Previous Banner"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 text-amber-900 hover:bg-amber-500 hover:text-white transition-all border border-amber-300 active:scale-90 z-20 shadow-lg"
          aria-label="Next Banner"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Zoom Hint Icon */}
        <div className="absolute top-3.5 right-16 p-1.5 rounded-full bg-white/80 text-amber-800 border border-amber-300 pointer-events-none shadow-sm">
          <ZoomIn className="w-3.5 h-3.5" />
        </div>

        {/* Title & Subtitle Banner */}
        <div className="absolute bottom-3 left-4 right-4 z-10 pointer-events-none">
          <h2 className="text-xl font-black text-[#7c2d12] font-['Cinzel',serif] tracking-wide drop-shadow-sm">
            {currentSlide.title}
          </h2>
          <p className="text-xs text-[#9a3412] font-bold line-clamp-1 mt-0.5">
            {currentSlide.subtitle}
          </p>
        </div>
      </div>

      {/* Slide Navigation Dots */}
      <div className="flex items-center justify-center gap-1.5 py-2.5 bg-[#fffdfa] border-t border-amber-200">
        {HERO_CAROUSEL_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-300 rounded-full ${
              currentIndex === idx
                ? 'w-7 h-2.5 bg-gradient-to-r from-amber-500 to-orange-600 shadow-md shadow-orange-500/40'
                : 'w-2 h-2 bg-amber-200 hover:bg-amber-400'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Action Tray */}
      <div className="p-3 bg-gradient-to-r from-[#fffbf0] via-white to-[#fffbf0] border-t border-amber-200 flex items-center justify-between gap-2.5">
        <button
          onClick={onOpenPooja}
          className="flex-1 btn-festive-primary text-xs py-2.5 px-3 rounded-xl shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all"
        >
          <Sparkles className="w-4 h-4 text-yellow-200 animate-spin" />
          <span>Offer Virtual Pooja</span>
        </button>

        <button
          onClick={handleLike}
          className={`p-2.5 rounded-xl border-1.5 flex items-center gap-1 text-xs font-bold transition-all ${
            likedSlides[currentIndex]
              ? 'bg-red-50 text-red-600 border-red-300 shadow-sm'
              : 'bg-white text-stone-700 border-stone-200 hover:bg-amber-50 hover:text-amber-800'
          }`}
        >
          <Heart className={`w-4 h-4 ${likedSlides[currentIndex] ? 'text-red-600 fill-red-600' : ''}`} />
          <span>{likes[currentIndex] || 250}</span>
        </button>

        <button
          onClick={handleShare}
          className="p-2.5 rounded-xl border-1.5 border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-600 hover:text-white transition-colors"
          title="Share on WhatsApp"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
