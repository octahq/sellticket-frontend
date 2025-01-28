'use client';

import Image from 'next/image';
import React, { useId, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOutsideClick } from '@/hooks/use-outside-click';
import featuredIcon from '../../assets/images/dollarIcon.png';
import { IoCloseOutline } from 'react-icons/io5';
import { Button } from '../ui/button';
import walletTransferIcon from '../../assets/images/wallettransfer.png';

interface Props {
  active: boolean;
  withdrawalMethod: string | undefined;
  setActive: (active: boolean) => void;
  setOpen?: (active: boolean) => void; // Optional
  setIsOpen?: (active: boolean) => void; // Optional
  setIsShowSuccess: (active: boolean) => void; // Optional
}

export function ConfirmWithdrawal({
  active,
  setActive,
  setOpen,
  setIsOpen,
  withdrawalMethod,
  setIsShowSuccess,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  console.log(withdrawalMethod);
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActive(false);
      }
    }

    if (active) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active, setActive]);

  useOutsideClick(ref, () => setActive(false));

  const handleClose = () => {
    if (withdrawalMethod?.includes('Bank')) {
      if (window.innerWidth >= 768) {
        setIsOpen?.(true); //on tablet upward, if withdrawal method is bank transfer open BankDetails modal
        setActive(false); //close the current modal
      } else {
        setIsOpen?.(true); //on small screen open confirm withdrawal modal only
      }
    } else {
      if (window.innerWidth >= 768) {
        setOpen?.(true);
        setActive(false);
      } else {
        setOpen?.(true); // Optional chaining for setOpen
      }
    }
    setActive(false);
  };

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 h-full w-full z-40"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-50">
            <motion.div
              ref={ref}
              className="fixed bg-white shadow-lg 
    bottom-0 left-0 right-0 max-h-[90%] overflow-y-auto 
    rounded-t-[30px] px-5 py-6
    md:relative lg:w-[90%] lg:md:w-full lg:mx-4 lg:max-w-[432px] md:h-fit lg:max-h-[90%] md:flex md:flex-col md:rounded-[12px] md:overflow-hidden md:px-5 md:py-4"
              initial={{
                opacity: 0,
                ...(window.innerWidth <= 768
                  ? { y: '100%' } // Slide in from bottom for mobile
                  : { scale: 0.9, x: '-30%' }), // Original animation for large screens
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                ...(window.innerWidth <= 768
                  ? { y: '100%' } // Slide out to bottom for mobile
                  : { scale: 0.9, x: '-30%' }), // Original animation for large screens
              }}
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
              }}
            >
              <div className="flex justify-between items-center ">
                <Image src={featuredIcon} alt="featured icon" />
                <motion.button
                  key={`button-${id}`}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.05 } }}
                  className="bg-[#F5F5F5] grid place-items-center rounded-full h-6 w-6"
                  onClick={handleClose}
                >
                  <IoCloseOutline />
                </motion.button>
              </div>
              <div className="pt-4 pb-8 md:pb-4 ">
                <p className="text-lg font-semibold text-[#292D32]">
                  Confirm Withdrawal
                </p>
                <p className="text-sm text-[#5B5B5B]">You are withdrawing</p>
              </div>
              {withdrawalMethod?.includes('Bank') ? (
                <div className="border-t-2 grid gap-3  text-[#6B6A6A]">
                  <div className="flex justify-between items-center pt-4 ">
                    <span className="text-xs md:text-sm">Amount</span>
                    <span className=" md:text-2xl font-bold text-[#292D32]">
                      ₦6,254,123
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs md:text-sm">Account name</span>
                      <span className="text-[#292D32] text-sm font-medium ">
                        Oluboba Oluwatosin
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-[10px]">
                      <span className="text-xs md:text-sm">Account number</span>
                      <span className="text-[#292D32] text-sm font-medium">
                        12456789
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-[10px]">
                      <span className="text-xs md:text-sm">Bank</span>
                      <span className="text-[#292D32] text-sm font-medium">
                        VFD
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border-t-2 grid gap- text-[#6B6A6A]">
                  <div className="flex justify-between items-center pt-4 ">
                    <div>
                      <span className="text-xs md:text-sm pb-6">Amount</span>{' '}
                      <Image
                        src={walletTransferIcon}
                        width={40}
                        height={40}
                        priority
                        alt="withdrawal icons"
                      />
                    </div>

                    <p className=" md:text-2xl font-bold text-[#292D32]">
                      0.001 USDC
                      <span className="block text-base font-medium text-right">
                        $2.43
                      </span>
                    </p>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs md:text-sm">Wallet Address</span>
                      <span className="text-[#292D32] text-sm font-medium ">
                        ff52adhakf2..........2kdhfhhxn
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-[10px]">
                      <span className="text-xs md:text-sm">Network</span>
                      <span className="text-[#292D32] text-sm font-medium">
                        Base
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-[10px]">
                      <span className="text-xs md:text-sm">Network fee</span>
                      <p className="text-[#292D32] text-sm font-medium">
                        <span className="text-[#8D9091]">$0.02 </span> VFD
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-[10px]">
                      <span className="text-xs md:text-sm">Total cost</span>
                      <span className="text-[#292D32] text-sm font-medium">
                        $0.02
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-8 mb-2 h-[50px]">
                <Button
                  className="w-[40%] h-full bg-[#EFEFEF] font-medium text-[#292D32]"
                  onClick={handleClose}
                >
                  Cancel
                </Button>

                <Button
                  className="w-full h-full primary-btn"
                  onClick={() => {
                    setActive(false);
                    setIsShowSuccess(true);
                  }}
                >
                  Confirm
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
