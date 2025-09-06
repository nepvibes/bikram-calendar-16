
import { CalendarEvent } from "../../types/events";
import { defaultEvents } from "./types";

// Function to load events for a specific year
export async function loadEventsForYear(year: number): Promise<{
  bikramFixedEvents: CalendarEvent[];
  gregorianEvents: CalendarEvent[];
  bikramRecurringEvents: CalendarEvent[];
}> {
  try {
    // First try to load year-specific events
    const yearModule = await import(`../../data/events-${year}.ts`).catch(() => {
      console.log(`No specific events for year ${year}, using default events`);
      return { default: defaultEvents };
    });
    
    // Then try to load common events
    const commonModule = await import('../../data/events.ts').catch(() => {
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
    
    // Get common events with safety checks
    const commonEvents = commonModule.default || { 
      bikramFixedEvents: [], 
      gregorianEvents: [], 
      bikramRecurringEvents: [] 
    };
    
    // Get year-specific events with safety checks
    const yearEvents = yearModule.default || { 
      bikramFixedEvents: [], 
      gregorianEvents: [], 
      bikramRecurringEvents: [] 
    };
    
    // Merge year-specific and common events
    return {
      bikramFixedEvents: [
        ...filterByYearRange(commonEvents.bikramFixedEvents || []),
        ...filterByYearRange(yearEvents.bikramFixedEvents || [])
      ],
      gregorianEvents: [
        ...filterByYearRange(commonEvents.gregorianEvents || []),
        ...filterByYearRange(yearEvents.gregorianEvents || [])
      ],
      bikramRecurringEvents: [
        ...filterByYearRange(commonEvents.bikramRecurringEvents || []),
        ...filterByYearRange(yearEvents.bikramRecurringEvents || [])
      ]
    };
  } catch (error) {
    console.error('Error loading events:', error);
    return defaultEvents;
  }
}
