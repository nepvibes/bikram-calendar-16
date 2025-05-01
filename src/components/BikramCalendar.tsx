
import React, { useState, useEffect } from 'react';
import { BikramDate, BikramMonth, getToday, getBikramMonth, nepaliMonthsEn } from '../utils/bikramConverter';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import DateConverter from './DateConverter';
import LanguageToggle from './LanguageToggle';
import { Card, CardContent } from './ui/card';
import { Toaster } from './ui/sonner';
import { toast } from 'sonner';

const BikramCalendar: React.FC = () => {
  // Today's date in Bikram Sambat
  const [today, setToday] = useState<BikramDate>(getToday());
  
  // Current view state (month, year)
  const [currentView, setCurrentView] = useState<BikramMonth>(() => {
    return getBikramMonth(today.year, today.month);
  });
  
  // Selected date
  const [selectedDate, setSelectedDate] = useState<BikramDate | null>(null);
  
  // Language toggle
  const [useNepaliLanguage, setUseNepaliLanguage] = useState<boolean>(false);
  
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
  
  // Handle date selection
  const handleDateSelect = (day: number) => {
    const newSelectedDate: BikramDate = {
      year: currentView.year,
      month: currentView.month,
      day: day,
      englishDate: new Date(), // This will be calculated properly in a real implementation
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
            <CalendarHeader
              currentMonth={currentView.month}
              currentYear={currentView.year}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
              onTodayClick={handleTodayClick}
              useNepaliLanguage={useNepaliLanguage}
            />
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
