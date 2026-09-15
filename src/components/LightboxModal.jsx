import React from 'react';
import { X, Share2, Download, Heart } from 'lucide-react';

export default function LightboxModal({ image, title, caption, onClose }) {
  if (!image) return null;

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: title || 'Club Friends Youth Ganesh Utsav',
        text: caption || 'Check out this divine glimpse from our village Ganesh pandal!',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied! Share it on WhatsApp.");
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between text-white z-10" onClick={(e) => e.stopPropagation()}>
        <div>
          <h3 className="text-sm font-bold text-amber-200 font-['Cinzel',serif] truncate max-w-[240px]">
            {title || 'Ganesh Utsav Photo'}
          </h3>
          <p className="text-[10px] text-amber-300/70">Club Friends Youth</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-stone-900/80 text-amber-300 border border-amber-500/30 hover:bg-stone-800"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-900/80 text-white border border-stone-700 hover:bg-stone-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Image Center */}
      <div className="flex-1 flex items-center justify-center p-2" onClick={(e) => e.stopPropagation()}>
        <img
          src={image}
          alt={title || 'Enlarged photo'}
          className="max-h-[70vh] max-w-full object-contain rounded-2xl border border-amber-500/30 shadow-2xl"
        />
      </div>

      {/* Bottom Caption */}
      <div className="text-center pb-2 z-10" onClick={(e) => e.stopPropagation()}>
        {caption && (
          <p className="text-xs text-amber-100/90 bg-black/60 px-4 py-2 rounded-xl backdrop-blur-sm border border-amber-500/20 max-w-md mx-auto">
            {caption}
          </p>
        )}
      </div>
    </div>
  );
}
