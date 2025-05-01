
import React from 'react';
import { nepaliDaysEn, nepaliDaysNp, hasHoliday, getNepaliDigits } from '../utils/bikramConverter';

interface CalendarGridProps {
  year: number;
  month: number; // 1-12
  days: number;
  startWeekDay: number; // 0-6, where 0 is Sunday
  currentDate?: {
    year: number;
    month: number;
    day: number;
  };
  selectedDate?: {
    year: number;
    month: number;
    day: number;
  };
  onDateSelect: (day: number) => void;
  useNepaliLanguage: boolean;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  year,
  month,
  days,
  startWeekDay,
  currentDate,
  selectedDate,
  onDateSelect,
  useNepaliLanguage
}) => {
  // Generate the days array
  const daysArray = [];
  const totalSlots = Math.ceil((days + startWeekDay) / 7) * 7;
  
  // Add empty slots for days before the 1st of month
  for (let i = 0; i < startWeekDay; i++) {
    daysArray.push(null);
  }
  
  // Add the days of the month
  for (let i = 1; i <= days; i++) {
    daysArray.push(i);
  }
  
  // Add empty slots for days after the end of month
  for (let i = days + startWeekDay; i < totalSlots; i++) {
    daysArray.push(null);
  }
  
  // Split into weeks
  const weeks = [];
  for (let i = 0; i < daysArray.length; i += 7) {
    weeks.push(daysArray.slice(i, i + 7));
  }

  const weekDays = useNepaliLanguage ? nepaliDaysNp : nepaliDaysEn;
  
  return (
    <div className="border border-nepali-yellow/30 rounded-lg bg-white shadow-md overflow-hidden">
      {/* Days of week header */}
      <div className="grid grid-cols-7 bg-nepali-blue text-white font-semibold">
        {weekDays.map((day, idx) => (
          <div 
            key={idx} 
            className={`text-center py-2 px-1 ${idx === 6 ? 'bg-nepali-red/90' : ''}`}
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="bg-white grid grid-cols-7 gap-px border-t border-nepali-yellow/10">
        {weeks.map((week, weekIdx) => (
          <React.Fragment key={weekIdx}>
            {week.map((day, dayIdx) => {
              // Check if this is current day, selected day, and if it has an event
              const isCurrentDay = currentDate && day === currentDate.day && 
                month === currentDate.month && year === currentDate.year;
                
              const isSelectedDay = selectedDate && day === selectedDate.day && 
                month === selectedDate.month && year === selectedDate.year;
                
              const eventName = day ? hasHoliday(month, day) : null;
              const hasEvent = !!eventName;
              
              // Whether it's a weekend (Saturday)
              const isSaturday = dayIdx === 6;
              
              // Combine classes based on conditions
              const dayClasses = `
                relative aspect-square flex flex-col p-1 transition-all
                ${day === null ? 'bg-gray-50/50' : 'hover:bg-nepali-yellow/10'}
                ${isCurrentDay ? 'bg-nepali-red/10' : ''}
                ${isSelectedDay ? 'ring-2 ring-nepali-yellow ring-inset' : ''}
                ${isSaturday && day !== null ? 'bg-nepali-red/5' : ''}
                ${day !== null ? 'cursor-pointer' : ''}
              `;
              
              return (
                <div 
                  key={dayIdx} 
                  className={dayClasses}
                  onClick={() => day !== null && onDateSelect(day)}
                >
                  {day !== null && (
                    <>
                      <div className="flex justify-between items-start w-full">
                        <div className={`
                          flex justify-center items-center 
                          ${isCurrentDay ? 'w-7 h-7 md:w-8 md:h-8 rounded-full bg-nepali-red text-white' : ''}
                          ${isSelectedDay && !isCurrentDay ? 'w-7 h-7 md:w-8 md:h-8 rounded-full bg-nepali-yellow text-nepali-dark' : ''}
                        `}>
                          <span className="text-sm md:text-base">
                            {useNepaliLanguage ? getNepaliDigits(day) : day}
                          </span>
                        </div>
                      </div>
                      
                      {hasEvent && (
                        <div className="mt-1">
                          <span className="text-[8px] md:text-[9px] px-1 py-0.5 bg-nepali-blue/10 text-nepali-blue rounded-sm block truncate max-w-full text-center">
                            {eventName}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
