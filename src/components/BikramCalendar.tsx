
import React, { useState, useEffect } from 'react';
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
    <div className="min-h-screen py-8 px-4 bg-nepali-offwhite">
      <Toaster richColors position="top-center" />
      
      {/* Calendar Container */}
      <div className="max-w-4xl mx-auto">
        {/* Header with title and design elements */}
        <div className="mb-8 text-center relative nepali-decoration pt-10 pb-8">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-nepali-red rounded-b-lg shadow-lg flex items-center justify-center">
            <span className="text-white font-bold">
              {useNepaliLanguage ? '२०८१' : '2024'}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-nepali-red relative inline-block">
            {useNepaliLanguage ? 'बिक्रम सम्वत पात्रो' : 'Bikram Sambat Calendar'}
            <div className="absolute w-full h-1 bg-nepali-yellow bottom-0 left-0 mt-2"></div>
          </h1>
        </div>
        
        <Card className="bg-white border-nepali-yellow/30 shadow-lg rounded-xl overflow-hidden">
          <div className="bg-nepali-red text-white py-3 px-4 flex justify-between items-center">
            <Button 
              onClick={handleTodayClick}
              variant="ghost" 
              className="text-white hover:bg-nepali-red/80 hover:text-white"
            >
              {useNepaliLanguage ? 'आज' : 'Today'}
            </Button>
            
            <div className="flex items-center gap-3">
              <Button
                onClick={handlePrevMonth}
                variant="ghost"
                size="icon"
                className="text-white hover:bg-nepali-red/80 hover:text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <h2 className="text-xl md:text-2xl font-bold">
                {useNepaliLanguage ? 
                  `${nepaliMonthsNp[currentView.month - 1]} ${getNepaliDigits(currentView.year)}` : 
                  `${nepaliMonthsEn[currentView.month - 1]} ${currentView.year} BS`
                }
              </h2>
              
              <Button
                onClick={handleNextMonth}
                variant="ghost"
                size="icon"
                className="text-white hover:bg-nepali-red/80 hover:text-white"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-nepali-red/80 hover:text-white gap-2"
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
              
              <LanguageToggle
                useNepaliLanguage={useNepaliLanguage}
                onToggle={toggleLanguage}
              />
            </div>
          </div>
          
          <CardContent className="p-0">
            <div className="p-4 bg-nepali-blue/5 border-b border-nepali-blue/10 flex flex-wrap gap-3 justify-center md:justify-between">
              {/* Year Selection */}
              <Select 
                value={yearInput} 
                onValueChange={handleYearChange}
              >
                <SelectTrigger className="w-28 bg-white border-nepali-yellow hover:border-nepali-yellow/80">
                  <SelectValue placeholder={useNepaliLanguage ? "वर्ष" : "Year"} />
                </SelectTrigger>
                <SelectContent className="max-h-60 bg-white">
                  {availableYears.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {useNepaliLanguage ? getNepaliDigits(year) : year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Month Selection */}
              <Select 
                value={currentView.month.toString()} 
                onValueChange={handleMonthChange}
              >
                <SelectTrigger className="w-40 bg-white border-nepali-yellow hover:border-nepali-yellow/80">
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
              
              <p className="text-sm text-nepali-dark/60 self-center hidden md:block">
                {format(currentView.englishStartDate, 'MMMM yyyy')} {useNepaliLanguage ? 'अङ्ग्रेजी' : 'AD'}
              </p>
            </div>
            
            {/* Calendar Grid */}
            <div className="p-5">
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
              <div className="m-5 p-4 bg-nepali-red/5 border border-nepali-red/20 rounded-lg">
                <h3 className="font-medium text-nepali-red">
                  {useNepaliLanguage ? 'छनौट मिति:' : 'Selected Date:'}
                </h3>
                <div className="flex justify-between items-center mt-1">
                  <p className="font-bold">
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
    </div>
  );
};

export default BikramCalendar;
