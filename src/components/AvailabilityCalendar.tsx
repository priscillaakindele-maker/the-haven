import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

interface AvailabilityCalendarProps {
  checkInDate: string;
  checkOutDate: string;
  onSelectDates: (checkIn: string, checkOut: string) => void;
  pricePerNight?: number;
}

export const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  checkInDate,
  checkOutDate,
  onSelectDates,
  pricePerNight = 1850
}) => {
  // Current month view state (Default August 2026)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(7); // 0-indexed: 7 = August

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  // Simulated occupied dates for luxury realism
  const occupiedDays = [3, 4, 11, 12, 13, 22, 23];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const formatDateString = (day: number) => {
    const m = (currentMonth + 1).toString().padStart(2, '0');
    const d = day.toString().padStart(2, '0');
    return `${currentYear}-${m}-${d}`;
  };

  const handleDateClick = (day: number) => {
    if (occupiedDays.includes(day)) return;

    const clickedStr = formatDateString(day);

    if (!checkInDate || (checkInDate && checkOutDate)) {
      // Start new range
      onSelectDates(clickedStr, '');
    } else if (checkInDate && !checkOutDate) {
      if (new Date(clickedStr) > new Date(checkInDate)) {
        onSelectDates(checkInDate, clickedStr);
      } else {
        onSelectDates(clickedStr, '');
      }
    }
  };

  const isSelected = (day: number) => {
    const str = formatDateString(day);
    return str === checkInDate || str === checkOutDate;
  };

  const isInRange = (day: number) => {
    if (!checkInDate || !checkOutDate) return false;
    const current = new Date(formatDateString(day));
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    return current > start && current < end;
  };

  // Calculate nights
  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const diff = new Date(checkOutDate).getTime() - new Date(checkInDate).getTime();
    return Math.max(1, Math.ceil(diff / (1000 * 3600 * 24)));
  };

  const nights = calculateNights();

  return (
    <div className="bg-white border border-[#1A1A1A]/10 rounded-sm p-6 shadow-sm space-y-6">
      
      {/* Calendar Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#1A1A1A]/10">
        <div className="flex items-center gap-2 text-[#1A1A1A]">
          <CalendarIcon className="w-4 h-4 text-[#B5A264]" />
          <h4 className="font-serif text-lg italic tracking-wide">
            {monthNames[currentMonth]} {currentYear}
          </h4>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handlePrevMonth}
            className="p-2 text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-[#F5F2ED] rounded-sm transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-[#F5F2ED] rounded-sm transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 text-center text-[10px] font-sans uppercase tracking-[0.2em] text-[#B5A264] font-bold">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((w) => (
          <div key={w} className="py-1">
            {w}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-xs font-sans">
        {/* Blank offset days */}
        {Array.from({ length: firstDayIndex }).map((_, i) => (
          <div key={`empty-${i}`} className="p-3" />
        ))}

        {/* Days of Month */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const occupied = occupiedDays.includes(day);
          const selected = isSelected(day);
          const inRange = isInRange(day);

          return (
            <button
              key={day}
              disabled={occupied}
              onClick={() => handleDateClick(day)}
              className={`p-2.5 rounded-sm text-center transition-all relative cursor-pointer ${
                occupied
                  ? 'text-neutral-300 line-through cursor-not-allowed bg-neutral-100/50'
                  : selected
                  ? 'bg-[#1A1A1A] text-[#F5F2ED] font-semibold shadow-md'
                  : inRange
                  ? 'bg-[#B5A264]/20 text-[#1A1A1A] font-medium'
                  : 'hover:bg-[#B5A264]/15 text-[#1A1A1A]'
              }`}
            >
              <span>{day}</span>
            </button>
          );
        })}
      </div>

      {/* Legend & Selected Summary */}
      <div className="pt-4 border-t border-[#1A1A1A]/10 flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-[#B5A264] gap-3">
        <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-[0.1em]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A]" />
            <span className="text-[#1A1A1A]">Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B5A264]/30" />
            <span className="text-[#1A1A1A]">Stay Range</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
            <span className="text-[#1A1A1A]/60">Reserved</span>
          </div>
        </div>

        {nights > 0 && (
          <div className="text-right">
            <span className="font-semibold text-[#1A1A1A]">
              {nights} Night{nights > 1 ? 's' : ''} Selected
            </span>
            <span className="block text-[10px] text-[#B5A264] font-bold uppercase tracking-[0.1em]">
              Est. Total: ${(nights * pricePerNight).toLocaleString()} USD
            </span>
          </div>
        )}
      </div>

    </div>
  );
};

