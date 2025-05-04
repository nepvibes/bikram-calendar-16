
import React from 'react';
import { EventData } from '@/types/events';
import { nepaliMonthsEn, nepaliMonthsNp, getNepaliDigits } from '@/utils/bikramConverter';
import CalendarGrid from './CalendarGrid';
import EventModal from './EventModal';
import UpcomingEvents from './UpcomingEvents';
import { useCalendarState } from '@/hooks/useCalendarState';
import { Card } from './ui/card';
import { Toaster } from './ui/sonner';
import { toast } from 'sonner';
import CalendarHeader from './calendar/CalendarHeader';
import CalendarNavigation from './calendar/CalendarNavigation';

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
    calendarState.setSelectedDate({
      year,
      month,
      day,
      englishDate: new Date() // This is a placeholder, will be updated by the system
    });

    // Show a notification
    toast.info(calendarState.useNepaliLanguage ? 
      `${nepaliMonthsNp[month - 1]} ${getNepaliDigits(day)}, ${getNepaliDigits(year)} मा भएको कार्यक्रम देखाउँदै` : 
      `Showing event on ${nepaliMonthsEn[month - 1]} ${day}, ${year}`);
  };
  
  return (
    <div className="min-h-screen bg-[url('/subtle-pattern.png')] pt-2 md:pt-4">
      <Toaster richColors position="top-center" />
      
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
          onEnglishDateSelect={calendarState.handleEnglishDateSelect}
        />
        
        {/* Calendar Grid */}
        <div className="border-l border-r border-b border-gray-300 bg-white rounded-b-xl overflow-hidden shadow-lg">
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
          eventTextColor="text-black"
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
