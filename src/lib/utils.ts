import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, format: string) {
  const dateObject = dayjs(date);
  if (!dateObject.isValid()) {
    return;
  }
  return dateObject.format(format);
}

export const formattDate = (
  date: string | Date | number | null | undefined,
  fallback: string = ''
): string => {
  if (!date) return fallback;

  let dateToFormat: Date;

  if (typeof date === 'string' || typeof date === 'number') {
    dateToFormat = new Date(date);
  } else if (date instanceof Date) {
    dateToFormat = date;
  } else {
    return fallback; // Handle cases where date is null or undefined after the initial check
  }

  return dateToFormat.toLocaleDateString('default', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};
