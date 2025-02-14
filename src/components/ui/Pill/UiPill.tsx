const variants = {
  warning: 'bg-warning-100 border-warning-200 text-warning-700',
  neutral: 'border-[#D1D1D1] bg-[#EBEBEB] text-[#3D3D3D]',
};

interface Props {
  variant?: keyof typeof variants;
  children: React.ReactNode;
}


export default function UiPill({ children, variant='neutral' }: Props) {
  return (
    <div
      className={`border px-1 rounded-[100px] h-4 w-fit flex items-center gap-1 text-[10px] font-medium ${variants[variant]}`}
    >
      {children}
    </div>
  );
}
