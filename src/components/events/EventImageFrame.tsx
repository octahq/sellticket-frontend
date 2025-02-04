import Image from 'next/image';
import { useMemo } from 'react';

import EventImg2 from '@/assets/images/event-image2.jpg';

export default function EventImageFrame() {
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
    </div>
  );
}
