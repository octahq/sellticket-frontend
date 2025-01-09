import Envelope from '@/assets/icons/envelope.svg';
import Login from '@/assets/icons/login.svg';

// These icons should be arranged alphabetically for easy sorting

const icons = {
  Envelope,
  Login
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
