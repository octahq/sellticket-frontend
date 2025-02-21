import { useState } from "react";


import UiIcon from "../ui/Icon/UiIcon";
import UiModal from "../ui/Modal/UiModal";
import UiOptionCard from "../ui/OptionCard/UiOptionCard";
import UiButton from "../ui/Button/UiButton";

//---

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
  readyTicket: VoidFunction
}

export default function CheckoutPaymentModal({isOpen, onClose, readyTicket}: Props) {
  const [paymentMethod, setPaymentMethod] = useState('bankTransfer');

  function handlePaymentMethod(method: string) {
    setPaymentMethod(method)
  };

  return (
    <UiModal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="w-12 h-12 flex items-center justify-center border border-[#E9EAEB] rounded-[10px] shadow-atm-card">
          <UiIcon icon="Card" size="24" />
        </div>
      }
    >
      <div className="sm:max-w-[408px] mt-4 pb-7">
        <div className="pb-5 border-b border-stroke-200 mb-[18px]">
          <h3 className="text-lg font-semibold text-secondary-700 mb-1">
            Choose a payment method
          </h3>
          <p className="text-sm text-secondary-600">
            Select how you’d like to pay.
          </p>
        </div>
        <div className="grid gap-3 mb-8">
          <UiOptionCard
            formValue={paymentMethod}
            value="bankTransfer"
            onChange={handlePaymentMethod}
          >
            <div className="flex gap-4 items-start">
              <UiIcon icon="CardTransfer" size="32" />
              <div>
                <h4 className="text-sm text-secondary-700 font-medium">
                  Bank Transfer
                </h4>
                <p className="text-sm text-secondary-500">
                  Transfer the money using your bank account.
                </p>
              </div>
            </div>
          </UiOptionCard>
          <UiOptionCard
            formValue={paymentMethod}
            value="digitalWallet"
            onChange={handlePaymentMethod}
            variant="secondary"
          >
            <div className="flex gap-4 items-start">
              <UiIcon icon="USDC" size="32" />
              <div>
                <h4 className="text-sm text-secondary-700 font-medium">
                  Digital Wallet
                </h4>
                <p className="text-sm text-secondary-500">
                  Receive payment through USDC,ETH,USDT.
                </p>
              </div>
            </div>
          </UiOptionCard>
        </div>
        <div className="max-w-[218px] ml-auto">
          <UiButton block onClick={readyTicket}>
            Confirm
          </UiButton>
        </div>
      </div>
    </UiModal>
  );
}
