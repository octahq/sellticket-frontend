/**
 * This is a reuseable dropdown component built around shadcn's dropdown component
 * Props:
 * -options: this is the array of dropdown options to be displayed in the menu. It has the following props;        Label:which diplays the option along with any node to be displayed, func: the function to be ran when an option is clicked, disabled: a props that detemined if an option is disabled.
 * -trigger: This prop renders what component should trigger the dropdown menu. If not provided, a fallback is used
 * -itemId: this prop is important for performing id dependent actions (edit, delete, e.t.c) on data that renders this dropdown component
 */

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import UiIcon from '../Icon/UiIcon';

const triggerSizeClasses = {
  md: '24',
  lg: '32',
};

export type DropDownData = {
  label: React.ReactNode;
  func: (id?: string) => void;
  disabled?: boolean;
};

interface Props {
  options: DropDownData[];
  trigger?: React.ReactNode;
  triggerSize?: keyof typeof triggerSizeClasses;
  itemId?: string;
}

export default function UiDropDown({
  options,
  trigger,
  itemId,
  triggerSize = 'md',
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        {trigger || (
          <UiIcon
            icon="ThreeDotsVertical"
            size={triggerSizeClasses[triggerSize]}
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="right"
        align="start"
        className="bg-[#F0F0F0] rounded-[10px] border border-[#E4E4E4] p-1 shadow-drop-down-shadow"
      >
        {options.map((option, index) => (
          <DropdownMenuItem
            key={index}
            className="text-xs cursor-pointer hover:bg-[#E9E9E9] rounded-[5px]"
            disabled={option.disabled}
            onClick={() => option.func(itemId)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
