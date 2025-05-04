
import React from 'react';
import { CalendarEvent } from '@/types/events';
import { getNepaliDigits, nepaliMonthsEn, nepaliMonthsNp } from '@/utils/bikramConverter';
import { hasEvents, getAllEventText, getAllEventDetails, isHoliday } from '@/utils/events';
import { BikramDateObj } from '@/utils/bikramConverter';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
interface UpcomingEventProps {
  events: {
    bikramFixedEvents: CalendarEvent[];
    gregorianEvents: CalendarEvent[];
    bikramRecurringEvents: CalendarEvent[];
  };
  currentDate: BikramDateObj;
  useNepaliLanguage: boolean;
  onEventClick: (year: number, month: number, day: number) => void;
  maxEvents?: number;
}
interface UpcomingEventItem {
  year: number;
  month: number;
  day: number;
  eventText: string;
  eventDetail: string;
  daysRemaining: number;
  englishDate: Date;
  isHoliday: boolean;
}
const UpcomingEvents: React.FC<UpcomingEventProps> = ({
  events,
  currentDate,
  useNepaliLanguage,
  onEventClick,
  maxEvents = 5
}) => {
  // Get today's date objects
  const todayBS = currentDate;
  const todayAD = currentDate.englishDate;

  // Find upcoming events for the next 365 days
  const upcomingEvents: UpcomingEventItem[] = React.useMemo(() => {
    const eventsList: UpcomingEventItem[] = [];
    const maxDaysToCheck = 365; // Check up to a year ahead

    // Clone today's date to use as a counter
    const checkDate = new Date(todayAD);
    let currentBikramYear = todayBS.year;
    let currentBikramMonth = todayBS.month;
    let currentBikramDay = todayBS.day;

    // Loop through the next maxDaysToCheck days
    for (let dayOffset = 0; dayOffset < maxDaysToCheck; dayOffset++) {
      // Set the date to check
      const checkDateObj = new Date(todayAD);
      checkDateObj.setDate(todayAD.getDate() + dayOffset);

      // Get the gregorian date components
      const checkGregorianYear = checkDateObj.getFullYear();
      const checkGregorianMonth = checkDateObj.getMonth() + 1;
      const checkGregorianDay = checkDateObj.getDate();

      // For simplicity in this MVP, we're incrementing day by day
      // A more accurate approach would use proper bikram date conversion for each day
      currentBikramDay++;
      if (currentBikramDay > 32) {
        // Simplified - actual days per month varies
        currentBikramDay = 1;
        currentBikramMonth++;
        if (currentBikramMonth > 12) {
          currentBikramMonth = 1;
          currentBikramYear++;
        }
      }

      // Check if this date has any events
      if (hasEvents(events.bikramFixedEvents, events.gregorianEvents, events.bikramRecurringEvents, currentBikramYear, currentBikramMonth, currentBikramDay, checkGregorianYear, checkGregorianMonth, checkGregorianDay)) {
        // Get the event text and detail
        const eventText = getAllEventText(events.bikramFixedEvents, events.gregorianEvents, events.bikramRecurringEvents, currentBikramYear, currentBikramMonth, currentBikramDay, checkGregorianYear, checkGregorianMonth, checkGregorianDay, useNepaliLanguage);
        const eventDetail = getAllEventDetails(events.bikramFixedEvents, events.gregorianEvents, events.bikramRecurringEvents, currentBikramYear, currentBikramMonth, currentBikramDay, checkGregorianYear, checkGregorianMonth, checkGregorianDay);

        // Check if the event is a holiday
        const isEventHoliday = isHoliday(events.bikramFixedEvents, events.gregorianEvents, events.bikramRecurringEvents, currentBikramYear, currentBikramMonth, currentBikramDay, checkGregorianYear, checkGregorianMonth, checkGregorianDay);
        eventsList.push({
          year: currentBikramYear,
          month: currentBikramMonth,
          day: currentBikramDay,
          eventText,
          eventDetail,
          daysRemaining: dayOffset,
          englishDate: checkDateObj,
          isHoliday: isEventHoliday
        });

        // Break if we've found enough events
        if (eventsList.length >= maxEvents) break;
      }
    }
    return eventsList;
  }, [events, todayBS, todayAD, useNepaliLanguage]);
  if (upcomingEvents.length === 0) {
    return null;
  }

  // Format date text based on language preference
  const formatDate = (month: number, day: number, year: number): string => {
    if (useNepaliLanguage) {
      return `${nepaliMonthsNp[month - 1]} ${getNepaliDigits(day)}, ${getNepaliDigits(year)}`;
    } else {
      return `${nepaliMonthsEn[month - 1]} ${day}, ${year}`;
    }
  };

  // Format days remaining text
  const formatDaysRemaining = (days: number): string => {
    if (days === 0) {
      return useNepaliLanguage ? 'आज' : 'Today';
    } else if (days === 1) {
      return useNepaliLanguage ? 'भोलि' : 'Tomorrow';
    } else {
      return useNepaliLanguage ? `${getNepaliDigits(days)} ${days > 1 ? 'दिन बाँकी' : 'दिन बाँकी'}` : `In ${days} ${days > 1 ? 'days' : 'day'}`;
    }
  };
  return <div className="mt-4 sm:mt-6 bg-white rounded-lg border border-gray-300 overflow-hidden beautiful-card no-print">
      <h3 className="py-2 px-4 bg-gradient-to-r from-blue-800 to-blue-600 text-white font-bold flex justify-between items-center">
        <span className={useNepaliLanguage ? "nepali-text" : ""}>
          {useNepaliLanguage ? 'आगामी कार्यक्रमहरू' : 'Upcoming Events'}
        </span>
      </h3>
      <div className="divide-y divide-gray-200">
        {upcomingEvents.map((event, index) => (
          <Card 
            key={index} 
            className={`p-0 border-0 rounded-none ${index === 0 ? 'upcoming-event-next' : 'upcoming-event-future'} animated-hover`}
          >
            <Button 
              variant="ghost" 
              onClick={() => onEventClick(event.year, event.month, event.day)} 
              className="w-full flex items-start p-3 h-auto justify-between text-center text-sm font-light"
            >
              <div className="flex flex-col">
                <span className={`font-bold text-sm text-black ${useNepaliLanguage ? "nepali-text" : ""} ${event.isHoliday ? 'text-red-600' : ''}`}>
                  {event.eventText}
                </span>
                <span className={`text-xs text-gray-500 ${useNepaliLanguage ? "nepali-text" : ""}`}>
                  {formatDate(event.month, event.day, event.year)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className={`text-xs ${event.daysRemaining === 0 ? 'bg-green-100 text-green-800' : event.daysRemaining === 1 ? 'bg-blue-100 text-blue-800' : 'bg-blue-100 text-blue-800'} py-1 px-2 rounded ${useNepaliLanguage ? "nepali-text" : ""}`}>
                  {formatDaysRemaining(event.daysRemaining)}
                </span>
                <CalendarIcon className="h-4 w-4 text-gray-500" />
              </div>
            </Button>
          </Card>
        ))}
      </div>
    </div>;
};
export default UpcomingEvents;
