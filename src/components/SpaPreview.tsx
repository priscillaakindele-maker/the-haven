import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { Flower2, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SpaAppointment } from '../types';

export const SpaPreview: React.FC = () => {
  const { spaTreatments, addSpaAppointment, setCurrentPage } = useHotel();
  const [isSpaModalOpen, setIsSpaModalOpen] = useState(false);

  // Spa appointment form state
  const [selectedTreatmentId, setSelectedTreatmentId] = useState(spaTreatments[0].id);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [appDate, setAppDate] = useState('2026-08-14');
  const [appTime, setAppTime] = useState('11:00');
  const [therapistPref, setTherapistPref] = useState('Master Therapist Elena Vane');

  const selectedTreatment = spaTreatments.find((t) => t.id === selectedTreatmentId) || spaTreatments[0];

  const handleSpaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAppointment: SpaAppointment = {
      id: `spa-app-${Date.now()}`,
      guestName,
      guestEmail,
      guestPhone,
      treatmentId: selectedTreatment.id,
      treatmentName: selectedTreatment.name,
      date: appDate,
      time: appTime,
      therapistPreference: therapistPref,
      status: 'confirmed',
      totalPrice: selectedTreatment.price
    };
    addSpaAppointment(newAppointment);
    setIsSpaModalOpen(false);
    setGuestName('');
    setGuestEmail('');
  };

  return (
    <section className="py-24 bg-[#F7F8F5] text-[#0D2A22]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#0D2A22]/10 pb-8 gap-6">
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.4em] text-[#C8A96E] font-sans font-bold">
              Holistic Renewal
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-light italic text-[#0D2A22]">
              Sanctuary Spa & Thermal Baths
            </h2>
          </div>

          <button
            onClick={() => {
              setCurrentPage('spa');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-sans text-[#0D2A22] hover:text-[#C8A96E] transition-colors cursor-pointer"
          >
            <span>Explore All Spa Treatments</span>
            <Sparkles className="w-4 h-4 text-[#C8A96E]" />
          </button>
        </div>

        {/* Spa Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          
          <div className="space-y-6">
            <p className="text-xs sm:text-sm font-sans text-[#1A1A1A]/75 leading-relaxed font-light">
              Resting on a quiet thermal spring cliffside, the Sanctuary Spa combines ancient Japanese Onsen rituals, Ayurvedic bio-energetic bodywork, and organic alpine botanical oils harvested on our estate.
            </p>

            <div className="space-y-4">
              {spaTreatments.slice(0, 3).map((treatment) => (
                <div
                  key={treatment.id}
                  onClick={() => {
                    setSelectedTreatmentId(treatment.id);
                    setIsSpaModalOpen(true);
                  }}
                  className="p-6 bg-white border border-[#1A1A1A]/10 hover:border-[#B5A264] rounded-sm transition-all duration-300 cursor-pointer flex items-center justify-between group shadow-sm hover:shadow-md"
                >
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl italic text-[#1A1A1A] group-hover:text-[#B5A264] transition-colors">
                      {treatment.name}
                    </h3>
                    <p className="text-xs font-sans text-[#B5A264] font-medium">
                      {treatment.durationMinutes} Minutes • ${treatment.price} USD
                    </p>
                  </div>
                  
                  <button className="px-4 py-2 bg-[#1A1A1A] group-hover:bg-[#B5A264] text-[#F5F2ED] group-hover:text-[#1A1A1A] text-[9px] uppercase tracking-[0.2em] font-sans font-bold rounded-sm transition-colors cursor-pointer">
                    Book Session
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsSpaModalOpen(true)}
              className="w-full py-4 bg-[#1A1A1A] hover:bg-[#B5A264] text-[#F5F2ED] hover:text-[#1A1A1A] text-[10px] font-sans uppercase tracking-[0.25em] font-bold rounded-sm transition-all duration-300 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Flower2 className="w-4 h-4 text-[#B5A264]" />
              <span>Book Online Spa Appointment</span>
            </button>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] rounded-sm overflow-hidden border border-[#1A1A1A]/10 shadow-2xl relative img-zoom-container">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=85&w=1200"
                alt="Sanctuary Spa Hydrotherapy"
                className="w-full h-full object-cover img-zoom-hover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-[#F5F2ED] space-y-2">
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#B5A264] font-sans font-semibold">
                  Holistic Sanctuary
                </span>
                <h4 className="font-serif text-2xl italic">
                  Japanese Onsen Thermal Immersion
                </h4>
                <p className="text-xs font-sans text-[#F5F2ED]/80 font-light">
                  Complimentary access for all suite and villa guests.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Spa Appointment Booking Modal */}
      <AnimatePresence>
        {isSpaModalOpen && (
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
                    Sanctuary Spa Appointment
                  </h3>
                  <p className="text-[10px] font-sans text-[#B5A264] uppercase tracking-[0.25em] font-bold mt-0.5">
                    Select Ritual & Master Therapist
                  </p>
                </div>
                <button
                  onClick={() => setIsSpaModalOpen(false)}
                  className="p-2 text-[#1A1A1A]/70 hover:text-[#1A1A1A] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSpaSubmit} className="space-y-4 text-xs font-sans">
                
                <div>
                  <label className="block text-[#B5A264] uppercase tracking-[0.2em] text-[10px] mb-1 font-bold">
                    Select Spa Treatment
                  </label>
                  <select
                    value={selectedTreatmentId}
                    onChange={(e) => setSelectedTreatmentId(e.target.value)}
                    className="w-full bg-white border border-[#1A1A1A]/10 rounded-sm px-4 py-3 text-[#1A1A1A] focus:outline-none"
                  >
                    {spaTreatments.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.durationMinutes} mins — ${t.price} USD)
                      </option>
                    ))}
                  </select>
                </div>

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
                      value={appDate}
                      onChange={(e) => setAppDate(e.target.value)}
                      className="w-full bg-white border border-[#1A1A1A]/10 rounded-sm px-3 py-3 text-[#1A1A1A] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#B5A264] uppercase tracking-[0.2em] text-[10px] mb-1 font-bold">
                      Preferred Time Slot
                    </label>
                    <select
                      value={appTime}
                      onChange={(e) => setAppTime(e.target.value)}
                      className="w-full bg-white border border-[#1A1A1A]/10 rounded-sm px-3 py-3 text-[#1A1A1A] focus:outline-none"
                    >
                      <option value="09:00">09:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="16:30">04:30 PM</option>
                      <option value="19:00">07:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#B5A264] uppercase tracking-[0.2em] text-[10px] mb-1 font-bold">
                    Therapist Preference
                  </label>
                  <select
                    value={therapistPref}
                    onChange={(e) => setTherapistPref(e.target.value)}
                    className="w-full bg-white border border-[#1A1A1A]/10 rounded-sm px-4 py-3 text-[#1A1A1A] focus:outline-none"
                  >
                    <option value="Master Therapist Elena Vane">Master Therapist Elena Vane (Ayurvedic Specialist)</option>
                    <option value="Senior Therapist Kenji Takahashi">Senior Therapist Kenji Takahashi (Onsen & Shiatsu)</option>
                    <option value="First Available Master Therapist">First Available Master Therapist</option>
                  </select>
                </div>

                {/* Price Summary */}
                <div className="bg-white p-4 rounded-sm border border-[#1A1A1A]/10 flex items-center justify-between">
                  <span className="text-xs text-[#B5A264] font-medium">Treatment Session Total</span>
                  <span className="text-base font-serif font-semibold italic text-[#1A1A1A]">
                    ${selectedTreatment.price} USD
                  </span>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsSpaModalOpen(false)}
                    className="flex-1 py-3.5 border border-[#1A1A1A]/20 rounded-sm text-[10px] uppercase tracking-[0.2em] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3.5 bg-[#1A1A1A] text-[#F5F2ED] font-bold rounded-sm text-[10px] uppercase tracking-[0.2em] hover:bg-[#B5A264] hover:text-[#1A1A1A] transition-colors cursor-pointer"
                  >
                    Confirm Spa Appointment
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

