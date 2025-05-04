
import React from 'react';
import { format } from 'date-fns';
import { nepaliMonthsNp, nepaliMonthsEn, getNepaliDigits } from '@/utils/bikramConverter';
import { BikramMonth } from '@/utils/bikramConverter';

interface CalendarHeaderProps {
  currentView: BikramMonth;
  useNepaliLanguage: boolean;
  usingApproximation: boolean;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentView,
  useNepaliLanguage,
  usingApproximation
}) => {
  return (
    <div className="text-white p-2 sm:p-4 rounded-t-lg border-b-4 border-blue-800 relative overflow-hidden bg-gradient-to-r from-[#3787a9] to-blue-700 beautiful-header shadow-lg">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div className="flex flex-col">
          <h2 className={`text-xl sm:text-2xl font-bold text-center my-0 sm:text-left md:text-4xl mx-0 px-0 ${useNepaliLanguage ? "nepali-text" : ""}`}>
            {useNepaliLanguage ? `विक्रम संवत् क्यालेन्डर` : `Bikram Sambat calendar `}
          </h2>
          
          {/* Show approximation indicator if needed */}
          {usingApproximation && (
            <div className={`text-xs text-yellow-200 mt-1 text-center sm:text-left ${useNepaliLanguage ? "nepali-text" : ""}`}>
              {useNepaliLanguage ? `(अनुमानित डाटा)` : `(Approximated data)`}
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-center sm:items-end mt-2 sm:mt-0">
          <span className={`text-lg sm:text-xl font-bold ${useNepaliLanguage ? "nepali-text" : ""}`}>
            {useNepaliLanguage 
              ? `${nepaliMonthsNp[currentView.month - 1]} ${getNepaliDigits(currentView.year)}` 
              : `${nepaliMonthsEn[currentView.month - 1]} ${currentView.year}`}
          </span>
          <span className="text-xs sm:text-sm opacity-75">
            {format(currentView.englishStartDate, 'MMMM yyyy')} AD
          </span>
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="absolute -right-16 -top-16 w-32 h-32 bg-yellow-500 rounded-full opacity-20"></div>
      <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-blue-500 rounded-full opacity-20"></div>
    </div>
  );
};

export default CalendarHeader;
