
import React, { useEffect } from 'react';
import SearchModal from './SearchModal';

interface SearchDrawerProps {
  triggerRef: React.RefObject<HTMLInputElement>;
}

const SearchDrawer: React.FC<SearchDrawerProps> = ({ triggerRef }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  // Handle click on the trigger element
  useEffect(() => {
    const handleClick = () => {
      setIsOpen(true);
    };
    
    const currentTrigger = triggerRef.current;
    if (currentTrigger) {
      currentTrigger.addEventListener('click', handleClick);
    }
    
    return () => {
      if (currentTrigger) {
        currentTrigger.removeEventListener('click', handleClick);
      }
    };
  }, [triggerRef]);
  
  return (
    <SearchModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    />
  );
};

export default SearchDrawer;
