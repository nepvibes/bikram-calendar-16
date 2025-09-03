/**
 * Bikram Calculator - Hindu Astrological Calendar with panchanga
 * Integrated Surya Siddhanta calculations for accurate tithi, nakshatra, and event detection
 */

// --- Integrated Pre-Calculated Data ---
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
    ],
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
    ],
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
    ],
    bikramFixedEvents: [
        { event: "भोटो जात्रा", date: "2082/02/18", detail: "रातो मच्छिन्द्रनाथ जात्राको समापन दिन।", category: "Jatra", holiday: true },
        { event: "तमु ल्होसार", date: "2082/09/15", detail: "गुरुङ समुदायको नयाँ वर्ष।", category: "Lhosar", holiday: true },
        { event: "सोनाम ल्होसार", date: "2082/10/05", detail: "तमाङ समुदायको नयाँ वर्ष।", category: "Lhosar", holiday: true },
        { event: "ग्याल्पो ल्होछार", date: "2082/11/06", detail: "शेर्पा समुदायको नयाँ वर्ष।", category: "Lhosar", holiday: true }
    ]
};

// Caching
var calculationCache = {};
export function clearCache() {
    calculationCache = {};
}

// Surya Siddhanta Constants
var YugaRotation = { 'star': 1582237828, 'sun': 4320000, 'moon': 57753336, 'mercury': 17937060, 'venus': 7022376, 'mars': 2296832, 'jupiter': 364220, 'saturn': 146568, 'Candrocca': 488203, 'Rahu': -232238 };
var YugaCivilDays = 1577917828;
var KaliEpoch = 588465.5;
var PlanetApogee = { 'sun': 77 + 17 / 60 };
var PlanetCircumm = { 'sun': 13 + 50 / 60, 'moon': 31 + 50 / 60 };
var rad = 180 / Math.PI;

// Panchanga Names
var tithiNamesList = ["प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पञ्चमी", "षष्ठी", "सप्तमी", "अष्टमी", "नवमी", "दशमी", "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", "पूर्णिमा", "अमावस्या"];
var nakshatras = ["अश्विनी", "भरणी", "कृत्तिका", "रोहिणी", "मृगशिरा", "आर्द्रा", "पुनर्वसु", "पुष्य", "अश्लेषा", "मघा", "पूर्व फाल्गुनी", "उत्तर फाल्गुनी", "हस्त", "चित्रा", "स्वाती", "विशाखा", "अनुराधा", "ज्येष्ठा", "मूल", "पूर्वाषाढा", "उत्तराषाढा", "श्रवण", "धनिष्ठा", "शतभिषा", "पूर्व भाद्रपद", "उत्तर भाद्रपद", "रेवती"];
var yogas = ["विष्कम्भ", "प्रीति", "आयुष्मान्", "सौभाग्य", "शोभन", "अतिगण्ड", "सुकर्म", "धृति", "शूल", "गण्ड", "वृद्धि", "ध्रुव", "व्याघात", "हर्षण", "वज्र", "सिद्धि", "व्यतिपात", "वरीयान्", "परिघ", "शिव", "सिद्ध", "साध्य", "शुभ", "शुक्ल", "ब्रह्म", "इन्द्र", "वैधृति"];
var karanas = ["किंस्तुघ्न", "बव", "बालव", "कौलव", "तैतिल", "गर", "वणिज", "विष्टि", "शकुनि", "चतुष्पाद", "नाग"];
var rashis = ["मेष", "वृषभ", "मिथुन", "कर्क", "सिंह", "कन्या", "तुला", "वृश्चिक", "धनु", "मकर", "कुम्भ", "मीन"];
var solarMonths = ["वैशाख", "ज्येष्ठ", "आषाढ", "श्रावण", "भाद्रपद", "आश्विन", "कार्तिक", "मार्गशीर्ष", "पौष", "माघ", "फाल्गुन", "चैत्र"];
var weekdays = ["आइतबार", "सोमबार", "मङ्गलबार", "बुधबार", "बिहीबार", "शुक्रबार", "शनिबार"];
var nepaliGregorianMonths = ["जनवरी", "फेब्रुअरी", "मार्च", "अप्रिल", "मे", "जून", "जुलाई", "अगस्ट", "सेप्टेम्बर", "अक्टोबर", "नोभेम्बर", "डिसेम्बर"];

