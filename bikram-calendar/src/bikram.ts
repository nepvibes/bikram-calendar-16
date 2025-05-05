
/**
 * TypeScript implementation of Bikram calendar conversion
 * Converted from C++ implementation
 */

// Precomputed Data (starting from 2000 BS)
export const BS_START_YEAR = 2000;
export const BS_END_YEAR = 2089;

// Month data by year (days in each month)
export const NP_MONTHS_DATA: number[][] = [
  [30,32,31,32,31,30,30,30,29,30,29,31,365], // 2000
  [31,31,32,31,31,31,30,29,30,29,30,30,365], // 2001
  [31,31,32,32,31,30,30,29,30,29,30,30,365], // 2002
  [31,32,31,32,31,30,30,30,29,29,30,31,366], // 2003
  [30,32,31,32,31,30,30,30,29,30,29,31,365], // 2004
  [31,31,32,31,31,31,30,29,30,29,30,30,365], // 2005
  [31,31,32,32,31,30,30,29,30,29,30,30,365], // 2006
  [31,32,31,32,31,30,30,30,29,29,30,31,366], // 2007
  [31,31,31,32,31,31,29,30,30,29,29,31,365], // 2008
  [31,31,32,31,31,31,30,29,30,29,30,30,365], // 2009
  [31,31,32,32,31,30,30,29,30,29,30,30,365], // 2010
  [31,32,31,32,31,30,30,30,29,29,30,31,366], // 2011
  [31,31,31,32,31,31,29,30,30,29,30,30,365], // 2012
  [31,31,32,31,31,31,30,29,30,29,30,30,365], // 2013
  [31,31,32,32,31,30,30,29,30,29,30,30,365], // 2014
  [31,32,31,32,31,30,30,30,29,29,30,31,366], // 2015
  [31,31,31,32,31,31,29,30,30,29,30,30,365], // 2016
  [31,31,32,31,31,31,30,29,30,29,30,30,365], // 2017
  [31,32,31,32,31,30,30,29,30,29,30,30,365], // 2018
  [31,32,31,32,31,30,30,30,29,30,29,31,366], // 2019
  [31,31,31,32,31,31,30,29,30,29,30,30,365], // 2020
  [31,31,32,31,31,31,30,29,30,29,30,30,365], // 2021
  [31,32,31,32,31,30,30,30,29,29,30,30,365], // 2022
  [31,32,31,32,31,30,30,30,29,30,29,31,366], // 2023
  [31,31,31,32,31,31,30,29,30,29,30,30,365], // 2024
  [31,31,32,31,31,31,30,29,30,29,30,30,365], // 2025
  [31,32,31,32,31,30,30,30,29,29,30,31,366], // 2026
  [30,32,31,32,31,30,30,30,29,30,29,31,365], // 2027
  [31,31,32,31,31,31,30,29,30,29,30,30,365], // 2028
  [31,31,32,31,32,30,30,29,30,29,30,30,365], // 2029
  [31,32,31,32,31,30,30,30,29,29,30,31,366], // 2030
  [30,32,31,32,31,30,30,30,29,30,29,31,365], // 2031
  [31,31,32,31,31,31,30,29,30,29,30,30,365], // 2032
  [31,31,32,32,31,30,30,29,30,29,30,30,365], // 2033
  [31,32,31,32,31,30,30,30,29,29,30,31,366], // 2034
  [30,32,31,32,31,31,29,30,30,29,29,31,365], // 2035
  [31,31,32,31,31,31,30,29,30,29,30,30,365], // 2036
  [31,31,32,32,31,30,30,29,30,29,30,30,365], // 2037
  [31,32,31,32,31,30,30,30,29,29,30,31,366], // 2038
  [31,31,31,32,31,31,29,30,30,29,30,30,365], // 2039
  [31,31,32,31,31,31,30,29,30,29,30,30,365], // 2040
  [31,31,32,32,31,30,30,29,30,29,30,30,365], // 2041
  [31,32,31,32,31,30,30,30,29,29,30,31,366], // 2042
  [31,31,31,32,31,31,29,30,30,29,30,30,365], // 2043
  [31,31,32,31,31,31,30,29,30,29,30,30,365], // 2044
  [31,32,31,32,31,30,30,29,30,29,30,30,365], // 2045
  [31,32,31,32,31,30,30,30,29,29,30,31,366], // 2046
  [31,31,31,32,31,31,30,29,30,29,30,30,365], // 2047
  [31,31,32,31,31,31,30,29,30,29,30,30,365], // 2048
  [31,32,31,32,31,30,30,30,29,29,30,30,365], // 2049
  [31,32,31,32,31,30,30,30,29,30,29,31,366], // 2050
  [31,31,31,32,31,31,30,29,30,29,30,30,365], // 2051
  [31,31,32,31,31,31,30,29,30,29,30,30,365], // 2052
  [31,32,31,32,31,30,30,30,29,29,30,30,365], // 2053
  [31,32,31,32,31,30,30,30,29,30,29,31,366], // 2054
  [31,31,32,31,31,31,30,29,30,29,30,30,365], // 2055
  [31,31,32,31,32,30,30,29,30,29,30,30,365], // 2056
  [31,32,31,32,31,30,30,30,29,29,30,31,366], // 2057
  [30,32,31,32,31,30,30,30,29,30,29,31,365], // 2058
  [31,31,32,31,31,31,30,29,30,29,30,30,365], // 2059
  [31,31,32,32,31,30,30,29,30,29,30,30,365], // 2060
  [31,32,31,32,31,30,30,30,29,29,30,31,366], // 2061
  [30,32,31,32,31,31,29,30,29,30,29,31,365], // 2062
  [31,31,32,31,31,31,30,29,30,29,30,30,365], // 2063
  [31,31,32,32,31,30,30,29,30,29,30,30,365], // 2064
  [31,32,31,32,31,30,30,30,29,29,30,31,366], // 2065
  [31,31,31,32,31,31,29,30,30,29,29,31,365], // 2066
  [31,31,32,31,31,31,30,29,30,29,30,30,365], // 2067
  [31,31,32,32,31,30,30,29,30,29,30,30,365], // 2068
  [31,32,31,32,31,30,30,30,29,29,30,31,366], // 2069
  [31,31,31,32,31,31,29,30,30,29,30,30,365], // 2070
  [31,31,32,31,31,31,30,29,30,29,30,30,365], // 2071
  [31,32,31,32,31,30,30,29,30,29,30,30,365], // 2072
  [31,32,31,32,31,30,30,30,29,29,30,31,366], // 2073
  [31,31,31,32,31,31,30,29,30,29,30,30,365], // 2074
  [31,31,32,31,31,31,30,29,30,29,30,30,365], // 2075
  [31,32,31,32,31,30,30,30,29,29,30,30,365], // 2076
  [31,32,31,32,31,30,30,30,29,30,29,31,366], // 2077
  [31,31,31,32,31,31,30,29,30,29,30,30,365], // 2078
  [31,31,32,31,31,31,30,29,30,29,30,30,365], // 2079
  [31,32,31,32,31,30,30,30,29,29,30,30,365], // 2080
  [31,32,31,32,31,30,30,30,29,30,29,31,366], // 2081
  [31,31,32,31,31,31,30,29,30,29,30,30,365], // 2082
  [31,31,32,31,31,31,30,29,30,29,30,30,365], // 2083
  [31,32,31,32,31,30,30,30,29,29,30,31,366], // 2084
  [30,32,31,32,31,30,30,30,29,30,29,31,365], // 2085
  [31,31,32,31,31,31,30,29,30,29,30,30,365], // 2086
  [31,31,32,32,31,30,30,29,30,29,30,30,365], // 2087
  [31,32,31,32,31,30,30,30,29,29,30,31,366], // 2088
  [30,32,31,32,31,31,29,30,29,30,29,31,365], // 2089
];

