/**
 * Bikram Calculator - Hindu Astrological Calendar with panchanga
 * Copyright (C) 2025 Khumnath Cg <nath.khum@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

// Bikram Sambat Data
const Bsdata = {
    BS_START_YEAR: 2000,
    BS_END_YEAR: 2089,
    BS_START_DATE_AD: new Date(Date.UTC(1943, 3, 14)),
    NP_MONTHS_DATA: [
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
        [30,32,31,32,31,31,29,30,30,29,29,31,365], // 2062
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
        [30,32,31,32,31,31,29,30,30,29,29,31,365], // 2089
    ]
};

// Event interfaces
interface LunarEvent {
  event: string;
  eventType: string;
  lunarMonth: string;
  paksha: string;
  tithi: string;
  detail: string;
  category: string;
  holiday: boolean;
  startYear?: number;
  endYear?: number;
}

interface GregorianEvent {
  event: string;
  date: string;
  detail: string;
  category: string;
  holiday: boolean;
  startYear?: number;
  endYear?: number;
}

interface BikramRecurringEvent {
  event: string;
  date: string;
  detail: string;
  category: string;
  holiday: boolean;
  startYear?: number;
  endYear?: number;
}

interface BikramFixedEvent {
  event: string;
  date: string;
  detail: string;
  category: string;
  holiday: boolean;
}

// Events Data
const EventsData = {
    lunarEvents: [
        { event: "चैते दशैँ", eventType: "lunar", lunarMonth: "चैत्र", paksha: "शुक्ल पक्ष", tithi: "अष्टमी", detail: "चैत्र महिनामा मनाइने दशैँ, ठूलो दशैँको सानो रूप।", category: "धार्मिक", holiday: false },
        { event: "रामनवमी", eventType: "lunar", lunarMonth: "चैत्र", paksha: "शुक्ल पक्ष", tithi: "नवमी", detail: "भगवान रामको जन्मदिन।", category: "धार्मिक", holiday: true },
        { event: "मातातीर्थ औंसी", eventType: "lunar", lunarMonth: "चैत्र", paksha: "कृष्ण पक्ष", tithi: "अमावस्या", detail: "आमाको मुख हेर्ने दिन।", category: "धार्मिक", holiday: false },
        { event: "घोडेजात्रा", eventType: "lunar", lunarMonth: "चैत्र", paksha: "कृष्ण पक्ष", tithi: "अमावस्या", detail: "काठमाडौँमा मनाइने घोडे जात्रा उत्सव।", category: "Jatra", holiday: true },
        { event: "अक्षय तृतीया", eventType: "lunar", lunarMonth: "वैशाख", paksha: "शुक्ल पक्ष", tithi: "तृतीया", detail: "जौ सातु खाने दिन।", category: "धार्मिक", holiday: false },
        { event: "बुद्ध जयन्ती / उभौली पर्व", eventType: "lunar", lunarMonth: "वैशाख", paksha: "शुक्ल पक्ष", tithi: "पूर्णिमा", detail: "भगवान बुद्धको जन्मदिन र किरात समुदायको उभौली पर्व।", category: "धार्मिक", holiday: true },
        { event: "गुरु पूर्णिमा", eventType: "lunar", lunarMonth: "आषाढ", paksha: "शुक्ल पक्ष", tithi: "पूर्णिमा", detail: "गुरु र शिक्षकहरूलाई सम्मान गर्ने दिन।", category: "धार्मिक", holiday: false },
        { event: "नाग पञ्चमी", eventType: "lunar", lunarMonth: "श्रावण", paksha: "शुक्ल पक्ष", tithi: "पञ्चमी", detail: "सर्प देवताको पूजा गर्ने दिन।", category: "धार्मिक", holiday: false },
        { event: "जनै पूर्णिमा / रक्षा बन्धन", eventType: "lunar", lunarMonth: "श्रावण", paksha: "शुक्ल पक्ष", tithi: "पूर्णिमा", detail: "जनै बदल्ने तथा रक्षा बन्धन बांध्ने पवित्र उत्सव।", category: "धार्मिक", holiday: true },
        { event: "कृष्ण जन्माष्टमी", eventType: "lunar", lunarMonth: "श्रावण", paksha: "कृष्ण पक्ष", tithi: "अष्टमी", detail: "भगवान कृष्णको जन्मदिन।", category: "धार्मिक", holiday: true },
        { event: "गाईजात्रा", eventType: "lunar", lunarMonth: "भाद्रपद", paksha: "कृष्ण पक्ष", tithi: "प्रतिपदा", detail: "गाईको उत्सव, हास्य र व्यङ्ग्यको मेल।", category: "Jatra", holiday: true },
        { event: "कुशे औंसी", eventType: "lunar", lunarMonth: "भाद्रपद", paksha: "कृष्ण पक्ष", tithi: "अमावस्या", detail: "बुवाको मुख हेर्ने दिन।", category: "धार्मिक", holiday: true },
        { event: "हरितालिका तीज", eventType: "lunar", lunarMonth: "भाद्रपद", paksha: "शुक्ल पक्ष", tithi: "तृतीया", detail: "महिलाहरूले को महान उत्सव।", category: "धार्मिक", holiday: true },
        { event: "गणेश चतुर्थी", eventType: "lunar", lunarMonth: "भाद्रपद", paksha: "शुक्ल पक्ष", tithi: "चतुर्थी", detail: "भगवान गणेशको जन्मदिन।", category: "धार्मिक", holiday: false },
        { event: "इन्द्रजात्रा", eventType: "lunar", lunarMonth: "भाद्रपद", paksha: "शुक्ल पक्ष", tithi: "चतुर्दशी", detail: "काठमाडौँको प्रमुख सडक उत्सवको मुख्य दिन।", category: "Jatra", holiday: true },
        { event: "घटस्थापना", eventType: "lunar", lunarMonth: "आश्विन", paksha: "शुक्ल पक्ष", tithi: "प्रतिपदा", detail: "दशैँको सुरुवात, नवरात्रिको पहिलो दिन।", category: "धार्मिक", holiday: true },
        { event: "फूलपाती", eventType: "lunar", lunarMonth: "आश्विन", paksha: "शुक्ल पक्ष", tithi: "सप्तमी", detail: "दशैँको सातौँ दिन।", category: "धार्मिक", holiday: true },
        { event: "महाअष्टमी", eventType: "lunar", lunarMonth: "आश्विन", paksha: "शुक्ल पक्ष", tithi: "अष्टमी", detail: "दशैँको आठौँ दिन।", category: "धार्मिक", holiday: true },
        { event: "महानवमी", eventType: "lunar", lunarMonth: "आश्विन", paksha: "शुक्ल पक्ष", tithi: "नवमी", detail: "दशैँको नवौं दिन।", category: "धार्मिक", holiday: true },
        { event: "विजयादशमी (दशैं)", eventType: "lunar", lunarMonth: "आश्विन", paksha: "शुक्ल पक्ष", tithi: "दशमी", detail: "दशैँको दशौँ दिन, विजयको दिन।", category: "धार्मिक", holiday: true },
        { event: "कोजाग्रत पूर्णिमा", eventType: "lunar", lunarMonth: "आश्विन", paksha: "शुक्ल पक्ष", tithi: "पूर्णिमा", detail: "दशैँको अन्त्य।", category: "धार्मिक", holiday: true },
        { event: "काग तिहार", eventType: "lunar", lunarMonth: "कार्तिक", paksha: "कृष्ण पक्ष", tithi: "त्रयोदशी", detail: "तिहारको पहिलो दिन, कागलाई समर्पित।", category: "धार्मिक", holiday: true },
        { event: "कुकुर तिहार", eventType: "lunar", lunarMonth: "कार्तिक", paksha: "कृष्ण पक्ष", tithi: "चतुर्दशी", detail: "तिहारको दोस्रो दिन, कुकुरलाई समर्पित।", category: "धार्मिक", holiday: true },
        { event: "लक्ष्मी पूजा", eventType: "lunar", lunarMonth: "कार्तिक", paksha: "कृष्ण पक्ष", tithi: "अमावस्या", detail: "तिहारको तेस्रो दिन, देवी लक्ष्मीको पूजा।", category: "धार्मिक", holiday: true },
        { event: "गोवर्धन पूजा / म्ह पूजा", eventType: "lunar", lunarMonth: "कार्तिक", paksha: "शुक्ल पक्ष", tithi: "प्रतिपदा", detail: "तिहारको चौथो दिन, आत्म-पूजाको दिन।", category: "धार्मिक", holiday: true },
        { event: "भाइटीका", eventType: "lunar", lunarMonth: "कार्तिक", paksha: "शुक्ल पक्ष", tithi: "द्वितीया", detail: "तिहारको पाँचौँ दिन, दिदी-भाइबीचको प्रेमको दिन।", category: "धार्मिक", holiday: true },
        { event: "छठ पर्व", eventType: "lunar", lunarMonth: "कार्तिक", paksha: "शुक्ल पक्ष", tithi: "षष्ठी", detail: "सूर्य देवतालाई समर्पित उत्सव, मुख्यतया तराईमा मनाइन्छ।", category: "धार्मिक", holiday: true },
        { event: "हरिबोधिनी एकादशी", eventType: "lunar", lunarMonth: "कार्तिक", paksha: "शुक्ल पक्ष", tithi: "एकादशी", detail: "भगवान विष्णुको जागरणको दिन।", category: "धार्मिक", holiday: false },
        { event: "विवाह पञ्चमी", eventType: "lunar", lunarMonth: "मार्गशीर्ष", paksha: "शुक्ल पक्ष", tithi: "पञ्चमी", detail: "भगवान राम र सीताको विवाहको सम्झना।", category: "धार्मिक", holiday: false },
        { event: "य:मरि पुन्हि / धान्यपुर्णिमा", eventType: "lunar", lunarMonth: "मार्गशीर्ष", paksha: "शुक्ल पक्ष", tithi: "पूर्णिमा", detail: "नेवार समुदायको यमरि पुन्हि / धान्य पूर्णिमाको उत्सव।", category: "धार्मिक", holiday: false },
        { event: "सरस्वती पूजा / वसन्तपञ्चमी", eventType: "lunar", lunarMonth: "माघ", paksha: "शुक्ल पक्ष", tithi: "पञ्चमी", detail: "ज्ञान र शिक्षाको देवी सरस्वतीको पूजा।", category: "धार्मिक", holiday: false },
        { event: "महाशिवरात्रि", eventType: "lunar", lunarMonth: "फाल्गुन", paksha: "कृष्ण पक्ष", tithi: "चतुर्दशी", detail: "भगवान शिवको महान रात्रि।", category: "धार्मिक", holiday: true },
        { event: "होली पूर्णिमा", eventType: "lunar", lunarMonth: "फाल्गुन", paksha: "शुक्ल पक्ष", tithi: "पूर्णिमा", detail: "रङ्गहरूको उत्सव।", category: "धार्मिक", holiday: true },
    ] as LunarEvent[],
    gregorianEvents: [
        { event: "New Year's Day", date: "01/01", detail: "Celebration of the new Gregorian year.", category: "International Day", holiday: true },
        { event: "Valentine's Day", date: "02/14", detail: "International day of love. Nepali: प्रणय दिवस.", category: "International Day", holiday: false },
        { event: "International Women's Day", date: "03/08", detail: "Global day celebrating womanhood. Nepali: नारी दिवस.", category: "International Day", holiday: true },
        { event: "World Health Day", date: "04/07", detail: "A global health awareness day. Nepali: विश्व स्वास्थ्य दिवस.", category: "International Day", holiday: false },
        { event: "International Workers' Day", date: "05/01", detail: "Also known as May Day. Nepali: अन्तर्राष्ट्रिय श्रमिक दिवस.", category: "International Day", holiday: true },
        { event: "World Environment Day", date: "06/05", detail: "Day for environmental awareness and action. Nepali: विश्व वातावरण दिवस.", category: "International Day", holiday: false },
        { event: "International Day of Yoga", date: "06/21", detail: "Global day to celebrate yoga. Nepali: विश्व योग दिवस.", category: "International Day", holiday: false },
        { event: "World Population Day", date: "07/11", detail: "Day to raise awareness of global population issues. Nepali: विश्व जनसंख्या दिवस.", category: "International Day", holiday: false },
        { event: "International Youth Day", date: "08/12", detail: "Day to celebrate young people as agents of change. Nepali: अन्तर्राष्ट्रिय युवा दिवस.", category: "International Day", holiday: false },
        { event: "International Human Rights Day", date: "12/10", detail: "Commemorates the adoption of the Universal Declaration of Human Rights. Nepali: अन्तर्राष्ट्रिय मानव अधिकार दिवस.", category: "International Day", holiday: false },
        { event: "Christmas Day", date: "12/25", detail: "Christian festival celebrating the birth of Jesus. Nepali: क्रिसमस-डे.", category: "Festival", holiday: true }
    ] as GregorianEvent[],
    bikramRecurringEvents: [
        { event: "लोकतन्त्र दिवस", date: "01/11", detail: "लोकतन्त्र दिवस, हरेक वर्ष बैशाख ११ गते मनाइन्छ।", category: "National Day", holiday: true },
        { event: "गणतन्त्र दिवस", date: "02/15", detail: "गणतन्त्र दिवस, हरेक वर्ष जेठ १५ गते मनाइन्छ।", category: "National Day", holiday: true },
        { event: "राष्ट्रिय धान दिवस", date: "03/15", detail: "राष्ट्रिय धान दिवस, हरेक वर्ष असार १५ गते मनाइन्छ।", category: "National Day", holiday: false },
        { event: "भानु जयन्ती", date: "03/29", detail: "कवि भानुभक्त आचार्यको जन्म जयन्ती।", category: "Jayanti", holiday: false },
        { event: "संविधान दिवस", date: "06/03", detail: "संविधान दिवस, हरेक वर्ष असोज ३ गते मनाइन्छ।", category: "National Day", holiday: true },
        { event: "पृथ्वी जयन्ती / राष्ट्रिय एकता दिवस", date: "09/27", detail: "पृथ्वी जयन्ती / राष्ट्रिय एकता दिवस।", category: "National Day", holiday: true },
        { event: "शहीद दिवस", date: "10/16", detail: "शहीद दिवस।", category: "National Day", holiday: true },
        { event: "प्रजातन्त्र दिवस", date: "11/07", detail: "राणा शासनको अन्त्यको सम्झनामा मनाइने प्रजातन्त्र दिवस।", category: "National Day", holiday: true },
        { event: "नयाँ वर्ष", date: "01/01", detail: "नेपाली नयाँ वर्ष।", category: "Festival", holiday: true },
        { event: "बिस्का: जात्रा", date: "01/01", detail: "भक्तपुरमा मनाइने बिस्का जात्राको उत्सव।", category: "Jatra", holiday: true },
        { event: "साउने सङ्क्रान्ति", date: "04/01", detail: "श्रावण सङ्क्रान्ति, श्रावण महिनाको पहिलो दिन।", category: "Sankranti", holiday: false },
        { event: "माघे संक्रान्ति", date: "10/01", detail: "माघे सङ्क्रान्ति, माघ महिनाको पहिलो दिन।", category: "Sankranti", holiday: true }
    ] as BikramRecurringEvent[],
    bikramFixedEvents: [
        { event: "भोटो जात्रा", date: "2082/02/18", detail: "रातो मच्छिन्द्रनाथ जात्राको समापन दिन।", category: "Jatra", holiday: true },
        { event: "तमु ल्होसार", date: "2082/09/15", detail: "गुरुङ समुदायको नयाँ वर्ष।", category: "Lhosar", holiday: true },
        { event: "सोनाम ल्होसार", date: "2082/10/05", detail: "तमाङ समुदायको नयाँ वर्ष।", category: "Lhosar", holiday: true },
        { event: "ग्याल्पो ल्होछार", date: "2082/11/06", detail: "शेर्पा समुदायको नयाँ वर्ष।", category: "Lhosar", holiday: true }
    ] as BikramFixedEvent[]
};

// Caching
let calculationCache: { [key: string]: any } = {};

function clearCache(): void {
    calculationCache = {};
}

// Surya Siddhanta Constants
const YugaRotation = { 
    'star': 1582237828, 
    'sun': 4320000, 
    'moon': 57753336, 
    'mercury': 17937060, 
    'venus': 7022376, 
    'mars': 2296832, 
    'jupiter': 364220, 
    'saturn': 146568, 
    'Candrocca': 488203, 
    'Rahu': -232238 
};
const YugaCivilDays = 1577917828;
const KaliEpoch = 588465.5;
const PlanetApogee = { 'sun': 77 + 17 / 60 };
const PlanetCircumm = { 'sun': 13 + 50 / 60, 'moon': 31 + 50 / 60 };
const rad = 180 / Math.PI;

// Panchanga Names
const tithiNamesList = ["प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पञ्चमी", "षष्ठी", "सप्तमी", "अष्टमी", "नवमी", "दशमी", "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", "पूर्णिमा", "अमावस्या"];
const nakshatras = ["अश्विनी", "भरणी", "कृत्तिका", "रोहिणी", "मृगशिरा", "आर्द्रा", "पुनर्वसु", "पुष्य", "अश्लेषा", "मघा", "पूर्व फाल्गुनी", "उत्तर फाल्गुनी", "हस्त", "चित्रा", "स्वाती", "विशाखा", "अनुराधा", "ज्येष्ठा", "मूल", "पूर्वाषाढा", "उत्तराषाढा", "श्रवण", "धनिष्ठा", "शतभिषा", "पूर्व भाद्रपद", "उत्तर भाद्रपद", "रेवती"];
const yogas = ["विष्कम्भ", "प्रीति", "आयुष्मान्", "सौभाग्य", "शोभन", "अतिगण्ड", "सुकर्म", "धृति", "शूल", "गण्ड", "वृद्धि", "ध्रुव", "व्याघात", "हर्षण", "वज्र", "सिद्धि", "व्यतिपात", "वरीयान्", "परिघ", "शिव", "सिद्ध", "साध्य", "शुभ", "शुक्ल", "ब्रह्म", "इन्द्र", "वैधृति"];
const karanas = ["किंस्तुघ्न", "बव", "बालव", "कौलव", "तैतिल", "गर", "वणिज", "विष्टि", "शकुनि", "चतुष्पाद", "नाग"];
const rashis = ["मेष", "वृषभ", "मिथुन", "कर्क", "सिंह", "कन्या", "तुला", "वृश्चिक", "धनु", "मकर", "कुम्भ", "मीन"];
const solarMonths = ["वैशाख", "ज्येष्ठ", "आषाढ", "श्रावण", "भाद्रपद", "आश्विन", "कार्तिक", "मार्गशीर्ष", "पौष", "माघ", "फाल्गुन", "चैत्र"];
const weekdays = ["आइतबार", "सोमबार", "मङ्गलबार", "बुधबार", "बिहीबार", "शुक्रबार", "शनिबार"];
const nepaliGregorianMonths = ["जनवरी", "फेब्रुअरी", "मार्च", "अप्रिल", "मे", "जून", "जुलाई", "अगस्ट", "सेप्टेम्बर", "अक्टोबर", "नोभेम्बर", "डिसेम्बर"];

// Helper Functions
function zero360(x: number): number { 
    return x - Math.floor(x / 360) * 360; 
}

function sinDeg(deg: number): number { 
    return Math.sin(deg / rad); 
}

function cosDeg(deg: number): number { 
    return Math.cos(deg / rad); 
}

function arcsinDeg(x: number): number { 
    return Math.asin(x) * rad; 
}

function formatMonthDay(month: number, day: number): string {
    return (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;
}

function toJulianDay(year: number, month: number, day: number): number {
    let m = month + 1;
    let y = year;
    if (m <= 2) { y--; m += 12; }
    const a = Math.floor(y / 100);
    const b = 2 - a + Math.floor(a / 4);
    return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5;
}

function fromJulianDay(jd: number): Date {
    jd += 0.5;
    const z = Math.floor(jd);
    const f = jd - z;
    let a;
    if (z < 2299161) { 
        a = z; 
    } else {
        const alpha = Math.floor((z - 1867216.25) / 36524.25);
        a = z + 1 + alpha - Math.floor(alpha / 4);
    }
    const b = a + 1524;
    const c = Math.floor((b - 122.1) / 365.25);
    const d = Math.floor(365.25 * c);
    const e = Math.floor((b - d) / 30.6001);
    const day = Math.floor(b - d - Math.floor(30.6001 * e) + f);
    const month = (e < 14) ? e - 1 : e - 13;
    const year = (month > 2) ? c - 4716 : c - 4715;
    return new Date(Date.UTC(year, month - 1, day));
}

// Core Surya Siddhanta Calculations
function meanLongitude(ahar: number, rotation: number): number { 
    return zero360(rotation * ahar * 360 / YugaCivilDays); 
}

function mandaEquation(meanLong: number, apogee: number, circ: number): number { 
    return arcsinDeg(circ / 360 * sinDeg(meanLong - apogee)); 
}

function trueLongitudeSun(ahar: number): number {
    const meanLong = meanLongitude(ahar, YugaRotation.sun);
    const manda = mandaEquation(meanLong, PlanetApogee.sun, PlanetCircumm.sun);
    return zero360(meanLong - manda);
}

function trueLongitudeMoon(ahar: number): number {
    const meanLong = meanLongitude(ahar, YugaRotation.moon);
    const apogee = meanLongitude(ahar, YugaRotation.Candrocca) + 90;
    const manda = mandaEquation(meanLong, apogee, PlanetCircumm.moon);
    return zero360(meanLong - manda);
}

function getTithi(sunLong: number, moonLong: number): number { 
    return zero360(moonLong - sunLong) / 12; 
}

function findNewMoon(ahar: number): number {
    const getElongation = (a: number) => zero360(trueLongitudeMoon(a) - trueLongitudeSun(a));
    let guess = ahar;
    for (let i = 0; i < 10; i++) {
        const elong = getElongation(guess);
        if (elong < 5 || elong > 355) break;
        const correction = (elong < 180 ? -elong : 360 - elong) / 12.19;
        guess += correction;
    }
    let lo = guess - 2, hi = guess + 2;
    for (let j = 0; j < 30; j++) {
        const mid = (lo + hi) / 2;
        const em = getElongation(mid);
        if (em < 180) { hi = mid; } else { lo = mid; }
    }
    return (lo + hi) / 2;
}

function findPurnima(ahar: number): number {
    const getElongation = (a: number) => zero360(trueLongitudeMoon(a) - trueLongitudeSun(a));
    let guess = ahar;
    for (let i = 0; i < 10; i++) {
        const elong = getElongation(guess);
        if (Math.abs(elong - 180) < 5) break;
        const correction = (180 - elong) / 12.19;
        guess += correction;
    }
    let lo = guess - 2, hi = guess + 2;
    for (let j = 0; j < 30; j++) {
        const mid = (lo + hi) / 2;
        const em = getElongation(mid);
        if (em < 180) { lo = mid; } else { hi = mid; }
    }
    return (lo + hi) / 2;
}

function getSunriseSunset(date: Date, lat: number = 27.7172, lon: number = 85.3240, tz: number = 5.75): { sunrise: string; sunset: string } {
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getUTCFullYear(), 0, 0).getTime()) / 86400000);
    const B = (360 / 365) * (dayOfYear - 81) / rad;
    const eot = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);
    const lstm = 15 * tz;
    const tc = (4 * (lon - lstm) + eot) / 60;
    const declination = -23.45 * cosDeg(360 / 365 * (dayOfYear + 10));
    const hourAngleRad = Math.acos((sinDeg(-0.833) - sinDeg(lat) * sinDeg(declination)) / (cosDeg(lat) * cosDeg(declination)));
    const hourAngle = hourAngleRad * rad;
    const sunrise = 12 - hourAngle / 15 - tc;
    const sunset = 12 + hourAngle / 15 - tc;
    
    const formatTime = (h: number): string => {
        if (!isFinite(h)) return "N/A";
        let hr = Math.floor(h);
        let min = Math.round((h - hr) * 60);
        if (min === 60) { hr++; min = 0; }
        return (hr < 10 ? '0' : '') + hr + ":" + (min < 10 ? '0' : '') + min;
    };
    
    return { sunrise: formatTime(sunrise), sunset: formatTime(sunset) };
}

export function fromBikramSambat(bsYear: number, monthIndex: number, day: number): Date {
    if (bsYear >= Bsdata.BS_START_YEAR && bsYear <= Bsdata.BS_END_YEAR) {
        let daysOffset = 0;
        for (let y = Bsdata.BS_START_YEAR; y < bsYear; y++) {
            const yearData = Bsdata.NP_MONTHS_DATA[y - Bsdata.BS_START_YEAR];
            let totalDaysInYear = 0;
            for (let m = 0; m < 12; m++) {
                totalDaysInYear += yearData[m];
            }
            daysOffset += totalDaysInYear;
        }
        const targetYearData = Bsdata.NP_MONTHS_DATA[bsYear - Bsdata.BS_START_YEAR];
        for (let m = 0; m < monthIndex; m++) {
            daysOffset += targetYearData[m];
        }
        daysOffset += (day - 1);
        const resultDate = new Date(Bsdata.BS_START_DATE_AD.getTime());
        resultDate.setUTCDate(resultDate.getUTCDate() + daysOffset);
        return resultDate;
    } else {
        // Fallback for out-of-range years
        const YearSaka = bsYear - 135;
        const YearKali = YearSaka + 3179;
        let ahar = Math.floor((YearKali * YugaCivilDays) / YugaRotation.sun);
        let currentDay = getSauraMasaDay(ahar);
        while (currentDay.m !== monthIndex || currentDay.d !== day) {
            if (currentDay.m < monthIndex || (currentDay.m === monthIndex && currentDay.d < day)) {
                ahar += 1;
            } else {
                ahar -= 1;
            }
            currentDay = getSauraMasaDay(ahar);
        }
        const julian_date = ahar + KaliEpoch;
        return fromJulianDay(julian_date);
    }
}

export function getBikramMonthInfo(bsYear: number, monthIndex: number): { totalDays: number; startDayOfWeek: number; monthName: string; year: number } | null {
    if (bsYear >= Bsdata.BS_START_YEAR && bsYear <= Bsdata.BS_END_YEAR) {
        const firstDayAd = fromBikramSambat(bsYear, monthIndex, 1);
        if (!firstDayAd) return null;
        const monthData = Bsdata.NP_MONTHS_DATA[bsYear - Bsdata.BS_START_YEAR];
        return {
            totalDays: monthData[monthIndex],
            startDayOfWeek: firstDayAd.getUTCDay(),
            monthName: solarMonths[monthIndex],
            year: bsYear
        };
    } else {
        // Fallback for out-of-range years
        const first = fromBikramSambat(bsYear, monthIndex, 1);
        const nextMon = monthIndex === 11 ? 0 : monthIndex + 1;
        const nextYear = monthIndex === 11 ? bsYear + 1 : bsYear;
        const nextFirst = fromBikramSambat(nextYear, nextMon, 1);
        const jd1 = toJulianDay(first.getUTCFullYear(), first.getUTCMonth(), first.getUTCDate());
        const jd2 = toJulianDay(nextFirst.getUTCFullYear(), nextFirst.getUTCMonth(), nextFirst.getUTCDate());
        return {
            totalDays: Math.round(jd2 - jd1),
            startDayOfWeek: first.getUTCDay(),
            monthName: solarMonths[monthIndex],
            year: bsYear
        };
    }
}

export interface BikramDateObj {
    year: number;
    monthIndex: number;
    day: number;
    monthName: string;
    isComputed?: boolean;
}

export function toBikramSambat(gregorianDate: Date): BikramDateObj {
    let isDataAvailable = false;
    let targetUtcDate: Date;
    let startDate: Date;
    
    if (Bsdata && Bsdata.BS_START_DATE_AD) {
        targetUtcDate = new Date(Date.UTC(gregorianDate.getUTCFullYear(), gregorianDate.getUTCMonth(), gregorianDate.getUTCDate()));
        startDate = new Date(Date.UTC(Bsdata.BS_START_DATE_AD.getUTCFullYear(), Bsdata.BS_START_DATE_AD.getUTCMonth(), Bsdata.BS_START_DATE_AD.getUTCDate()));
        if (targetUtcDate >= startDate && gregorianDate.getUTCFullYear() <= (Bsdata.BS_END_YEAR - 56)) {
            isDataAvailable = true;
        }
    }

    if (isDataAvailable) {
        let daysOffset = Math.floor((targetUtcDate!.getTime() - startDate!.getTime()) / 86400000);
        for (let y = 0; y < Bsdata.NP_MONTHS_DATA.length; y++) {
            const currentBsYear = Bsdata.BS_START_YEAR + y;
            const yearData = Bsdata.NP_MONTHS_DATA[y];
            let daysInYear = 0;
            for (let m_idx = 0; m_idx < 12; m_idx++) { 
                daysInYear += yearData[m_idx]; 
            }
            if (daysOffset < daysInYear) {
                for (let m = 0; m < 12; m++) {
                    const daysInMonth = yearData[m];
                    if (daysOffset < daysInMonth) {
                        return { 
                            year: currentBsYear, 
                            monthIndex: m, 
                            day: daysOffset + 1, 
                            monthName: solarMonths[m], 
                            isComputed: false 
                        };
                    }
                    daysOffset -= daysInMonth;
                }
            }
            daysOffset -= daysInYear;
        }
    }
    
    // Fallback to astronomical calculation
    const result = fromGregorianAstronomical(
        gregorianDate.getUTCFullYear(),
        gregorianDate.getUTCMonth() + 1,
        gregorianDate.getUTCDate()
    );
    result.isComputed = true;
    return result;
}

function resolveTithiName(tithiDay: number, paksha: string): string {
    if (paksha === "कृष्ण पक्ष" && tithiDay === 15) return tithiNamesList[15];
    if (paksha === "शुक्ल पक्ष" && tithiDay === 15) return tithiNamesList[14];
    return tithiNamesList[tithiDay - 1];
}

function _getPanchangaBasics(date: Date): {
    ahar: number;
    lunarMonthName: string;
    isAdhika: boolean;
    paksha: string;
    tithiName: string;
    tithiDay: number;
} {
    const jd = toJulianDay(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    const ahar = jd - KaliEpoch + 0.25 + ((85.3240 / 15 - 5.75) / 24);
    const sunLong = trueLongitudeSun(ahar);
    const moonLong = trueLongitudeMoon(ahar);
    const tithiVal = getTithi(sunLong, moonLong);
    const tithiNum = Math.floor(tithiVal) + 1;
    const paksha = tithiNum <= 15 ? "शुक्ल पक्ष" : "कृष्ण पक्ष";
    const tithiDay = tithiNum > 15 ? tithiNum - 15 : tithiNum;
    const tithiName = resolveTithiName(tithiDay, paksha);
    const lunarMonthInfo = getLunarMonthNameWithAdhik(ahar);
    
    return {
        ahar: ahar,
        lunarMonthName: lunarMonthInfo.monthName,
        isAdhika: lunarMonthInfo.isAdhika,
        paksha: paksha,
        tithiName: tithiName,
        tithiDay: tithiDay
    };
}

export function getEventsForDate(date: Date, bsYear: number, bsMonthIndex: number, bsDay: number): Array<{ name: string; detail: string; category: string; holiday: boolean }> {
    const events: Array<{ name: string; detail: string; category: string; holiday: boolean }> = [];
    const gregorianYear = date.getUTCFullYear();
    const gregorianMonth = date.getUTCMonth() + 1;
    const gregorianDay = date.getUTCDate();
    const formattedGregorianDate = formatMonthDay(gregorianMonth, gregorianDay);
    const formattedBikramRecurringDate = formatMonthDay(bsMonthIndex + 1, bsDay);

    // Handle Gregorian events
    if (EventsData.gregorianEvents) {
        for (let i = 0; i < EventsData.gregorianEvents.length; i++) {
            const event = EventsData.gregorianEvents[i];
            // Check year constraints using Gregorian year
            if (event.startYear && gregorianYear < event.startYear) continue;
            if (event.endYear && gregorianYear > event.endYear) continue;

            if (event.date === formattedGregorianDate) {
                events.push({ name: event.event, detail: event.detail, category: event.category, holiday: event.holiday || false });
            }
        }
    }

    // Handle Bikram recurring events
    if (EventsData.bikramRecurringEvents) {
        for (let j = 0; j < EventsData.bikramRecurringEvents.length; j++) {
            const event = EventsData.bikramRecurringEvents[j];
            // Check year constraints using BS year
            if (event.startYear && bsYear < event.startYear) continue;
            if (event.endYear && bsYear > event.endYear) continue;

            if (event.date === formattedBikramRecurringDate) {
                events.push({ name: event.event, detail: event.detail, category: event.category, holiday: event.holiday || false });
            }
        }
    }

    // Handle Bikram fixed events
    if (EventsData.bikramFixedEvents) {
        const formattedFixedDate = bsYear + "/" + formatMonthDay(bsMonthIndex + 1, bsDay);
        for(let i = 0; i < EventsData.bikramFixedEvents.length; i++) {
            const event = EventsData.bikramFixedEvents[i];
            if (event.date === formattedFixedDate) {
                events.push({ name: event.event, detail: event.detail, category: event.category, holiday: event.holiday || false });
            }
        }
    }

    // Handle Lunar events
    if (EventsData.lunarEvents) {
        const todayInfo = _getPanchangaBasics(date);
        if (todayInfo.isAdhika) {
            return events; // Assuming no lunar events in Adhika masa
        }

        const yesterday = new Date(date.getTime() - 86400000);
        const yesterdayInfo = _getPanchangaBasics(yesterday);

        // Check if the *previous* lunar month was a kshaya month. If so, its events are observed in the current month.
        const prevLunarMonthAhar = todayInfo.ahar - 29.53;
        const prevMonthStatus = calculateAdhikaMasa(prevLunarMonthAhar);
        let kshayaMonthName: string | null = null;
        if (prevMonthStatus.startsWith("क्षय")) {
            kshayaMonthName = prevMonthStatus.split(" ")[1];
        }

        for (let k = 0; k < EventsData.lunarEvents.length; k++) {
            const lunarEvent = EventsData.lunarEvents[k];

            // Check year constraints using BS year
            if (lunarEvent.startYear && bsYear < lunarEvent.startYear) continue;
            if (lunarEvent.endYear && bsYear > lunarEvent.endYear) continue;

            const isEventForToday = (lunarEvent.lunarMonth === todayInfo.lunarMonthName &&
                                   lunarEvent.paksha === todayInfo.paksha &&
                                   lunarEvent.tithi === todayInfo.tithiName);

            const isEventFromKshayaMonth = (kshayaMonthName !== null &&
                                          lunarEvent.lunarMonth === kshayaMonthName &&
                                          lunarEvent.paksha === todayInfo.paksha &&
                                          lunarEvent.tithi === todayInfo.tithiName);

            if (isEventForToday || isEventFromKshayaMonth) {
                const isFirstDayOfTithi = !(yesterdayInfo.lunarMonthName === todayInfo.lunarMonthName &&
                                          yesterdayInfo.paksha === todayInfo.paksha &&
                                          yesterdayInfo.tithiName === todayInfo.tithiName);

                if (isFirstDayOfTithi) {
                    events.push({ name: lunarEvent.event, detail: lunarEvent.detail, category: lunarEvent.category, holiday: lunarEvent.holiday || false });
                }
            }
        }
    }
    return events;
}

// Main calculations
export function calculate(date: Date, lat: number = 27.7172, lon: number = 85.3240, tz: number = 5.75): any {
    const cacheKey = "panchanga_" + date.getTime();
    if (calculationCache[cacheKey]) return calculationCache[cacheKey];
    
    const jd = toJulianDay(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    const ahar = jd - KaliEpoch + 0.25 + (((lon || 85.3240) / 15 - (tz || 5.75)) / 24);
    const sunLong = trueLongitudeSun(ahar);
    const moonLong = trueLongitudeMoon(ahar);
    const tithiVal = getTithi(sunLong, moonLong);
    const tithiNum = Math.floor(tithiVal) + 1;
    const paksha = tithiNum <= 15 ? "शुक्ल पक्ष" : "कृष्ण पक्ष";
    const tithiDay = tithiNum > 15 ? tithiNum - 15 : tithiNum;
    const tithiName = resolveTithiName(tithiDay, paksha);
    const karanaIdx = Math.floor(2 * tithiVal);
    const karanaName = karanaIdx > 0 ? (karanaIdx < 57 ? karanas[(karanaIdx-1) % 7 + 1] : karanas[karanaIdx - 57 + 8]) : karanas[0];
    const bsInfo = toBikramSambat(date);
    if (!bsInfo) return { error: "Date out of range" };
    const lunarMonthInfo = getLunarMonthNameWithAdhik(ahar);
    const events = getEventsForDate(date, bsInfo.year, bsInfo.monthIndex, bsInfo.day);
    const lunarMonthDisplayName = lunarMonthInfo.isAdhika ? "अधिक " + lunarMonthInfo.monthName : lunarMonthInfo.monthName;
    const sunriseSunset = getSunriseSunset(date, lat, lon, tz);
    const isComputed = bsInfo.isComputed;
    const adhikaMasa = calculateAdhikaMasa(ahar);

    // Format the Gregorian date in a QML-like way (e.g., "Friday, August 15, 2025")
    const gregorianOptions: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        timeZone: 'UTC' 
    };
    const gregorianDateFormatted = date.toLocaleDateString('en-US', gregorianOptions);

    const result = {
        gregorianDate: gregorianDateFormatted,
        bikramSambat: toDevanagari(bsInfo.year) + " " + bsInfo.monthName + " " + toDevanagari(bsInfo.day),
        bsYear: bsInfo.year,
        bsMonthIndex: bsInfo.monthIndex,
        bsDay: bsInfo.day,
        weekday: weekdays[date.getUTCDay()],
        sunrise: sunriseSunset.sunrise,
        sunset: sunriseSunset.sunset,
        tithi: tithiName,
        paksha: paksha,
        lunarMonth: lunarMonthDisplayName,
        nakshatra: nakshatras[Math.floor(moonLong / (360 / 27))],
        yoga: yogas[Math.floor(zero360(sunLong + moonLong) / (360 / 27))],
        karana: karanaName,
        sunRashi: rashis[Math.floor(sunLong / 30)],
        moonRashi: rashis[Math.floor(moonLong / 30)],
        events: events,
        isComputed: isComputed,
        adhikaMasa: adhikaMasa
    };
    calculationCache[cacheKey] = result;
    return result;
}

function getTslong(ahar: number): number {
    let t1 = (YugaRotation.sun * ahar / YugaCivilDays);
    t1 -= Math.floor(t1);
    const mslong = 360 * t1;
    const x1 = mslong - PlanetApogee.sun;
    const y1 = PlanetCircumm.sun / 360;
    const y2 = sinDeg(x1);
    const y3 = y1 * y2;
    const x2 = arcsinDeg(y3);
    const x3 = mslong - x2;
    return x3;
}

function todaySauraMasaFirstP(ahar: number): boolean {
    const tslong_today = getTslong(ahar);
    const tslong_tomorrow = getTslong(ahar + 1);
    const tslong_today_mod = tslong_today - Math.floor(tslong_today / 30) * 30;
    const tslong_tomorrow_mod = tslong_tomorrow - Math.floor(tslong_tomorrow / 30) * 30;
    return (25 < tslong_today_mod && tslong_tomorrow_mod < 5);
}

function getSauraMasaDay(ahar: number): { m: number; d: number } {
    try {
        if (todaySauraMasaFirstP(ahar)) {
            const day = 1;
            const tslong_tomorrow = getTslong(ahar + 1);
            let month = Math.floor(tslong_tomorrow / 30) % 12;
            month = (month + 12) % 12;
            return { m: month, d: day };
        } else {
            const yesterday = getSauraMasaDay(ahar - 1);
            return { m: yesterday.m, d: yesterday.d + 1 };
        }
    } catch (e) {
        return { m: 0, d: 1 };
    }
}

function fromGregorianAstronomical(gYear: number, gMonth: number, gDay: number): BikramDateObj {
    const julian = toJulianDay(gYear, gMonth - 1, gDay);
    const ahar = julian - KaliEpoch;
    const sauraMasaResult = getSauraMasaDay(ahar);
    const saura_masa_num = sauraMasaResult.m;
    const saura_masa_day = sauraMasaResult.d;
    const YearKali = Math.floor(ahar * YugaRotation.sun / YugaCivilDays);
    const YearSaka = YearKali - 3179;
    const nepalimonth = saura_masa_num % 12;
    const year = YearSaka + 135 + Math.floor((saura_masa_num - nepalimonth) / 12);
    const month = (saura_masa_num + 12) % 12 + 1;
    return {
        year: year,
        monthIndex: month - 1,
        day: saura_masa_day,
        monthName: solarMonths[month - 1]
    };
}

function calculateAdhikaMasa(ahar: number): string {
    let lunarMonthStart = findNewMoon(ahar);
    if (lunarMonthStart > ahar) {
        lunarMonthStart = findNewMoon(lunarMonthStart - 29.530588853);
    }
    const lunarMonthEnd = findNewMoon(lunarMonthStart + 29.530588853);
    const sunLongStart = trueLongitudeSun(lunarMonthStart);
    const sunLongEnd = trueLongitudeSun(lunarMonthEnd);
    const startSign = Math.floor(sunLongStart / 30);
    const endSign = Math.floor(sunLongEnd / 30);
    let signCrossings = 0;
    let currentSign = startSign;
    for (let i = 1; i <= 29; i++) {
        const checkAhar = lunarMonthStart + i;
        const checkSunLong = trueLongitudeSun(checkAhar);
        let checkSign = Math.floor(checkSunLong / 30);
        if (checkSign < currentSign) {
            checkSign += 12;
        }
        if (checkSign > currentSign) {
            signCrossings += (checkSign - currentSign);
            currentSign = checkSign % 12;
        }
    }
    let endSignAdjusted = endSign;
    if (endSignAdjusted < currentSign) {
        endSignAdjusted += 12;
    }
    if (endSignAdjusted > currentSign) {
        signCrossings += (endSignAdjusted - currentSign);
    }
    if (signCrossings === 0) {
        return "अधिक " + solarMonths[startSign];
    }
    if (signCrossings >= 2) {
        const skippedSign = (startSign + 1) % 12;
        return "क्षय " + solarMonths[skippedSign];
    }
    return "छैन";
}

function getLunarMonthNameWithAdhik(ahar: number): { monthName: string; isAdhika: boolean } {
    let lunarMonthStart = findNewMoon(ahar);
    if (lunarMonthStart > ahar) {
        lunarMonthStart = findNewMoon(lunarMonthStart - 29.53);
    }
    const purnima = findPurnima(lunarMonthStart + 14.77);
    const sunLongPurnima = trueLongitudeSun(purnima);
    const purnimaSign = Math.floor(sunLongPurnima / 30);
    let signCrossings = 0;
    let currentSign = Math.floor(trueLongitudeSun(lunarMonthStart) / 30);
    for (let i = 1; i <= 29; i++) {
        const checkAhar = lunarMonthStart + i;
        const checkSunLong = trueLongitudeSun(checkAhar);
        let checkSign = Math.floor(checkSunLong / 30);
        if (checkSign < currentSign) {
            checkSign += 12;
        }
        if (checkSign > currentSign) {
            signCrossings += (checkSign - currentSign);
            currentSign = checkSign % 12;
        }
    }
    const isAdhika = (signCrossings === 0);
    const result = {
        monthName: solarMonths[purnimaSign],
        isAdhika: isAdhika
    };
    return result;
}

export function toDevanagari(n: number | string): string { 
    try { 
        return n.toString().replace(/[0-9]/g, d => '०१२३४५६७८९'[parseInt(d)]); 
    } catch(e){ 
        return n.toString(); 
    } 
}

export function fromDevanagari(s: string): string {
    try { 
        return s.toString().replace(/[०-९]/g, d => '०१२३४५६७८९'.indexOf(d).toString()); 
    } catch (e) { 
        return s; 
    }
}