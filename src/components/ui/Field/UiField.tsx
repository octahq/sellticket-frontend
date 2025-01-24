/**
 * Button component
 * This component hold the labels, errors or hints for inputs
 * Props:
 * error: The error message for a particular field
 * label: The label for the field
 * hint: Any hint message for the field is provided by this prop
 * children: This node renders the actual field  i.e text-input, text-area etc
 */

import React from 'react';

interface Props {
  error?: React.ReactNode;
  label?: React.ReactNode;
  hint?: string;
  children: React.ReactNode;
}

export default function UiField({ error, label, hint, children }: Props) {
  return (
    <div className="text-left relative">
      <label className="text-sm leading-7 font-ceraRegular text-gray-1000">
        {label}{' '}
      </label>
      {children}
      {error && (
        <div className="text-danger-500 text-[10px] leading-3 mt-2">
          {error}
        </div>
      )}
      <div className="text-xs text-gray-900">{hint}</div>
    </div>
  );
}
