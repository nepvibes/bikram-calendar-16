
/**
 * Utility functions to handle timezone consistency for Bikram calendar
 */

// Nepal is UTC+5:45
const NEPAL_TIMEZONE_OFFSET_MINUTES = 5 * 60 + 45;

/**
 * Get the current date in Nepal's timezone regardless of user's location
 * @returns Date object representing current date/time in Nepal
 */
export function getDateInNepalTimezone(): Date {
  const date = new Date();
  
  // Get the user's timezone offset in minutes
  const localTimezoneOffset = date.getTimezoneOffset();
  
  // Calculate the difference between local timezone and Nepal timezone
  const offsetDifference = localTimezoneOffset + NEPAL_TIMEZONE_OFFSET_MINUTES;
  
  // Apply the offset to get Nepal's current time
  date.setMinutes(date.getMinutes() + offsetDifference);
  
  return date;
}

/**
 * Convert any date to Nepal's timezone
 * @param date The date to convert
 * @returns Date object representing the provided date in Nepal's timezone
 */
export function convertToNepalTimezone(date: Date): Date {
  const result = new Date(date);
  
  // Get the user's timezone offset in minutes
  const localTimezoneOffset = date.getTimezoneOffset();
  
  // Calculate the difference between local timezone and Nepal timezone
  const offsetDifference = localTimezoneOffset + NEPAL_TIMEZONE_OFFSET_MINUTES;
  
  // Apply the offset to get Nepal's time
  result.setMinutes(result.getMinutes() + offsetDifference);
  
  return result;
}

/**
 * Create a new Date object that will be properly converted to Nepal time
 * regardless of user's location
 */
export function createNepalDate(year: number, month: number, day: number): Date {
  // Create date with provided values (month is 0-indexed in JS Date)
  const date = new Date(year, month - 1, day);
  return convertToNepalTimezone(date);
}
