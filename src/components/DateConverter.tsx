
import React, { useState, useRef } from 'react';
import {
  BikramDateObj,
  convertToBikram,
  convertToEnglish,
  getToday,
  nepaliMonthsEn,
  nepaliMonthsNp,
  getNepaliDigits,
} from '../utils/bikramConverter';
import { DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Calendar, X } from 'lucide-react';

interface DateConverterProps {
  useNepaliLanguage: boolean;
  onDateSelect?: (year: number, month: number, day: number) => void;
}

const DateConverter: React.FC<DateConverterProps> = ({ useNepaliLanguage, onDateSelect }) => {
  const [bikramDate, setBikramDate] = useState<BikramDateObj>(getToday());
  const [englishDate, setEnglishDate] = useState<Date>(new Date());
  
  // Refs for inputs - we'll use these instead of autofocus
  const yearInputRef = useRef<HTMLInputElement>(null);
  const monthSelectRef = useRef<HTMLSelectElement>(null);
  const dayInputRef = useRef<HTMLInputElement>(null);

  const handleBikramDateChange = (field: 'year' | 'month' | 'day', value: number) => {
    setBikramDate(prev => {
      const newDate = { ...prev, [field]: value };
      const convertedDate = convertToEnglish(newDate);
      setEnglishDate(convertedDate);
      return { ...newDate, englishDate: convertedDate };
    });
  };

  const handleEnglishDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const newDate = new Date(e.target.value);
    if (!isNaN(newDate.getTime())) {
      setEnglishDate(newDate);
      const newBikramDate = convertToBikram(newDate);
      setBikramDate(newBikramDate);
    }
  };

  const handleOpenCalendar = () => {
    if (onDateSelect) {
      onDateSelect(bikramDate.year, bikramDate.month, bikramDate.day);
    }
  };

  const formatDay = (day: number) => useNepaliLanguage ? getNepaliDigits(day) : day;

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white font-mukta-mahi">
      {/* Header with close button */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-4 py-3 rounded-t-xl flex justify-between items-center">
        <div>
          <DialogTitle className="text-xl font-semibold text-white">
            {useNepaliLanguage ? 'मिति परिवर्तक' : 'Date Converter'}
          </DialogTitle>
          <DialogDescription className="text-sm text-blue-100">
            {useNepaliLanguage ? 'बिक्रम सम्वत र ग्रेगोरियन बीच' : 'Between Bikram Sambat & Gregorian'}
          </DialogDescription>
        </div>
        <button className="rounded-full h-8 w-8 flex items-center justify-center bg-blue-800 hover:bg-blue-900 text-white transition-colors" aria-label="Close">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Bikram Date Section */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg border border-blue-200 shadow-inner">
            <h4 className="font-medium mb-2 text-blue-700 text-base">
              {useNepaliLanguage ? 'बिक्रम सम्बत' : 'Bikram Sambat (BS)'}
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs text-gray-700 mb-1">
                  {useNepaliLanguage ? 'वर्ष' : 'Year'}
                </label>
                <input
                  ref={yearInputRef}
                  type="number"
                  min="1900"
                  max="2100"
                  value={bikramDate.year}
                  onChange={(e) => handleBikramDateChange('year', parseInt(e.target.value) || 2000)}
                  className="w-full px-2 py-1 rounded-md border border-blue-300 focus:ring-2 focus:ring-blue-400 text-blue-800 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-700 mb-1">
                  {useNepaliLanguage ? 'महिना' : 'Month'}
                </label>
                <select
                  ref={monthSelectRef}
                  value={bikramDate.month}
                  onChange={(e) => handleBikramDateChange('month', parseInt(e.target.value))}
                  className="w-full px-2 py-1 rounded-md border border-blue-300 focus:ring-2 focus:ring-blue-400 text-blue-800 text-sm"
                >
                  {Array.from({ length: 12 }).map((_, i) => (
                    <option key={i} value={i + 1}>
                      {useNepaliLanguage ? nepaliMonthsNp[i] : nepaliMonthsEn[i]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-700 mb-1">
                  {useNepaliLanguage ? 'दिन' : 'Day'}
                </label>
                <input
                  ref={dayInputRef}
                  type="number"
                  min="1"
                  max="32"
                  value={bikramDate.day}
                  onChange={(e) => handleBikramDateChange('day', parseInt(e.target.value) || 1)}
                  className="w-full px-2 py-1 rounded-md border border-blue-300 focus:ring-2 focus:ring-blue-400 text-blue-800 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Gregorian Date Section */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-lg border border-gray-200 shadow-inner">
            <h4 className="font-medium mb-2 text-gray-700 text-base">
              {useNepaliLanguage ? 'ग्रेगोरियन' : 'Gregorian (AD)'}
            </h4>
            <div>
              <label className="block text-xs text-gray-700 mb-1">
                {useNepaliLanguage ? 'मिति' : 'Date'}
              </label>
              <input
                type="date"
                value={englishDate.toISOString().split('T')[0]}
                onChange={handleEnglishDateChange}
                className="w-full px-2 py-1 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 text-gray-800 text-sm"
              />
            </div>
            <p className="mt-2 text-xs text-gray-500">
              {englishDate.toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Results Section */}
        <div className="mt-4 p-3 text-center bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 border border-blue-200 rounded-lg">
          <p className="text-blue-800 font-medium text-sm md:text-base">
            {useNepaliLanguage ?
              `${getNepaliDigits(bikramDate.day)} ${nepaliMonthsNp[bikramDate.month - 1]} ${getNepaliDigits(bikramDate.year)} बि.सं.` :
              `${bikramDate.day} ${nepaliMonthsEn[bikramDate.month - 1]} ${bikramDate.year} BS`}
            <span className="mx-2">=</span>
            {englishDate.toLocaleDateString()}
          </p>
        </div>

        {/* Navigation Button */}
        {onDateSelect && (
          <div className="mt-4 flex justify-center">
            <Button 
              onClick={handleOpenCalendar} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
            >
              <Calendar className="h-4 w-4" />
              {useNepaliLanguage ? 'क्यालेन्डरमा देखाउनुहोस्' : 'Show in Calendar'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateConverter;
