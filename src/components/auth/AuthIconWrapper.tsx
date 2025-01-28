/**
 * This component the renders the icon for each auth page with the linear gradient background
 * Props:
 * -icon: the dedicated icon for the auth page
 * -paddingRight: this boolean value is added to handle an edgecase in the design
 */

import { Icons } from '../ui/Icon/UiIcon';
import UiIcon from '../ui/Icon/UiIcon';

export default function AuthIconWrapper({
  icon,
  paddingRight,
}: {
  icon: Icons;
  paddingRight?: boolean;
}) {
  return (
    <div className="rounded-full w-11 h-11 p-[1.5px] bg-auth-icon-wrapper-border">
      <div
        className={`w-full h-full rounded-full bg-auth-icon-wrapper-bg flex justify-center items-center ${paddingRight && 'pr-1'}`}
      >
        <UiIcon icon={icon} size="24" />
      </div>
    </div>
  );
}
