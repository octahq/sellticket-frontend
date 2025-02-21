import SelectTicket from './SelectTicket';

import UiModal from '../ui/Modal/UiModal';
import Event, { TicketType } from '@/types/Event';
import UiIcon from '../ui/Icon/UiIcon';

// ---

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
  event: Event;
  activeTicketType: TicketType | null;
  handleActiveTicketType: (ticketType: TicketType) => void;
}

export default function SelectTicketModal({
  isOpen,
  onClose,
  activeTicketType,
  event,
  handleActiveTicketType,
}: Props) {
  return (
    <UiModal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="w-12 h-12 flex items-center justify-center border border-[#E9EAEB] stroke-secondary-700 rounded-[10px] shadow-atm-card">
          <UiIcon icon="Ticket2" size="24" />
        </div>
      }
    >
      <div className="mt-3 pb-6">
        <div className="pb-3 mb-[18px] border-b border-stroke-100">
          <h2 className="font-bold text-secondary-700 text-xl">Get ticket</h2>
        </div>
        <SelectTicket
          activeTicketType={activeTicketType}
          closeSelectTicketModal={onClose}
          event={event}
          handleActiveTicketType={handleActiveTicketType}
        />
      </div>
    </UiModal>
  );
}
