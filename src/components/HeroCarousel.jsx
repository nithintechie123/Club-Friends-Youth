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
      className="relative rounded-3xl overflow-hidden festive-card gold-glow-border shadow-2xl group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Decorative Golden Corner Accents */}
      <div className="absolute top-2 left-2 text-yellow-300 text-xs font-serif z-20 pointer-events-none drop-shadow">☸</div>
      <div className="absolute top-2 right-2 text-yellow-300 text-xs font-serif z-20 pointer-events-none drop-shadow">☸</div>

      {/* Main Slide Presentation Stage */}
      <div 
        className="relative h-96 w-full cursor-pointer overflow-hidden bg-gradient-to-b from-[#1a0604] via-black to-[#220704] flex items-center justify-center"
        onClick={() => onImageClick?.(currentSlide.image, currentSlide.title, currentSlide.caption)}
      >
        <img
          key={currentSlide.id}
          src={currentSlide.image}
          alt={currentSlide.title}
          className="w-full h-full object-contain transition-all duration-700 animate-in fade-in zoom-in-95 drop-shadow-2xl"
        />

        {/* Radiant Vignette Overlay for Crisp Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1b0604] via-transparent to-black/40 pointer-events-none"></div>

        {/* Top Badges */}
        <div className="absolute top-3.5 inset-x-4 flex items-center justify-between z-10 pointer-events-none">
          <span className="flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-orange-600 text-white font-extrabold text-[10px] px-3 py-1 rounded-full shadow-lg border border-yellow-300/60 tracking-wider">
            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
            {currentSlide.tag}
          </span>
          <span className="bg-black/80 backdrop-blur-md text-yellow-300 text-[10px] font-mono font-extrabold px-3 py-1 rounded-full border border-yellow-400/50 shadow-md">
            {currentIndex + 1} / {HERO_CAROUSEL_SLIDES.length}
          </span>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/80 text-yellow-300 hover:bg-amber-600 hover:text-white transition-all border border-yellow-400/50 active:scale-90 z-20 shadow-xl"
          aria-label="Previous Banner"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/80 text-yellow-300 hover:bg-amber-600 hover:text-white transition-all border border-yellow-400/50 active:scale-90 z-20 shadow-xl"
          aria-label="Next Banner"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Zoom Hint Icon */}
        <div className="absolute top-3.5 right-16 p-1 rounded-full bg-black/60 text-yellow-300 border border-yellow-400/40 pointer-events-none">
          <ZoomIn className="w-3.5 h-3.5" />
        </div>

        {/* Title & Subtitle Banner */}
        <div className="absolute bottom-3 left-4 right-4 z-10 pointer-events-none">
          <h2 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-100 font-['Cinzel',serif] tracking-wide drop-shadow-md">
            {currentSlide.title}
          </h2>
          <p className="text-xs text-amber-200 font-semibold line-clamp-1 drop-shadow-sm mt-0.5">
            {currentSlide.subtitle}
          </p>
        </div>
      </div>

      {/* Golden Glowing Navigation Dots */}
      <div className="flex items-center justify-center gap-1.5 py-2.5 bg-[#1b0604] border-t border-amber-400/20">
        {HERO_CAROUSEL_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-300 rounded-full ${
              currentIndex === idx
                ? 'w-7 h-2.5 bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500 shadow-md shadow-amber-400/60'
                : 'w-2 h-2 bg-stone-700 hover:bg-stone-500'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Action Tray */}
      <div className="p-3 bg-gradient-to-b from-[#1b0604] to-[#280905] border-t border-amber-400/30 flex items-center justify-between gap-2">
        <button
          onClick={onOpenPooja}
          className="flex-1 btn-festive-primary text-xs py-2.5 px-3 rounded-xl shadow-lg flex items-center justify-center gap-1.5 active:scale-95 transition-all"
        >
          <Sparkles className="w-4 h-4 text-yellow-200 animate-spin" />
          <span>Offer Virtual Pooja</span>
        </button>

        <button
          onClick={handleLike}
          className={`p-2.5 rounded-xl border flex items-center gap-1 text-xs font-bold transition-all ${
            likedSlides[currentIndex]
              ? 'bg-red-950 text-red-300 border-red-500 shadow-sm shadow-red-500/30'
              : 'bg-black/50 text-amber-200 border-amber-500/40 hover:bg-black/70'
          }`}
        >
          <Heart className={`w-4 h-4 ${likedSlides[currentIndex] ? 'text-red-500 fill-red-500' : ''}`} />
          <span>{likes[currentIndex] || 250}</span>
        </button>

        <button
          onClick={handleShare}
          className="p-2.5 rounded-xl border border-amber-500/40 bg-black/50 text-amber-300 hover:bg-amber-600 hover:text-white transition-colors"
          title="Share on WhatsApp"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
