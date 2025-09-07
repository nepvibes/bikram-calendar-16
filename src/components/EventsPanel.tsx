import React, { useState } from 'react';
import { ChevronUp, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { CalendarEvent } from '@/types/events';
import { convertToBikram, getNepaliDigits, nepaliMonthsEn, nepaliMonthsNp } from '@/utils/bikramConverter';
import { hasEventsWithLunar, getEventTextWithLunar, isHolidayWithLunar } from '@/utils/events/eventUtils';
import { getAllEventText, getAllEventDetails } from '@/utils/events/eventContent';

interface EventsPanelProps {
  currentDate: Date;
  useNepaliLanguage: boolean;
  events: {
    bikramFixedEvents: CalendarEvent[];
    gregorianEvents: CalendarEvent[];
    bikramRecurringEvents: CalendarEvent[];
  };
  onEventClick?: (date: Date) => void;
}

const EventsPanel: React.FC<EventsPanelProps> = ({
  currentDate,
  useNepaliLanguage,
  events,
  onEventClick
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getMonthEvents = () => {
    const monthEvents: Array<{
      date: Date;
      bikramDate: any;
      eventText: string;
      eventDetail: string;
    }> = [];

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const bikramDate = convertToBikram(cellDate);
      
      const dayHasEvents = hasEventsWithLunar(
        events.bikramFixedEvents,
        events.gregorianEvents,
        events.bikramRecurringEvents,
        bikramDate.year, bikramDate.month, bikramDate.day,
        cellDate.getFullYear(), cellDate.getMonth() + 1, day
      );

      if (dayHasEvents) {
        const eventText = getAllEventText(
          events.bikramFixedEvents,
          events.gregorianEvents,
          events.bikramRecurringEvents,
          bikramDate.year, bikramDate.month, bikramDate.day,
          cellDate.getFullYear(), cellDate.getMonth() + 1, day,
          useNepaliLanguage
        );

        const eventDetail = getAllEventDetails(
          events.bikramFixedEvents,
          events.gregorianEvents,
          events.bikramRecurringEvents,
          bikramDate.year, bikramDate.month, bikramDate.day,
          cellDate.getFullYear(), cellDate.getMonth() + 1, day,
          useNepaliLanguage
        );

        monthEvents.push({
          date: cellDate,
          bikramDate,
          eventText,
          eventDetail
        });
      }
    }

    return monthEvents;
  };

  const monthEvents = getMonthEvents();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthNamesNp = [
    'जनवरी', 'फेब्रुअरी', 'मार्च', 'अप्रिल', 'मे', 'जून',
    'जुलाई', 'अगस्ट', 'सेप्टेम्बर', 'अक्टोबर', 'नोभेम्बर', 'डिसेम्बर'
  ];

  const currentMonthName = useNepaliLanguage 
    ? monthNamesNp[currentDate.getMonth()]
    : monthNames[currentDate.getMonth()];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Slide up panel */}
      <div className={`bg-white border-t border-gray-200 shadow-lg transition-transform duration-300 ease-in-out
        ${isOpen ? 'transform translate-y-0' : 'transform translate-y-full'}`}>
        <div className="max-h-96 overflow-y-auto">
          <Card className="rounded-none border-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span className={useNepaliLanguage ? "font-laila" : ""}>
                    {useNepaliLanguage 
                      ? `${currentMonthName} ${getNepaliDigits(currentDate.getFullYear())} का घटनाहरू`
                      : `${currentMonthName} ${currentDate.getFullYear()} Events`
                    }
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsOpen(false)}
                  className="p-2"
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {monthEvents.length === 0 ? (
                <p className={`text-muted-foreground text-center py-4 ${useNepaliLanguage ? "font-laila" : ""}`}>
                  {useNepaliLanguage ? 'यस महिनामा कुनै घटना छैन।' : 'No events this month.'}
                </p>
              ) : (
                <div className="space-y-3">
                  {monthEvents.map((event, index) => (
                    <div 
                      key={index}
                      className="border border-border rounded-lg p-3 hover:bg-accent/50 cursor-pointer transition-colors"
                      onClick={() => onEventClick?.(event.date)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-semibold text-sm">
                          <span className={useNepaliLanguage ? "font-laila" : ""}>
                            {useNepaliLanguage 
                              ? `${getNepaliDigits(event.date.getDate())} ${currentMonthName}`
                              : `${currentMonthName} ${event.date.getDate()}`
                            }
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <span className={useNepaliLanguage ? "font-laila" : ""}>
                            {useNepaliLanguage 
                              ? `${getNepaliDigits(event.bikramDate.day)} ${nepaliMonthsNp[event.bikramDate.month - 1]} BS`
                              : `${event.bikramDate.day} ${nepaliMonthsEn[event.bikramDate.month - 1]} BS`
                            }
                          </span>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-primary mb-1">
                        <span className={useNepaliLanguage ? "font-laila" : ""}>
                          {event.eventText}
                        </span>
                      </div>
                      {event.eventDetail && (
                        <div className="text-xs text-muted-foreground">
                          <span className={useNepaliLanguage ? "font-laila" : ""}>
                            {event.eventDetail}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Toggle button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute bottom-4 right-4 rounded-full w-12 h-12 p-0 shadow-lg"
        variant="default"
      >
        <Calendar className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default EventsPanel;