
# Bikram Calendar

A comprehensive JavaScript/TypeScript library for working with the Bikram Sambat (BS) calendar system used in Nepal.

## Features

- Convert between Bikram Sambat (BS) and Gregorian (AD) dates
- Get information about Bikram months (days, start day of week)
- Calculate Tithi (Lunar day)
- Convert between Nepali and English digits
- Access month and day names in both Nepali and English

## Installation

```bash
npm install bikram-calendar
```

or

```bash
yarn add bikram-calendar
```

## Usage

```typescript
import { getToday, convertToBikram, convertToEnglish, calculateTithi } from 'bikram-calendar';

// Get current date in Bikram Sambat
const today = getToday();
console.log(`Today is ${today.year}-${today.month}-${today.day} BS`);

// Convert a Gregorian date to Bikram Sambat
const bikramDate = convertToBikram(new Date(2023, 3, 14)); // April 14, 2023
console.log(`April 14, 2023 is ${bikramDate.year}-${bikramDate.month}-${bikramDate.day} BS`);

// Convert Bikram Sambat to Gregorian
const englishDate = convertToEnglish({
  year: 2080,
  month: 1,
  day: 1,
  englishDate: new Date()
});
console.log(`2080-01-01 BS is ${englishDate.toDateString()}`);

// Get tithi information
const tithiInfo = calculateTithi(new Date());
console.log(`Today's tithi is ${tithiInfo.tithiNameEn} (${tithiInfo.tithiName}), ${tithiInfo.pakshaEn} (${tithiInfo.paksha})`);
```

## API Documentation

### Date Conversion

#### `getToday(): BikramDateObj`

Returns today's date in Bikram Sambat.

#### `convertToBikram(date: Date): BikramDateObj`

Converts a JavaScript Date to Bikram Sambat.

#### `convertToEnglish(bsDate: BikramDateObj): Date`

Converts a Bikram Sambat date to JavaScript Date.

### Tithi Calculation

#### `calculateTithi(date: Date): TithiResult`

Calculates the tithi (lunar day) for a given date.

### Month Information

#### `getBikramMonth(year: number, month: number): BikramMonth`

Gets information about a Bikram month including days and start day of week.

### Utilities

#### `getNepaliDigits(num: number): string`

Converts English digits to Nepali digits.

#### `getEnglishDigits(nepaliStr: string): string`

Converts Nepali digits to English digits.

## License

MIT
