'use client'

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';


const sizeClasses = {
  sm: 'h-[34px]',
  md: 'h-[40px]',
  lg: 'h-[43px]'
};

const variantClasses = { 
  default: 'bg-neutral-200 border border-stroke-300',
  shadow: 'bg-white border-[0.5px] border-stroke-100 shadow-input-shadow',
};

type Variant = 'default' | 'shadow';
type Size = keyof typeof sizeClasses;

export type Option = {
  label: React.ReactNode;
  value: string;
};

interface Props {
  label?: string;
  value: string;
  placeholder?: string;
  variant?: Variant;
  size?: Size;
  options: Option[];
  name: string;
  error?: React.ReactNode;
  onChange: (event: { name: string; value: string }) => void;
}

export default function CustomSelect({ name, onChange, value, error, label, variant = 'default', options,  placeholder, size ='md' }: Props) {
  function onSelectOption(value: string) {
    onChange({ name, value });
  }
  return (
    <Select name={name} onValueChange={onSelectOption}>
      <SelectTrigger
        style={{ '--trigger-width': '100%' } as React.CSSProperties}
        className={`rounded-[10px] outline-none ring-0 border-0 focus-visible:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 w-full ${variantClasses[variant]} ${sizeClasses[size]}`}
      >
        <SelectValue
          className="w-full"
          placeholder={
            <div
              className={`${variant === 'default' ? 'text-[#CBCBCB]' : 'text-[#ADADAD]'} `}
            >
              {placeholder || 'Select an option'}
            </div>
          }
        />
      </SelectTrigger>
      <SelectContent
        style={{ width: 'var(--radix-select-trigger-width)' }}
        className="bg-white border border-lines-100 shadow-none p-2 roounded-[10px]"
      >
        {options.map((option) => (
          <SelectItem
            className="px-3 py-[6px] rounded-[5px] hover:bg-lines-100 transition-colors duration-150 ease-in"
            key={option.value}
            value={option.value}
          >
            <div>{option.label}</div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
