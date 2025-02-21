import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

import EventImg2 from '@/assets/images/event-image2.jpg';
import UiAvatar from '../ui/Avatar/UiAvatar';
import Event from '@/types/Event';

export default function EventImageFrame({ event }: { event: Event }) {
  const FrameRope = useMemo(() => {
    return (
      <span className="relative w-3 h-3 bg-[#c3c3c3] rounded-full inset-0 shadow-event-image-frame-hole">
        <div className="absolute bottom-[47.1%] right-[26.4%]">
          <div className="relative bg-[#202020] w-[5px] h-[80px] rounded-b-xl">
            <div className="absolute left-1/2 bottom-[19px] transform -translate-x-1/2">
              <span className="block bg-[#202020] w-[14px] inset-0 h-[5px] rounded-xl"></span>
              <span className="block bg-[#202020] w-[14px] inset-0 h-[5px] rounded-xl"></span>
              <span className="block bg-[#202020] w-[14px] inset-0 h-[5px] rounded-xl"></span>
            </div>
          </div>
        </div>
      </span>
    );
  }, []);

  const hosts = useMemo(() => {
    return event?.hosts.map((host) => host.name).join(',');
  }, [event]);

  const avatars = useMemo(() => {
    return event?.hosts.map((host) => host.avatar);
  }, [event]);

  const renderedAvatars = useMemo(
    () => (
      <span className="flex">
        {avatars?.map((avatar, index) => (
          <div
            key={index}
            style={{
              zIndex: `${avatars.length - index}`,
            }}
            className={`relative z-[${avatars.length - index}] ${index > 0 && '-ml-2'}`}
          >
            <UiAvatar size="xs" SvgAvatar={avatar} />
          </div>
        ))}
      </span>
    ),
    [avatars]
  );

  return (
    <div className="bg-white rounded-2xl p-3 pt-2 shadow-event-image-frame-shadow">
      <div className="flex justify-between px-[34px] mb-2">
        {FrameRope}
        {FrameRope}
      </div>
      <Image
        src={EventImg2}
        alt="event image"
        className="h-[255px] rounded-xl object-cover"
      />
      <div className="mt-4 flex justify-between items-center">
        <div>
          <p className="text-secondary-300 text-xs font-medium mb-1">
            Organizer
          </p>
          <div className="flex items-center gap-[2px]">
            {renderedAvatars}
            <p className="text-xs">{hosts}</p>
          </div>
        </div>
        <Link href="">
          <button className="text-[14px] bg-[#FAFAFA] hover:bg-[#f5f5f5] transition-colors duration-150 ease-in border border-[#DDE0E4] h-6 flex items-center text-secondary-500 px-2 rounded-xl font-medium shadow-view-profile">
            Visit profile
          </button>
        </Link>
      </div>
    </div>
  );
}
