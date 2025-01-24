/**
 * Welcome banner component
 * This component displays a welcome message after successful login/signin
 */

import GreenCheckSvg from '@/assets/svgs/green-check.svg';

import UiButton from '@/components/ui/Button/UiButton';

// --

export default function page() {
  return (
    <div className="text-center max-w-[324px] mx-auto px-2">
      <div className="w-[87px] h-[87px] mx-auto mb-8 bg-success-200 rounded-full flex justify-center items-center">
        <GreenCheckSvg />
      </div>
      <h2 className="mb-4 text-2xl font-medium">Hola 👋, Temidayo</h2>
      <p className="text-[#595959] mb-16">
        Welcome to Sellticket, let’s have an eventful experience together.
      </p>
      <div className="mx-auto w-fit">
        <UiButton size="md">Welcome</UiButton>
      </div>
    </div>
  );
}
