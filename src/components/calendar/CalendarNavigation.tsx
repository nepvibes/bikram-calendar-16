
import React from 'react';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, Printer, CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from '@/components/ui/input';
import LanguageToggle from '@/components/LanguageToggle';
import { nepaliMonthsEn, nepaliMonthsNp, getNepaliDigits, containsNepaliDigits, getEnglishDigits } from '@/utils/bikramConverter';

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
  onEnglishDateSelect: (date: Date | undefined) => void;
}

const CalendarNavigation: React.FC<CalendarNavigationProps> = ({
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
  onToggleLanguage,
  onEnglishDateSelect
}) => {
  // Create a separate handler for month selection to stop event propagation
  const handleMonthSelectChange = (value: string) => {
    // Stop propagation to prevent the event from reaching calendar day cells
    onMonthChange(value);
  };

  return (
    <div className="text-white p-1 sm:p-2 flex flex-wrap gap-1 sm:gap-2 justify-between items-center bg-gradient-to-r from-[#3285e9] to-blue-600 no-print">
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Year and Month selectors - Nepali date selection first */}
        <form onSubmit={onYearSubmit} className="flex">
          <Input 
            type="text" 
            value={yearInput} 
            onChange={onYearInputChange} 
            className={`w-16 sm:w-20 bg-white/90 text-blue-900 border-none h-8 sm:h-9 px-1 sm:px-2 text-xs sm:text-sm rounded-l-md ${useNepaliLanguage ? "font-laila" : ""}`} 
            onBlur={onYearSubmit} 
          />
        </form>
        
        <Select value={currentMonth.toString()} onValueChange={handleMonthSelectChange}>
          <SelectTrigger 
            className="w-20 sm:w-28 bg-white/90 text-blue-900 border-none h-8 sm:h-9 text-xs sm:text-sm"
            onClick={(e) => {
              // Stop propagation to prevent clicks from reaching calendar cells
              e.stopPropagation();
            }}
          >
            <SelectValue placeholder={useNepaliLanguage ? "महिना" : "Month"} />
          </SelectTrigger>
          <SelectContent 
            className="bg-white"
            onPointerDownOutside={(e) => {
              // Prevent closing the dropdown when clicking outside
              e.preventDefault();
            }}
          >
            {[...Array(12)].map((_, i) => (
              <SelectItem 
                key={i + 1} 
                value={(i + 1).toString()} 
                className={`text-xs sm:text-sm ${useNepaliLanguage ? "font-laila" : ""}`}
                onPointerDown={(e) => {
                  // Stop propagation to prevent clicks from reaching calendar cells
                  e.stopPropagation();
                }}
              >
                {useNepaliLanguage ? nepaliMonthsNp[i] : nepaliMonthsEn[i]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Month navigation buttons */}
        <Button onClick={onTodayClick} variant="outline" className={`bg-transparent/10 border border-white/40 text-white hover:bg-white/20 text-xs h-8 sm:h-9 py-0 px-2 rounded-md ${useNepaliLanguage ? "font-laila" : ""}`}>
          {useNepaliLanguage ? 'आज' : 'Today'}
        </Button>

        {/* English calendar picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="bg-transparent/10 border border-white/40 text-white hover:bg-white/20 h-8 sm:h-9 py-0 px-2 rounded-md flex items-center gap-1">
              <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className={`hidden xs:inline text-xs ${useNepaliLanguage ? "font-laila" : ""}`}>
                {useNepaliLanguage ? 'मिति' : 'Date'}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white" align="start">
            <Calendar 
              mode="single" 
              selected={new Date()} 
              onSelect={onEnglishDateSelect} 
              initialFocus 
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>
      
      {/* Right-aligned buttons */}
      <div className="flex items-center gap-1 sm:gap-2 ml-auto">
        {/* Print button */}
        <Button onClick={onPrint} variant="outline" className="bg-transparent/10 border border-white/40 text-white hover:bg-white/20 text-xs h-8 sm:h-9 py-0 px-2 rounded-md flex items-center gap-1">
          <Printer className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden xs:inline">{useNepaliLanguage ? 'प्रिन्ट' : 'Print'}</span>
        </Button>
        
        {/* Language toggle button */}
        <LanguageToggle useNepaliLanguage={useNepaliLanguage} onToggle={onToggleLanguage} />
      </div>
    </div>
  );
};

export default CalendarNavigation;
