'use client';

import { useState } from 'react';

import { events } from '@/api/mock/events';

import EventCard from '@/components/events/EventCard';
import UiButton from '@/components/ui/Button/UiButton';
import UiTabs, { Tab } from '@/components/ui/Tabs/UiTabs';
import UiIcon from '@/components/ui/Icon/UiIcon';
import { AddEventDrawer } from '@/components/Modals/AddEvent';

// --

const Page = () => {
  const [activeEventTab, setActiveEventTab] = useState('activeEvents');
  const [isOpen, setIsOpen] = useState(false);

  const eventTabs: Tab[] = [
    {
      title: 'Active events',
      value: 'activeEvents',
      icon: 'Calendar',
    },
    {
      title: 'Past events',
      value: 'pastEvents',
      icon: 'Clock',
    },
    {
      title: 'Draft events',
      value: 'draftEvents',
      icon: 'CalendarEdit',
    },
  ];

  return (
    <section className="relative lg:w-[90%] pt-8 sm:pt-0">
      <div className="fixed top-[98.9px] sm:relative sm:top-0 bg-white z-10  flex w-full gap-2 justify-between items-center sm:pb-4 mb-4  sm:border-b sm:border-stroke-100">
        <div className="flex-1 overflow-x-auto hide-scroll-bar rounded-[20px]">
          <UiTabs
            activeTab={activeEventTab}
            onSelect={(value) => setActiveEventTab(value)}
            tabs={eventTabs}
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="hidden sm:block fill-secondary-800 h-8 px-[10px] rounded-[10px] bg-neutral-500">
            <UiIcon size="24" icon="Filter" />
          </button>
          <div className="hidden sm:block">
            <UiButton roundedVariant="md" size="sm">
              <div
                className="flex items-center gap-1 stroke-white font-semibold"
                onClick={() => setIsOpen(true)}
              >
                <UiIcon size="12" icon="Add" />
                Create new event
              </div>
            </UiButton>
          </div>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-[18px]">
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
      <button
        className="fixed sm:hidden bottom-[10%] right-6 w-[50px] h-[50px] rounded-full flex justify-center items-center bg-secondary-gradient stroke-white"
        onClick={() => setIsOpen(true)}
      >
        <UiIcon icon="Add" size="24" />
      </button>
      <AddEventDrawer active={isOpen} setActive={setIsOpen} />
    </section>
  );
};

export default Page;