export class BikramDate {
  private year: number;
  private month: number; // 1-12
  private day: number;
  private readonly englishDate: Date;

  // Astronomical calculation constants (from the C++ implementation)
  private readonly YugaRotation_star = 1582237828;
  private readonly YugaRotation_sun = 4320000;
  private readonly YugaCivilDays: number;
  private readonly PlanetApogee_sun = 77 + 17.0 / 60;
  private readonly PlanetCircumm_sun = 13 + 50.0 / 60;
  private readonly rad = 57.2957795; // 180 / pi

  constructor(year?: number, month?: number, day?: number) {
    // Initialize constants
    this.YugaCivilDays = this.YugaRotation_star - this.YugaRotation_sun;
    
    if (year !== undefined && month !== undefined && day !== undefined) {
      this.year = year;
      this.month = month;
      this.day = day;
      const { gYear, gMonth, gDay } = this.toGregorian(year, month, day);
      this.englishDate = new Date(gYear, gMonth - 1, gDay);
    } else {
      // Default to current date
      this.englishDate = new Date();
      const { bsYear, bsMonth, bsDay } = this.fromGregorian(
        this.englishDate.getFullYear(),
        this.englishDate.getMonth() + 1,
        this.englishDate.getDate()
      );
      this.year = bsYear;
      this.month = bsMonth;
      this.day = bsDay;
    }
  }

