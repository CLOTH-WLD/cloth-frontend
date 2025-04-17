
import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '../ui/input';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
  autoFocus?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onClear,
  placeholder = "Search",
  autoFocus = false,
}) => {
  return (
    <div className="flex-1 relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <Input 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-10 h-10 w-full border-none bg-cloth-offwhite focus-visible:ring-0 focus-visible:ring-offset-0 pr-10"
        autoFocus={autoFocus}
      />
      {value && (
        <button 
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
        >
          <X className="h-4 w-4 text-gray-400" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;

