import React from 'react';
import { useHotel } from '../context/HotelContext';
import { Calendar, Compass, ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  const { setCurrentPage, draftBooking, setDraftBooking } = useHotel();

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative bg-[#F7F8F5] text-[#0D2A22] pt-8 pb-16 overflow-hidden">
      
      {/* Top Split Main Layout (Matching Artistic Flair theme) */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Editorial Content */}
        <div className="lg:col-span-6 space-y-8 py-6">
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.4em] uppercase text-[#C8A96E] font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C8A96E]" />
              <span>Riviera Estate & Sanctuary</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-6xl sm:text-7xl font-serif leading-[1.08] italic text-[#0D2A22]"
            >
              Where Riviera<br />
              <span className="not-italic">Meets Serenity.</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-sm sm:text-base leading-relaxed max-w-lg text-[#0D2A22]/80 font-light"
          >
            An ultra-luxury coastal sanctuary designed for the discerning traveler. Experience unparalleled privacy, bespoke butler service, and architectural brilliance on the edge of the Mediterranean horizon.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap items-center gap-5 pt-2"
          >
            <button
              onClick={() => {
                setCurrentPage('rooms');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="border border-[#0D2A22] px-8 py-3.5 text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-[#0D2A22] hover:text-[#F7F8F5] transition-colors cursor-pointer rounded-sm"
            >
              Explore Suites
            </button>

            <button
              onClick={() => {
                setCurrentPage('booking');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-[#0D2A22] text-[#F7F8F5] px-8 py-3.5 text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-[#C8A96E] hover:text-[#0D2A22] transition-colors cursor-pointer rounded-sm flex items-center gap-2 shadow-sm"
            >
              <span>Book Your Stay</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Right Hero Visual & Featured Callout Card */}
        <div className="lg:col-span-6 relative">
          <div className="relative aspect-[4/3] sm:aspect-[16/11] bg-[#ECEFEA] overflow-hidden shadow-2xl border border-[#0D2A22]/10 rounded-sm">
            <img
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop"
              alt="The Haven Resort"
              className="w-full h-full object-cover img-zoom-hover opacity-95"
            />

            {/* Vertical Scroll Badge */}
            <div className="absolute top-8 right-6 hidden sm:flex flex-col items-center gap-2">
              <div className="h-10 w-[1px] bg-[#0D2A22]" />
              <span className="writing-mode-vertical text-[9px] uppercase tracking-[0.3em] font-bold py-2 text-[#0D2A22]">
                SCROLL FOR SENSES
              </span>
            </div>
          </div>

          {/* Featured Callout Card Overlapping */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative lg:absolute -bottom-8 lg:-bottom-8 lg:-left-10 bg-white p-6 sm:p-8 shadow-xl max-w-sm border-l-4 border-[#C8A96E] mt-6 lg:mt-0 z-20"
          >
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#C8A96E] font-bold mb-1">
              Featured Sanctuary Ritual
            </div>
            <div className="font-serif text-2xl italic text-[#0D2A22] mb-2">
              Moonlight Spa & Thermal Baths
            </div>
            <p className="text-xs text-[#0D2A22]/70 leading-relaxed font-light">
              A nocturnal wellness journey under Mediterranean stars, featuring organic lavender oils and ancient mineral soundscapes.
            </p>
          </motion.div>
        </div>

      </div>

      {/* Quick Reservation Search Section at Bottom */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-16 sm:mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white border border-[#0D2A22]/10 p-6 sm:p-8 shadow-lg"
        >
          <form
            onSubmit={handleQuickSearch}
            className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 flex-1">
              
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-[0.25em] text-[#0D2A22]/60 font-bold block">
                  Check-in
                </label>
                <input
                  type="date"
                  value={draftBooking.checkInDate}
                  onChange={(e) =>
                    setDraftBooking((prev) => ({ ...prev, checkInDate: e.target.value }))
                  }
                  className="text-xs font-serif font-bold italic text-[#0D2A22] bg-transparent focus:outline-none w-full cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-[0.25em] text-[#0D2A22]/60 font-bold block">
                  Check-out
                </label>
                <input
                  type="date"
                  value={draftBooking.checkOutDate}
                  onChange={(e) =>
                    setDraftBooking((prev) => ({ ...prev, checkOutDate: e.target.value }))
                  }
                  className="text-xs font-serif font-bold italic text-[#0D2A22] bg-transparent focus:outline-none w-full cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-[0.25em] text-[#0D2A22]/60 font-bold block">
                  Guests
                </label>
                <select
                  value={draftBooking.adults}
                  onChange={(e) =>
                    setDraftBooking((prev) => ({ ...prev, adults: parseInt(e.target.value) }))
                  }
                  className="text-xs font-serif font-bold italic text-[#0D2A22] bg-transparent focus:outline-none w-full cursor-pointer"
                >
                  <option value={1}>01 Guest</option>
                  <option value={2}>02 Guests</option>
                  <option value={3}>03 Guests</option>
                  <option value={4}>04 Guests</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-[0.25em] text-[#0D2A22]/60 font-bold block">
                  Sanctuary Rate
                </label>
                <div className="text-xs font-serif italic text-[#0D2A22] font-bold">
                  From <span className="text-sm font-semibold">$1,250</span> / NIGHT
                </div>
              </div>

            </div>

            <div className="pt-2 lg:pt-0">
              <button
                type="submit"
                className="w-full lg:w-auto bg-[#0D2A22] text-[#F7F8F5] px-10 py-4 text-[11px] uppercase tracking-[0.25em] font-bold hover:bg-[#C8A96E] hover:text-[#0D2A22] transition-colors rounded-sm cursor-pointer"
              >
                Check Availability
              </button>
            </div>

          </form>
        </motion.div>
      </div>

    </section>
  );
};

