
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
  return (
    <div className="text-white p-1 sm:p-2 flex flex-wrap gap-1 sm:gap-2 justify-between items-center bg-gradient-to-r from-[#3285e9] to-blue-600 no-print">
      {/* Month and Year selectors */}
      <div className="flex gap-1 sm:gap-2">
        {/* Month selector */}
        <Select value={currentMonth.toString()} onValueChange={onMonthChange}>
          <SelectTrigger className="w-24 sm:w-32 bg-white text-blue-900 border-none h-8 sm:h-10 text-xs sm:text-sm">
            <SelectValue placeholder={useNepaliLanguage ? "महिना" : "Month"} />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {[...Array(12)].map((_, i) => (
              <SelectItem key={i + 1} value={(i + 1).toString()} className={`text-xs sm:text-sm ${useNepaliLanguage ? "nepali-text" : ""}`}>
                {useNepaliLanguage ? nepaliMonthsNp[i] : nepaliMonthsEn[i]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {/* Year selector - Direct input */}
        <form onSubmit={onYearSubmit} className="flex">
          <Input 
            type="text" 
            value={yearInput} 
            onChange={onYearInputChange} 
            className={`w-16 sm:w-24 bg-white text-blue-900 border-none h-8 sm:h-10 px-1 sm:px-3 text-xs sm:text-sm ${useNepaliLanguage ? "nepali-text" : ""}`} 
            onBlur={onYearSubmit} 
          />
        </form>
      </div>
      
      {/* Navigation buttons */}
      <div className="flex items-center gap-1 sm:gap-2">
        <Button onClick={onTodayClick} variant="outline" className={`bg-transparent border-white text-white hover:bg-white/20 text-xs sm:text-sm h-8 sm:h-10 py-0 px-2 sm:px-3 ${useNepaliLanguage ? "nepali-text" : ""}`}>
          {useNepaliLanguage ? 'आज' : 'Today'}
        </Button>

        {/* Print button */}
        <Button onClick={onPrint} variant="outline" className="bg-transparent border-white text-white hover:bg-white/20 text-xs sm:text-sm h-8 sm:h-10 py-0 px-2 sm:px-3 flex items-center gap-1">
          <Printer className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden xs:inline">{useNepaliLanguage ? 'प्रिन्ट' : 'Print'}</span>
        </Button>
        
        <Button onClick={onPrevMonth} variant="outline" size="icon" className="bg-transparent border-white text-white hover:bg-white/20 h-8 w-8">
          <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
        
        <Button onClick={onNextMonth} variant="outline" size="icon" className="bg-transparent border-white text-white hover:bg-white/20 h-8 w-8">
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
        
        <LanguageToggle useNepaliLanguage={useNepaliLanguage} onToggle={onToggleLanguage} />
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/20 gap-1 h-8 sm:h-10 py-0 px-2 sm:px-3 text-xs sm:text-sm">
              <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className={`hidden xs:inline ${useNepaliLanguage ? "nepali-text" : ""}`}>
                {useNepaliLanguage ? 'मिति' : 'Date'}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white" align="end">
            <Calendar 
              mode="single" 
              selected={new Date()} 
              onSelect={onEnglishDateSelect} 
              initialFocus 
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default CalendarNavigation;
