'use client';

import { useState } from 'react';
import BackButton from '@/components/ui/backButton';
import UiIcon from '@/components/ui/Icon/UiIcon';
import { IoIosArrowDown } from 'react-icons/io';
import Select, { StylesConfig } from 'react-select';
import UiButton from '@/components/ui/Button/UiButton';
import UiInput from '@/components/ui/Input/UiInput';
import {
  validateBankDetails,
  validateDigitalWalletDetails,
} from '@/utils/schemas/WithdrawalSchema';
import useObjectState from '@/hooks/useObjectState';
import { banks } from '@/components/common/constants';
import Image from 'next/image';
import UiForm from '@/components/ui/Form/UiForm';
import { motion } from 'framer-motion';
import { ConfirmWithdrawal } from '@/components/Modals/ConfirmWithdrawal';

interface Bank {
  id: number;
  name: string;
  logo: string;
}

export type optionType = {
  label: string;
  value: string;
};

const WithdrawalDetails = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [withdrawalMethod] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('withdrawalMethod') || '';
    }
    return '';
  });

  const formData = useObjectState({
    bankName: '',
    accountNumber: '',
    amount: '',
  });
  const digitalWalletData = useObjectState({
    asset: '',
    address: '',
    amount: '',
  });

  const handleSubmit = () => {
    console.log(formData);
    setIsActive(true);
  };

  const handleSubmitWalletDetails = () => {
    console.log(digitalWalletData);
    setIsActive(true);
  };

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
    <motion.div
      initial={{ x: '100%' }} // Start off-screen
      animate={{ x: 0 }} // Slide into view
      exit={{ x: '-100%' }} // Slide out on unmount
      transition={{ duration: 0.5, ease: 'easeInOut' }} // Animation duration and easing
    >
      <BackButton />

      {withdrawalMethod?.includes('Bank') ? (
        <div>
          <h1 className="font-bold text-[#292D32] text-xl pt-2">
            Input bank details
          </h1>
          <p className="text-[#6B6A6A] text-sm">
            Provide your bank details to receive your payment
          </p>
        </div>
      ) : (
        <div className="pt-4 pb-4">
          <p className="text-lg font-semibold text-[#292D32]">Digital wallet</p>
          <p className="text-sm text-[#5B5B5B]">Fill the information below</p>
        </div>
      )}

      {withdrawalMethod?.includes('Bank') ? (
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
                  <div className="flex items-center gap-2">
                    <div className="w-full">
                      <label
                        htmlFor="bankNumber"
                        id="bankNumber"
                        className="font-medium text-xs text-[#6B6A6A]"
                      >
                        Amount
                      </label>
                      <UiInput
                        name="amount"
                        type="number"
                        onChange={formData.set}
                        value={formData.value.amount}
                        error={errors.amount && MessageWithIcon(errors.amount)}
                        placeholder="Enter Amount"
                        grayBgInput
                      />
                    </div>
                    <div className="w-[30%] self-end">
                      <UiButton block>Confirm</UiButton>
                    </div>
                  </div>
                </div>
              )}
            </UiForm>
          </div>
        </div>
      ) : (
        <div className="border-t-2 grid gap-3 mt-5">
          <div className="grid">
            <UiForm
              formData={digitalWalletData.value}
              onSubmit={handleSubmitWalletDetails}
              schema={validateDigitalWalletDetails}
            >
              {({ errors }) => (
                <div className="grid gap-3 pt-2">
                  <div>
                    <label
                      htmlFor="asset"
                      id="asset"
                      className="font-medium text-xs text-[#6B6A6A]"
                    >
                      Asset
                    </label>
                    <Select<Bank>
                      options={mappedBanks}
                      getOptionValue={(e) => e.id.toString()}
                      getOptionLabel={(e) => e.name}
                      styles={customStyles}
                      placeholder="Select an asset"
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
                          digitalWalletData.set({
                            name: 'asset',
                            value: selectedOption.name,
                          });
                        }
                      }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      id="address"
                      className="font-medium text-xs text-[#6B6A6A]"
                    >
                      Wallet Address
                    </label>
                    <UiInput
                      name="address"
                      onChange={digitalWalletData.set}
                      value={digitalWalletData.value.address}
                      error={errors.address && MessageWithIcon(errors.address)}
                      placeholder="Enter wallet address or base name"
                      grayBgInput
                    />
                    <p className="text-xs text-[#DD920B] py-3">
                      Use a Base chain-compatible USDC address to avoid fund
                      loss.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-3">
                      <div className="flex items-center gap-2 pb-2">
                        <p className="font-medium text-xs text-[#6B6A6A] pr-2 border-r-2">
                          Amount
                        </p>
                        <button className="font-semibold text-[#292D32] text-xs">
                          Max
                        </button>
                      </div>

                      <UiInput
                        name="amount"
                        type="number"
                        onChange={digitalWalletData.set}
                        value={digitalWalletData.value.amount}
                        error={errors.amount && MessageWithIcon(errors.amount)}
                        placeholder="0.00"
                        grayBgInput
                      />
                    </div>
                    <div className="flex-1 self-end">
                      <UiButton block>Confirm</UiButton>
                    </div>
                  </div>
                </div>
              )}
            </UiForm>
          </div>
        </div>
      )}
      <ConfirmWithdrawal
        active={isActive}
        setActive={setIsActive}
        withdrawalMethod={withdrawalMethod}
      />
    </motion.div>
  );
};
export default WithdrawalDetails;
