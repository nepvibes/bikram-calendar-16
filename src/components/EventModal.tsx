
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from './ui/button';
import { format } from 'date-fns';
import { nepaliMonthsEn, nepaliMonthsNp, getNepaliDigits } from '../utils/bikramConverter';
import { EventModalProps } from '../types/events';
import { motion, AnimatePresence } from 'framer-motion';

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  eventData,
  useNepaliLanguage
}) => {
  if (!eventData) return null;
  
  // Animation state
  const [isAnimating, setIsAnimating] = useState(true);

  const bikramDateFormatted = useNepaliLanguage
    ? `${getNepaliDigits(eventData.day)} ${nepaliMonthsNp[eventData.month - 1]} ${getNepaliDigits(eventData.year)}`
    : `${eventData.day} ${nepaliMonthsEn[eventData.month - 1]} ${eventData.year}`;

  const gregorianDateFormatted = format(eventData.englishDate, 'PPP');
  const weekday = format(eventData.englishDate, 'EEEE');
  
  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 300); // Wait for exit animation
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={() => handleClose()}>
      <DialogContent className="sm:max-w-md overflow-hidden bg-white dark:bg-gray-800 shadow-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isAnimating ? 1 : 0, y: isAnimating ? 0 : 20 }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-br from-blue-800 to-blue-600 dark:from-blue-900 dark:to-blue-800 -mx-6 -mt-6 p-4 text-white"
        >
          <DialogTitle className="text-center">
            <motion.span
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="inline-block text-2xl font-bold font-nepali"
            >
              {useNepaliLanguage ? bikramDateFormatted : bikramDateFormatted}
              <span className="ml-2 text-lg opacity-80">{useNepaliLanguage ? "बि.सं." : "BS"}</span>
            </motion.span>
          </DialogTitle>
          <DialogDescription className="text-center font-medium text-white/80">
            {gregorianDateFormatted} ({weekday})
          </DialogDescription>
        </motion.div>
        
        <div className="space-y-4 py-4">
          <motion.div 
            className="flex flex-col space-y-4 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <div className="bg-orange-50 dark:bg-orange-950/30 p-3 rounded-lg">
              <div className="text-lg font-semibold text-orange-700 dark:text-orange-400">
                {eventData.tithiPaksha}, {eventData.tithiName}
              </div>
            </div>
            
            {eventData.eventText && (
              <motion.div 
                className="mt-4 pt-4 border-t"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <div className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-2">
                  {useNepaliLanguage ? "विशेष दिन" : "Special Day"}
                </div>
                <div className="text-base mt-1 font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 p-3 rounded-lg">
                  {eventData.eventText}
                </div>
                {eventData.eventDetail && (
                  <div className="text-sm mt-3 text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
                    {eventData.eventDetail}
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
        
        <DialogFooter>
          <motion.div 
            className="w-full"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button onClick={handleClose} className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-700 shadow-md">
              {useNepaliLanguage ? "बन्द गर्नुहोस्" : "Close"}
            </Button>
          </motion.div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;
