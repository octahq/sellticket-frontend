'use client';

import { usePathname } from 'next/navigation';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IoNotificationsOutline } from 'react-icons/io5';
import { HiMiniBars3 } from 'react-icons/hi2';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Badge } from '@/components/ui/badge';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { PageInfos } from '@/components/common/constants';
import SideDrawer from './SideDrawer';

const Header = () => {
  const isSmallScreen = useMediaQuery('(max-width: 999px)');

  const pathname = usePathname();

  const currentPageInfo = PageInfos[pathname] || { title: 'Dashboard' };

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDrawer = () => setIsOpen((prev) => !prev);

  return (
    <header className="fixed w-full top-0 right-0 left-0 z-30 bg-white">
      <div className={`flex  `}>
        {!isSmallScreen ? (
          <div className="flex   ml-auto items-center secondary-font  space-x-3 py-4 pr-8">
            {/* Notification Bell with Badge */}

            {/* Avatar */}
            <Avatar className="w-12 h-12  bg-gradient-to-br from-white to-gray-200  p-[6px]  rounded-full">
              <AvatarImage
                className="rounded-full"
                src="https://via.placeholder.com/150"
                alt="John Doe"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>

            {/* User Details */}
            <div className="font-medium">
              <p className="text-sm font-bold ">John Doe</p>
              <p className="text-xs  text-[#828282]">Johndoe@gmail.com</p>
            </div>
            <div className="flex gap-2 text-[#A1A1A1]">
              <div className="relative">
                <IoNotificationsOutline className="h-6 w-6" />
                <Badge className="absolute -top-2 -right-2 bg-[#FF0000] text-white text-xs h-5 w-4 flex items-center justify-center">
                  2
                </Badge>
              </div>
              <MdKeyboardArrowDown className="text-2xl" />
            </div>
          </div>
        ) : (
          <div className="flex justify-between h-[67px] mt-8 pb-8 px-6  items-center w-full text-[#292D32]">
            <div>
              <h3 className="font-bold text-xl">{currentPageInfo.title}</h3>
              {currentPageInfo.description && (
                <p className="text-sm pt-[2px]">
                  {currentPageInfo.description}
                </p>
              )}
            </div>
            <button
              className=" w-[34px] h-[34px]  grid place-items-center rounded-full text-3xl"
              onClick={toggleDrawer}
            >
              <HiMiniBars3 />
            </button>
          </div>
        )}
      </div>
      <SideDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  );
};
export default Header;
