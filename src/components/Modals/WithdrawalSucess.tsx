'use client';

import Image from 'next/image';
import React, { useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { IoCloseOutline } from 'react-icons/io5';
import walletTransferIcon from '../../assets/images/wallettransfer.png';
import dollarSign from '../../assets/images/usd-coin-(usdc).png';

import { IoMdCheckmark } from 'react-icons/io';
import emptyWallet from '../../assets/images/empty-wallet.png';

interface Props {
  active: boolean;
  setActive: (active: boolean) => void;
}

export function WithdrawalSuccess({ active, setActive }: Props) {
  const ref = useRef<HTMLDivElement>(null);

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
              <div className="flex justify-end items-center pt-6 ">
                <motion.button
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.05 } }}
                  className="bg-[#F5F5F5] grid place-items-center rounded-full h-6 w-6"
                  onClick={() => setActive(false)}
                >
                  <IoCloseOutline />
                </motion.button>
              </div>
              <div className="max-w-[257px] w-full mx-auto pt-2">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-[45px] h-[45px]">
                    <Image src={walletTransferIcon} alt="withdrawal icons" />
                  </div>
                  <div className="text-[#8D9091] text-sm grid place-items-center">
                    <p className="text-[#292D32] font-semibold text-lg">
                      Sent to Oluboba O.
                    </p>
                    <span>
                      Jan 12th, 2025 <time>11:49pm</time>
                    </span>
                  </div>
                </div>
                <div className="border-[1px] mt-6 text-center border-[#E8EAEA] rounded-[20px] py-[30px] ">
                  <h3 className="text-[36px] text-[#292D32] font-bold">
                    ₦6,254,123
                  </h3>
                </div>
                <div className="w-full mx-auto pt-[22px] space-y-4">
                  {/* Status Section */}
                  <div className="grid grid-cols-3 space-x-2 bg-[#E5F3E2] rounded-[10px] p-3">
                    <div className="bg-[#b0dfa7] grid place-items-center w-6 aspect-square rounded-full">
                      <IoMdCheckmark />
                    </div>
                    <span className="text-[#0E6301] text-sm font-medium">
                      Completed
                    </span>
                  </div>

                  {/* Details Section */}
                  <div className="space-y-3 pb-10">
                    {/* Wallet Detail */}
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center space-x-2 text-[#ABABAB]">
                        <Image src={emptyWallet} alt="empty wallet" />
                        <span>Wallet</span>
                      </div>
                      <span className="text-[#292D32]  font-medium">
                        My wallet 1
                      </span>
                    </div>

                    {/* Network Fee Detail */}
                    <div className="flex justify-between items-center  text-xs">
                      <div className="flex items-center space-x-2 text-[#ABABAB]">
                        <Image src={dollarSign} alt="dollar sign wallet" />
                        <span>Network fee</span>
                      </div>
                      <span className="text-[#6B6A6A] font-medium">$0.57</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
