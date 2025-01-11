import { MouseEventHandler } from 'react';

const variantClasses = {
  primary: 'bg-secondary-gradient text-white',
};

const sizeClasses = {
  lg: 'h-[46px]  text-md px-6',
  md: '',
  sm: '',
  text: '',
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
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
export default function UiButton({
  children,
  variant = 'primary',
  disabled,
  loading,
  size = 'lg',
  roundedVariant = 'lg',
  type = 'submit',
  block,
  onClick,
}: Props) {
  return (
    <button
      className={`flex gap-2 items-center justify-center whitespace-nowrap ${
        block ? 'w-full' : ''
      } ${variantClasses[variant]} ${sizeClasses[size]} ${
        disabled && 'opacity-50 cursor-not-allowed'
      } ${radiusClasses[roundedVariant]}`}
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
    >
      {loading ? <p>loading...</p> : children}
    </button>
  );
}
