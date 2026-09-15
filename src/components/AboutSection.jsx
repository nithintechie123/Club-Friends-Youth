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
        <h2 className="text-lg font-black text-[#7c2d12] font-['Cinzel',serif]">
          About {FESTIVAL_INFO.clubName}
        </h2>
        <p className="text-[11px] text-amber-900 font-semibold">
          Dedicated village youth uniting Pipri through devotion, seva & friendship
        </p>
      </div>

      {/* Story & Mission Card */}
      <div className="bg-white rounded-3xl p-4.5 shadow-xl border-2 border-amber-300 space-y-3">
        <div className="flex items-center gap-2 pb-2.5 border-b border-amber-200">
          <Shield className="w-4 h-4 text-orange-600" />
          <h3 className="text-xs font-black text-[#7c2d12] uppercase tracking-wider">
            Our Village Tradition & Spirit
          </h3>
        </div>

        <p className="text-xs text-[#2b0d06] leading-relaxed font-medium">
          Established by the youth of Pipri village, <strong>Club Friends Youth</strong> organizes the grand annual Ganesh Mahotsav with sacred traditions, Sunday Maha Annadanam feasts (20/09/2026), cultural talent platforms, and an unforgettable Visarjan procession.
        </p>

        <div className="grid grid-cols-3 gap-2.5 pt-1 text-center">
          <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-2xl shadow-sm">
            <span className="text-base font-black text-[#7c2d12] font-mono">10+</span>
            <p className="text-[9px] text-amber-900 font-extrabold uppercase mt-0.5">Years Utsav</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-2xl shadow-sm">
            <span className="text-base font-black text-[#7c2d12] font-mono">5000+</span>
            <p className="text-[9px] text-amber-900 font-extrabold uppercase mt-0.5">Devotees Fed</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-2xl shadow-sm">
            <span className="text-base font-black text-[#7c2d12] font-mono">45+</span>
            <p className="text-[9px] text-amber-900 font-extrabold uppercase mt-0.5">Volunteers</p>
          </div>
        </div>
      </div>

      {/* Committee Organizers Directory */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-orange-600" />
          <h3 className="text-xs font-black text-[#7c2d12] uppercase tracking-wider">
            Youth Committee Leads & Contacts
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {COMMITTEE_MEMBERS.map((member, idx) => (
            <div
              key={idx}
              className="bg-white border-2 border-amber-200 hover:border-amber-400 rounded-3xl p-3.5 shadow-md flex items-center justify-between gap-2.5 transition-all"
            >
              <div className="flex items-center gap-3">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-amber-400 shadow-sm"
                />
                <div>
                  <h4 className="text-xs font-black text-[#431407] font-['Cinzel',serif]">
                    {member.name}
                  </h4>
                  <p className="text-[10px] text-orange-700 font-bold">{member.role}</p>
                  <p className="text-[9px] text-stone-500 font-medium">{member.experience}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleWhatsApp(member)}
                  className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm active:scale-90 transition-transform"
                  title="Chat on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleCall(member.phone)}
                  className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-sm hover:from-amber-600 active:scale-90 transition-transform"
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
      <div className="bg-white rounded-3xl p-4.5 shadow-xl border-2 border-amber-300 space-y-3">
        <div className="flex items-center gap-2 pb-2.5 border-b border-amber-200">
          <Compass className="w-4 h-4 text-orange-600" />
          <h3 className="text-xs font-black text-[#7c2d12] uppercase tracking-wider">
            Pandal Venue & Nimajjanam Route
          </h3>
        </div>

        <div className="text-xs space-y-2.5">
          <div className="flex items-start gap-3 bg-gradient-to-r from-amber-50 to-orange-50 p-3.5 rounded-2xl border border-amber-200">
            <MapPin className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5 animate-bounce" />
            <div className="space-y-1">
              <p className="font-black text-[#7c2d12] text-xs">{FESTIVAL_INFO.clubName} Pandal</p>
              <p className="text-[11px] text-[#431407] font-bold">{FESTIVAL_INFO.landmark}</p>
              <div className="text-[10px] text-amber-900 grid grid-cols-2 gap-x-2 gap-y-0.5 pt-1 border-t border-amber-200 font-semibold">
                <span>Village: <strong className="text-orange-700">Pipri</strong></span>
                <span>Mandal: <strong className="text-orange-700">Armoor</strong></span>
                <span>District: <strong className="text-orange-700">Nizamabad</strong></span>
                <span>State: <strong className="text-orange-700">Telangana</strong></span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50/70 border border-amber-200 p-3 rounded-2xl text-[11px] text-[#2b0d06]">
            <strong className="text-orange-800 block mb-0.5">Visarjan Yatra Route (Day 9):</strong>
            Beside Gram Panchayathi Office ➔ Pipri Main Bazar Road ➔ Temple Circle ➔ Pipri Lake Immersion.
          </div>
        </div>

        <a
          href={FESTIVAL_INFO.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full btn-festive-primary text-xs py-2.5 rounded-xl shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Open Pipri Pandal in Google Maps</span>
        </a>
      </div>
    </div>
  );
}
