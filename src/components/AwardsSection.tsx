import React from 'react';
import { useHotel } from '../context/HotelContext';
import { Trophy } from 'lucide-react';
import { motion } from 'motion/react';

export const AwardsSection: React.FC = () => {
  const { awards } = useHotel();

  return (
    <section className="py-20 bg-[#1A1A1A] text-[#F5F2ED] border-y border-[#B5A264]/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {awards.map((award, idx) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 bg-[#262626] rounded-sm border border-[#B5A264]/20 text-center space-y-2"
            >
              <div className="w-10 h-10 mx-auto rounded-sm bg-[#1A1A1A] border border-[#B5A264]/40 flex items-center justify-center text-[#B5A264]">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-[#F5F2ED] font-normal italic pt-2">
                {award.title}
              </h3>
              <p className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#B5A264] font-semibold">
                {award.issuer} • {award.year}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

