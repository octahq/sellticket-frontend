'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { FiCalendar } from 'react-icons/fi';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type DateProps = {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  label: string;
};

export const DatePicker: React.FC<DateProps> = ({ date, setDate, label }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full h-11 justify-start text-[#6B6A6A] text-xs bg-[#F5F5F5] text-left font-normal border border-[#F1F1F1]'
          )}
        >
          {/* Adjust spacing and size */}
          {date ? format(date, 'PPP') : <span>{label}</span>}
          <FiCalendar className="mr-2 h-4 w-4" />{' '}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
