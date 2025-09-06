
import { CalendarEvent } from "../types/events";

// Common events that apply to all years - using the comprehensive event structure
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
    date: "1/11",
    event: "लोकतन्त्र दिवस",
    eventEn: "Democracy Day",
    detail: "लोकतन्त्र दिवस, हरेक वर्ष बैशाख ११ गते मनाइन्छ।",
    detailEn: "Democracy Day, celebrated every year on Baisakh 11",
    type: "recurring",
    isHoliday: true
  },
  {
    date: "2/15",
    event: "गणतन्त्र दिवस",
    eventEn: "Republic Day",
    detail: "गणतन्त्र दिवस, हरेक वर्ष जेठ १५ गते मनाइन्छ।",
    detailEn: "Republic Day, celebrated every year on Jestha 15",
    type: "recurring",
    isHoliday: true
  },
  {
    date: "3/15",
    event: "राष्ट्रिय धान दिवस",
    eventEn: "National Paddy Day",
    detail: "राष्ट्रिय धान दिवस, हरेक वर्ष असार १५ गते मनाइन्छ।",
    detailEn: "National Paddy Day, celebrated every year on Ashar 15",
    type: "recurring",
    isHoliday: false
  },
  {
    date: "3/29",
    event: "भानु जयन्ती",
    eventEn: "Bhanu Jayanti",
    detail: "कवि भानुभक्त आचार्यको जन्म जयन्ती।",
    detailEn: "Birth anniversary of poet Bhanubhakta Acharya",
    type: "recurring",
    isHoliday: false
  },
  {
    date: "4/1",
    event: "साउने सङ्क्रान्ति",
    eventEn: "Saune Sankranti",
    detail: "श्रावण सङ्क्रान्ति, श्रावण महिनाको पहिलो दिन।",
    detailEn: "Shrawan Sankranti, first day of Shrawan month",
    type: "recurring",
    isHoliday: false
  },
  {
    date: "6/3",
    event: "संविधान दिवस",
    eventEn: "Constitution Day",
    detail: "संविधान दिवस, हरेक वर्ष असोज ३ गते मनाइन्छ।",
    detailEn: "Constitution Day, celebrated every year on Ashoj 3",
    type: "recurring",
    isHoliday: true
  },
  {
    date: "9/27",
    event: "पृथ्वी जयन्ती / राष्ट्रिय एकता दिवस",
    eventEn: "Prithvi Jayanti / National Unity Day",
    detail: "पृथ्वी जयन्ती / राष्ट्रिय एकता दिवस।",
    detailEn: "Prithvi Jayanti / National Unity Day",
    type: "recurring",
    isHoliday: true
  },
  {
    date: "10/1",
    event: "माघे संक्रान्ति",
    eventEn: "Maghe Sankranti",
    detail: "माघे सङ्क्रान्ति, माघ महिनाको पहिलो दिन।",
    detailEn: "Maghe Sankranti, first day of Magh month",
    type: "recurring",
    isHoliday: true
  },
  {
    date: "10/16",
    event: "शहीद दिवस",
    eventEn: "Martyrs' Day",
    detail: "शहीद दिवस।",
    detailEn: "Martyrs' Day",
    type: "recurring",
    isHoliday: true
  },
  {
    date: "11/7",
    event: "प्रजातन्त्र दिवस",
    eventEn: "Democracy Day",
    detail: "राणा शासनको अन्त्यको सम्झनामा मनाइने प्रजातन्त्र दिवस।",
    detailEn: "Democracy Day commemorating the end of Rana rule",
    type: "recurring",
    isHoliday: true
  }
];

const gregorianEvents: CalendarEvent[] = [
  {
    date: "1/1",
    event: "अङ्ग्रेजी नयाँ वर्ष",
    eventEn: "New Year's Day",
    detail: "अङ्ग्रेजी नयाँ वर्षको पहिलो दिन",
    detailEn: "Celebration of the new Gregorian year",
    type: "gregorian",
    isHoliday: true
  },
  {
    date: "2/14",
    event: "प्रणय दिवस",
    eventEn: "Valentine's Day",
    detail: "प्रेमको अन्तर्राष्ट्रिय दिवस",
    detailEn: "International day of love",
    type: "gregorian",
    isHoliday: false
  },
  {
    date: "3/8",
    event: "नारी दिवस",
    eventEn: "International Women's Day",
    detail: "महिलाहरूको सम्मानमा अन्तर्राष्ट्रिय दिवस",
    detailEn: "Global day celebrating womanhood",
    type: "gregorian",
    isHoliday: true
  },
  {
    date: "5/1",
    event: "अन्तर्राष्ट्रिय श्रमिक दिवस",
    eventEn: "International Workers' Day",
    detail: "मे दिवस भनेर चिनिने श्रमिकहरूको दिवस",
    detailEn: "Also known as May Day",
    type: "gregorian",
    isHoliday: true
  },
  {
    date: "6/5",
    event: "विश्व वातावरण दिवस",
    eventEn: "World Environment Day",
    detail: "वातावरण संरक्षणको चेतना जगाउने दिवस",
    detailEn: "Day for environmental awareness and action",
    type: "gregorian",
    isHoliday: false
  },
  {
    date: "6/21",
    event: "विश्व योग दिवस",
    eventEn: "International Day of Yoga",
    detail: "योगको महत्त्व र लाभ प्रवर्द्धन गर्ने दिवस",
    detailEn: "Global day to celebrate yoga",
    type: "gregorian",
    isHoliday: false
  },
  {
    date: "12/10",
    event: "अन्तर्राष्ट्रिय मानव अधिकार दिवस",
    eventEn: "International Human Rights Day",
    detail: "मानव अधिकारको विश्वव्यापी घोषणाको सम्झनामा",
    detailEn: "Commemorates the adoption of the Universal Declaration of Human Rights",
    type: "gregorian",
    isHoliday: false
  },
  {
    date: "12/25",
    event: "क्रिसमस",
    eventEn: "Christmas Day",
    detail: "इसाई धर्मावलम्बीहरुको मुख्य पर्व",
    detailEn: "Christian festival celebrating the birth of Jesus",
    type: "gregorian",
    isHoliday: true
  }
];

export default {
  bikramFixedEvents: [],
  gregorianEvents,
  bikramRecurringEvents
};
