
import { CalendarEvent } from "../types/events";

// Events specific to the year 2080 BS
const bikramFixedEvents: CalendarEvent[] = [
  {
    date: "2080/10/15",
    event: "माघ पूर्णिमा",
    detail: "२०८० बिक्रम संवत्, माघ पूर्णिमा",
    type: "bikram",
    isHoliday: true
  },
  {
    date: "2080/11/9",
    event: "महाशिवरात्री",
    detail: "शिवको पूजा गर्ने पवित्र दिन",
    type: "bikram",
    isHoliday: true
  },
  {
    date: "2080/12/30",
    event: "वार्षिक समारोह",
    detail: "२०७५ देखि २०८० सम्म मनाइने विशेष समारोह",
    startYear: 2075,
    endYear: 2080,
    type: "bikram"
  }
];

const gregorianEvents: CalendarEvent[] = [
  {
    date: "5/1",
    event: "अन्तर्राष्ट्रिय श्रमिक दिवस",
    detail: "विश्वभरका श्रमिकहरूको सम्मानमा मनाइने दिन",
    type: "gregorian",
    isHoliday: true
  }
];

export default {
  bikramFixedEvents,
  gregorianEvents,
  bikramRecurringEvents: []
};
