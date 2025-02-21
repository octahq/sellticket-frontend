'use client';

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
  lg: 'h-[43px]',
};

const variantClasses = {
  default: 'bg-neutral-200 border border-stroke-300',
  shadow:
    'bg-white border-[0.5px] border-stroke-100 focus:border-stroke-100 shadow-input-shadow',
};

type Variant = 'default' | 'shadow';
type Size = keyof typeof sizeClasses;

export type Option = {
  label: React.ReactNode;
  value: string;
  func?: VoidFunction
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

export default function CustomSelect({
  name,
  onChange,
  value,
  error,
  label,
  variant = 'default',
  options,
  placeholder,
  size = 'md',
}: Props) {
  function onSelectOption(value: string) {
    const selectedOption = options.find((option) => option.value === value);
    onChange({ name, value });

    selectedOption?.func?.();
  }

  return (
    <Select name={name} onValueChange={onSelectOption}>
      <SelectTrigger
        style={{ '--trigger-width': '100%' } as React.CSSProperties}
        className={`select-trigger rounded-[10px] outline-none ring-0 border-0 focus:ring-0    focus-visible:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 w-full ${variantClasses[variant]} ${sizeClasses[size]}`}
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
        style={{
          width: 'var(--radix-select-trigger-width)',
        }}
        className="bg-white border border-lines-100 shadow-none p-0 roounded-[10px] box-border"
      >
        <div className="p-1 grid gap-2">
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className=" select-item px-3 py-[6px] !w-full rounded-[5px] data-[state=checked]:!bg-lines-100 hover:bg-lines-100 transition-colors duration-150 ease-in"
            >
              <div className="min-w-full  ">{option.label}</div>
            </SelectItem>
          ))}
        </div>
      </SelectContent>
    </Select>
  );
}
