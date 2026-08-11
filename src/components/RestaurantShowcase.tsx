import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { Award, Clock, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TableReservation } from '../types';

export const RestaurantShowcase: React.FC = () => {
  const { diningItems, setCurrentPage, addTableReservation } = useHotel();
  const [activeCategory, setActiveCategory] = useState<'all' | 'tasting' | 'alacarte' | 'bar'>('all');
  
  // Table reservation modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resName, setResName] = useState('');
  const [resEmail, setResEmail] = useState('');
  const [resPhone, setResPhone] = useState('');
  const [resDate, setResDate] = useState('2026-08-12');
  const [resTime, setResTime] = useState('19:30');
  const [resGuests, setResGuests] = useState(2);
  const [resVenue, setResVenue] = useState("L'Étoile Fine Dining (3 Michelin Stars)");
  const [resSeating, setResSeating] = useState<'indoor' | 'terrace' | 'chef-table'>('terrace');

  const filteredItems = activeCategory === 'all'
    ? diningItems
    : diningItems.filter((item) => item.category === activeCategory);

  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReservation: TableReservation = {
      id: `res-${Date.now()}`,
      guestName: resName,
      guestEmail: resEmail,
      guestPhone: resPhone,
      venue: resVenue,
      date: resDate,
      time: resTime,
      guestsCount: resGuests,
      seatingPreference: resSeating,
      status: 'confirmed'
    };
    addTableReservation(newReservation);
    setIsModalOpen(false);
    setResName('');
    setResEmail('');
  };

  return (
    <section className="py-24 bg-[#0D2A22] text-[#F7F8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Top Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] uppercase tracking-[0.4em] text-[#C8A96E] font-sans font-bold">
              Culinary Artistry
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-light italic text-[#F7F8F5] leading-tight">
              L'Étoile & The Sunken Garden
            </h2>
            <p className="text-xs sm:text-sm font-sans text-[#F7F8F5]/80 leading-relaxed font-light">
              Led by 3 Michelin-Star Executive Chef Jean-Luc Laurent, L’Étoile elevates hyper-local Mediterranean ingredients into transcendent sensory journeys. Each dish is an ode to Sorrento lemon groves, wild sea waters, and age-old regional traditions.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-[11px] font-sans text-[#C8A96E] pt-2 uppercase tracking-widest font-semibold">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#C8A96E]" />
                <span>3 Michelin Stars 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C8A96E]" />
                <span>Dinner: 18:30 – 23:00</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 bg-[#C8A96E] hover:bg-[#F7F8F5] text-[#0D2A22] text-[10px] font-sans uppercase tracking-[0.25em] font-bold rounded-sm transition-colors cursor-pointer shadow-lg"
              >
                Reserve a Dining Table
              </button>
              
              <button
                onClick={() => {
                  setCurrentPage('dining');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-4 border border-[#C8A96E]/40 text-[#F7F8F5] hover:border-[#C8A96E] text-[10px] font-sans uppercase tracking-[0.25em] font-semibold rounded-sm transition-colors cursor-pointer"
              >
                Explore Full Menus
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] rounded-sm overflow-hidden border border-[#B5A264]/30 shadow-2xl relative img-zoom-container">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=85&w=1200"
                alt="L'Étoile Fine Dining"
                className="w-full h-full object-cover img-zoom-hover brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-5 bg-[#1A1A1A]/90 backdrop-blur-md rounded-sm border border-[#B5A264]/30">
                <p className="font-serif italic text-sm sm:text-base text-[#F5F2ED]">
                  "Cooking is not merely technique; it is a sacred translation of nature's memory into emotion."
                </p>
                <span className="block text-[9px] font-sans uppercase tracking-[0.25em] text-[#B5A264] mt-2 font-semibold">
                  — Chef Jean-Luc Laurent
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Menu Highlights Showcase */}
        <div className="bg-[#262626] p-8 sm:p-12 border border-[#B5A264]/20 rounded-sm space-y-8">
          
          <div className="flex flex-col sm:flex-row items-center justify-between border-b border-[#F5F2ED]/10 pb-6 gap-4">
            <h3 className="font-serif text-2xl text-[#F5F2ED] italic">
              Chef's Curated Selection
            </h3>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 text-xs font-sans">
              {(['all', 'tasting', 'alacarte', 'bar'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-sm text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#B5A264] text-[#1A1A1A] font-bold'
                      : 'bg-[#1A1A1A] text-[#F5F2ED]/70 hover:text-[#F5F2ED] border border-[#B5A264]/20'
                  }`}
                >
                  {cat === 'all' ? 'All Highlights' : cat === 'tasting' ? 'Tasting' : cat === 'alacarte' ? 'À La Carte' : 'Botanical Bar'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 p-5 bg-[#1A1A1A] rounded-sm border border-[#B5A264]/20 hover:border-[#B5A264]/60 transition-colors"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-sm object-cover shrink-0 border border-[#B5A264]/30"
                  />
                )}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-lg text-[#F5F2ED] italic">
                      {item.name}
                    </h4>
                    <span className="text-sm font-sans font-bold text-[#B5A264]">
                      ${item.price}
                    </span>
                  </div>
                  <p className="text-xs font-sans text-[#F5F2ED]/70 font-light leading-relaxed">
                    {item.description}
                  </p>
                  {item.tags && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.tags.map((t, idx) => (
                        <span key={idx} className="text-[9px] font-sans uppercase tracking-widest text-[#B5A264] bg-[#262626] px-2 py-0.5 rounded-sm border border-[#B5A264]/20">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Table Reservation Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1A1A1A] text-[#F5F2ED] border border-[#B5A264]/40 p-8 rounded-sm max-w-xl w-full shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-[#B5A264]/20 pb-4">
                <div>
                  <h3 className="font-serif text-2xl italic tracking-wide text-[#F5F2ED]">
                    Reserve a Dining Table
                  </h3>
                  <p className="text-[10px] font-sans text-[#B5A264] uppercase tracking-[0.25em] font-semibold mt-0.5">
                    L'Étoile & The Sunken Garden
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-[#F5F2ED]/70 hover:text-[#F5F2ED] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleReserveSubmit} className="space-y-4 text-xs font-sans">
                <div>
                  <label className="block text-[#B5A264] uppercase tracking-[0.2em] text-[10px] mb-1 font-bold">
                    Select Venue
                  </label>
                  <select
                    value={resVenue}
                    onChange={(e) => setResVenue(e.target.value)}
                    className="w-full bg-[#262626] border border-[#B5A264]/30 rounded-sm px-4 py-3 text-[#F5F2ED] focus:outline-none"
                  >
                    <option value="L'Étoile Fine Dining (3 Michelin Stars)">
                      L'Étoile Fine Dining (3 Michelin Stars)
                    </option>
                    <option value="The Sunken Garden Sunset Bar">
                      The Sunken Garden Sunset Bar
                    </option>
                    <option value="The Garden Tea Salon">
                      The Garden Tea Salon
                    </option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#B5A264] uppercase tracking-[0.2em] text-[10px] mb-1 font-bold">
                      Guest Name
                    </label>
                    <input
                      type="text"
                      required
                      value={resName}
                      onChange={(e) => setResName(e.target.value)}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full bg-[#262626] border border-[#B5A264]/30 rounded-sm px-4 py-3 text-[#F5F2ED] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#B5A264] uppercase tracking-[0.2em] text-[10px] mb-1 font-bold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={resEmail}
                      onChange={(e) => setResEmail(e.target.value)}
                      placeholder="e.g. eleanor@luxury.com"
                      className="w-full bg-[#262626] border border-[#B5A264]/30 rounded-sm px-4 py-3 text-[#F5F2ED] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[#B5A264] uppercase tracking-[0.2em] text-[10px] mb-1 font-bold">
                      Date
                    </label>
                    <input
                      type="date"
                      value={resDate}
                      onChange={(e) => setResDate(e.target.value)}
                      className="w-full bg-[#262626] border border-[#B5A264]/30 rounded-sm px-3 py-3 text-[#F5F2ED] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#B5A264] uppercase tracking-[0.2em] text-[10px] mb-1 font-bold">
                      Time
                    </label>
                    <select
                      value={resTime}
                      onChange={(e) => setResTime(e.target.value)}
                      className="w-full bg-[#262626] border border-[#B5A264]/30 rounded-sm px-3 py-3 text-[#F5F2ED] focus:outline-none"
                    >
                      <option value="18:30">18:30</option>
                      <option value="19:30">19:30</option>
                      <option value="20:30">20:30</option>
                      <option value="21:30">21:30</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#B5A264] uppercase tracking-[0.2em] text-[10px] mb-1 font-bold">
                      Party Size
                    </label>
                    <select
                      value={resGuests}
                      onChange={(e) => setResGuests(parseInt(e.target.value))}
                      className="w-full bg-[#262626] border border-[#B5A264]/30 rounded-sm px-3 py-3 text-[#F5F2ED] focus:outline-none"
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests</option>
                      <option value={4}>4 Guests</option>
                      <option value={6}>6 Guests (Private Room)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#B5A264] uppercase tracking-[0.2em] text-[10px] mb-1 font-bold">
                    Seating Area
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'terrace', label: 'Cliff Terrace' },
                      { id: 'indoor', label: 'Glass Pavilion' },
                      { id: 'chef-table', label: "Chef's Table" },
                    ].map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setResSeating(s.id as any)}
                        className={`py-2 px-3 rounded-sm text-center text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
                          resSeating === s.id
                            ? 'bg-[#B5A264] text-[#1A1A1A] font-bold border border-[#B5A264]'
                            : 'bg-[#262626] text-[#F5F2ED]/70 border border-[#B5A264]/20'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3.5 border border-[#B5A264]/30 rounded-sm text-[10px] uppercase tracking-[0.2em] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3.5 bg-[#B5A264] text-[#1A1A1A] font-bold rounded-sm text-[10px] uppercase tracking-[0.2em] hover:bg-[#F5F2ED] cursor-pointer transition-colors"
                  >
                    Confirm Table Reservation
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