// Helper Functions
function zero360(x) { return x - Math.floor(x / 360) * 360; }
function sinDeg(deg) { return Math.sin(deg / rad); }
function cosDeg(deg) { return Math.cos(deg / rad); }
function arcsinDeg(x) { return Math.asin(x) * rad; }

export function toDevanagari(n){ try { return n.toString().replace(/[0-9]/g, d => '०१२३४५६७८९'[d]); } catch(e){ return n; } }
export function fromDevanagari(s) {
    try { return s.toString().replace(/[०-९]/g, d => '०१२३४५६७८९'.indexOf(d)); } catch (e) { return s; }
}

function formatMonthDay(month, day) {
    return (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;
}

function toJulianDay(year, month, day) {
    var m = month + 1;
    var y = year;
    if (m <= 2) { y--; m += 12; }
    var a = Math.floor(y / 100);
    var b = 2 - a + Math.floor(a / 4);
    return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5;
}

function fromJulianDay(jd) {
    jd += 0.5;
    var z = Math.floor(jd);
    var f = jd - z;
    var a;
    if (z < 2299161) { a = z; }
    else {
        var alpha = Math.floor((z - 1867216.25) / 36524.25);
        a = z + 1 + alpha - Math.floor(alpha / 4);
    }
    var b = a + 1524;
    var c = Math.floor((b - 122.1) / 365.25);
    var d = Math.floor(365.25 * c);
    var e = Math.floor((b - d) / 30.6001);
    var day = Math.floor(b - d - Math.floor(30.6001 * e) + f);
    var month = (e < 14) ? e - 1 : e - 13;
    var year = (month > 2) ? c - 4716 : c - 4715;
    return new Date(Date.UTC(year, month - 1, day));
}

// Core Surya Siddhanta Calculations
function meanLongitude(ahar, rotation) { return zero360(rotation * ahar * 360 / YugaCivilDays); }

function mandaEquation(meanLong, apogee, circ) { return arcsinDeg(circ / 360 * sinDeg(meanLong - apogee)); }

function trueLongitudeSun(ahar) {
    var meanLong = meanLongitude(ahar, YugaRotation.sun);
    var manda = mandaEquation(meanLong, PlanetApogee.sun, PlanetCircumm.sun);
    return zero360(meanLong - manda);
}

function trueLongitudeMoon(ahar) {
    var meanLong = meanLongitude(ahar, YugaRotation.moon);
    var apogee = meanLongitude(ahar, YugaRotation.Candrocca) + 90;
    var manda = mandaEquation(meanLong, apogee, PlanetCircumm.moon);
    return zero360(meanLong - manda);
}

function getTithi(sunLong, moonLong) { return zero360(moonLong - sunLong) / 12; }

function findNewMoon(ahar) {
    var getElongation = a => zero360(trueLongitudeMoon(a) - trueLongitudeSun(a));
    var guess = ahar;
    for (var i = 0; i < 10; i++) {
        var elong = getElongation(guess);
        if (elong < 5 || elong > 355) break;
        var correction = (elong < 180 ? -elong : 360 - elong) / 12.19;
        guess += correction;
    }
    var lo = guess - 2, hi = guess + 2;
    for (var j = 0; j < 30; j++) {
        var mid = (lo + hi) / 2;
        var em = getElongation(mid);
        if (em < 180) { hi = mid; } else { lo = mid; }
    }
    return (lo + hi) / 2;
}

function findPurnima(ahar) {
    var getElongation = function(a) { return zero360(trueLongitudeMoon(a) - trueLongitudeSun(a)); };
    var guess = ahar;
    for (var i = 0; i < 10; i++) {
        var elong = getElongation(guess);
        if (Math.abs(elong - 180) < 5) break;
        var correction = (180 - elong) / 12.19;
        guess += correction;
    }
    var lo = guess - 2, hi = guess + 2;
    for (var j = 0; j < 30; j++) {
        var mid = (lo + hi) / 2;
        var em = getElongation(mid);
        if (em < 180) { lo = mid; } else { hi = mid; }
    }
    return (lo + hi) / 2;
}

function getSunriseSunset(date, lat, lon, tz) {
    lat = lat || 27.7172; lon = lon || 85.3240; tz = tz || 5.75;
    var dayOfYear = Math.floor((date - new Date(date.getUTCFullYear(), 0, 0)) / 86400000);
    var B = (360 / 365) * (dayOfYear - 81) / rad;
    var eot = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);
    var lstm = 15 * tz;
    var tc = (4 * (lon - lstm) + eot) / 60;
    var declination = -23.45 * cosDeg(360 / 365 * (dayOfYear + 10));
    var hourAngleRad = Math.acos((sinDeg(-0.833) - sinDeg(lat) * sinDeg(declination)) / (cosDeg(lat) * cosDeg(declination)));
    var hourAngle = hourAngleRad * rad;
    var sunrise = 12 - hourAngle / 15 - tc;
    var sunset = 12 + hourAngle / 15 - tc;
    var formatTime = h => {
        if (!isFinite(h)) return "N/A";
        var hr = Math.floor(h);
        var min = Math.round((h - hr) * 60);
        if (min === 60) { hr++; min = 0; }
        return (hr < 10 ? '0' : '') + hr + ":" + (min < 10 ? '0' : '') + min;
    };
    return { sunrise: formatTime(sunrise), sunset: formatTime(sunset) };
}

