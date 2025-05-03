
import { CalendarEvent } from "../../types/events";

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
