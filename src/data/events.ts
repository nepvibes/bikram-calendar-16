
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
  },
  {
    date: "12/1",
    event: "फागु पूर्णिमा",
    detail: "रङको पर्व",
    startYear: 2080,
    endYear: 2085,
    type: "recurring"
  }
];

const gregorianEvents: CalendarEvent[] = [
  {
    date: "1/1",
    event: "अङ्ग्रेजी नयाँ वर्ष",
    detail: "अङ्ग्रेजी नयाँ वर्षको पहिलो दिन",
    type: "gregorian"
  },
  {
    date: "12/25",
    event: "क्रिसमस",
    detail: "इसाई धर्मावलम्बीहरुको मुख्य पर्व",
    startYear: 2024,
    endYear: 2030,
    type: "gregorian"
  }
];

export default {
  bikramFixedEvents: [],
  gregorianEvents,
  bikramRecurringEvents
};
