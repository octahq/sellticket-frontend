/**
 * Signin page
 * Renders the signin form and handles the submit of the sigin form data
 */

'use client';

import { useRouter } from 'next/navigation';

import SellticketLogoFull from '@/assets/icons/SellticketLogoFull';

import AuthCard from '@/components/auth/AuthCard';
import AuthIconWrapper from '@/components/auth/AuthIconWrapper';
import SignInForm from '@/components/auth/SignInForm';
import UiModal from '@/components/ui/Modal/UiModal';

import useObjectState from '@/hooks/useObjectState';

// --

export default function Page() {
  const router = useRouter();
  const formData = useObjectState({
    email: '',
  });

  function submitData() {
    console.log(formData);
    router.push('/auth/confirm-code');
    router.push('/auth/confirm-code');
  }

  return (
    <>
      {/* render on web */}
      <div className="hidden sm:block">
        <AuthCard>
          <div>
            <AuthIconWrapper icon="Login" paddingRight />
            <h2 className="text-2xl font-semibold mb-1 mt-3">Sign in</h2>
            <p className="text-sm mb-8 text-stroke-500">
              Access your account with your email
            </p>
            <SignInForm onSubmitForm={submitData} />
          </div>
        </AuthCard>
      </div>
      {/* render on mobile */}
      <div className="sm:hidden">
        <UiModal
          title={
            <p className="font-normal w-full text-center text-sm">
              Log in or Sign up
            </p>
          }
          isOpen
          onClose={() => {}}
          customPadding="18px 24px 0px"
        >
          <div className="pt-8 pb-[34px] box-border">
            <div className="bg-white flex justify-center items-center w-full mx-auto mb-8">
              <SellticketLogoFull />
            </div>
            <SignInForm onSubmitForm={submitData} />
          </div>
        </UiModal>
      </div>
    </>
  );
}
