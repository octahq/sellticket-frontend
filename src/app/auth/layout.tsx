import SellticketLogoFull from '@/assets/svgs/sell-ticket-logo-full.svg';

// --

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="auth-layout relative h-screen bg-primary-50 flex justify-center items-center">
      <span className="hidden sm:block w-36 h-[33px] absolute top-[7.6%] left-[7.6%]">
        <SellticketLogoFull />
      </span>
      {children}
    </div>
  );
}
