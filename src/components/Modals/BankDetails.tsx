'use client';

import Image from 'next/image';
import React, { useId, useRef, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import featuredIcon from '../../assets/images/featuredIcon.png';
import { IoCloseOutline } from 'react-icons/io5';
import useObjectState from '@/hooks/useObjectState';
import { validateBankDetails } from '@/utils/schemas/WithdrawalSchema';
import UiForm from '../ui/Form/UiForm';
import UiInput from '../ui/Input/UiInput';
import UiButton from '../ui/Button/UiButton';
import Select, { StylesConfig } from 'react-select';
// import { Loader2 } from 'lucide-react';
import { IoIosArrowDown } from 'react-icons/io';
import { banks } from '../common/constants';
import UiIcon from '../ui/Icon/UiIcon';
import { Button } from '../ui/button';

interface Props {
  active: boolean;
  setActive: (active: boolean) => void;
  setOpen: (active: boolean) => void;
  setOpenConfirm: (active: boolean) => void;
}

interface Bank {
  id: number;
  name: string;
  logo: string;
}

export type optionType = {
  label: string;
  value: string;
};

export function BankDetails({
  active,
  setActive,
  setOpen,
  setOpenConfirm,
}: Props) {
  const id = useId();

  const formData = useObjectState({
    bankName: '',
    accountNumber: '',
    amount: '',
  });

  const handleSubmit = () => {
    console.log(formData);
    setOpenConfirm(true);
    setActive(false);
  };

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

  const mappedBanks = banks.map((bank) => ({
    ...bank,
    logo:
      typeof bank.logo === 'object' && 'src' in bank.logo
        ? bank.logo.src
        : bank.logo,
  }));

  const customStyles: StylesConfig<Bank, false> = {
    control: (base) => ({
      ...base,
      backgroundColor: '#f9f9f9', // Soft gray background
      border: '1px solid #F1F1F1',
      cursor: 'pointer',
      borderRadius: '10px', // Rounded edges
      boxShadow: 'none', // Remove shadow
      minHeight: '44px', // Compact height
      padding: '4px 8px', // Add internal spacing
      fontSize: '12px', // Small text
      color: '#000', // Subtle gray text
      '&:hover': {
        backgroundColor: '#f4f4f4', // Slightly darker gray on hover
      },
    }),
    singleValue: (base) => ({
      ...base,
      fontSize: '12px', // Small text
      color: '#000',
    }),
    placeholder: (base) => ({
      ...base,
      fontSize: '12px', // Small text
      color: '#b3b3b3', // Subtle gray for placeholder
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: '#b3b3b3', // Subtle gray dropdown arrow
      padding: '4px', // Compact padding
    }),
    indicatorSeparator: () => ({
      display: 'none', // Remove the separator line
    }),
    menu: (base) => ({
      ...base,
      borderRadius: '10px', // Rounded menu

      marginTop: '4px', // Add space between control and menu
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // Subtle shadow for dropdown
      zIndex: 10, // Ensure it appears above other elements
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? '#F5F5F5' : 'transparent', // Highlight focused option

      color: '#333333', // Darker text for options
      fontSize: '12px', // Small text for options
      padding: '10px 8px', // Add spacing for options
      cursor: 'pointer', // Pointer cursor for options
    }),
  };

  const CustomOption = (props: any) => {
    const { data, innerRef, innerProps } = props;
    return (
      <div
        ref={innerRef}
        {...innerProps}
        className="flex items-center gap-2 p-2 cursor-pointer"
      >
        <div className=" rounded-full overflow-hidden">
          {' '}
          <Image src={data.logo} alt={data.name} width={20} height={20} />
        </div>

        <span className="text-xs">{data.name}</span>
      </div>
    );
  };

  const MessageWithIcon = (message: string) => (
    <div className="flex gap-1">
      <UiIcon icon="Danger" size="10" />
      {message}
    </div>
  );

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
              className="w-[90%] md:w-full mx-4 max-w-[432px] h-fit max-h-[90%] flex flex-col bg-white rounded-[12px] overflow-hidden px-5 py-4"
              initial={{ opacity: 0, scale: 0.9, x: '-30%' }} // Slightly offset from the center
              animate={{ opacity: 1, scale: 1, x: 0 }} // Move to the exact center
              exit={{ opacity: 0, scale: 0.9, x: '-30%' }} // Slide slightly back to the left
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <div className="flex justify-between items-center">
                <Image src={featuredIcon} alt="featured icon" />
                <motion.button
                  key={`button-${id}`}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.05 } }}
                  className="bg-[#F5F5F5] grid place-items-center rounded-full h-6 w-6"
                  onClick={() => {
                    setActive(false);
                    setOpen(true);
                  }}
                >
                  <IoCloseOutline />
                </motion.button>
              </div>
              <div className="pt-4 pb-4">
                <p className="text-lg font-semibold text-[#292D32]">
                  Input bank details
                </p>
                <p className="text-sm text-[#5B5B5B]">
                  Provide your bank details to receive your payment
                </p>
              </div>
              <div className="border-t-2 grid gap-3 mt-5">
                <div className="grid">
                  <UiForm
                    formData={formData.value}
                    onSubmit={handleSubmit}
                    schema={validateBankDetails}
                  >
                    {({ errors }) => (
                      <div className="grid gap-3 pt-2">
                        <div>
                          <label
                            htmlFor="bankName"
                            id="bankName"
                            className="font-medium text-xs text-[#6B6A6A]"
                          >
                            Bank name
                          </label>
                          <Select<Bank>
                            options={mappedBanks}
                            getOptionValue={(e) => e.id.toString()}
                            getOptionLabel={(e) => e.name}
                            styles={customStyles}
                            placeholder="Select a Bank"
                            components={{
                              Option: CustomOption,
                              // SingleValue: ({ data }) => (
                              //   <div
                              //     style={{
                              //       display: 'flex',
                              //       alignItems: 'center',
                              //     }}
                              //   >
                              //     <Image
                              //       src={data.logo} // Ensure this points to the bank logo
                              //       alt={data.name}
                              //       width={20}
                              //       height={20}
                              //     />
                              //     {/* <span>{data.name}</span> */}
                              //   </div>
                              // ),
                              IndicatorSeparator: () => (
                                <div style={{ display: 'none' }}></div>
                              ),
                              DropdownIndicator: () => (
                                <div>
                                  <IoIosArrowDown size="15px" color="#646668" />
                                </div>
                              ),
                            }}
                            onChange={(selectedOption) => {
                              if (selectedOption) {
                                formData.set({
                                  name: 'bankName',
                                  value: selectedOption.name,
                                });
                              }
                            }}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="bankNumber"
                            id="bankNumber"
                            className="font-medium text-xs text-[#6B6A6A]"
                          >
                            Account number
                          </label>
                          <UiInput
                            name="accountNumber"
                            type="number"
                            onChange={formData.set}
                            value={formData.value.accountNumber}
                            error={
                              errors.accountNumber &&
                              MessageWithIcon(errors.accountNumber)
                            }
                            placeholder="Enter your account number"
                            grayBgInput
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="bankNumber"
                            id="bankNumber"
                            className="font-medium text-xs text-[#6B6A6A]"
                          >
                            Amount
                          </label>
                          <UiInput
                            name="amount"
                            onChange={formData.set}
                            value={formData.value.amount}
                            error={
                              errors.amount && MessageWithIcon(errors.amount)
                            }
                            placeholder="Enter Amount"
                            grayBgInput
                          />
                        </div>
                        <div className="flex gap-2 mt-5 mb-2">
                          <Button
                            type="button"
                            className="w-[40%] h-full bg-[#EFEFEF]"
                            onClick={() => {
                              setOpen(true);
                              setActive(false);
                            }}
                          >
                            Back
                          </Button>

                          <UiButton block>Add details</UiButton>
                        </div>
                      </div>
                    )}
                  </UiForm>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
