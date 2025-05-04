
import React, { useState, useEffect } from 'react';
import { BikramDateObj, BikramMonth, getToday, getBikramMonth, nepaliMonthsEn, nepaliMonthsNp, getNepaliDigits } from '../utils/bikramConverter';
import CalendarGrid from './CalendarGrid';
import LanguageToggle from './LanguageToggle';
import EventModal from './EventModal';
import UpcomingEvents from './UpcomingEvents';
import { CalendarEvent, EventModalData, EventData } from '../types/events';
import { loadEventsForYear } from '../utils/events';
import { Card } from './ui/card';
import { Toaster } from './ui/sonner';
import { toast } from 'sonner';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Printer } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { format } from 'date-fns';
import { Input } from './ui/input';
import { BS_START_YEAR, BS_END_YEAR } from '../utils/bikram';
const BikramCalendar: React.FC = () => {
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
    bikramFixedEvents: CalendarEvent[];
    gregorianEvents: CalendarEvent[];
    bikramRecurringEvents: CalendarEvent[];
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
    toast(useNepaliLanguage ? `आजको मिति: ${nepaliMonthsNp[todayDate.month - 1]} ${getNepaliDigits(todayDate.day)}, ${getNepaliDigits(todayDate.year)} बि.सं.` : `Showing today: ${nepaliMonthsEn[todayDate.month - 1]} ${todayDate.day}, ${todayDate.year} BS`);
  };

  // Handler for Print button
  const handlePrint = () => {
    window.print();
  };

  // Handler for month change from dropdown
  const handleMonthChange = (value: string) => {
    const month = parseInt(value);
    setCurrentView(prev => getBikramMonth(prev.year, month));
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
    
    // Always set the raw input value whether it's Nepali or English digits
    setYearInput(inputValue);
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

      // If we're outside the precomputed data range, show a toast notification
      if (year < BS_START_YEAR || year > BS_END_YEAR) {
        toast.info(useNepaliLanguage ? `${getNepaliDigits(BS_START_YEAR)}–${getNepaliDigits(BS_END_YEAR)} भन्दा बाहिरको मिति अनुमानित हो` : `Calendar data outside ${BS_START_YEAR}–${BS_END_YEAR} is approximated`);
      }
    } else {
      toast.error(useNepaliLanguage ? "कृपया वैध वर्ष प्रविष्ट गर्नुहोस्" : "Please enter a valid year");
      setYearInput(useNepaliLanguage ? getNepaliDigits(currentView.year) : currentView.year.toString());
    }
  };

  // Handle date selection
  const handleDateSelect = (day: number): void => {
    const newSelectedDate: EventModalData = {
      year: currentView.year,
      month: currentView.month,
      day,
      englishDate: new Date(),
      tithiName: '',
      tithiPaksha: '',
      eventText: '',
      eventDetail: ''
    };
    setSelectedDate(newSelectedDate);
    setEventModalData(newSelectedDate);
    setEventModalOpen(true);
  };

  // Handle event click
  const handleEventClick = (eventData: EventData): void => {
    const updatedEventData = {
      ...eventData,
      year: currentView.year,
      month: currentView.month
    };
    setEventModalData(updatedEventData);
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

  // New function to navigate to a specific date when clicking on an upcoming event
  const handleUpcomingEventClick = (year: number, month: number, day: number) => {
    // Set the calendar view to the event's month and year
    setCurrentView(getBikramMonth(year, month));

    // Create a date object for the event
    const eventDate: BikramDateObj = {
      year,
      month,
      day,
      englishDate: new Date() // This is a placeholder, will be updated by the system
    };

    // Update the selected date
    setSelectedDate(eventDate);

    // Update the year input
    setYearInput(useNepaliLanguage ? getNepaliDigits(year) : year.toString());

    // Show a notification
    toast.info(useNepaliLanguage ? `${nepaliMonthsNp[month - 1]} ${getNepaliDigits(day)}, ${getNepaliDigits(year)} मा भएको कार्यक्रम देखाउँदै` : `Showing event on ${nepaliMonthsEn[month - 1]} ${day}, ${year}`);
  };
  return <div className="min-h-screen bg-[url('/subtle-pattern.png')] pt-2 md:pt-4">
      <Toaster richColors position="top-center" />
      
      {/* Calendar Container */}
      <div className="mx-auto px-2 sm:px-4 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl">
        {/* Top header with month/year */}
        <div className="text-white p-2 sm:p-4 rounded-t-lg border-b-4 border-blue-800 relative overflow-hidden bg-gradient-to-r from-[#3787a9] to-blue-700 beautiful-header shadow-lg">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div className="flex flex-col">
            <h2 className={`text-xl sm:text-2xl font-bold text-center my-0 sm:text-left md:text-4xl mx-0 px-0 ${useNepaliLanguage ? "nepali-text" : ""}`}>
                {/* {useNepaliLanguage ? 
                  `विक्रम संवत् ${getNepaliDigits(currentView.year)} ${
                    nepaliMonthsNp[currentView.month - 1]
                  }` : 
                  `Bikram Sambat ${currentView.year}`
                 } */}
                {useNepaliLanguage ? `विक्रम संवत् क्यालेन्डर` : `Bikram Sambat calendar `}
              </h2>
              
              {/* Show approximation indicator if needed */}
              {usingApproximation && <div className={`text-xs text-yellow-200 mt-1 text-center sm:text-left ${useNepaliLanguage ? "nepali-text" : ""}`}>
                  {useNepaliLanguage ? `(अनुमानित डाटा)` : `(Approximated data)`}
                </div>}
            </div>
            
            <div className="flex flex-col items-center sm:items-end mt-2 sm:mt-0">
              <span className={`text-lg sm:text-xl font-bold ${useNepaliLanguage ? "nepali-text" : ""}`}>
                {useNepaliLanguage ? `${nepaliMonthsNp[currentView.month - 1]} ${getNepaliDigits(currentView.year)}` : `${nepaliMonthsEn[currentView.month - 1]} ${currentView.year}`}
              </span>
              <span className="text-xs sm:text-sm opacity-75">
                {format(currentView.englishStartDate, 'MMMM yyyy')} AD
              </span>
            </div>
          </div>
          
          {/* Decorative element */}
          <div className="absolute -right-16 -top-16 w-32 h-32 bg-yellow-500 rounded-full opacity-20"></div>
          <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-blue-500 rounded-full opacity-20"></div>
        </div>
        
        {/* Navigation controls */}
        <div className="text-white p-1 sm:p-2 flex flex-wrap gap-1 sm:gap-2 justify-between items-center bg-gradient-to-r from-[#3285e9] to-blue-600">
          {/* Month and Year selectors */}
          <div className="flex gap-1 sm:gap-2">
            {/* Month selector */}
            <Select value={currentView.month.toString()} onValueChange={handleMonthChange}>
              <SelectTrigger className="w-24 sm:w-32 bg-white text-blue-900 border-none h-8 sm:h-10 text-xs sm:text-sm">
                <SelectValue placeholder={useNepaliLanguage ? "मह���ना" : "Month"} />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {[...Array(12)].map((_, i) => <SelectItem key={i + 1} value={(i + 1).toString()} className={`text-xs sm:text-sm ${useNepaliLanguage ? "nepali-text" : ""}`}>
                    {useNepaliLanguage ? nepaliMonthsNp[i] : nepaliMonthsEn[i]}
                  </SelectItem>)}
              </SelectContent>
            </Select>
            
            {/* Year selector - Direct input */}
            <form onSubmit={handleYearSubmit} className="flex">
              <Input type="text" value={yearInput} onChange={handleYearInputChange} className={`w-16 sm:w-24 bg-white text-blue-900 border-none h-8 sm:h-10 px-1 sm:px-3 text-xs sm:text-sm ${useNepaliLanguage ? "nepali-text" : ""}`} onBlur={e => {
              // Also submit on blur
              handleYearSubmit(e);
            }} />
            </form>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Button onClick={handleTodayClick} variant="outline" className={`bg-transparent border-white text-white hover:bg-white/20 text-xs sm:text-sm h-8 sm:h-10 py-0 px-2 sm:px-3 ${useNepaliLanguage ? "nepali-text" : ""}`}>
              {useNepaliLanguage ? 'आज' : 'Today'}
            </Button>

            {/* Print button */}
            <Button onClick={handlePrint} variant="outline" className="bg-transparent border-white text-white hover:bg-white/20 text-xs sm:text-sm h-8 sm:h-10 py-0 px-2 sm:px-3 flex items-center gap-1">
              <Printer className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">{useNepaliLanguage ? 'प्रिन्ट' : 'Print'}</span>
            </Button>
            
            <Button onClick={handlePrevMonth} variant="outline" size="icon" className="bg-transparent border-white text-white hover:bg-white/20 h-8 w-8">
              <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            
            <Button onClick={handleNextMonth} variant="outline" size="icon" className="bg-transparent border-white text-white hover:bg-white/20 h-8 w-8">
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            
            <LanguageToggle useNepaliLanguage={useNepaliLanguage} onToggle={toggleLanguage} />
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/20 gap-1 h-8 sm:h-10 py-0 px-2 sm:px-3 text-xs sm:text-sm">
                  <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className={`hidden xs:inline ${useNepaliLanguage ? "nepali-text" : ""}`}>{useNepaliLanguage ? 'मिति' : 'Date'}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white" align="end">
                <Calendar mode="single" selected={new Date()} onSelect={handleEnglishDateSelect} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        {/* Calendar Grid */}
        <div className="border-l border-r border-b border-gray-300 bg-white rounded-b-xl overflow-hidden shadow-lg">
          <CalendarGrid year={currentView.year} month={currentView.month} days={currentView.days} startWeekDay={currentView.startWeekDay} englishStartDate={currentView.englishStartDate} currentDate={today.year === currentView.year && today.month === currentView.month ? today : undefined} selectedDate={selectedDate || undefined} onDateSelect={handleDateSelect} useNepaliLanguage={useNepaliLanguage} events={events} onEventClick={handleEventClick} usingApproximation={usingApproximation} />
        </div>
        
        {/* Upcoming Events List */}
        <UpcomingEvents events={events} currentDate={today} useNepaliLanguage={useNepaliLanguage} onEventClick={handleUpcomingEventClick} maxEvents={5} />
        
        {/* Footer */}
        <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-500 pb-4 sm:pb-6 no-print">
          <p className={useNepaliLanguage ? "nepali-text" : ""}>{useNepaliLanguage ? '© २०८१ बिक्रम सम्वत क्यालेन्डर' : '© 2024 Bikram Sambat Calendar'}</p>
        </div>
      </div>

      
      
      {/* Event Modal */}
      <EventModal isOpen={eventModalOpen} onClose={() => setEventModalOpen(false)} eventData={eventModalData} useNepaliLanguage={useNepaliLanguage} />
    </div>;
};
export default BikramCalendar;
