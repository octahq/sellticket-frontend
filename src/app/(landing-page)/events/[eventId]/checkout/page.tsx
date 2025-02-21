'use client'

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

import { events } from '@/api/mock/events';
import EventImg2 from '@/assets/images/event-image2.jpg';
import ThreeTickets from '@/assets/svgs/three-tickets.svg';

import EventCheckoutForm from '@/components/events/EventCheckoutForm';
import CheckoutPaymentModal from '@/components/events/CheckoutPaymentModal';
import ReleaseTicketConfirmationModal from '@/components/events/ReleaseTicketConfirmationModal';
import UiIcon from "@/components/ui/Icon/UiIcon";
import UiAvatar from '@/components/ui/Avatar/UiAvatar';
import UiPill from '@/components/ui/Pill/UiPill';
import UiButton from '@/components/ui/Button/UiButton';

import useToggle from '@/hooks/useToggle';

import { formatTime } from '@/lib/utils';

import { TicketType } from '@/types/Event';

//---

export default function Page() {
  const { eventId } = useParams();
  const router = useRouter();

  const event = events.find((event) => event.id === Number(eventId));

  const [timer, setTimer] = useState(600);

  const isReleaseTicketVisible = useToggle();
  const isCheckoutPaymentVisible = useToggle();
  const isTicketReady = useToggle();

  const ticketDetails = localStorage.getItem('ticketTypeDetails');

  let parsedTicketDetails: { quantity: number; ticketType: TicketType } | null = null;

  parsedTicketDetails = ticketDetails ? JSON.parse(ticketDetails) : null;
  

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

  const TicketReadyBanner = useMemo(
    () => (
      <div className="h-full min-h-[calc(100vh-69px)] py-10 flex justify-center items-center">
        <div className="text-center border border-stroke-100 shadow-auth-card-shadow rounded-xl max-w-[492px] px-[43px] py-6">
          <div className="mx-auto w-full mb-[14px]">
            <ThreeTickets />
          </div>
          <h2 className="mb-[10px] text-2xl font-semibold">
            Your ticket is ready!{' '}
          </h2>
          <p className="mb-[14px] text-sm text-secondary-400">
            Congratulations! You’ve successfully registered for the event. You
            can download your ticket, access it anytime in your email, or view
            it on this page.
          </p>
          <div className="mx-auto w-fit">
            <UiButton size="xl">Download ticket</UiButton>
          </div>
        </div>
      </div>
    ),
    []
  );

  function goBack() {
    window.location.href = `/events/${eventId}`;
    localStorage.removeItem('ticketTypeDetails');
  }

  function openReleaseTicket() {
    isReleaseTicketVisible.on()
  } 

  function openPayment() {
    isCheckoutPaymentVisible.on()
  }

  useEffect(() => {
    if (timer > 0) {
      const timerCountDown = setInterval(() => {
        setTimer((prevCount) => prevCount - 1);
      }, 1000);
      return () => clearInterval(timerCountDown);
    }
  }, [timer]);


    return (
      <div>
        {isTicketReady.value ? (
          TicketReadyBanner
        ) : (
          <div className="pt-6 md:pt-[84px] pb-8 px-6 lg:px-0 max-w-[992px] mx-auto">
            <button
              type="button"
              onClick={goBack}
              className="hidden md:flex gap-2 items-center mb-4"
            >
              <span className="w-6 h-6 rounded-full flex justify-center items-center border border-[#BCBCBC]">
                <UiIcon icon="CaretLeft" size="12" />
              </span>
              <p className="font-medium text-sm text-[#071134]">Back</p>
            </button>
            <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-8 lg:gap-28">
              <aside className="max-w-[300px]">
                <Image
                  src={EventImg2}
                  alt="event image"
                  className="h-[255px] rounded-xl object-cover mb-3 hidden md:block"
                />
                <h2 className="text-xl font-semibold md:font-medium text-black mb-3">
                  {event?.name}
                </h2>
                <div className="hidden md:flex items-center gap-2">
                  <p className="text-sm font-medium text-secondary-300">
                    Organizer
                  </p>
                  <div className="flex items-center gap-1">
                    <div>{renderedAvatars}</div>
                    <p className="text-sm font-semibold text-secondary-700">
                      {hosts}
                    </p>
                  </div>
                </div>
              </aside>
              <main className="md:max-w-[556px] w-full">
                {!parsedTicketDetails && <p>Please select a ticket type</p>}
                {parsedTicketDetails && (
                  <div>
                    <div className="bg-primary-60 py-1 px-2 md:px-[18px] rounded">
                      <p className="text-sm font-medium text-teal-400">
                        We’ve reserved your ticket. Please complete checkout
                        within{' '}
                        <span className="font-semibold text-[#0E6301]">
                          {formatTime(timer)}mins
                        </span>{' '}
                        to secure your tickets.{' '}
                      </p>
                    </div>
                    <div className="mt-[10px] md:p-4">
                      <div>
                        <p className="text-sm text-[#8C8C8C] mb-4">
                          Ticket Information
                        </p>

                        <div className="bg-event-checkout-gradient shadow-input-shadow p-[1.5px] rounded-2xl">
                          <div className="bg-white px-4 py-3 rounded-[15px] flex justify-between items-center">
                            <div className="flex gap-2 items-center">
                              <div className="w-6 h-6 rounded-full flex justify-center items-center bg-[#FFEBEB] stroke-danger-400">
                                <UiIcon icon="X" size="22" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h4>{parsedTicketDetails.ticketType.type}</h4>
                                  <UiPill variant="nude">
                                    <p className="text-[#9E7636]">
                                      Wallet required
                                    </p>
                                  </UiPill>
                                </div>
                                <p className="text-xs font-medium text-[#009F62]">
                                  {parsedTicketDetails.quantity} Quantities
                                </p>
                              </div>
                            </div>
                            <p className="font-medium text-xl">
                              ₦{}
                              {(
                                parsedTicketDetails.quantity *
                                parsedTicketDetails.ticketType.price
                              ).toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-[#8C8C8C] my-6">
                            Personal Information
                          </p>
                          <EventCheckoutForm
                            onOpenReleaseTicket={openReleaseTicket}
                            openPayment={openPayment}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </main>
            </div>
            <ReleaseTicketConfirmationModal
              timer={timer}
              isOpen={isReleaseTicketVisible.value}
              onClose={() => isReleaseTicketVisible.off()}
              realeseTicket={goBack}
            />
            <CheckoutPaymentModal
              readyTicket={() => isTicketReady.on()}
              isOpen={isCheckoutPaymentVisible.value}
              onClose={() => isCheckoutPaymentVisible.off()}
            />
          </div>
        )}
      </div>
    );
}
