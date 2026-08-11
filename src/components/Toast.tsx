import React from 'react';
import { useHotel } from '../context/HotelContext';
import { CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Toast: React.FC = () => {
  const { toastMessage } = useHotel();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#0D2A22] text-[#F7F8F5] border border-[#C8A96E]/40 px-5 py-4 rounded-sm shadow-2xl backdrop-blur-md max-w-md"
        >
          <div className="text-[#C8A96E] shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <p className="text-xs font-sans tracking-wide text-[#F7F8F5]/90 leading-snug">
            {toastMessage}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