function fromBikramSambat(bsYear, monthIndex, day) {
    if (bsYear >= Bsdata.BS_START_YEAR && bsYear <= Bsdata.BS_END_YEAR) {
        var daysOffset = 0;
        for (var y = Bsdata.BS_START_YEAR; y < bsYear; y++) {
            var yearData = Bsdata.NP_MONTHS_DATA[y - Bsdata.BS_START_YEAR];
            var totalDaysInYear = 0;
            for (var m = 0; m < 12; m++) {
                totalDaysInYear += yearData[m];
            }
            daysOffset += totalDaysInYear;
        }
        var targetYearData = Bsdata.NP_MONTHS_DATA[bsYear - Bsdata.BS_START_YEAR];
        for (let m = 0; m < monthIndex; m++) {
            daysOffset += targetYearData[m];
        }
        daysOffset += (day - 1);
        var resultDate = new Date(Bsdata.BS_START_DATE_AD.getTime());
        resultDate.setUTCDate(resultDate.getUTCDate() + daysOffset);
        return resultDate;
    } else {
        // Fallback for out-of-range years
        var YearSaka = bsYear - 135;
        var YearKali = YearSaka + 3179;
        var ahar = Math.floor((YearKali * YugaCivilDays) / YugaRotation.sun);
        var currentDay = getSauraMasaDay(ahar);
        while (currentDay.m !== monthIndex || currentDay.d !== day) {
            if (currentDay.m < monthIndex || (currentDay.m === monthIndex && currentDay.d < day)) {
                ahar += 1;
            } else {
                ahar -= 1;
            }
            currentDay = getSauraMasaDay(ahar);
        }
        var julian_date = ahar + KaliEpoch;
        return fromJulianDay(julian_date);
    }
}

