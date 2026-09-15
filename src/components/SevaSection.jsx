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
          <h2 className="text-lg font-black text-[#7c2d12] font-['Cinzel',serif]">
            Seva Offerings & Hundi
          </h2>
          <p className="text-[11px] text-amber-900 font-semibold">
            Contribute to Annadanam & Poojas, receive sacred digital blessings
          </p>
        </div>
      </div>

      {/* Seva Options Cards Grid */}
      <div className="grid grid-cols-1 gap-3">
        {SEVA_TYPES.map((seva) => (
          <div
            key={seva.id}
            className="bg-white rounded-3xl p-4 shadow-md flex items-center justify-between gap-3 border-2 border-amber-200 hover:border-amber-400 hover:shadow-xl transition-all"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl p-2.5 rounded-2xl bg-amber-50 border border-amber-200 shadow-sm">
                {seva.icon}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-black text-[#431407] font-['Cinzel',serif]">
                    {seva.title}
                  </h3>
                  <span className="text-[11px] font-black text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-lg border border-amber-300">
                    {seva.amount}
                  </span>
                </div>
                <p className="text-[10px] text-stone-600 font-medium mt-1 leading-snug">
                  {seva.description}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleOpenSeva(seva)}
              className="btn-festive-primary text-xs px-3.5 py-2 rounded-xl shadow-md whitespace-nowrap active:scale-95 transition-transform"
            >
              Book Seva
            </button>
          </div>
        ))}
      </div>

      {/* Sponsors & Annadatas Honor Roll */}
      <div className="bg-white rounded-3xl p-4.5 shadow-xl border-2 border-amber-300">
        <div className="flex items-center gap-2.5 pb-3 border-b border-amber-200">
          <div className="p-1.5 rounded-xl bg-amber-100 text-amber-800 border border-amber-300">
            <Award className="w-4 h-4 text-amber-700" />
          </div>
          <h3 className="text-sm font-black text-[#7c2d12] font-['Cinzel',serif]">
            Maha Annadata & Sponsor Honors
          </h3>
        </div>

        <div className="divide-y divide-amber-100 mt-2">
          {DONOR_HONORS.map((donor, idx) => (
            <div key={idx} className="py-2.5 flex items-center justify-between text-xs hover:bg-amber-50/50 px-1 rounded-xl transition-colors">
              <div>
                <h4 className="font-extrabold text-[#2b0d06]">{donor.name}</h4>
                <div className="flex items-center gap-2 text-[10px] text-amber-900 font-medium mt-0.5">
                  <span className="text-orange-700 font-bold">{donor.title}</span>
                  <span>•</span>
                  <span>{donor.purpose}</span>
                </div>
              </div>
              <span className="font-mono font-black text-[#7c2d12] bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 shadow-sm">
                {donor.amount}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Seva Booking Modal */}
      {selectedSeva && !showCertificate && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-[#fffbf0] via-white to-[#fff8e7] border-2 border-amber-400 rounded-3xl w-full max-w-sm p-4.5 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setSelectedSeva(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-stone-100 text-stone-600 hover:text-stone-900 border border-stone-200"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center pb-3 border-b border-amber-200">
              <span className="text-3xl">{selectedSeva.icon}</span>
              <h3 className="text-sm font-black text-[#7c2d12] font-['Cinzel',serif] mt-1">
                {selectedSeva.title}
              </h3>
              <p className="text-[11px] text-amber-800 font-semibold">Club Friends Youth, Pipri Pandal</p>
            </div>

            <form onSubmit={handleConfirmDonation} className="space-y-3 mt-3.5">
              <div>
                <label className="text-[10px] text-[#7c2d12] font-black block mb-1">
                  Devotee / Family Head Name *
                </label>
                <input
                  type="text"
                  required
                  value={devoteeName}
                  onChange={(e) => setDevoteeName(e.target.value)}
                  placeholder="e.g. Sri Ramesh & Family"
                  className="w-full bg-white border border-amber-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:border-orange-500 focus:outline-none shadow-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-[#7c2d12] font-black block mb-1">
                    Gothram / Nakshatram
                  </label>
                  <input
                    type="text"
                    value={gothram}
                    onChange={(e) => setGothram(e.target.value)}
                    placeholder="e.g. Shiva, Kashyapa"
                    className="w-full bg-white border border-amber-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:border-orange-500 focus:outline-none shadow-sm"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#7c2d12] font-black block mb-1">
                    Offering Amount (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-xl px-3 py-2 text-xs text-[#7c2d12] font-mono font-black focus:border-orange-500 focus:outline-none shadow-sm"
                  />
                </div>
              </div>

              {/* Digital UPI QR Preview Simulation */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-center justify-between shadow-inner">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl text-white font-bold shadow-md">
                    <QrCode className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#431407]">UPI / Pandal Hundi</p>
                    <p className="text-[10px] text-amber-800">GPay, PhonePe, Paytm</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-black text-[#7c2d12]">
                  ₹ {amount}
                </span>
              </div>

              <button
                type="submit"
                className="w-full btn-festive-primary text-xs py-2.5 rounded-xl shadow-lg flex items-center justify-center gap-1.5 active:scale-95 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
                <span>Confirm & Generate Digital Receipt</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Digital Blessing Receipt Card Modal - Light Sandalwood Style */}
      {showCertificate && receiptData && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-[#fffbf0] via-white to-[#fff8e7] border-3 border-amber-400 rounded-3xl w-full max-w-sm p-5 shadow-2xl relative animate-in fade-in zoom-in-90">
            {/* Traditional Corner Accents */}
            <div className="absolute top-2.5 left-2.5 text-amber-600 text-sm">☸</div>
            <div className="absolute top-2.5 right-2.5 text-amber-600 text-sm">☸</div>
            <div className="absolute bottom-2.5 left-2.5 text-amber-600 text-sm">☸</div>
            <div className="absolute bottom-2.5 right-2.5 text-amber-600 text-sm">☸</div>

            <div className="text-center border-b-2 border-amber-200 pb-3">
              <span className="text-xs font-serif text-[#7c2d12] font-black">॥ శ్రీ గణేశాయ నమః ॥</span>
              <h3 className="text-base font-black text-[#431407] font-['Cinzel',serif] tracking-wider mt-1">
                {FESTIVAL_INFO.clubName}
              </h3>
              <p className="text-[10px] text-amber-800 font-semibold">Pipri Village Ganesh Utsav Official Seva Receipt</p>
            </div>

            <div className="my-4 space-y-2 text-xs bg-amber-50/80 p-4 rounded-2xl border border-amber-200 shadow-inner">
              <div className="flex justify-between">
                <span className="text-stone-600">Receipt No:</span>
                <span className="font-mono font-bold text-[#7c2d12]">{receiptData.receiptNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600">Devotee Name:</span>
                <span className="font-black text-stone-900">{receiptData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600">Gothram:</span>
                <span className="font-semibold text-stone-800">{receiptData.gothram}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600">Seva Category:</span>
                <span className="font-semibold text-stone-800">{receiptData.sevaName}</span>
              </div>
              <div className="flex justify-between border-t border-amber-200 pt-1.5">
                <span className="text-stone-600">Contribution:</span>
                <span className="font-mono font-black text-[#7c2d12] text-sm">₹ {receiptData.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600">Date:</span>
                <span className="text-stone-800 font-medium">{receiptData.date}</span>
              </div>
            </div>

            <div className="text-center text-[10px] text-amber-900 italic mb-4 font-semibold">
              "May Lord Vigneswara shower auspicious health, wisdom and prosperity upon your entire family."
            </div>

            <button
              onClick={closeReceipt}
              className="w-full btn-festive-primary text-xs py-2.5 rounded-xl shadow-lg active:scale-95 transition-transform"
            >
              Close & Receive Blessings 🙏
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
