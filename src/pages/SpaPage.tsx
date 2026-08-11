import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { Clock, Check, X, Sparkles, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SpaAppointment } from '../types';

export const SpaPage: React.FC = () => {
  const { spaTreatments, addSpaAppointment } = useHotel();
  const [selectedTreatmentId, setSelectedTreatmentId] = useState(spaTreatments[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [appDate, setAppDate] = useState('2026-08-15');
  const [appTime, setAppTime] = useState('14:00');
  const [therapistPref, setTherapistPref] = useState('Master Therapist Elena Vane');

  const activeTreatment = spaTreatments.find((t) => t.id === selectedTreatmentId) || spaTreatments[0];

  const handleSpaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAppointment: SpaAppointment = {
      id: `spa-app-${Date.now()}`,
      guestName,
      guestEmail,
      guestPhone,
      treatmentId: activeTreatment.id,
      treatmentName: activeTreatment.name,
      date: appDate,
      time: appTime,
      therapistPreference: therapistPref,
      status: 'confirmed',
      totalPrice: activeTreatment.price
    };
    addSpaAppointment(newAppointment);
    setIsModalOpen(false);
    setGuestName('');
  };

  return (
    <div className="py-24 bg-[#F5F2ED] text-[#1A1A1A] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] uppercase tracking-[0.4em] text-[#B5A264] font-sans font-semibold">
            Holistic Sanctuary & Thermal Baths
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl font-light italic text-[#1A1A1A]">
            Spa & Wellness
          </h1>
          <p className="text-xs sm:text-sm font-sans text-[#1A1A1A]/75 leading-relaxed font-light">
            Designed as a quiet cliffside sanctuary for deep restoration. Combining thermal hydrotherapy pools, Japanese Onsen bathing, acoustic sound vibration, and bespoke botanical therapies.
          </p>
        </div>

        {/* Spa Hero Highlight */}
        <div className="bg-[#1A1A1A] text-[#F5F2ED] rounded-sm p-8 lg:p-12 border border-[#B5A264]/30 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#B5A264] font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B5A264]" />
              <span>Signature Holistic Sanctuary</span>
            </span>

            <h2 className="font-serif text-4xl sm:text-5xl font-light italic text-[#F5F2ED]">
              The Haven Total Transcendence Journey
            </h2>

            <p className="text-xs sm:text-sm font-sans text-[#F5F2ED]/80 leading-relaxed font-light">
              120 minutes of immersive restoration. Commencing with a warm volcanic stone foot cleanse, followed by deep tissue botanical oil massage, sound bowl resonance vibration, and private thermal mineral bath immersion.
            </p>

            <div className="flex items-center gap-6 text-xs font-sans text-[#B5A264]">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 120 Minutes</span>
              <span>•</span>
              <span className="font-serif text-base font-normal text-[#F5F2ED]">$480 USD</span>
            </div>

            <div>
              <button
                onClick={() => {
                  setSelectedTreatmentId('spa-1');
                  setIsModalOpen(true);
                }}
                className="px-8 py-4 bg-[#B5A264] hover:bg-[#886F4B] text-[#1A1A1A] text-[10px] font-sans uppercase tracking-[0.25em] font-bold rounded-sm transition-all duration-300 shadow-xl cursor-pointer"
              >
                Book Signature Journey
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="aspect-[4/3] rounded-sm overflow-hidden border border-[#B5A264]/30 shadow-xl relative img-zoom-container">
              <img
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=85&w=1200"
                alt="Signature Spa Journey"
                className="w-full h-full object-cover img-zoom-hover opacity-95"
              />
            </div>
          </div>
        </div>

        {/* Full Treatment Menu Grid */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-4">
            <h2 className="font-serif text-3xl italic text-[#1A1A1A]">
              Treatment Catalog & Pricing
            </h2>
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#B5A264] font-bold">
              Bespoke Therapies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {spaTreatments.map((treatment) => (
              <div
                key={treatment.id}
                className="p-8 bg-white border border-[#1A1A1A]/10 rounded-sm flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  <div className="aspect-[16/9] rounded-sm overflow-hidden bg-neutral-900 border border-[#1A1A1A]/10">
                    <img src={treatment.image} alt={treatment.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-serif text-2xl italic text-[#1A1A1A]">
                        {treatment.name}
                      </h3>
                      <p className="text-xs font-sans text-[#B5A264] mt-0.5 font-medium">
                        {treatment.durationMinutes} Minutes • {treatment.category}
                      </p>
                    </div>
                    <span className="font-serif text-2xl text-[#1A1A1A] font-normal">
                      ${treatment.price}
                    </span>
                  </div>

                  <p className="text-xs font-sans text-[#1A1A1A]/75 leading-relaxed font-light">
                    {treatment.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-[#1A1A1A]/10">
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#B5A264] font-bold block">
                      Therapeutic Benefits
                    </span>
                    <ul className="grid grid-cols-1 gap-1 text-xs font-sans text-[#1A1A1A]/80 font-light">
                      {treatment.benefits.map((b, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#B5A264] shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedTreatmentId(treatment.id);
                    setIsModalOpen(true);
                  }}
                  className="w-full py-3.5 bg-[#1A1A1A] hover:bg-[#B5A264] text-[#F5F2ED] hover:text-[#1A1A1A] text-[10px] font-sans uppercase tracking-[0.2em] font-bold rounded-sm transition-all duration-300 cursor-pointer"
                >
                  Book Online Session
                </button>

              </div>
            ))}
          </div>
        </div>

        {/* Master Therapists Bios */}
        <div className="bg-white p-8 sm:p-12 rounded-sm border border-[#1A1A1A]/10 space-y-6">
          <h2 className="font-serif text-3xl italic text-[#1A1A1A]">
            Our Master Therapists
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-sans text-[#1A1A1A]/80">
            <div className="p-6 bg-[#F5F2ED] rounded-sm border border-[#1A1A1A]/10 space-y-2">
              <div className="flex items-center gap-2 text-[#B5A264] font-bold uppercase tracking-[0.2em] text-[10px]">
                <UserCheck className="w-4 h-4" /> Master Therapist Elena Vane
              </div>
              <p className="font-light leading-relaxed">
                20 years of experience in Ayurvedic bio-energy balancing and Kerala traditional oil marma massage.
              </p>
            </div>

            <div className="p-6 bg-[#F5F2ED] rounded-sm border border-[#1A1A1A]/10 space-y-2">
              <div className="flex items-center gap-2 text-[#B5A264] font-bold uppercase tracking-[0.2em] text-[10px]">
                <UserCheck className="w-4 h-4" /> Senior Therapist Kenji Takahashi
              </div>
              <p className="font-light leading-relaxed">
                Specialized in Japanese Shiatsu pressure therapies, acoustic singing bowl resonances, and Onsen bath rituals.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Spa Appointment Modal */}
      <AnimatePresence>
        {isModalOpen && (
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
                    Online Session Confirmation
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
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
                      Preferred Time
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
                    <option value="Master Therapist Elena Vane">Master Therapist Elena Vane</option>
                    <option value="Senior Therapist Kenji Takahashi">Senior Therapist Kenji Takahashi</option>
                    <option value="First Available Master Therapist">First Available Master Therapist</option>
                  </select>
                </div>

                <div className="bg-white p-4 rounded-sm border border-[#1A1A1A]/10 flex items-center justify-between">
                  <span className="text-xs text-[#B5A264] font-medium">Session Price</span>
                  <span className="text-base font-serif font-semibold italic text-[#1A1A1A]">
                    ${activeTreatment.price} USD
                  </span>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3.5 border border-[#1A1A1A]/20 rounded-sm text-[10px] uppercase tracking-[0.2em] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3.5 bg-[#1A1A1A] text-[#F5F2ED] font-bold rounded-sm text-[10px] uppercase tracking-[0.2em] hover:bg-[#B5A264] hover:text-[#1A1A1A] transition-colors cursor-pointer"
                  >
                    Confirm Spa Session
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

