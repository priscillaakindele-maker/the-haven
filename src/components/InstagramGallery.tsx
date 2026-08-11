import React from 'react';
import { useHotel } from '../context/HotelContext';
import { Instagram, Maximize2 } from 'lucide-react';
import { motion } from 'motion/react';

export const InstagramGallery: React.FC = () => {
  const { galleryItems, setActiveLightboxImage, setCurrentPage } = useHotel();
  const previewItems = galleryItems.slice(0, 6);

  return (
    <section className="py-24 bg-[#F5F2ED] text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#1A1A1A]/10 pb-8 gap-6">
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.4em] text-[#B5A264] font-sans font-semibold flex items-center gap-2">
              <Instagram className="w-4 h-4 text-[#B5A264]" />
              <span>@thehaven.resort</span>
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-light italic text-[#1A1A1A]">
              Visual Moments of Tranquility
            </h2>
          </div>

          <button
            onClick={() => {
              setCurrentPage('gallery');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-[11px] uppercase tracking-[0.25em] font-sans text-[#1A1A1A] hover:text-[#B5A264] transition-colors cursor-pointer"
          >
            Explore Complete Gallery
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {previewItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              onClick={() => setActiveLightboxImage(item)}
              className="relative aspect-square rounded-sm overflow-hidden cursor-pointer group bg-[#1A1A1A] border border-[#1A1A1A]/10"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover img-zoom-hover opacity-95 group-hover:opacity-75 transition-all"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-3 text-center">
                <Maximize2 className="w-5 h-5 text-[#B5A264] mb-1" />
                <span className="text-[10px] font-sans uppercase tracking-wider line-clamp-1">
                  {item.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

