import React from 'react';
import { Users, Phone, MessageCircle, MapPin, Heart, Shield, Navigation, Compass } from 'lucide-react';
import { COMMITTEE_MEMBERS, FESTIVAL_INFO } from '../data/festivalData';

export default function AboutSection() {
  const handleCall = (phone) => {
    window.location.href = `tel:${phone.replace(/[^0-9+]/g, '')}`;
  };

  const handleWhatsApp = (member) => {
    const text = `Namaste ${member.name}, I am reaching out regarding Club Friends Youth Ganesh Utsav celebrations at Pipri.`;
    const cleanPhone = member.phone.replace(/[^0-9]/g, '');
    window.open(`https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div>
        <h2 className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-100 font-['Cinzel',serif]">
          About {FESTIVAL_INFO.clubName}
        </h2>
        <p className="text-[11px] text-amber-200 font-medium">
          Dedicated village youth uniting Pipri through devotion, seva & friendship
        </p>
      </div>

      {/* Story & Mission Card */}
      <div className="festive-card rounded-2xl p-4 shadow-xl space-y-3 gold-glow-border">
        <div className="flex items-center gap-2 pb-2 border-b border-amber-400/30">
          <Shield className="w-4 h-4 text-yellow-300" />
          <h3 className="text-xs font-extrabold text-yellow-300 uppercase tracking-wider">
            Our Village Tradition & Spirit
          </h3>
        </div>

        <p className="text-xs text-amber-100 leading-relaxed font-medium">
          Established by the youth of Pipri village, <strong>Club Friends Youth</strong> organizes the grand annual Ganesh Mahotsav with sacred traditions, Sunday Maha Annadanam feasts (20/09/2026), cultural talent platforms, and an unforgettable Visarjan procession.
        </p>

        <div className="grid grid-cols-3 gap-2 pt-1 text-center">
          <div className="bg-black/50 border border-amber-400/30 p-2.5 rounded-xl shadow-inner">
            <span className="text-base font-extrabold text-yellow-300 font-mono">10+</span>
            <p className="text-[9px] text-amber-200 font-bold uppercase mt-0.5">Years Utsav</p>
          </div>
          <div className="bg-black/50 border border-amber-400/30 p-2.5 rounded-xl shadow-inner">
            <span className="text-base font-extrabold text-yellow-300 font-mono">5000+</span>
            <p className="text-[9px] text-amber-200 font-bold uppercase mt-0.5">Devotees Fed</p>
          </div>
          <div className="bg-black/50 border border-amber-400/30 p-2.5 rounded-xl shadow-inner">
            <span className="text-base font-extrabold text-yellow-300 font-mono">45+</span>
            <p className="text-[9px] text-amber-200 font-bold uppercase mt-0.5">Volunteers</p>
          </div>
        </div>
      </div>

      {/* Committee Organizers Directory */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-yellow-300" />
          <h3 className="text-xs font-extrabold text-yellow-300 uppercase tracking-wider">
            Youth Committee Leads & Contacts
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {COMMITTEE_MEMBERS.map((member, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-r from-[#2a0e0a] to-[#1c0604] border-2 border-amber-400/40 hover:border-yellow-300 rounded-2xl p-3.5 shadow-md flex items-center justify-between gap-2.5 transition-all"
            >
              <div className="flex items-center gap-3">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-yellow-300 shadow-md"
                />
                <div>
                  <h4 className="text-xs font-extrabold text-white font-['Cinzel',serif]">
                    {member.name}
                  </h4>
                  <p className="text-[10px] text-yellow-300 font-bold">{member.role}</p>
                  <p className="text-[9px] text-amber-200 font-medium">{member.experience}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleWhatsApp(member)}
                  className="p-2 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-md hover:from-emerald-500 active:scale-90 transition-transform"
                  title="Chat on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleCall(member.phone)}
                  className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-stone-950 shadow-md hover:from-yellow-400 active:scale-90 transition-transform"
                  title="Call Organizer"
                >
                  <Phone className="w-4 h-4 font-bold" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pandal Location & Visarjan Route Guide */}
      <div className="festive-card rounded-2xl p-4 shadow-2xl space-y-3 gold-glow-border">
        <div className="flex items-center gap-2 pb-2 border-b border-amber-400/30">
          <Compass className="w-4 h-4 text-yellow-300" />
          <h3 className="text-xs font-extrabold text-yellow-300 uppercase tracking-wider">
            Pandal Venue & Nimajjanam Route
          </h3>
        </div>

        <div className="text-xs space-y-2.5">
          <div className="flex items-start gap-3 text-amber-100 bg-black/60 p-3.5 rounded-2xl border border-amber-400/30">
            <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5 animate-bounce" />
            <div className="space-y-1">
              <p className="font-extrabold text-white text-xs">{FESTIVAL_INFO.clubName} Pandal</p>
              <p className="text-[11px] text-yellow-300 font-bold">{FESTIVAL_INFO.landmark}</p>
              <div className="text-[10px] text-amber-200 grid grid-cols-2 gap-x-2 gap-y-0.5 pt-1 border-t border-amber-400/20 font-semibold">
                <span>Village: <strong className="text-white">Pipri</strong></span>
                <span>Mandal: <strong className="text-white">Armoor</strong></span>
                <span>District: <strong className="text-white">Nizamabad</strong></span>
                <span>State: <strong className="text-white">Telangana</strong></span>
              </div>
            </div>
          </div>

          <div className="bg-black/40 border border-amber-400/20 p-3 rounded-xl text-[11px] text-amber-100">
            <strong className="text-yellow-300 block mb-0.5">Visarjan Yatra Route (Day 9):</strong>
            Beside Gram Panchayathi Office ➔ Pipri Main Bazar Road ➔ Temple Circle ➔ Pipri Lake Immersion.
          </div>
        </div>

        <a
          href={FESTIVAL_INFO.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full btn-festive-primary text-xs py-2.5 rounded-xl shadow-xl flex items-center justify-center gap-1.5 active:scale-95 transition-all"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Open Pipri Pandal in Google Maps</span>
        </a>
      </div>
    </div>
  );
}
