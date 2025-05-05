
import React from 'react';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, Printer, CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from '@/components/ui/input';
import LanguageToggle from '@/components/LanguageToggle';
import { ThemeToggle } from '@/components/ThemeToggle';
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
  return (
    <div className="text-white p-1 sm:p-2 flex flex-wrap gap-1 sm:gap-2 justify-between items-center bg-gradient-to-r from-[#3285e9] to-blue-600 dark:from-blue-800 dark:to-blue-900 no-print">
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Year and Month selectors - Nepali date selection first */}
        <form onSubmit={onYearSubmit} className="flex">
          <Input 
            type="text" 
            value={yearInput} 
            onChange={onYearInputChange} 
            className={`w-16 sm:w-20 bg-white/90 dark:bg-white/10 text-blue-900 dark:text-blue-100 border-none h-8 sm:h-9 px-1 sm:px-2 text-xs sm:text-sm rounded-l-md ${useNepaliLanguage ? "nepali-text" : ""}`} 
            onBlur={onYearSubmit} 
          />
        </form>
        
        <Select value={currentMonth.toString()} onValueChange={onMonthChange}>
          <SelectTrigger className="w-20 sm:w-28 bg-white/90 dark:bg-white/10 text-blue-900 dark:text-blue-100 border-none h-8 sm:h-9 text-xs sm:text-sm">
            <SelectValue placeholder={useNepaliLanguage ? "महिना" : "Month"} />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-slate-800">
            {[...Array(12)].map((_, i) => (
              <SelectItem key={i + 1} value={(i + 1).toString()} className={`text-xs sm:text-sm ${useNepaliLanguage ? "nepali-text" : ""}`}>
                {useNepaliLanguage ? nepaliMonthsNp[i] : nepaliMonthsEn[i]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Month navigation buttons */}
        <Button onClick={onTodayClick} variant="outline" className={`bg-transparent/10 border border-white/40 text-white hover:bg-white/20 text-xs h-8 sm:h-9 py-0 px-2 rounded-md ${useNepaliLanguage ? "nepali-text" : ""}`}>
          {useNepaliLanguage ? 'आज' : 'Today'}
        </Button>
        
        <div className="flex -mx-1">
          <Button onClick={onPrevMonth} variant="outline" size="icon" className="bg-transparent/10 border border-white/40 text-white hover:bg-white/20 h-8 w-8 sm:h-9 sm:w-9 rounded-l-md rounded-r-none">
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          
          <Button onClick={onNextMonth} variant="outline" size="icon" className="bg-transparent/10 border border-white/40 text-white hover:bg-white/20 h-8 w-8 sm:h-9 sm:w-9 rounded-l-none rounded-r-md">
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>

        {/* English calendar picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="bg-transparent/10 border border-white/40 text-white hover:bg-white/20 h-8 sm:h-9 py-0 px-2 rounded-md flex items-center gap-1">
              <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className={`hidden xs:inline text-xs ${useNepaliLanguage ? "nepali-text" : ""}`}>
                {useNepaliLanguage ? 'मिति' : 'Date'}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white dark:bg-slate-800" align="start">
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
        
        {/* Theme toggle button */}
        <ThemeToggle />
        
        {/* Language toggle button */}
        <LanguageToggle useNepaliLanguage={useNepaliLanguage} onToggle={onToggleLanguage} />
      </div>
    </div>
  );
};

export default CalendarNavigation;
