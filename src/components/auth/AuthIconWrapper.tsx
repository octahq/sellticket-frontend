import { Icons } from "../ui/Icon/UiIcon";
import UiIcon from "../ui/Icon/UiIcon";



export default function AuthIconWrapper({ icon }: { icon: Icons }) {
  return (
    <div className="rounded-full w-11 h-11 p-[1px] pt-[1.4px] pr-[1.4px] bg-auth-icon-wrapper-border">
      <div 
        className="w-full h-full rounded-full bg-auth-icon-wrapper-bg flex justify-center items-center pr-1">
        <UiIcon icon={icon} size="24"/>
      </div>
    </div>
  )
}
