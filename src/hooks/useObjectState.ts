/**
 * This is a hook that makes handling object state easier
 * This hook handles setting and mutating object state
 * Props:
 * -data: this is the default data or initial data
 * Functions:
 * -set: this function sets a value in the object
 * -setDeep: this function handles the mutation of deep rooted data
 * -reset: this function resets the date to it's initial value
 */

'use client';

import { useState } from 'react';

import OnChangeParams from '@/types/OnChangeParams';

// --

export default function useObjectState<T = Record<string, string>>(
  data = {} as T
) {
  const [value, setValue] = useState(data);

  function set(params: OnChangeParams) {
    setValue((val) => ({
      ...val,
      [params.name]: params.value,
    }));
  }

  function setDeep(params: OnChangeParams) {
    setValue((val) => {
      const updatedValue = { ...val };
      const keys = params.name.split('.');
      let current: any = updatedValue;

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        current[key] = { ...current[key] };
        current = current[key];
      }

      current[keys[keys.length - 1]] = params.value;

      return updatedValue;
    });
  }

  function reset() {
    setValue(data);
  }

  return {
    value,
    set,
    setDeep,
    reset,
  };
}
