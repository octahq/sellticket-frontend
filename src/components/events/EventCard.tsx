import Link from 'next/link';
import Image from 'next/image';
import { useMemo } from 'react';

import EventImage from '@/assets/images/event-image.jpg';

import Event from '@/types/Event';

import UiAvatar from '@/components/ui/Avatar/UiAvatar';
import UiButton from '../ui/Button/UiButton';
import UiIcon from '../ui/Icon/UiIcon';
import UiDropDown, { DropDownData } from '../ui/DropDown/UiDropDown';

// --

interface Props {
  event: Event;
}

export default function EventCard({ event }: Props) {
  const dropDownOptions: DropDownData[] = [
    {
      label: (
        <div className="flex gap-[6px]">
          <UiIcon icon="Edit" size="14" />
          Edit event
        </div>
      ),
      func: () => {},
    },
    {
      label: (
        <div className="flex gap-[6px]">
          <UiIcon icon="Trash" size="14" />
          Delete event
        </div>
      ),
      func: () => {},
    },
  ];

  const hosts = useMemo(() => {
    return event.hosts.map((host) => host.name).join(',');
  }, [event]);

  const avatars = useMemo(() => {
    return event.hosts.map((host) => host.avatar);
  }, [event]);

  const renderedAvatars = useMemo(
    () => (
      <span className="flex">
        {avatars.map((avatar, index) => (
          <div
            key={index}
            style={{
              zIndex: `${avatars.length - index}`,
            }}
            className={`relative z-[${avatars.length - index}] ${index > 0 && '-ml-4'}`}
          >
            <UiAvatar size="sm" SvgAvatar={avatar} />
          </div>
        ))}
      </span>
    ),
    [avatars]
  );

  const MobileEventCard = useMemo(
    () => (
      <article className="lg:hidden flex items-start py-1 gap-3">
        <Image
          src={EventImage}
          alt="event image"
          className="object-cover w-[104px]  rounded-[10px] "
        />
        <div className="pt-1  w-full flex-1">
          <div className="flex mb-[6px]">
            {renderedAvatars}
            <div>
              <p className="text-[8px] mb-[2px] font-medium text-secondary-300">
                Hosted by
              </p>
              <p className="text-[10px] font-semibold text-secondary-600">
                {hosts}
              </p>
            </div>
          </div>
          <h3 className="text-sm leading-[22px] font-bold text-secondary-700 mb-2 line-clamp-1">
            {event.name}
          </h3>
          <span className="text-xs font-medium text-success-700 p-[2px] bg-[#F6FDF4]">
            {event.ticketsSold} Tickets sold
          </span>
        </div>
      </article>
    ),
    [hosts, renderedAvatars, event]
  );

  return (
    <>
      {/* desktop card */}
      <article className="hidden lg:block group p-4 bg-neutral-200 rounded-[10px]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            {renderedAvatars}
            <div>
              <p className="text-[10px] mb-[2px] font-medium text-secondary-300">
                Hosted by
              </p>
              <p className="text-xs font-semibold text-secondary-700">
                {hosts}
              </p>
            </div>
          </div>
          <UiDropDown options={dropDownOptions} />
        </div>
        <div className="relative overflow-hidden border-2 border-transparent group-hover:border-primary-500 transition-all duration-300 h-[206px] rounded-xl">
          <div className="absolute z-10 opacity-0 rounded-xl inset-0 group-hover:opacity-100 transition-opacity duration-300 top-0 left-0 bg-[#0f0f0f71] w-full h-full flex justify-center items-center">
            <Link
              href=""
              className="absolute bottom-4 right-4 w-9 h-9 flex justify-center items-center bg-white rounded-full stroke-black transition-transform duration-300 -translate-x-3 group-hover:translate-x-0"
            >
              <UiIcon icon="ArrowRight" size="20" />
            </Link>
          </div>
          <Image
            className="w-full h-full mb-4 ransition-transform duration-300 group-hover:scale-110"
            src={EventImage}
            alt="event image"
          />
        </div>
        <h3 className="text-lg leading-[22px] font-bold text-secondary-700 mb-2">
          {event.name}
        </h3>
        <span className="flex items-center gap-1 mb-2">
          <UiIcon
            icon={event.ticketsSold > 0 ? 'TicketGreen' : 'TicketRed'}
            size="14"
          />
          <p className="text-[11px] leading-3 font-medium text-secondary-600">
            {event.ticketsSold} Tickets sold
          </p>
        </span>
        <Link href="">
          <UiButton
            variant="tertiary"
            roundedVariant="md"
            block
            injectedClasses="!h-[27px] text-xs"
          >
            Manage event
          </UiButton>
        </Link>
      </article>

      {/* mobile card */}
      {MobileEventCard}
    </>
  );
}
