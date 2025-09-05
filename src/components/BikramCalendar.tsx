import React, { useEffect } from 'react';
import { EventData } from '@/types/events';
import { nepaliMonthsEn, nepaliMonthsNp, getNepaliDigits } from '@/utils/bikramConverter';
import CalendarGrid from './CalendarGrid';
import EventModal from './EventModal';
import UpcomingEvents from './upcoming-events';
import { useCalendarState } from '@/hooks/useCalendarState';
import { Card } from './ui/card';
import CalendarHeader from './calendar/CalendarHeader';
import CalendarNavigation from './calendar/CalendarNavigation';
import DateConverter from './DateConverter';
import { DialogClose, DialogContent, DialogTrigger, Dialog } from './ui/dialog';


const BikramCalendar: React.FC = () => {
  const calendarState = useCalendarState();
  
  // Handle event click
  const handleEventClick = (eventData: EventData): void => {
    const updatedEventData = {
      ...eventData,
      year: calendarState.currentView.year,
      month: calendarState.currentView.month
    };
    calendarState.setEventModalData(updatedEventData);
    calendarState.setEventModalOpen(true);
  };
  
  // Handle Print button
  const handlePrint = () => {
    window.print();
  };
  
  // New function to navigate to a specific date when clicking on an upcoming event
  const handleUpcomingEventClick = (year: number, month: number, day: number) => {
    // Set the calendar view to the event's month and year
    calendarState.setCurrentView(prev => ({
      ...prev,
      year,
      month
    }));
    
    // Create a selected date object
    const selectedDate = {
      year,
      month,
      day,
      englishDate: new Date() // This will be updated by the system
    };
    
    // Update the selected date
    calendarState.setSelectedDate(selectedDate);
  };

  // Handle date navigation from converter
  const handleDateNavigate = (year: number, month: number, day: number) => {
    // Update the calendar view to the selected date
    calendarState.setCurrentView(prev => ({
      ...prev,
      year,
      month
    }));
    
    // Also update the year input to match the selected year
    calendarState.setYearInput(
      calendarState.useNepaliLanguage ? getNepaliDigits(year) : year.toString()
    );
    
    // Select the day after the view is updated
    setTimeout(() => {
      if (calendarState.handleDateSelect) {
        calendarState.handleDateSelect(day);
      }
    }, 200);
  };
  
  // Listen for bikramDateSelected events from the DateConverter component
  useEffect(() => {
    const handleBikramDateSelected = (event: CustomEvent) => {
      const { year, month, day } = event.detail;
      handleDateNavigate(year, month, day);
    };
    
    window.addEventListener('bikramDateSelected', handleBikramDateSelected as EventListener);
    
    return () => {
      window.removeEventListener('bikramDateSelected', handleBikramDateSelected as EventListener);
    };
  }, [calendarState]);

  // Update calendar view when event modal data changes
  useEffect(() => {
    if (calendarState.eventModalData) {
      const { year, month } = calendarState.eventModalData;
      if (year !== calendarState.currentView.year || month !== calendarState.currentView.month) {
        calendarState.setCurrentView(prev => ({
          ...prev,
          year,
          month
        }));
      }
    }
  }, [calendarState.eventModalData]);
  
  return (
    <div className="min-h-screen" style={{ backgroundImage: `url(/subtle-pattern.png)` }} >
      {/* Calendar Container */}
      <div className="mx-auto px-2 sm:px-4 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl">
        {/* Top header with month/year */}
        <CalendarHeader 
          currentView={calendarState.currentView}
          useNepaliLanguage={calendarState.useNepaliLanguage}
          usingApproximation={calendarState.usingApproximation}
        />
        
        {/* Navigation controls */}
        <CalendarNavigation 
          useNepaliLanguage={calendarState.useNepaliLanguage}
          currentMonth={calendarState.currentView.month}
          yearInput={calendarState.yearInput}
          onPrevMonth={calendarState.handlePrevMonth}
          onNextMonth={calendarState.handleNextMonth}
          onTodayClick={calendarState.handleTodayClick}
          onMonthChange={calendarState.handleMonthChange}
          onYearInputChange={calendarState.handleYearInputChange}
          onYearSubmit={calendarState.handleYearSubmit}
          onPrint={handlePrint}
          onToggleLanguage={calendarState.toggleLanguage}
        />
        
        {/* Calendar Grid */}
        <div className="border-l border-r border-b border-gray-300 bg-white rounded-b-xl overflow-hidden shadow-lg beautiful-calendar-grid">
          <CalendarGrid 
            year={calendarState.currentView.year} 
            month={calendarState.currentView.month} 
            days={calendarState.currentView.days} 
            startWeekDay={calendarState.currentView.startWeekDay} 
            englishStartDate={calendarState.currentView.englishStartDate} 
            currentDate={calendarState.today.year === calendarState.currentView.year && calendarState.today.month === calendarState.currentView.month ? calendarState.today : undefined} 
            selectedDate={calendarState.selectedDate || undefined} 
            onDateSelect={calendarState.handleDateSelect} 
            useNepaliLanguage={calendarState.useNepaliLanguage} 
            events={calendarState.events} 
            onEventClick={handleEventClick} 
            usingApproximation={calendarState.usingApproximation} 
          />
        </div>
        
        {/* Upcoming Events List with customizable UI properties */}
        <UpcomingEvents 
          events={calendarState.events} 
          currentDate={calendarState.today} 
          useNepaliLanguage={calendarState.useNepaliLanguage} 
          onEventClick={handleUpcomingEventClick} 
          maxEvents={5}
          headerBgColor="bg-gradient-to-r from-blue-800 to-blue-600"
          headerTextColor="text-white"
          eventItemBgColor="bg-white"
          eventTextColor="text-blue-500"
          eventDateColor="text-gray-500"
          todayBadgeBgColor="bg-green-100"
          todayBadgeTextColor="text-green-800"
          futureBadgeBgColor="bg-blue-100"
          futureBadgeTextColor="text-blue-800"
          borderRadius="rounded-lg"
          boxShadow="shadow-md"
        />
        
        {/* Footer */}
        <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-500 pb-4 sm:pb-6 no-print">
          <p className={calendarState.useNepaliLanguage ? "nepali-text" : ""}>
            {calendarState.useNepaliLanguage ? '© २०८१ बिक्रम सम्वत क्यालेन्डर' : '© 2024 Bikram Sambat Calendar'}
          </p>
        </div>
      </div>
      
      {/* Event Modal */}
      <EventModal 
        isOpen={calendarState.eventModalOpen} 
        onClose={() => calendarState.setEventModalOpen(false)} 
        eventData={calendarState.eventModalData} 
        useNepaliLanguage={calendarState.useNepaliLanguage} 
      />
    </div>
  );
};

export default BikramCalendar;
