import { Icons } from "@/components/ui/Icon/UiIcon";
import UiIcon from "@/components/ui/Icon/UiIcon";

// --

interface Props {
  message: string;
  icon: Icons
}

export default function MessageWithIcon({ message, icon }: Props) {
  return (
    <div>
      <UiIcon icon={icon} size="10"/>
      {message}
    </div>
  )
}
