import { BikramDate, BS_START_YEAR, BS_END_YEAR } from './bikram';
import { getDateInNepalTimezone } from './timezone';

export type BikramDateObj = {
  year: number;
  month: number; // 1-12
  day: number; // 1-32
  englishDate: Date;
}

// Month names in Nepali
export const nepaliMonthsNp = [
  'बैशाख', 'जेठ', 'असार', 'श्रावण', 
  'भदौ', 'असोज', 'कार्तिक', 'मंसिर', 
  'पुष', 'माघ', 'फाल्गुन', 'चैत्र'
];

// Month names in English
export const nepaliMonthsEn = [
  'Baisakh', 'Jestha', 'Asar', 'Shrawan', 
  'Bhadra', 'Ashoj', 'Kartik', 'Mangsir', 
  'Poush', 'Magh', 'Falgun', 'Chaitra'
];

// Day names in Nepali
export const nepaliDaysNp = [
  'आइत', 'सोम', 'मङ्गल', 
  'बुध', 'बिहि', 'शुक्र', 'शनि'
];

// Day names in English
export const nepaliDaysEn = [
  'Sun', 'Mon', 'Tue', 
  'Wed', 'Thu', 'Fri', 'Sat'
];

// Important Nepali festivals and holidays (simplified)
export const nepaliHolidays: {[key: string]: string} = {
  '1-1': 'Nepali New Year',
  '1-15': 'Buddha Jayanti',
  '2-15': 'Bhoto Jatra',
  '4-15': 'Janai Purnima',
  '5-2': 'Gai Jatra',
  '5-14': 'Krishna Janmashtami',
  '6-15': 'Teej',
  '7-1': 'Dashain Begins',
  '7-10': 'Vijaya Dashami',
  '8-1': 'Tihar Begins',
  '8-3': 'Laxmi Puja',
  '8-5': 'Bhai Tika',
  '9-15': 'Yomari Punhi',
  '10-1': 'Udhauli',
  '10-15': 'Tamu Lhosar',
};

// Get Today's Bikram Date
export const getToday = (): BikramDateObj => {
  // Use Nepal's timezone for consistent date calculation regardless of user location
  const nepalDate = getDateInNepalTimezone();
  const bikramDate = BikramDate.fromDate(nepalDate);
  
  return {
    year: bikramDate.getYear(),
    month: bikramDate.getMonth(),
    day: bikramDate.getDate(),
    englishDate: nepalDate,
  };
};

// Get Bikram Month Information
export const getBikramMonth = (year: number, month: number): BikramMonth => {
  // Create first day of the month - now works for any year with fallback method
  const bikramDate = new BikramDate(year, month, 1);
  const englishDate = bikramDate.toJsDate();
  
  // Get total days in month - will use fallback astronomical method if outside data range
  const totalDays = bikramDate.getMonthDays();
  
  // Get the day of week (0-6) for the first day
  const startWeekDay = englishDate.getDay();
  
  return {
    year,
    month,
    days: totalDays,
    startWeekDay,
    englishStartDate: englishDate,
  };
};

// Convert English Date to Bikram Date
export const convertToBikram = (date: Date): BikramDateObj => {
  const bikramDate = BikramDate.fromDate(date);
  
  return {
    year: bikramDate.getYear(),
    month: bikramDate.getMonth(),
    day: bikramDate.getDate(),
    englishDate: date,
  };
};

// Convert Bikram Date to English Date
export const convertToEnglish = (bsDate: BikramDateObj): Date => {
  const bikramDate = new BikramDate(bsDate.year, bsDate.month, bsDate.day);
  return bikramDate.toJsDate();
};

// Check if a date has a holiday or event
export const hasHoliday = (month: number, day: number): string | null => {
  const key = `${month}-${day}`;
  return nepaliHolidays[key] || null;
};

// Convert English digits to Nepali digits
export const getNepaliDigits = (num: number): string => {
  const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return num.toString().split('').map(digit => {
    if (isNaN(parseInt(digit))) return digit;
    return nepaliDigits[parseInt(digit)];
  }).join('');
};

// Convert Nepali digits to English digits
export const getEnglishDigits = (nepaliStr: string): string => {
  const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return nepaliStr.split('').map(char => {
    const index = nepaliDigits.indexOf(char);
    return index !== -1 ? index.toString() : char;
  }).join('');
};

// Check if a string contains Nepali digits
export const containsNepaliDigits = (str: string): boolean => {
  const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return str.split('').some(char => nepaliDigits.includes(char));
};
