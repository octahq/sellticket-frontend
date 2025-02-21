import UiIcon from "../Icon/UiIcon";
import { useMemo } from "react";

const variantClases = {
  primary: {
    border: 'outline outline-2 outline-teal-500',
    check: 'border border-teal-200 bg-teal-400',
  },
  secondary: {
    border: 'outline outline-2 outline-[#2775CA]',
    check: 'border border-[#EAF4FF] bg-[#2775CA]',
  },
};

interface Props {
  formValue: string;
  value: string;
  variant?: keyof typeof variantClases
  children: React.ReactNode
  onChange: (value: string) => void
}

export default function UiOptionCard({ children, formValue, value, variant='primary', onChange }: Props) {
  const isSelected = useMemo(() => formValue === value, [formValue, value]);

  function handleClick() {
    onChange(value)
  }

  return (
    <button
      onClick={handleClick}
      className={`outline outline-1 outline-[#E9EAEB] hover:bg-gray-50 w-full rounded-xl p-4 flex gap-1 items-start transition-all duration-150 ease-in ${isSelected && variantClases[variant].border}`}
    >
      <div className="flex-1 text-left">{children}</div>
      <span
        className={`min-w-4 min-h-4 rounded-full border border-[#D5D7DA] flex justify-center items-center ${isSelected && variantClases[variant].check}`}
      >
        {isSelected && <UiIcon icon="Check" size="11" />}
      </span>
    </button>
  );
}
