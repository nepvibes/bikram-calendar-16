
import { CalendarEvent } from "../types/events";

// Events specific to the year 2080 BS
const bikramFixedEvents: CalendarEvent[] = [
  {
    date: "2080/10/15",
    event: "माघ पूर्णिमा",
    eventEn: "Maghe Purnima",
    detail: "२०८० बिक्रम संवत्, माघ पूर्णिमा",
    detailEn: "Full moon day of Magh month, 2080 BS",
    type: "bikram",
    isHoliday: true
  },
  {
    date: "2080/11/9",
    event: "महाशिवरात्री",
    eventEn: "Maha Shivaratri",
    detail: "शिवको पूजा गर्ने पवित्र दिन",
    detailEn: "Sacred day dedicated to Lord Shiva",
    type: "bikram",
    isHoliday: true
  },
  {
    date: "2080/12/30",
    event: "वार्षिक समारोह",
    eventEn: "Annual Celebration",
    detail: "२०७५ देखि २०८० सम्म मनाइने विशेष समारोह",
    detailEn: "Special celebration observed from 2075 to 2080 BS",
    startYear: 2075,
    endYear: 2080,
    type: "bikram"
  }
];

const gregorianEvents: CalendarEvent[] = [
  {
    date: "5/1",
    event: "अन्तर्राष्ट्रिय श्रमिक दिवस",
    eventEn: "International Workers' Day",
    detail: "विश्वभरका श्रमिकहरूको सम्मानमा मनाइने दिन",
    detailEn: "Day honoring workers worldwide",
    type: "gregorian",
    isHoliday: true
  }
];

export default {
  bikramFixedEvents,
  gregorianEvents,
  bikramRecurringEvents: []
};
