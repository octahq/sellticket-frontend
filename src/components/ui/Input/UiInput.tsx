/**
 * This is the input component for inputs used accross the application
 * Props:
 * -label: This is the label for the input field
 * -type: what type of input
 * -name: the name of the input field is used for handling state change in the parent form-data where it belongs. they must be identical to the field in the parent form-data
 * -value: the value for the input (comes from the form data)
 * -placeholder: the placeholder for the input field
 * -variant: variant for the input field if there be any need in the future
 * -rounded: the amount of border radius to be added to the input field
 * -size: dictates the height of the input field
 * -error: validation error for the input field
 * -disabled: boolean value that diables or enable the input field
 * -onChange: this is s function that handles state change of the input in the parents form data. it receives the name and value prop of the input to achieve this
 * -isGradient: boolean value that dictates if the input has a gradient border or not. Once true the variant selected must be a gradient type for styles to work properly.
 * -prefixNode: this is used to prepend a node to the input e.g icons
 * -suffixNode: this is used to append a node to the input e.g icons
 */

'use client';

import { useMemo } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';


import UiField from '../Field/UiField';

export type InputType = 'text' | 'number' | 'time' | 'radio' | 'email' | 'phone';

const variantClasses = {
  default: {
    parent: '',
    child: 'bg-neutral-200 border border-stroke-300',
  },
  secondary: {
    parent: '',
    child: 'bg-white border border-stroke-100',
  },
  'gradient-primary': {
    parent: 'bg-input-gradient-primary shadow-input-shadow',
    child: 'bg-white',
  },
  'gradient-secondary': {
    parent: 'bg-input-gradient-secondary',
    child: 'bg-neutral-100',
  },
};

const sizeVariants = {
  lg: 'h-[52px]',
  md: 'h-11',
  xs: 'h-[34px]',
};

const roundedVariant = {
  lg: 'rounded-xl',
  md: 'rounded',
};

interface Props {
  label?: React.ReactNode;
  type?: InputType;
  value: string | null | number;
  placeholder?: string;
  variant?: keyof typeof variantClasses;
  rounded?: keyof typeof roundedVariant;
  size?: keyof typeof sizeVariants;
  isGradient?: boolean;
  /** The name property should always be the same as the model value. example if the input belongs to
   * formData.confirm_password, the name prop should be confirm_password.
   */
  name: string;
  error?: React.ReactNode;
  disabled?: boolean;
  onChange: (event: { name: string; value: string | null }) => void;
  prefixNode?: React.ReactNode;
  suffixNode?: React.ReactNode;
}

export default function UiInput({
  type = 'text',
  value,
  label,
  variant = 'default',
  isGradient = false,
  rounded = 'md',
  size = 'md',
  name,
  placeholder,
  disabled,
  error,
  onChange,
  prefixNode,
  suffixNode,
}: Props) {
  function sendValue(e: React.ChangeEvent<HTMLInputElement>) {
    onChange({ name: e.target.name, value: e.target.value });
  }

  function handlePhoneChange(value: string | undefined) {
    if (disabled) return;

    onChange({ name, value: value! });
  }

  const validatedPlaceholder = useMemo(() => {
    return error
      ? 'placeholder:text-danger-500'
      : 'placeholder:text-stroke-500';
  }, [error]);

  return (
    <UiField label={label} error={error}>
      <div
        className={`w-full box-border rounded-[10px] transition-all duration-300 focus-within:bg-input-gradient-transparent focus-within:bg-secondary-600
          ${isGradient ? 'p-[1.5px]' : 'p-0'} 
          ${variantClasses[variant].parent} 
          ${sizeVariants[size]} 
          ${error && '!bg-input-gradient-error'} `}
      >
        <div
          className={`relative w-full h-full flex gap-[5px] px-4 rounded-[9px] transition-all duration-200 focus-within:border-secondary-600 ${variantClasses[variant].child}`}
        >
          {prefixNode && (
            <div className="text-sm flex items-center">{prefixNode}</div>
          )}

          {type === 'phone' ? (
            <div>
              <PhoneInput
                defaultCountry="NG"
                className="phone-input flex-1"
                placeholder={placeholder}
                disabled={disabled}
                value={`${value || ''}`}
                onChange={handlePhoneChange}
              />
            </div>
          ) : (
            <input
              className={`w-full flex justify-center items-center text-base md:text-sm font-medium placeholder:text-sm  bg-transparent outline-none ${validatedPlaceholder}`}
              placeholder={placeholder}
              type={type}
              value={value || ''}
              name={name}
              id={name}
              disabled={disabled}
              onChange={sendValue}
            />
          )}

          {suffixNode && (
            <div className="pl-2 pr-4 text-gray-500 text-sm flex items-center">
              {suffixNode}
            </div>
          )}
        </div>
      </div>
    </UiField>
  );
}
