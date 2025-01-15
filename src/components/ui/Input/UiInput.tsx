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
 * -prefixNode: this is used to prepend a node to the input e.g icons
 * -suffixNode: this is used to append a node to the input e.g icons
 */

'use client'

import { useMemo, useState } from 'react';

import UiField from '../Field/UiField';

export type InputType = 'text';

const variantClasses = {
  default: 'bg-transparent text-gray-1000 placeholder:text-typography-disabled',
  primary:
    'bg-primary-800 text-secondary-200 placeholder:text-[#4F9B80] border-none',
};

const sizeVariants = {
  lg: 'h-[52px]',
  md: 'h-12',
};

const roundedVariant = {
  lg: 'rounded-xl',
  md: 'rounded',
};

interface Props {
  label?: string;
  type?: InputType;
  value: string | null | number;
  placeholder?: string;
  variant?: keyof typeof variantClasses;
  rounded?: keyof typeof roundedVariant;
  size?: keyof typeof sizeVariants;
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
  rounded = 'md',
  size = 'lg',
  name,
  placeholder,
  disabled,
  error,
  onChange,
  prefixNode,
  suffixNode,
}: Props) {
  const [inputType] = useState(type);

  function sendValue(e: React.ChangeEvent<HTMLInputElement>) {
    onChange({ name: e.target.name, value: e.target.value });
  }

  const validatedBorder = useMemo(() => {
    return error ? 'bg-input-gradient-error' : `bg-input-gradient`;
  }, [error]);

  const validatedPlaceholder = useMemo(()=> {
    return error ? 'placeholder:text-danger-500' : 'placeholder:text-stroke-500'
  }, [error])

  return (
    <UiField label={label} error={error}>
      <div className={`h-11 w-full box-border p-[1.5px] rounded-[10px] ${validatedBorder}`}>
        <div
          className='relative w-full h-full  bg-neutral-100 flex gap-[5px] px-4 rounded-[9px]'
        >
          {prefixNode && (
            <div className="text-sm flex items-center">
              {prefixNode}
            </div>
          )}

          <input
            className={`w-full flex justify-center items-center text-base md:text-sm font-medium placeholder:text-sm  bg-transparent outline-none ${validatedPlaceholder}`}
            placeholder={placeholder}
            type={inputType}
            value={value || ''}
            name={name}
            id={name}
            disabled={disabled}
            onChange={sendValue}
          />
          
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
