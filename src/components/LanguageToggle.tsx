
import React from 'react';
import { Button } from './ui/button';

interface LanguageToggleProps {
  useNepaliLanguage: boolean;
  onToggle: () => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ useNepaliLanguage, onToggle }) => {
  return (
    <Button 
      onClick={onToggle} 
      variant="outline"
      className="text-xs sm:text-sm bg-nepali-blue/10 border-nepali-blue hover:bg-nepali-blue hover:text-white h-8 sm:h-10 py-0 px-2 sm:px-3"
    >
      {useNepaliLanguage ? 'English' : 'नेपाली'}
    </Button>
  );
};

export default LanguageToggle;
