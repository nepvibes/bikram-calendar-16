
import React, { useState, useEffect } from 'react';
import { BikramDateObj, BikramMonth, getToday, getBikramMonth, nepaliMonthsEn, nepaliMonthsNp } from '../utils/bikramConverter';
import CalendarGrid from './CalendarGrid';
import DateConverter from './DateConverter';
import LanguageToggle from './LanguageToggle';
import { Card, CardContent } from './ui/card';
import { Toaster } from './ui/sonner';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

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

  // Available years for dropdown (from 2000 BS to 2089 BS)
  const availableYears = Array.from({ length: 90 }, (_, i) => 2000 + i);
  
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
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Toaster richColors />
      
      {/* Header with title and Nepali design elements */}
      <div className="mb-6 relative nepali-decoration pt-8 pb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-nepali-red">
          {useNepaliLanguage ? 'बिक्रम सम्वत पात्रो' : 'Bikram Sambat Calendar'}
        </h1>
      </div>
      
      <Card className="bg-nepali-offwhite border-nepali-yellow/30 shadow-lg rounded-xl overflow-hidden">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-col md:flex-row gap-2">
              {/* Year Dropdown */}
              <Select 
                value={currentView.year.toString()} 
                onValueChange={handleYearChange}
              >
                <SelectTrigger className="w-[120px] bg-nepali-yellow/10 border-nepali-yellow hover:bg-nepali-yellow hover:text-nepali-dark">
                  <SelectValue placeholder={useNepaliLanguage ? "वर्ष" : "Year"} />
                </SelectTrigger>
                <SelectContent>
                  {availableYears.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {useNepaliLanguage ? getNepaliDigits(year) : year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Month Dropdown */}
              <Select 
                value={currentView.month.toString()} 
                onValueChange={handleMonthChange}
              >
                <SelectTrigger className="w-[120px] bg-nepali-yellow/10 border-nepali-yellow hover:bg-nepali-yellow hover:text-nepali-dark">
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
              
              <button 
                onClick={handleTodayClick} 
                className="px-4 py-1.5 text-sm bg-nepali-yellow/10 border border-nepali-yellow rounded hover:bg-nepali-yellow hover:text-nepali-dark"
              >
                {useNepaliLanguage ? 'आज' : 'Today'}
              </button>
              
              <div className="flex space-x-2">
                <button
                  onClick={handlePrevMonth}
                  className="p-1.5 bg-nepali-red/10 border border-nepali-red rounded hover:bg-nepali-red hover:text-white"
                >
                  ◀
                </button>
                <button
                  onClick={handleNextMonth}
                  className="p-1.5 bg-nepali-red/10 border border-nepali-red rounded hover:bg-nepali-red hover:text-white"
                >
                  ▶
                </button>
              </div>
            </div>
            
            <LanguageToggle
              useNepaliLanguage={useNepaliLanguage}
              onToggle={toggleLanguage}
            />
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
          
          {/* Date Converter */}
          <DateConverter useNepaliLanguage={useNepaliLanguage} />
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
