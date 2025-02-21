import { formatTime } from "@/lib/utils";

import UiButton from "../ui/Button/UiButton";
import UiIcon from "../ui/Icon/UiIcon";
import UiModal from "../ui/Modal/UiModal";

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
  timer: number;
  realeseTicket: VoidFunction;
}

export default function ReleaseTicketConfirmationModal({ isOpen, timer, onClose, realeseTicket }: Props) {
  return (
    <UiModal
      isOpen={isOpen}
      onClose={onClose}
      hideHeader
      customPadding="16px 18px"
    >
      <div className="text-center sm:max-w-[342px]">
        <div className="flex justify-center gap-2 items-center mb-1">
          <UiIcon icon="Timer" size="24" />
          <h3 className="text-sm font-semibold text-warning-600">
            {formatTime(timer)}mins left
          </h3>
        </div>
        <h3 className="text-lg text-secondary-700 font-semibold mb-1">
          Release tickets
        </h3>
        <p className="text-sm mb-[38px] text-secondary-600">
          Are you sure you want to cancel? This will cancel the order and
          release your tickets?
        </p>
        <div className="flex gap-[10px] w-full">
          <UiButton block variant="gray" onClick={onClose}>
            Continue buying
          </UiButton>
          <UiButton block onClick={realeseTicket}>
            Release ticket
          </UiButton>
        </div>
      </div>
    </UiModal>
  );
}
