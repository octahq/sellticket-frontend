'use client'

import { useState } from "react";

import AuthCard from "@/components/auth/AuthCard";
import AuthIconWrapper from "@/components/auth/AuthIconWrapper";
import UiOtpInput from "@/components/ui/Otpnput/UiOtpnput";
import UiIcon from "@/components/ui/Icon/UiIcon";

export default function Page() {
  // const [isError, setIs] 
  function onSubmit(otp: string) {
    console.log(otp);
  }
  return (
    <AuthCard>
      <AuthIconWrapper icon="MessageNotification"/>
      <h2 className="text-2xl font-semibold mb-1 mt-3">Confirm verification code</h2>
      <p className="text-sm mb-8 text-stroke-500 font-normal">
        We’ve sent a verification code to your email address. Enter the code below to verify your account
      </p>
      <UiOtpInput onAutoSubmit={onSubmit}/>
      <div className="flex justify-between items-center mt-4 text-sm">
        <p className="text-secondary-100">Did not receive your code yet?</p>
        <button>6 secs left</button>
      </div>
    </AuthCard>
  )
}
