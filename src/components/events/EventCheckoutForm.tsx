import useObjectState from "@/hooks/useObjectState";

import UiForm from "../ui/Form/UiForm";
import UiInput from "../ui/Input/UiInput";
import UiRadio from "../ui/Radio/UiRadio";
import UiButton from "../ui/Button/UiButton";

// --

interface Props {
  onOpenReleaseTicket: VoidFunction;
  openPayment: VoidFunction;
}

export default function EventCheckoutForm({ onOpenReleaseTicket, openPayment }: Props) {
  const formData = useObjectState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    shareAcrossMultipleEmails: ''
  });


  const FormLabel = (label: string, isOptional?: boolean) => (
    <span className="text-secondary-500">
      {label} {isOptional && <span className="text-[#C2C2C2]">(Optional)</span>}
    </span>
  );
  return (
    <UiForm formData={formData.value} onSubmit={() => {}}>
      {({ errors }) => (
        <div className="grid gap-3">
          <div className="flex flex-col lg:flex-row gap-2 w-full">
            <UiInput
              name="firstName"
              placeholder="First name"
              label={FormLabel('First name', true)}
              onChange={formData.set}
              value={formData.value.firstName}
              size="md"
              variant="gradient-primary"
            />
            <UiInput
              name="lastName"
              placeholder="Last name"
              label={FormLabel('Last name', true)}
              onChange={formData.set}
              value={formData.value.lastName}
              size="md"
              variant="gradient-primary"
            />
          </div>
          <UiInput
            name="email"
            type="email"
            placeholder="example@example.com"
            label={FormLabel('Email address')}
            onChange={formData.set}
            value={formData.value.email}
            size="md"
            variant="gradient-primary"
            suffixNode={
              <div className="bg-white w-5 h-5 flex justify-center items-center rounded-full shadow-@-shadow">
                <p>@</p>
              </div>
            }
          />
          <UiInput
            name="phone"
            placeholder="0801 23 45 6789"
            label={FormLabel('Phone number', true)}
            onChange={formData.set}
            value={formData.value.phone}
            size="md"
            variant="gradient-primary"
          />
          <div className="mt-4 mb-7">
            <p className="text-sm text-[#8C8C8C] mb-[14px]">
              Share tickets across multiple email addresses?
            </p>
            <div className="flex items-center gap-7">
              <UiRadio
                name="shareAcrossMultipleEmails"
                formValue={formData.value.shareAcrossMultipleEmails}
                onChange={formData.set}
                value="yes"
                label="Yes"
              />
              <UiRadio
                name="shareAcrossMultipleEmails"
                formValue={formData.value.shareAcrossMultipleEmails}
                onChange={formData.set}
                value="no"
                label="No"
              />
            </div>
          </div>
          <div className="flex justify-center md:justify-start gap-6 max-w-[330px]">
            <UiButton block variant="gray" onClick={onOpenReleaseTicket}>
              Cancel
            </UiButton>
            <UiButton block variant="tertiary" onClick={openPayment}>
              Get ticket
            </UiButton>
          </div>
        </div>
      )}
    </UiForm>
  );
}
