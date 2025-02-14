const variants = {
  warning: 'bg-warning-100 border border-warning-200 text-warning-700',
  neutral: 'border border-[#D1D1D1] bg-[#EBEBEB] text-[#3D3D3D]',
  nude: 'bg-[#FFE8C3] text-[#616161]',
  peach: 'bg-[#FFCCCC] text-[#616161]',
  lilac: 'bg-[#E1DDFF] text-[#616161]',
};

const sizeClasses = {
  sm: 'h-4 text-[10px] px-1',
  md: 'h-[19px] -sm px-[6px]',
};

interface Props {
  variant?: keyof typeof variants;
  size?: keyof typeof sizeClasses;
  children: React.ReactNode;
}


export default function UiPill({ children, variant = 'neutral', size = 'sm' }: Props) {
  return (
    <div
      className={`rounded-[100px]  w-fit flex items-center gap-1 font-medium ${variants[variant]} ${sizeClasses[size]}`}
    >
      {children}
    </div>
  );
}
