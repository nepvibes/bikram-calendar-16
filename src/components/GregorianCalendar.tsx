import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { convertToBikram, getNepaliDigits, nepaliMonthsEn, nepaliMonthsNp } from '@/utils/bikramConverter';
import { calculate as calculatePanchanga } from '@/utils/panchanga';
import { getAllEventText } from '@/utils/events';
import { CalendarEvent } from '@/types/events';
import { loadEventsForYear } from '@/utils/events';

interface GregorianCalendarProps {
  useNepaliLanguage: boolean;
  onClose: () => void;
}

const GregorianCalendar: React.FC<GregorianCalendarProps> = ({
  useNepaliLanguage,
  onClose
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<{
    bikramFixedEvents: CalendarEvent[];
    gregorianEvents: CalendarEvent[];
    bikramRecurringEvents: CalendarEvent[];
  }>({
    bikramFixedEvents: [],
    gregorianEvents: [],
    bikramRecurringEvents: [],
  });

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

  // Load events when component mounts or year changes
  useEffect(() => {
    const bikramYear = convertToBikram(currentDate).year;
    loadEventsForYear(bikramYear).then(loadedEvents => {
      setEvents(loadedEvents);
    });
  }, [currentDate.getFullYear()]);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-20 border border-border/20" />
      );
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = new Date().toDateString() === cellDate.toDateString();
      
      // Get Bikram Sambat equivalent
      const bikramDate = convertToBikram(cellDate);
      
      // Get panchanga data
      const panchangaData = calculatePanchanga(cellDate);
      
      // Check for events
      const hasEvents = events.gregorianEvents.some(event => {
        const [eventMonth, eventDay] = event.date.split('/').map(Number);
        return eventMonth === cellDate.getMonth() + 1 && eventDay === day;
      }) || events.bikramRecurringEvents.some(event => {
        const [eventMonth, eventDay] = event.date.split('/').map(Number);
        return eventMonth === bikramDate.month && eventDay === bikramDate.day;
      }) || events.bikramFixedEvents.some(event => {
        const [eventYear, eventMonth, eventDay] = event.date.split('/').map(Number);
        return eventYear === bikramDate.year && eventMonth === bikramDate.month && eventDay === bikramDate.day;
      });

      days.push(
        <div
          key={day}
          className={`h-20 border border-border/20 p-1 relative cursor-pointer hover:bg-accent/50 transition-colors ${
            isToday ? 'bg-primary/10 border-primary' : ''
          } ${hasEvents ? 'bg-orange-50 dark:bg-orange-950/30' : ''}`}
          title={`${cellDate.toLocaleDateString()} | ${bikramDate.year} ${nepaliMonthsEn[bikramDate.month - 1]} ${bikramDate.day} BS | ${panchangaData?.tithi || ''}`}
        >
          {/* Gregorian day number */}
          <div className={`text-sm font-semibold ${isToday ? 'text-primary' : 'text-foreground'}`}>
            {useNepaliLanguage ? getNepaliDigits(day) : day}
          </div>
          
          {/* Bikram Sambat day */}
          <div className="text-xs text-muted-foreground mt-1">
            {useNepaliLanguage 
              ? `${getNepaliDigits(bikramDate.day)} ${nepaliMonthsNp[bikramDate.month - 1]}`
              : `${bikramDate.day} ${nepaliMonthsEn[bikramDate.month - 1]}`
            }
          </div>
          
          {/* Tithi */}
          {panchangaData && (
            <div className="text-xs text-orange-600 dark:text-orange-400 mt-1 truncate">
              {panchangaData.tithi}
            </div>
          )}
          
          {/* Event indicator */}
          {hasEvents && (
            <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-4">
          <CalendarIcon className="h-6 w-6" />
          <CardTitle className="text-xl">
            {useNepaliLanguage ? 'अंग्रेजी क्यालेन्डर' : 'Gregorian Calendar'}
          </CardTitle>
        </div>
        <Button variant="outline" onClick={onClose} size="sm">
          {useNepaliLanguage ? 'बन्द गर्नुहोस्' : 'Close'}
        </Button>
      </CardHeader>
      
      <CardContent>
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" onClick={handlePrevMonth} size="sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">
              {useNepaliLanguage
                ? `${monthNamesNp[currentDate.getMonth()]} ${getNepaliDigits(currentDate.getFullYear())}`
                : `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
              }
            </h2>
            <Button variant="outline" onClick={handleToday} size="sm">
              {useNepaliLanguage ? 'आज' : 'Today'}
            </Button>
          </div>
          
          <Button variant="outline" onClick={handleNextMonth} size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-0 mb-2">
          {(useNepaliLanguage ? dayNamesNp : dayNames).map((day) => (
            <div key={day} className="h-10 flex items-center justify-center font-semibold text-muted-foreground border border-border/20">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-0 border-t border-l border-border/20">
          {renderCalendar()}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary/10 border border-primary rounded"></div>
            <span>{useNepaliLanguage ? 'आज' : 'Today'}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded"></div>
            <span>{useNepaliLanguage ? 'घटना' : 'Events'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GregorianCalendar;