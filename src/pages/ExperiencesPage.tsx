import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { Clock, Check, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ExperiencesPage: React.FC = () => {
  const { experiences, showToast } = useHotel();
  const [selectedExpId, setSelectedExpId] = useState(experiences[0].id);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [expDate, setExpDate] = useState('2026-08-18');
  const [guestCount, setGuestCount] = useState(2);

  const activeExp = experiences.find((e) => e.id === selectedExpId) || experiences[0];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Bespoke inquiry submitted for "${activeExp.title}". Our Head Butler will reach out momentarily.`);
    setIsInquiryOpen(false);
    setGuestName('');
  };

  return (
    <div className="py-24 bg-[#F5F2ED] text-[#1A1A1A] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] uppercase tracking-[0.4em] text-[#B5A264] font-sans font-semibold">
            Unforgettable Journeys
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl font-light italic text-[#1A1A1A]">
            Curated Experiences
          </h1>
          <p className="text-xs sm:text-sm font-sans text-[#1A1A1A]/75 leading-relaxed font-light">
            Custom-crafted private adventures designed to connect you with the soul of the Mediterranean — from helicopter flights over ancient volcanic vineyards to private yacht charters into turquoise caves.
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="space-y-16">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-white border border-[#1A1A1A]/10 rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 gap-0"
            >
              <div className="lg:col-span-7 relative min-h-[320px] lg:min-h-[420px] bg-neutral-900 overflow-hidden img-zoom-container">
                <img src={exp.image} alt={exp.title} className="w-full h-full object-cover img-zoom-hover filter brightness-95" />
                <div className="absolute top-6 left-6 bg-[#1A1A1A]/90 backdrop-blur-md text-[#F5F2ED] text-[9px] uppercase tracking-[0.3em] font-sans px-4 py-2 rounded-sm border border-white/20 font-semibold">
                  {exp.category}
                </div>
              </div>

              <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between border-b border-[#1A1A1A]/10 pb-4">
                    <div>
                      <h2 className="font-serif text-3xl italic text-[#1A1A1A]">
                        {exp.title}
                      </h2>
                      <p className="text-xs font-sans text-[#B5A264] mt-1 flex items-center gap-1.5 font-medium">
                        <Clock className="w-3.5 h-3.5 text-[#B5A264]" />
                        <span>{exp.duration}</span>
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-serif text-2xl font-normal text-[#1A1A1A]">
                        ${exp.pricePerPerson.toLocaleString()}
                      </span>
                      <span className="block text-[9px] font-sans text-[#B5A264] uppercase tracking-[0.2em] font-semibold">
                        per person
                      </span>
                    </div>
                  </div>

                  <p className="text-xs font-sans text-[#1A1A1A]/75 leading-relaxed font-light">
                    {exp.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-[#1A1A1A]/10">
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#B5A264] font-bold block">
                      Curated Inclusions
                    </span>
                    <ul className="grid grid-cols-1 gap-1.5 text-xs font-sans text-[#1A1A1A]/80 font-light">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#B5A264] shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedExpId(exp.id);
                    setIsInquiryOpen(true);
                  }}
                  className="w-full py-4 bg-[#1A1A1A] hover:bg-[#B5A264] text-[#F5F2ED] hover:text-[#1A1A1A] text-[10px] font-sans uppercase tracking-[0.2em] font-bold rounded-sm transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Inquire & Reserve Experience</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Inquiry Modal */}
      <AnimatePresence>
        {isInquiryOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#F5F2ED] text-[#1A1A1A] border border-[#1A1A1A]/20 p-8 rounded-sm max-w-xl w-full shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-4">
                <div>
                  <h3 className="font-serif text-2xl italic text-[#1A1A1A]">
                    Bespoke Experience Inquiry
                  </h3>
                  <p className="text-[10px] font-sans text-[#B5A264] uppercase tracking-[0.25em] font-bold mt-0.5">
                    {activeExp.title}
                  </p>
                </div>
                <button
                  onClick={() => setIsInquiryOpen(false)}
                  className="p-2 text-[#1A1A1A]/70 hover:text-[#1A1A1A] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#B5A264] uppercase tracking-[0.2em] text-[10px] mb-1 font-bold">
                      Guest Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g. Lord Vance"
                      className="w-full bg-white border border-[#1A1A1A]/10 rounded-sm px-4 py-3 text-[#1A1A1A] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#B5A264] uppercase tracking-[0.2em] text-[10px] mb-1 font-bold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="e.g. vance@estate.com"
                      className="w-full bg-white border border-[#1A1A1A]/10 rounded-sm px-4 py-3 text-[#1A1A1A] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#B5A264] uppercase tracking-[0.2em] text-[10px] mb-1 font-bold">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={expDate}
                      onChange={(e) => setExpDate(e.target.value)}
                      className="w-full bg-white border border-[#1A1A1A]/10 rounded-sm px-3 py-3 text-[#1A1A1A] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#B5A264] uppercase tracking-[0.2em] text-[10px] mb-1 font-bold">
                      Guests Count
                    </label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(parseInt(e.target.value))}
                      className="w-full bg-white border border-[#1A1A1A]/10 rounded-sm px-3 py-3 text-[#1A1A1A] focus:outline-none"
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests</option>
                      <option value={4}>4 Guests</option>
                      <option value={6}>6 Guests (Private Charter)</option>
                    </select>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-sm border border-[#1A1A1A]/10 flex items-center justify-between">
                  <span className="text-xs text-[#B5A264] font-medium">Estimated Experience Price</span>
                  <span className="text-base font-serif font-semibold italic text-[#1A1A1A]">
                    ${(activeExp.pricePerPerson * guestCount).toLocaleString()} USD
                  </span>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsInquiryOpen(false)}
                    className="flex-1 py-3.5 border border-[#1A1A1A]/20 rounded-sm text-[10px] uppercase tracking-[0.2em] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3.5 bg-[#1A1A1A] text-[#F5F2ED] font-bold rounded-sm text-[10px] uppercase tracking-[0.2em] hover:bg-[#B5A264] hover:text-[#1A1A1A] transition-colors cursor-pointer"
                  >
                    Send Private Inquiry
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

