import { formattDate } from '@/lib/utils';
import UiIcon from '../ui/Icon/UiIcon';
import Event from '@/types/Event';

// ---

interface Props {
  event: Event;
}

export default function EventDateandLocation({ event }: Props) {
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
          <p className="text-xs text-secondary-400">{event && event.address}</p>
        </div>
      </div>
    </div>
  );
}
