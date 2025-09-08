import React from 'react';
import { toBikramSambat, calculate as calculatePanchanga, getEventsForDate, toDevanagari } from '@/utils/panchanga';
import { CalendarEvent } from '@/types/events';

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
    today.setHours(0, 0, 0, 0);

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="calendar-day empty" />
      );
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const cellDate = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), day));
      const isToday = today.toDateString() === cellDate.toDateString();
      const isSelected = selectedDate && selectedDate.toDateString() === cellDate.toDateString();
      
      // Get Bikram Sambat equivalent
      const bikramDate = toBikramSambat(cellDate);
      
      // Get panchanga data
      const panchangaData = calculatePanchanga(cellDate);
      
      // Get events from panchanga
      const dayEvents = getEventsForDate(cellDate, bikramDate.year, bikramDate.monthIndex, bikramDate.day);
      const dayHasEvents = dayEvents.length > 0;
      const dayIsHoliday = dayEvents.some(e => e.holiday);

      const isSaturday = cellDate.getDay() === 6;
      const isSunday = cellDate.getDay() === 0;

      let classes = 'calendar-day';
      if (isSaturday) classes += ' saturday';
      if (isToday) classes += ' today';
      if (dayHasEvents) classes += ' holiday';

      const isPurnima = panchangaData?.tithi === "पूर्णिमा";
      const isAmavasya = panchangaData?.tithi === "अमावस्या";

      let tithiClass = 'tithi-display';
      let tithiContent = panchangaData?.tithi || '';
      if (isPurnima) {
        tithiClass += ' special';
        tithiContent = `🌕 ${panchangaData?.tithi}`;
      } else if (isAmavasya) {
        tithiClass += ' special';
        tithiContent = `🌑 ${panchangaData?.tithi}`;
      }

      const eventDotContent = dayHasEvents ? '<div class="event-dot"></div>' : '';
      const eventNames = dayEvents.map(e => e.name).join(', ');

      days.push(
        <div 
          key={day}
          className={classes} 
          onClick={() => onDateSelect(cellDate)}
        >
          <span className={`main-number ${useNepaliLanguage ? 'noto-sans-devanagari' : ''}`}>
            {useNepaliLanguage ? toDevanagari(day) : day}
          </span>
          <span className={`sub-number ${useNepaliLanguage ? '' : 'noto-sans-devanagari'}`}>
            {useNepaliLanguage ? bikramDate.day : toDevanagari(bikramDate.day)}
          </span>
          <span className={`${tithiClass} noto-sans-devanagari`}>
            {tithiContent}
          </span>
          {dayHasEvents && <div className="event-dot"></div>}
          {dayHasEvents && eventNames && (
            <div className="event-text">
              <span className={useNepaliLanguage ? "noto-sans-devanagari" : ""}>
                {eventNames}
              </span>
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar-wrap">
      <div id="weekdays-grid" className="weekdays" aria-hidden="true">
        {(useNepaliLanguage ? dayNamesNp : dayNames).map((day, idx) => (
          <div key={idx} className="weekday">
            <span className={useNepaliLanguage ? "noto-sans-devanagari" : ""}>
              {day}
            </span>
          </div>
        ))}
      </div>
      <div id="calendar-body">
        {renderCalendar()}
      </div>
    </div>
  );
};

export default GregorianCalendarGrid;