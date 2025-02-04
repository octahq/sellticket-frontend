'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IoCloseOutline } from 'react-icons/io5';
import { validateEventDetails } from '@/utils/schemas/addEventSchema';
import useObjectState from '@/hooks/useObjectState';
import UiForm from '../ui/Form/UiForm';
import UiInput from '../ui/Input/UiInput';
import UiButton from '../ui/Button/UiButton';
import Select, { StylesConfig } from 'react-select';
import { IoIosArrowDown } from 'react-icons/io';
import UiIcon from '../ui/Icon/UiIcon';
import { TbWorld } from 'react-icons/tb';
import img from '../../assets/images/uploadfile.png';
import Image from 'next/image';
import { eventCategories } from '../common/constants';
import { SingleValue } from '@/types/types';
import { DatePicker } from '../ui/DatePicker';
import TimezoneSelect, { type ITimezone } from 'react-timezone-select';

interface Props {
  active: boolean;
  setActive: (active: boolean) => void;
}

export function AddEventDrawer({ active, setActive }: Props) {
  const [selectedTimezone, setSelectedTimezone] = useState<ITimezone>(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
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
  });
  const [selectedTab, setSelectedTab] = useState('Undisclosed');

  const tabs = [
    { label: 'Undisclosed', value: 'Undisclosed' },
    { label: 'Physical', value: 'Physical' },
    { label: 'Virtual', value: 'Virtual' },
  ];
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const handleSubmit = () => {};

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

  const customStyles: StylesConfig<SingleValue, false> = {
    control: (provided) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#f9f9f9',
      border: '1px solid #F1F1F1',
      borderRadius: '10px',
      boxShadow: 'none',
      minHeight: '44px',
      padding: '0 12px',
      fontSize: '12px',
      color: '#000',
      '&:hover': {
        backgroundColor: '#f4f4f4',
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
      display: 'none', // Remove the separator line
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
  const MessageWithIcon = (message: string) => (
    <div className="flex gap-1">
      <UiIcon icon="Danger" size="10" />
      {message}
    </div>
  );

  console.log(formData);

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
          <div className="fixed inset-0 flex justify-end z-50 overflow-y-scroll">
            <motion.div
              className="bg-white  h-full shadow-lg w-[470px] max-w-full px-5 py-6"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Create Event</h2>
                <button
                  className="p-1 rounded-full bg-gray-200"
                  onClick={() => setActive(false)}
                >
                  <IoCloseOutline size={16} />
                </button>
              </div>
              <div className="grid gap-3 mt-5">
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
                            className="grid place-items-center border border-[#CFE0CC] rounded-[10px] h-[135px]   "
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
                            htmlFor="address"
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
                            grayBgInput
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
                                  value: selectedOption.name,
                                });
                              }
                            }}
                          />
                        </div>
                        <div className="grid mt-4 gap-4">
                          <div className="flex items-center gap-4 flex-col sm:flex-row">
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
                              <label
                                htmlFor="address"
                                id="address"
                                className="font-medium  text-xs text-[#292D32]"
                              >
                                Time
                              </label>
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
                                grayBgInput
                              />
                            </div>
                            <div className="select-wrapper">
                              <p className="font-medium pb-1 text-xs text-[##292D32]">
                                Time zone
                              </p>
                              <TimezoneSelect
                                value={selectedTimezone}
                                onChange={setSelectedTimezone}
                                styles={customStyles}
                                components={{
                                  DropdownIndicator: () => (
                                    <TbWorld size="15px" color="#646668" />
                                  ), // Custom dropdown icon
                                }}
                              />
                            </div>
                          </div>
                          <p className="text-center text-xs">to</p>
                          <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex flex-col gap-[7px]">
                              <DatePicker
                                date={endDate}
                                setDate={setEndDate}
                                label={'Pick End date'}
                              />
                            </div>
                            <div>
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
                                grayBgInput
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium  text-xs text-[##292D32]">
                            Location
                          </h4>
                          <div className="flex  rounded-[10px] overflow-hidden">
                            {tabs.map((tab) => (
                              <button
                                key={tab.value}
                                className={`flex-1 py-[10px]  text-center text-xs font-medium transition-colors ${
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
                          <div className="bg-[#FBFBFB] py-2">
                            {selectedTab === 'Undisclosed' && (
                              <p className="mt-4 text-xs text-[#A1A1A1]">
                                Your location would be displayed as undisclosed
                                on the event page. You can always make
                                adjustments from your event management page.
                              </p>
                            )}

                            {selectedTab === 'Physical' && (
                              <input
                                type="text"
                                placeholder="Location address"
                                className="w-full mt-3 border-2 border-[#F1F1F1] rounded-md p-2 text-sm focus:ring-2 focus:ring-gray-800 focus:outline-none placeholder:text-[#A1A1A1] placeholder:text-[12px]"
                              />
                            )}

                            {selectedTab === 'Virtual' && (
                              <input
                                type="text"
                                placeholder="Meeting link"
                                className="w-full mt-3 border-2 border-[#F1F1F1] rounded-md p-2 text-sm focus:ring-2 focus:ring-gray-800 focus:outline-none placeholder:text-[#A1A1A1] placeholder:text-[12px]"
                              />
                            )}
                          </div>
                        </div>
                        {/* <div className="flex gap-2 mt-5 mb-2">
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

                          <UiButton block>Continue</UiButton>
                        </div> */}
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
