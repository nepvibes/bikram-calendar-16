
import React, { useState, useEffect } from 'react';
import { BikramDateObj, BikramMonth, getToday, getBikramMonth, nepaliMonthsEn, nepaliMonthsNp, getNepaliDigits } from '../utils/bikramConverter';
import CalendarGrid from './CalendarGrid';
import LanguageToggle from './LanguageToggle';
import { Card } from './ui/card';
import { Toaster } from './ui/sonner';
import { toast } from 'sonner';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { format } from 'date-fns';
import { Input } from './ui/input';

const BikramCalendar: React.FC = () => {
  // Today's date in Bikram Sambat
  const [today, setToday] = useState<BikramDateObj>(getToday());
  
  // Current view state (month, year)
  const [currentView, setCurrentView] = useState<BikramMonth>(() => {
    return getBikramMonth(today.year, today.month);
  });
  
  // Selected date
  const [selectedDate, setSelectedDate] = useState<BikramDateObj | null>(null);
  
  // Language toggle - now default is Nepali
  const [useNepaliLanguage, setUseNepaliLanguage] = useState<boolean>(true);
  
  // Custom year input
  const [yearInput, setYearInput] = useState<string>(useNepaliLanguage ? getNepaliDigits(today.year) : today.year.toString());
  
  // Available years for dropdown (from 1900 BS to 2100 BS for wider range)
  const availableYears = Array.from({ length: 201 }, (_, i) => 1900 + i);
  
  // Initialize or update calendar when the current view changes
  useEffect(() => {
    const newMonthData = getBikramMonth(currentView.year, currentView.month);
    setCurrentView(newMonthData);
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
    toast(useNepaliLanguage ? 
      `आजको मिति: ${nepaliMonthsNp[todayDate.month - 1]} ${getNepaliDigits(todayDate.day)}, ${getNepaliDigits(todayDate.year)} बि.सं.` : 
      `Showing today: ${nepaliMonthsEn[todayDate.month - 1]} ${todayDate.day}, ${todayDate.year} BS`);
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
    setYearInput(inputValue);
  };
  
  // Handle year input submit
  const handleYearSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // If using Nepali digits, convert back to English digits for processing
    const processedInput = useNepaliLanguage ? 
      yearInput.split('').map(char => {
        const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
        const index = nepaliDigits.indexOf(char);
        return index !== -1 ? index.toString() : char;
      }).join('') : 
      yearInput;
    
    const year = parseInt(processedInput);
    
    if (!isNaN(year) && year >= 1900 && year <= 2100) {
      setCurrentView(prev => getBikramMonth(year, prev.month));
    } else {
      toast.error(useNepaliLanguage ? 
        "कृपया १९०० र २१०० बीचको वैध वर्ष प्रविष्ट गर्नुहोस्" : 
        "Please enter a valid year between 1900 and 2100");
      setYearInput(useNepaliLanguage ? getNepaliDigits(currentView.year) : currentView.year.toString());
    }
  };
  
  // Handle date selection
  const handleDateSelect = (day: number) => {
    const newSelectedDate: BikramDateObj = {
      year: currentView.year,
      month: currentView.month,
      day: day,
      englishDate: new Date(),
    };
    
    setSelectedDate(newSelectedDate);
    toast(useNepaliLanguage ?
      `छनौट गरिएको: ${nepaliMonthsNp[newSelectedDate.month - 1]} ${getNepaliDigits(newSelectedDate.day)}, ${getNepaliDigits(newSelectedDate.year)} बि.सं.` :
      `Selected: ${nepaliMonthsEn[newSelectedDate.month - 1]} ${newSelectedDate.day}, ${newSelectedDate.year} BS`);
  };
  
  // Toggle language
  const toggleLanguage = () => {
    setUseNepaliLanguage(prev => {
      const newValue = !prev;
      // Update yearInput format based on language
      setYearInput(newValue ? getNepaliDigits(currentView.year) : currentView.year.toString());
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
  
  return (
    <div className="min-h-screen bg-[url('/subtle-pattern.png')] pt-2 md:pt-4">
      <Toaster richColors position="top-center" />
      
      {/* Calendar Container */}
      <div className="mx-auto px-2 sm:px-4 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl">
        {/* Top header with month/year */}
        <div className="bg-red-700 text-white p-2 sm:p-4 rounded-t-lg border-b-4 border-blue-800 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center sm:text-left">
              {useNepaliLanguage ? 
                `विक्रम संवत् ${getNepaliDigits(currentView.year)}` : 
                `Bikram Sambat ${currentView.year}`
              }
            </h2>
            
            <div className="flex flex-col items-center sm:items-end mt-2 sm:mt-0">
              <span className="text-lg sm:text-xl font-bold">
                {useNepaliLanguage ? 
                  `${nepaliMonthsNp[currentView.month - 1]}` : 
                  `${nepaliMonthsEn[currentView.month - 1]}`
                }
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
        <div className="bg-blue-800 text-white p-1 sm:p-2 flex flex-wrap gap-1 sm:gap-2 justify-between items-center">
          {/* Month and Year selectors */}
          <div className="flex gap-1 sm:gap-2">
            {/* Month selector */}
            <Select 
              value={currentView.month.toString()} 
              onValueChange={handleMonthChange}
            >
              <SelectTrigger className="w-24 sm:w-32 bg-white text-blue-900 border-none h-8 sm:h-10 text-xs sm:text-sm">
                <SelectValue placeholder={useNepaliLanguage ? "महिना" : "Month"} />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {[...Array(12)].map((_, i) => (
                  <SelectItem key={i+1} value={(i+1).toString()} className="text-xs sm:text-sm">
                    {useNepaliLanguage ? nepaliMonthsNp[i] : nepaliMonthsEn[i]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Year selector - Direct input */}
            <form onSubmit={handleYearSubmit} className="flex">
              <Input 
                type="text"
                value={yearInput}
                onChange={handleYearInputChange}
                className="w-16 sm:w-24 bg-white text-blue-900 border-none h-8 sm:h-10 px-1 sm:px-3 text-xs sm:text-sm"
                onBlur={(e) => {
                  // Also submit on blur
                  handleYearSubmit(e);
                }}
              />
            </form>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Button 
              onClick={handleTodayClick}
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white/20 text-xs sm:text-sm h-8 sm:h-10 py-0 px-2 sm:px-3"
            >
              {useNepaliLanguage ? 'आज' : 'Today'}
            </Button>
            
            <Button
              onClick={handlePrevMonth}
              variant="outline"
              size="icon"
              className="bg-transparent border-white text-white hover:bg-white/20 h-8 w-8"
            >
              <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            
            <Button
              onClick={handleNextMonth}
              variant="outline"
              size="icon"
              className="bg-transparent border-white text-white hover:bg-white/20 h-8 w-8"
            >
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            
            <LanguageToggle
              useNepaliLanguage={useNepaliLanguage}
              onToggle={toggleLanguage}
            />
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/20 gap-1 h-8 sm:h-10 py-0 px-2 sm:px-3 text-xs sm:text-sm"
                >
                  <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline">{useNepaliLanguage ? 'मिति' : 'Date'}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white" align="end">
                <Calendar
                  mode="single"
                  selected={new Date()}
                  onSelect={handleEnglishDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        {/* Calendar Grid */}
        <div className="bg-white border-l border-r border-b border-gray-300">
          <CalendarGrid
            year={currentView.year}
            month={currentView.month}
            days={currentView.days}
            startWeekDay={currentView.startWeekDay}
            englishStartDate={currentView.englishStartDate}
            currentDate={today.year === currentView.year && today.month === currentView.month ? today : undefined}
            selectedDate={selectedDate || undefined}
            onDateSelect={handleDateSelect}
            useNepaliLanguage={useNepaliLanguage}
          />
        </div>
        
        {/* Current Selection Info */}
        {selectedDate && (
          <div className="mt-4 p-2 sm:p-4 bg-yellow-50 border border-yellow-300 rounded-lg text-center">
            <h3 className="font-medium text-yellow-800 text-sm sm:text-base">
              {useNepaliLanguage ? 'छनौट मिति:' : 'Selected Date:'}
            </h3>
            <div className="flex flex-col sm:flex-row justify-center items-center sm:gap-4 mt-1">
              <p className="font-bold text-sm sm:text-lg">
                {useNepaliLanguage ? 
                  `${nepaliMonthsNp[selectedDate.month - 1]} ${getNepaliDigits(selectedDate.day)}, ${getNepaliDigits(selectedDate.year)}` : 
                  `${nepaliMonthsEn[selectedDate.month - 1]} ${selectedDate.day}, ${selectedDate.year} BS`
                }
              </p>
              <span className="hidden sm:inline text-gray-500">|</span>
              <p className="text-gray-600 text-xs sm:text-base">
                {format(selectedDate.englishDate, 'PP')}
              </p>
            </div>
          </div>
        )}
        
        {/* Footer */}
        <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-500 pb-4 sm:pb-6">
          <p>{useNepaliLanguage ? '© २०८१ बिक्रम सम्वत क्यालेन्डर' : '© 2024 Bikram Sambat Calendar'}</p>
        </div>
      </div>
    </div>
  );
};

export default BikramCalendar;
