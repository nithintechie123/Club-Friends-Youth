import React, { useState } from 'react';
import { Camera, Image as ImageIcon, Sparkles, Eye, Share2 } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/festivalData';

export default function GallerySection({ onImageClick }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showUploadMsg, setShowUploadMsg] = useState(false);

  const categories = ['All', 'Idol', 'Aarti', 'Annadanam', 'Cultural', 'Decoration'];

  const filteredItems = GALLERY_ITEMS.filter(item => 
    activeCategory === 'All' || item.category.toLowerCase() === activeCategory.toLowerCase()
  );

  const handleDevoteeUpload = () => {
    setShowUploadMsg(true);
    setTimeout(() => setShowUploadMsg(false), 4000);
  };

  return (
    <div className="space-y-4">
      {/* Section Header & Upload CTA */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-100 font-['Cinzel',serif]">
            Utsav Photo & Video Gallery
          </h2>
          <p className="text-[11px] text-amber-200 font-medium">
            Daily alankarams, pandal decor & official posters
          </p>
        </div>

        <button
          onClick={handleDevoteeUpload}
          className="flex items-center gap-1.5 btn-festive-primary text-xs px-3 py-1.5 rounded-xl shadow-md active:scale-95 transition-all"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Upload</span>
        </button>
      </div>

      {showUploadMsg && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-stone-950 text-xs font-bold p-3 rounded-2xl shadow-xl border-2 border-white text-center animate-bounce">
          📸 Share your photos with the Club Friends Youth Media Team via WhatsApp to get featured!
        </div>
      )}

      {/* Gallery Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-1.5 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 text-xs px-3.5 py-1.5 rounded-full font-bold transition-all shadow-md ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500 text-stone-950 border-2 border-white scale-105 shadow-amber-500/50'
                : 'bg-[#220906] text-amber-200 border border-amber-400/30 hover:border-yellow-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Photo Grid (2-column on mobile) */}
      <div className="grid grid-cols-2 gap-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onImageClick?.(item.image, item.title, item.caption)}
            className="group relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#280c08] to-[#1a0604] border-2 border-amber-400/50 hover:border-yellow-300 shadow-xl cursor-pointer transition-all active:scale-98"
          >
            {/* Image */}
            <div className="h-44 w-full overflow-hidden relative bg-black flex items-center justify-center">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-contain sm:object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity"></div>
              
              {/* Category & Day Tag */}
              <div className="absolute top-2 left-2 flex items-center gap-1">
                <span className="text-[9px] font-extrabold bg-gradient-to-r from-red-600 to-orange-600 text-white px-2 py-0.5 rounded-md shadow-md border border-yellow-300/40">
                  {item.day}
                </span>
              </div>

              {/* View Icon */}
              <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-yellow-300 border border-yellow-400/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Bottom Caption Info */}
            <div className="p-2.5">
              <h3 className="text-xs font-extrabold text-amber-100 truncate font-['Cinzel',serif]">
                {item.title}
              </h3>
              <p className="text-[10px] text-amber-300 font-medium line-clamp-1 mt-0.5">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
