
import React from 'react';
import { nepaliDaysEn, nepaliDaysNp } from '../utils/bikramConverter';
import { calculate as calculatePanchanga, getEventsForDate, toDevanagari, fromBikramSambat } from '../utils/panchanga';
import { CalendarEvent } from '../types/events';

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
    day: number;
    tithiName: string;
    tithiPaksha: string;
    englishDate: Date;
    eventText: string;
    eventDetail: string;
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
  events = {
    bikramFixedEvents: [],
    gregorianEvents: [],
    bikramRecurringEvents: []
  },
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

  // Function to handle the day click
  const handleDayClick = (day: number | null, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (day === null) return;
    
    console.log("Day clicked:", day);
    onDateSelect(day);

    // Get English date for this day
    const englishDate = getEnglishDate(day);
    
    // Get tithi for this day
    const tithi = getTithiForDay(day);
    
    // Get events from panchanga
    const dayEvents = getEventsForDate(englishDate, year, month - 1, day);
    const dayHasEvents = dayEvents.length > 0;

    // Always call onEventClick for any day, whether it has events or not
    if (onEventClick) {
      const eventText = dayEvents.map(e => e.name).join(', ');
      const eventDetail = dayEvents.map(e => e.detail).join('\n');
      
      onEventClick({
        day,
        tithiName: useNepaliLanguage ? tithi.name : tithi.nameEn,
        tithiPaksha: useNepaliLanguage ? tithi.paksha : tithi.pakshaEn,
        englishDate,
        eventText,
        eventDetail
      });
    }
  };

  // Split into weeks
  const weeks = [];
  for (let i = 0; i < daysArray.length; i += 7) {
    weeks.push(daysArray.slice(i, i + 7));
  }
  const weekDays = useNepaliLanguage ? nepaliDaysNp : nepaliDaysEn;

  // Function to get English date for a specific Bikram day
  const getEnglishDate = (day: number): Date => {
    return fromBikramSambat(year, month - 1, day);
  };

  // Function to get tithi for a given day
  const getTithiForDay = (day: number): {
    name: string;
    nameEn: string;
    paksha: string;
    pakshaEn: string;
  } => {
    if (!day) return {
      name: '',
      nameEn: '',
      paksha: '',
      pakshaEn: ''
    };
    const englishDate = getEnglishDate(day);
    const panchangaData = calculatePanchanga(englishDate);
    return {
      name: panchangaData?.tithi || '',
      nameEn: panchangaData?.tithi || '',
      paksha: panchangaData?.paksha || '',
      pakshaEn: panchangaData?.paksha || ''
    };
  };
  
  return (
    <div className="beautiful-calendar-grid overflow-hidden shadow-md">
      {/* Days of week header */}
      <div className="grid grid-cols-7 overflow-hidden">
        {weekDays.map((day, idx) => (
          <div key={idx} className={`text-center py-1 sm:py-2 px-1 font-bold text-xs sm:text-sm ${idx === 0 ? 'bg-blue-800 text-white' : idx === 6 ? 'bg-red-700 text-white' : 'bg-blue-700 text-white'}`}>
            <span className={useNepaliLanguage ? "font-laila" : ""}>
              {day}
            </span>
            <div className="text-[7px] sm:text-xs font-normal hidden sm:block">
              {useNepaliLanguage ? '' : idx === 0 ? 'Sunday' : idx === 1 ? 'Monday' : idx === 2 ? 'Tuesday' : idx === 3 ? 'Wednesday' : idx === 4 ? 'Thursday' : idx === 5 ? 'Friday' : 'Saturday'}
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
              const isCurrentDay = currentDate && day === currentDate.day && month === currentDate.month && year === currentDate.year;
              const isSelectedDay = selectedDate && day === selectedDate.day && month === selectedDate.month && year === selectedDate.year;

              // Whether it's a weekend (Saturday or Sunday)
              const isSaturday = dayIdx === 6;
              const isSunday = dayIdx === 0;
              
              if (day === null) {
                return <div key={dayIdx} className="min-h-[50px] sm:min-h-[80px] relative p-0 sm:p-0.5 md:p-1 bg-gray-100"></div>;
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

              // Get events from panchanga
              const dayEvents = getEventsForDate(englishDate, year, month - 1, day);
              const dayHasEvents = dayEvents.length > 0;
              const dayIsHoliday = dayEvents.some(e => e.holiday);
              const eventText = dayEvents.map(e => e.name).join(', ');
              const eventDetail = dayEvents.map(e => e.detail).join('\n');

              // Special rendering for purnima and amavasya
              const isPurnima = tithi.name === 'पूर्णिमा';
              const isAmavasya = tithi.name === 'अमावस्या';
              const specialTithi = isPurnima || isAmavasya;
              
              return (
                <div 
                  key={dayIdx} 
                  className={`min-h-[50px] sm:min-h-[80px] relative p-0 sm:p-0.5 md:p-1 
                    cursor-pointer hover:bg-gray-50 beautiful-calendar-day
                    ${isSaturday ? 'bg-red-50' : isSunday ? 'bg-blue-50' : ''} 
                    ${isCurrentDay ? 'bg-yellow-50' : ''}`} 
                  onClick={(e) => handleDayClick(day, e)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Day ${day}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleDayClick(day, e as unknown as React.MouseEvent);
                    }
                  }}
                >
                  <div className="h-full relative rounded-none">
                    <div className={`flex justify-between ${isSelectedDay ? 'bg-yellow-100 rounded-sm' : ''}`}>
                      <div className="flex flex-col items-start p-0.5 sm:p-1">
                        {/* Bikram date - larger and bold */}
                        <span className={`main-number noto-sans-devanagari
                          ${dayIsHoliday ? 'text-red-600' : isSaturday ? 'text-red-600' : isSunday ? 'text-blue-700' : 'text-gray-800'}
                          ${isCurrentDay ? 'today' : ''}`}>
                          {toDevanagari(day)}
                        </span>
                      </div>
                      
                      {/* English date - smaller and lighter */}
                      <span className="sub-number">
                        {englishDateStr}
                      </span>
                    </div>
                    
                    {/* Tithi display */}
                    <span className={`tithi-display noto-sans-devanagari ${specialTithi ? 'special' : ''}`}>
                      {isPurnima ? `🌕 ${tithi.name}` : isAmavasya ? `🌑 ${tithi.name}` : tithi.name}
                    </span>
                    
                    {/* Event dot */}
                    {dayHasEvents && <div className="event-dot"></div>}
                    
                    {/* Event text */}
                    {dayHasEvents && eventText && (
                      <div className="event-text">
                        <span className="noto-sans-devanagari">
                          {eventText}
                        </span>
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
          <span className={useNepaliLanguage ? "font-laila" : ""}>
            {useNepaliLanguage ? 'यो मिति अनुमानित गणनाबाट प्राप्त गरिएको हो।' : 'This calendar data is calculated using approximation.'}
          </span>
        </div>
      )}
    </div>
  );
};

export default CalendarGrid;
