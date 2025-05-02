
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
    <div className="border border-gray-300 overflow-hidden rounded-none">
      {/* Days of week header */}
      <div className="grid grid-cols-7 divide-x divide-gray-300">
        {weekDays.map((day, idx) => (
          <div 
            key={idx} 
            className={`text-center py-2 px-1 font-bold ${idx === 0 ? 'bg-blue-800 text-white' : idx === 6 ? 'bg-red-700 text-white' : 'bg-blue-700 text-white'}`}
          >
            {day}
            <div className="text-xs font-normal">
              {useNepaliLanguage ? '' : (idx === 0 ? 'Sunday' : idx === 1 ? 'Monday' : idx === 2 ? 'Tuesday' : idx === 3 ? 'Wednesday' : idx === 4 ? 'Thursday' : idx === 5 ? 'Friday' : 'Saturday')}
            </div>
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="bg-white grid grid-cols-7 divide-x divide-y divide-gray-300">
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
              
              // Whether it's a weekend (Saturday or Sunday)
              const isSaturday = dayIdx === 6;
              const isSunday = dayIdx === 0;
              
              return (
                <div 
                  key={dayIdx} 
                  className={`min-h-[80px] relative ${day === null ? 'bg-gray-100' : 'hover:bg-gray-50'} ${isSaturday ? 'bg-red-50' : isSunday ? 'bg-blue-50' : ''}`}
                  onClick={() => day !== null && onDateSelect(day)}
                >
                  {day !== null && (
                    <div className="h-full p-1 relative">
                      <div className={`flex justify-between ${isSelectedDay ? 'bg-yellow-100' : ''}`}>
                        <div className="flex flex-col items-start">
                          {/* Bikram date - larger and bold */}
                          <span className={`text-2xl font-bold 
                            ${isSaturday ? 'text-red-600' : isSunday ? 'text-blue-700' : 'text-gray-800'}
                            ${isCurrentDay ? 'ring-2 ring-red-500 px-1 rounded-full' : ''}`}
                          >
                            {useNepaliLanguage ? getNepaliDigits(day) : day}
                          </span>
                          
                          {/* Event name */}
                          {hasEvent && (
                            <span className="text-[9px] px-1 py-0.5 bg-blue-100 text-blue-800 rounded mt-1 block break-words w-full">
                              {eventName}
                            </span>
                          )}
                        </div>
                        
                        {/* English date - smaller and lighter */}
                        <span className="text-xs text-gray-500">
                          {/* This would be the equivalent English date */}
                          {useNepaliLanguage ? '' : (month === 4 && day === 1 ? 'Jul 17' : '')}
                        </span>
                      </div>
                      
                      {/* Tithi or lunar day - in small blue text */}
                      <div className="text-[10px] text-blue-600 mt-1">
                        {useNepaliLanguage ? 'चतुर्थी' : 'Chaturthi'}
                      </div>
                    </div>
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
