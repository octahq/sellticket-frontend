'use client'

/**
 * Confirm code page
 * Renders the confirm code component
 */

import Link from "next/link";

import AuthCard from "@/components/auth/AuthCard";
import AuthIconWrapper from "@/components/auth/AuthIconWrapper";
import ConfirmCode from "@/components/auth/ConfirmCode";
import UiIcon from "@/components/ui/Icon/UiIcon";
import UiModal from "@/components/ui/Modal/UiModal";

// --

export default function Page() {
  return (
    <>
      <div className="hidden md:block">
        <AuthCard>
          <AuthIconWrapper icon="MessageNotification"/>
          <ConfirmCode/>
        </AuthCard>
      </div>
      <div className="block md:hidden">
        <UiModal 
          title={
            <Link href='/auth/signin'
              className='shrink-0 w-6 h-6 rounded-full flex justify-center items-center bg-stroke-200'>
              <UiIcon icon='ArrowLeft' size="14"/>
            </Link>
          } 
          isOpen 
          onClose={()=>{}}
          customPadding='18px 24px 40px'
          >
          <div className="max-h-[calc(43vh-30px)] overflow-y-auto pt-4">
            <div className="w-fit mx-auto">
              <UiIcon icon="MessageSparkle" size="42"/>
            </div>
            <ConfirmCode textCenter/>
          </div>
        </UiModal>
      </div>
    </>
  )
}
