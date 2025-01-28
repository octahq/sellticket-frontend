/**
 * A reusable tabs component
 * Displays tabs for navigating through pages or conditionally rendering components within the same route
 * Props:
 * -tabs: An array of tabs to be randered. it contains the value of the tab and the label to be displayed
 * -activeTab: The current active tab from the array of tabs
 * -onSelect: A function that is ran whenever a tab is selected
 */

'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import UiIcon, { Icons } from '../Icon/UiIcon';

export type Tab = {
  title: string;
  value: string;
  icon: Icons;
};

interface Props {
  tabs: Tab[];
  activeTab: string;
  onSelect: (value: string) => void;
}

export default function UiTabs({ activeTab, tabs, onSelect }: Props) {
  const [bgPosition, setBgPosition] = useState(0);
  const [touchedTab, setTouchedTab] = useState<string | null>(null);

  const buttonRefs = useRef<HTMLButtonElement[]>([]);
  const touchedTabTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const indexOfActiveItem = useMemo(() => {
    return tabs.findIndex((tab) => tab.value === activeTab);
  }, [activeTab, tabs]);

  function isActive(value: string) {
    return value === activeTab;
  }

  function isTouched(value: string) {
    return value === touchedTab;
  }

  function onTabClick(value: string) {
    onSelect(value);
    setTouchedTab(value);

    if (touchedTabTimeoutRef.current) {
      clearTimeout(touchedTabTimeoutRef.current);
    }

    // set blur state to null after 300ms
    touchedTabTimeoutRef.current = setTimeout(() => {
      setTouchedTab(null);
    }, 300);
  }

  useEffect(() => {
    // set the position of the active indicator
    if (buttonRefs.current[indexOfActiveItem]) {
      setBgPosition(buttonRefs.current[indexOfActiveItem].offsetLeft);
    }
  }, [activeTab, tabs, indexOfActiveItem]);

  useEffect(() => {
    // clear timeout for selected tab blur
    if (touchedTabTimeoutRef.current) {
      clearTimeout(touchedTabTimeoutRef.current);
    }
  }, []);

  return (
    <div className="p-[3px] bg-neutral-200 w-fit rounded-[20px]">
      <div className="relative flex gap-[6px]">
        <div
          key={activeTab}
          className="absolute top-0 bottom-0 left-0 h-full bg-white transition-all duration-300 rounded-2xl"
          style={{
            width: buttonRefs.current[indexOfActiveItem]?.offsetWidth,
            transform: `translateX(${bgPosition}px)`,
          }}
        />

        {tabs.map((tab, index) => (
          <button
            key={`${tab.value}`}
            type="button"
            ref={(el) => {
              if (el) buttonRefs.current[index] = el;
            }}
            className={`relative px-[6px] text-xs leading-[14.52px] h-6 flex flex-nowrap whitespace-nowrap overflow-x-auto items-center gap-1 font-medium rounded-2xl transition-all duration-300 ${
              isActive(tab.value)
                ? 'text-light shadow-primary-tab-shadow bg-white text-secondary-700 stroke-secondary-700'
                : 'text-secondary-400 hover:text-secondary-700 hover:stroke-secondary-700  stroke-secondary-400'
            } ${isTouched(tab.value) && 'blur-[1.5px]'}`}
            onClick={() => onTabClick(tab.value)}
          >
            <UiIcon icon={tab.icon} size="16" />
            <p>{tab.title}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
