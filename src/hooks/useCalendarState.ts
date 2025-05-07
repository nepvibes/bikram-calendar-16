
import { useState, useEffect } from 'react';
import { BikramDateObj, BikramMonth, getToday, getBikramMonth, getNepaliDigits, containsNepaliDigits, getEnglishDigits } from '../utils/bikramConverter';
import { EventModalData } from '../types/events';
import { CalendarEvent } from '../types/events';
import { loadEventsForYear } from '../utils/events';
import { BS_START_YEAR, BS_END_YEAR } from '../utils/bikram';
import { calculateTithi } from '../utils/tithiCalculation';
import { getAllEventText, getAllEventDetails } from '../utils/events';

export function useCalendarState() {
  // Today's date in Bikram Sambat
  const [today, setToday] = useState<BikramDateObj>(getToday());

  // Current view state (month, year)
  const [currentView, setCurrentView] = useState<BikramMonth>(() => {
    return getBikramMonth(today.year, today.month);
  });

  // Selected date
  const [selectedDate, setSelectedDate] = useState<BikramDateObj | null>(null);

  // Language toggle - default is Nepali
  const [useNepaliLanguage, setUseNepaliLanguage] = useState<boolean>(true);

  // Custom year input
  const [yearInput, setYearInput] = useState<string>(useNepaliLanguage ? getNepaliDigits(today.year) : today.year.toString());

  interface EventsState {
    bikramFixedEvents: CalendarEvent[];
    gregorianEvents: CalendarEvent[];
    bikramRecurringEvents: CalendarEvent[];
  }
  
  const [events, setEvents] = useState<EventsState>({
    bikramFixedEvents: [],
    gregorianEvents: [],
    bikramRecurringEvents: [],
  });

  // Event modal state
  const [eventModalOpen, setEventModalOpen] = useState<boolean>(false);
  const [eventModalData, setEventModalData] = useState<EventModalData | null>(null);
  
  // Flag to indicate if the calendar is using approximation
  const [usingApproximation, setUsingApproximation] = useState<boolean>(false);

  // Initialize or update calendar when the current view changes
  useEffect(() => {
    const newMonthData = getBikramMonth(currentView.year, currentView.month);
    setCurrentView(newMonthData);

    // Check if we're using approximation
    setUsingApproximation(currentView.year < BS_START_YEAR || currentView.year > BS_END_YEAR);

    // Load events for the current year
    loadEventsForYear(currentView.year).then(loadedEvents => {
      setEvents(loadedEvents);
    });
  }, [currentView.year, currentView.month]);

  // Handler for "Previous Month" button
  const handlePrevMonth = () => {
    setCurrentView(prev => {
      let newMonth = prev.month - 1;
      let newYear = prev.year;
      if (newMonth < 1) {
        newMonth = 12;
        newYear -= 1;
      }
      return getBikramMonth(newYear, newMonth);
    });
  };

  // Handler for "Next Month" button
  const handleNextMonth = () => {
    setCurrentView(prev => {
      let newMonth = prev.month + 1;
      let newYear = prev.year;
      if (newMonth > 12) {
        newMonth = 1;
        newYear += 1;
      }
      return getBikramMonth(newYear, newMonth);
    });
  };

  // Handler for "Today" button
  const handleTodayClick = () => {
    const todayDate = getToday();
    setCurrentView(getBikramMonth(todayDate.year, todayDate.month));
    setSelectedDate(todayDate);
    setYearInput(useNepaliLanguage ? getNepaliDigits(todayDate.year) : todayDate.year.toString());
  };

  // Handler for month change from dropdown - Fixed to prevent automatic day selection
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement> | string) => {
    // Stop event propagation to prevent clicking on days beneath the dropdown
    if (typeof e !== 'string' && e.stopPropagation) {
      e.stopPropagation();
    }
    
    // Get the month value
    const month = typeof e === 'string' ? parseInt(e) : parseInt(e.target.value);
    
    // Use a timeout to prevent the event from propagating to day cells
    setTimeout(() => {
      setCurrentView(prev => getBikramMonth(prev.year, month));
    }, 50);
  };

  // Handler for year change from dropdown
  const handleYearChange = (value: string) => {
    const year = parseInt(value);
    if (!isNaN(year)) {
      setYearInput(useNepaliLanguage ? getNepaliDigits(year) : year.toString());
      setCurrentView(prev => getBikramMonth(year, prev.month));
    }
  };

  // Handler for year input change
  const handleYearInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // For Nepali digits, convert to English digits first
    setYearInput(inputValue);
  };

  // Handler for year submission
  const handleYearSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let year: number;

    if (containsNepaliDigits(yearInput)) {
      // Convert Nepali digits to English digits
      const englishDigits = getEnglishDigits(yearInput);
      year = parseInt(englishDigits);
    } else {
      // Input is already in English digits
      year = parseInt(yearInput);
    }

    if (!isNaN(year) && year >= 1900 && year <= 2200) {
      setCurrentView(prev => getBikramMonth(year, prev.month));
    } else {
      // Reset year input if invalid
      setYearInput(useNepaliLanguage ? getNepaliDigits(currentView.year) : currentView.year.toString());
    }
  };

  // Handler for date selection
  const handleDateSelect = (day: number) => {
    const selectedDateObj: BikramDateObj = {
      year: currentView.year,
      month: currentView.month,
      day: day,
      englishDate: new Date(currentView.englishStartDate)
    };

    // Adjust the English date to match the day
    selectedDateObj.englishDate.setDate(currentView.englishStartDate.getDate() + (day - 1));
    setSelectedDate(selectedDateObj);

    // Check for events
    const hasEvents = events.bikramFixedEvents.some(event => {
      if (event.date === `${currentView.year}/${currentView.month}/${day}`) {
        return true;
      }
      return false;
    }) || events.bikramRecurringEvents.some(event => {
      if (event.date === `${currentView.month}/${day}`) {
        // Check if the event has startYear and endYear restrictions
        if (event.startYear && event.endYear) {
          return currentView.year >= event.startYear && currentView.year <= event.endYear;
        }
        return true;
      }
      return false;
    });

    // If the day has events, show event modal
    if (hasEvents) {
      // Get English date for this day
      const englishDate = new Date(currentView.englishStartDate);
      englishDate.setDate(currentView.englishStartDate.getDate() + (day - 1));
      
      // Get tithi for this day
      const tithiData = calculateTithi(englishDate);
      
      // Get event text
      const eventText = getAllEventText(
        events.bikramFixedEvents,
        events.gregorianEvents,
        events.bikramRecurringEvents,
        currentView.year,
        currentView.month,
        day,
        englishDate.getFullYear(),
        englishDate.getMonth() + 1,
        englishDate.getDate(),
        useNepaliLanguage
      );
      
      // Get event detail
      const eventDetail = getAllEventDetails(
        events.bikramFixedEvents,
        events.gregorianEvents,
        events.bikramRecurringEvents,
        currentView.year,
        currentView.month,
        day,
        englishDate.getFullYear(),
        englishDate.getMonth() + 1,
        englishDate.getDate()
      );
      
      // Set event modal data
      setEventModalData({
        day,
        year: currentView.year,
        month: currentView.month,
        tithiName: useNepaliLanguage ? tithiData.tithiName : tithiData.tithiNameEn,
        tithiPaksha: useNepaliLanguage ? tithiData.paksha : tithiData.pakshaEn,
        englishDate,
        eventText,
        eventDetail
      });
      
      // Open event modal
      setEventModalOpen(true);
    }
  };

  // Toggle language
  const toggleLanguage = () => {
    setUseNepaliLanguage(prev => !prev);

    // Update year input to reflect language change
    setYearInput(prev => {
      if (containsNepaliDigits(prev)) {
        // Convert from Nepali to English digits
        return getEnglishDigits(prev);
      } else {
        // Convert from English to Nepali digits
        return getNepaliDigits(parseInt(prev));
      }
    });
  };

  // Handle date navigation from converter
  const handleDateNavigate = (year: number, month: number, day: number) => {
    // Update current view
    setCurrentView(getBikramMonth(year, month));
    
    // Create selected date object
    const selectedDateObj: BikramDateObj = {
      year,
      month,
      day,
      englishDate: new Date() // This will be updated internally
    };
    
    // Update selected date
    setSelectedDate(selectedDateObj);
  };

  return {
    today,
    currentView,
    selectedDate,
    events,
    setCurrentView,
    setSelectedDate,
    handlePrevMonth,
    handleNextMonth,
    handleTodayClick,
    handleMonthChange,
    handleDateSelect,
    handleYearInputChange,
    handleYearSubmit,
    yearInput,
    toggleLanguage,
    useNepaliLanguage,
    usingApproximation,
    eventModalOpen,
    setEventModalOpen,
    eventModalData,
    setEventModalData,
    handleDateNavigate,
  };
}
