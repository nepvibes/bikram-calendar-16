
import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalIcon, Printer, Languages } from 'lucide-react';
import { Button } from '../ui/button';
import { nepaliMonthsEn, nepaliMonthsNp, getNepaliDigits } from '@/utils/bikramConverter';

interface CalendarNavigationProps {
  useNepaliLanguage: boolean;
  currentMonth: number;
  yearInput: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onTodayClick: () => void;
  onMonthChange: (value: string) => void;
  onYearInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onYearSubmit: (e: React.FormEvent) => void;
  onPrint: () => void;
  onToggleLanguage: () => void;
  onEnglishDateSelect?: (date: Date) => void;
}

const CalendarNavigation = ({
  useNepaliLanguage,
  currentMonth,
  yearInput,
  onPrevMonth,
  onNextMonth,
  onTodayClick,
  onMonthChange,
  onYearInputChange,
  onYearSubmit,
  onPrint,
  onToggleLanguage
}: CalendarNavigationProps) => {
  // Handle month change with stopPropagation to prevent clicks on calendar days
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    onMonthChange(e.target.value);
  };
  
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:items-center justify-between mb-1 sm:mb-2 md:mb-4 no-print">
      {/* Left controls - Month selection and navigation */}
      <div className="flex items-center gap-1 sm:gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 sm:h-9 sm:w-9"
          onClick={onPrevMonth}
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="sr-only">Previous Month</span>
        </Button>
        
        <div 
          className="relative"
          onClick={(e) => e.stopPropagation()} // Stop propagation on the container
        >
          <select 
            value={currentMonth} 
            onChange={handleMonthChange} 
            className="h-8 sm:h-9 rounded-md border border-gray-300 bg-white text-sm font-medium shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none pl-3 pr-8 py-0"
          >
            {(useNepaliLanguage ? nepaliMonthsNp : nepaliMonthsEn).map((month, idx) => (
              <option key={idx} value={idx + 1} className={useNepaliLanguage ? "font-laila" : ""}>
                {month}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 sm:h-9 sm:w-9"
          onClick={onNextMonth}
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="sr-only">Next Month</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 sm:h-9 hidden sm:flex"
          onClick={onTodayClick}
        >
          <CalIcon className="mr-1 h-4 w-4" />
          <span>{useNepaliLanguage ? 'आज' : 'Today'}</span>
        </Button>
      </div>
      
      {/* Right controls - Year input, today (on mobile), print, language */}
      <div className="flex items-center justify-between sm:justify-end gap-1 sm:gap-2 mt-2 sm:mt-0">
        <form onSubmit={onYearSubmit} className="flex items-center">
          <input
            type="text"
            value={yearInput}
            onChange={onYearInputChange}
            className={`h-8 sm:h-9 w-16 sm:w-20 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-center ${useNepaliLanguage ? "font-laila" : ""}`}
            aria-label={useNepaliLanguage ? "साल" : "Year"}
          />
        </form>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 sm:h-9 sm:hidden"
          onClick={onTodayClick}
        >
          <CalIcon className="mr-1 h-4 w-4" />
          <span>{useNepaliLanguage ? 'आज' : 'Today'}</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 sm:h-9 sm:w-9"
          onClick={onPrint}
        >
          <Printer className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="sr-only">{useNepaliLanguage ? 'प्रिन्ट गर्नुहोस्' : 'Print'}</span>
        </Button>
        
        <Button 
          variant={useNepaliLanguage ? "default" : "outline"} 
          size="icon" 
          className="h-8 w-8 sm:h-9 sm:w-9"
          onClick={onToggleLanguage}
        >
          <Languages className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="sr-only">{useNepaliLanguage ? 'Switch to English' : 'नेपालीमा हेर्नुहोस्'}</span>
        </Button>
      </div>
    </div>
  );
};

export default CalendarNavigation;
