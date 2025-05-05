
// Export all functionality from a single entry point
export { BikramDate, BS_START_YEAR, BS_END_YEAR } from './bikram';

export {
  getToday,
  getBikramMonth,
  convertToBikram,
  convertToEnglish,
  hasHoliday,
  getNepaliDigits,
  getEnglishDigits,
  containsNepaliDigits,
  nepaliMonthsNp,
  nepaliMonthsEn,
  nepaliDaysNp,
  nepaliDaysEn,
  nepaliHolidays,
  type BikramDateObj,
  type BikramMonth
} from './converter';

export {
  calculateTithi,
  getTithiNamesNp,
  getTithiNamesEn,
  getPakshaNames,
  type TithiResult
} from './tithi';