  // Create a new BikramDate from a JavaScript Date
  static fromDate(date: Date): BikramDate {
    const bikramDate = new BikramDate();
    const { bsYear, bsMonth, bsDay } = bikramDate.fromGregorian(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );
    bikramDate.year = bsYear;
    bikramDate.month = bsMonth;
    bikramDate.day = bsDay;
    return bikramDate;
  }

  // Convert to JavaScript Date
  toJsDate(): Date {
    return this.englishDate;
  }

  // Get year in Bikram Sambat
  getYear(): number {
    return this.year;
  }

  // Get month in Bikram Sambat (1-12)
  getMonth(): number {
    return this.month;
  }

  // Get day in Bikram Sambat
  getDate(): number {
    return this.day;
  }

  // Get days in a specific month
  getMonthDays(): number {
    if (this.year >= BS_START_YEAR && this.year <= BS_END_YEAR) {
      const yearIdx = this.year - BS_START_YEAR;
      if (yearIdx >= 0 && yearIdx < NP_MONTHS_DATA.length) {
        return NP_MONTHS_DATA[yearIdx][this.month - 1];
      }
    }
    return this.daysInMonth(this.year, this.month);
  }

  // Get the day of week (0-6, 0 = Sunday)
  getDay(): number {
    return this.englishDate.getDay();
  }

  // Convert AD (Gregorian) date to BS (Bikram Sambat)
  fromGregorian(gYear: number, gMonth: number, gDay: number): { bsYear: number; bsMonth: number; bsDay: number } {
    // Reference date: 1 Baisakh 2000 BS = 14 April 1943 AD
    const refDate = new Date(1943, 3, 14); // Month is 0-indexed in JS Date
    const targetDate = new Date(gYear, gMonth - 1, gDay);
    
    // Calculate difference in days
    const timeDiff = targetDate.getTime() - refDate.getTime();
    let daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    
    let bsYear = BS_START_YEAR;
    let bsMonth = 1;
    let bsDay = 1;
    
    // Find the Bikram date
    if (daysDiff >= 0) {
      while (bsYear < BS_END_YEAR) {
        const yearIdx = bsYear - BS_START_YEAR;
        if (yearIdx >= NP_MONTHS_DATA.length) break;
        
        for (let i = 0; i < 12; i++) {
          if (daysDiff < NP_MONTHS_DATA[yearIdx][i]) {
            bsMonth = i + 1;
            bsDay = daysDiff + 1;
            return { bsYear, bsMonth, bsDay };
          } else {
            daysDiff -= NP_MONTHS_DATA[yearIdx][i];
          }
        }
        bsYear++;
      }
      
      // If we're outside our data range, use the fallback astronomical calculation
      return this.fromGregorianAstronomical(gYear, gMonth, gDay);
    } else {
      // For dates before the reference date, we'll use the astronomical calculation
      return this.fromGregorianAstronomical(gYear, gMonth, gDay);
    }
  }

