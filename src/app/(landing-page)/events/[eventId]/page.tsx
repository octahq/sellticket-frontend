'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { events } from '@/api/mock/events';

import EventDateandLocation from '@/components/events/EventDateandLocation';
import EventImageFrame from '@/components/events/EventImageFrame';
import SelectTicket from '@/components/events/SelectTicket';
import SelectTicketModal from '@/components/events/SelectTicketModal';
import TicketIndicatior from '@/components/events/TicketIndicatior';
import UiButton from '@/components/ui/Button/UiButton';
import UiDropDown, { DropDownData } from '@/components/ui/DropDown/UiDropDown';
import UiIcon from '@/components/ui/Icon/UiIcon';
import UiMap from '@/components/ui/Map/UiMap';
import UiPill, { PillVariantType } from '@/components/ui/Pill/UiPill';

import useObjectState from '@/hooks/useObjectState';
import useToggle from '@/hooks/useToggle';
import { TicketPayment } from '@/types/enums/TicketPayment';
import { TicketType } from '@/types/Event';

// ---

export default function Page() {
  const { eventId } = useParams();
  const router = useRouter()
  const event = events.find((event) => event.id === Number(eventId));
  const formData = useObjectState({
    ticketType: '',
  });

  const [activeTicketType, setActiveTicketType] = useState<TicketType | null>(null);

  const isSelectTicketModalVisible = useToggle();

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

  function handleActiveTicketType(ticketType: TicketType) {
    setActiveTicketType(ticketType)
  }

  
  function getTicketPillVariant(
    ticketPayment: TicketPayment
  ): PillVariantType {
    if(ticketPayment === TicketPayment.TOKEN_GATED){
      return 'lilac'
    } else if(ticketPayment === TicketPayment.PAID) {
      return  'peach'
    }
    return 'nude'
  }

  function getTicketText  () {
    if(activeTicketType?.payment === TicketPayment.PAID) {
      return 'Purchase ticket'
    } else if (activeTicketType?.payment === TicketPayment.TOKEN_GATED) {
      return 'Connect wallet';
    }
    return 'Get ticket';
  }

  if (!event) {
    return 'no event found';
  }

  return (
    <div className="flex flex-col items-center md:items-start md:flex-row justify-center gap-[18px] sm:gap-[53px] pt-[65px] px-5 lg:px-6">
      <aside className="flex-1 xs:max-w-[350px]">
        <EventImageFrame event={event} />
        <div className="hidden md:block">
          <div className="bg-white rounded-2xl p-3 mt-4 shadow-event-image-frame-shadow">
            <SelectTicket
              activeTicketType={activeTicketType}
              event={event}
              handleActiveTicketType={handleActiveTicketType}
              closeSelectTicketModal={() => isSelectTicketModalVisible.off()}
            />
          </div>
        </div>
      </aside>
      <main className="md:max-w-[390px] flex-1 pb-8">
        <div className="flex justify-between items-start">
          <h2 className="text-xl md:text-2xl font-bold text-secondary-800">
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
        <EventDateandLocation event={event} />
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
            Entry is through Gate B. Please arrive 30 minutes early for security
            checks.
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
        <div onClick={() => isSelectTicketModalVisible.on()} className="md:hidden mt-6">
          <UiButton block>Get ticket</UiButton>
        </div>
      </main>
      <SelectTicketModal
        activeTicketType={activeTicketType}
        event={event}
        handleActiveTicketType={handleActiveTicketType}
        isOpen={isSelectTicketModalVisible.value}
        onClose={() => isSelectTicketModalVisible.off()}
      />
    </div>
  );
}
