'use client'

import { useMemo } from "react";
import Link from "next/link";

import AuthCard from "@/components/auth/AuthCard";
import AuthIconWrapper from "@/components/auth/AuthIconWrapper";
import UiButton from "@/components/ui/Button/UiButton";
import UiForm from "@/components/ui/Form/UiForm";
import UiIcon from "@/components/ui/Icon/UiIcon";
import UiInput from "@/components/ui/Input/UiInput";

import useObjectState from "@/hooks/useObjectState";

import SiginInSchema from "@/utils/schemas/SiginInSchema";

// --

export default function Page() {
  const formData = useObjectState({
    email: ''
  })

  const showPrefixNode = useMemo(() => {
    return formData.value.email === '' 
  }, [formData.value.email]);

  const MessageWithIcon = (message: string) => (
    <div className="flex gap-1">
      <UiIcon icon="Danger" size="10"/>
      {message}
    </div>
  )

  function submitData() {
    console.log(formData);
  }
  
  return (
    <AuthCard>
      <div>
        <AuthIconWrapper icon="Login"/>
        <h2 className="text-2xl font-semibold mb-1 mt-3">Sign in</h2>
        <p className="text-sm mb-8 text-stroke-500">Access your account with your email</p>
        <UiForm formData={formData.value} onSubmit={submitData} schema={SiginInSchema}>
          {({ errors }) => (
            <div className="grid gap-8">
              <UiInput 
                prefixNode={showPrefixNode && <UiIcon icon="Envelope" size="20"/>}  
                name="email" 
                onChange={formData.set} 
                value={formData.value.email} 
                error={errors.email && MessageWithIcon(errors.email)}
                placeholder="your@email.com"
                />
                <UiButton block>Continue</UiButton>
            </div>
          )}
        </UiForm>
        <p className="text-xs text-center mt-8 max-w-[250px] mx-auto text-secondary-100">By creating your account you are accepting our <Link href=''>terms</Link> and <Link href=''>policies</Link> </p>
      </div>
    </AuthCard>
  )
}
