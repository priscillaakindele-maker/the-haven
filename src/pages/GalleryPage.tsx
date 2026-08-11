import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { Maximize2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const GalleryPage: React.FC = () => {
  const { galleryItems, activeLightboxImage, setActiveLightboxImage } = useHotel();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  const categories = [
    { id: 'all', label: 'All Photographs' },
    { id: 'architecture', label: 'Architectural Purity' },
    { id: 'suites', label: 'Private Sanctuaries' },
    { id: 'dining', label: 'Michelin Dining' },
    { id: 'wellness', label: 'Spa & Hydrotherapy' },
  ];

  const handlePrevImage = () => {
    if (!activeLightboxImage) return;
    const currIndex = filteredItems.findIndex((i) => i.id === activeLightboxImage.id);
    const prevIndex = (currIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveLightboxImage(filteredItems[prevIndex]);
  };

  const handleNextImage = () => {
    if (!activeLightboxImage) return;
    const currIndex = filteredItems.findIndex((i) => i.id === activeLightboxImage.id);
    const nextIndex = (currIndex + 1) % filteredItems.length;
    setActiveLightboxImage(filteredItems[nextIndex]);
  };

  return (
    <div className="py-24 bg-[#F5F2ED] text-[#1A1A1A] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] uppercase tracking-[0.4em] text-[#B5A264] font-sans font-semibold">
            Visual Storytelling
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl font-light italic text-[#1A1A1A]">
            The Gallery
          </h1>
          <p className="text-xs sm:text-sm font-sans text-[#1A1A1A]/75 leading-relaxed font-light">
            An editorial visual journey celebrating architectural balance, sweeping Mediterranean light, and intimate moments of peace at The Haven.
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-6 text-xs font-sans">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-sm uppercase tracking-[0.2em] text-[10px] transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#1A1A1A] text-[#F5F2ED] font-bold shadow-md'
                    : 'bg-white text-[#1A1A1A]/80 hover:text-[#1A1A1A] border border-[#1A1A1A]/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry-Style Responsive Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => setActiveLightboxImage(item)}
              className="relative rounded-sm overflow-hidden cursor-pointer group bg-neutral-900 border border-[#1A1A1A]/10 break-inside-avoid shadow-sm hover:shadow-xl transition-all"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full object-cover img-zoom-hover filter brightness-95 group-hover:brightness-75 transition-all"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end text-white">
                <span className="text-[9px] font-sans uppercase tracking-[0.3em] text-[#B5A264] mb-1 font-semibold">
                  {item.category}
                </span>
                <h3 className="font-serif text-xl italic text-[#F5F2ED]">
                  {item.title}
                </h3>
                <p className="text-xs font-sans text-white/80 font-light mt-1 line-clamp-2">
                  {item.caption}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-[9px] font-sans uppercase tracking-[0.2em] text-[#B5A264] font-bold">
                  <Maximize2 className="w-3.5 h-3.5 text-[#B5A264]" />
                  <span>View High-Res Photo</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxImage && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 text-white">
            
            {/* Lightbox Header */}
            <div className="flex items-center justify-between z-10">
              <div className="space-y-0.5">
                <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#B5A264] font-bold">
                  {activeLightboxImage.category} Photography
                </span>
                <h3 className="font-serif text-xl italic text-[#F5F2ED]">
                  {activeLightboxImage.title}
                </h3>
              </div>

              <button
                onClick={() => setActiveLightboxImage(null)}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-sm border border-white/20 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Main Lightbox Image Viewport */}
            <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
              
              <button
                onClick={handlePrevImage}
                className="absolute left-2 sm:left-6 z-10 p-3 bg-black/60 hover:bg-[#B5A264] hover:text-[#1A1A1A] rounded-sm border border-white/20 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <motion.img
                key={activeLightboxImage.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={activeLightboxImage.imageUrl}
                alt={activeLightboxImage.title}
                className="max-h-[78vh] max-w-full object-contain rounded-sm border border-white/10 shadow-2xl"
              />

              <button
                onClick={handleNextImage}
                className="absolute right-2 sm:right-6 z-10 p-3 bg-black/60 hover:bg-[#B5A264] hover:text-[#1A1A1A] rounded-sm border border-white/20 transition-all cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

            </div>

            {/* Lightbox Footer Caption */}
            <div className="text-center max-w-xl mx-auto space-y-1 z-10 pb-2">
              <p className="text-xs font-sans text-white/80 font-light leading-relaxed">
                {activeLightboxImage.caption}
              </p>
            </div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