  // Convert BS (Bikram Sambat) date to AD (Gregorian)
  toGregorian(bsYear: number, bsMonth: number, bsDay: number): { gYear: number; gMonth: number; gDay: number } {
    // Reference date: 1 Baisakh 2000 BS = 14 April 1943 AD
    const refDate = new Date(1943, 3, 14); // Month is 0-indexed in JS Date
    
    // Check if the date is within our data range
    if (bsYear >= BS_START_YEAR && bsYear <= BS_END_YEAR) {
      let totalDays = 0;
      
      // Add days from years
      for (let year = BS_START_YEAR; year < bsYear; year++) {
        const yearIdx = year - BS_START_YEAR;
        if (yearIdx >= 0 && yearIdx < NP_MONTHS_DATA.length) {
          totalDays += NP_MONTHS_DATA[yearIdx][12]; // Total days in that year (at index 12)
        }
      }
      
      // Add days from months
      const yearIdx = bsYear - BS_START_YEAR;
      if (yearIdx >= 0 && yearIdx < NP_MONTHS_DATA.length) {
        for (let month = 0; month < bsMonth - 1; month++) {
          totalDays += NP_MONTHS_DATA[yearIdx][month];
        }
      }
      
      // Add days from current month
      totalDays += (bsDay - 1);
      
      // Calculate Gregorian date
      const targetDate = new Date(refDate.getTime() + totalDays * 24 * 60 * 60 * 1000);
      
      return {
        gYear: targetDate.getFullYear(),
        gMonth: targetDate.getMonth() + 1, // Convert from 0-indexed to 1-indexed
        gDay: targetDate.getDate()
      };
    } else {
      // Use fallback method for dates outside our range
      return this.toGregorianAstronomical(bsYear, bsMonth, bsDay);
    }
  }

  // Helper function to get days in month (matching C++ implementation)
  daysInMonth(bsYear: number, bsMonth: number): number {
    if (bsYear >= BS_START_YEAR && bsYear < BS_END_YEAR) {
      return NP_MONTHS_DATA[bsYear - BS_START_YEAR][bsMonth - 1];
    }
    // Fallback method
    const nextMonth = (bsMonth % 12) + 1;
    const nextYear = (bsMonth === 12) ? bsYear + 1 : bsYear;
    
    const { gYear: gYear1, gMonth: gMonth1, gDay: gDay1 } = this.toGregorian(bsYear, bsMonth, 1);
    const julian_date_start = this.getJulianDate(gYear1, gMonth1, gDay1);
    
    const { gYear: gYear2, gMonth: gMonth2, gDay: gDay2 } = this.toGregorian(nextYear, nextMonth, 1);
    const julian_date_end = this.getJulianDate(gYear2, gMonth2, gDay2);
    
    return Math.floor(julian_date_end - julian_date_start);
  }
  
  // Helper function to calculate Julian date (matching C++ implementation)
  private getJulianDate(year: number, month: number, day: number): number {
    if (month <= 2) {
      year -= 1;
      month += 12;
    }
    const a = Math.floor(year / 100.0);
    const b = 2 - a + Math.floor(a / 4.0);
    return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + b - 1524.5;
  }

  // Convert Julian date to Gregorian date
  private fromJulianDate(julian_date: number): { year: number; month: number; day: number } {
    const a = Math.floor(julian_date + 0.5);
    const b = a + 1537;
    const c = Math.floor((b - 122.1) / 365.25);
    const d = Math.floor(365.25 * c);
    const e = Math.floor((b - d) / 30.6001);
    const f = b - d - Math.floor(30.6001 * e) + (julian_date + 0.5 - a);
    
    const day = Math.floor(f);
    const month = (e < 14) ? (e - 1) : (e - 13);
    const year = (month > 2) ? (c - 4716) : (c - 4715);
    
    return { year, month, day };
  }

