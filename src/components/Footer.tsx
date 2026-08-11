import React, { useState } from 'react';
import { useHotel, PageView } from '../context/HotelContext';
import { Mail, Phone, MapPin, Award, Shield, ArrowUpRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage, cmsContent, showToast } = useHotel();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    showToast('Thank you for subscribing to The Haven Private Journal.');
    setEmail('');
  };

  const navLinks: { label: string; page: PageView }[] = [
    { label: 'Rooms & Suites', page: 'rooms' },
    { label: 'Michelin Dining', page: 'dining' },
    { label: 'Sanctuary Spa', page: 'spa' },
    { label: 'Curated Experiences', page: 'experiences' },
    { label: 'Visual Gallery', page: 'gallery' },
    { label: 'Contact & Concierge', page: 'contact' },
    { label: 'Reservation Engine', page: 'booking' },
    { label: 'Management Portal', page: 'admin' },
  ];

  return (
    <footer className="bg-[#0D2A22] text-[#F7F8F5] border-t border-[#C8A96E]/20 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Top Newsletter & Luxury Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#F7F8F5]/10">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="font-serif text-3xl sm:text-4xl tracking-[0.2em] text-[#F7F8F5] uppercase font-light">
              THE HAVEN
            </span>
            <p className="text-xs sm:text-sm font-sans text-[#F7F8F5]/75 leading-relaxed font-light max-w-md">
              An intimate Riviera cliffside sanctuary crafted for discerning travelers. Experience unparalleled privacy, bespoke butler service, and architectural brilliance on the edge of the Mediterranean horizon.
            </p>
            
            <div className="flex items-center gap-4 text-[10px] font-sans tracking-[0.25em] text-[#C8A96E] uppercase">
              <span className="flex items-center gap-1.5 font-semibold">
                <Award className="w-4 h-4 text-[#C8A96E]" /> Forbes 5-Star 2026
              </span>
              <span>•</span>
              <span className="font-semibold">3 Michelin Keys</span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4 bg-[#163C32] p-8 border border-[#C8A96E]/20 rounded-sm">
            <h3 className="font-serif text-2xl text-[#F7F8F5] font-normal italic">
              The Haven Private Journal
            </h3>
            <p className="text-xs font-sans text-[#F7F8F5]/75 font-light leading-relaxed">
              Subscribe to receive discreet seasonal invitations, private wine release dates, and exclusive villa previews.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-xs font-sans text-[#C8A96E] bg-[#0D2A22] p-4 border border-[#C8A96E]/30 rounded-sm">
                <Check className="w-4 h-4 text-[#C8A96E]" />
                <span>Your email has been added to our private guest register.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 pt-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 bg-[#0D2A22] border border-[#F7F8F5]/20 text-[#F7F8F5] placeholder-[#F7F8F5]/40 text-xs px-4 py-3.5 focus:outline-none focus:border-[#C8A96E] rounded-sm"
                />
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#C8A96E] hover:bg-[#F7F8F5] text-[#0D2A22] text-[11px] uppercase tracking-[0.2em] font-sans font-semibold transition-colors rounded-sm cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Middle Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16 border-b border-[#F7F8F5]/10">
          
          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#C8A96E] font-sans font-bold">
              Sitemap
            </h4>
            <ul className="space-y-2.5">
              {navLinks.slice(0, 4).map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => {
                      setCurrentPage(link.page);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-sans text-[#F7F8F5]/80 hover:text-[#C8A96E] transition-colors flex items-center gap-1 group cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#C8A96E]" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#C8A96E] font-sans font-bold">
              Sanctuary
            </h4>
            <ul className="space-y-2.5">
              {navLinks.slice(4).map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => {
                      setCurrentPage(link.page);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-sans text-[#F7F8F5]/80 hover:text-[#C8A96E] transition-colors flex items-center gap-1 group cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#C8A96E]" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4 md:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#C8A96E] font-sans font-bold">
              Concierge & Arrival
            </h4>
            <ul className="space-y-3 text-xs font-sans text-[#F7F8F5]/80 font-light">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C8A96E] shrink-0 mt-0.5" />
                <span>{cmsContent.locationAddress}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C8A96E] shrink-0" />
                <a href={`tel:${cmsContent.hotelPhone}`} className="hover:text-[#C8A96E] transition-colors">
                  {cmsContent.hotelPhone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C8A96E] shrink-0" />
                <a href={`mailto:${cmsContent.hotelEmail}`} className="hover:text-[#C8A96E] transition-colors">
                  {cmsContent.hotelEmail}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-[#F7F8F5]/50 font-light gap-4">
          <p>© 2026 The Haven Estate & Sanctuary. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                setCurrentPage('admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#C8A96E] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>
            <span>•</span>
            <span className="hover:text-[#C8A96E] cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-[#C8A96E] cursor-pointer">Terms of Stay</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

