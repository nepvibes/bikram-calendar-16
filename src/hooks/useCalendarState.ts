
import { useState, useEffect } from 'react';
import { BikramDateObj, BikramMonth, getToday, getBikramMonth, getNepaliDigits, containsNepaliDigits, getEnglishDigits } from '../utils/bikramConverter';
import { EventModalData } from '../types/events';
import { loadEventsForYear } from '../utils/events';
import { BS_START_YEAR, BS_END_YEAR } from '../utils/bikram';
import { calculateTithi } from '../utils/tithiCalculation';

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

  // Event data
  const [events, setEvents] = useState<{
    bikramFixedEvents: any[];
    gregorianEvents: any[];
    bikramRecurringEvents: any[];
  }>({
    bikramFixedEvents: [],
    gregorianEvents: [],
    bikramRecurringEvents: []
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
    setYearInput(useNepaliLanguage ? getNepaliDigits(year) : year.toString());
    setCurrentView(prev => getBikramMonth(year, prev.month));
  };

  // Handler for direct year input
  const handleYearInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Always set the input value directly for immediate feedback
    setYearInput(inputValue);
    
    // If using Nepali language and input contains English digits, convert them on-the-fly
    if (useNepaliLanguage && /[0-9]/.test(inputValue)) {
      // Convert all English digits to Nepali digits
      const convertedInput = inputValue.split('').map(char => {
        if (/[0-9]/.test(char)) {
          return getNepaliDigits(parseInt(char));
        }
        return char;
      }).join('');
      
      setYearInput(convertedInput);
    }
    
    // If not using Nepali language and input contains Nepali digits, convert them on-the-fly
    if (!useNepaliLanguage && containsNepaliDigits(inputValue)) {
      const englishDigits = getEnglishDigits(inputValue);
      setYearInput(englishDigits);
    }
  };

  // Handle year input submit
  const handleYearSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!yearInput || yearInput.trim() === '') {
      setYearInput(useNepaliLanguage ? getNepaliDigits(currentView.year) : currentView.year.toString());
      return;
    }

    // If using Nepali digits, convert back to English digits for processing
    let processedInput = yearInput;
    
    if (containsNepaliDigits(yearInput)) {
      processedInput = getEnglishDigits(yearInput);
    }
    
    const year = parseInt(processedInput);
    
    if (!isNaN(year)) {
      setCurrentView(prev => getBikramMonth(year, prev.month));
      
      // Update year input based on language setting
      setYearInput(useNepaliLanguage ? getNepaliDigits(year) : year.toString());

      // If we're outside the precomputed data range, show information about approximation
      if (year < BS_START_YEAR || year > BS_END_YEAR) {
        console.log(`Calendar data outside ${BS_START_YEAR}–${BS_END_YEAR} is approximated`);
      }
    } else {
      console.error("Please enter a valid year");
      setYearInput(useNepaliLanguage ? getNepaliDigits(currentView.year) : currentView.year.toString());
    }
  };

  // Handle date selection
  const handleDateSelect = (day: number): void => {
    // Get the English date for the selected day
    const englishDate = new Date(currentView.englishStartDate);
    englishDate.setDate(englishDate.getDate() + (day - 1));
    
    // Get tithi data for the selected date
    const tithiData = calculateTithi(englishDate);
    
    const newSelectedDate: EventModalData = {
      year: currentView.year,
      month: currentView.month,
      day,
      englishDate,
      tithiName: useNepaliLanguage ? tithiData.tithiName : tithiData.tithiNameEn,
      tithiPaksha: useNepaliLanguage ? tithiData.paksha : tithiData.pakshaEn,
      eventText: '',
      eventDetail: ''
    };
    
    setSelectedDate(newSelectedDate);
    setEventModalData(newSelectedDate);
    setEventModalOpen(true);
  };

  // Toggle language
  const toggleLanguage = () => {
    setUseNepaliLanguage(prev => {
      const newValue = !prev;
      // Update yearInput format based on language
      if (newValue) {
        setYearInput(getNepaliDigits(currentView.year));
      } else {
        setYearInput(currentView.year.toString());
      }
      return newValue;
    });
  };

  // Handle direct date selection from English calendar
  const handleEnglishDateSelect = (date: Date | undefined) => {
    if (date) {
      const todayDate = getToday();
      const bikramDate = {
        year: todayDate.year,
        month: todayDate.month,
        day: todayDate.day,
        englishDate: date
      };
      setCurrentView(getBikramMonth(bikramDate.year, bikramDate.month));
      setSelectedDate(bikramDate);
      setYearInput(useNepaliLanguage ? getNepaliDigits(bikramDate.year) : bikramDate.year.toString());
    }
  };

  return {
    today,
    currentView,
    selectedDate,
    useNepaliLanguage,
    yearInput,
    events,
    eventModalOpen,
    eventModalData,
    usingApproximation,
    handlePrevMonth,
    handleNextMonth,
    handleTodayClick,
    handleMonthChange,
    handleYearChange,
    handleYearInputChange,
    handleYearSubmit,
    handleDateSelect,
    toggleLanguage,
    handleEnglishDateSelect,
    setSelectedDate,
    setEventModalData,
    setEventModalOpen,
    setCurrentView
  };
}
