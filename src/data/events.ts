
import { CalendarEvent } from "../types/events";

// Common events that apply to all years
const bikramRecurringEvents: CalendarEvent[] = [
  {
    date: "1/1",  // Month/Day format for recurring events
    event: "नयाँ वर्ष",
    eventEn: "New Year",
    detail: "बिक्रम संवत् नयाँ वर्षको पहिलो दिन",
    detailEn: "First day of the Bikram Sambat New Year",
    type: "recurring",
    isHoliday: true
  },
  {
    date: "9/11",
    event: "तिहार",
    eventEn: "Tihar",
    detail: "दिपावली, उज्यालोको पर्व",
    detailEn: "Festival of Lights, Dipawali",
    type: "recurring",
    isHoliday: true
  },
  {
    date: "12/1",
    event: "फागु पूर्णिमा",
    eventEn: "Holi",
    detail: "रङको पर्व",
    detailEn: "Festival of Colors",
    startYear: 2080,
    endYear: 2085,
    type: "recurring",
    isHoliday: true
  }
];

const gregorianEvents: CalendarEvent[] = [
  {
    date: "1/1",
    event: "अङ्ग्रेजी नयाँ वर्ष",
    eventEn: "English New Year",
    detail: "अङ्ग्रेजी नयाँ वर्षको पहिलो दिन",
    detailEn: "First day of the Gregorian calendar year",
    type: "gregorian",
    isHoliday: true
  },
  {
    date: "12/25",
    event: "क्रिसमस",
    eventEn: "Christmas",
    detail: "इसाई धर्मावलम्बीहरुको मुख्य पर्व",
    detailEn: "Major Christian holiday celebrating the birth of Jesus Christ",
    startYear: 2024,
    endYear: 2030,
    type: "gregorian",
    isHoliday: true
  }
];

export default {
  bikramFixedEvents: [],
  gregorianEvents,
  bikramRecurringEvents
};
