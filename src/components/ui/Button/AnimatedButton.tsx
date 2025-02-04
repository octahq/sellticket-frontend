// import { MouseEventHandler } from "react";
// import UiButton from "./UiButton";

// import { Radius, Size, Vatiant, radiusClasses } from './UiButton';

// // --

// interface Props {
//   children: React.ReactNode;
//   variant?: Vatiant;
//   size?: Size;
//   roundedVariant: Radius;
//   block?: boolean;
//   disabled?: boolean;
//   loading?: boolean;
//   type?: 'button' | 'submit';
//   onClick?: MouseEventHandler<HTMLButtonElement>;
// }

// export default function AnimatedButton({
//   roundedVariant = 'lg',
//   size = 'lg',
//   variant = 'primary',
//   children,
//   loading,
//   type = 'submit',
//   disabled,
//   onClick,
// }: Props) {
//   return (
//     <div className="relative overflow-hidden group">
//       <UiButton
//         roundedVariant={roundedVariant}
//         size={size}
//         variant={variant}
//         onClick={onClick}
//         loading={loading}
//         type={type}
//         disabled={disabled}
//       >
//         {children}
//       </UiButton>
//       <span
//         className={`absolute inset-0 bg-[#56606B] scale-x-0 origin-right transition-transform duration-200 ease-out group-hover:scale-x-100 group-hover:origin-left ${radiusClasses[roundedVariant]}`}
//       ></span>
//     </div>
//   );
// }
