
import { CalendarEvent } from "../types/events";
import { getNepaliDigits } from "./bikramConverter";

// Default events (empty arrays)
export const defaultEvents: {
  bikramFixedEvents: CalendarEvent[];
  gregorianEvents: CalendarEvent[];
  bikramRecurringEvents: CalendarEvent[];
} = {
  bikramFixedEvents: [],
  gregorianEvents: [],
  bikramRecurringEvents: []
};

// Function to check if a date has an event
export function checkEvent(
  events: CalendarEvent[], 
  year: number, 
  month: number, 
  day: number, 
  dateType: 'bikram' | 'gregorian' | 'recurring'
): boolean {
  if (!events || events.length === 0) return false;
  
  let hasEvent = false;
  events.forEach(event => {
    // Skip events that are outside of the specified year range
    if ((event.startYear && year < event.startYear) || 
        (event.endYear && year > event.endYear) || 
        event.showOnDay === false) {
      return;
    }

    if (dateType === 'bikram') {
      const [eventYear, eventMonth, eventDay] = event.date.split('/').map(Number);
      if (year === eventYear && month === eventMonth && day === eventDay) {
        hasEvent = true;
      }
    } else if (dateType === 'gregorian' || dateType === 'recurring') {
      const [eventMonth, eventDay] = event.date.split('/').map(Number);
      if (month === eventMonth && day === eventDay) {
        hasEvent = true;
      }
    }
  });
  
  return hasEvent;
}

// Function to get event text for a date
export function getEventText(
  events: CalendarEvent[], 
  year: number, 
  month: number, 
  day: number, 
  dateType: 'bikram' | 'gregorian' | 'recurring'
): string {
  if (!events || events.length === 0) return '';
  
  let eventText = '';
  events.forEach(event => {
    if ((event.startYear && year < event.startYear) || 
        (event.endYear && year > event.endYear) || 
        event.showOnDay === false) {
      return;
    }

    if (dateType === 'bikram') {
      const [eventYear, eventMonth, eventDay] = event.date.split('/').map(Number);
      if (year === eventYear && month === eventMonth && day === eventDay) {
        eventText += event.event;
      }
    } else if (dateType === 'gregorian' || dateType === 'recurring') {
      const [eventMonth, eventDay] = event.date.split('/').map(Number);
      if (month === eventMonth && day === eventDay) {
        eventText += event.event;
      }
    }
  });
  
  return eventText;
}

// Function to get event detail for a date
export function getEventDetail(
  events: CalendarEvent[], 
  year: number, 
  month: number, 
  day: number, 
  dateType: 'bikram' | 'gregorian' | 'recurring'
): string {
  if (!events || events.length === 0) return '';
  
  let eventDetail = '';
  events.forEach(event => {
    if ((event.startYear && year < event.startYear) || 
        (event.endYear && year > event.endYear)) {
      return;
    }

    if (dateType === 'bikram') {
      const [eventYear, eventMonth, eventDay] = event.date.split('/').map(Number);
      if (year === eventYear && month === eventMonth && day === eventDay) {
        eventDetail += event.detail;
      }
    } else if (dateType === 'gregorian' || dateType === 'recurring') {
      const [eventMonth, eventDay] = event.date.split('/').map(Number);
      if (month === eventMonth && day === eventDay) {
        eventDetail += event.detail;
      }
    }
  });
  
  return eventDetail;
}

// Function to check if a date has any events (across all event types)
export function hasEvents(
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
  return (
    checkEvent(bikramFixedEvents, bikramYear, bikramMonth, bikramDay, 'bikram') ||
    checkEvent(gregorianEvents, gregorianYear, gregorianMonth, gregorianDay, 'gregorian') ||
    checkEvent(bikramRecurringEvents, bikramYear, bikramMonth, bikramDay, 'recurring')
  );
}

// Function to get all event text for a date (across all event types)
export function getAllEventText(
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
  let eventText = 
    getEventText(bikramFixedEvents, bikramYear, bikramMonth, bikramDay, 'bikram') ||
    getEventText(gregorianEvents, gregorianYear, gregorianMonth, gregorianDay, 'gregorian') ||
    getEventText(bikramRecurringEvents, bikramYear, bikramMonth, bikramDay, 'recurring');
  
  return eventText;
}

// Function to get all event details for a date (across all event types)
export function getAllEventDetails(
  bikramFixedEvents: CalendarEvent[],
  gregorianEvents: CalendarEvent[],
  bikramRecurringEvents: CalendarEvent[],
  bikramYear: number,
  bikramMonth: number,
  bikramDay: number,
  gregorianYear: number,
  gregorianMonth: number,
  gregorianDay: number
): string {
  let eventDetail = 
    getEventDetail(bikramFixedEvents, bikramYear, bikramMonth, bikramDay, 'bikram') ||
    getEventDetail(gregorianEvents, gregorianYear, gregorianMonth, gregorianDay, 'gregorian') ||
    getEventDetail(bikramRecurringEvents, bikramYear, bikramMonth, bikramDay, 'recurring');
  
  return eventDetail;
}

// Function to load events for a specific year
export async function loadEventsForYear(year: number): Promise<{
  bikramFixedEvents: CalendarEvent[];
  gregorianEvents: CalendarEvent[];
  bikramRecurringEvents: CalendarEvent[];
}> {
  try {
    // First try to load year-specific events
    const yearModule = await import(`../data/events-${year}.ts`).catch(() => {
      console.log(`No specific events for year ${year}, using default events`);
      return { default: defaultEvents };
    });
    
    // Then try to load common events
    const commonModule = await import('../data/events.ts').catch(() => {
      console.log('No common events found');
      return { default: { 
        bikramFixedEvents: [], 
        gregorianEvents: [], 
        bikramRecurringEvents: [] 
      }};
    });
    
    // Filter events based on startYear and endYear
    const filterByYearRange = (events: CalendarEvent[]): CalendarEvent[] => {
      return events.filter(event => 
        (!event.startYear || year >= event.startYear) && 
        (!event.endYear || year <= event.endYear)
      );
    };
    
    // Merge year-specific and common events
    return {
      bikramFixedEvents: [
        ...filterByYearRange(commonModule.default.bikramFixedEvents || []),
        ...filterByYearRange(yearModule.default.bikramFixedEvents || [])
      ],
      gregorianEvents: [
        ...filterByYearRange(commonModule.default.gregorianEvents || []),
        ...filterByYearRange(yearModule.default.gregorianEvents || [])
      ],
      bikramRecurringEvents: [
        ...filterByYearRange(commonModule.default.bikramRecurringEvents || []),
        ...filterByYearRange(yearModule.default.bikramRecurringEvents || [])
      ]
    };
  } catch (error) {
    console.error('Error loading events:', error);
    return defaultEvents;
  }
}
