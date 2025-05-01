
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
      <div className="grid grid-cols-7 bg-nepali-red text-white font-bold py-2">
        {weekDays.map((day, idx) => (
          <div key={idx} className="text-center">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="bg-white">
        {weeks.map((week, weekIdx) => (
          <div key={weekIdx} className="grid grid-cols-7 border-t border-nepali-yellow/30">
            {week.map((day, dayIdx) => {
              // Check if this is current day, selected day, and if it has an event
              const isCurrentDay = currentDate && day === currentDate.day && 
                month === currentDate.month && year === currentDate.year;
                
              const isSelectedDay = selectedDate && day === selectedDate.day && 
                month === selectedDate.month && year === selectedDate.year;
                
              const eventName = day ? hasHoliday(month, day) : null;
              const hasEvent = !!eventName;
              
              // Combine classes based on conditions
              const dayClasses = `
                calendar-day min-h-[60px]
                ${day === null ? 'outside-month' : ''}
                ${isCurrentDay ? 'current' : ''}
                ${isSelectedDay ? 'selected' : ''}
                ${hasEvent ? 'has-event' : ''}
                ${day !== null ? 'hover:bg-nepali-yellow/20 cursor-pointer' : ''}
              `;
              
              return (
                <div 
                  key={dayIdx} 
                  className={dayClasses}
                  onClick={() => day !== null && onDateSelect(day)}
                >
                  {day !== null && (
                    <>
                      <span className="text-sm font-medium">
                        {useNepaliLanguage ? getNepaliDigits(day) : day}
                      </span>
                      {hasEvent && (
                        <span className="text-[8px] mt-0.5 px-1 py-0.5 bg-nepali-blue/10 text-nepali-blue rounded-sm truncate max-w-[90%] text-center">
                          {eventName}
                        </span>
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
