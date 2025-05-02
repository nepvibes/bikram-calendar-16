
import { CalendarEvent } from "../types/events";

// Common events that apply to all years
const bikramRecurringEvents: CalendarEvent[] = [
  {
    date: "1/1",  // Month/Day format for recurring events
    event: "नयाँ वर्ष",
    detail: "बिक्रम संवत् नयाँ वर्षको पहिलो दिन",
    type: "recurring"
  },
  {
    date: "9/11",
    event: "तिहार",
    detail: "दिपावली, उज्यालोको पर्व",
    type: "recurring"
  }
];

const gregorianEvents: CalendarEvent[] = [
  {
    date: "1/1",
    event: "अङ्ग्रेजी नयाँ वर्ष",
    detail: "अङ्ग्रेजी नयाँ वर्षको पहिलो दिन",
    type: "gregorian"
  }
];

export default {
  bikramFixedEvents: [],
  gregorianEvents,
  bikramRecurringEvents
};
