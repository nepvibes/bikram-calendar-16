
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
      <div className="grid grid-cols-7 gap-px bg-nepali-red text-white font-bold py-2">
        {weekDays.map((day, idx) => (
          <div key={idx} className="text-center">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="bg-white">
        {weeks.map((week, weekIdx) => (
          <div key={weekIdx} className="grid grid-cols-7 gap-px border-t border-nepali-yellow/20 hover:border-nepali-yellow/40 transition-colors">
            {week.map((day, dayIdx) => {
              // Check if this is current day, selected day, and if it has an event
              const isCurrentDay = currentDate && day === currentDate.day && 
                month === currentDate.month && year === currentDate.year;
                
              const isSelectedDay = selectedDate && day === selectedDate.day && 
                month === selectedDate.month && year === selectedDate.year;
                
              const eventName = day ? hasHoliday(month, day) : null;
              const hasEvent = !!eventName;
              
              // Whether it's a weekend (Saturday or Sunday)
              const isWeekend = dayIdx === 0 || dayIdx === 6;
              
              // Combine classes based on conditions
              const dayClasses = `
                relative flex flex-col p-1 md:p-2 min-h-[60px] md:min-h-[80px] transition-all
                ${day === null ? 'bg-gray-50/50' : 'hover:bg-nepali-yellow/10'}
                ${isCurrentDay ? 'bg-nepali-red/10 text-nepali-red font-bold' : ''}
                ${isSelectedDay ? 'bg-nepali-yellow/20 text-nepali-dark font-bold ring-2 ring-nepali-yellow ring-inset' : ''}
                ${hasEvent ? 'border-b-2 border-nepali-blue/30' : ''}
                ${isWeekend && day !== null ? 'bg-nepali-red/5' : ''}
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
                        <span className={`inline-flex justify-center items-center text-sm md:text-base ${isCurrentDay ? 'text-nepali-red' : ''}`}>
                          {useNepaliLanguage ? getNepaliDigits(day) : day}
                        </span>
                        
                        {(isCurrentDay || isSelectedDay) && (
                          <span className="w-2 h-2 rounded-full bg-nepali-red"></span>
                        )}
                      </div>
                      
                      {hasEvent && (
                        <div className="mt-1 md:mt-2">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
