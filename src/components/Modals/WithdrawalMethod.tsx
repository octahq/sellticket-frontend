'use client';

import Image from 'next/image';
import React, { useId, useRef, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOutsideClick } from '@/hooks/use-outside-click';
import featuredIcon from '../../assets/images/featuredIcon.png';
import { IoCloseOutline } from 'react-icons/io5';
import { withdrawalMethods } from '../common/constants';
import bankTransferIcon from '../../assets/images/bank-transfericon.png';
import walletTransferIcon from '../../assets/images/wallettransfer.png';
import { LiaCircleSolid } from 'react-icons/lia';
import { BsCheckCircleFill } from 'react-icons/bs';
import { Button } from '../ui/button';

interface Props {
  active: boolean;
  setActive: (active: boolean) => void;
}

export function WithdrawalMethod({ active, setActive }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const [withdrawalMethod, setWithdrawalMethod] = useState<string>('');

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
              layoutId={`card-${id}`}
              ref={ref}
              className="w-[90%] md:w-full mx-4 max-w-[432px] h-fit max-h-[90%] flex flex-col bg-white rounded-[12px] overflow-hidden px-5 py-4"
              initial={{ opacity: 0, scale: 0.9, x: '-30%' }} // Slightly offset from the center
              animate={{ opacity: 1, scale: 1, x: 0 }} // Move to the exact center
              exit={{ opacity: 0, scale: 0.9, x: '-30%' }} // Slide slightly back to the left
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <motion.div layoutId={`image-${id}`}>
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
                        gridTemplateColumns: '60px 1fr 20px',
                        borderColor:
                          withdrawalMethod === item.title
                            ? i === 0
                              ? '#367D2B'
                              : '#2775CA'
                            : '#E8EAEA',
                      }}
                      onClick={() => setWithdrawalMethod(item.title)}
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
                        <h3>{item.title}</h3>
                        <p className="text-sm text-[#6B6A6A]">{item.text}</p>
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
                  <div className="flex gap-2 mt-5 mb-2">
                    <Button
                      className="w-[40%] bg-[#EFEFEF]"
                      onClick={() => setActive(false)}
                    >
                      Back
                    </Button>
                    <Button className="primary-btn w-[60%]">Confirm</Button>
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
