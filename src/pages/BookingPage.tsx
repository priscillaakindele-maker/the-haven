import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { Calendar, Users, BedDouble, Check, Sparkles, ShieldCheck, ArrowRight, CheckCircle2, ChevronRight, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Booking } from '../types';

export const BookingPage: React.FC = () => {
  const { rooms, selectedRoomId, draftBooking, setDraftBooking, addBooking, setCurrentPage, showToast } = useHotel();

  // Active step: 1: Setup & Room Selection, 2: Luxury Extras, 3: Guest Details, 4: Confirmation Voucher
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Selected room
  const [chosenRoomId, setChosenRoomId] = useState<string>(
    selectedRoomId || draftBooking.selectedRoomId || rooms[0].id
  );

  const activeRoom = rooms.find((r) => r.id === chosenRoomId) || rooms[0];

  // Luxury Extras selection
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  // Guest details
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Confirmed booking ref
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Extra service options definition
  const extraServices = [
    { id: 'heli', name: 'Helicopter Airport Dispatch (Naples/Rome)', price: 850 },
    { id: 'chauffeur', name: 'Rolls-Royce Chauffeur Transfer', price: 250 },
    { id: 'champagne', name: 'In-Suite Vintage Dom Pérignon & Caviar', price: 450 },
    { id: 'spa-ritual', name: '120-Min Couple Hydrotherapy Ritual', price: 600 },
    { id: 'chef-beach', name: 'Private Cliffside Chef Candlelight Dinner', price: 750 },
  ];

  // Calculate nights
  const calculateNights = () => {
    const start = new Date(draftBooking.checkInDate);
    const end = new Date(draftBooking.checkOutDate);
    const diffTime = Math.max(0, end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const nights = calculateNights();
  const roomSubtotal = activeRoom.pricePerNight * nights;

  const extrasSubtotal = selectedExtras.reduce((acc, extraId) => {
    const service = extraServices.find((s) => s.id === extraId);
    return acc + (service ? service.price : 0);
  }, 0);

  const luxuryTax = Math.round((roomSubtotal + extrasSubtotal) * 0.1);
  const totalPrice = roomSubtotal + extrasSubtotal + luxuryTax;

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `THV-2026-${Math.floor(10000 + Math.random() * 90000)}`;

    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      confirmationCode: code,
      guestName,
      guestEmail,
      guestPhone,
      roomId: activeRoom.id,
      roomName: activeRoom.name,
      checkInDate: draftBooking.checkInDate,
      checkOutDate: draftBooking.checkOutDate,
      guests: {
        adults: draftBooking.adults,
        children: draftBooking.children,
      },
      extras: {
        helicopterTransfer: selectedExtras.includes('heli'),
        dailyBreakfast: selectedExtras.includes('chauffeur'),
        spaPackage: selectedExtras.includes('spa-ritual'),
        privateButler: selectedExtras.includes('chef-beach'),
        champagneOnArrival: selectedExtras.includes('champagne'),
      },
      numberOfNights: nights,
      roomTotal: roomSubtotal,
      extrasTotal: extrasSubtotal,
      taxAndServiceFee: luxuryTax,
      totalPrice,
      status: 'confirmed',
      createdAt: new Date().toISOString().split('T')[0],
      specialRequests
    };

    addBooking(newBooking);
    setConfirmedBooking(newBooking);
    setStep(4);
    showToast(`Reservation Confirmed! Code: ${code}`);
  };

  return (
    <div className="py-16 bg-[#F5F2ED] text-[#1A1A1A] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] uppercase tracking-[0.4em] text-[#B5A264] font-sans font-semibold">
            Bespoke Reservation
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl font-light italic text-[#1A1A1A]">
            Reserve Your Sanctuary
          </h1>
        </div>

        {/* Wizard Step Tracker */}
        {step < 4 && (
          <div className="max-w-3xl mx-auto flex items-center justify-between border-b border-[#1A1A1A]/10 pb-6 text-xs font-sans">
            {[
              { num: 1, label: 'Dates & Room' },
              { num: 2, label: 'Luxury Services' },
              { num: 3, label: 'Guest Details' },
            ].map((s) => (
              <div
                key={s.num}
                onClick={() => {
                  if (s.num < step) setStep(s.num as any);
                }}
                className={`flex items-center gap-2 cursor-pointer transition-colors ${
                  step === s.num
                    ? 'text-[#1A1A1A] font-semibold'
                    : step > s.num
                    ? 'text-[#B5A264]'
                    : 'text-[#1A1A1A]/40'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-sm flex items-center justify-center text-xs font-semibold ${
                    step === s.num
                      ? 'bg-[#1A1A1A] text-[#F5F2ED]'
                      : step > s.num
                      ? 'bg-[#B5A264] text-[#1A1A1A]'
                      : 'bg-[#E5E2DD] text-[#1A1A1A]'
                  }`}
                >
                  {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span className="uppercase tracking-[0.2em] text-[10px] hidden sm:inline">{s.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Main Form Container */}
          <div className="lg:col-span-8 bg-white p-8 sm:p-12 border border-[#1A1A1A]/10 shadow-lg rounded-sm space-y-8">
            
            {/* STEP 1: Dates & Room Selector */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8 text-xs font-sans"
              >
                <div>
                  <h2 className="font-serif text-3xl text-[#1A1A1A] mb-1 italic">
                    Select Stay Dates & Guests
                  </h2>
                  <p className="text-[#1A1A1A]/60">
                    Choose your check-in, check-out, and guest count.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-[#F5F2ED] border border-[#1A1A1A]/10 rounded-sm">
                  <div>
                    <label className="block text-[#B5A264] uppercase tracking-[0.2em] text-[10px] mb-1 font-bold">
                      Check-In Date
                    </label>
                    <input
                      type="date"
                      value={draftBooking.checkInDate}
                      onChange={(e) =>
                        setDraftBooking((prev) => ({ ...prev, checkInDate: e.target.value }))
                      }
                      className="w-full bg-transparent text-sm font-sans text-[#191816] focus:outline-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-[#886F4B] uppercase tracking-wider mb-1 font-semibold">
                      Check-Out Date
                    </label>
                    <input
                      type="date"
                      value={draftBooking.checkOutDate}
                      onChange={(e) =>
                        setDraftBooking((prev) => ({ ...prev, checkOutDate: e.target.value }))
                      }
                      className="w-full bg-transparent text-sm font-sans text-[#191816] focus:outline-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-[#886F4B] uppercase tracking-wider mb-1 font-semibold">
                      Guests
                    </label>
                    <select
                      value={draftBooking.adults}
                      onChange={(e) =>
                        setDraftBooking((prev) => ({ ...prev, adults: parseInt(e.target.value) }))
                      }
                      className="w-full bg-transparent text-sm font-sans text-[#191816] focus:outline-none cursor-pointer"
                    >
                      <option value={1}>1 Guest (Solo)</option>
                      <option value={2}>2 Guests (Couple)</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4 Guests (Villa Residency)</option>
                    </select>
                  </div>
                </div>

                {/* Room Selection */}
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl text-[#191816]">
                    Select Sanctuary Type
                  </h3>

                  <div className="space-y-4">
                    {rooms.map((room) => {
                      const isSelected = chosenRoomId === room.id;
                      return (
                        <div
                          key={room.id}
                          onClick={() => setChosenRoomId(room.id)}
                          className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-6 ${
                            isSelected
                              ? 'bg-[#F7F4EE] border-[#C5A880] shadow-md ring-1 ring-[#C5A880]'
                              : 'bg-[#FDFBF7] border-[#E3DDD3] hover:border-[#C5A880]/50'
                          }`}
                        >
                          <div className="flex items-center gap-4 w-full sm:w-auto">
                            <img
                              src={room.heroImage}
                              alt={room.name}
                              className="w-24 h-20 rounded-xl object-cover shrink-0 border border-[#E3DDD3]"
                            />
                            <div>
                              <span className="text-[10px] font-sans uppercase tracking-widest text-[#886F4B]">
                                {room.category}
                              </span>
                              <h4 className="font-serif text-xl text-[#191816]">
                                {room.name}
                              </h4>
                              <p className="text-xs text-[#191816]/70 line-clamp-1 font-light">
                                {room.sizeSqm} sqm • Up to {room.maxOccupancy} guests • {room.view}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-[#E3DDD3]">
                            <div className="text-right">
                              <span className="font-serif text-xl text-[#191816]">
                                ${room.pricePerNight.toLocaleString()}
                              </span>
                              <span className="block text-[10px] text-[#886F4B] uppercase">
                                per night
                              </span>
                            </div>

                            <div
                              className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                                isSelected
                                  ? 'bg-[#191816] text-[#FAF8F5] border-[#191816]'
                                  : 'border-[#E3DDD3]'
                              }`}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5" />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full py-4 bg-[#191816] text-[#FAF8F5] text-xs font-sans uppercase tracking-[0.2em] font-semibold rounded-2xl hover:bg-[#C5A880] hover:text-[#191816] transition-colors flex items-center justify-center gap-2"
                >
                  <span>Continue to Luxury Extras</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* STEP 2: Luxury Extras */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6 text-xs font-sans"
              >
                <div>
                  <h2 className="font-serif text-3xl text-[#191816] mb-1">
                    Enhance Your Stay
                  </h2>
                  <p className="text-[#886F4B]">
                    Select bespoke services curated by Head Concierge Aurelia.
                  </p>
                </div>

                <div className="space-y-3">
                  {extraServices.map((extra) => {
                    const isChecked = selectedExtras.includes(extra.id);
                    return (
                      <div
                        key={extra.id}
                        onClick={() => toggleExtra(extra.id)}
                        className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                          isChecked
                            ? 'bg-[#F7F4EE] border-[#C5A880] shadow-sm'
                            : 'bg-[#FDFBF7] border-[#E3DDD3]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                              isChecked
                                ? 'bg-[#191816] text-[#FAF8F5] border-[#191816]'
                                : 'border-[#E3DDD3]'
                            }`}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5" />}
                          </div>
                          <span className="font-sans text-xs text-[#191816] font-medium">
                            {extra.name}
                          </span>
                        </div>

                        <span className="font-serif text-sm font-semibold text-[#886F4B]">
                          +${extra.price} USD
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 border border-[#E3DDD3] rounded-2xl text-xs uppercase tracking-wider"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 py-4 bg-[#191816] text-[#FAF8F5] text-xs font-sans uppercase tracking-[0.2em] font-semibold rounded-2xl hover:bg-[#C5A880] hover:text-[#191816] transition-colors"
                  >
                    Continue to Guest Details
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Guest Details Form */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6 text-xs font-sans"
              >
                <div>
                  <h2 className="font-serif text-3xl text-[#191816] mb-1">
                    Guest Information
                  </h2>
                  <p className="text-[#886F4B]">
                    Provide details for your reservation voucher and concierge briefing.
                  </p>
                </div>

                <form onSubmit={handleFinalSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#886F4B] uppercase tracking-wider mb-1 font-semibold">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="e.g. Lord Vance"
                        className="w-full bg-[#FDFBF7] border border-[#E3DDD3] rounded-xl px-4 py-3 text-[#191816] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[#886F4B] uppercase tracking-wider mb-1 font-semibold">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder="e.g. vance@estate.com"
                        className="w-full bg-[#FDFBF7] border border-[#E3DDD3] rounded-xl px-4 py-3 text-[#191816] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#886F4B] uppercase tracking-wider mb-1 font-semibold">
                      Telephone / WhatsApp (Optional)
                    </label>
                    <input
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="+1 (555) 019-2831"
                      className="w-full bg-[#FDFBF7] border border-[#E3DDD3] rounded-xl px-4 py-3 text-[#191816] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#886F4B] uppercase tracking-wider mb-1 font-semibold">
                      Special Concierge Requests & Dietary Preferences
                    </label>
                    <textarea
                      rows={4}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="e.g. Anniversary celebration, gluten-free, feather-free pillows..."
                      className="w-full bg-[#FDFBF7] border border-[#E3DDD3] rounded-xl p-4 text-[#191816] focus:outline-none"
                    />
                  </div>

                  <div className="pt-4 flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex-1 py-4 border border-[#E3DDD3] rounded-2xl text-xs uppercase tracking-wider"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-4 bg-[#191816] text-[#FAF8F5] text-xs font-sans uppercase tracking-[0.2em] font-semibold rounded-2xl hover:bg-[#C5A880] hover:text-[#191816] transition-colors shadow-xl"
                    >
                      Complete Reservation Request
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* STEP 4: Official Confirmation Voucher */}
            {step === 4 && confirmedBooking && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8 text-xs font-sans text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-[#C5A880] text-[#191816] flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#886F4B] font-semibold">
                    Reservation Confirmed
                  </span>
                  <h2 className="font-serif text-4xl text-[#191816]">
                    Welcome to The Haven, {confirmedBooking.guestName}
                  </h2>
                  <p className="text-[#191816]/75 font-light">
                    Your luxury stay voucher has been generated and dispatched to {confirmedBooking.guestEmail}.
                  </p>
                </div>

                {/* Voucher Ticket Box */}
                <div className="bg-[#191816] text-[#FAF8F5] p-8 rounded-3xl border border-[#C5A880]/40 shadow-2xl space-y-6 text-left">
                  <div className="flex items-center justify-between border-b border-[#C5A880]/20 pb-4">
                    <div>
                      <span className="block text-[10px] uppercase tracking-widest text-[#C5A880]">
                        Confirmation Reference
                      </span>
                      <span className="font-mono text-xl text-[#FAF8F5] font-semibold">
                        {confirmedBooking.confirmationCode}
                      </span>
                    </div>

                    <div className="bg-[#C5A880] text-[#191816] px-3 py-1 rounded-full text-[10px] font-semibold uppercase">
                      Guaranteed Status
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] uppercase text-[#C5A880]">Sanctuary</span>
                      <p className="font-serif text-lg text-[#FAF8F5]">{activeRoom.name}</p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase text-[#C5A880]">Dates</span>
                      <p className="font-sans text-xs text-[#FAF8F5]">
                        {confirmedBooking.checkInDate} — {confirmedBooking.checkOutDate} ({nights} nights)
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#C5A880]/20 flex items-center justify-between">
                    <span className="text-xs text-[#C5A880]">Total Guaranteed Rate</span>
                    <span className="font-serif text-2xl text-[#FAF8F5]">
                      ${confirmedBooking.totalPrice.toLocaleString()} USD
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => {
                      setCurrentPage('home');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex-1 py-4 bg-[#191816] text-[#FAF8F5] text-xs font-sans uppercase tracking-[0.2em] font-semibold rounded-2xl hover:bg-[#C5A880] hover:text-[#191816] transition-colors"
                  >
                    Return to Homepage
                  </button>
                </div>
              </motion.div>
            )}

          </div>

          {/* Right Live Pricing Summary Panel */}
          {step < 4 && (
            <div className="lg:col-span-4 bg-[#FAF8F5] p-8 rounded-3xl border border-[#E3DDD3] shadow-sm space-y-6 sticky top-28">
              <h3 className="font-serif text-2xl text-[#191816] border-b border-[#E3DDD3] pb-4">
                Stay Summary
              </h3>

              <div className="space-y-4 text-xs font-sans text-[#191816]/80">
                <div className="flex items-center gap-3 pb-3 border-b border-[#E3DDD3]">
                  <img src={activeRoom.heroImage} alt={activeRoom.name} className="w-16 h-12 rounded-lg object-cover" />
                  <div>
                    <h4 className="font-serif text-base text-[#191816]">{activeRoom.name}</h4>
                    <p className="text-[11px] text-[#886F4B]">{draftBooking.checkInDate} to {draftBooking.checkOutDate}</p>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span>Room Rate (${activeRoom.pricePerNight} × {nights} nights)</span>
                  <span className="font-semibold">${roomSubtotal.toLocaleString()}</span>
                </div>

                {extrasSubtotal > 0 && (
                  <div className="flex justify-between text-[#C5A880]">
                    <span>Selected Luxury Extras</span>
                    <span className="font-semibold">+${extrasSubtotal.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#886F4B]">
                  <span>Luxury Service & Resort Fee (10%)</span>
                  <span>+${luxuryTax.toLocaleString()}</span>
                </div>

                <div className="pt-4 border-t border-[#E3DDD3] flex justify-between items-center text-sm">
                  <span className="font-serif text-lg text-[#191816]">Total Amount</span>
                  <span className="font-serif text-2xl font-semibold text-[#191816]">
                    ${totalPrice.toLocaleString()} USD
                  </span>
                </div>
              </div>

              <div className="p-4 bg-[#F7F4EE] rounded-xl text-[11px] font-sans text-[#886F4B] space-y-1">
                <p className="flex items-center gap-1.5 font-semibold text-[#191816]">
                  <ShieldCheck className="w-4 h-4 text-[#C5A880]" /> No deposit taken today.
                </p>
                <p>Payment is settled upon check-out at the resort.</p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
