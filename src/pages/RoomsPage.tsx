import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { Maximize, Users, BedDouble, Eye, ArrowRight, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { RoomCategory } from '../types';

export const RoomsPage: React.FC = () => {
  const { rooms, viewRoomDetail, startBookingForRoom } = useHotel();
  const [activeCategory, setActiveCategory] = useState<RoomCategory | 'all'>('all');

  const filteredRooms = activeCategory === 'all'
    ? rooms
    : rooms.filter((r) => r.category === activeCategory);

  return (
    <div className="py-24 bg-[#F5F2ED] text-[#1A1A1A] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.4em] text-[#B5A264] font-sans font-semibold">
            Private Sanctuaries
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl font-light italic text-[#1A1A1A]">
            Rooms & Suites
          </h1>
          <p className="text-xs sm:text-sm font-sans text-[#1A1A1A]/70 leading-relaxed font-light">
            Designed with quiet architectural purity, natural oak, travertine stone, and sweeping Mediterranean sea views. Each room is a secluded sanctuary crafted for peace and rejuvenation.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-6 text-xs font-sans">
            {[
              { id: 'all', label: 'All Sanctuaries' },
              { id: 'villa', label: 'Villas & Infinite Pools' },
              { id: 'suite', label: 'Ocean Suites' },
              { id: 'pavilion', label: 'Forest Pavilions' },
              { id: 'room', label: 'Horizon Rooms' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-5 py-2.5 rounded-sm uppercase tracking-[0.2em] text-[10px] transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-[#1A1A1A] text-[#F5F2ED] font-bold shadow-md'
                    : 'bg-white text-[#1A1A1A]/80 hover:text-[#1A1A1A] border border-[#1A1A1A]/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Room Cards List */}
        <div className="space-y-16">
          {filteredRooms.map((room, idx) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white border border-[#1A1A1A]/10 rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 gap-0"
            >
              
              {/* Room Photo Gallery Preview */}
              <div
                className="lg:col-span-7 relative min-h-[360px] lg:min-h-[480px] bg-neutral-900 overflow-hidden cursor-pointer img-zoom-container"
                onClick={() => viewRoomDetail(room.id)}
              >
                <img
                  src={room.heroImage}
                  alt={room.name}
                  className="w-full h-full object-cover img-zoom-hover filter brightness-95"
                />
                <div className="absolute top-6 left-6 bg-[#1A1A1A]/90 backdrop-blur-md text-[#F5F2ED] text-[9px] uppercase tracking-[0.3em] font-sans px-4 py-2 rounded-sm border border-white/20 font-semibold">
                  {room.category}
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex items-center gap-2 overflow-x-auto pb-2">
                  {room.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${room.name} preview ${i}`}
                      className="w-16 h-12 rounded-sm object-cover border border-white/40 shadow-md shrink-0 hover:scale-105 transition-transform"
                    />
                  ))}
                </div>
              </div>

              {/* Room Information */}
              <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  
                  <div className="flex items-start justify-between border-b border-[#1A1A1A]/10 pb-4">
                    <div>
                      <h2
                        onClick={() => viewRoomDetail(room.id)}
                        className="font-serif text-3xl italic text-[#1A1A1A] hover:text-[#B5A264] transition-colors cursor-pointer"
                      >
                        {room.name}
                      </h2>
                      <p className="text-xs font-sans text-[#B5A264] italic mt-1 font-medium">
                        {room.subtitle}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-serif text-2xl font-normal text-[#1A1A1A]">
                        ${room.pricePerNight.toLocaleString()}
                      </span>
                      <span className="block text-[9px] font-sans text-[#B5A264] uppercase tracking-[0.2em] font-semibold">
                        per night
                      </span>
                    </div>
                  </div>

                  <p className="text-xs font-sans text-[#1A1A1A]/75 leading-relaxed font-light">
                    {room.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs font-sans text-[#1A1A1A]/80 pt-2">
                    <div className="flex items-center gap-2">
                      <Maximize className="w-4 h-4 text-[#B5A264]" />
                      <span>{room.sizeSqm} sqm area</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#B5A264]" />
                      <span>Up to {room.maxOccupancy} guests</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BedDouble className="w-4 h-4 text-[#B5A264]" />
                      <span className="truncate">{room.bedType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-[#B5A264]" />
                      <span className="truncate">{room.view}</span>
                    </div>
                  </div>

                  {/* Top Amenities Checklist */}
                  <div className="pt-4 border-t border-[#1A1A1A]/10 space-y-2">
                    <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#B5A264] font-bold block">
                      Included Luxuries
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-sans text-[#1A1A1A]/80 font-light">
                      {room.amenities.slice(0, 4).map((a, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#B5A264] shrink-0" />
                          <span className="truncate">{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-[#1A1A1A]/10 flex items-center gap-4">
                  <button
                    onClick={() => viewRoomDetail(room.id)}
                    className="flex-1 py-3.5 text-center border border-[#1A1A1A]/20 hover:border-[#B5A264] text-[#1A1A1A] text-[10px] font-sans uppercase tracking-[0.2em] rounded-sm transition-all duration-300 cursor-pointer"
                  >
                    View Room Specs
                  </button>

                  <button
                    onClick={() => startBookingForRoom(room.id)}
                    className="flex-1 py-3.5 text-center bg-[#1A1A1A] hover:bg-[#B5A264] text-[#F5F2ED] hover:text-[#1A1A1A] text-[10px] font-sans uppercase tracking-[0.2em] font-bold rounded-sm transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Reserve</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

