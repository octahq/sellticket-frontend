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
