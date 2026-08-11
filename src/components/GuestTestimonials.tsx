import React from 'react';
import { useHotel } from '../context/HotelContext';
import { Quote, Star } from 'lucide-react';
import { motion } from 'motion/react';

export const GuestTestimonials: React.FC = () => {
  const { testimonials } = useHotel();

  return (
    <section className="py-24 bg-[#F5F2ED] text-[#1A1A1A] border-b border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-2">
          <span className="text-[11px] uppercase tracking-[0.4em] text-[#B5A264] font-sans font-semibold">
            Press & Critic Acclaim
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-light italic text-[#1A1A1A]">
            Voices of Acclaim
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-white p-8 rounded-sm border border-[#1A1A1A]/10 shadow-sm flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[#B5A264]">
                  <Quote className="w-8 h-8 opacity-40" />
                  <div className="flex items-center gap-1">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#B5A264] text-[#B5A264]" />
                    ))}
                  </div>
                </div>

                <p className="font-serif text-lg text-[#1A1A1A] italic leading-relaxed font-normal">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#1A1A1A]/10">
                <h3 className="font-sans text-[10px] uppercase tracking-[0.25em] font-bold text-[#1A1A1A]">
                  {item.author}
                </h3>
                <p className="text-[11px] font-sans text-[#B5A264] mt-0.5 font-medium">
                  {item.publication}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

