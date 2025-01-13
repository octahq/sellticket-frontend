import {
  AnalyticsIcon,
  CustomersIcon,
  EventIcon,
  FinanceIcon,
  HomeIcon,
  MarketingIcon,
  SettingsIcon,
} from '@/assets/icons/images';

import { SidebarItem } from '@/types/types';

export const sidebarItems: SidebarItem[] = [
  {
    id: 1,
    name: 'Dashboard',
    path: '/dashboard',
    icon: <HomeIcon fill="#6B6B6B" />,
    sec: <HomeIcon fill="#D4FF5F" />,
    hover: <HomeIcon fill="#D4FF5F" />,
  },
  {
    id: 2,
    name: 'Event',
    path: '/events',
    icon: <EventIcon fill="#6B6B6B" />,
    sec: <EventIcon fill="#D4FF5F" />,
    hover: <EventIcon fill="#D4FF5F" />,
  },

  {
    id: 3,
    name: 'Customers',
    path: '/customers',
    icon: <CustomersIcon fill="#6B6B6B" />,
    sec: <CustomersIcon fill="#D4FF5F" />,
    hover: <CustomersIcon fill="#D4FF5F" />,
  },
  {
    id: 4,
    name: 'Analytics',
    path: '/analytics',
    icon: <AnalyticsIcon fill="#6B6B6B" />,
    sec: <AnalyticsIcon fill="#D4FF5F" />,
    hover: <AnalyticsIcon fill="#D4FF5F" />,
  },
  {
    id: 5,
    name: 'Finance',
    path: '/finance',
    icon: <FinanceIcon fill="#6B6B6B" />,
    sec: <FinanceIcon fill="#D4FF5F" />,
    hover: <FinanceIcon fill="#D4FF5F" />,
  },
  {
    id: 6,
    name: 'Marketing',
    path: '/marketing',
    icon: <MarketingIcon fill="#6B6B6B" />,
    sec: <MarketingIcon fill="#D4FF5F" />,
    hover: <MarketingIcon fill="#D4FF5F" />,
  },
  {
    id: 7,
    name: 'Settings',
    path: '/settings',
    icon: <SettingsIcon fill="#6B6B6B" />,
    sec: <SettingsIcon fill="#D4FF5F" />,
    hover: <SettingsIcon fill="#D4FF5F" />,
  },
];
