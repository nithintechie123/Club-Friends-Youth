import React, { useState } from 'react';
import { Camera, Image as ImageIcon, Sparkles, Eye, Share2 } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/festivalData';

export default function GallerySection({ onImageClick }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showUploadMsg, setShowUploadMsg] = useState(false);

  const categories = ['All', 'Idol', 'Decoration', 'Annadanam', 'Cultural'];

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
          <h2 className="text-lg font-black text-[#7c2d12] font-['Cinzel',serif]">
            Utsav Photo & Video Gallery
          </h2>
          <p className="text-[11px] text-amber-900 font-semibold">
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
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-bold p-3 rounded-2xl shadow-xl border-2 border-white text-center animate-bounce">
          📸 Share your photos with the Club Friends Youth Media Team via WhatsApp to get featured!
        </div>
      )}

      {/* Gallery Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-1.5 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 text-xs px-3.5 py-1.5 rounded-full font-extrabold transition-all shadow-sm ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md scale-105 border-1.5 border-amber-300'
                : 'bg-white text-amber-900 border-1.5 border-amber-200 hover:border-amber-400 hover:bg-amber-50'
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
            className="group relative rounded-2xl overflow-hidden bg-white border-2 border-amber-200 hover:border-amber-400 shadow-md hover:shadow-xl cursor-pointer transition-all active:scale-98"
          >
            {/* Image Stage */}
            <div className="h-48 w-full overflow-hidden relative bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center p-1">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-md"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity"></div>
              
              {/* Category & Day Tag */}
              <div className="absolute top-2 left-2 flex items-center gap-1">
                <span className="text-[9px] font-black bg-gradient-to-r from-red-600 to-orange-600 text-white px-2 py-0.5 rounded-md shadow-sm border border-white/60">
                  {item.day}
                </span>
              </div>

              {/* View Icon */}
              <div className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-amber-900 border border-amber-300 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Bottom Caption Info */}
            <div className="p-3 bg-white border-t border-amber-100">
              <h3 className="text-xs font-black text-[#7c2d12] truncate font-['Cinzel',serif]">
                {item.title}
              </h3>
              <p className="text-[10px] text-amber-900 font-medium line-clamp-1 mt-0.5">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
