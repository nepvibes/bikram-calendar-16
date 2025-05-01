
import React, { useState } from 'react';
import { BikramDate, convertToBikram, convertToEnglish, getNepaliDigits } from '../utils/bikramConverter';

interface DateConverterProps {
  useNepaliLanguage: boolean;
}

const DateConverter: React.FC<DateConverterProps> = ({ useNepaliLanguage }) => {
  // States for the converter
  const [englishDate, setEnglishDate] = useState<Date>(new Date());
  const [bikramDate, setBikramDate] = useState<BikramDate>(convertToBikram(new Date()));
  
  // Handle English date change
  const handleEnglishChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    if (!isNaN(newDate.getTime())) {
      setEnglishDate(newDate);
      setBikramDate(convertToBikram(newDate));
    }
  };
  
  // Handle Bikram date change (simplified)
  const handleBikramChange = (field: 'year' | 'month' | 'day', value: number) => {
    const newBikramDate = { ...bikramDate, [field]: value };
    setBikramDate(newBikramDate);
    
    try {
      const newEnglishDate = convertToEnglish(newBikramDate);
      setEnglishDate(newEnglishDate);
    } catch (error) {
      console.error('Invalid Bikram date');
    }
  };
  
  return (
    <div className="bg-white border border-nepali-yellow/30 rounded-lg shadow-md p-4 my-4 animate-fade-in">
      <h3 className="text-lg font-bold text-center mb-4 text-nepali-dark">
        {useNepaliLanguage ? 'मिति रूपान्तरण' : 'Date Converter'}
      </h3>
      
      <div className="space-y-4">
        {/* English Date Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-nepali-dark">
            {useNepaliLanguage ? 'ग्रेगोरियन मिति' : 'Gregorian Date'}
          </label>
          <input
            type="date"
            value={englishDate.toISOString().split('T')[0]}
            onChange={handleEnglishChange}
            className="block w-full rounded-md border-nepali-yellow/30 shadow-sm focus:border-nepali-yellow focus:ring focus:ring-nepali-yellow/20 py-2 px-3"
          />
        </div>
        
        {/* Bikram Date Display */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-nepali-dark">
            {useNepaliLanguage ? 'नेपाली मिति' : 'Bikram Sambat'}
          </label>
          <div className="grid grid-cols-3 gap-2">
            <select
              value={bikramDate.year}
              onChange={(e) => handleBikramChange('year', parseInt(e.target.value))}
              className="rounded-md border-nepali-yellow/30 shadow-sm focus:border-nepali-yellow focus:ring focus:ring-nepali-yellow/20"
            >
              {Array.from({ length: 100 }, (_, i) => bikramDate.year - 50 + i).map(year => (
                <option key={year} value={year}>
                  {useNepaliLanguage ? getNepaliDigits(year) : year}
                </option>
              ))}
            </select>
            <select
              value={bikramDate.month}
              onChange={(e) => handleBikramChange('month', parseInt(e.target.value))}
              className="rounded-md border-nepali-yellow/30 shadow-sm focus:border-nepali-yellow focus:ring focus:ring-nepali-yellow/20"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                <option key={month} value={month}>
                  {useNepaliLanguage ? getNepaliDigits(month) : month}
                </option>
              ))}
            </select>
            <select
              value={bikramDate.day}
              onChange={(e) => handleBikramChange('day', parseInt(e.target.value))}
              className="rounded-md border-nepali-yellow/30 shadow-sm focus:border-nepali-yellow focus:ring focus:ring-nepali-yellow/20"
            >
              {Array.from({ length: 32 }, (_, i) => i + 1).map(day => (
                <option key={day} value={day}>
                  {useNepaliLanguage ? getNepaliDigits(day) : day}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateConverter;
