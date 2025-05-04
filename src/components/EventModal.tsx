import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Button } from './ui/button';
import { format } from 'date-fns';
import { nepaliMonthsEn, nepaliMonthsNp, getNepaliDigits } from '../utils/bikramConverter';
import { EventModalProps } from '../types/events';
const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  eventData,
  useNepaliLanguage
}) => {
  if (!eventData) return null;
  const bikramDateFormatted = useNepaliLanguage ? `${getNepaliDigits(eventData.day)} ${nepaliMonthsNp[eventData.month - 1]} ${getNepaliDigits(eventData.year)}` : `${eventData.day} ${nepaliMonthsEn[eventData.month - 1]} ${eventData.year}`;
  const gregorianDateFormatted = format(eventData.englishDate, 'PPP');
  const weekday = format(eventData.englishDate, 'EEEE');
  return <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md mx-0 rounded-xl bg-[#e1e1f4]">
        <DialogHeader>
          <DialogTitle className="text-center text-blue-500">
            {useNepaliLanguage ? "दिन विवरण" : "Day Details"}
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            {useNepaliLanguage ? <span className="font-bold text-lg">{bikramDateFormatted} बि.सं.</span> : <span className="font-bold text-lg">{bikramDateFormatted} BS</span>}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex flex-col space-y-2 text-center">
            <div className="text-sm font-semibold">
              {eventData.tithiPaksha}, {eventData.tithiName}
            </div>
            
            <div className="text-xs text-gray-500">
              {gregorianDateFormatted} ({weekday})
            </div>
            
            {eventData.eventText && <div className="mt-4 pt-4 border-t">
                <div className="font-bold">
                  {useNepaliLanguage ? "विशेष दिन" : "Special Day"}
                </div>
                <div className="text-sm mt-1 font-medium text-red-600">
                  {eventData.eventText}
                </div>
                {eventData.eventDetail && <div className="text-xs mt-2 text-gray-600">
                    {eventData.eventDetail}
                  </div>}
              </div>}
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={onClose} className="w-full text-sky-800 font-bold rounded-xl bg-violet-400 hover:bg-violet-300 mx-0 px-0 py-0 text-base">
            {useNepaliLanguage ? "बन्द गर्नुहोस्" : "Close"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>;
};
export default EventModal;