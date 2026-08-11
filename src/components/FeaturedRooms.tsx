import React from 'react';
import { useHotel } from '../context/HotelContext';
import { ArrowRight, Users, Maximize, Eye } from 'lucide-react';
import { motion } from 'motion/react';

export const FeaturedRooms: React.FC = () => {
  const { rooms, viewRoomDetail, startBookingForRoom, setCurrentPage } = useHotel();
  const featuredList = rooms.filter((r) => r.featured).slice(0, 3);

  return (
    <section className="py-24 bg-[#F7F8F5] text-[#0D2A22]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#0D2A22]/10 pb-8 gap-6">
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.4em] text-[#C8A96E] font-sans font-bold">
              Private Sanctuaries
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-light italic text-[#0D2A22]">
              Rooms & Villas
            </h2>
          </div>

          <button
            onClick={() => {
              setCurrentPage('rooms');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-sans text-[#0D2A22] hover:text-[#C8A96E] transition-colors cursor-pointer"
          >
            <span>View All Sanctuaries</span>
            <ArrowRight className="w-4 h-4 text-[#C8A96E] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Featured Rooms Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {featuredList.map((room, idx) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group bg-white border border-[#0D2A22]/10 rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Showcase */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#ECEFEA] img-zoom-container cursor-pointer" onClick={() => viewRoomDetail(room.id)}>
                  <img
                    src={room.heroImage}
                    alt={room.name}
                    className="w-full h-full object-cover img-zoom-hover opacity-95"
                  />
                  <div className="absolute top-4 left-4 bg-[#0D2A22] text-[#F7F8F5] text-[9px] uppercase tracking-[0.3em] font-sans px-3 py-1.5 rounded-sm font-semibold">
                    {room.category}
                  </div>
                  <div className="absolute top-4 right-4 bg-[#C8A96E] text-[#0D2A22] text-xs font-sans font-bold px-3 py-1.5 rounded-sm shadow-md">
                    ${room.pricePerNight.toLocaleString()} <span className="text-[10px] font-normal">/ night</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="space-y-1">
                    <h3
                      onClick={() => viewRoomDetail(room.id)}
                      className="font-serif text-2xl italic text-[#0D2A22] group-hover:text-[#C8A96E] transition-colors cursor-pointer"
                    >
                      {room.name}
                    </h3>
                    <p className="text-xs font-sans text-[#C8A96E] font-medium">
                      {room.subtitle}
                    </p>
                  </div>

                  <p className="text-xs font-sans text-[#0D2A22]/75 leading-relaxed line-clamp-3 font-light">
                    {room.description}
                  </p>

                  {/* Room Specs Icons */}
                  <div className="pt-4 border-t border-[#0D2A22]/10 grid grid-cols-3 gap-2 text-[10px] font-sans text-[#0D2A22]/70 uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                      <Maximize className="w-3.5 h-3.5 text-[#C8A96E]" />
                      <span>{room.sizeSqm} sqm</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C8A96E]" />
                      <span>Up to {room.maxOccupancy}</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <Eye className="w-3.5 h-3.5 text-[#C8A96E] shrink-0" />
                      <span className="truncate">{room.view}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 sm:p-8 pt-0 flex items-center gap-3">
                <button
                  onClick={() => viewRoomDetail(room.id)}
                  className="flex-1 py-3 text-center border border-[#0D2A22]/30 hover:border-[#0D2A22] hover:bg-[#0D2A22] hover:text-[#F7F8F5] text-[#0D2A22] text-[10px] font-sans uppercase tracking-[0.2em] font-semibold rounded-sm transition-colors cursor-pointer"
                >
                  View Details
                </button>
                <button
                  onClick={() => startBookingForRoom(room.id)}
                  className="flex-1 py-3 text-center bg-[#0D2A22] hover:bg-[#C8A96E] text-[#F7F8F5] hover:text-[#0D2A22] text-[10px] font-sans uppercase tracking-[0.2em] font-bold rounded-sm transition-colors cursor-pointer shadow-sm"
                >
                  Book Stay
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

