
import React, { useState } from 'react';
import { BikramDateObj, convertToBikram, convertToEnglish, getToday, nepaliMonthsEn, nepaliMonthsNp, getNepaliDigits } from '../utils/bikramConverter';
import { DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Calendar } from 'lucide-react';

interface DateConverterProps {
  useNepaliLanguage: boolean;
  onDateSelect?: (year: number, month: number, day: number) => void;
}

const DateConverter: React.FC<DateConverterProps> = ({ useNepaliLanguage, onDateSelect }) => {
  // State for Bikram date
  const [bikramDate, setBikramDate] = useState<BikramDateObj>(getToday());
  
  // State for English (Gregorian) date
  const [englishDate, setEnglishDate] = useState<Date>(new Date());

  // Handle change of Bikram date inputs
  const handleBikramDateChange = (field: 'year' | 'month' | 'day', value: number) => {
    setBikramDate(prev => {
      const newDate = { ...prev, [field]: value };
      const convertedDate = convertToEnglish(newDate);
      setEnglishDate(convertedDate);
      return { ...newDate, englishDate: convertedDate };
    });
  };

  // Handle change of English date
  const handleEnglishDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    if (!isNaN(newDate.getTime())) {
      setEnglishDate(newDate);
      const newBikramDate = convertToBikram(newDate);
      setBikramDate(newBikramDate);
    }
  };

  // Handle open calendar with this date
  const handleOpenCalendar = () => {
    if (onDateSelect) {
      onDateSelect(bikramDate.year, bikramDate.month, bikramDate.day);
    }
  };

  const formatDay = (day: number) => {
    return useNepaliLanguage ? getNepaliDigits(day) : day;
  };

  return (
    <div className="p-4 bg-white rounded-lg">
      <DialogTitle className="text-xl font-bold mb-2 text-blue-800">
        {useNepaliLanguage ? 'मिति परिवर्तक' : 'Date Converter'}
      </DialogTitle>
      <DialogDescription className="mb-4 text-gray-600">
        {useNepaliLanguage ? 'बिक्रम सम्वत र ग्रेगोरियन बीच मिति परिवर्तन गर्नुहोस्।' : 'Convert dates between Bikram Sambat and Gregorian calendars.'}
      </DialogDescription>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bikram Date Inputs */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2 text-blue-700">
            {useNepaliLanguage ? 'बिक्रम सम्बत' : 'Bikram Sambat (BS)'}
          </h4>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-sm mb-1 text-gray-700">
                {useNepaliLanguage ? 'वर्ष' : 'Year'}
              </label>
              <input
                type="number"
                min="1900"
                max="2100"
                value={bikramDate.year}
                onChange={(e) => handleBikramDateChange('year', parseInt(e.target.value) || 2000)}
                className="w-full p-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-700">
                {useNepaliLanguage ? 'महिना' : 'Month'}
              </label>
              <select
                value={bikramDate.month}
                onChange={(e) => handleBikramDateChange('month', parseInt(e.target.value))}
                className="w-full p-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                onClick={(e) => e.stopPropagation()}
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <option key={i} value={i + 1}>
                    {useNepaliLanguage ? nepaliMonthsNp[i] : nepaliMonthsEn[i]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-700">
                {useNepaliLanguage ? 'दिन' : 'Day'}
              </label>
              <input
                type="number"
                min="1"
                max="32"
                value={bikramDate.day}
                onChange={(e) => handleBikramDateChange('day', parseInt(e.target.value) || 1)}
                className="w-full p-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>

        {/* English Date Input */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2 text-gray-700">
            {useNepaliLanguage ? 'ग्रेगोरियन' : 'Gregorian (AD)'}
          </h4>
          <div>
            <label className="block text-sm mb-1 text-gray-700">
              {useNepaliLanguage ? 'मिति' : 'Date'}
            </label>
            <input
              type="date"
              value={englishDate.toISOString().split('T')[0]}
              onChange={handleEnglishDateChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="mt-2 text-sm text-gray-600">
            {useNepaliLanguage ? 'फरम्याट: ' : 'Format: '}
            {englishDate.toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Display Result */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg text-center shadow-sm">
        <p className="text-blue-800 font-medium">
          {useNepaliLanguage ? 
            `${getNepaliDigits(bikramDate.day)} ${nepaliMonthsNp[bikramDate.month - 1]} ${getNepaliDigits(bikramDate.year)} बि.सं. = ${englishDate.toLocaleDateString()}` :
            `${bikramDate.day} ${nepaliMonthsEn[bikramDate.month - 1]} ${bikramDate.year} BS = ${englishDate.toLocaleDateString()}`}
        </p>
      </div>

      {/* Action Buttons */}
      {onDateSelect && (
        <div className="mt-4 flex justify-center">
          <Button 
            onClick={handleOpenCalendar}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Calendar className="mr-2 h-4 w-4" />
            {useNepaliLanguage ? 'क्यालेन्डरमा खोल्नुहोस्' : 'Open in Calendar'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default DateConverter;
