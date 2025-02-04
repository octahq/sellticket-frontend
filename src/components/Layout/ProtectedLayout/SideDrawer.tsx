import { FC, useEffect, useRef } from 'react';
import Image from 'next/image';
import Logo from '../../../assets/images/sell-ticket-logo-full.png';
import { sidebarItems } from '@/components/common/constants';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const Drawer: FC<DrawerProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        className={cn(
          'fixed top-0 left-0 h-screen w-80 bg-white shadow-lg z-50 transform transition-transform duration-300',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="ml-8 pt-6 border-b pb-[14px] border-gray-200 flex flex-col">
          <Image
            className="w-[129px] h-[33px]"
            src={Logo}
            alt="sellticket logo"
            priority
          />
          <div className="flex items-center gap-2  mt-[22px] ">
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
              <p className="text-sm ">John Doe</p>
              <p className="text-xs  text-[#828282]">Johndoe@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="px-6 ">
          <ul className="space-y-2 pt-4">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.path}
                  className={cn(
                    'flex items-center gap-4 px-4 py-3 rounded-[10px] text-sm font-medium transition-all duration-200',
                    pathname.includes(item.path)
                      ? 'bg-[#121212] text-[#D4FF5F] font-medium '
                      : 'text-[#6B6B6B] hover:bg-[#F5F5F5F5] hover:text-[#6B6B6B] duration-300'
                  )}
                >
                  <span className="flex-shrink-0">
                    {pathname.includes(item.path) ? item.sec : item.icon}
                  </span>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Drawer;
