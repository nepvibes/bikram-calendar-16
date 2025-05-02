import React from 'react';
import { nepaliDaysEn, nepaliDaysNp, getNepaliDigits } from '../utils/bikramConverter';
import { calculateTithi } from '../utils/tithiCalculation';
import { CalendarEvent } from '../types/events';
import { hasEvents, getAllEventText } from '../utils/eventsHandler';

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
  englishStartDate: Date;
  onDateSelect: (day: number) => void;
  useNepaliLanguage: boolean;
  events?: {
    bikramFixedEvents: CalendarEvent[];
    gregorianEvents: CalendarEvent[];
    bikramRecurringEvents: CalendarEvent[];
  };
  onEventClick?: (eventData: {
    day: number,
    tithiName: string,
    tithiPaksha: string,
    englishDate: Date,
    eventText: string,
    eventDetail: string
  }) => void;
  usingApproximation?: boolean;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  year,
  month,
  days,
  startWeekDay,
  currentDate,
  selectedDate,
  englishStartDate,
  onDateSelect,
  useNepaliLanguage,
  events = { bikramFixedEvents: [], gregorianEvents: [], bikramRecurringEvents: [] },
  onEventClick,
  usingApproximation = false
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

  // Function to get English date for a specific Bikram day
  const getEnglishDate = (day: number): Date => {
    // Clone the start date and add days
    const dayDate = new Date(englishStartDate);
    dayDate.setDate(englishStartDate.getDate() + (day - 1));
    return dayDate;
  };
  
  // Function to get tithi for a given day
  const getTithiForDay = (day: number): { name: string, nameEn: string, paksha: string, pakshaEn: string } => {
    if (!day) return { name: '', nameEn: '', paksha: '', pakshaEn: '' };
    
    const englishDate = getEnglishDate(day);
    const tithiData = calculateTithi(englishDate);
    
    return {
      name: tithiData.tithiName,
      nameEn: tithiData.tithiNameEn,
      paksha: tithiData.paksha,
      pakshaEn: tithiData.pakshaEn
    };
  };
  
  return (
    <div className="border border-gray-300 overflow-hidden rounded-none">
      {/* Days of week header */}
      <div className="grid grid-cols-7 divide-x divide-gray-300">
        {weekDays.map((day, idx) => (
          <div 
            key={idx} 
            className={`text-center py-1 sm:py-2 px-1 font-bold text-xs sm:text-sm ${idx === 0 ? 'bg-blue-800 text-white' : idx === 6 ? 'bg-red-700 text-white' : 'bg-blue-700 text-white'}`}
          >
            {day}
            <div className="text-[7px] sm:text-xs font-normal hidden sm:block">
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
              // Check if this is current day, selected day
              const isCurrentDay = currentDate && day === currentDate.day && 
                month === currentDate.month && year === currentDate.year;
                
              const isSelectedDay = selectedDate && day === selectedDate.day && 
                month === selectedDate.month && year === selectedDate.year;
                
              // Whether it's a weekend (Saturday or Sunday)
              const isSaturday = dayIdx === 6;
              const isSunday = dayIdx === 0;
              
              if (day === null) {
                return (
                  <div 
                    key={dayIdx} 
                    className="min-h-[50px] sm:min-h-[80px] relative p-0 sm:p-0.5 md:p-1 bg-gray-100"
                  ></div>
                );
              }
              
              // Get English date for this day
              const englishDate = getEnglishDate(day);
              const englishDay = englishDate.getDate();
              const englishMonth = englishDate.getMonth() + 1;
              const englishYear = englishDate.getFullYear();
              
              // Get tithi for this day
              const tithi = getTithiForDay(day);
              
              // Format English date
              const englishDateStr = englishDate.getDate() === 1 ? englishDate.toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
              }) : englishDate.getDate().toString();
              
              // Check for events
              const dayHasEvents = hasEvents(
                events.bikramFixedEvents,
                events.gregorianEvents,
                events.bikramRecurringEvents,
                year,
                month,
                day,
                englishYear,
                englishMonth,
                englishDay
              );
              
              // Get event text if there's an event
              const eventText = dayHasEvents ? getAllEventText(
                events.bikramFixedEvents,
                events.gregorianEvents,
                events.bikramRecurringEvents,
                year,
                month,
                day,
                englishYear,
                englishMonth,
                englishDay,
                useNepaliLanguage
              ) : '';
              
              // Special rendering for purnima and amavasya
              const isPurnima = tithi.nameEn === 'Purnima';
              const isAmavasya = tithi.nameEn === 'Amavasya';
              const specialTithi = isPurnima || isAmavasya;
              
              return (
                <div 
                  key={dayIdx} 
                  className={`min-h-[50px] sm:min-h-[80px] relative p-0 sm:p-0.5 md:p-1 
                    cursor-pointer hover:bg-gray-50 
                    ${isSaturday ? 'bg-red-50' : isSunday ? 'bg-blue-50' : ''} 
                    ${isCurrentDay ? 'bg-yellow-50' : ''}`}
                  onClick={() => {
                    onDateSelect(day);
                    
                    // If there's an event and onEventClick handler
                    if (dayHasEvents && onEventClick) {
                      onEventClick({
                        day,
                        tithiName: useNepaliLanguage ? tithi.name : tithi.nameEn,
                        tithiPaksha: useNepaliLanguage ? tithi.paksha : tithi.pakshaEn,
                        englishDate: englishDate,
                        eventText,
                        eventDetail: dayHasEvents ? getAllEventText(
                          events.bikramFixedEvents,
                          events.gregorianEvents,
                          events.bikramRecurringEvents,
                          year,
                          month,
                          day,
                          englishYear,
                          englishMonth,
                          englishDay
                        ) : ''
                      });
                    }
                  }}
                >
                  <div className="h-full relative">
                    <div className={`flex justify-between ${isSelectedDay ? 'bg-yellow-100 rounded-sm' : ''}`}>
                      <div className="flex flex-col items-start p-0.5 sm:p-1">
                        {/* Bikram date - larger and bold */}
                        <span className={`text-base sm:text-lg md:text-xl lg:text-2xl font-bold 
                          ${isSaturday ? 'text-red-600' : isSunday ? 'text-blue-700' : 'text-gray-800'}
                          ${isCurrentDay ? 'ring-1 ring-red-500 px-0.5 sm:px-1 rounded-full' : ''}`}
                        >
                          {useNepaliLanguage ? getNepaliDigits(day) : day}
                        </span>
                      </div>
                      
                      {/* English date - smaller and lighter */}
                      <span className="text-[6px] sm:text-[8px] md:text-xs text-gray-500 p-0.5">
                        {englishDateStr}
                      </span>
                    </div>
                    
                    {/* Event display */}
                    {dayHasEvents && (
                      <div className="text-[7px] sm:text-[8px] md:text-xs px-1 py-0.5 bg-red-100 text-red-800 rounded-sm mt-0.5 block truncate w-full text-center">
                        {eventText}
                      </div>
                    )}
                    
                    {/* Special tithi display (purnima/amavasya) */}
                    {specialTithi && !dayHasEvents && (
                      <div className="text-[7px] sm:text-[8px] md:text-xs px-1 py-0.5 bg-yellow-100 text-yellow-800 rounded-sm mt-0.5 block truncate w-full text-center">
                        {useNepaliLanguage ? tithi.name : tithi.nameEn}
                      </div>
                    )}
                    
                    {/* Regular tithi display */}
                    {!specialTithi && !dayHasEvents && (
                      <div className="text-[7px] sm:text-[8px] md:text-[10px] text-blue-600 mt-0.5 px-1">
                        {useNepaliLanguage ? tithi.name : tithi.nameEn}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
      
      {/* Approximation notice */}
      {usingApproximation && (
        <div className="bg-yellow-50 text-yellow-800 text-xs p-2 text-center border-t border-yellow-200">
          {useNepaliLanguage ? 
            'यो मिति अनुमानित गणनाबाट प्राप्त गरिएको हो।' : 
            'This calendar data is calculated using approximation.'}
        </div>
      )}
    </div>
  );
};

export default CalendarGrid;
