'use client';

import Image from 'next/image';
import React, { useId, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import featuredIcon from '../../assets/images/featuredIcon.png';
import { IoCloseOutline } from 'react-icons/io5';
import { withdrawalMethods } from '../common/constants';
import bankTransferIcon from '../../assets/images/bank-transfericon.png';
import walletTransferIcon from '../../assets/images/wallettransfer.png';
import { LiaCircleSolid } from 'react-icons/lia';
import { BsCheckCircleFill } from 'react-icons/bs';
import { Button } from '../ui/button';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useRouter } from 'next/navigation';

interface Props {
  active: boolean;
  withdrawalMethod: string;
  setWithdrawalMethod: (active: string) => void;
  setActive: (active: boolean) => void;
  setIsShow: (active: boolean) => void;
  setOpen: (active: boolean) => void;
}

export function WithdrawalMethod({
  active,
  setActive,
  setIsShow,
  setOpen,
  withdrawalMethod,
  setWithdrawalMethod,
}: Props) {
  const id = useId();

  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  const router = useRouter();
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

  function handleWithdrawalAction(): void {
    // Ensure modal actions are executed based on the selected method
    if (withdrawalMethod.includes('Bank')) {
      if (isSmallScreen) {
        // Redirect to withdrawal details page for small screens
        router.push('/finance/withdrawal-details');
      } else {
        // Open bank withdrawal modal for larger screens
        setIsShow(true);
      }
    } else {
      if (isSmallScreen) {
        // Redirect to withdrawal details page for small screens
        router.push('/finance/withdrawal-details');
      } else {
        // Open wallet withdrawal modal for larger screens
        setOpen(true);
      }
    }

    // Deactivate the current action state
    setActive(false);
    sessionStorage.setItem('withdrawalMethod', withdrawalMethod);
  }

  useEffect(() => {
    setWithdrawalMethod(withdrawalMethods[0]?.title);
  }, []);

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
              className="fixed bg-white shadow-lg 
    bottom-0 left-0 right-0 max-h-[90%] overflow-y-auto 
    rounded-t-[30px] md:rounded-[12px]  px-5 py-6
    md:relative lg:w-[90%] lg:md:w-full lg:mx-4 lg:max-w-[432px] md:h-fit lg:max-h-[90%] md:flex md:flex-col md:overflow-hidden md:px-5 md:py-4"
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
              <motion.div>
                <div className="flex justify-between items-center">
                  <Image src={featuredIcon} alt="featured icon" />
                  <motion.button
                    key={`button-${id}`}
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
                <div className="pt-4">
                  <p className="text-lg font-semibold text-[#292D32]">
                    Choose your withdrawal method
                  </p>
                  <p className="text-sm text-[#5B5B5B]">
                    Select how you’d like to receive your withdrawal.
                  </p>
                </div>
                <ul className="border-t-2 grid gap-3 border-t-[#E8EAEA] pt-5 mt-5">
                  {withdrawalMethods.map((item, i) => (
                    <li
                      key={i}
                      className={`grid border-2 p-4 hover:bg-[#F1F1F1] cursor-pointer rounded-[12px] ${
                        withdrawalMethod === item.title && 'bg-[#FAFAFA]'
                      }`}
                      style={{
                        gridTemplateColumns: '50px 1fr 20px',
                        borderColor:
                          withdrawalMethod === item.title
                            ? i === 0
                              ? '#367D2B'
                              : '#2775CA'
                            : '#E8EAEA',
                      }}
                      onClick={() => {
                        setWithdrawalMethod(item.title);
                      }}
                    >
                      {i == 0 ? (
                        <Image src={bankTransferIcon} alt="withdrawal icons" />
                      ) : (
                        <div className="w-[32px] aspect-square bg-[#EAF4FF] py-[7px] px-[8px] grid place-items-center rounded-full">
                          <Image
                            src={walletTransferIcon}
                            alt="withdrawal icons"
                          />
                        </div>
                      )}

                      <div>
                        <h3 className="text-sm md:text-base font-medium">
                          {item.title}
                        </h3>
                        <p className="text-xs md:text-sm text-[#6B6A6A] font-normal">
                          {item.text}
                        </p>
                      </div>
                      <div className="text-2xl cursor-pointer">
                        {withdrawalMethod === item.title ? (
                          <BsCheckCircleFill
                            className={
                              i === 0
                                ? 'text-[#5E9756] border-[3px] border-[#AFCBAA] rounded-full'
                                : 'text-[#2775CA] rounded-full border-[3px] border-[#D4E7FC]'
                            }
                          />
                        ) : (
                          <LiaCircleSolid className="text-[#D5D7DA]" />
                        )}
                      </div>
                    </li>
                  ))}
                  <div className="flex justify-end md:justify-start gap-2 mt-5 mb-2">
                    <Button
                      className="w-[40%] bg-[#EFEFEF] hidden md:block"
                      onClick={() => setActive(false)}
                    >
                      Back
                    </Button>
                    <Button
                      className="primary-btn w-[40%] md:w-[60%]"
                      onClick={() => handleWithdrawalAction()}
                    >
                      Confirm
                    </Button>
                  </div>
                </ul>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
