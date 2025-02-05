/**
 * Signin form
 * Contains a validated input that recieves the user's email
 */

'use client';

import { useMemo } from 'react';
import Link from 'next/link';

import useObjectState from '@/hooks/useObjectState';

import SiginInSchema from '@/utils/schemas/SiginInSchema';

import UiButton from '../ui/Button/UiButton';
import UiForm from '../ui/Form/UiForm';
import UiIcon from '../ui/Icon/UiIcon';
import UiInput from '../ui/Input/UiInput';

// --

interface Props {
  onSubmitForm: () => void;
}

export default function SignInForm({ onSubmitForm }: Props) {
  const formData = useObjectState({
    email: '',
  });

  // show the email icon in the input field only when the input is empty
  const showPrefixNode = useMemo(() => {
    return formData.value.email === '';
  }, [formData.value.email]);

  const MessageWithIcon = (message: string) => (
    <div className="flex gap-1">
      <UiIcon icon="Danger" size="10" />
      {message}
    </div>
  );

  return (
    <UiForm
      formData={formData.value}
      onSubmit={onSubmitForm}
      schema={SiginInSchema}
    >
      {({ errors }) => (
        <div className="grid gap-8">
          <UiInput
            prefixNode={showPrefixNode && <UiIcon icon="Message" size="20" />}
            name="email"
            isGradient
            variant='gradient-secondary'
            onChange={formData.set}
            value={formData.value.email}
            error={errors.email && MessageWithIcon(errors.email)}
            placeholder="your@email.com"
          />
          <UiButton block>Continue</UiButton>
          <p className="text-xs text-center text-secondary-100 font-medium max-w-[250px] mx-auto ">
            By creating your account you are accepting our{' '}
            <Link className="text-secondary-800" href="">
              terms
            </Link>{' '}
            and{' '}
            <Link className="text-secondary-800" href="">
              policies
            </Link>
          </p>
        </div>
      )}
    </UiForm>
  );
}
