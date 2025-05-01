
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
      className="text-sm bg-nepali-blue/10 border-nepali-blue hover:bg-nepali-blue hover:text-white"
    >
      {useNepaliLanguage ? 'English' : 'नेपाली'}
    </Button>
  );
};

export default LanguageToggle;
