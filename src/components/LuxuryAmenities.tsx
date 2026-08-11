import React from 'react';
import { Waves, UtensilsCrossed, Flower2, ShieldCheck, Anchor, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const LuxuryAmenities: React.FC = () => {
  const amenities = [
    {
      icon: Waves,
      title: 'Saltwater Cliff Infinity Pool',
      description: 'Suspended 120 meters above the Tyrrhenian Sea with heated saltwater and panoramic daybeds.'
    },
    {
      icon: UtensilsCrossed,
      title: '3-Michelin Star Dining',
      description: 'Hyper-seasonal tasting menus paired with rare vintage cellars under Executive Chef Jean-Luc Laurent.'
    },
    {
      icon: Flower2,
      title: 'Sanctuary Hydrotherapy Spa',
      description: 'Private mineral bath immersion, sound bath resonance therapy, and organic botanical rituals.'
    },
    {
      icon: ShieldCheck,
      title: '24/7 Personal Butler Service',
      description: 'Discreet, intuitive hospitality anticipating your every desire before it is spoken.'
    },
    {
      icon: Anchor,
      title: 'Private Yacht & Helipad Access',
      description: 'Direct maritime yacht charters and on-property helipad for effortless arrival.'
    },
    {
      icon: Sparkles,
      title: 'Private Cliffside Beach Club',
      description: 'Exclusive beach access with private loungers, champagne service, and towel valets.'
    }
  ];

  return (
    <section className="py-24 bg-[#F7F8F5] text-[#0D2A22] border-y border-[#0D2A22]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.4em] text-[#C8A96E] font-sans font-bold">
            Unrivaled Hospitality
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-light italic text-[#0D2A22]">
            Luxury Beyond Expectation
          </h2>
          <p className="text-xs sm:text-sm font-sans text-[#0D2A22]/75 leading-relaxed font-light">
            Every element of The Haven is thoughtfully engineered to deliver effortless peace, supreme privacy, and sensory delight.
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-8 rounded-sm border border-[#0D2A22]/10 shadow-sm hover:shadow-md transition-all duration-300 space-y-4 group"
              >
                <div className="w-12 h-12 rounded-sm bg-[#F7F8F5] border border-[#C8A96E]/30 flex items-center justify-center text-[#C8A96E] group-hover:bg-[#0D2A22] group-hover:text-[#F7F8F5] transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-[#0D2A22] font-normal italic">
                  {item.title}
                </h3>
                <p className="text-xs font-sans text-[#0D2A22]/75 leading-relaxed font-light">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