function getBikramMonthInfo(bsYear, monthIndex) {
    if (bsYear >= Bsdata.BS_START_YEAR && bsYear <= Bsdata.BS_END_YEAR) {
        var firstDayAd = fromBikramSambat(bsYear, monthIndex, 1);
        if (!firstDayAd) return null;
        var monthData = Bsdata.NP_MONTHS_DATA[bsYear - Bsdata.BS_START_YEAR];
        return {
            totalDays: monthData[monthIndex],
            startDayOfWeek: firstDayAd.getUTCDay(),
            monthName: solarMonths[monthIndex],
            year: bsYear
        };
    } else {
        // Fallback for out-of-range years
        var first = fromBikramSambat(bsYear, monthIndex, 1);
        var nextMon = monthIndex === 11 ? 0 : monthIndex + 1;
        var nextYear = monthIndex === 11 ? bsYear + 1 : bsYear;
        var nextFirst = fromBikramSambat(nextYear, nextMon, 1);
        var jd1 = toJulianDay(first.getUTCFullYear(), first.getUTCMonth(), first.getUTCDate());
        var jd2 = toJulianDay(nextFirst.getUTCFullYear(), nextFirst.getUTCMonth(), nextFirst.getUTCDate());
        return {
            totalDays: Math.round(jd2 - jd1),
            startDayOfWeek: first.getUTCDay(),
            monthName: solarMonths[monthIndex],
            year: bsYear
        };
    }
}

function toBikramSambat(gregorianDate) {
    var isDataAvailable = false;
    if (Bsdata && Bsdata.BS_START_DATE_AD) {
        var targetUtcDate = new Date(Date.UTC(gregorianDate.getFullYear(), gregorianDate.getMonth(), gregorianDate.getDate()));
        var startDate = new Date(Date.UTC(Bsdata.BS_START_DATE_AD.getFullYear(), Bsdata.BS_START_DATE_AD.getMonth(), Bsdata.BS_START_DATE_AD.getDate()));
        if (targetUtcDate >= startDate && gregorianDate.getFullYear() <= (Bsdata.BS_END_YEAR - 56)) {
            isDataAvailable = true;
        }
    }

    if (isDataAvailable) {
        var daysOffset = Math.floor((targetUtcDate.getTime() - startDate.getTime()) / 86400000);
        for (var y = 0; y < Bsdata.NP_MONTHS_DATA.length; y++) {
            var currentBsYear = Bsdata.BS_START_YEAR + y;
            var yearData = Bsdata.NP_MONTHS_DATA[y];
            var daysInYear = 0;
            for (var m_idx = 0; m_idx < 12; m_idx++) { daysInYear += yearData[m_idx]; }
            if (daysOffset < daysInYear) {
                for (var m = 0; m < 12; m++) {
                    var daysInMonth = yearData[m];
                    if (daysOffset < daysInMonth) {
                        return { year: currentBsYear, monthIndex: m, day: daysOffset + 1, monthName: solarMonths[m], isComputed: false };
                    }
                    daysOffset -= daysInMonth;
                }
            }
            daysOffset -= daysInYear;
        }
    }
    // Fallback to astronomical calculation
    var result = fromGregorianAstronomical(
        gregorianDate.getUTCFullYear(),
        gregorianDate.getUTCMonth() + 1,
        gregorianDate.getUTCDate()
    );
    result.isComputed = true;
    return result;
}

function resolveTithiName(tithiDay, paksha) {
    if (paksha === "कृष्ण पक्ष" && tithiDay === 15) return tithiNamesList[15];
    if (paksha === "शुक्ल पक्ष" && tithiDay === 15) return tithiNamesList[14];
    return tithiNamesList[tithiDay - 1];
}

