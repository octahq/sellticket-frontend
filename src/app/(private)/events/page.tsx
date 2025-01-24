'use client';

import { useState } from 'react';

import { events } from '@/api/mock/events';

import EventCard from '@/components/events/EventCard';
import UiButton from '@/components/ui/Button/UiButton';
import UiTabs, { Tab } from '@/components/ui/Tabs/UiTabs';
import UiIcon from '@/components/ui/Icon/UiIcon';

// --

const Page = () => {
  const [activeEventTab, setActiveEventTab] = useState('activeEvents');

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
    <section className=" lg:w-[90%]">
      <h2 className="text-xl font-semibold mb-4 text-secondary-800">Events</h2>
      <div className="flex gap-2 justify-between items-center sm:pb-4 mb-4  sm:border-b sm:border-stroke-100">
        <div className="flex-1 overflow-x-auto hide-scroll-bar rounded-[20px]">
          <UiTabs
            activeTab={activeEventTab}
            onSelect={(value) => setActiveEventTab(value)}
            tabs={eventTabs}
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="fill-secondary-800 h-8 px-[10px] rounded-[10px] bg-neutral-500">
            <UiIcon size="24" icon="Filter" />
          </button>
          <div className="hidden sm:block">
            <UiButton roundedVariant="md" size="sm">
              <div className="flex items-center gap-1 stroke-white font-semibold">
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
      <button className="absolute sm:hidden bottom-[10%] right-6 w-[50px] h-[50px] rounded-full flex justify-center items-center bg-secondary-gradient stroke-white">
        <UiIcon icon="Add" size="24" />
      </button>
    </section>
  );
};

export default Page;
