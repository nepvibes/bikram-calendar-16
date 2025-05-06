
import React from 'react';
import { Calendar as CalIcon, Printer, CalendarDays } from 'lucide-react';
import { Button } from '../ui/button';
import { nepaliMonthsEn, nepaliMonthsNp, getNepaliDigits } from '@/utils/bikramConverter';
import { Dialog, DialogTrigger, DialogContent } from '../ui/dialog';
import DateConverter from '../DateConverter';
import LanguageToggle from '../LanguageToggle';

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
    <div className="flex flex-col sm:flex-row gap-2 sm:items-center justify-between mb-1 sm:mb-2 md:mb-4 no-print bg-blue-600 p-2 sm:p-3 rounded-t-lg">
      {/* Left controls - Year input, Month selection, Today button, Date converter */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Year Input */}
        <form onSubmit={onYearSubmit} className="flex items-center">
          <input
            type="text"
            value={yearInput}
            onChange={onYearInputChange}
            className={`h-8 sm:h-9 w-16 sm:w-20 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium shadow-sm focus:border-blue-300 focus:ring-1 focus:ring-blue-300 text-center ${useNepaliLanguage ? "font-laila" : ""}`}
            aria-label={useNepaliLanguage ? "साल" : "Year"}
            onClick={(e) => e.stopPropagation()}
          />
        </form>
        
        {/* Month Dropdown */}
        <div 
          className="relative"
          onClick={(e) => e.stopPropagation()} 
          onTouchStart={(e) => e.stopPropagation()}
        >
          <select 
            value={currentMonth} 
            onChange={handleMonthChange} 
            className="h-8 sm:h-9 rounded-md border border-gray-300 bg-white text-sm font-medium shadow-sm focus:border-blue-300 focus:ring-1 focus:ring-blue-300 appearance-none pl-3 pr-8 py-0"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
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
        
        {/* Today Button */}
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 sm:h-9 bg-white hover:bg-blue-50 text-blue-700 rounded-md"
          onClick={onTodayClick}
        >
          <CalIcon className="mr-1 h-4 w-4" />
          <span>{useNepaliLanguage ? 'आज' : 'Today'}</span>
        </Button>
        
        {/* Date Converter Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className="h-8 sm:h-9 bg-white hover:bg-blue-50 text-blue-700 rounded-md flex items-center"
              title={useNepaliLanguage ? "मिति परिवर्तक" : "Date Converter"}
            >
              <CalendarDays className="mr-1 h-4 w-4" />
              <span className="hidden sm:inline">{useNepaliLanguage ? 'मिति परिवर्तक' : 'Convert'}</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] rounded-lg">
            <DateConverter useNepaliLanguage={useNepaliLanguage} />
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Right controls - Language toggle and Print */}
      <div className="flex items-center justify-end gap-2">
        <LanguageToggle 
          useNepaliLanguage={useNepaliLanguage} 
          onToggle={onToggleLanguage} 
        />
        
        <Button 
          variant="outline" 
          size="sm"
          className="h-8 sm:h-9 bg-white hover:bg-blue-50 text-blue-700 rounded-md"
          onClick={onPrint}
        >
          <Printer className="mr-1 h-4 w-4" />
          <span className="hidden sm:inline">{useNepaliLanguage ? 'प्रिन्ट' : 'Print'}</span>
        </Button>
      </div>
    </div>
  );
};

export default CalendarNavigation;
