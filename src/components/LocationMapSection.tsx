import React, { useState } from 'react';
import { MapPin, Navigation, Plane, Compass, Sun, Clock } from 'lucide-react';

export const LocationMapSection: React.FC = () => {
  const [activePin, setActivePin] = useState<'resort' | 'helipad' | 'beach' | 'yacht'>('resort');

  const pinDetails = {
    resort: {
      title: 'The Haven Sanctuary Main Lodge',
      desc: 'Suspended on the private Amalfi cliffside with private estate road entry and valet.',
      time: 'Check-in 15:00'
    },
    helipad: {
      title: 'Private Estate Helipad (ICAO: LTHV)',
      desc: 'Direct 12-minute flight from Naples International (NAP) or 35 minutes from Rome (FCO).',
      time: '24/7 Air Dispatch'
    },
    beach: {
      title: 'Cliffside Private Beach Club',
      desc: 'Funicular elevator access to private swimming platform, sun beds, and crystal coves.',
      time: 'Open 08:00 - 20:00'
    },
    yacht: {
      title: 'Deepwater Yacht Dock & Marina',
      desc: 'Accommodates superyachts up to 80 meters with tender dispatch and refueling.',
      time: 'Captains Valet Available'
    }
  };

  return (
    <section className="py-24 bg-[#1A1A1A] text-[#F5F2ED] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 space-y-3">
            <span className="text-[11px] uppercase tracking-[0.4em] text-[#B5A264] font-sans font-semibold">
              The Sanctuary Estate
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-light italic text-[#F5F2ED]">
              Location & Surroundings
            </h2>
            <p className="text-xs sm:text-sm font-sans text-[#F5F2ED]/75 leading-relaxed font-light">
              Tucked quietly into a private 40-acre estate above the Mediterranean coast, The Haven offers total seclusion with effortless arrival options by road, sea, or air.
            </p>
          </div>

          <div className="lg:col-span-6 bg-[#262626] p-6 rounded-sm border border-[#B5A264]/20 flex flex-wrap items-center justify-between gap-6 text-xs font-sans text-[#B5A264]">
            <div className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-[#B5A264]" />
              <div>
                <span className="block text-[10px] text-[#F5F2ED]/60 uppercase tracking-wider">Local Weather</span>
                <span className="font-semibold text-[#F5F2ED]">26°C Sunny & Calm Sea</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#B5A264]" />
              <div>
                <span className="block text-[10px] text-[#F5F2ED]/60 uppercase tracking-wider">Local Time (CEST)</span>
                <span className="font-semibold text-[#F5F2ED]">15:20 PM</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Plane className="w-5 h-5 text-[#B5A264]" />
              <div>
                <span className="block text-[10px] text-[#F5F2ED]/60 uppercase tracking-wider">Nearest Airport</span>
                <span className="font-semibold text-[#F5F2ED]">Naples (NAP) — 45 mins</span>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Interactive Map Representation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Map Visual Box */}
          <div className="lg:col-span-8 bg-[#121212] border border-[#B5A264]/30 rounded-sm p-8 relative overflow-hidden min-h-[400px] flex flex-col justify-between shadow-2xl">
            
            {/* Top Info Overlay */}
            <div className="flex items-center justify-between text-xs font-sans text-[#B5A264]">
              <span className="flex items-center gap-1.5 uppercase tracking-widest bg-[#1A1A1A]/90 px-3 py-1.5 rounded-sm border border-[#B5A264]/30 text-[10px]">
                <Compass className="w-3.5 h-3.5" /> 40°38'02.4"N 14°36'11.8"E
              </span>
              <span className="bg-[#1A1A1A]/90 px-3 py-1.5 rounded-sm border border-[#B5A264]/30 text-[10px]">
                Amalfi Coast Sanctuary
              </span>
            </div>

            {/* Stylized Map Vector Canvas */}
            <div className="relative my-8 h-64 w-full bg-[#1A1A1A] rounded-sm border border-white/10 flex items-center justify-center overflow-hidden">
              
              {/* Topography Waves Background */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#B5A264_1px,transparent_1px)] [background-size:16px_16px]" />
              
              {/* Coastline Graphic Line */}
              <svg className="absolute inset-0 w-full h-full text-[#B5A264]/30" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M0,80 Q25,40 50,60 T100,20 L100,100 L0,100 Z" fill="#18202a" opacity="0.6" />
                <path d="M0,80 Q25,40 50,60 T100,20" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="3 3" />
              </svg>

              {/* Map Hotspot Pins */}
              <div className="relative z-10 flex flex-wrap items-center justify-around w-full px-8">
                
                {[
                  { id: 'resort', label: 'Main Sanctuary Lodge' },
                  { id: 'helipad', label: 'Private Helipad' },
                  { id: 'beach', label: 'Cliffside Beach Club' },
                  { id: 'yacht', label: 'Yacht Dock' },
                ].map((pin) => (
                  <button
                    key={pin.id}
                    onClick={() => setActivePin(pin.id as any)}
                    className={`flex flex-col items-center group transition-all duration-300 cursor-pointer ${
                      activePin === pin.id ? 'scale-110' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-sm border flex items-center justify-center transition-all ${
                        activePin === pin.id
                          ? 'bg-[#B5A264] text-[#1A1A1A] border-white shadow-lg'
                          : 'bg-[#1A1A1A] text-[#B5A264] border-[#B5A264]/40'
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-sans uppercase tracking-wider text-[#F5F2ED] mt-1 bg-[#1A1A1A]/90 px-2 py-0.5 rounded-sm border border-[#B5A264]/20">
                      {pin.label}
                    </span>
                  </button>
                ))}

              </div>

            </div>

            {/* Bottom Pin Card */}
            <div className="bg-[#1A1A1A] p-4 rounded-sm border border-[#B5A264]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="font-serif text-lg italic text-[#F5F2ED]">
                  {pinDetails[activePin].title}
                </h4>
                <p className="text-xs font-sans text-[#F5F2ED]/70 font-light">
                  {pinDetails[activePin].desc}
                </p>
              </div>
              <span className="text-[10px] font-sans uppercase tracking-widest text-[#B5A264] shrink-0 font-bold">
                {pinDetails[activePin].time}
              </span>
            </div>

          </div>

          {/* Travel Distances Column */}
          <div className="lg:col-span-4 bg-[#262626] border border-[#B5A264]/20 rounded-sm p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="font-serif text-2xl italic text-[#F5F2ED]">
                Private Arrival Routes
              </h3>
              
              <div className="space-y-3 text-xs font-sans">
                <div className="p-3 bg-[#1A1A1A] rounded-sm border border-[#B5A264]/15 space-y-1">
                  <div className="flex items-center justify-between text-[#B5A264]">
                    <span className="font-semibold">Naples Airport (NAP)</span>
                    <span>45 Mins</span>
                  </div>
                  <p className="text-[11px] text-[#F5F2ED]/70">
                    Complimentary sedan transfer included with all Villa & Suite bookings.
                  </p>
                </div>

                <div className="p-3 bg-[#1A1A1A] rounded-sm border border-[#B5A264]/15 space-y-1">
                  <div className="flex items-center justify-between text-[#B5A264]">
                    <span className="font-semibold">Rome Fiumicino (FCO)</span>
                    <span>3.5 Hours</span>
                  </div>
                  <p className="text-[11px] text-[#F5F2ED]/70">
                    Chauffeur or direct helicopter shuttle (35 minutes flight).
                  </p>
                </div>

                <div className="p-3 bg-[#1A1A1A] rounded-sm border border-[#B5A264]/15 space-y-1">
                  <div className="flex items-center justify-between text-[#B5A264]">
                    <span className="font-semibold">Capri Island Marina</span>
                    <span>20 Mins by Boat</span>
                  </div>
                  <p className="text-[11px] text-[#F5F2ED]/70">
                    Private Riva speedboat transfer on demand.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#B5A264]/20">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 bg-[#B5A264] hover:bg-[#886F4B] text-[#1A1A1A] text-[10px] font-sans uppercase tracking-[0.25em] font-bold rounded-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

