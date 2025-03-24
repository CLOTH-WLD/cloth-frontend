
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { X } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface FilterSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const FilterSheet: React.FC<FilterSheetProps> & {
  Checkbox: typeof FilterCheckbox;
  PriceRange: typeof PriceRangeFilter;
  RadioGroup: typeof SortRadioGroup;
} = ({ open, onClose, title, children }) => {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[80vh] px-0 overflow-y-auto rounded-t-xl">
        <SheetHeader className="px-4 sticky top-0 bg-white z-10 border-b pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle>{title}</SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>
        {children}
        <div className="sticky bottom-0 p-4 bg-white border-t mt-auto">
          <SheetClose asChild>
            <Button className="w-full" onClick={onClose}>
              Apply
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

interface FilterCheckboxProps {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
}

const FilterCheckbox: React.FC<FilterCheckboxProps> = ({ 
  id, 
  checked, 
  onCheckedChange, 
  label 
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox 
        id={id} 
        checked={checked} 
        onCheckedChange={onCheckedChange} 
      />
      <label 
        htmlFor={id}
        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
};

interface PriceRangeFilterProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  min,
  max,
  value,
  onChange
}) => {
  return (
    <div className="px-2">
      <Slider
        defaultValue={[value[0], value[1]]}
        value={[value[0], value[1]]}
        max={max}
        min={min}
        step={1}
        onValueChange={(newValue) => onChange([newValue[0], newValue[1]])}
        className="mb-4"
      />
      <div className="flex justify-between text-sm">
        <span>${value[0]}</span>
        <span>${value[1]}</span>
      </div>
    </div>
  );
};

interface SortRadioGroupProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

const SortRadioGroup: React.FC<SortRadioGroupProps> = ({
  value,
  onChange,
  options
}) => {
  return (
    <RadioGroup value={value} onValueChange={onChange} className="space-y-3">
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <RadioGroupItem value={option.value} id={option.value} />
          <Label htmlFor={option.value}>{option.label}</Label>
        </div>
      ))}
    </RadioGroup>
  );
};

FilterSheet.Checkbox = FilterCheckbox;
FilterSheet.PriceRange = PriceRangeFilter;
FilterSheet.RadioGroup = SortRadioGroup;

export default FilterSheet;
