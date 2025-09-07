import React from 'react';
import { convertToBikram, getNepaliDigits, nepaliMonthsEn, nepaliMonthsNp } from '@/utils/bikramConverter';
import { calculate as calculatePanchanga } from '@/utils/panchanga';
import { CalendarEvent } from '@/types/events';
import { hasEventsWithLunar, isHolidayWithLunar, getEventTextWithLunar } from '@/utils/events/eventUtils';

interface GregorianCalendarGridProps {
  currentDate: Date;
  useNepaliLanguage: boolean;
  events: {
    bikramFixedEvents: CalendarEvent[];
    gregorianEvents: CalendarEvent[];
    bikramRecurringEvents: CalendarEvent[];
  };
  onDateSelect: (date: Date) => void;
  selectedDate?: Date;
}

const GregorianCalendarGrid: React.FC<GregorianCalendarGridProps> = ({
  currentDate,
  useNepaliLanguage,
  events,
  onDateSelect,
  selectedDate
}) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const monthNamesNp = [
    'जनवरी', 'फेब्रुअरी', 'मार्च', 'अप्रिल', 'मे', 'जून',
    'जुलाई', 'अगस्ट', 'सेप्टेम्बर', 'अक्टोबर', 'नोभेम्बर', 'डिसेम्बर'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayNamesNp = ['आइत', 'सोम', 'मङ्गल', 'बुध', 'बिहि', 'शुक्र', 'शनि'];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];
    const today = new Date();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="min-h-[60px] sm:min-h-[80px] border border-border/20" />
      );
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = today.toDateString() === cellDate.toDateString();
      const isSelected = selectedDate && selectedDate.toDateString() === cellDate.toDateString();
      
      // Get Bikram Sambat equivalent
      const bikramDate = convertToBikram(cellDate);
      
      // Get panchanga data
      const panchangaData = calculatePanchanga(cellDate);
      
      // Check for events (including lunar events)
      const dayHasEvents = hasEventsWithLunar(
        events.bikramFixedEvents,
        events.gregorianEvents,
        events.bikramRecurringEvents,
        bikramDate.year, bikramDate.month, bikramDate.day,
        cellDate.getFullYear(), cellDate.getMonth() + 1, day
      );

      const dayIsHoliday = isHolidayWithLunar(
        events.bikramFixedEvents,
        events.gregorianEvents,
        events.bikramRecurringEvents,
        bikramDate.year, bikramDate.month, bikramDate.day,
        cellDate.getFullYear(), cellDate.getMonth() + 1, day
      );

      const eventText = dayHasEvents ? getEventTextWithLunar(
        events.bikramFixedEvents,
        events.gregorianEvents,
        events.bikramRecurringEvents,
        bikramDate.year, bikramDate.month, bikramDate.day,
        cellDate.getFullYear(), cellDate.getMonth() + 1, day,
        useNepaliLanguage
      ) : '';

      const isSaturday = cellDate.getDay() === 6;
      const isSunday = cellDate.getDay() === 0;

      days.push(
        <div
          key={day}
          className={`min-h-[50px] sm:min-h-[80px] border border-border/20 p-0 sm:p-0.5 md:p-1 relative cursor-pointer hover:bg-accent/50 transition-colors beautiful-calendar-day
            ${isToday ? 'bg-yellow-50 border-primary' : ''}
            ${isSelected ? 'bg-yellow-100 border-yellow-400' : ''}
            ${dayHasEvents ? 'bg-orange-50 dark:bg-orange-950/30' : ''}
            ${isSaturday ? 'bg-red-50' : isSunday ? 'bg-blue-50' : ''}
          `}
          onClick={() => onDateSelect(cellDate)}
        >
          {/* Gregorian day number (main) */}
          <div className={`text-base sm:text-lg font-bold mb-0.5
            ${dayIsHoliday ? 'text-red-600' : isSaturday ? 'text-red-600' : isSunday ? 'text-blue-700' : 'text-gray-800'}
            ${isToday ? 'bg-red-500 text-white px-1 rounded-full' : ''}
            ${useNepaliLanguage ? "font-laila" : ""}
          `}>
            {useNepaliLanguage ? getNepaliDigits(day) : day}
          </div>
          
          {/* Bikram Sambat day (small) */}
          <div className="text-xs text-muted-foreground">
            {useNepaliLanguage 
              ? `${getNepaliDigits(bikramDate.day)} ${nepaliMonthsNp[bikramDate.month - 1]}`
              : `${bikramDate.day} ${nepaliMonthsEn[bikramDate.month - 1]}`
            }
          </div>
          
          {/* Tithi */}
          {panchangaData && (
            <div className="text-xs text-orange-600 dark:text-orange-400 truncate">
              {panchangaData.tithi}
            </div>
          )}
          
          {/* Event indicator dot */}
          {dayHasEvents && (
            <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
          )}
          
          {/* Event text */}
          {dayHasEvents && (
            <div className="text-[7px] sm:text-[8px] text-red-800 bg-rose-50 rounded-sm mt-1 px-1 truncate">
              <span className={useNepaliLanguage ? "font-laila" : ""}>
                {eventText}
              </span>
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="beautiful-calendar-grid overflow-hidden shadow-md">
      {/* Days of week header */}
      <div className="grid grid-cols-7 overflow-hidden">
        {(useNepaliLanguage ? dayNamesNp : dayNames).map((day, idx) => (
          <div key={idx} className={`text-center py-1 sm:py-2 px-1 font-bold text-xs sm:text-sm 
            ${idx === 0 ? 'bg-blue-800 text-white' : idx === 6 ? 'bg-red-700 text-white' : 'bg-blue-700 text-white'}`}>
            <span className={useNepaliLanguage ? "font-laila" : ""}>
              {day}
            </span>
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="bg-white grid grid-cols-7 divide-x divide-y divide-gray-300">
        {renderCalendar()}
      </div>
    </div>
  );
};

export default GregorianCalendarGrid;