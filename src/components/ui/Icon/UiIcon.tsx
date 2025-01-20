/**
 * This component renders icons used throughout the our applications
 * icons are imported in their svg formats in alphabetical order
 */

import Add from '@/assets/svgs/add.svg';
import ArrowLeft from '@/assets/svgs/arrow-left.svg';
import Calendar from '@/assets/svgs/calendar.svg';
import CalendarEdit from '@/assets/svgs/calendar-edit.svg';
import Clock from '@/assets/svgs/clock.svg';
import Danger from '@/assets/svgs/danger.svg';
import Edit from '@/assets/svgs/edit.svg';
import Filter from '@/assets/svgs/filter.svg';
import Login from '@/assets/svgs/login.svg';
import Message from '@/assets/svgs/message.svg';
import MessageNotification from '@/assets/svgs/message-notification.svg';
import MessageSparkle from '@/assets/svgs/message-sparkle.svg';
import ThreeDotsVertical from '@/assets/svgs/three-dots-vertical.svg';
import Ticket from '@/assets/svgs/ticket.svg';
import TicketGreen from '@/assets/svgs/ticket-green.svg';
import TicketRed from '@/assets/svgs/ticket-red.svg';
import Trash from '@/assets/svgs/trash.svg';
import TwoUser from '@/assets/svgs/two-user.svg';
import X from '@/assets/svgs/x.svg';

// These icons should be arranged alphabetically for easy sorting

const icons = {
  Add,
  ArrowLeft,
  Calendar,
  CalendarEdit,
  Clock,
  Danger,
  Edit,
  Filter,
  Login,
  Message,
  MessageNotification,
  MessageSparkle,
  ThreeDotsVertical,
  Ticket,
  TicketGreen,
  TicketRed,
  Trash,
  TwoUser,
  X,
}

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
