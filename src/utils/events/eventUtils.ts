import { CalendarEvent } from "../../types/events";
import { getEventsForDate } from "../panchanga";

// Synchronous wrapper for event checking with lunar events support
export function hasEventsWithLunar(
  bikramFixedEvents: CalendarEvent[],
  gregorianEvents: CalendarEvent[],
  bikramRecurringEvents: CalendarEvent[],
  bikramYear: number,
  bikramMonth: number,
  bikramDay: number,
  gregorianYear: number,
  gregorianMonth: number,
  gregorianDay: number
): boolean {
  // Check regular events first
  const formatMonthDay = (month: number, day: number) => {
    return (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;
  };

  const formattedGregorianDate = formatMonthDay(gregorianMonth, gregorianDay);
  const formattedBikramRecurringDate = formatMonthDay(bikramMonth, bikramDay);
  const formattedFixedDate = bikramYear + "/" + formatMonthDay(bikramMonth, bikramDay);

  // Check gregorian events
  for (const event of gregorianEvents) {
    if ((event.startYear && gregorianYear < event.startYear) || 
        (event.endYear && gregorianYear > event.endYear)) {
      continue;
    }
    if (event.date === formattedGregorianDate) {
      return true;
    }
  }

  // Check bikram recurring events
  for (const event of bikramRecurringEvents) {
    if ((event.startYear && bikramYear < event.startYear) || 
        (event.endYear && bikramYear > event.endYear)) {
      continue;
    }
    if (event.date === formattedBikramRecurringDate) {
      return true;
    }
  }

  // Check bikram fixed events
  for (const event of bikramFixedEvents) {
    if (event.date === formattedFixedDate) {
      return true;
    }
  }

  // Check lunar events via panchanga
  try {
    const gregorianDate = new Date(Date.UTC(gregorianYear, gregorianMonth - 1, gregorianDay));
    const panchangaEvents = getEventsForDate(gregorianDate, bikramYear, bikramMonth - 1, bikramDay);
    return panchangaEvents && Array.isArray(panchangaEvents) && panchangaEvents.length > 0;
  } catch (error) {
    console.warn('Failed to check lunar events:', error);
    return false;
  }
}

// Synchronous wrapper for getting event text with lunar events support
export function getEventTextWithLunar(
  bikramFixedEvents: CalendarEvent[],
  gregorianEvents: CalendarEvent[],
  bikramRecurringEvents: CalendarEvent[],
  bikramYear: number,
  bikramMonth: number,
  bikramDay: number,
  gregorianYear: number,
  gregorianMonth: number,
  gregorianDay: number,
  useNepaliLanguage: boolean = true
): string {
  const texts: string[] = [];
  
  const formatMonthDay = (month: number, day: number) => {
    return (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;
  };

  const formattedGregorianDate = formatMonthDay(gregorianMonth, gregorianDay);
  const formattedBikramRecurringDate = formatMonthDay(bikramMonth, bikramDay);
  const formattedFixedDate = bikramYear + "/" + formatMonthDay(bikramMonth, bikramDay);

  // Check gregorian events
  for (const event of gregorianEvents) {
    if ((event.startYear && gregorianYear < event.startYear) || 
        (event.endYear && gregorianYear > event.endYear)) {
      continue;
    }
    if (event.date === formattedGregorianDate) {
      texts.push(useNepaliLanguage ? event.event : (event.eventEn || event.event));
    }
  }

  // Check bikram recurring events
  for (const event of bikramRecurringEvents) {
    if ((event.startYear && bikramYear < event.startYear) || 
        (event.endYear && bikramYear > event.endYear)) {
      continue;
    }
    if (event.date === formattedBikramRecurringDate) {
      texts.push(useNepaliLanguage ? event.event : (event.eventEn || event.event));
    }
  }

  // Check bikram fixed events
  for (const event of bikramFixedEvents) {
    if (event.date === formattedFixedDate) {
      texts.push(useNepaliLanguage ? event.event : (event.eventEn || event.event));
    }
  }

  // Check lunar events via panchanga
  try {
    const gregorianDate = new Date(Date.UTC(gregorianYear, gregorianMonth - 1, gregorianDay));
    const panchangaEvents = getEventsForDate(gregorianDate, bikramYear, bikramMonth - 1, bikramDay);
    if (panchangaEvents && Array.isArray(panchangaEvents)) {
      panchangaEvents.forEach(event => {
        if (event && event.name && !texts.some(text => text.includes(event.name))) {
          texts.push(event.name);
        }
      });
    }
  } catch (error) {
    console.warn('Failed to get lunar event text:', error);
  }

  return texts.join(', ');
}

// Check if a day is a holiday (including lunar holidays)
export function isHolidayWithLunar(
  bikramFixedEvents: CalendarEvent[],
  gregorianEvents: CalendarEvent[],
  bikramRecurringEvents: CalendarEvent[],
  bikramYear: number,
  bikramMonth: number,
  bikramDay: number,
  gregorianYear: number,
  gregorianMonth: number,
  gregorianDay: number
): boolean {
  const formatMonthDay = (month: number, day: number) => {
    return (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;
  };

  const formattedGregorianDate = formatMonthDay(gregorianMonth, gregorianDay);
  const formattedBikramRecurringDate = formatMonthDay(bikramMonth, bikramDay);
  const formattedFixedDate = bikramYear + "/" + formatMonthDay(bikramMonth, bikramDay);

  // Check gregorian events
  for (const event of gregorianEvents) {
    if ((event.startYear && gregorianYear < event.startYear) || 
        (event.endYear && gregorianYear > event.endYear)) {
      continue;
    }
    if (event.date === formattedGregorianDate && event.isHoliday) {
      return true;
    }
  }

  // Check bikram recurring events
  for (const event of bikramRecurringEvents) {
    if ((event.startYear && bikramYear < event.startYear) || 
        (event.endYear && bikramYear > event.endYear)) {
      continue;
    }
    if (event.date === formattedBikramRecurringDate && event.isHoliday) {
      return true;
    }
  }

  // Check bikram fixed events
  for (const event of bikramFixedEvents) {
    if (event.date === formattedFixedDate && event.isHoliday) {
      return true;
    }
  }

  // Check lunar events via panchanga
  try {
    const gregorianDate = new Date(Date.UTC(gregorianYear, gregorianMonth - 1, gregorianDay));
    const panchangaEvents = getEventsForDate(gregorianDate, bikramYear, bikramMonth - 1, bikramDay);
    return panchangaEvents && Array.isArray(panchangaEvents) && panchangaEvents.some(event => event && event.holiday);
  } catch (error) {
    console.warn('Failed to check lunar holidays:', error);
    return false;
  }
}