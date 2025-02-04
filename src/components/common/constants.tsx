import {
  AnalyticsIcon,
  CustomersIcon,
  EventIcon,
  FinanceIcon,
  HomeIcon,
  MarketingIcon,
  SettingsIcon,
} from '@/assets/icons/images';
import { StaticImageData } from 'next/image';
import bankImg from '@/assets/images/bankImg.png';

import { SidebarItem } from '@/types/types';
import PageInfo from '@/types/PageInfo';

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
    name: 'Attendees',
    path: '/attendees',
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
    icon: <FinanceIcon fill="#6B6B6B" innerFill="white" />,
    sec: <FinanceIcon fill="#D4FF5F" innerFill="#121212" />,
    hover: <FinanceIcon fill="#D4FF5F" innerFill="#121212" />,
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

export const financeWalletTab: { id: string; value: string }[] = [
  { id: '1', value: 'Cash Balance' },
  { id: '2', value: 'Crypto Balance' },
];

export const transHeaders = [
  '',
  'name',
  'type',
  'date',
  'time',
  'price',
  'status',
  '',
];

export const fetchedTransactions: {
  id: string;
  logo: StaticImageData;
  name: string;
  type: string;
  date: string;
  time: string;
  price: string;
  status: string;
}[] = [
  {
    id: '#1234578900',
    logo: bankImg,
    name: 'Octa tickera fx',
    type: 'debit',
    date: 'Sep 01, 2022',
    time: '12:30pm',
    price: '100,000',
    status: 'Successful',
  },
  {
    id: '#1234578900',
    logo: bankImg,
    name: 'Octa tickera fx',
    type: 'debit',
    date: 'Sep 01, 2022',
    time: '12:30pm',
    price: '100,000',
    status: 'Successful',
  },
  {
    id: '#1234578900',
    logo: bankImg,
    name: 'Octa tickera fx',
    type: 'debit',
    date: 'Sep 01, 2022',
    time: '12:30pm',
    price: '100,000',
    status: 'Successful',
  },
  {
    id: '#1234578900',
    logo: bankImg,
    name: 'Octa tickera fx',
    type: 'debit',
    date: 'Sep 01, 2022',
    time: '12:30pm',
    price: '100,000',
    status: 'Successful',
  },
  {
    id: '#1234578900',
    logo: bankImg,
    name: 'Octa tickera fx',
    type: 'debit',
    date: 'Sep 01, 2022',
    time: '12:30pm',
    price: '100,000',
    status: 'Successful',
  },
  {
    id: '#1234578900',
    logo: bankImg,
    name: 'Octa tickera fx',
    type: 'debit',
    date: 'Sep 01, 2022',
    time: '12:30pm',
    price: '100,000',
    status: 'Successful',
  },
];

export const withdrawalMethods: { title: string; text: string }[] = [
  {
    title: 'Bank Transfer',
    text: 'Transfer the money using your bank account.',
  },
  {
    title: 'Digital Wallet',
    text: 'Receive payment through USDC,ETH,USDT.',
  },
];

export const PageInfos: Record<string, PageInfo> = {
  '/dashboard': { title: '', description: '' },
  '/events': { title: 'Events', description: 'Manage and publish your events' },
  '/finance': {
    title: 'Account',
    description: 'Your account details and balance',
  },
};

export const banks: {
  id: number;
  name: string;
  logo: StaticImageData | string;
}[] = [
  { id: 1, name: 'Bank of America', logo: bankImg },
  {
    id: 2,
    name: 'Chase Bank',
    logo: bankImg,
  },
  { id: 3, name: 'Wells Fargo', logo: bankImg },
];

export const eventCategories: {
  name: string;
  value: string;
}[] = [
  {
    name: 'cat 1',
    value: 'cat 1',
  },
  {
    name: 'cat 1',
    value: 'cat 1',
  },
  {
    name: 'cat 1',
    value: 'cat 1',
  },
];
