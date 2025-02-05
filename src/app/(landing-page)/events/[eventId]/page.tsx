'use client';

import { useParams } from 'next/navigation';
import EventImageFrame from '@/components/events/EventImageFrame';

export default function Page() {
  const { eventId } = useParams();
  return (
    <div className="flex justify-center gap-[53px] pt-[65px]">
      <aside className="flex-1 max-w-[324px]">
        <EventImageFrame />
      </aside>
      <main className="max-w-[390px] flex-1">main content</main>
    </div>
  );
}
