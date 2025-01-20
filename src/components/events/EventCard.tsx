import Image from "next/image";
import { useMemo } from "react";

import EventImage from '@/assets/images/event-image.jpg';

import Event from "@/types/Event";

import UiAvatar from "@/components/ui/Avatar/UiAvatar";
import UiButton from "../ui/Button/UiButton"
import UiIcon from "../ui/Icon/UiIcon"
import  UiDropDown, { DropDownData } from "../ui/DropDown/UiDropDown";

interface Props {
  event: Event
}

export default function EventCard({ event }: Props) {
  const dropDownOptions : DropDownData[] = [
    {
      label: (
        <div className="flex gap-[6px]">
          <UiIcon icon="Edit" size="14"/>
          Edit event
        </div>
      ),
      func: ()=>{}
    },
    {
      label: (
        <div className="flex gap-[6px]">
          <UiIcon icon="Trash" size="14"/>
          Delete event
        </div>
      ),      
      func: ()=>{}
    }
  ];

  const hosts = useMemo(()=>{
    return event.hosts.map((host)=> host.name).join(',')
  },[event]);

  const avatars = useMemo(() => {
    return event.hosts.map((host) => host.avatar)
  }, [event]);

  return (
    <article 
      className="p-4 bg-neutral-200 rounded-[10px] hover:shadow-event-card-shadow transition-shadow duration-300"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <span className="flex">
              {avatars.map((avatar, index)=> (
                <div 
                  key={index}
                  style={{
                    zIndex: `${avatars.length - index}`
                  }}
                  className={`relative z-[${avatars.length - index}] ${index > 0 && '-ml-4'}`}>
                    <UiAvatar size="sm"  SvgAvatar={avatar}/>
                </div>
              ))}
            </span>
            <div>
              <p className="text-[8px] mb-[2px] font-medium text-secondary-300">Hosted by</p>
              <p className="text-[10px] font-semibold text-secondary-700">{hosts}</p>
            </div>
          </div>
          <UiDropDown options={dropDownOptions}/>
        </div>
        <Image className="rounded-xl w-full h-[206] mb-4" src={EventImage} alt=''/>
        <h3 className="text-lg leading-[22px] font-bold text-secondary-700 mb-2">{event.name}</h3>
        <span className="flex items-center gap-1 mb-2">
          <UiIcon icon={event.ticketsSold > 0 ? 'TicketGreen' : 'TicketRed'} size="14"/>
            <p className="text-[10px] leading-3 font-medium text-secondary-600">{event.ticketsSold} Tickets sold</p>
        </span>
        <UiButton variant="tertiary" roundedVariant="md" block injectedClasses="!h-[27px] text-xs">
          Manage event
        </UiButton>
    </article>
  )
}
