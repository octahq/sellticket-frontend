'use client';

/**
 * Confirm code form
 * Revives and confirms the otp then renders appropriate messages
 */

import { useEffect, useMemo, useState } from 'react';

import UiIcon from '../ui/Icon/UiIcon';
import UiOtpInput from '../ui/Otpnput/UiOtpInput';

// --

interface Props {
  textCenter?: boolean;
}

export default function ConfirmCode({ textCenter }: Props) {
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [count, setCount] = useState(59);

  const ErrorMessage = useMemo(
    () => (
      <div className="flex gap-1 items-center">
        <UiIcon icon="Danger" size="16" />
        <p className="text-danger-500">You’ve entered a wrong code</p>
      </div>
    ),
    []
  );

  const SuccessMessage = useMemo(
    () => (
      <p className="text-success-400">Your code is verified successfully</p>
    ),
    []
  );

  const DefaultMessage = useMemo(
    () => <p className="text-secondary-100">Did not receive your code yet?</p>,
    []
  );

  {
    /* conditionally render messages based on otp success/error state */
  }
  const messageToRender = isError
    ? ErrorMessage
    : isSuccess
      ? SuccessMessage
      : DefaultMessage;

  function onSubmit(otp: string) {
    console.log(otp);
    setIsSuccess(true);
  }

  useEffect(() => {
    if (count > 0) {
      const timer = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [count]);

  return (
    <div className={`${textCenter && 'text-center'}`}>
      <h2 className={`text-2xl text-[#071134] font-semibold mb-1 mt-3 `}>
        Confirm verification code
      </h2>
      <p className="text-sm mb-8 text-stroke-500 font-normal">
        We’ve sent a verification code to your email address. Enter the code
        below to verify your account
      </p>
      <UiOtpInput
        isError={isError}
        isSuccess={isSuccess}
        onAutoSubmit={onSubmit}
      />
      <div className="flex justify-between gap-2 items-center mt-4 text-sm">
        {messageToRender}
        {count > 0 ? (
          <p>{count} secs left</p>
        ) : (
          <button onClick={() => setCount(59)} className="font-semibold">
            Resend code
          </button>
        )}
      </div>
    </div>
  );
}
