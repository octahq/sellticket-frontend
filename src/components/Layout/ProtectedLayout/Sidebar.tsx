'use client';

import Image from 'next/image';
import Logo from '../../../assets/images/sell-ticket-logo-full.png';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { sidebarItems } from '@/components/common/constants';
import SearchInput from './SearchInput';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="relative z-30 bg-white h-full border-r-[1px] border-[#EDEDED]">
      <div className="pt-7 ml-6 border-[#E0E0E0]">
        <Image
          className="w-[129px] h-[33px]"
          src={Logo}
          alt="sellticket logo"
          priority
        />
      </div>
      <div>
        <nav className="px-6 pt-7">
          <SearchInput />
          <ul className="space-y-2 pt-6">
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
    </aside>
  );
};

export default Sidebar;