function _getPanchangaBasics(date) {
    var jd = toJulianDay(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    var ahar = jd - KaliEpoch + 0.25 + ((85.3240 / 15 - 5.75) / 24);
    var sunLong = trueLongitudeSun(ahar);
    var moonLong = trueLongitudeMoon(ahar);
    var tithiVal = getTithi(sunLong, moonLong);
    var tithiNum = Math.floor(tithiVal) + 1;
    var paksha = tithiNum <= 15 ? "शुक्ल पक्ष" : "कृष्ण पक्ष";
    var tithiDay = tithiNum > 15 ? tithiNum - 15 : tithiNum;
    var tithiName = resolveTithiName(tithiDay, paksha);
    var lunarMonthInfo = getLunarMonthNameWithAdhik(ahar);
    return {
        ahar: ahar,
        lunarMonthName: lunarMonthInfo.monthName,
        isAdhika: lunarMonthInfo.isAdhika,
        paksha: paksha,
        tithiName: tithiName,
        tithiDay: tithiDay
    };
}

export function getEventsForDate(date, bsYear, bsMonthIndex, bsDay) {
    var events = [];
    var gregorianYear = date.getUTCFullYear();
    var gregorianMonth = date.getUTCMonth() + 1;
    var gregorianDay = date.getUTCDate();
    var formattedGregorianDate = formatMonthDay(gregorianMonth, gregorianDay);
    var formattedBikramRecurringDate = formatMonthDay(bsMonthIndex + 1, bsDay);

    // Handle Gregorian events
    if (EventsData.gregorianEvents) {
        for (var i = 0; i < EventsData.gregorianEvents.length; i++) {
            var event = EventsData.gregorianEvents[i];
            if (event.startYear && gregorianYear < event.startYear) continue;
            if (event.endYear && gregorianYear > event.endYear) continue;
            if (event.date === formattedGregorianDate) {
                events.push({ name: event.event, detail: event.detail, category: event.category, holiday: event.holiday || false });
            }
        }
    }

    // Handle Bikram recurring events
    if (EventsData.bikramRecurringEvents) {
        for (var j = 0; j < EventsData.bikramRecurringEvents.length; j++) {
            let event = EventsData.bikramRecurringEvents[j];
            if (event.startYear && bsYear < event.startYear) continue;
            if (event.endYear && bsYear > event.endYear) continue;
            if (event.date === formattedBikramRecurringDate) {
                events.push({ name: event.event, detail: event.detail, category: event.category, holiday: event.holiday || false });
            }
        }
    }

    // Handle Bikram fixed events
    if (EventsData.bikramFixedEvents) {
        var formattedFixedDate = bsYear + "/" + formatMonthDay(bsMonthIndex + 1, bsDay);
        for(let i = 0; i < EventsData.bikramFixedEvents.length; i++) {
            let event = EventsData.bikramFixedEvents[i];
            if (event.date === formattedFixedDate) {
                events.push({ name: event.event, detail: event.detail, category: event.category, holiday: event.holiday || false });
            }
        }
    }

    // Handle Lunar events
    if (EventsData.lunarEvents) {
        var todayInfo = _getPanchangaBasics(date);
        if (todayInfo.isAdhika) {
            return events; // No lunar events in Adhika masa
        }

        var yesterday = new Date(date.getTime() - 86400000);
        var yesterdayInfo = _getPanchangaBasics(yesterday);

        var prevLunarMonthAhar = todayInfo.ahar - 29.53;
        var prevMonthStatus = calculateAdhikaMasa(prevLunarMonthAhar);
        var kshayaMonthName = null;
        if (prevMonthStatus.startsWith("क्षय")) {
            kshayaMonthName = prevMonthStatus.split(" ")[1];
        }

        for (var k = 0; k < EventsData.lunarEvents.length; k++) {
            var lunarEvent = EventsData.lunarEvents[k];
            if (lunarEvent.startYear && bsYear < lunarEvent.startYear) continue;
            if (lunarEvent.endYear && bsYear > lunarEvent.endYear) continue;

            var isEventForToday = (lunarEvent.lunarMonth === todayInfo.lunarMonthName &&
                                   lunarEvent.paksha === todayInfo.paksha &&
                                   lunarEvent.tithi === todayInfo.tithiName);

            var isEventFromKshayaMonth = (kshayaMonthName !== null &&
                                          lunarEvent.lunarMonth === kshayaMonthName &&
                                          lunarEvent.paksha === todayInfo.paksha &&
                                          lunarEvent.tithi === todayInfo.tithiName);

            if (isEventForToday || isEventFromKshayaMonth) {
                var isFirstDayOfTithi = !(yesterdayInfo.lunarMonthName === todayInfo.lunarMonthName &&
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

// Main Calculation Function
export function calculate(date, lat?, lon?, tz?) {
    var cacheKey = "panchanga_" + date.getTime();
    if (calculationCache[cacheKey]) return calculationCache[cacheKey];

    var jd = toJulianDay(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    var ahar = jd - KaliEpoch + 0.25 + (((lon || 85.3240) / 15 - (tz || 5.75)) / 24);
    var sunLong = trueLongitudeSun(ahar);
    var moonLong = trueLongitudeMoon(ahar);

    var tithiVal = getTithi(sunLong, moonLong);
    var tithiNum = Math.floor(tithiVal) + 1;
    var paksha = tithiNum <= 15 ? "शुक्ल पक्ष" : "कृष्ण पक्ष";
    var tithiDay = tithiNum > 15 ? tithiNum - 15 : tithiNum;
    var tithiName = resolveTithiName(tithiDay, paksha);

    var karanaIdx = Math.floor(2 * tithiVal);
    var karanaName = karanaIdx > 0 ? (karanaIdx < 57 ? karanas[(karanaIdx-1) % 7 + 1] : karanas[karanaIdx - 57 + 8]) : karanas[0];

    var bsInfo = toBikramSambat(date);
    if (!bsInfo) return { error: "Date out of range" };

    var lunarMonthInfo = getLunarMonthNameWithAdhik(ahar);
    var events = getEventsForDate(date, bsInfo.year, bsInfo.monthIndex, bsInfo.day);
    var lunarMonthDisplayName = lunarMonthInfo.isAdhika ? "अधिक " + lunarMonthInfo.monthName : lunarMonthInfo.monthName;
    var sunriseSunset = getSunriseSunset(date, lat, lon, tz);
    var isComputed = bsInfo.isComputed;

    var gregorianOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
    var gregorianDateFormatted = date.toLocaleDateString('en-US', gregorianOptions);

    var result = {
        gregorianDate: gregorianDateFormatted,
        bikramSambat: toDevanagari(bsInfo.year) + " " + bsInfo.monthName + " " + toDevanagari(bsInfo.day),
        bsYear: bsInfo.year,
        bsMonthIndex: bsInfo.monthIndex,
        bsDay: bsInfo.day,
        weekday: weekdays[date.getUTCDay()],
        sunrise: sunriseSunset.sunrise,
        sunset: sunriseSunset.sunset,
        tithi: tithiName,
        tithiDay: tithiDay,
        paksha: paksha,
        lunarMonth: lunarMonthDisplayName,
        nakshatra: nakshatras[Math.floor(moonLong / (360 / 27))],
        yoga: yogas[Math.floor(zero360(sunLong + moonLong) / (360 / 27))],
        karana: karanaName,
        sunRashi: rashis[Math.floor(sunLong / 30)],
        moonRashi: rashis[Math.floor(moonLong / 30)],
        events: events,
        isComputed: isComputed,
        adhikaMasa: lunarMonthInfo.isAdhika ? lunarMonthInfo.monthName : "छैन"
    };
    calculationCache[cacheKey] = result;
    return result;
}

function getTslong(ahar) {
    var t1 = (YugaRotation.sun * ahar / YugaCivilDays);
    t1 -= Math.floor(t1);
    var mslong = 360 * t1;
    var x1 = mslong - PlanetApogee.sun;
    var y1 = PlanetCircumm.sun / 360;
    var y2 = sinDeg(x1);
    var y3 = y1 * y2;
    var x2 = arcsinDeg(y3);
    var x3 = mslong - x2;
    return x3;
}

function todaySauraMasaFirstP(ahar) {
    var tslong_today = getTslong(ahar);
    var tslong_tomorrow = getTslong(ahar + 1);
    tslong_today -= Math.floor(tslong_today / 30) * 30;
    tslong_tomorrow -= Math.floor(tslong_tomorrow / 30) * 30;
    return (25 < tslong_today && tslong_tomorrow < 5);
}

function getSauraMasaDay(ahar) {
    try {
        if (todaySauraMasaFirstP(ahar)) {
            var day = 1;
            var tslong_tomorrow = getTslong(ahar + 1);
            var month = Math.floor(tslong_tomorrow / 30) % 12;
            month = (month + 12) % 12;
            return { m: month, d: day };
        } else {
            var yesterday = getSauraMasaDay(ahar - 1);
            return { m: yesterday.m, d: yesterday.d + 1 };
        }
    } catch (e) {
        return { m: 0, d: 1 };
    }
}

function fromGregorianAstronomical(gYear, gMonth, gDay) {
    var julian = toJulianDay(gYear, gMonth - 1, gDay);
    var ahar = julian - KaliEpoch;
    var sauraMasaResult = getSauraMasaDay(ahar);
    var saura_masa_num = sauraMasaResult.m;
    var saura_masa_day = sauraMasaResult.d;
    var YearKali = Math.floor(ahar * YugaRotation.sun / YugaCivilDays);
    var YearSaka = YearKali - 3179;
    var nepalimonth = saura_masa_num % 12;
    var year = YearSaka + 135 + Math.floor((saura_masa_num - nepalimonth) / 12);
    var month = (saura_masa_num + 12) % 12 + 1;
    return {
        year: year,
        monthIndex: month - 1,
        day: saura_masa_day,
        monthName: solarMonths[month - 1],
        isComputed: true
    };
}

function calculateAdhikaMasa(ahar) {
    var lunarMonthStart = findNewMoon(ahar);
    if (lunarMonthStart > ahar) {
        lunarMonthStart = findNewMoon(lunarMonthStart - 29.530588853);
    }
    var lunarMonthEnd = findNewMoon(lunarMonthStart + 29.530588853);
    var startSign = Math.floor(trueLongitudeSun(lunarMonthStart) / 30);
    var endSign = Math.floor(trueLongitudeSun(lunarMonthEnd) / 30);

    var signCrossings = 0;
    var currentSign = startSign;
    for (var i = 1; i <= 30; i++) {
        var checkAhar = lunarMonthStart + i;
        if (checkAhar >= lunarMonthEnd) break;
        var checkSunLong = trueLongitudeSun(checkAhar);
        var checkSign = Math.floor(checkSunLong / 30);
        if (checkSign < currentSign) { checkSign += 12; }
        if (checkSign > currentSign) {
            signCrossings += (checkSign - currentSign);
            currentSign = checkSign % 12;
        }
    }

    if (signCrossings === 0) {
        return "अधिक " + solarMonths[startSign % 12];
    }
    if (signCrossings >= 2) {
        var skippedSign = (startSign + 1) % 12;
        return "क्षय " + solarMonths[skippedSign];
    }
    return "छैन";
}

function getLunarMonthNameWithAdhik(ahar) {
    // A Purnimanta month ends on the full moon (Purnima). This function finds the Purnima that ENDS the current lunar month.
    var endingPurnima = findPurnima(ahar);
    if (endingPurnima < ahar) {
        // If the Purnima for the current phase has already passed (i.e., we are in Krishna Paksha),
        // we need to find the *next* Purnima, which marks the end of the current Purnimanta month.
        endingPurnima = findPurnima(ahar + 29.53);
    }

    // The month is named based on the Sun's zodiac sign (Rashi) at the moment of that ending Purnima.
    var sunLongAtPurnima = trueLongitudeSun(endingPurnima);
    var nameSign = Math.floor(sunLongAtPurnima / 30);
    var monthName = solarMonths[nameSign];

    // The Adhika/Kshaya status is determined by counting solar transits (Sankranti)
    // between two consecutive new moons (Amavasya) surrounding the current date.
    var adhikaStatus = calculateAdhikaMasa(ahar);
    var isAdhika = adhikaStatus.startsWith("अधिक");

    return {
        monthName: monthName,
        isAdhika: isAdhika
    };
}