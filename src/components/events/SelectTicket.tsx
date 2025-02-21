import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

import UiForm from '../ui/Form/UiForm';
import UiSelect, { Option } from '../ui/Select/UiSelect';
import UiPill, { PillVariantType } from '../ui/Pill/UiPill';

import useObjectState from '@/hooks/useObjectState';

import { TicketPayment } from '@/types/enums/TicketPayment';
import Event, { TicketType } from '@/types/Event';
import UiIcon from '../ui/Icon/UiIcon';
import UiButton from '../ui/Button/UiButton';

// ---

interface Props {
  event: Event;
  activeTicketType: TicketType | null;
  handleActiveTicketType: (ticketType: TicketType) => void;
  closeSelectTicketModal: VoidFunction;
}

export default function SelectTicket({
  event,
  activeTicketType,
  handleActiveTicketType,
  closeSelectTicketModal,
}: Props) {
  const formData = useObjectState({
    ticketType: '',
  });

  const [ticketUnit, setTicketUinit] = useState(1);
  const router = useRouter();

  function getTicketPillVariant(ticketPayment: TicketPayment): PillVariantType {
    if (ticketPayment === TicketPayment.TOKEN_GATED) {
      return 'lilac';
    } else if (ticketPayment === TicketPayment.PAID) {
      return 'peach';
    }
    return 'nude';
  }

  const ticketVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: 'easeIn' },
    },
  };

  const isTicketTypeSelected = useMemo(() => {
    return formData.value.ticketType !== '';
  }, [formData.value.ticketType]);

  const ticketTypeOptions = event?.ticketTypes.map((ticket) => ({
    label: (
      <div className="flex justify-between min-w-full">
        <div className="flex gap-2">
          <p>{ticket.type}</p>
          <UiPill size="md" variant={getTicketPillVariant(ticket.payment)}>
            {ticket.payment}
          </UiPill>
        </div>
        <p>₦{ticket.price}</p>
      </div>
    ),
    value: ticket.type,
    func: () => {
      handleActiveTicketType(ticket);
    },
  }));

  function saveTicketToLocalStorage() {
    const ticketObj = {
      quantity: ticketUnit,
      ticketType: activeTicketType,
    };

    localStorage.setItem('ticketTypeDetails', JSON.stringify(ticketObj));
  }

  function getTicketText() {
    if (activeTicketType?.payment === TicketPayment.PAID) {
      return 'Purchase ticket';
    } else if (activeTicketType?.payment === TicketPayment.TOKEN_GATED) {
      return 'Connect wallet';
    }
    return 'Get ticket';
  }

  function increaseUnit() {
    setTicketUinit((prevUnit) => prevUnit + 1);
  }

  function decreaseUnit() {
    if (ticketUnit > 1) {
      setTicketUinit((prevUnit) => prevUnit - 1);
    }
  }

  function onSubmit() {
    saveTicketToLocalStorage();
    closeSelectTicketModal();
    router.push(`/events/${event.id}/checkout`);
  }

  return (
    <div>
      <h3 className="text-[#121212] text-sm font-medium mb-4">
        Select your ticket
      </h3>
      <div>
        <UiForm formData={formData.value} onSubmit={onSubmit}>
          {({ errors }) => (
            <div>
              <div className="z-10 relative">
                <UiSelect
                  variant="shadow"
                  size="sm"
                  name="ticketType"
                  onChange={formData.set}
                  options={ticketTypeOptions as Option[]}
                  placeholder="Select the ticket"
                  value=""
                />
              </div>
              <AnimatePresence>
                {isTicketTypeSelected && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={ticketVariants}
                  >
                    <div className="flex justify-between pb-1 px-2 pt-3 -mt-2  bg-neutral-500 rounded-b-[10px]">
                      <p className="text-xs font-semibold text-[#7A7A7A]">
                        How many tickets
                      </p>
                      <div className="text-sm flex items-center gap-[6px]">
                        <button
                          type="button"
                          onClick={decreaseUnit}
                          className="w-3 h-3 rounded-full bg-[#DFDFDF] stroke-secondary-700 flex justify-center items-center"
                        >
                          <p className="h-1 mb-[1px] flex justify-center items-center text-secondary-700">
                            {' '}
                            -
                          </p>
                        </button>
                        <span className="text-[#071134]">{ticketUnit}</span>
                        <button
                          type="button"
                          onClick={increaseUnit}
                          className="w-3 h-3 rounded-full bg-[#DFDFDF] stroke-secondary-700 flex justify-center items-center"
                        >
                          <UiIcon icon="Add" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <div className="mt-4 flex justify-between gap-3">
                        <input
                          value=""
                          onChange={() => {}}
                          placeholder="Discount code"
                          className="border border-stroke-100 rounded-[10px] h-[34px] focus:outline-none px-4 py-0  text-sm placeholder:text-sm"
                        />
                        <button className="bg-neutral-300 hover:bg-[#d7d7d7] rounded-[10px] h-[34px] px-4 text-secondary-700 font-medium transition-colors duration-150 ease-in">
                          Redeem
                        </button>
                      </div>
                      <div className="flex justify-between mt-4 font-semibold text-sm mb-4">
                        <p>Total</p>
                        {activeTicketType && (
                          <p>₦{activeTicketType.price * ticketUnit}</p>
                        )}
                      </div>
                      <UiButton type="submit" size="md" block>
                        <p className="text-base">{getTicketText()}</p>
                      </UiButton>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </UiForm>
      </div>
    </div>
  );
}
