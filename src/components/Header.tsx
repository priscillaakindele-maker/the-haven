import React, { useState, useEffect } from 'react';
import { useHotel, PageView } from '../context/HotelContext';
import { Sparkles, Menu, X, Calendar, Shield, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Header: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    setIsConciergeOpen,
    cmsContent,
  } = useHotel();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; page: PageView }[] = [
    { label: 'Rooms', page: 'rooms' },
    { label: 'Dining', page: 'dining' },
    { label: 'Wellness', page: 'spa' },
    { label: 'Experiences', page: 'experiences' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: PageView) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Announcement Banner */}
      {cmsContent.announcementBanner && (
        <div className="bg-[#0D2A22] text-[#F7F8F5] text-[10px] py-2 px-4 sm:px-6 text-center tracking-[0.25em] uppercase font-sans border-b border-[#C8A96E]/30 flex items-center justify-center gap-2 sm:gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96E] animate-pulse shrink-0"></span>
          <span className="truncate">{cmsContent.announcementBanner}</span>
          <span className="hidden md:inline text-[#C8A96E] font-serif italic text-xs font-normal ml-2">— Est. 1994 Riviera Sanctuary</span>
        </div>
      )}

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-[#F7F8F5]/98 backdrop-blur-md border-[#0D2A22]/10 py-3 sm:py-4 shadow-sm'
            : 'bg-[#F7F8F5] border-[#0D2A22]/10 py-4 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          
          {/* Est tag & Brand Logo */}
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="hidden md:inline-block text-[10px] tracking-[0.3em] uppercase opacity-60 font-sans text-[#0D2A22]">
              Est. 1994
            </span>
            <button
              onClick={() => handleNavClick('home')}
              className="text-left focus:outline-none flex flex-col group cursor-pointer"
            >
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] text-[#0D2A22] font-light uppercase transition-colors group-hover:text-[#C8A96E]">
                THE HAVEN
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-[11px] tracking-[0.2em] uppercase font-medium">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`transition-colors relative py-1 cursor-pointer ${
                  currentPage === item.page
                    ? 'text-[#0D2A22] font-semibold border-b-2 border-[#C8A96E]'
                    : 'text-[#0D2A22]/70 hover:text-[#0D2A22]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions - Desktop & Tablet */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* AI Concierge Button */}
            <button
              onClick={() => setIsConciergeOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-[10px] font-sans tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#0D2A22] hover:text-[#C8A96E] border border-[#0D2A22]/20 hover:border-[#C8A96E] transition-all bg-white/80 shadow-xs cursor-pointer rounded-sm"
              title="Digital Concierge"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C8A96E]" />
              <span className="hidden xs:inline">Concierge</span>
            </button>

            {/* Admin Quick Link */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`p-2 border transition-colors cursor-pointer rounded-sm ${
                currentPage === 'admin'
                  ? 'border-[#C8A96E] text-[#C8A96E] bg-[#0D2A22]'
                  : 'border-[#0D2A22]/20 text-[#0D2A22]/70 hover:text-[#0D2A22] hover:border-[#0D2A22] bg-white/60'
              }`}
              title="Admin Portal"
            >
              <Shield className="w-4 h-4" />
            </button>

            {/* Book Button - Visible on ALL screens */}
            <button
              onClick={() => handleNavClick('booking')}
              className="bg-[#0D2A22] text-[#F7F8F5] px-4 sm:px-6 py-2 sm:py-2.5 text-[10px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold hover:bg-[#C8A96E] hover:text-[#0D2A22] transition-colors cursor-pointer rounded-sm shadow-xs"
            >
              Book
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#0D2A22] hover:text-[#C8A96E] transition-colors cursor-pointer border border-[#0D2A22]/10 bg-white/60 rounded-sm"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[65px] sm:top-[75px] z-50 bg-[#F7F8F5] border-b border-[#0D2A22]/20 shadow-2xl py-6 px-6 lg:hidden max-h-[calc(100vh-80px)] overflow-y-auto"
          >
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => handleNavClick('home')}
                className={`text-left text-sm uppercase tracking-[0.2em] font-sans py-2.5 border-b border-[#0D2A22]/10 flex items-center justify-between cursor-pointer ${
                  currentPage === 'home'
                    ? 'text-[#C8A96E] font-semibold'
                    : 'text-[#0D2A22]'
                }`}
              >
                <span>Home</span>
                <ChevronRight className="w-4 h-4 text-[#C8A96E]" />
              </button>

              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`text-left text-sm uppercase tracking-[0.2em] font-sans py-2.5 border-b border-[#0D2A22]/10 flex items-center justify-between cursor-pointer ${
                    currentPage === item.page
                      ? 'text-[#C8A96E] font-semibold'
                      : 'text-[#0D2A22]'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#C8A96E]" />
                </button>
              ))}

              <button
                onClick={() => handleNavClick('admin')}
                className="text-left text-sm uppercase tracking-[0.2em] font-sans py-3 text-[#C8A96E] flex items-center gap-2 cursor-pointer border-b border-[#0D2A22]/10"
              >
                <Shield className="w-4 h-4 text-[#C8A96E]" />
                <span>Admin Dashboard</span>
              </button>

              <div className="pt-3 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsConciergeOpen(true);
                  }}
                  className="w-full py-3 bg-white text-[#0D2A22] border border-[#0D2A22]/20 text-xs font-sans tracking-[0.2em] uppercase font-bold hover:border-[#C8A96E] transition-colors rounded-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#C8A96E]" />
                  <span>Ask AI Concierge Aurelia</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleNavClick('booking');
                  }}
                  className="w-full py-3.5 bg-[#0D2A22] text-[#F7F8F5] text-xs font-sans tracking-[0.2em] uppercase font-bold hover:bg-[#C8A96E] hover:text-[#0D2A22] transition-colors rounded-sm cursor-pointer shadow-md"
                >
                  Book Your Stay
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

