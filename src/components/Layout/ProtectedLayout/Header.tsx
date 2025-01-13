import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IoNotificationsOutline } from 'react-icons/io5';
import { HiMiniBars3 } from 'react-icons/hi2';
import { useMediaQuery } from '@/hooks/use-media-query';
import Image from 'next/image';
import logo from '../../../assets/images/sell-ticket-logo-full.png';
import { Badge } from '@/components/ui/badge';
import { MdKeyboardArrowDown } from 'react-icons/md';

const Header = () => {
  const isSmallScreen = useMediaQuery('(max-width: 999px)');

  return (
    <header className="fixed w-full  top-0 right-0 left-0 ">
      <div className={`flex  `}>
        {!isSmallScreen ? (
          <div className="flex  ml-auto items-center secondary-font  space-x-3 py-4 pr-8">
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
          <div className="flex justify-between h-[67px] px-4  items-center w-full">
            <Image src={logo} alt="sell ticket logo" className="w-[120px]" />
            <div className=" w-[34px] h-[34px] grid place-items-center border-[#5B5B5B] border-2 rounded-full text-xl">
              <HiMiniBars3 />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
