import React, { useState } from 'react';
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
import { Calendar } from 'lucide-react';

interface DateConverterProps {
  useNepaliLanguage: boolean;
  onDateSelect?: (year: number, month: number, day: number) => void;
}

const DateConverter: React.FC<DateConverterProps> = ({ useNepaliLanguage, onDateSelect }) => {
  const [bikramDate, setBikramDate] = useState<BikramDateObj>(getToday());
  const [englishDate, setEnglishDate] = useState<Date>(new Date());

  const handleBikramDateChange = (field: 'year' | 'month' | 'day', value: number) => {
    setBikramDate(prev => {
      const newDate = { ...prev, [field]: value };
      const convertedDate = convertToEnglish(newDate);
      setEnglishDate(convertedDate);
      return { ...newDate, englishDate: convertedDate };
    });
  };

  const handleEnglishDateChange  = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className="p-4 md:p-6 bg-white rounded-xl shadow-md">
      <DialogTitle className="text-2xl font-semibold mb-2 text-blue-800">
        {useNepaliLanguage ? 'मिति परिवर्तक' : 'Date Converter'}
      </DialogTitle>
      <DialogDescription className="mb-6 text-gray-600">
        {useNepaliLanguage ? 'बिक्रम सम्वत र ग्रेगोरियन बीच मिति परिवर्तन गर्नुहोस्।' : 'Convert between Bikram Sambat and Gregorian calendar dates.'}
      </DialogDescription>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h4 className="font-medium mb-3 text-blue-700 text-lg">
            {useNepaliLanguage ? 'बिक्रम सम्बत' : 'Bikram Sambat (BS)'}
          </h4>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                {useNepaliLanguage ? 'वर्ष' : 'Year'}
              </label>
              <input
                type="number"
                min="1900"
                max="2100"
                value={bikramDate.year}
                onChange={(e) => handleBikramDateChange('year', parseInt(e.target.value) || 2000)}
                className="w-full px-3 py-2 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                {useNepaliLanguage ? 'महिना' : 'Month'}
              </label>
              <select
                value={bikramDate.month}
                onChange={(e) => handleBikramDateChange('month', parseInt(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-400"
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <option key={i} value={i + 1}>
                    {useNepaliLanguage ? nepaliMonthsNp[i] : nepaliMonthsEn[i]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                {useNepaliLanguage ? 'दिन' : 'Day'}
              </label>
              <input
                type="number"
                min="1"
                max="32"
                value={bikramDate.day}
                onChange={(e) => handleBikramDateChange('day', parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h4 className="font-medium mb-3 text-gray-800 text-lg">
            {useNepaliLanguage ? 'ग्रेगोरियन' : 'Gregorian (AD)'}
          </h4>
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              {useNepaliLanguage ? 'मिति' : 'Date'}
            </label>
            <input
              type="date"
              value={englishDate.toISOString().split('T')[0]}
              onChange={handleEnglishDateChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {useNepaliLanguage ? 'फरम्याट: ' : 'Format: '}
            {englishDate.toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 text-center bg-blue-100 border border-blue-200 rounded-lg">
        <p className="text-blue-800 font-medium text-lg">
          {useNepaliLanguage ?
            `${getNepaliDigits(bikramDate.day)} ${nepaliMonthsNp[bikramDate.month - 1]} ${getNepaliDigits(bikramDate.year)} बि.सं. = ${englishDate.toLocaleDateString()}` :
            `${bikramDate.day} ${nepaliMonthsEn[bikramDate.month - 1]} ${bikramDate.year} BS = ${englishDate.toLocaleDateString()}`}
        </p>
      </div>

      {onDateSelect && (
        <div className="mt-5 flex justify-center">
          <Button onClick={handleOpenCalendar} className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            {useNepaliLanguage ? 'क्यालेन्डरमा खोल्नुहोस्' : 'Open in Calendar'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default DateConverter;
