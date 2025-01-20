/**
 * Button component 
 * This is the component used for most buttons accross the application
 * Props:
 * -children: This is the node that is meant to be rendered by the component.
 * -variant: This determines what variant of the button is to be rendered.
 * -block: A boolean value that determines if the button should take the full width of it's contsiner or not
 * -disabled: Boolean value to disable or enable the button
 * -loading: Boolean value that conditionally renders the loading state or the children node
 * -roundedVariant: This determines the amount of border radius on the button
 * -size: Determines the height and padding of the buttons.
 * -type: Determines the button type
 * -onClick: This is the function thet runs when the button is clicked
 */

import { MouseEventHandler } from 'react';

const variantClasses = {
  primary: 'bg-secondary-gradient text-white hover:border-red-300',
  tertiary: 'bg-secondary-700 text-white'
};

const sizeClasses = {
  lg: 'h-[46px]  text-base px-6',
  md: 'h-10 text-sm px-8',
  sm: 'h-8 text-xs px-[9px]',
};

const radiusClasses = {
  lg: 'rounded-[10px]',
  md: 'rounded-md',
  sm: 'rounded-[4px]'
};

interface Props {
  children: React.ReactNode;
  variant?: keyof typeof variantClasses;
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
  roundedVariant?: keyof typeof radiusClasses;
  size?: keyof typeof sizeClasses;
  type?: 'button' | 'submit';
  // If there is a need to add extra classes the to improve flexibility.This is a hack.
  injectedClasses?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function UiButton({
  children,
  variant = 'primary',
  disabled,
  loading,
  size = 'lg',
  roundedVariant = 'lg',
  injectedClasses = '',
  type = 'submit',
  block,
  onClick,
}: Props) {
  return (
    <button
      className={`flex items-center justify-center whitespace-nowrap  ${
      block ? 'w-full' : ''
    } ${variantClasses[variant]} ${sizeClasses[size]}  ${
        disabled && 'opacity-50 cursor-not-allowed'
      } ${radiusClasses[roundedVariant]}  ${injectedClasses}`}
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
    >
      {loading ? <p>loading...</p> : children}
    </button>
  );
}

