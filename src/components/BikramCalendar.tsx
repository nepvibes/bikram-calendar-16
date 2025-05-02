
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
  
  // Language toggle
  const [useNepaliLanguage, setUseNepaliLanguage] = useState<boolean>(false);
  
  // Custom year input
  const [yearInput, setYearInput] = useState<string>(today.year.toString());
  
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
  
  // Handler for direct year input
  const handleYearInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYearInput(e.target.value);
  };
  
  // Handle year input submit
  const handleYearSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const year = parseInt(yearInput);
    if (!isNaN(year) && year >= 1900 && year <= 2100) {
      setCurrentView(prev => getBikramMonth(year, prev.month));
    } else {
      toast.error("Please enter a valid year between 1900 and 2100");
      setYearInput(currentView.year.toString());
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
    <div className="min-h-screen bg-[url('/subtle-pattern.png')] pt-4">
      <Toaster richColors position="top-center" />
      
      {/* Calendar Container */}
      <div className="max-w-4xl mx-auto px-4">
        {/* Top header with month/year */}
        <div className="bg-red-700 text-white p-4 rounded-t-lg border-b-4 border-blue-800 relative overflow-hidden">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">
              {useNepaliLanguage ? 
                `विक्रम संवत् ${getNepaliDigits(currentView.year)}` : 
                `Bikram Sambat ${currentView.year}`
              }
            </h2>
            
            <div className="flex flex-col items-end">
              <span className="text-xl font-bold">
                {useNepaliLanguage ? 
                  `${nepaliMonthsNp[currentView.month - 1]}` : 
                  `${nepaliMonthsEn[currentView.month - 1]}`
                }
              </span>
              <span className="text-sm opacity-75">
                {format(currentView.englishStartDate, 'MMMM yyyy')} AD
              </span>
            </div>
          </div>
          
          {/* Decorative element */}
          <div className="absolute -right-16 -top-16 w-32 h-32 bg-yellow-500 rounded-full opacity-20"></div>
          <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-blue-500 rounded-full opacity-20"></div>
        </div>
        
        {/* Navigation controls */}
        <div className="bg-blue-800 text-white p-2 flex flex-wrap gap-2 justify-between items-center">
          {/* Month and Year selectors */}
          <div className="flex gap-2">
            {/* Month selector */}
            <Select 
              value={currentView.month.toString()} 
              onValueChange={handleMonthChange}
            >
              <SelectTrigger className="w-32 bg-white text-blue-900 border-none">
                <SelectValue placeholder={useNepaliLanguage ? "महिना" : "Month"} />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {[...Array(12)].map((_, i) => (
                  <SelectItem key={i+1} value={(i+1).toString()}>
                    {useNepaliLanguage ? nepaliMonthsNp[i] : nepaliMonthsEn[i]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Year selector - Direct input */}
            <form onSubmit={handleYearSubmit} className="flex">
              <Input 
                type="number"
                value={yearInput}
                onChange={handleYearInputChange}
                className="w-24 bg-white text-blue-900 border-none"
                min={1900}
                max={2100}
              />
            </form>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex items-center gap-1">
            <Button 
              onClick={handleTodayClick}
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white/20"
            >
              {useNepaliLanguage ? 'आज' : 'Today'}
            </Button>
            
            <Button
              onClick={handlePrevMonth}
              variant="outline"
              size="icon"
              className="bg-transparent border-white text-white hover:bg-white/20 h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button
              onClick={handleNextMonth}
              variant="outline"
              size="icon"
              className="bg-transparent border-white text-white hover:bg-white/20 h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            
            <LanguageToggle
              useNepaliLanguage={useNepaliLanguage}
              onToggle={toggleLanguage}
            />
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/20 gap-1"
                >
                  <CalendarIcon className="h-4 w-4" />
                  <span className="hidden md:inline">{useNepaliLanguage ? 'मिति छान्नुहोस्' : 'Pick Date'}</span>
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
            currentDate={today.year === currentView.year && today.month === currentView.month ? today : undefined}
            selectedDate={selectedDate || undefined}
            onDateSelect={handleDateSelect}
            useNepaliLanguage={useNepaliLanguage}
          />
        </div>
        
        {/* Current Selection Info */}
        {selectedDate && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-300 rounded-lg text-center">
            <h3 className="font-medium text-yellow-800">
              {useNepaliLanguage ? 'छनौट मिति:' : 'Selected Date:'}
            </h3>
            <div className="flex justify-center items-center gap-4 mt-1">
              <p className="font-bold text-lg">
                {useNepaliLanguage ? 
                  `${nepaliMonthsNp[selectedDate.month - 1]} ${getNepaliDigits(selectedDate.day)}, ${getNepaliDigits(selectedDate.year)}` : 
                  `${nepaliMonthsEn[selectedDate.month - 1]} ${selectedDate.day}, ${selectedDate.year} BS`
                }
              </p>
              <span className="text-gray-500">|</span>
              <p className="text-gray-600">
                {format(selectedDate.englishDate, 'PP')}
              </p>
            </div>
          </div>
        )}
        
        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500 pb-6">
          <p>{useNepaliLanguage ? '© २०८१ बिक्रम सम्वत क्यालेन्डर' : '© 2024 Bikram Sambat Calendar'}</p>
        </div>
      </div>
    </div>
  );
};

export default BikramCalendar;
