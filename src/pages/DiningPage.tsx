import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { Award, Clock, Utensils, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TableReservation } from '../types';

export const DiningPage: React.FC = () => {
  const { diningItems, addTableReservation } = useHotel();
  const [activeVenue, setActiveVenue] = useState<'etoile' | 'sunken' | 'tea'>('etoile');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Reservation form
  const [resName, setResName] = useState('');
  const [resEmail, setResEmail] = useState('');
  const [resPhone, setResPhone] = useState('');
  const [resDate, setResDate] = useState('2026-08-16');
  const [resTime, setResTime] = useState('20:00');
  const [resGuests, setResGuests] = useState(2);
  const [resSeating, setResSeating] = useState<'indoor' | 'terrace' | 'chef-table'>('terrace');

  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReservation: TableReservation = {
      id: `res-${Date.now()}`,
      guestName: resName,
      guestEmail: resEmail,
      guestPhone: resPhone,
      venue: activeVenue === 'etoile' ? "L'Étoile Fine Dining (3 Michelin Stars)" : activeVenue === 'sunken' ? 'The Sunken Garden Sunset Bar' : 'The Garden Tea Salon',
      date: resDate,
      time: resTime,
      guestsCount: resGuests,
      seatingPreference: resSeating,
      status: 'confirmed'
    };
    addTableReservation(newReservation);
    setIsModalOpen(false);
    setResName('');
  };

  return (
    <div className="py-24 bg-[#F5F2ED] text-[#1A1A1A] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] uppercase tracking-[0.4em] text-[#B5A264] font-sans font-semibold">
            Michelin Culinary Excellence
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl font-light italic text-[#1A1A1A]">
            Dining at The Haven
          </h1>
          <p className="text-xs sm:text-sm font-sans text-[#1A1A1A]/75 leading-relaxed font-light">
            Under the guidance of 3 Michelin-Star Executive Chef Jean-Luc Laurent, our culinary venues merge organic coastal foraging, rare vintage wine reserves, and unforgettable Mediterranean sunset views.
          </p>

          {/* Venue Toggle Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-6 text-xs font-sans">
            {[
              { id: 'etoile', label: "L'Étoile (3 Michelin Stars)" },
              { id: 'sunken', label: 'The Sunken Garden Sunset Bar' },
              { id: 'tea', label: 'The Garden Tea Pavilion' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveVenue(tab.id as any)}
                className={`px-6 py-3 rounded-sm uppercase tracking-[0.2em] text-[10px] transition-all cursor-pointer ${
                  activeVenue === tab.id
                    ? 'bg-[#1A1A1A] text-[#F5F2ED] font-bold shadow-md'
                    : 'bg-white text-[#1A1A1A]/80 hover:text-[#1A1A1A] border border-[#1A1A1A]/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Venue Showcase Hero */}
        <div className="bg-[#1A1A1A] text-[#F5F2ED] rounded-sm p-8 lg:p-12 border border-[#B5A264]/30 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#B5A264] font-semibold flex items-center gap-2">
              <Award className="w-4 h-4 text-[#B5A264]" />
              {activeVenue === 'etoile' ? '3 Michelin Stars • Grand Award of Excellence' : activeVenue === 'sunken' ? 'Artisanal Botanical Elixirs & Raw Bar' : 'Traditional High Tea & Organic Breakfast'}
            </span>

            <h2 className="font-serif text-4xl sm:text-5xl font-light italic text-[#F5F2ED]">
              {activeVenue === 'etoile' ? "L'Étoile Fine Dining" : activeVenue === 'sunken' ? 'The Sunken Garden' : 'The Garden Tea Pavilion'}
            </h2>

            <p className="text-xs sm:text-sm font-sans text-[#F5F2ED]/80 leading-relaxed font-light">
              {activeVenue === 'etoile'
                ? 'An intimate candlelit dining room suspended over cliffside waves. Offering 7-course and 10-course seasonal tasting journeys paired with vintage cellars from Tuscany, Champagne, and Piedmont.'
                : activeVenue === 'sunken'
                ? 'Submerged firepit lounges nestled into bamboo gardens. Serving handcrafted botanical elixirs, wild Mediterranean oysters, and rare tequila flights.'
                : 'A glass conservatory filled with orchids and sea breeze. Serving single-estate Darjeeling teas, house-made clotted cream pastries, and organic breakfasts.'}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs font-sans text-[#B5A264] pt-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#B5A264]" />
                <span>
                  {activeVenue === 'etoile' ? 'Hours: 18:30 – 23:00' : activeVenue === 'sunken' ? 'Hours: 16:30 – 01:00' : 'Hours: 07:30 – 17:00'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-[#B5A264]" />
                <span>Smart Elegant Attire Recommended</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 bg-[#B5A264] hover:bg-[#886F4B] text-[#1A1A1A] text-[10px] font-sans uppercase tracking-[0.25em] font-bold rounded-sm transition-all duration-300 shadow-xl cursor-pointer"
              >
                Reserve a Table at {activeVenue === 'etoile' ? "L'Étoile" : activeVenue === 'sunken' ? 'The Sunken Bar' : 'The Tea Pavilion'}
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="aspect-[4/3] rounded-sm overflow-hidden border border-[#B5A264]/30 shadow-xl relative img-zoom-container">
              <img
                src={
                  activeVenue === 'etoile'
                    ? 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=85&w=1200'
                    : activeVenue === 'sunken'
                    ? 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=85&w=1200'
                    : 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=85&w=1200'
                }
                alt="Dining Venue"
                className="w-full h-full object-cover img-zoom-hover opacity-95"
              />
            </div>
          </div>

        </div>

        {/* Menu Catalog Display */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-4">
            <h2 className="font-serif text-3xl italic text-[#1A1A1A]">
              Curated Menu & Cellar List
            </h2>
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#B5A264] font-bold">
              Organic & Hyper-Local
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {diningItems.map((item) => (
              <div
                key={item.id}
                className="p-6 bg-white border border-[#1A1A1A]/10 rounded-sm flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 rounded-sm object-cover shrink-0 border border-[#1A1A1A]/10"
                  />
                )}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-xl italic text-[#1A1A1A]">
                      {item.name}
                    </h3>
                    <span className="text-base font-serif font-semibold text-[#B5A264]">
                      ${item.price} USD
                    </span>
                  </div>

                  <p className="text-xs font-sans text-[#1A1A1A]/70 leading-relaxed font-light">
                    {item.description}
                  </p>

                  {item.tags && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.tags.map((t, idx) => (
                        <span key={idx} className="text-[9px] font-sans uppercase tracking-widest text-[#B5A264] bg-[#F5F2ED] px-2.5 py-1 rounded-sm border border-[#1A1A1A]/10 font-semibold">
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

      {/* Reservation Modal */}
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
                  <p className="text-[10px] font-sans text-[#B5A264] uppercase tracking-[0.25em] font-bold mt-0.5">
                    The Haven Michelin Dining
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#B5A264] uppercase tracking-[0.2em] text-[10px] mb-1 font-bold">
                      Guest Full Name
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
                      Time Slot
                    </label>
                    <select
                      value={resTime}
                      onChange={(e) => setResTime(e.target.value)}
                      className="w-full bg-[#262626] border border-[#B5A264]/30 rounded-sm px-3 py-3 text-[#F5F2ED] focus:outline-none"
                    >
                      <option value="18:30">18:30 PM</option>
                      <option value="19:30">19:30 PM</option>
                      <option value="20:30">20:30 PM</option>
                      <option value="21:30">21:30 PM</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#B5A264] uppercase tracking-[0.2em] text-[10px] mb-1 font-bold">
                      Guests
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
                    className="flex-1 py-3.5 bg-[#B5A264] text-[#1A1A1A] font-bold rounded-sm text-[10px] uppercase tracking-[0.2em] hover:bg-[#886F4B] transition-colors cursor-pointer"
                  >
                    Confirm Table Reservation
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

