import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { AvailabilityCalendar } from '../components/AvailabilityCalendar';
import { Maximize, Users, BedDouble, Eye, Check, ArrowLeft, Calendar, ShieldCheck, Sparkles } from 'lucide-react';

export const RoomDetailPage: React.FC = () => {
  const { selectedRoomId, rooms, startBookingForRoom, setCurrentPage, draftBooking, setDraftBooking } = useHotel();
  
  const room = rooms.find((r) => r.id === selectedRoomId) || rooms[0];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleSelectDates = (checkIn: string, checkOut: string) => {
    setDraftBooking(prev => ({
      ...prev,
      checkInDate: checkIn || prev.checkInDate,
      checkOutDate: checkOut || prev.checkOutDate
    }));
  };

  return (
    <div className="py-24 bg-[#F5F2ED] text-[#1A1A1A] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
        
        {/* Back Button */}
        <button
          onClick={() => {
            setCurrentPage('rooms');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 text-[10px] font-sans uppercase tracking-[0.25em] text-[#B5A264] hover:text-[#1A1A1A] font-bold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#B5A264]" />
          <span>Back to All Rooms & Suites</span>
        </button>

        {/* Room Title Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-[#1A1A1A]/10 pb-8 gap-6">
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.4em] text-[#B5A264] font-sans font-semibold">
              {room.category} Sanctuary
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-light italic text-[#1A1A1A]">
              {room.name}
            </h1>
            <p className="text-xs sm:text-sm font-sans text-[#1A1A1A]/70 italic">
              {room.subtitle}
            </p>
          </div>

          <div className="text-left lg:text-right space-y-1">
            <span className="font-serif text-4xl font-normal text-[#1A1A1A]">
              ${room.pricePerNight.toLocaleString()}
            </span>
            <span className="block text-[10px] font-sans text-[#B5A264] uppercase tracking-[0.2em] font-bold">
              USD / night (Taxes & Butler Included)
            </span>
          </div>
        </div>

        {/* Large Image Gallery Viewer */}
        <div className="space-y-4">
          <div className="aspect-[16/9] lg:aspect-[21/9] rounded-sm overflow-hidden border border-[#1A1A1A]/10 shadow-xl relative bg-neutral-900">
            <img
              src={room.images[activeImageIndex] || room.heroImage}
              alt={room.name}
              className="w-full h-full object-cover filter brightness-95 transition-all duration-700"
            />
          </div>

          {/* Thumbnail Strip */}
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            {room.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-28 h-20 rounded-sm overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                  activeImageIndex === idx
                    ? 'border-[#B5A264] scale-105 shadow-md'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Room Specs & Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-8">
          
          {/* Left Main Details */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Overview */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl italic text-[#1A1A1A]">
                Sanctuary Overview
              </h2>
              <p className="text-xs sm:text-sm font-sans text-[#1A1A1A]/80 leading-relaxed font-light">
                {room.description}
              </p>
            </div>

            {/* Quick Specs Icons Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-white border border-[#1A1A1A]/10 rounded-sm text-xs font-sans text-[#1A1A1A]">
              <div className="space-y-1">
                <Maximize className="w-4 h-4 text-[#B5A264]" />
                <span className="block text-[9px] text-[#B5A264] uppercase tracking-[0.2em] font-bold">Space</span>
                <span className="font-semibold">{room.sizeSqm} sqm</span>
              </div>
              <div className="space-y-1">
                <Users className="w-4 h-4 text-[#B5A264]" />
                <span className="block text-[9px] text-[#B5A264] uppercase tracking-[0.2em] font-bold">Occupancy</span>
                <span className="font-semibold">Up to {room.maxOccupancy} Guests</span>
              </div>
              <div className="space-y-1">
                <BedDouble className="w-4 h-4 text-[#B5A264]" />
                <span className="block text-[9px] text-[#B5A264] uppercase tracking-[0.2em] font-bold">Bed Spec</span>
                <span className="font-semibold truncate">{room.bedType}</span>
              </div>
              <div className="space-y-1">
                <Eye className="w-4 h-4 text-[#B5A264]" />
                <span className="block text-[9px] text-[#B5A264] uppercase tracking-[0.2em] font-bold">Vista</span>
                <span className="font-semibold truncate">{room.view}</span>
              </div>
            </div>

            {/* Comprehensive Amenities List */}
            <div className="space-y-4">
              <h3 className="font-serif text-2xl italic text-[#1A1A1A]">
                In-Room Luxury Amenities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-[#1A1A1A]/85 font-light">
                {room.amenities.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3 bg-white rounded-sm border border-[#1A1A1A]/10">
                    <Check className="w-4 h-4 text-[#B5A264] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Architectural Specs */}
            {room.detailedSpecs && (
              <div className="space-y-6 pt-4 border-t border-[#1A1A1A]/10">
                <h3 className="font-serif text-2xl italic text-[#1A1A1A]">
                  Architectural & Tech Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-sans">
                  <div className="space-y-2">
                    <h4 className="font-bold uppercase tracking-[0.2em] text-[#B5A264] text-[10px]">
                      Bathroom & Spa
                    </h4>
                    <ul className="space-y-1.5 text-[#1A1A1A]/80 font-light">
                      {room.detailedSpecs.bathroomFeatures.map((f, i) => (
                        <li key={i}>• {f}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold uppercase tracking-[0.2em] text-[#B5A264] text-[10px]">
                      Acoustics & Technology
                    </h4>
                    <ul className="space-y-1.5 text-[#1A1A1A]/80 font-light">
                      {room.detailedSpecs.techFeatures.map((f, i) => (
                        <li key={i}>• {f}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Interactive Availability Calendar & Booking Trigger */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            
            <div className="bg-white border border-[#1A1A1A]/10 p-8 rounded-sm shadow-lg space-y-6">
              
              <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-4">
                <div>
                  <h3 className="font-serif text-2xl italic text-[#1A1A1A]">
                    Check Availability
                  </h3>
                  <p className="text-xs font-sans text-[#B5A264] font-medium">
                    Select stay dates to proceed
                  </p>
                </div>
                <Sparkles className="w-5 h-5 text-[#B5A264]" />
              </div>

              {/* Availability Calendar Widget */}
              <AvailabilityCalendar
                checkInDate={draftBooking.checkInDate}
                checkOutDate={draftBooking.checkOutDate}
                onSelectDates={handleSelectDates}
                pricePerNight={room.pricePerNight}
              />

              {/* Book Button */}
              <button
                onClick={() => startBookingForRoom(room.id)}
                className="w-full py-4 bg-[#1A1A1A] hover:bg-[#B5A264] text-[#F5F2ED] hover:text-[#1A1A1A] text-[10px] font-sans uppercase tracking-[0.2em] font-bold rounded-sm transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#B5A264]" />
                <span>Reserve {room.name}</span>
              </button>

              <div className="text-[10px] font-sans text-[#B5A264] text-center space-y-1 font-medium">
                <p className="flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B5A264]" />
                  <span>Flexible cancellation up to 72 hours prior</span>
                </p>
                <p className="text-[#1A1A1A]/60">No deposit charged today. Payment processed upon arrival.</p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

