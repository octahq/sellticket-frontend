import React from 'react';

// Define props for icon components
export type IconProps = {
  fill: string;
  innerFill?: string;
};

// Define the structure for sidebar items
export interface SidebarItem {
  id: number;
  name: string;
  path: string;
  icon: React.ReactNode;
  sec: React.ReactNode;
  hover: React.ReactNode;
}

export type SingleValue = {
  value: string;
  label: string;
};
