
import React, { useState, useEffect, useRef } from 'react';
import { BikramDateObj, BikramMonth, getToday, getBikramMonth, nepaliMonthsEn, nepaliMonthsNp, getNepaliDigits } from '../utils/bikramConverter';
import CalendarGrid from './CalendarGrid';
import LanguageToggle from './LanguageToggle';
import { Card, CardContent } from './ui/card';
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

const BikramCalendar: React.FC = () => {
  // Today's date in Bikram Sambat
  const [today, setToday] = useState<BikramDateObj>(getToday());
  
  // Current view state (month, year)
  const [currentView, setCurrentView] = useState<BikramMonth>(() => {
    return getBikramMonth(today.year, today.month);
  });
  
  // Selected date
  const [selectedDate, setSelectedDate] = useState<BikramDateObj | null>(null);
  
  // Language toggle
  const [useNepaliLanguage, setUseNepaliLanguage] = useState<boolean>(false);
  
  // Custom year input
  const [yearInput, setYearInput] = useState<string>(today.year.toString());
  const yearInputRef = useRef<HTMLInputElement>(null);

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
    setYearInput(todayDate.year.toString());
    toast(`Showing today: ${nepaliMonthsEn[todayDate.month - 1]} ${todayDate.day}, ${todayDate.year} BS`);
  };

  // Handler for month change from dropdown
  const handleMonthChange = (value: string) => {
    const month = parseInt(value);
    setCurrentView(prev => getBikramMonth(prev.year, month));
  };

  // Handler for year change from dropdown
  const handleYearChange = (value: string) => {
    const year = parseInt(value);
    setYearInput(value);
    setCurrentView(prev => getBikramMonth(year, prev.month));
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
    toast(`Selected: ${nepaliMonthsEn[newSelectedDate.month - 1]} ${newSelectedDate.day}, ${newSelectedDate.year} BS`);
  };
  
  // Toggle language
  const toggleLanguage = () => {
    setUseNepaliLanguage(prev => !prev);
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
      setYearInput(bikramDate.year.toString());
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Toaster richColors />
      
      {/* Header with title and design elements */}
      <div className="mb-8 text-center relative nepali-decoration pt-8 pb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-nepali-red relative inline-block">
          {useNepaliLanguage ? 'बिक्रम सम्वत पात्रो' : 'Bikram Sambat Calendar'}
          <div className="absolute w-full h-1 bg-nepali-yellow bottom-0 left-0 mt-2"></div>
        </h1>
      </div>
      
      <Card className="bg-nepali-offwhite border-nepali-yellow/30 shadow-lg rounded-xl overflow-hidden">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex items-center gap-3">
              {/* Year Input */}
              <div className="relative">
                <Select 
                  value={yearInput} 
                  onValueChange={handleYearChange}
                >
                  <SelectTrigger className="w-24 md:w-28 bg-nepali-yellow/10 border-nepali-yellow hover:bg-nepali-yellow hover:text-nepali-dark">
                    <SelectValue placeholder={useNepaliLanguage ? "वर्ष" : "Year"} />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {availableYears.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {useNepaliLanguage ? getNepaliDigits(year) : year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Month Selection */}
              <Select 
                value={currentView.month.toString()} 
                onValueChange={handleMonthChange}
              >
                <SelectTrigger className="w-32 md:w-40 bg-nepali-yellow/10 border-nepali-yellow hover:bg-nepali-yellow hover:text-nepali-dark">
                  <SelectValue placeholder={useNepaliLanguage ? "महिना" : "Month"} />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(12)].map((_, i) => (
                    <SelectItem key={i+1} value={(i+1).toString()}>
                      {useNepaliLanguage ? nepaliMonthsNp[i] : nepaliMonthsEn[i]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              {/* English Date Picker */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="px-3 bg-nepali-red/10 border-nepali-red hover:bg-nepali-red hover:text-white gap-2"
                  >
                    <CalendarIcon className="h-4 w-4" />
                    <span className="hidden md:inline">{useNepaliLanguage ? 'अङ्ग्रेजी मिति' : 'English Date'}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={new Date()}
                    onSelect={handleEnglishDateSelect}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              <Button 
                onClick={handleTodayClick} 
                variant="outline"
                className="px-3 bg-nepali-yellow/10 border-nepali-yellow hover:bg-nepali-yellow hover:text-nepali-dark"
              >
                {useNepaliLanguage ? 'आज' : 'Today'}
              </Button>
              
              <LanguageToggle
                useNepaliLanguage={useNepaliLanguage}
                onToggle={toggleLanguage}
              />
              
              <div className="flex">
                <Button
                  onClick={handlePrevMonth}
                  variant="outline"
                  size="icon"
                  className="rounded-r-none bg-nepali-red/10 border-nepali-red hover:bg-nepali-red hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  onClick={handleNextMonth}
                  variant="outline"
                  size="icon"
                  className="rounded-l-none bg-nepali-red/10 border-nepali-red hover:bg-nepali-red hover:text-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Month and Year Display */}
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-nepali-dark">
              {useNepaliLanguage ? 
                `${nepaliMonthsNp[currentView.month - 1]} ${getNepaliDigits(currentView.year)}` : 
                `${nepaliMonthsEn[currentView.month - 1]} ${currentView.year} BS`
              }
            </h2>
            <p className="text-sm text-nepali-dark/60 mt-1">
              {format(currentView.englishStartDate, 'MMMM yyyy')} {useNepaliLanguage ? 'अङ्ग्रेजी' : 'AD'}
            </p>
          </div>
          
          {/* Calendar Grid */}
          <CalendarGrid
            year={currentView.year}
            month={currentView.month}
            days={currentView.days}
            startWeekDay={currentView.startWeekDay}
            currentDate={today.year === currentView.year && today.month === currentView.month ? today : undefined}
            selectedDate={selectedDate || undefined}
            onDateSelect={handleDateSelect}
            useNepaliLanguage={useNepaliLanguage}
          />
          
          {/* Current Selection Info */}
          {selectedDate && (
            <div className="mt-6 p-3 bg-nepali-red/5 border border-nepali-red/20 rounded-lg">
              <h3 className="font-medium text-nepali-red">
                {useNepaliLanguage ? 'छनौट मिति:' : 'Selected Date:'}
              </h3>
              <div className="flex justify-between items-center mt-1">
                <p>
                  {useNepaliLanguage ? 
                    `${nepaliMonthsNp[selectedDate.month - 1]} ${getNepaliDigits(selectedDate.day)}, ${getNepaliDigits(selectedDate.year)}` : 
                    `${nepaliMonthsEn[selectedDate.month - 1]} ${selectedDate.day}, ${selectedDate.year} BS`
                  }
                </p>
                <p className="text-sm text-nepali-dark/70">
                  {format(selectedDate.englishDate, 'PP')}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Footer */}
      <div className="mt-6 text-center text-sm text-nepali-dark/70">
        <p>{useNepaliLanguage ? '© २०८१ बिक्रम सम्वत क्यालेन्डर' : '© 2024 Bikram Sambat Calendar'}</p>
      </div>
    </div>
  );
};

export default BikramCalendar;
