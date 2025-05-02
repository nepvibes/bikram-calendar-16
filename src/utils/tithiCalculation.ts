/**
 * Tithi calculation module converted from C++ to TypeScript
 */

// Tithi names in Nepali
export const tithiNames: string[] = [
  "प्रथमा", "द्वितीया", "तृतीया", "चतुर्थी", "पंचमी", "षष्ठी", "सप्तमी", "अष्टमी",
  "नवमी", "दशमी", "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", "पूर्णिमा", "प्रथमा",
  "द्वितीया", "तृतीया", "चतुर्थी", "पंचमी", "षष्ठी", "सप्तमी", "अष्टमी", "नवमी", "दशमी",
  "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", "अमावस्या"
];

// English versions of tithi names
export const tithiNamesEn: string[] = [
  "Prathama", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shasthi", "Saptami", "Ashtami",
  "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima", "Prathama",
  "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shasthi", "Saptami", "Ashtami", "Navami", "Dashami",
  "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Amavasya"
];

// Constants
const PI = Math.PI;
const r2d = 180.0 / PI;
const d2r = PI / 180.0;

export interface TithiData {
  tithiIndex: number;
  tithiName: string;
  tithiNameEn: string;
  paksha: string;
  pakshaEn: string;
}

export function calculateTithi(date: Date): TithiData {
  // Convert to Julian date
  const julianDate = gregorianToJulian(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );
  
  const tdays = julianDate - 2451545.0;  // Days since J2000.0
  const t = tdays / 36525.0;
  
  // Calculate moon longitude
  const moonLongitude = getMoonLongitude(t);
  
  // Calculate sun longitude
  const sunLongitude = getSunLongitude(t);
  
  // Adjust for Nepal time (UTC+5:45)
  const nepalTimeOffset = 5.75; // in hours
  const localTimeAdjustment = nepalTimeOffset * 15; // Convert hours to degrees
  
  // Adjust the longitudes
  let adjustedMoonLongitude = moonLongitude + localTimeAdjustment;
  let adjustedSunLongitude = sunLongitude + localTimeAdjustment;
  
  // Wrap around to keep within 0-360 degrees
  adjustedMoonLongitude = (adjustedMoonLongitude + 360.0) % 360.0;
  adjustedSunLongitude = (adjustedSunLongitude + 360.0) % 360.0;
  
  // Calculate the difference
  let difference = adjustedMoonLongitude - adjustedSunLongitude;
  if (difference < 0) difference += 360.0;
  
  const tithiIndex = Math.floor(difference / 12.0);
  const paksha = (tithiIndex < 15) ? "शुक्ल पक्ष" : "कृष्ण पक्ष";
  const pakshaEn = (tithiIndex < 15) ? "Shukla Paksha" : "Krishna Paksha";
  
  return {
    tithiIndex,
    tithiName: tithiNames[tithiIndex],
    tithiNameEn: tithiNamesEn[tithiIndex],
    paksha,
    pakshaEn
  };
}

function getMoonLongitude(t: number): number {
  const L1 = 218.316 + 481267.8813 * t;
  const D = 297.8502 + 445267.1115 * t;
  const M1 = 134.963 + 477198.8671 * t;
  
  const moonLongitude = L1
    + (6.289 * Math.sin(M1 * PI / 180.0))
    - (1.274 * Math.sin((2 * D - M1) * PI / 180.0))
    - (0.658 * Math.sin(2 * D * PI / 180.0))
    - (0.214 * Math.sin(2 * M1 * PI / 180.0))
    + (0.11 * Math.sin(D * PI / 180.0));
    
  return moonLongitude % 360.0;
}

function getSunLongitude(t: number): number {
  const l0 = 280.4665 + 36000.7698 * t;
  const m = 357.5291 + 35999.0503 * t;
  const c = (1.9146 - 0.004817 * t - 0.000014 * t * t) * Math.sin(m * PI / 180.0)
    + (0.019993 - 0.000101 * t) * Math.sin(2 * m * PI / 180.0)
    + 0.000289 * Math.sin(3 * m * PI / 180.0);
    
  const sunLongitude = l0 + c;
  return sunLongitude % 360.0;
}

function gregorianToJulian(year: number, month: number, day: number): number {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }
  
  const a = Math.floor(year / 100);
  const b = 2 - a + Math.floor(a / 4);
  
  return Math.floor(365.25 * (year + 4716)) + 
         Math.floor(30.6001 * (month + 1)) + 
         day + b - 1524.5;
}
