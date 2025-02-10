'use client';

import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { IoCloseOutline } from 'react-icons/io5';
import { validateEventDetails } from '@/utils/schemas/addEventSchema';
import useObjectState from '@/hooks/useObjectState';
import UiForm from '../ui/Form/UiForm';
import UiInput from '../ui/Input/UiInput';
import Select, { StylesConfig } from 'react-select';

import { IoIosArrowDown } from 'react-icons/io';
import UiIcon from '../ui/Icon/UiIcon';
import img from '../../assets/images/uploadfile.png';
import Image from 'next/image';
import { eventCategories, locationTabs } from '../common/constants';
import { SingleValue } from '@/types/types';
import { DatePicker } from '../ui/DatePicker';
import { type ITimezone } from 'react-timezone-select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { RiErrorWarningLine } from 'react-icons/ri';
import { Input } from '../ui/input';
import { banks } from '../common/constants';
import TimezonePicker from '../common/TimezonePicker';

interface Props {
  active: boolean;
  setActive: (active: boolean) => void;
}

interface Bank {
  id: number;
  name: string;
  logo: string;
}

// interface LocationData {
//   location: {
//     lat: number;
//     lng: number;
//   };
//   [key: string]: any; // Adjust this based on the full response structure
// }

export function AddEventDrawer({ active, setActive }: Props) {
  const [selectedTimezone, setSelectedTimezone] = useState<ITimezone>(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [dateError, setDateError] = useState<string>('');
  const formData = useObjectState({
    image: null,
    imageFile: '',
    name: '',
    category: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    location: '',
    description: '',
    currency: '',
    moreDescription: '',
    bankName: '',
    accountNumber: '',
  });
  const [selectedTab, setSelectedTab] = useState('');

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [isEnablePayment, setIsEnablePayment] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const [location, setLocation] = useState('');
  // const [isLoading, setIsLoading] = useState(true);
  // const [isError, setIsError] = useState(false);
  // const [coordinate, setCoordinate] = useState<object>({});

  // const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.NEXT_PUBLIC_IPIFY_API_KEY}&ipAddress=${location}`;

  // const fetchIp = async () => {
  //   try {
  //     setIsLoading(true);
  //     const res = await axios.get<LocationData>(url);

  //     const { data } = res;

  //     setCoordinate(data?.location);

  //     setIsError(false);
  //   } catch (error) {
  //     console.error('Error fetching IP data:', error);
  //     setIsError(true);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchIp();
  // }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
    console.log('Location:', e.target.value);
  };

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    setShowDetails(false); // Hide details when switching options
  };

  const handleSwitchChange = (checked: boolean) => {
    setIsEnablePayment(checked);
  };

  const handleSubmit = () => {
    if (startDate && endDate && endDate <= startDate) {
      setDateError('The end date must be later than the start date.');
      return; // Stop form submission
    }

    // Clear the error message if validation passes
    setDateError('');
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

  const categoryOptions = eventCategories?.map((id) => ({
    value: id?.value,
    label: id?.name,
  }));
  const customBankStyles: StylesConfig<Bank, false> = {
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

  const customStyles: StylesConfig<SingleValue, false> = {
    control: (provided) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#f4f4f4',
      border: '1px solid #F1F1F1',
      borderRadius: '10px',
      boxShadow: 'none',
      minHeight: '44px',
      padding: '0 12px',
      fontSize: '12px',
      color: '#000',
      outline: 'none',
      '&:hover': {
        backgroundColor: '#f4f4f4',
      },
      '&:focus': {
        borderColor: 'transparent',
        outline: 'none',
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: '12px',
      color: '#b3b3b3',
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '10px',
      marginTop: '4px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      zIndex: 10,
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? '#F5F5F5' : 'transparent',
      color: '#333333',
      fontSize: '12px',
      padding: '10px 8px',
      cursor: 'pointer',
      '&:active': {
        backgroundColor: '#EAEAEA',
      },
    }),
  };

  const mappedBanks = banks.map((bank) => ({
    ...bank,
    logo:
      typeof bank.logo === 'object' && 'src' in bank.logo
        ? bank.logo.src
        : bank.logo,
  }));

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
            onClick={() => setActive(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 flex justify-end z-50 ">
            <motion.div
              className="bg-white flex flex-col h-screen shadow-lg w-[470px] max-w-full py-6"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <div className="flex justify-between items-center px-5 ">
                <h2 className="text-lg font-semibold">Create Event</h2>
                <button
                  className="p-1 rounded-full bg-gray-200"
                  onClick={() => setActive(false)}
                >
                  <IoCloseOutline size={16} />
                </button>
              </div>
              <div className="grid gap-3 mt-5  flex-1 overflow-y-auto px-5 ">
                <div className="grid">
                  <UiForm
                    formData={formData.value}
                    onSubmit={handleSubmit}
                    schema={validateEventDetails}
                  >
                    {({ errors }) => (
                      <div className="grid gap-3 pt-2">
                        <div>
                          <div
                            style={{ borderStyle: 'dashed' }}
                            className="grid place-items-center border border-[#CFE0CC] rounded-[10px] h-[135px]  overflow-hidden "
                          >
                            <input
                              id="image_upload"
                              type="file"
                              className="border border-black hidden"
                              onChange={(e) => {
                                const file = e.target?.files?.[0];
                                if (file) {
                                  formData.set({ name: 'image', value: file });
                                  formData.set({
                                    name: 'imageFile',
                                    value: URL.createObjectURL(file),
                                  });
                                }
                              }}
                            />
                            <label
                              className="relative cursor-pointer"
                              htmlFor="image_upload"
                            >
                              <div className="grid place-items-center">
                                {formData.value.imageFile ? (
                                  <Image
                                    src={formData.value.imageFile}
                                    alt="upload img"
                                    width={200}
                                    height={200}
                                  />
                                ) : (
                                  <Image
                                    src={img}
                                    alt="upload img"
                                    width={50}
                                    height={50}
                                  />
                                )}
                                {formData.value.imageFile ? (
                                  <p className="font-medium text-[10px] pt-2 text-center text-[#0E6301]">
                                    Image Uploaded
                                  </p>
                                ) : (
                                  <p className="font-medium text-[10px] text-center">
                                    Drag and drop image here or{' '}
                                    <span
                                      style={{ textDecoration: 'underline' }}
                                      className="text-[#0E6301] block"
                                    >
                                      Choose image
                                    </span>
                                  </p>
                                )}
                              </div>
                            </label>
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="currency"
                            id="address"
                            className="font-medium text-xs text-[#292D32]"
                          >
                            Event name
                          </label>
                          <UiInput
                            name="name"
                            onChange={formData.set}
                            value={formData.value.name}
                            error={errors.name && MessageWithIcon(errors.name)}
                            placeholder="Name your event"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-xs text-[##292D32]">
                            Category
                          </p>
                          <Select
                            styles={customStyles}
                            placeholder="Select Categories"
                            options={categoryOptions}
                            // value={values?.idType}
                            components={{
                              IndicatorSeparator: () => (
                                <div style={{ display: 'none' }}></div>
                              ),
                              DropdownIndicator: () => (
                                <IoIosArrowDown size="15px" color="#646668" />
                              ),
                            }}
                            name="category"
                            onChange={(selectedOption) => {
                              if (selectedOption) {
                                formData.set({
                                  name: 'category',
                                  value: selectedOption?.value,
                                });
                              }
                            }}
                          />
                        </div>
                        <div className="grid mt-4 gap-4">
                          <div className="flex items-center gap-4 ">
                            <div className="flex flex-col gap-[7px]">
                              <p className="font-medium text-xs text-[##292D32]">
                                Start date
                              </p>
                              <DatePicker
                                date={startDate}
                                setDate={setStartDate}
                                label={'Pick start date'}
                              />
                            </div>
                            <div>
                              <p className="font-medium  text-xs text-[#292D32]">
                                Start time
                              </p>
                              <UiInput
                                name="startTime"
                                type="time"
                                onChange={formData.set}
                                value={formData.value.startTime}
                                error={
                                  errors.startTime &&
                                  MessageWithIcon(errors.startTime)
                                }
                                placeholder="0:00"
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex flex-col gap-[7px]">
                              <p className="font-medium text-xs text-[##292D32]">
                                End date
                              </p>
                              <DatePicker
                                date={endDate}
                                setDate={setEndDate}
                                label={'Pick End date'}
                              />
                              {dateError && MessageWithIcon(dateError)}
                            </div>
                            <div>
                              <p className="font-medium text-xs text-[#292D32]">
                                End Time
                              </p>
                              <UiInput
                                name="endTime"
                                type="time"
                                onChange={formData.set}
                                value={formData.value.endTime}
                                error={
                                  errors.endTime &&
                                  MessageWithIcon(errors.endTime)
                                }
                                placeholder="0:00"
                              />
                            </div>
                          </div>
                          <div className="select-wrapper">
                            <TimezonePicker
                              selectedTimezone={selectedTimezone}
                              setSelectedTimezone={setSelectedTimezone}
                            />
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium pb-2 text-xs text-[##292D32]">
                            Location
                          </h4>
                          <div className="flex bg-[#FBFBFB] rounded-[10px] overflow-hidden">
                            {locationTabs.map((tab) => (
                              <button
                                key={tab.value}
                                className={`flex-1 py-[10px] text-center text-xs font-medium transition-colors ${
                                  selectedTab === tab.value
                                    ? 'bg-[#E6E6E6] text-[#000000]'
                                    : 'bg-gray-[#FAFAFA] text-gray-600 hover:bg-gray-100'
                                }`}
                                onClick={() => setSelectedTab(tab.value)}
                              >
                                {tab.label}
                              </button>
                            ))}
                          </div>

                          <div className="bg-[#FBFBFB] p-2">
                            <AnimatePresence mode="wait">
                              {selectedTab === 'Undisclosed' && (
                                <motion.div
                                  key="undisclosed"
                                  initial={{ y: -30, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  exit={{ y: -30, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <p className="mt-4 text-xs text-[#A1A1A1]">
                                    Your location is undisclosed. Update it
                                    anytime on the event management page.
                                  </p>
                                </motion.div>
                              )}

                              {selectedTab === 'Physical' && (
                                <motion.div
                                  key="physical"
                                  initial={{ y: -30, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  exit={{ y: -30, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <input
                                    type="text"
                                    value={location}
                                    onChange={handleChange}
                                    placeholder="Location address"
                                    className="w-full mt-3 border-2 border-[#F1F1F1] rounded-md p-2 text-sm focus:ring-2 focus:ring-gray-800 focus:outline-none placeholder:text-[#A1A1A1] placeholder:text-[12px]"
                                  />
                                </motion.div>
                              )}

                              {selectedTab === 'Virtual' && (
                                <motion.div
                                  key="virtual"
                                  initial={{ y: -30, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  exit={{ y: -30, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <input
                                    type="text"
                                    placeholder="Meeting link"
                                    className="w-full mt-3 border-2 border-[#F1F1F1] rounded-md p-2 text-sm focus:ring-2 focus:ring-gray-800 focus:outline-none placeholder:text-[#A1A1A1] placeholder:text-[12px]"
                                  />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                        <div>
                          <p className="font-medium pb-2 text-xs text-[##292D32]">
                            Description
                          </p>
                          <Textarea
                            className="border-[#F1F1F1] border bg-[#F5F5F5] placeholder:text-[#CBCBCB]  placeholder:text-xs"
                            placeholder="Add a description to encourage guest to attend"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-xs text-[##292D32]">
                            Currency
                          </p>
                          <Select
                            styles={customStyles}
                            placeholder="Select Currency"
                            options={categoryOptions}
                            // value={values?.idType}
                            components={{
                              IndicatorSeparator: () => (
                                <div style={{ display: 'none' }}></div>
                              ),
                              DropdownIndicator: () => (
                                <IoIosArrowDown size="15px" color="#646668" />
                              ),
                            }}
                            name="currency"
                            onChange={(selectedOption) => {
                              if (selectedOption) {
                                formData.set({
                                  name: 'currency',
                                  value: selectedOption.value,
                                });
                              }
                            }}
                          />
                        </div>
                        <div>
                          <div className="flex gap-2">
                            <div className="flex items-center gap-1">
                              <p className="text-xs">
                                Enable auto withdrawal payout method
                              </p>
                              <RiErrorWarningLine className="text-[#F1BB4C]" />
                            </div>
                            <Switch
                              className="h-5 w-9 data-[state=checked]:bg-[#367D2B] data-[state=unchecked]:bg-gray-300 [&>span]:h-3 [&>span]:w-3 [&>span]:bg-white [&>span]:px-1"
                              checked={isEnablePayment}
                              onCheckedChange={handleSwitchChange}
                            />
                          </div>
                          <div className="p-2">
                            <AnimatePresence mode="wait">
                              {isEnablePayment && (
                                <motion.div
                                  key="undisclosed"
                                  initial={{ y: -30, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  exit={{ y: -30, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <div className="bg-[#FBFBFB] pl-2 pr-5 pt-1 rounded-[10px]">
                                    <h5 className="text-xs font-medium pb-2 text-[#292D32]">
                                      Link your bank account{' '}
                                    </h5>
                                    <div>
                                      <p className="font-medium text-xs text-[#6B6A6A]">
                                        Bank name
                                      </p>
                                      <Select<Bank>
                                        options={mappedBanks}
                                        getOptionValue={(e) => e.id.toString()}
                                        getOptionLabel={(e) => e.name}
                                        styles={customBankStyles}
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
                                            <div
                                              style={{ display: 'none' }}
                                            ></div>
                                          ),
                                          DropdownIndicator: () => (
                                            <div>
                                              <IoIosArrowDown
                                                size="15px"
                                                color="#646668"
                                              />
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
                                      <p className="font-medium text-xs pt-2 text-[#6B6A6A]">
                                        Account number
                                      </p>
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
                                      />
                                    </div>
                                    <div className="w-full flex justify-end mt-4 pb-2">
                                      <button className="primary-btn text-xs  rounded-[10px] w-fit  md:mt-0 !py-2">
                                        Link account
                                      </button>
                                    </div>
                                  </div>

                                  <div className="relative max-w-sm rounded-lg bg-[#F5F5F5] pt-2 px-2 pb-4 mt-5">
                                    <div className="text-sm font-medium text-green-600 flex items-center space-x-1">
                                      <span>✨</span>
                                      <span className="bg-gradient-to-r from-[#56AB2F] to-[#A8E063] bg-clip-text text-transparent text-[11px]">
                                        Help centre
                                      </span>
                                    </div>
                                    <h3 className="mt-2 text-sm font-medium text-[#333333]">
                                      What is Auto withdrawal
                                    </h3>
                                    <p className="mt-1 text-xs text-[#8D9091]">
                                      Auto withdrawal ensures that your ticket
                                      sales revenue is automatically transferred
                                      to your linked payout account without
                                      manual intervention.
                                    </p>
                                    <div className="absolute bottom-[-10px] left-4 w-4 h-4 bg-[#F5F5F5] rotate-45 "></div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                        <div className=" pt-3">
                          <h3 className="text-xs font-medium mb-3">
                            Transfer event fees to guests?
                          </h3>
                          <div className="space-y-2 text-xs text-[#6B6A6A]">
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <Input
                                type="radio"
                                name="eventFee"
                                value="addFees"
                                checked={selectedOption === 'addFees'}
                                onChange={() => handleOptionChange('addFees')}
                                className="form-radio w-4 h-4 text-green-600"
                              />
                              <span className="text-gray-800">
                                Yes, add fees to guest checkout
                              </span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <Input
                                type="radio"
                                name="eventFee"
                                value="coverFees"
                                checked={selectedOption === 'coverFees'}
                                onChange={() => handleOptionChange('coverFees')}
                                className="form-radio w-4 h-4 text-green-600"
                              />
                              <span className="text-gray-800">
                                No, I will cover the fees
                              </span>
                            </label>
                          </div>

                          {selectedOption && (
                            <button
                              className="mt-4 flex items-center space-x-2 text-[#0E6301] bg-[#F0FEEE] px-3 py-1 rounded-md hover:bg-green-200"
                              onClick={() => {
                                setShowDetails(!showDetails);
                              }}
                            >
                              <span className="font-medium text-xs">
                                + Add further details
                              </span>
                            </button>
                          )}

                          {showDetails && (
                            <div className="mt-4 p-4 ">
                              <div className="flex justify-between items-center">
                                <label
                                  htmlFor="currency"
                                  id="address"
                                  className="font-medium text-xs text-[#292D32]"
                                >
                                  Further Details
                                </label>
                                <button
                                  className="p-1 rounded-full bg-gray-200"
                                  onClick={() => {
                                    setShowDetails(false);
                                    setSelectedOption('coverFees');
                                  }}
                                >
                                  <IoCloseOutline size={16} />
                                </button>
                              </div>

                              <div className="mt-3">
                                <UiInput
                                  name="moreDescription"
                                  onChange={formData.set}
                                  value={formData.value.moreDescription}
                                  error={
                                    errors.moreDescription &&
                                    MessageWithIcon(errors.moreDescription)
                                  }
                                  placeholder="Something you need to tell your guest"
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="w-full flex justify-end mt-4 pb-2">
                          <button
                            type="submit"
                            className="primary-btn text-xs  rounded-[10px] w-fit  md:mt-0 !py-[11px] !px-6"
                          >
                            Continue
                          </button>
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
