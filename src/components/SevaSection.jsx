import React, { useState } from 'react';
import { Gift, QrCode, Award, CheckCircle, Sparkles, Heart, Download, ShieldCheck, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DONOR_HONORS, FESTIVAL_INFO } from '../data/festivalData';
import { devotionalAudio } from '../utils/audio';

export default function SevaSection() {
  const [selectedSeva, setSelectedSeva] = useState(null);
  const [devoteeName, setDevoteeName] = useState('');
  const [gothram, setGothram] = useState('');
  const [amount, setAmount] = useState('501');
  const [showCertificate, setShowCertificate] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  const SEVA_TYPES = [
    {
      id: 'archana',
      title: 'Nitya Archana & Sankalpam',
      amount: '₹ 251',
      description: 'Special named family sankalpam, flower archana & prasadam.',
      icon: '🌺'
    },
    {
      id: 'annadanam',
      title: '20/09/2026 Maha Annadanam Seva',
      amount: '₹ 1,116',
      description: 'Feed village devotees in your family’s auspicious name on Sunday.',
      icon: '🍲'
    },
    {
      id: 'pushpam',
      title: 'Grand Flower Garland Seva',
      amount: '₹ 501',
      description: 'Fresh rose and marigold Pushpa Uyyala garland decoration.',
      icon: '🌸'
    },
    {
      id: 'deepam',
      title: '108 Akhanda Deeparadhana',
      amount: '₹ 516',
      description: 'Special cow ghee lamp lighting for removal of all obstacles.',
      icon: '🪔'
    },
    {
      id: 'laddu',
      title: '21-Kg Laddu Auction Entry',
      amount: '₹ 1,000 (Reg)',
      description: 'Register bidder token for grand auspicious laddu auction.',
      icon: '🟡'
    }
  ];

  const handleOpenSeva = (seva) => {
    setSelectedSeva(seva);
    const num = seva.amount.replace(/[^0-9]/g, '');
    setAmount(num || '501');
  };

  const handleConfirmDonation = (e) => {
    e.preventDefault();
    if (!devoteeName.trim()) return;

    devotionalAudio.playFlowerChime();
    confetti({
      particleCount: 90,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FF9800', '#F44336', '#4CAF50']
    });

    const receipt = {
      receiptNo: `CFY-${Math.floor(100000 + Math.random() * 900000)}`,
      name: devoteeName.trim(),
      gothram: gothram.trim() || 'Kashyapa',
      sevaName: selectedSeva.title,
      amount: amount,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      pandal: `${FESTIVAL_INFO.landmark}, ${FESTIVAL_INFO.village}`
    };

    setReceiptData(receipt);
    setShowCertificate(true);
  };

  const closeReceipt = () => {
    setShowCertificate(false);
    setSelectedSeva(null);
    setDevoteeName('');
    setGothram('');
  };

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-100 font-['Cinzel',serif]">
            Seva Offerings & Hundi
          </h2>
          <p className="text-[11px] text-amber-200 font-medium">
            Contribute to Annadanam & Poojas, receive sacred digital blessings
          </p>
        </div>
      </div>

      {/* Seva Options Cards Grid */}
      <div className="grid grid-cols-1 gap-3">
        {SEVA_TYPES.map((seva) => (
          <div
            key={seva.id}
            className="festive-card rounded-2xl p-4 shadow-xl flex items-center justify-between gap-3 border-2 border-amber-400/40 hover:border-yellow-300 transition-all"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl p-2.5 rounded-2xl bg-gradient-to-br from-amber-500/20 to-red-500/20 border border-yellow-300/40 shadow-md">
                {seva.icon}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-extrabold text-amber-100 font-['Cinzel',serif]">
                    {seva.title}
                  </h3>
                  <span className="text-[11px] font-extrabold text-stone-950 bg-gradient-to-r from-yellow-300 to-amber-400 px-2 py-0.5 rounded-lg shadow-sm border border-white">
                    {seva.amount}
                  </span>
                </div>
                <p className="text-[10px] text-amber-200/90 font-medium mt-1 leading-snug">
                  {seva.description}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleOpenSeva(seva)}
              className="btn-festive-primary text-xs px-3.5 py-2 rounded-xl shadow-lg whitespace-nowrap active:scale-95 transition-transform"
            >
              Book Seva
            </button>
          </div>
        ))}
      </div>

      {/* Sponsors & Annadatas Honor Roll */}
      <div className="festive-card rounded-2xl p-4 shadow-2xl gold-glow-border">
        <div className="flex items-center gap-2.5 pb-3 border-b border-amber-400/30">
          <div className="p-1.5 rounded-lg bg-yellow-400/20 text-yellow-300 border border-yellow-400/40">
            <Award className="w-4 h-4 text-yellow-300" />
          </div>
          <h3 className="text-sm font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-amber-400 font-['Cinzel',serif]">
            Maha Annadata & Sponsor Honors
          </h3>
        </div>

        <div className="divide-y divide-amber-400/15 mt-2">
          {DONOR_HONORS.map((donor, idx) => (
            <div key={idx} className="py-2.5 flex items-center justify-between text-xs hover:bg-black/20 px-1 rounded-lg transition-colors">
              <div>
                <h4 className="font-extrabold text-white">{donor.name}</h4>
                <div className="flex items-center gap-2 text-[10px] text-amber-200 font-medium mt-0.5">
                  <span className="text-yellow-400 font-bold">{donor.title}</span>
                  <span>•</span>
                  <span>{donor.purpose}</span>
                </div>
              </div>
              <span className="font-mono font-extrabold text-yellow-300 bg-gradient-to-r from-black/80 to-amber-950 px-2.5 py-1 rounded-lg border border-yellow-400/40 shadow-sm">
                {donor.amount}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Seva Booking Modal */}
      {selectedSeva && !showCertificate && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-[#2e0e0a] via-[#1e0705] to-[#280a07] border-2 border-yellow-300 rounded-3xl w-full max-w-sm p-4.5 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setSelectedSeva(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-yellow-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center pb-3 border-b border-amber-400/30">
              <span className="text-3xl">{selectedSeva.icon}</span>
              <h3 className="text-sm font-extrabold text-yellow-200 font-['Cinzel',serif] mt-1">
                {selectedSeva.title}
              </h3>
              <p className="text-[11px] text-amber-200">Club Friends Youth, Pipri Pandal</p>
            </div>

            <form onSubmit={handleConfirmDonation} className="space-y-3 mt-3.5">
              <div>
                <label className="text-[10px] text-yellow-300 font-bold block mb-1">
                  Devotee / Family Head Name *
                </label>
                <input
                  type="text"
                  required
                  value={devoteeName}
                  onChange={(e) => setDevoteeName(e.target.value)}
                  placeholder="e.g. Sri Ramesh & Family"
                  className="w-full bg-black/60 border border-amber-400/50 rounded-xl px-3 py-2 text-xs text-amber-100 focus:border-yellow-300 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-yellow-300 font-bold block mb-1">
                    Gothram / Nakshatram
                  </label>
                  <input
                    type="text"
                    value={gothram}
                    onChange={(e) => setGothram(e.target.value)}
                    placeholder="e.g. Shiva, Kashyapa"
                    className="w-full bg-black/60 border border-amber-400/50 rounded-xl px-3 py-2 text-xs text-amber-100 focus:border-yellow-300 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-yellow-300 font-bold block mb-1">
                    Offering Amount (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-black/60 border border-amber-400/50 rounded-xl px-3 py-2 text-xs text-yellow-300 font-mono font-bold focus:border-yellow-300 focus:outline-none"
                  />
                </div>
              </div>

              {/* Digital UPI QR Preview Simulation */}
              <div className="bg-black/50 border border-amber-400/30 rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg text-stone-950 font-bold shadow-md">
                    <QrCode className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-amber-100">UPI / Pandal Hundi</p>
                    <p className="text-[10px] text-amber-300/80">GPay, PhonePe, Paytm</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-extrabold text-yellow-300">
                  ₹ {amount}
                </span>
              </div>

              <button
                type="submit"
                className="w-full btn-festive-primary text-xs py-2.5 rounded-xl shadow-xl flex items-center justify-center gap-1.5 active:scale-95 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
                <span>Confirm & Generate Digital Receipt</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Digital Blessing Receipt Card Modal */}
      {showCertificate && receiptData && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-[#320f0b] via-[#200806] to-[#320f0b] border-2 border-yellow-300 rounded-3xl w-full max-w-sm p-5 shadow-2xl relative animate-in fade-in zoom-in-90">
            {/* Traditional Corner Accents */}
            <div className="absolute top-2.5 left-2.5 text-yellow-300 text-sm">☸</div>
            <div className="absolute top-2.5 right-2.5 text-yellow-300 text-sm">☸</div>
            <div className="absolute bottom-2.5 left-2.5 text-yellow-300 text-sm">☸</div>
            <div className="absolute bottom-2.5 right-2.5 text-yellow-300 text-sm">☸</div>

            <div className="text-center border-b-2 border-amber-400/40 pb-3">
              <span className="text-xs font-serif text-yellow-300 font-extrabold">॥ శ్రీ గణేశాయ నమః ॥</span>
              <h3 className="text-base font-extrabold text-white font-['Cinzel',serif] tracking-wider mt-1">
                {FESTIVAL_INFO.clubName}
              </h3>
              <p className="text-[10px] text-amber-200">Pipri Village Ganesh Utsav Official Seva Receipt</p>
            </div>

            <div className="my-4 space-y-2 text-xs bg-black/60 p-3.5 rounded-2xl border border-amber-400/30">
              <div className="flex justify-between">
                <span className="text-amber-200">Receipt No:</span>
                <span className="font-mono font-bold text-yellow-300">{receiptData.receiptNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-200">Devotee Name:</span>
                <span className="font-extrabold text-white">{receiptData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-200">Gothram:</span>
                <span className="font-semibold text-amber-100">{receiptData.gothram}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-200">Seva Category:</span>
                <span className="font-semibold text-amber-100">{receiptData.sevaName}</span>
              </div>
              <div className="flex justify-between border-t border-amber-400/30 pt-1.5">
                <span className="text-amber-200">Contribution:</span>
                <span className="font-mono font-extrabold text-yellow-300 text-sm">₹ {receiptData.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-200">Date:</span>
                <span className="text-amber-100">{receiptData.date}</span>
              </div>
            </div>

            <div className="text-center text-[10px] text-yellow-200 italic mb-4 font-medium">
              "May Lord Vigneswara shower auspicious health, wisdom and prosperity upon your entire family."
            </div>

            <button
              onClick={closeReceipt}
              className="w-full btn-festive-primary text-xs py-2.5 rounded-xl shadow-xl active:scale-95 transition-transform"
            >
              Close & Receive Blessings 🙏
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
