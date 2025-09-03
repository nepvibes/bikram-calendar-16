
// Enhanced tithi calculation using panchanga module
import { calculate as calculatePanchanga } from './panchanga';

export interface TithiResult {
  tithiName: string;
  tithiNameEn: string;
  paksha: string;
  pakshaEn: string;
  tithiIndex: number;
}

export function calculateTithi(date: Date): TithiResult {
  const panchangaData = calculatePanchanga(date);
  
  // English translations for paksha
  const pakshaEn = panchangaData.paksha === "शुक्ल पक्ष" ? "Bright Fortnight" : "Dark Fortnight";
  
  // English translations for tithi names
  const tithiEnglishNames = [
    "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shashthi", 
    "Saptami", "Ashtami", "Navami", "Dashami", "Ekadashi", "Dwadashi", 
    "Trayodashi", "Chaturdashi", "Purnima", "Amavasya"
  ];
  
  const tithiNameEn = panchangaData.tithiDay <= 15 ? 
    tithiEnglishNames[panchangaData.tithiDay - 1] : 
    tithiEnglishNames[15]; // Amavasya
  
  return {
    tithiName: panchangaData.tithi,
    tithiNameEn,
    paksha: panchangaData.paksha,
    pakshaEn,
    tithiIndex: panchangaData.tithiDay
  };
}

export function getTithiNamesNp(): string[] {
  return ["प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पञ्चमी", "षष्ठी", "सप्तमी", "अष्टमी", "नवमी", "दशमी", "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", "पूर्णिमा", "अमावस्या"];
}

export function getTithiNamesEn(): string[] {
  return ["Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima", "Amavasya"];
}

export function getPakshaNames(): { np: string[], en: string[] } {
  return {
    np: ["शुक्ल पक्ष", "कृष्ण पक्ष"],
    en: ["Bright Fortnight", "Dark Fortnight"]
  };
}
