'use client';

import { useParams } from 'next/navigation';  

import { events } from '@/api/mock/events';

import EventImageFrame from '@/components/events/EventImageFrame';
import UiPill from '@/components/ui/Pill/UiPill';
import UiDropDown, {DropDownData} from '@/components/ui/DropDown/UiDropDown';
import UiIcon from '@/components/ui/Icon/UiIcon';
import TicketIndicatior from '@/components/events/TicketIndicatior';

import { formattDate } from '@/lib/utils';
import { useMemo } from 'react';
import UiMap from '@/components/ui/Map/UiMap';
import UiButton from '@/components/ui/Button/UiButton';
import UiSelect, { Option } from '@/components/ui/Select/UiSelect';

// ---

export default function Page() {
  const { eventId } = useParams();
  const event = events.find((event) => event.id === Number(eventId)) 
  
  const dropDownOptions: DropDownData[] = [
    {
      label: (
        <div className="flex gap-[6px]">
          <UiIcon icon="Link" size="14" />
          Copy event link
        </div>
      ),
      func: () => {},
    },
    {
      label: (
        <div className="flex gap-[6px]">
          <UiIcon icon="Flag" size="14" />
          Report event
        </div>
      ),
      func: () => {},
    },
  ];

  const ticketTypeOptions: Option[] = [
    {
      label: (
        <div className="flex justify-between">
          <p>Regular</p>
          <UiPill size='md'  variant='nude'>Free</UiPill>
          <p>₦0.0</p>
        </div>
      ),
      value: 'regular',
    },
    {
      label: (
        <div className="flex justify-between">
          <p>VIP</p>
          <p>₦100.0</p>
        </div>
      ),
      value: 'vip',
    },
    {
      label: (
        <div className="flex justify-between">
          <p>VVIP</p>
          <p>₦0.0</p>
        </div>
      ),
      value: 'vvip',
    },
  ];

  const EventDateandLocation = useMemo(() => {
    return (
      <div className="py-[6px] px-2 rounded-[10px] border border-[#CAE0C4] bg-success-50 backdrop-blur-lg">
        <div className="flex gap-[6px] mb-2">
          <UiIcon icon="CalendarGreen" size="18" />
          <div className="max-w-[200px]">
            <h3 className="text-xs font-semibold text-secondary-700 mb-1">
              {event && formattDate(event.date, 'dddd, MMMM D, YYYY')}
            </h3>
            <p className="text-xs text-secondary-400">6:00 PM - 11:00 PM WAT</p>
          </div>
        </div>
        <div className="flex gap-[6px]">
          <UiIcon icon="LocationGreen" size="18" />
          <div className="max-w-[200px]">
            <h3 className="text-xs font-semibold text-secondary-700 mb-1">
              {event && event.location}
            </h3>
            <p className="text-xs text-secondary-400">
              {event && event.address}
            </p>
          </div>
        </div>
      </div>
    );
  }, [event]);

  if (!event) {
    return 'no event found'
  }
    return (
      <div className="flex flex-col items-center md:items-start md:flex-row justify-center gap-[18px] sm:gap-[53px] pt-[65px] px-5 lg:px-6 border border-red-400">
        <aside className="flex-1 xs:max-w-[324px]">
          <EventImageFrame event={event} />
          <div className="bg-white rounded-2xl p-3 mt-4 shadow-event-image-frame-shadow">
            <h3 className="text-[#121212] text-sm font-medium mb-4">
              Select your ticket
            </h3>
            <UiSelect
              variant="shadow"
              size="sm"
              name=""
              onChange={() => {}}
              options={ticketTypeOptions}
              placeholder="Select the ticket"
              value=""
            />
          </div>
        </aside>
        <main className="md:max-w-[390px] flex-1 pb-8">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-secondary-800">
              {event?.name}
            </h2>
            <UiDropDown
              trigger={<UiIcon icon="ThreeDotsVerticalGrey" size="24" />}
              options={dropDownOptions}
              triggerSize="lg"
            />
          </div>
          <div className="mt-2 mb-4 flex items-center gap-1 md:gap-2">
            <UiPill variant="warning">
              <UiIcon icon="Fire" size="12" />
              Trending
            </UiPill>
            <UiPill>
              <TicketIndicatior
                ticketsLeft={event?.unitsLeft as number}
                totalTickets={100}
              />
              {event?.unitsLeft} tickets left
            </UiPill>
            <span className="w-[3px] h-[3px] rounded-full bg-secondary-500"></span>
            <p className="text-sm text-secondary-500">11 days left to event</p>
          </div>
          {EventDateandLocation}
          <div className="mb-4">
            <h3 className="mt-4 text-sm font-medium text-secondary-800 mb-2">
              About the event
            </h3>
            <UiPill>Concert</UiPill>
            <p className="text-sm mt-2 text-[#808080]">{event.description}</p>
          </div>
          <div>
            <h3 className=" text-sm font-medium text-secondary-800 mb-2">
              Venue Direction
            </h3>
            <div className="mb-4">
              <UiMap lng={3.42514} lat={6.43789} />
            </div>
          </div>
          <div>
            <h3 className="mt-4 text-sm font-medium text-secondary-800 mb-2">
              Further details
            </h3>
            <p className="text-xs text-[#808080]">
              Entry is through Gate B. Please arrive 30 minutes early for
              security checks.
            </p>
          </div>
          <div>
            <h3 className="mt-4 text-xs font-medium text-secondary-800 mb-2">
              Event Socials
            </h3>
            <div className="flex gap-2">
              <UiIcon icon="TelegramRounded" size="24" />
              <UiIcon icon="FacebookRounded" size="24" />
              <UiIcon icon="TwitterRounded" size="24" />
            </div>
          </div>
          <div className="md:hidden mt-6">
            <UiButton block>Get ticket</UiButton>
          </div>
        </main>
      </div>
    );
}
