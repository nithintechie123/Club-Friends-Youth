import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import DarshanSection from './components/DarshanSection';
import EventsSection from './components/EventsSection';
import VirtualPooja from './components/VirtualPooja';
import GallerySection from './components/GallerySection';
import PrayerWallSection from './components/PrayerWallSection';
import SevaSection from './components/SevaSection';
import AboutSection from './components/AboutSection';
import LightboxModal from './components/LightboxModal';
import SplashScreen from './components/SplashScreen';
import { Sparkles, Bell, Heart, Shield, Share2, Info } from 'lucide-react';
import { FESTIVAL_INFO } from './data/festivalData';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState('darshan');
  const [isPoojaModalOpen, setIsPoojaModalOpen] = useState(false);
  const [lightboxData, setLightboxData] = useState(null);
  const [countdownText, setCountdownText] = useState('');

  // Live Countdown calculation to evening Aarti (19:30:00)
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(19, 30, 0, 0); // 7:30 PM Evening Harati

      let diff = target - now;
      if (diff <= 0) {
        const nextMorning = new Date();
        nextMorning.setDate(nextMorning.getDate() + 1);
        nextMorning.setHours(8, 30, 0, 0);
        diff = nextMorning - now;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      const pad = (n) => String(n).padStart(2, '0');
      setCountdownText(`${pad(hours)}h : ${pad(mins)}m : ${pad(secs)}s`);
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const openLightbox = (image, title, caption) => {
    setLightboxData({ image, title, caption });
  };

  const closeLightbox = () => {
    setLightboxData(null);
  };

  return (
    <div className="min-h-screen text-amber-50 flex flex-col font-['Outfit',sans-serif] selection:bg-amber-500 selection:text-black">
      {/* Intro Animated Splash Screen with Official Youth Logo */}
      {showSplash && (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      )}

      {/* Top Header */}
      <Header
        currentAartiCountdown={countdownText}
        onOpenPooja={() => setIsPoojaModalOpen(true)}
      />

      {/* Main Content Area - Mobile Optimized Max-W */}
      <main className="flex-1 max-w-md w-full mx-auto px-3.5 pt-3 pb-24 space-y-4">
        {/* Active Tab View Rendering */}
        {activeTab === 'darshan' && (
          <DarshanSection
            onOpenPooja={() => setIsPoojaModalOpen(true)}
            onImageClick={openLightbox}
          />
        )}

        {activeTab === 'events' && (
          <EventsSection />
        )}

        {activeTab === 'pooja' && (
          <VirtualPooja />
        )}

        {activeTab === 'gallery' && (
          <GallerySection onImageClick={openLightbox} />
        )}

        {activeTab === 'seva' && (
          <SevaSection />
        )}

        {activeTab === 'prayers' && (
          <PrayerWallSection />
        )}

        {activeTab === 'about' && (
          <AboutSection />
        )}

        {/* Quick Committee / About Tab Switcher Banner */}
        {activeTab !== 'about' && (
          <div className="festive-card rounded-2xl p-3.5 flex items-center justify-between mt-6 border-2 border-amber-400/40">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-600 text-stone-950 font-bold shadow-md">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-white">Club Friends Youth Committee</h4>
                <p className="text-[10px] text-yellow-300">Pipri village team, contacts & location</p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('about')}
              className="btn-festive-primary text-[11px] px-3 py-1.5 rounded-xl active:scale-95 transition-all shadow-md"
            >
              Contacts
            </button>
          </div>
        )}

        {/* Footer Devotional Chant */}
        <footer className="pt-4 pb-2 text-center text-xs text-amber-200/70 space-y-1">
          <p className="font-serif tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-100 text-sm font-extrabold drop-shadow">
            ॥ గణపతి బప్పా మోరియా • మంగళ మూర్తి మోరియా ॥
          </p>
          <p className="text-[11px] text-yellow-400/90 font-bold">
            © {new Date().getFullYear()} {FESTIVAL_INFO.clubName} • {FESTIVAL_INFO.landmark}, {FESTIVAL_INFO.village}
          </p>
          <p className="text-[10px] text-stone-400">
            Handcrafted with devotion for village community & devotees worldwide
          </p>
        </footer>
      </main>

      {/* Floating Modal for Virtual Pooja (When clicked from Header/Button) */}
      {isPoojaModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 overflow-y-auto">
          <div className="w-full max-w-md my-auto">
            <VirtualPooja onClose={() => setIsPoojaModalOpen(false)} />
          </div>
        </div>
      )}

      {/* Lightbox Modal for Fullscreen Photos */}
      <LightboxModal
        image={lightboxData?.image}
        title={lightboxData?.title}
        caption={lightboxData?.caption}
        onClose={closeLightbox}
      />

      {/* Sticky Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
