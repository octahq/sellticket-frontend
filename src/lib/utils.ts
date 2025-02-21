import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formattDate(date: string | Date, format: string) {
  const dateObject = dayjs(date);
  if (!dateObject.isValid()) {
    return;
  }
  return dateObject.format(format);
}

export const formatDate = (
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

export function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};