  // Astronomical calculation methods from the C++ implementation
  private getSauraMasaDay(ahar: number): { m: number; d: number } {
    if (this.todaySauraMasaFirstP(ahar)) {
      const day = 1;
      const tslong_tomorrow = this.getTslong(ahar + 1);
      let month = Math.floor(tslong_tomorrow / 30) % 12;
      month = (month + 12) % 12;
      return { m: month, d: day };
    } else {
      const yesterday = this.getSauraMasaDay(ahar - 1);
      return { m: yesterday.m, d: yesterday.d + 1 };
    }
  }

  private todaySauraMasaFirstP(ahar: number): boolean {
    let tslong_today = this.getTslong(ahar);
    let tslong_tomorrow = this.getTslong(ahar + 1);
    tslong_today -= Math.floor(tslong_today / 30) * 30;
    tslong_tomorrow -= Math.floor(tslong_tomorrow / 30) * 30;
    return (25 < tslong_today && tslong_tomorrow < 5) ? true : false;
  }

  private getTslong(ahar: number): number {
    let t1 = (this.YugaRotation_sun * ahar / this.YugaCivilDays);
    t1 -= Math.floor(t1);
    const mslong = 360 * t1;
    const x1 = mslong - this.PlanetApogee_sun;
    const y1 = this.PlanetCircumm_sun / 360;
    const y2 = Math.sin(x1 / this.rad);
    const y3 = y1 * y2;
    const x2 = Math.asin(y3) * this.rad;
    const x3 = mslong - x2;
    return x3;
  }

  // Fallback astronomical calculation methods
  private fromGregorianAstronomical(y: number, m: number, d: number): { bsYear: number; bsMonth: number; bsDay: number } {
    const julian = this.getJulianDate(y, m, d);
    const ahar = julian - 588465.5;
    
    const sauraMasaResult = this.getSauraMasaDay(ahar);
    const saura_masa_num = sauraMasaResult.m;
    const saura_masa_day = sauraMasaResult.d;
    
    const YearKali = Math.floor(ahar * this.YugaRotation_sun / this.YugaCivilDays);
    const YearSaka = YearKali - 3179;
    const nepalimonth = (saura_masa_num) % 12;
    const year = YearSaka + 135 + Math.floor((saura_masa_num - nepalimonth) / 12);
    const month = (saura_masa_num + 12) % 12 + 1;
    
    return {
      bsYear: year,
      bsMonth: month,
      bsDay: saura_masa_day
    };
  }

  private toGregorianAstronomical(bsYear: number, bsMonth: number, bsDay: number): { gYear: number; gMonth: number; gDay: number } {
    const YearSaka = bsYear - 135;
    const YearKali = YearSaka + 3179;
    let ahar = Math.floor((YearKali * this.YugaCivilDays) / this.YugaRotation_sun);
    
    // Adjust bsMonth to 0-11 for calculation
    const targetMonth = (bsMonth + 11) % 12;
    
    // Find the exact day
    let currentDay = this.getSauraMasaDay(ahar);
    
    // Try to find the exact date by moving forward or backward
    while (currentDay.m !== targetMonth || currentDay.d !== bsDay) {
      if (currentDay.m < targetMonth || (currentDay.m === targetMonth && currentDay.d < bsDay)) {
        ahar += 1;
      } else {
        ahar -= 1;
      }
      currentDay = this.getSauraMasaDay(ahar);
    }
    
    const julian_date = ahar + 588465.5;
    const gregorian = this.fromJulianDate(julian_date);
    
    return {
      gYear: gregorian.year,
      gMonth: gregorian.month, 
      gDay: gregorian.day
    };
  }
}
