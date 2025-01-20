'use client'

import { useState } from "react";

import { events } from "@/api/mock/events";

import EventCard from "@/components/events/EventCard";
import UiButton from "@/components/ui/Button/UiButton";
import UiDropDown, { DropDownData } from "@/components/ui/DropDown/UiDropDown";
import UiTabs, { Tab } from "@/components/ui/Tabs/UiTabs";
import UiIcon from "@/components/ui/Icon/UiIcon";

// --

const Page = () => {
  const [activeEventTab, setActiveEventTab] = useState('activeEvents');

  const eventTabs : Tab[] = [
    {
      title: 'Active events',
      value: 'activeEvents',
      icon: 'Calendar'
    },
    {
      title: 'Past events',
      value: 'pastEvents',
      icon: 'Clock'
    },
    {
      title: 'Draft events',
      value: 'draftEvents',
      icon: 'CalendarEdit'
    },
  ];

  
  return (
    <section className="max-w-[780px]">
      <h2 className="text-xl font-semibold mb-4 text-secondary-800">Events</h2>
      <div className="flex justify-between items-center pb-4 mb-4 border-b border-stroke-100">
        <UiTabs activeTab={activeEventTab} onSelect={(value) => setActiveEventTab(value)} tabs={eventTabs}/>
        <div className="flex items-center gap-3">
          <button className="fill-secondary-800 h-8 px-[10px] rounded-[10px] bg-neutral-500">
            <UiIcon size="24" icon="Filter"/>
          </button>
          <UiButton roundedVariant="md" size="sm">
            <div className="flex items-center gap-1 stroke-white font-semibold">
              <UiIcon size="12" icon="Add"/>
              Create new event
            </div>
          </UiButton>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-[18px]">
        {events.map((event, index)=>(
          <EventCard key={index} event={event}/>
        ))}
      </div>
    </section>
  )
}

export default Page
