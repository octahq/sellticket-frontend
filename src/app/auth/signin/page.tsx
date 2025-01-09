'use client'

import AuthCard from "@/components/auth/AuthCard";
import AuthIconWrapper from "@/components/auth/AuthIconWrapper";
import UiForm from "@/components/ui/Form/UiForm";
import UiIcon from "@/components/ui/Icon/UiIcon";
import UiInput from "@/components/ui/Input/UiInput";

import useObjectState from "@/hooks/useObjectState";

export default function Page() {
  const formData = useObjectState({
    email: ''
  })

  function submitData() {

  }

  return (
    <AuthCard>
      <div>
        <AuthIconWrapper icon="Login"/>
        <h2 className="text-2xl font-semibold mb-1 mt-3">Sign in</h2>
        <p className="text-sm mb-8 text-stroke-500">Access your account with your email</p>
        <UiForm formData={formData} onSubmit={submitData}>
          {({ errors }) => (
            <div>
              <UiInput 
                prefixNode={<UiIcon icon="Envelope" size="20"/>}  
                name="email" 
                onChange={formData.set} 
                value={formData.value.email} 
                placeholder="your@email.com"/>
            </div>
          )}
        </UiForm>
      </div>
    </AuthCard>
  )
}
