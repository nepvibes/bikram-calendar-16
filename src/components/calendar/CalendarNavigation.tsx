
import React from 'react';
import { CalendarDays, Printer, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';
import { nepaliMonthsEn, nepaliMonthsNp, getNepaliDigits, getEnglishDigits, containsNepaliDigits } from '@/utils/bikramConverter';
import { Dialog, DialogTrigger, DialogContent } from '../ui/dialog';
import DateConverter from '../DateConverter';

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
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    onMonthChange(e.target.value);
  };

  // Handle date selection from converter with dialog closing
  const handleDateSelect = (year: number, month: number, day: number) => {
    // Create a custom event to navigate to the selected date
    console.log(`Date selected in converter: ${year}-${month}-${day}`);
    const event = new CustomEvent('bikramDateSelected', {
      detail: { year, month, day }
    });
    window.dispatchEvent(event);
    
    // The dialog closing is handled within the DateConverter component
  };

  return (
    <div className="flex flex-col sm:flex-row flex-wrap justify-center sm:justify-between items-center gap-3 p-3 sm:p-4 bg-blue-600 text-white shadow-md no-print font-mukta-mahi">
      {/* Left Controls */}
      <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3">
        {/* Year Input */}
        <form onSubmit={onYearSubmit} className="flex items-center">
          <input
            type="text"
            value={yearInput}
            onChange={onYearInputChange}
            onClick={(e) => e.stopPropagation()}
            className={`h-9 w-20 rounded-xl border border-gray-300 bg-white text-sm text-center font-semibold shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none px-3 py-1 text-blue-800 font-mukta-mahi`}
            aria-label={useNepaliLanguage ? 'साल' : 'Year'}
          />
        </form>

        {/* Month Dropdown */}
        <div className="relative" onClick={(e) => e.stopPropagation()} onTouchStart={(e) => e.stopPropagation()}>
          <select
            value={currentMonth}
            onChange={handleMonthChange}
            className="h-9 rounded-xl border border-gray-300 bg-white text-sm font-semibold shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-300 px-3 pr-8 text-blue-800 appearance-none font-mukta-mahi"
          >
            {(useNepaliLanguage ? nepaliMonthsNp : nepaliMonthsEn).map((month, idx) => (
              <option key={idx} value={idx + 1} className="font-mukta-mahi">
                {month}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-600">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

        {/* Today Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onTodayClick}
          className="h-9 bg-white hover:bg-blue-50 text-blue-700 font-semibold rounded-xl font-mukta-mahi"
        >
          {useNepaliLanguage ? 'आज' : 'Today'}
        </Button>

        {/* Date Converter with improved dialog handling */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-9 bg-white hover:bg-blue-50 text-blue-700 font-semibold rounded-xl flex items-center font-mukta-mahi"
              title={useNepaliLanguage ? 'मिति परिवर्तक' : 'Date Converter'}
            >
              <RefreshCw className="mr-1 h-4 w-4 text-blue-700" />
              <span className="hidden sm:inline">{useNepaliLanguage ? 'मिति परिवर्तक' : 'Convert'}</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] p-0 rounded-xl font-mukta-mahi">
            <DateConverter 
              useNepaliLanguage={useNepaliLanguage} 
              onDateSelect={handleDateSelect}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Right Controls */}
      <div className="flex items-center justify-center sm:justify-end gap-3">
        <Button 
          onClick={onToggleLanguage} 
          variant="outline"
          size="sm"
          className="h-9 bg-white hover:bg-blue-50 text-blue-700 font-semibold rounded-xl font-mukta-mahi"
        >
          {useNepaliLanguage ? 'English' : 'नेपाली'}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onPrint}
          className="h-9 bg-white hover:bg-blue-50 text-blue-700 font-semibold rounded-xl flex items-center font-mukta-mahi"
        >
          <Printer className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">{useNepaliLanguage ? 'प्रिन्ट' : 'Print'}</span>
        </Button>
      </div>
    </div>
  );
};

export default CalendarNavigation;
