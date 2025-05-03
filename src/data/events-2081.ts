
import { CalendarEvent } from "../types/events";

// Events specific to the year 2081 BS
const bikramFixedEvents: CalendarEvent[] = [
  {
    date: "2081/1/15",  // Year/Month/Day format for fixed events
    event: "पूर्णिमा",
    eventEn: "Purnima",
    detail: "२०८१ बिक्रम संवत्, बैशाख पूर्णिमा",
    detailEn: "Full moon day of Baisakh month, 2081 BS",
    type: "bikram",
    isHoliday: true
  },
  {
    date: "2081/5/30",
    event: "जनै पूर्णिमा",
    eventEn: "Janai Purnima",
    detail: "जनै फेर्ने दिन, रक्षा बन्धन",
    detailEn: "Sacred thread changing day, Raksha Bandhan",
    type: "bikram",
    isHoliday: true
  },
  {
    date: "2081/7/1",
    event: "वार्षिक उत्सव",
    eventEn: "Annual Festival",
    detail: "२०८१-२०८३ सम्म मनाइने विशेष उत्सव",
    detailEn: "Special festival celebrated from 2081 to 2083 BS",
    startYear: 2081,
    endYear: 2083,
    type: "bikram"
  }
];

export default {
  bikramFixedEvents,
  gregorianEvents: [],
  bikramRecurringEvents: []
};
