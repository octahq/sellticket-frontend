/**
 * This component renders icons used throughout the our applications
 * icons are imported in their svg formats in alphabetical order
 */

import ArrowLeft from '@/assets/svgs/arrow-left.svg';
import Danger from '@/assets/svgs/danger.svg';
import Message from '@/assets/svgs/message.svg';
import MessageNotification from '@/assets/svgs/message-notification.svg';
import MessageSparkle from '@/assets/svgs/message-sparkle.svg';
import Login from '@/assets/svgs/login.svg';
import X from '@/assets/svgs/x.svg';

// These icons should be arranged alphabetically for easy sorting

const icons = {
  ArrowLeft,
  Danger,
  Message,
  MessageNotification,
  MessageSparkle,
  Login,
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
