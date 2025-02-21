/**
 * This component renders icons used throughout the our applications
 * icons are imported in their svg formats in alphabetical order
 */

import Add from '@/assets/svgs/add.svg';
import ArrowLeft from '@/assets/svgs/arrow-left.svg';
import ArrowRight from '@/assets/svgs/arrow-right.svg';
import Card from '@/assets/svgs/card.svg';
import CardTransfer from '@/assets/svgs/card-transfer.svg';
import CaretLeft from '@/assets/svgs/caret-left.svg';
import Calendar from '@/assets/svgs/calendar.svg';
import CalendarEdit from '@/assets/svgs/calendar-edit.svg';
import CalendarGreen from '@/assets/svgs/calendar-green.svg';
import Check from '@/assets/svgs/check.svg';
import Clock from '@/assets/svgs/clock.svg';
import Danger from '@/assets/svgs/danger.svg';
import Edit from '@/assets/svgs/edit.svg';
import FacebookRounded from '@/assets/svgs/facebook-rounded.svg';
import Filter from '@/assets/svgs/filter.svg';
import Fire from '@/assets/svgs/fire.svg';
import Flag from '@/assets/svgs/flag.svg';
import Hamburger from '@/assets/svgs/hamburger.svg';
import Link from '@/assets/svgs/link.svg';
import LocationGreen from '@/assets/svgs/location-green.svg';
import Login from '@/assets/svgs/login.svg';
import Message from '@/assets/svgs/message.svg';
import MessageNotification from '@/assets/svgs/message-notification.svg';
import MessageSparkle from '@/assets/svgs/message-sparkle.svg';
import TelegramRounded from '@/assets/svgs/telegram-rounded.svg';
import ThreeDotsVertical from '@/assets/svgs/three-dots-vertical.svg';
import ThreeDotsVerticalGrey from '@/assets/svgs/three-dots-vertical-grey.svg';
import Ticket from '@/assets/svgs/ticket.svg';
import Ticket2 from '@/assets/svgs/ticket-2.svg';
import TicketGreen from '@/assets/svgs/ticket-green.svg';
import TicketRed from '@/assets/svgs/ticket-red.svg';
import Timer from '@/assets/svgs/timer.svg';
import Trash from '@/assets/svgs/trash.svg';
import TwitterRounded from '@/assets/svgs/twitter-rounded.svg';
import TwoUser from '@/assets/svgs/two-user.svg';
import USDC from '@/assets/svgs/usdc.svg';
import X from '@/assets/svgs/x.svg';

// These icons should be arranged alphabetically for easy sorting

const icons = {
  Add,
  ArrowLeft,
  ArrowRight,
  Card,
  CardTransfer,
  CaretLeft,
  Calendar,
  CalendarEdit,
  CalendarGreen,
  Check,
  Clock,
  Danger,
  FacebookRounded,
  Edit,
  Filter,
  Fire,
  Flag,
  Hamburger,
  Link,
  LocationGreen,
  Login,
  Message,
  MessageNotification,
  MessageSparkle,
  TelegramRounded,
  ThreeDotsVertical,
  ThreeDotsVerticalGrey,
  Ticket,
  Ticket2,
  TicketGreen,
  TicketRed,
  Timer,
  Trash,
  TwitterRounded,
  TwoUser,
  USDC,
  X,
};

export type Icons = keyof typeof icons;
interface Props {
  /** Name of the icon as stored in the icons object */
  icon: Icons;
  size?: string;
}

export default function UiIcon({ icon, size = '18' }: Props) {
  const LazyLoadedIcon = icons[icon];
  return (
    <>
      {LazyLoadedIcon && (
        <LazyLoadedIcon style={{ width: size, height: size }} />
      )}
    </>
  );
}
