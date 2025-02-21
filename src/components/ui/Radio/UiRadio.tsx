import OnChangeParams from '@/types/OnChangeParams';
import UiIcon from '../Icon/UiIcon';
interface Props {
  label: string;
  name: string;
  /** formValue value in the form */
  formValue: string;
  value: string;
  onChange: (params: OnChangeParams) => void;
}
export default function UiRadio({
  label,
  value,
  formValue,
  name,
  onChange,
}: Props) {
  return (
    <button
      id={name}
      className="flex items-center gap-2"
      type="button"
      onClick={() => onChange({ name, value })}
    >
      <div
        className={`rounded-full w-4 h-4 border-[2px] border-stroke-100 flex items-center justify-center`}
      >
        <div
          className={`border border-white w-full h-full rounded-full bg-[#D9D9D9] transition-all duration-150 ease-in ${formValue === value && 'bg-secondary-600'}`}
        ></div>
      </div>
      <label
        htmlFor={value}
        className="text-sm text-secondary-500 cursor-pointer"
      >
        {label}
      </label>
    </button>
  );
}
