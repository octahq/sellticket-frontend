'use client'

import { useState } from "react";
import OTPInput from "react-otp-input";

interface Props {
  isError?: boolean;
  isSuccess?: boolean;
  onAutoSubmit: (otp: string)=> void;
}

export default function UiOtpInput({ isError, isSuccess, onAutoSubmit }: Props) {
  const [otp, setOtp] = useState('');

  const validationStyles = isError
  ? 'border-danger-300 bg-[#DE878733] text-danger-500'
    : isSuccess
  ? 'border-success-300 bg-success-100' 
    : 'border-lines-200 bg-neutral-400';

  function handleChange(updatedOtp: string) {
    setOtp(updatedOtp)
    if(updatedOtp.length === 5){
      onAutoSubmit(updatedOtp)
    }
  }
  
  return (
    <OTPInput 
      containerStyle={{
        display: 'flex',
        justifyContent: 'space-between'
      }}
      numInputs={5}
      value={otp}
      onChange={handleChange} 
      renderInput={(props) => <input {...props} 
      className={`min-w-14 h-14 rounded-2xl font-semibold border-[1.5px] ${validationStyles}`} 
      />}
    />
  )
}
